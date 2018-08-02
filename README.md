# GDP Map

A data visualization project, which shows all countries' GDP from 1960 to 2016.
Users can put the year in the input box or use slider to change the year, the map
will render the data from that year.
When the cursor click on each country, the application will show the country's name and
GDP in current year.

## Technology and Data Source

* HTML5/CSS3
* jQuery
* [datamaps](https://github.com/markmarkoh/datamaps)
* [World Bank API](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information)

## Details

### Creating World Map

Defined a `Gdpmap` class to set up the world map and prototype methods.

Used `datamaps` library to create a blank world map. But there are some default values that needed to be changed.

```js
function Gdpmap () {
  this.map = new Datamap({
    element: document.getElementById('container'),
    fills: {
        LEVEL1: '#dbdd9b',
        LEVEL2: '#9e8d5b',
        LEVEL3: '#b3c691',
        LEVEL4: '#518c00',
        LEVEL5: '#ccc500',
        LEVEL6: 'orange',
        NORECORD: '#cecece',
        defaultFill: '#cecece'
    },
    scope: 'world',
    geographyConfig: {
      borderColor: 'white',
    },
  });
}
```

There are 6 levels to indicate different GDP value ranges, each level shows a different color. If there's no GDP available for a country, the country's color value will be `NORECORD: '#cecece'`.


### Requesting GDP Data

Use `$.ajax` method to request GDP data from the World Bank API.

```js
//Inside Gdpmap class
this.fetchData = function(data) {
  return $.ajax({
    url: 'https://accesscontrolalloworiginall.herokuapp.com/http://api.worldbank.org/countries/all/indicators/NY.GDP.MKTP.CD',
    dataType: 'json',
    async: true,
    data: data
  });
};
```

However, the whole information is divided into 6 pages. A single request only can get the first page of the data by default. So I used `for` loop to send the requests 6 times to get 6 JSON files, then used `concat` method to make 6 files a whole data object.

### Rendering Data

After receiving and organizing the data from the API, we got a GDP data object like this:

```js
...
137 : {
  country: {id: "BR", value: "Brazil"},
  date: "2016",
  decimal: "0",
  indicator: {
    id: "NY.GDP.MKTP.CD",
    value: "GDP (current US$)"
  },
  value:"1796186586414.45",
  ...
}

...

```

We only need relevant data to render the map. In the end, we have to tell the map what color to render for each country, so we need a data object like this:
```js
{
  CountryA: LEVEL1,
  CountryB: LEVEL2,
  CountryC: LEVEL5,
  CountryD: NORECORD,
  ...
}
```

First step, we need to get the country name and the GDP value, but there is another problem: in `datamaps` library, the country abbreviation is coded by `ISO 3166-1 alpha-3`, which contains three letters. For example: United States is `USA`, China is `CHN`. But the country abbreviation from the World Bank API is coded by `ISO 3166-1 alpha-2`, which contains only two letters. So United States should be `US`, and China should be 'CN'. So we need a way to convert `ISO 3166-1 alpha-2` code into `ISO 3166-1 alpha-3`. In `scripts/country_codes.js`, I created a dictionary for this purpose. Now we can reformat our data.

```js
//Inside Gdpmap class
this.getGdpList = function(data) {
  let gdpArr = data.map(countryData => {
    let code = CODES[countryData.country.id];
    return {
      // to billion dollars
      [code]: countryData.value/1000000000
    };
  });
  this.gdpList = Object.assign({}, ...gdpArr);
};
```

After using this method, we can get a GDP value list like this:

```js
{
  ...
  UGA: 25.527910090628502,
  UKR: 93.27047938852431,
  URY: 52.4197207137316,
  USA: 18569.1,
  UZB: 67.2203355696147,
  VCT: 0.770796555555556,
  ...
}
```

The key is the abbreviation of the country, the value is the GDP value in billion. Now we can render the map with the data. We need methods to convert the GDP values into different levels.

```js
this.getFillKeys = function(data) {
  return data.map(countryData => {
    let code = CODES[countryData.country.id];
    return {
      [code]: {fillKey: this.getFillKey((countryData.value/1000000000))}
    };
  });
};
```

```js
this.getFillKey = function(data) {
  if (!data) { return "NORECORD"; }
  if (data < 1) { return "LEVEL1"; }
  if (data < 10) { return "LEVEL2"; }
  if (data < 100) { return "LEVEL3"; }
  if (data < 1000) { return "LEVEL4"; }
  if (data < 5000) { return "LEVEL5"; }
  if (data >= 5000) { return "LEVEL6"; }
};
```

Now we get an array of objects with the keys of countries and values of an object with the key `fillKey` and the value of the level. `fillKey` if a `datamaps` method for telling the map to render color based on the key value. Now we need to use `Object.assign` method to convert array into an object like this:

```js
...
GNQ: {fillKey: "LEVEL3"},
GRC: {fillKey: "LEVEL4"},
GRD: {fillKey: "LEVEL2"},
GRL: {fillKey: "NORECORD"},
GTM: {fillKey: "LEVEL3"},
GUM: {fillKey: "NORECORD"},
...
```

Finally we can use `datamaps` method to render the map. We put the formatted data into this method:

```js
this.renderMap = function(data) {
  this.map.updateChoropleth(data);
};
```

Now the map can show different colors based on different GDP values.
