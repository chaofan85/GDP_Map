import { Gdpmap } from './gdpmap.js';
import { COUNTRIES } from './country_codes.js';


export function showMap() {
  const gdpMap = new Gdpmap();

  renderData(gdpMap);
  getCountryInfo(gdpMap);
  inputYear(gdpMap);
}

function renderData(map) {
  let startYear = parseInt($('.slider').val());
  $('.year').text(startYear);
  map.renderDataByYear(startYear);

  $('.slider').on('input', function(){
    map.allData = [];
    $('.year').val(parseInt(this.value));
    map.renderDataByYear(parseInt(this.value));
  });
}

function getCountryInfo(map) {
  $('svg path').on('click', function() {
    const countryAbbr = $(this).attr('class').substr(17,19);
    const country = COUNTRIES[countryAbbr];
    const year = $('.year').val();
    $('h3').text(country);
    $('.data-year').text('YEAR: ' + year);

    if (map.gdpList[countryAbbr]) {
      let countryGdp = map.gdpList[countryAbbr].toFixed(2);
      $(".gdp span").text('GDP: $'+countryGdp+'B');
    } else {
      $(".gdp span").text('No Record');
    }

    const url = `https://en.wikipedia.org/wiki/${map.removeSpace(country)}`;
    $(".wiki").html("<a href="+url+" target='_blank'>See More Information</a>");
  });
}


function inputYear(map) {
  $('.year-input').submit(function(e) {
    map.allData = [];
    e.preventDefault();
    const year = parseInt($(".year").val());
    $(".slider").val(year);
    map.renderDataByYear(year);
  });
}
