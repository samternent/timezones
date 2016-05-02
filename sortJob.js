
// Return array of string values, or NULL if CSV string not well formed.
function CSVtoArray(text) {
    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null;
    var a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
        function(m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
};


var fs = require('fs');
var file = fs.readFileSync('./cities.txt').toString().split("\n");
var csv = require('csv');


var cities = [];
var tzwhere = require('tzwhere')
tzwhere.init();


for(i in file) {
  var city = CSVtoArray(file[i]);
  if (city[3] && city[4]) {
      var tz = tzwhere.tzNameAt(city[3], city[4]);
  }
  var obj = {
    city: city[0],
    country: city[2],
    lat: city[3],
    lng: city[4],
  };

  if (tz) {
    obj.tz = tz;
  }

  cities.push(obj);
}



var jsonfile = require('jsonfile')

var file = './data/cities_array.json'

jsonfile.writeFile(file, cities, {spaces: 2}, function(err) {
  console.error(err)
})
