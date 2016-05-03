import React from 'react'
import Fuse from 'fuse.js';
import { Zone } from '../components';

// get this from sockets search
var list = require('../../data/cities_array.json');
// import io from 'socket.io-client';
// const socket = io();

var searchOptions = {
  caseSensitive: false,
  includeScore: true,
  shouldSort: true,
  tokenize: false,
  threshold: 0.4,
  location: 0,
  distance: 10,
  maxPatternLength: 32,
  keys: [
    {
      name: "city",
      weight: 0.6,
    },
    {
      name: "country",
      weight: 0.4,
    }
  ]
};


var fuse = new Fuse(list, searchOptions);

export default class Zoned extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zones: fuse.search('birmingham'),
      timestamp: new Date().getTime(),
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    setInterval(this.tickClock.bind(this), 1000);
  }

  tickClock() {
    const timestamp = new Date().getTime();
    this.setState({ timestamp });
  }

  onInputChange(e) {
    const searchTerm = e.target.value.toUpperCase();
    if (!searchTerm) {
      return this.setState({
        zones: fuse.search('birmingham')
      });
    }
    return this.setState({ zones: fuse.search(searchTerm) });
  }

  setZone(zone) {
    this.setState({ zones: [zone] });
  }

  renderZones() {
    return this.state.zones.map((zone, i) => {
      if (!zone.tz) return;
      if (i === 0) return <Zone zone={ zone } key={ `zone_${i}`} />

      return (
        <div
          key={ `otherzone_${i}` }
          className='other-zone'
          onClick={ this.setZone.bind(this, zone) }
        >
          {` ${zone.city}, ${zone.country}`}
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
        <div className="zones">
          { this.renderZones() }
        </div>
      </div>
    );
  }
}
