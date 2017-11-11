$(function() {
  const map = new Datamap({
    element: document.getElementById('container'),
    fills: {
              LEVEL1: '#dbdd9b',
              LEVEL2: '#9e8d5b',
              LEVEL3: '#6a9e5b',
              LEVEL4: '#518c00',
              LEVEL5: '#ccc500',
              LEVEL6: 'orange',
              NORECORD: '#cecece'
          },
    scope: 'world',
    options: {
      defaultFill: "#352341"
    },
    geographyConfig: {
      borderColor: 'white',
    },
  });

  let allData = [];


  function renderDataByYear(year) {
    let count = 0;
    for (var i = 0; i < 6; i++) {
      fetchDataByYear(year, i+1).then(

        payload => {
          allData = allData.concat(payload[1]);
          count++;

          if (count===6) {
            let renderedData = allData.map(data => {
              let code = codes[data.country.id];
              return {
                [code]: {fillKey: getFillKey((data.value/1000000000))}
              };
            });
            let dataObj = toObject(renderedData);
            console.log(renderedData);
            renderMap(dataObj);
          }
        }
      );
    }
  }

  function getFillKey(data) {
    if (data === 0) { return "NORECORD"; }
    if (data < 1) { return "LEVEL1"; }
    if (data < 10) { return "LEVEL2"; }
    if (data < 100) { return "LEVEL3"; }
    if (data < 1000) { return "LEVEL4"; }
    if (data < 5000) { return "LEVEL5"; }
    if (data >= 5000) { return "LEVEL6"; }
  }

  function renderMap(data) {
    map.updateChoropleth(data);
  }

  function toObject(arr) {
    return Object.assign({}, ...arr);
  }

  function fetchDataByYear(year, page){
    let data = {
      format: 'json',
      date: year,
      page: page
    };
    return fetchData(data);
  }

  function fetchData(data) {
    return $.ajax({
      method: 'GET',
      url: 'https://accesscontrolalloworiginall.herokuapp.com/http://api.worldbank.org/countries/all/indicators/NY.GDP.MKTP.CD',
      dataType: 'json',
      async: true,
      data: data
    });
  }

  function getCountryInfo() {
    return allData.map(data => {
      let code = codes[data.country.id];
      return data.value ?
      { [code]: 'GDP: '+(data.value/1000000000).toFixed(2)+'M' }
      :
      { [code]: 'No Record' };
    });
  }

  let startYear = parseInt($('.slider').val());
  $('.year').text(startYear);
  renderDataByYear(startYear);


  $('.slider').on('input', function(){
    allData = [];
    $('.year').val(parseInt(this.value));

    renderDataByYear(parseInt(this.value));
  });

  $('svg path').on('mouseover', function() {
    const countryAbbr = $(this).attr('class').substr(17,19);
    const country = countries[countryAbbr];
    $('h3').text(country);

    const year = $('.year').val();
    $('.data-year').text('Year ' + year)

    let gdpData = getCountryInfo();
    let gdpObj = Object.assign({}, ...gdpData);
    const countryGdp = gdpObj[countryAbbr];
    $(".gdp span").text(countryGdp);

    const url = `https://en.wikipedia.org/wiki/${country}`;
    $(".wiki").html("<a href="+url+" target='_blank'>See More Information</a>");
  });

  $('.year-input').submit(function(e) {
    allData = [];
    e.preventDefault();
    const year = parseInt($(".year").val());
    $(".slider").val(year);
    renderDataByYear(year);
  });

});
