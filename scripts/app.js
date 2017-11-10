$(function() {
  const map = new Datamap({
    element: document.getElementById('container'),
    fills: {
              LEVEL1: 'red',
              LEVEL2: 'orage',
              LEVEL3: 'yello',
              LEVEL4: 'green',
              LEVEL5: 'blue',
              LEVEL6: 'purple',
              defaultFill: '#463321'
          },
    scope: 'world',
    options: {
      defaultFill: "#352341"
    },
    geographyConfig: {
      popupTemplate: function(geo, data) {
        return ['<div class="hoverinfo"><strong>',
        'Number of things in ' + geo.properties.name,
        ': ' + data.numberOfThings,
        '</strong></div>'].join('');
      }
    }
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
                [code]: {fillKey: getFillKey((data.value/1000000000).toFixed(2))}
              };
            })
          ;
            let dataObj = toObject(renderedData);
            console.log(dataObj);
            renderMap(dataObj);
          }
        }
      );
    }
  }

  function getFillKey(data) {
    if (data === 0) { return "defaultFill"; }
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

  let startYear = parseInt($('.slider').val());
  $('.year').text(startYear);

  renderDataByYear(startYear);

  $('.slider').on('change', function(){
    $('.year').text(this.value);
    renderDataByYear(parseInt(this.value));
  });

  $('svg path').on('mouseover', function() {
    const countryAbbr = $(this).attr('class').substr(17,19);

  });

});
