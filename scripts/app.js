import { Gdpmap } from './gdpmap.js';
import { COUNTRIES } from './country_codes.js';


$(function() {

  const gdpMap = new Gdpmap();

  let startYear = parseInt($('.slider').val());
  $('.year').text(startYear);
  gdpMap.renderDataByYear(startYear);


  $('.slider').on('input', function(){
    gdpMap.allData = [];
    $('.year').val(parseInt(this.value));
    gdpMap.renderDataByYear(parseInt(this.value));
  });


  $('svg path').on('click', function() {
    const countryAbbr = $(this).attr('class').substr(17,19);
    const country = COUNTRIES[countryAbbr];
    const year = $('.year').val();
    $('h3').text(country);
    $('.data-year').text('YEAR: ' + year);

    if (gdpMap.gdpList[countryAbbr]) {
      let countryGdp = gdpMap.gdpList[countryAbbr].toFixed(2);
      $(".gdp span").text('GDP: $'+countryGdp+'B');
    } else {
      $(".gdp span").text('No Record');
    }

    const url = `https://en.wikipedia.org/wiki/${gdpMap.removeSpace(country)}`;
    $(".wiki").html("<a href="+url+" target='_blank'>See More Information</a>");
  });


  $('.year-input').submit(function(e) {
    gdpMap.allData = [];
    e.preventDefault();
    const year = parseInt($(".year").val());
    $(".slider").val(year);
    gdpMap.renderDataByYear(year);
  });

});
