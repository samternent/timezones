import React, { Component } from 'react';
import moment from 'moment-timezone';

export default class Zone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: null,
      date: null
    };
  }

  getCurrentTime() {
    return moment(this.props.timestamp).tz(this.props.zone.tz).format('H:mm:ss a')
  }

  getOffset() {
    return moment(this.props.timestamp).tz(this.props.zone.tz).format('Z z');
  }
  getCurrentDate() {
    return moment(this.props.timestamp).tz(this.props.zone.tz).format('LL');
  }

  getClockStyle(type) {
    const time = moment(this.props.timestamp).tz(this.props.zone.tz).format('HH:mm:ss').split(':');
    let deg = null;

    if (type === 'bg') {
      if (time[0] >= 7 && time[0] <= 21) {
        return 'day';
      } else {
        return 'night'
      }
    }

    if (type === 's') deg = time[2] * 6;
    if (type === 'm') deg = time[1] * 6;
    if (type === 'h') deg = time[0] * 30;

    return {
      'transform': `rotateZ(${deg}deg)`
    }
  }


  render() {
    return (
      <div className={`zoned ${this.getClockStyle('bg')}`} key={ this.props.key }>
        <div className='zoned__clock' dataTime={ this.getCurrentTime() }>
          <div className='zoned__clock__hand zoned__clock__hand--hour' style={ this.getClockStyle('h') }/>
          <div className='zoned__clock__hand zoned__clock__hand--minute' style={ this.getClockStyle('m') }/>
          <div className='zoned__clock__hand zoned__clock__hand--second' style={ this.getClockStyle('s') }/>
        </div>
        <section className='zone'>
          <div className='zone__name'>
            { this.props.zone.country }
          </div>
          <div className='zone__name'>
            { this.props.zone.city }
          </div>
          <div className='zone__time'>
            { this.getCurrentTime() }
          </div>
          <div className='zone__offset'>{ this.getOffset() }</div>
          <div className='zone__date'>
            { this.getCurrentDate() }
          </div>
        </section>
      </div>
    );
  }
}
