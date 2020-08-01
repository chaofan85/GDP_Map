import Datamap from "datamaps";
import { CODES, COUNTRIES } from "./country_codes.js";

export function Gdpmap() {
  this.map = new Datamap({
    element: document.getElementById("container"),
    fills: {
      LEVEL1: "#dbdd9b",
      LEVEL2: "#9e8d5b",
      LEVEL3: "#b3c691",
      LEVEL4: "#518c00",
      LEVEL5: "#ccc500",
      LEVEL6: "orange",
      NORECORD: "#cecece",
      defaultFill: "#cecece",
    },
    scope: "world",
    geographyConfig: {
      borderColor: "white",
    },
  });

  this.allData = [];
  this.gdpList = {};

  this.renderDataByYear = function (year) {
    let count = 0;
    for (var i = 0; i < 6; i++) {
      this.fetchDataByYear(year, i + 1).then((payload) => {
        this.allData = this.allData.concat(payload[1]);
        count++;

        if (count === 6) {
          this.getGdpList(this.allData);
          let renderedData = this.getFillKeys(this.allData);

          let dataObj = this.toObject(renderedData);
          this.renderMap(dataObj);
        }
      });
    }
  };

  this.getGdpList = function (data) {
    let gdpArr = data.map((countryData) => {
      let code = CODES[countryData.country.id];
      return {
        [code]: countryData.value / 1000000000,
      };
    });
    this.gdpList = Object.assign({}, ...gdpArr);
  };

  this.getFillKeys = function (data) {
    return data.map((countryData) => {
      let code = CODES[countryData.country.id];
      return {
        [code]: { fillKey: this.getFillKey(countryData.value / 1000000000) },
      };
    });
  };

  this.getFillKey = function (data) {
    if (!data) {
      return "NORECORD";
    }
    if (data < 1) {
      return "LEVEL1";
    }
    if (data < 10) {
      return "LEVEL2";
    }
    if (data < 100) {
      return "LEVEL3";
    }
    if (data < 1000) {
      return "LEVEL4";
    }
    if (data < 5000) {
      return "LEVEL5";
    }
    if (data >= 5000) {
      return "LEVEL6";
    }
  };

  this.renderMap = function (data) {
    this.map.updateChoropleth(data);
  };

  this.toObject = function (arr) {
    return Object.assign({}, ...arr);
  };

  this.fetchDataByYear = function (year, page) {
    let data = {
      format: "json",
      date: year,
      page: page,
    };
    return this.fetchData(data);
  };

  this.fetchData = function (data) {
    return $.ajax({
      url:
        "https://accesscontrolalloworiginall.herokuapp.com/http://api.worldbank.org/v2/countries/all/indicators/NY.GDP.MKTP.CD",
      dataType: "json",
      async: true,
      data: data,
    });
  };

  this.removeSpace = function (country) {
    return country.split(" ").join("_");
  };
}
