import React from 'react';
import moment from 'moment-timezone';

export const ListItem = (props) =>
  <li className='contact'>
    <div className='contact__image'>
      <img src="http://www.e-architect.co.uk/images/stories/new_york/statue_of_liberty_h190912_h1tb.jpg" />
    </div>
    <div className='contact__details'>
      <div className='contact__name'>{props.zone.friendly_name}</div>
      <div className='contact__country'>{props.zone.country}</div>
    </div>
    <div className='contact__time'>{moment.tz(props.zone.timezone_name).format('h:mm a')}</div>
  </li>;
