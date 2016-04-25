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
        names: ['MY ZONE', 'EUROPE', 'LONDON'],
      }
    };

    this.onInputChange = this.onInputChange.bind(this);
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
      return (
          <div className='zone__name' key={`name_${i}`}>
            { zone }
          </div>
      );
    });
  }

  render() {
    return (
      <div className='zoned'>

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
        <section className='zone'>
          <div>{ this.renderNames() }</div>
          <div className='zone__time'>
            { moment().tz(this.state.zone.moment).format('lll') }
          </div>
        </section>

      </div>
    );
  }
}

Zoned.defaultProps = {
  zones: filterZones(),
}
