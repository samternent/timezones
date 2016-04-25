var data = require('./city-list-map/data');
var moment = require('moment-timezone');

const formatFilter = (filter) => {
  return filter.replace(/_/g, ' ').toUpperCase();
}



const filterZones = (searchTerm) => {
  const moments = moment.tz.names(searchTerm);
  return moments.map((zone, i) => {
    const names = formatFilter(zone).split('/');
    const moment = moments[i];
    const searchTerms = names[names.length-1];
    return {
        names,
        moment,
        searchTerms,
    }
  });
}

var zones = filterZones();
var finalList = { "zones": {} };

function checkZone(searchTerm) {
  var moment = null;
  zones.some((zone, i) => {
    if (zone.searchTerms === searchTerm) {
      return moment = zone.moment;
    } else {
      moment = null;
    }
  })
  return moment;
}

for (var country in data.countries) {
  if (data.countries[country].length !== 0) {
    var capital = data.countries[country][0];
    var moment = checkZone(capital.toUpperCase());
    if (moment) {
      data.countries[country].forEach(function (city) {
        var localMoment = checkZone(city.toUpperCase());
        if (moment) {
          var cityObj = finalList["zones"][city.toUpperCase()] || {};
          var possibleMoments = cityObj.possibleMoments || [];
          if (localMoment) possibleMoments.push(localMoment)
          possibleMoments.push(moment)
          possibleMoments = possibleMoments;
          finalList["zones"][city] = {
            city,
            moment,
            possibleMoments
          }
        }
      });
    }
  }
}


var jsonfile = require('jsonfile')

var file = './city-list-map/data.json'

jsonfile.writeFile(file, finalList, {spaces: 2}, function(err) {
  console.error(err)
})
