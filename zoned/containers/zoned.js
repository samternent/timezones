import React from 'react'
import moment from 'moment-timezone';
import Fuse from 'fuse.js';
var list = require('../../data/cities_array.json');
// import io from 'socket.io-client';
//
// const socket = io();

var searchOptions = {
  caseSensitive: false,
  // includeScore: true,
  shouldSort: true,
  tokenize: false,
  threshold: 0.4,
  location: 0,
  distance: 10,
  maxPatternLength: 32,
  keys: [{name: "city", weight: 0.7},{name: "country", weight: 0.3}]
};
var fuse = new Fuse(list, searchOptions);

var startingZone = fuse.search('birmingham')[0];

export default class Zoned extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zone: startingZone
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    setInterval(this.tickClock.bind(this), 1000);
  }
  getClockStyle(type) {
    const time = moment().tz(this.state.zone.tz).format('h:mm:ss').split(':');
    let deg = null;

    if (type === 's') deg = time[2] * 6;
    if (type === 'm') deg = time[1] * 6;
    if (type === 'h') deg = time[0] * 30;

    return {
      'transform': `rotateZ(${deg}deg)`
    }
  }

  tickClock() {
    const [date, time] = moment().tz(this.state.zone.tz).format('MMMM Do YYYY, h:mm:ss a').split(',');
    this.setState({ time, date });
  }

  onInputChange(e) {
    const searchTerm = e.target.value.toUpperCase();
    if (!searchTerm) {
      return this.setState({
        zone: fuse.search('birmingham')[0]
      });
    }
    var zone = fuse.search(searchTerm);
    if (zone.length && zone[0].tz) {
      return this.setState({ zone: zone[0] });
    }
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
            <div className='zone__name'>
              { this.state.zone.country }
            </div>
            <div className='zone__name'>
              { this.state.zone.city }
            </div>
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
//
// Zoned.defaultProps = {
//   zones: filterZones(),
// }
