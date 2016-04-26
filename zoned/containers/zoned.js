import React from 'react'
import moment from 'moment-timezone';
// import '../styles/app'
// import Logo from '../assets/logo.png'
const formatFilter = (filter) => {
  return filter.replace(/_/g, ' ').toUpperCase();
}



const filterZones = (searchTerm) => {
  const moments = moment.tz.names(searchTerm);
  return moments.map((zone, i) => {
    const names = formatFilter(zone).split('/');
    const moment = moments[i];
    const searchTerms = names.join(' ');

    return {
        names,
        moment,
        searchTerms,
    }
  });
}



const startingZone = moment.tz.guess();

export default class Zoned extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: {
        moment: startingZone,
        names: ['EUROPE', 'BIRMINGHAM'],
      }
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    setInterval(this.tickClock.bind(this), 1000);
  }
  getClockStyle(type) {
    const time = moment().tz(this.state.zone.moment).format('h:mm:ss').split(':');
    let deg = null;

    if (type === 's') deg = time[2] * 6;
    if (type === 'm') deg = time[1] * 6;
    if (type === 'h') deg = time[0] * 30;

    return {
      'transform': `rotateZ(${deg}deg)`
    }
  }

  tickClock() {
    const [date, time] = moment().tz(this.state.zone.moment).format('MMMM Do YYYY, h:mm:ss a').split(',');
    this.setState({ time, date });
  }

  onInputChange(e) {
    const searchTerm = e.target.value.toUpperCase();
    if (!searchTerm) {
      return this.setState({
        zone: {
          moment: startingZone,
          names: ['MY ZONE', 'EUROPE', 'LONDON'],
        }
      });

    }
    this.props.zones.some((zone, i) => {
      if (zone.searchTerms.indexOf(searchTerm) !== -1) {
          this.setState({zone});
          return true
      }
    });
  }

  renderNames() {
    return this.state.zone.names.map((zone, i) => {
      if (i > 1) return null;
      return (
          <div className='zone__name' key={`name_${i}`}>
            { zone }
          </div>
      );
    });
  }

  render() {
    return (
      <div>
        <header className='header'>
          <div className='search'>
            <input
              type='text'
              className='search__input'
              placeholder='Search'
              onChange={this.onInputChange}
            />
          </div>
        </header>
        <div className='zoned'>
          <div className='zoned__clock' dataTime={ this.state.time }>
            <div className='zoned__clock__hand zoned__clock__hand--hour' style={ this.getClockStyle('h') }/>
            <div className='zoned__clock__hand zoned__clock__hand--minute' style={ this.getClockStyle('m') }/>
            <div className='zoned__clock__hand zoned__clock__hand--second' style={ this.getClockStyle('s') }/>
          </div>
          <section className='zone'>
            <div>{ this.renderNames() }</div>
            <div className='zone__time'>
              { this.state.time }
            </div>
            <div className='zone__date'>
              { this.state.date }
            </div>
          </section>

        </div>
      </div>
    );
  }
}

Zoned.defaultProps = {
  zones: filterZones(),
}
