const map = new Datamap({
  element: document.getElementById('container'),
  scope: 'world',
  options: {
    defaultFill: "#352341"
  }
});

renderDataByYear(2002);

let allData = [];
let count = 0;
function renderDataByYear(year) {

  for (var i = 0; i < 6; i++) {
    fetchDataByYear(year, i+1).then(
      payload => {
        allData = allData.concat(payload[1]);
        count++;
        console.log(count);
        if (count===6) {
          // renderedData = allData.map(data => {
          //   return {}
          // })
          renderMap();
        }
      }
    );
  }
}

function renderMap() {
  map.updateChoropleth({
    USA: '444444',
    CAN: '999999'
  });
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
