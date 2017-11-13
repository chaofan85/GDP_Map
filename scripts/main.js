/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_datamaps_dist_datamaps_world_hires_min_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_datamaps_dist_datamaps_world_hires_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_datamaps_dist_datamaps_world_hires_min_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js__);



__WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()(function() {

  const map = new __WEBPACK_IMPORTED_MODULE_0__node_modules_datamaps_dist_datamaps_world_hires_min_js___default.a({
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
    geographyConfig: {
      borderColor: 'white',
    },
  });

  let allData = [];
  let gdpList;

  function renderDataByYear(year) {
    let count = 0;
    for (var i = 0; i < 6; i++) {
      fetchDataByYear(year, i+1).then(
        payload => {
          allData = allData.concat(payload[1]);
          count++;

          if (count===6) {
            getGdpList(allData);
            let renderedData = getFillKeys(allData);
            let dataObj = toObject(renderedData);
            renderMap(dataObj);
          }
        }
      );
    }
  }

  const getGdpList = (data) => {
    let gdpArr = data.map(countryData => {
      let code = codes[countryData.country.id];
      return {
        [code]: countryData.value/1000000000
      };
    });
    gdpList = Object.assign({}, ...gdpArr);
  };


  function getFillKeys(data) {
    return data.map(countryData => {
      let code = codes[countryData.country.id];
      return {
        [code]: {fillKey: getFillKey((countryData.value/1000000000))}
      };
    });
  }

  function getFillKey(data) {
    if (!data) { return "NORECORD"; }
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
    return __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default.a.ajax({
      url: 'https://accesscontrolalloworiginall.herokuapp.com/http://api.worldbank.org/countries/all/indicators/NY.GDP.MKTP.CD',
      dataType: 'json',
      async: true,
      data: data
    });
  }

  let startYear = parseInt(__WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('.slider').val());
  __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('.year').text(startYear);
  renderDataByYear(startYear);


  __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('.slider').on('input', function(){
    allData = [];
    __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('.year').val(parseInt(this.value));
    renderDataByYear(parseInt(this.value));
  });


  __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('svg path').on('mouseover', function() {
    const countryAbbr = __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()(this).attr('class').substr(17,19);
    const country = countries[countryAbbr];
    const year = __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('.year').val();
    __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('h3').text(country);
    __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('.data-year').text('YEAR: ' + year)

    if (gdpList[countryAbbr]) {
      let countryGdp = gdpList[countryAbbr].toFixed(2);
      __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()(".gdp span").text('GDP: $'+countryGdp+'B');
    } else {
      __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()(".gdp span").text('No Record');
    }

    const url = `https://en.wikipedia.org/wiki/${country}`;
    __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()(".wiki").html("<a href="+url+" target='_blank'>See More Information</a>");
  });


  __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()('.year-input').submit(function(e) {
    allData = [];
    e.preventDefault();
    const year = parseInt(__WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()(".year").val());
    __WEBPACK_IMPORTED_MODULE_1__jquery_3_2_1_min_js___default()(".slider").val(year);
    renderDataByYear(year);
  });

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!function(){function a(a,b,c){"undefined"==typeof c&&(c=b,optionsValues=void 0);var d="undefined"!=typeof a?a:b;if("undefined"==typeof d)return null;if("function"==typeof d){var e=[c];return c.geography&&(e=[c.geography,c.data]),d.apply(null,e)}return d}function b(a,b,c){return this.svg=n.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(n.select(this.options.element).style({position:"relative","padding-bottom":100*this.options.aspectRatio+"%"}),n.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function c(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=n.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=n.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=n.geo.path().projection(c),{path:d,projection:c}}function d(){n.select(".datamaps-style-block").empty()&&n.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path:not(.datamaps-arc), .datamap circle, .datamap line {stroke: #FFFFFF; vector-effect: non-scaling-stroke; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function e(b){var c=this.options.fills,d=this.options.data||{},e=this.options.geographyConfig,f=this.svg.select("g.datamaps-subunits");f.empty()&&(f=this.addLayer("datamaps-subunits",null,!0));var g=o.feature(b,b.objects[this.options.scope]).features;e.hideAntarctica&&(g=g.filter(function(a){return"ATA"!==a.id})),e.hideHawaiiAndAlaska&&(g=g.filter(function(a){return"HI"!==a.id&&"AK"!==a.id}));var h=f.selectAll("path.datamaps-subunit").data(g);h.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(d[a.id])}).style("fill",function(b){var e,f=d[b.id];return f&&f.fillKey&&(e=c[a(f.fillKey,{data:d[b.id],geography:b})]),"undefined"==typeof e&&(e=a(f&&f.fillColor,c.defaultFill,{data:d[b.id],geography:b})),e}).style("stroke-width",e.borderWidth).style("stroke-opacity",e.borderOpacity).style("stroke",e.borderColor)}function f(){function b(){this.parentNode.appendChild(this)}var c=this.svg,d=this,e=this.options.geographyConfig;(e.highlightOnHover||e.popupOnHover)&&c.selectAll(".datamaps-subunit").on("mouseover",function(f){var g=n.select(this),h=d.options.data[f.id]||{};if(e.highlightOnHover){var i={fill:g.style("fill"),stroke:g.style("stroke"),"stroke-width":g.style("stroke-width"),"fill-opacity":g.style("fill-opacity")};g.style("fill",a(h.highlightFillColor,e.highlightFillColor,h)).style("stroke",a(h.highlightBorderColor,e.highlightBorderColor,h)).style("stroke-width",a(h.highlightBorderWidth,e.highlightBorderWidth,h)).style("stroke-opacity",a(h.highlightBorderOpacity,e.highlightBorderOpacity,h)).style("fill-opacity",a(h.highlightFillOpacity,e.highlightFillOpacity,h)).attr("data-previousAttributes",JSON.stringify(i)),/((MSIE)|(Trident))/.test(navigator.userAgent)||b.call(this)}e.popupOnHover&&d.updatePopup(g,f,e,c)}).on("mouseout",function(){var a=n.select(this);if(e.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),n.selectAll(".datamaps-hoverover").style("display","none")})}function g(a,b,c){if(b=b||{},this.options.fills){var d="<dl>",e="";b.legendTitle&&(d="<h2>"+b.legendTitle+"</h2>"+d);for(var f in this.options.fills){if("defaultFill"===f){if(!b.defaultFillName)continue;e=b.defaultFillName}else e=b.labels&&b.labels[f]?b.labels[f]:f+": ";d+="<dt>"+e+"</dt>",d+='<dd style="background-color:'+this.options.fills[f]+'">&nbsp;</dd>'}d+="</dl>";n.select(this.options.element).append("div").attr("class","datamaps-legend").html(d)}}function h(a,b){var c=n.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(c).attr("class","datamaps-graticule").attr("d",this.path)}function i(b,c,d){var e=this,f=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - arcs must be an array";for(var g=0;g<c.length;g++)c[g]=l(c[g],c[g].options),delete c[g].options;"undefined"==typeof d&&(d=p.arcConfig);var h=b.selectAll("path.datamaps-arc").data(c,JSON.stringify),i=n.geo.path().projection(e.projection);h.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(b){return a(b.strokeColor,d.strokeColor,b)}).style("fill","none").style("stroke-width",function(b){return a(b.strokeWidth,d.strokeWidth,b)}).attr("d",function(b){var c,g;if("string"==typeof b.origin)switch(b.origin){case"CAN":c=e.latLngToXY(56.624472,-114.665293);break;case"CHL":c=e.latLngToXY(-33.44889,-70.669265);break;case"IDN":c=e.latLngToXY(-6.208763,106.845599);break;case"JPN":c=e.latLngToXY(35.689487,139.691706);break;case"MYS":c=e.latLngToXY(3.139003,101.686855);break;case"NOR":c=e.latLngToXY(59.913869,10.752245);break;case"USA":c=e.latLngToXY(41.140276,-100.760145);break;case"VNM":c=e.latLngToXY(21.027764,105.83416);break;default:c=e.path.centroid(f.select("path."+b.origin).data()[0])}else c=e.latLngToXY(a(b.origin.latitude,b),a(b.origin.longitude,b));if("string"==typeof b.destination)switch(b.destination){case"CAN":g=e.latLngToXY(56.624472,-114.665293);break;case"CHL":g=e.latLngToXY(-33.44889,-70.669265);break;case"IDN":g=e.latLngToXY(-6.208763,106.845599);break;case"JPN":g=e.latLngToXY(35.689487,139.691706);break;case"MYS":g=e.latLngToXY(3.139003,101.686855);break;case"NOR":g=e.latLngToXY(59.913869,10.752245);break;case"USA":g=e.latLngToXY(41.140276,-100.760145);break;case"VNM":g=e.latLngToXY(21.027764,105.83416);break;default:g=e.path.centroid(f.select("path."+b.destination).data()[0])}else g=e.latLngToXY(a(b.destination.latitude,b),a(b.destination.longitude,b));var h=[(c[0]+g[0])/2,(c[1]+g[1])/2];if(d.greatArc){var j=n.geo.greatArc().source(function(b){return[a(b.origin.longitude,b),a(b.origin.latitude,b)]}).target(function(b){return[a(b.destination.longitude,b),a(b.destination.latitude,b)]});return i(j(b))}var k=a(b.arcSharpness,d.arcSharpness,b);return"M"+c[0]+","+c[1]+"S"+(h[0]+50*k)+","+(h[1]-75*k)+","+g[0]+","+g[1]}).attr("data-info",function(a){return JSON.stringify(a)}).on("mouseover",function(a){var b=n.select(this);d.popupOnHover&&e.updatePopup(b,a,d,f)}).on("mouseout",function(a){n.select(this);n.selectAll(".datamaps-hoverover").style("display","none")}).transition().delay(100).style("fill",function(b){var c=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=c+" "+c,this.style.strokeDashoffset=c,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+a(b.animationSpeed,d.animationSpeed,b)+"ms ease-out",this.style.strokeDashoffset="0","none"}),h.exit().transition().style("opacity",0).remove()}function j(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(function(){return b.customLabelText&&b.customLabelText[e.id]?b.customLabelText[e.id]:e.id}),"bar"})}function k(b,c,d){function e(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var f=this,g=this.options.fills,h=this.options.filters,i=this.svg;if(!c||c&&!c.slice)throw"Datamaps Error - bubbles must be an array";var j=b.selectAll("circle.datamaps-bubble").data(c,d.key);j.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;if(e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b="USA"===a.centered?f.projection([-98.58333,39.83333]):f.path.centroid(i.select("path."+a.centered).data()[0])),b)return b[0]}).attr("cy",function(a){var b;if(e(a)?b=f.latLngToXY(a.latitude,a.longitude):a.centered&&(b="USA"===a.centered?f.projection([-98.58333,39.83333]):f.path.centroid(i.select("path."+a.centered).data()[0])),b)return b[1]}).attr("r",function(b){return d.animate?0:a(b.radius,d.radius,b)}).attr("data-info",function(a){return JSON.stringify(a)}).attr("filter",function(b){var c=h[a(b.filterKey,d.filterKey,b)];if(c)return c}).style("stroke",function(b){return a(b.borderColor,d.borderColor,b)}).style("stroke-width",function(b){return a(b.borderWidth,d.borderWidth,b)}).style("stroke-opacity",function(b){return a(b.borderOpacity,d.borderOpacity,b)}).style("fill-opacity",function(b){return a(b.fillOpacity,d.fillOpacity,b)}).style("fill",function(b){var c=g[a(b.fillKey,d.fillKey,b)];return c||g.defaultFill}).on("mouseover",function(b){var c=n.select(this);if(d.highlightOnHover){var e={fill:c.style("fill"),stroke:c.style("stroke"),"stroke-width":c.style("stroke-width"),"fill-opacity":c.style("fill-opacity")};c.style("fill",a(b.highlightFillColor,d.highlightFillColor,b)).style("stroke",a(b.highlightBorderColor,d.highlightBorderColor,b)).style("stroke-width",a(b.highlightBorderWidth,d.highlightBorderWidth,b)).style("stroke-opacity",a(b.highlightBorderOpacity,d.highlightBorderOpacity,b)).style("fill-opacity",a(b.highlightFillOpacity,d.highlightFillOpacity,b)).attr("data-previousAttributes",JSON.stringify(e))}d.popupOnHover&&f.updatePopup(c,b,d,i)}).on("mouseout",function(a){var b=n.select(this);if(d.highlightOnHover){var c=JSON.parse(b.attr("data-previousAttributes"));for(var e in c)b.style(e,c[e])}n.selectAll(".datamaps-hoverover").style("display","none")}),j.transition().duration(400).attr("r",function(b){return a(b.radius,d.radius,b)}).transition().duration(0).attr("data-info",function(a){return JSON.stringify(a)}),j.exit().transition().delay(d.exitDelay).attr("r",0).remove()}function l(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&("function"==typeof b[c]?a[c]=b[c]:a[c]=JSON.parse(JSON.stringify(b[c])))}),a}function m(a){if("undefined"==typeof n||"undefined"==typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=l(a,p),this.options.geographyConfig=l(a.geographyConfig,p.geographyConfig),this.options.projectionConfig=l(a.projectionConfig,p.projectionConfig),this.options.bubblesConfig=l(a.bubblesConfig,p.bubblesConfig),this.options.arcConfig=l(a.arcConfig,p.arcConfig),n.select(this.options.element).select("svg").length>0&&b.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",k),this.addPlugin("legend",g),this.addPlugin("arc",i),this.addPlugin("labels",j),this.addPlugin("graticule",h),this.options.disableDefaultStyles||d(),this.draw()}var n=window.d3,o=window.topojson,p={scope:"world",responsive:!1,aspectRatio:.5625,setProjection:c,projection:"equirectangular",dataType:"json",data:{},done:function(){},fills:{defaultFill:"#ABDDA4"},filters:{},geographyConfig:{dataUrl:null,hideAntarctica:!0,hideHawaiiAndAlaska:!1,borderWidth:1,borderOpacity:1,borderColor:"#FDFDFD",popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightBorderOpacity:1},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderOpacity:1,borderColor:"#FFFFFF",popupOnHover:!0,radius:null,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightBorderOpacity:1,highlightFillOpacity:.85,exitDelay:100,key:JSON.stringify},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600,popupOnHover:!1,popupTemplate:function(a,b){return b.origin&&b.destination&&b.origin.latitude&&b.origin.longitude&&b.destination.latitude&&b.destination.longitude?'<div class="hoverinfo"><strong>Arc</strong><br>Origin: '+JSON.stringify(b.origin)+"<br>Destination: "+JSON.stringify(b.destination)+"</div>":b.origin&&b.destination?'<div class="hoverinfo"><strong>Arc</strong><br>'+b.origin+" -> "+b.destination+"</div>":""}}};m.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c=b.element.clientWidth,d=n.select(b.element).select("svg").attr("data-width");n.select(b.element).select("svg").selectAll("g").attr("transform","scale("+c/d+")")}},m.prototype.draw=function(){function a(a){b.options.dataUrl&&n[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),e.call(b,a),f.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=n.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,d=c.setProjection.apply(this,[c.element,c]);return this.path=d.path,this.projection=d.projection,c.geographyConfig.dataUrl?n.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},m.prototype.worldTopo={type:"Topology",objects:{world:{type:"GeometryCollection",geometries:[{type:"Polygon",id:"ABW",properties:{name:"Aruba",iso:"ABW"},arcs:[[0]]},{type:"Polygon",id:"AFG",properties:{name:"Afghanistan",iso:"AFG"},arcs:[[1,2,3,4,5,6]]},{type:"MultiPolygon",id:"AGO",properties:{name:"Angola",iso:"AGO"},arcs:[[[7,8,9,10]],[[11,12,13]]]},{type:"Polygon",id:"AIA",properties:{name:"Anguilla",iso:"AIA"},arcs:[[14]]},{type:"Polygon",id:"ALB",properties:{name:"Albania",iso:"ALB"},arcs:[[15,16,17,18,19]]},{type:"MultiPolygon",id:"ALA",properties:{name:"Åland Islands",iso:"ALA"},arcs:[[[20]],[[21]],[[22]]]},{type:"Polygon",id:"AND",properties:{name:"Andorra",iso:"AND"},arcs:[[23,24]]},{type:"MultiPolygon",id:"ARE",properties:{name:"United Arab Emirates",iso:"ARE"},arcs:[[[25]],[[26]],[[27]],[[28]],[[29,30,31,32,33],[34]]]},{type:"MultiPolygon",id:"ARG",properties:{name:"Argentina",iso:"ARG"},arcs:[[[35]],[[36,37]],[[38]],[[39,40,41,42,43,44]]]},{type:"MultiPolygon",id:"ARM",properties:{name:"Armenia",iso:"ARM"},arcs:[[[45]],[[46,47,48,49,50],[51]]]},{type:"Polygon",id:"ASM",properties:{name:"American Samoa",iso:"ASM"},arcs:[[52]]},{type:"MultiPolygon",id:"ATA",properties:{name:"Antarctica",iso:"ATA"},arcs:[[[53]],[[54]],[[55]],[[56]],[[57]],[[58]],[[59]],[[60]],[[61]],[[62]],[[63]],[[64]],[[65]],[[66]],[[67]],[[68]],[[69]],[[70]],[[71]],[[72]],[[73]],[[74]],[[75]],[[76]],[[77]],[[78]],[[79]],[[80]],[[81]],[[82]],[[83]],[[84]],[[85]],[[86]],[[87]],[[88]],[[89]],[[90]],[[91]],[[92]],[[93]],[[94]],[[95]],[[96]],[[97]],[[98]],[[99]],[[100]],[[101]],[[102]],[[103]],[[104]],[[105]],[[106]],[[107]],[[108]],[[109]],[[110]],[[111]],[[112]],[[113]],[[114]],[[115]],[[116]],[[117]],[[118]],[[119]],[[120]],[[121]],[[122]],[[123]],[[124]],[[125]],[[126]],[[127]],[[128]],[[129]],[[130]],[[131]],[[132]],[[133]],[[134]],[[135]],[[136]],[[137]],[[138]],[[139]],[[140]],[[141]],[[142]],[[143]],[[144]],[[145]],[[146]],[[147]],[[148]],[[149]],[[150]],[[151]],[[152]],[[153]],[[154]],[[155]],[[156]],[[157]],[[158]]]},{type:"MultiPolygon",id:"ATF",properties:{name:"French Southern Territories",iso:"ATF"},arcs:[[[159]],[[160]],[[161]]]},{type:"MultiPolygon",id:"ATG",properties:{name:"Antigua and Barbuda",iso:"ATG"},arcs:[[[162]],[[163]]]},{type:"MultiPolygon",id:"AUS",properties:{name:"Australia",iso:"AUS"},arcs:[[[164]],[[165]],[[166]],[[167]],[[168]],[[169]],[[170]],[[171]],[[172]],[[173]],[[174]],[[175]],[[176]],[[177]],[[178]],[[179]],[[180]],[[181]],[[182]],[[183]],[[184]],[[185]],[[186]],[[187]],[[188]],[[189]],[[190]],[[191]],[[192]],[[193]],[[194]],[[195]],[[196]],[[197]],[[198]],[[199]],[[200]],[[201]],[[202]]]},{type:"Polygon",id:"AUT",properties:{name:"Austria",iso:"AUT"},arcs:[[203,204,205,206,207,208,209,210,211]]},{type:"MultiPolygon",id:"AZE",properties:{name:"Azerbaijan",iso:"AZE"},arcs:[[[212,213,-48]],[[-52]],[[214,-51,215,216,217],[-46]]]},{type:"Polygon",id:"BDI",properties:{name:"Burundi",iso:"BDI"},arcs:[[218,219,220]]},{type:"Polygon",id:"BEL",properties:{name:"Belgium",iso:"BEL"},arcs:[[221,222,223,224,225,226,227]]},{type:"Polygon",id:"BEN",properties:{name:"Benin",iso:"BEN"},arcs:[[228,229,230,231,232]]},{type:"Polygon",id:"BFA",properties:{name:"Burkina Faso",iso:"BFA"},arcs:[[-230,233,234,235,236,237]]},{type:"MultiPolygon",id:"BGD",properties:{name:"Bangladesh",iso:"BGD"},arcs:[[[238]],[[239]],[[240]],[[241]],[[242]],[[243]],[[244,245,246]]]},{type:"Polygon",id:"BGR",properties:{name:"Bulgaria",iso:"BGR"},arcs:[[247,248,249,250,251,252]]},{type:"Polygon",id:"BHR",properties:{name:"Bahrain",iso:"BHR"},arcs:[[253]]},{type:"MultiPolygon",id:"BHS",properties:{name:"Bahamas",iso:"BHS"},arcs:[[[254]],[[255]],[[256]],[[257]],[[258]],[[259]],[[260]],[[261]],[[262]],[[263]],[[264]],[[265]],[[266]],[[267]],[[268]]]},{type:"Polygon",id:"BIH",properties:{name:"Bosnia and Herzegovina",iso:"BIH"},arcs:[[269,270,271,272,273]]},{type:"Polygon",id:"BLM",properties:{name:"Saint Barthélemy",iso:"BLM"},arcs:[[274]]},{type:"Polygon",id:"BLR",properties:{name:"Belarus",iso:"BLR"},arcs:[[275,276,277,278,279]]},{type:"MultiPolygon",id:"BLZ",properties:{name:"Belize",iso:"BLZ"},arcs:[[[280]],[[281]],[[282,283,284]]]},{type:"Polygon",id:"BMU",properties:{name:"Bermuda",iso:"BMU"},arcs:[[285]]},{type:"Polygon",id:"BOL",properties:{name:"Bolivia, Plurinational State of",iso:"BOL"},arcs:[[-45,286,287,288,289]]},{type:"MultiPolygon",id:"BRA",properties:{name:"Brazil",iso:"BRA"},arcs:[[[290]],[[291]],[[292]],[[293]],[[294]],[[295]],[[296]],[[297]],[[298]],[[299]],[[300]],[[301]],[[302]],[[303]],[[304]],[[305]],[[306,307,308,309,-41,310,-289,311,312,313,314]]]},{type:"Polygon",id:"BRB",properties:{name:"Barbados",iso:"BRB"},arcs:[[315]]},{type:"MultiPolygon",id:"BRN",properties:{name:"Brunei Darussalam",iso:"BRN"},arcs:[[[316,317]],[[318,319]]]},{type:"Polygon",id:"BTN",properties:{name:"Bhutan",iso:"BTN"},arcs:[[320,321]]},{type:"Polygon",id:"BWA",properties:{name:"Botswana",iso:"BWA"},arcs:[[322,323,324]]},{type:"Polygon",id:"CAF",properties:{name:"Central African Republic",iso:"CAF"},arcs:[[325,326,327,328,329,330]]},{type:"MultiPolygon",id:"CAN",properties:{name:"Canada",iso:"CAN"},arcs:[[[331]],[[332]],[[333]],[[334]],[[335]],[[336]],[[337]],[[338]],[[339]],[[340]],[[341]],[[342]],[[343,344]],[[345]],[[346]],[[347]],[[348]],[[349]],[[350]],[[351]],[[352]],[[353]],[[354]],[[355]],[[356]],[[357]],[[358]],[[359]],[[360]],[[361]],[[362]],[[363]],[[364]],[[365]],[[366]],[[367]],[[368]],[[369]],[[370]],[[371,372]],[[373]],[[374]],[[375]],[[376]],[[377]],[[378]],[[379]],[[380]],[[381]],[[382]],[[383]],[[384]],[[385]],[[386]],[[387]],[[388]],[[389]],[[390]],[[391]],[[392]],[[393]],[[394]],[[395]],[[396]],[[397]],[[398]],[[399]],[[400]],[[401]],[[402]],[[403]],[[404]],[[405]],[[406]],[[407]],[[408]],[[409]],[[410]],[[411]],[[412]],[[413]],[[414]],[[415]],[[416]],[[417]],[[418]],[[419]],[[420]],[[421]],[[422]],[[423]],[[424]],[[425]],[[426,427,428,429]],[[430]],[[431]],[[432]],[[433]],[[434]],[[435]],[[436]],[[437]],[[438]],[[439]],[[440]],[[441]],[[442]],[[443]],[[444]],[[445]],[[446]],[[447]],[[448]],[[449]],[[450]],[[451]],[[452]],[[453]],[[454]],[[455]],[[456]],[[457]],[[458]],[[459]],[[460]],[[461]],[[462]],[[463]],[[464]],[[465]],[[466]],[[467]],[[468]],[[469]]]},{type:"Polygon",id:"CHE",properties:{name:"Switzerland",iso:"CHE"},arcs:[[470,-207,471,472,473,-209]]},{type:"MultiPolygon",id:"CHL",properties:{name:"Chile",iso:"CHL"},arcs:[[[474]],[[475]],[[476]],[[477]],[[478]],[[479]],[[480]],[[481]],[[482]],[[-37,483]],[[484]],[[485]],[[486]],[[487]],[[488]],[[489]],[[490]],[[491]],[[492]],[[493]],[[494]],[[495]],[[496]],[[497]],[[498]],[[499]],[[500]],[[501]],[[502]],[[503]],[[-44,504,505,-287]]]},{type:"MultiPolygon",id:"CHN",properties:{name:"China",iso:"CHN"},arcs:[[[506]],[[507]],[[508]],[[509]],[[510]],[[511]],[[512]],[[513]],[[514]],[[515]],[[516]],[[517]],[[518,519,520,521,522,523,524,525,526,527,-321,528,529,530,531,532,533,534,-7,535,536,537,538,539,540]]]},{type:"MultiPolygon",id:"CIV",properties:{name:"Côte d'Ivoire",iso:"CIV"},arcs:[[[541,542]],[[-236,543,544,545,546,547]]]},{type:"Polygon",id:"CMR",properties:{name:"Cameroon",iso:"CMR"},arcs:[[548,549,550,551,552,553,-329]]},{type:"Polygon",id:"COD",properties:{name:"Congo, the Democratic Republic of the",iso:"COD"},arcs:[[554,555,-219,556,557,-11,558,-13,559,-327,560]]},{type:"Polygon",id:"COG",properties:{name:"Congo",iso:"COG"},arcs:[[-12,561,562,-549,-328,-560]]},{type:"Polygon",id:"COK",properties:{name:"Cook Islands",iso:"COK"},arcs:[[563]]},{type:"MultiPolygon",id:"COL",properties:{name:"Colombia",iso:"COL"},arcs:[[[564]],[[565,-313,566,567,568,569,570]]]},{type:"MultiPolygon",id:"COM",properties:{name:"Comoros",iso:"COM"},arcs:[[[571]],[[572]],[[573]]]},{type:"MultiPolygon",id:"CPV",properties:{name:"Cape Verde",iso:"CPV"},arcs:[[[574]],[[575]],[[576]],[[577]],[[578]],[[579]],[[580]],[[581]]]},{type:"Polygon",id:"CRI",properties:{name:"Costa Rica",iso:"CRI"},arcs:[[582,583,584,585]]},{type:"MultiPolygon",id:"CUB",properties:{name:"Cuba",iso:"CUB"},arcs:[[[586]],[[587]],[[588]],[[589]],[[590]],[[591]],[[592]]]},{type:"Polygon",id:"CUW",properties:{name:"Curaçao",iso:"CUW"},arcs:[[593]]},{type:"MultiPolygon",id:"CYM",properties:{name:"Cayman Islands",iso:"CYM"},arcs:[[[594]],[[595]]]},{type:"Polygon",id:"northern_cyprus",properties:{name:"Northern Cyprus",iso:null},arcs:[[596,597]]},{type:"Polygon",id:"CYP",properties:{name:"Cyprus",iso:"CYP"},arcs:[[-597,598]]},{type:"Polygon",id:"CZE",properties:{name:"Czech Republic",iso:"CZE"},arcs:[[599,-211,600,601]]},{type:"MultiPolygon",id:"DEU",properties:{name:"Germany",iso:"DEU"},arcs:[[[602,603]],[[604]],[[605]],[[606]],[[607,-601,-210,-474,608,609,-222,610,611,612,613]],[[614]]]},{type:"Polygon",id:"DJI",properties:{name:"Djibouti",iso:"DJI"},arcs:[[615,616,617,618]]},{type:"Polygon",id:"DMA",properties:{name:"Dominica",iso:"DMA"},arcs:[[619]]},{type:"MultiPolygon",id:"DNK",properties:{name:"Denmark",iso:"DNK"},arcs:[[[620]],[[621]],[[622]],[[623]],[[624]],[[625]],[[626]],[[627]],[[628]],[[629]],[[630]],[[-613,631]]]},{type:"Polygon",id:"DOM",properties:{name:"Dominican Republic",iso:"DOM"},arcs:[[632,633]]},{type:"Polygon",id:"DZA",properties:{name:"Algeria",iso:"DZA"},arcs:[[634,635,636,637,638,639,640,641]]},{type:"MultiPolygon",id:"ECU",properties:{name:"Ecuador",iso:"ECU"},arcs:[[[642]],[[643]],[[644]],[[645]],[[646]],[[647]],[[648]],[[649]],[[650,651,-568]]]},{type:"Polygon",id:"EGY",properties:{name:"Egypt",iso:"EGY"},arcs:[[652,653,654,655,656,657]]},{type:"MultiPolygon",id:"ERI",properties:{name:"Eritrea",iso:"ERI"},arcs:[[[658]],[[659]],[[-617,660,661,662]]]},{type:"MultiPolygon",id:"ESP",properties:{name:"Spain",iso:"ESP"},arcs:[[[663]],[[664]],[[665]],[[666]],[[667]],[[668]],[[669]],[[670]],[[671]],[[672]],[[673]],[[674,-25,675,676,677,678,679]]]},{type:"MultiPolygon",id:"EST",properties:{name:"Estonia",iso:"EST"},arcs:[[[680]],[[681]],[[682]],[[683,684,685]]]},{type:"Polygon",id:"ETH",properties:{name:"Ethiopia",iso:"ETH"},arcs:[[-616,686,687,688,689,690,-661]]},{type:"MultiPolygon",id:"FIN",properties:{name:"Finland",iso:"FIN"},arcs:[[[691]],[[692]],[[693]],[[694]],[[695]],[[696]],[[697]],[[698,699,700,701]]]},{type:"MultiPolygon",id:"FJI",properties:{name:"Fiji",iso:"FJI"},arcs:[[[702]],[[703]],[[704]],[[705]],[[706]],[[707]],[[708]],[[709]],[[710]],[[711]],[[712]],[[713]],[[714]],[[715]],[[716]]]},{type:"MultiPolygon",id:"FLK",properties:{name:"Falkland Islands (Malvinas)",iso:"FLK"},arcs:[[[717]],[[718]],[[719]],[[720]],[[721]],[[722]]]},{type:"MultiPolygon",id:"FRA",properties:{name:"France",iso:"FRA"},arcs:[[[723]],[[724]],[[725,-609,-473,726,727,728,729,-676,-24,-675,730,-224]]]},{type:"Polygon",id:"GUF",properties:{name:"French Guiana",iso:"GUF"},arcs:[[-308,731,732]]},{type:"MultiPolygon",id:"FRO",properties:{name:"Faroe Islands",iso:"FRO"},arcs:[[[733]],[[734]],[[735]],[[736]],[[737]]]},{type:"MultiPolygon",id:"FSM",properties:{name:"Micronesia, Federated States of",iso:"FSM"},arcs:[[[738]],[[739]],[[740]],[[741]],[[742]]]},{type:"Polygon",id:"GAB",properties:{name:"Gabon",iso:"GAB"},arcs:[[743,-550,-563,744]]},{type:"MultiPolygon",id:"GBR",properties:{name:"United Kingdom",iso:"GBR"},arcs:[[[745]],[[746]],[[747,748]],[[749]],[[750]],[[751]],[[752]],[[753]],[[754]],[[755]],[[756]],[[757]],[[758]],[[759]],[[760]],[[761]],[[762]],[[763]],[[764]],[[765]],[[766]]]},{type:"Polygon",id:"GEO",properties:{name:"Georgia",iso:"GEO"},arcs:[[-50,767,768,769,-216]]},{type:"Polygon",id:"GGY",properties:{name:"Guernsey",iso:"GGY"},arcs:[[770]]},{type:"Polygon",id:"GHA",properties:{name:"Ghana",iso:"GHA"},arcs:[[-542,771,-544,-235,772,773]]},{type:"Polygon",id:"GIN",properties:{name:"Guinea",iso:"GIN"},arcs:[[-547,774,775,776,777,778,779]]},{type:"Polygon",id:"GMB",properties:{name:"Gambia",iso:"GMB"},arcs:[[780,781]]},{type:"MultiPolygon",id:"GNB",properties:{name:"Guinea-Bissau",iso:"GNB"},arcs:[[[782]],[[783]],[[784]],[[785]],[[786]],[[787]],[[788,-778,789]]]},{type:"MultiPolygon",id:"GNQ",properties:{name:"Equatorial Guinea",iso:"GNQ"},arcs:[[[-551,-744,790]],[[791]]]},{type:"MultiPolygon",id:"GRC",properties:{name:"Greece",iso:"GRC"},arcs:[[[792]],[[793]],[[794]],[[795]],[[796]],[[797]],[[798]],[[799]],[[800]],[[801]],[[802]],[[803]],[[804]],[[805]],[[806]],[[807]],[[808]],[[809]],[[810]],[[811]],[[812]],[[813]],[[814]],[[815]],[[816]],[[817]],[[818]],[[819]],[[820]],[[821]],[[822]],[[823]],[[824]],[[825]],[[826]],[[827]],[[828]],[[829]],[[-17,830,-249,831,832]]]},{type:"Polygon",id:"GRD",properties:{name:"Grenada",iso:"GRD"},arcs:[[833]]},{type:"MultiPolygon",id:"GRL",properties:{name:"Greenland",iso:"GRL"},arcs:[[[834]],[[835]],[[836]],[[837]],[[838]],[[839]],[[840]],[[841]],[[842]],[[843]],[[844]],[[845]],[[846]],[[847]],[[848]],[[849]],[[850]]]},{type:"Polygon",id:"GTM",properties:{name:"Guatemala",iso:"GTM"},arcs:[[851,852,853,854,-283,855]]},{type:"Polygon",id:"GUM",properties:{name:"Guam",iso:"GUM"},arcs:[[856]]},{type:"Polygon",id:"GUY",properties:{name:"Guyana",iso:"GUY"},arcs:[[-315,857,858,859]]},{type:"MultiPolygon",id:"HKG",properties:{name:"Hong Kong",iso:"HKG"},arcs:[[[860]],[[861]],[[-521,862]]]},{type:"Polygon",id:"HMD",properties:{name:"Heard Island and McDonald Islands",iso:"HMD"},arcs:[[863]]},{type:"MultiPolygon",id:"HND",properties:{name:"Honduras",iso:"HND"},arcs:[[[864,865,866,-852,867]],[[868]],[[869]]]},{type:"MultiPolygon",id:"HRV",properties:{name:"Croatia",iso:"HRV"},arcs:[[[870]],[[-272,871,872]],[[873]],[[874]],[[875]],[[876]],[[877]],[[878]],[[879,-274,880,881,882]]]},{type:"MultiPolygon",id:"HTI",properties:{name:"Haiti",iso:"HTI"},arcs:[[[883]],[[-633,884]],[[885]]]},{type:"Polygon",id:"HUN",properties:{name:"Hungary",iso:"HUN"},arcs:[[886,887,-883,888,-204,889,890]]},{type:"MultiPolygon",id:"IDN",properties:{name:"Indonesia",iso:"IDN"},arcs:[[[891]],[[892]],[[893]],[[894]],[[895,896,897,898]],[[899]],[[900]],[[901]],[[902]],[[903]],[[904]],[[905]],[[906]],[[907]],[[908]],[[909]],[[910]],[[911]],[[912]],[[913]],[[914]],[[915]],[[916]],[[917]],[[918]],[[919]],[[920]],[[921]],[[922]],[[923]],[[924]],[[925]],[[926]],[[927]],[[928]],[[929]],[[930]],[[931]],[[932]],[[933]],[[934]],[[935]],[[936]],[[937]],[[938]],[[939]],[[940]],[[941]],[[942]],[[943]],[[944]],[[945]],[[946]],[[947]],[[948]],[[949]],[[950]],[[951]],[[952]],[[953]],[[954]],[[955]],[[956]],[[957]],[[958]],[[959]],[[960]],[[961]],[[962]],[[963]],[[964]],[[965]],[[966]],[[967]],[[968]],[[969]],[[970]],[[971]],[[972]],[[973]],[[974]],[[975]],[[976]],[[977]],[[978]],[[979]],[[980]],[[981,982,983]],[[984]],[[985]],[[986]],[[987]],[[988]],[[989]],[[990]],[[991]],[[992]],[[993]],[[994]],[[995]],[[996]],[[997]],[[998]],[[999]],[[1e3]],[[1001]],[[1002]],[[1003]],[[1004]],[[1005]],[[1006]],[[1007]],[[1008]],[[1009]],[[1010]],[[1011]],[[1012]],[[1013]],[[1014]],[[1015]],[[1016]],[[1017]],[[1018]],[[1019]],[[1020]],[[1021]],[[1022,1023]],[[1024]],[[1025,1026]],[[1027]],[[1028]],[[1029]]]},{type:"Polygon",id:"IMN",properties:{name:"Isle of Man",iso:"IMN"},arcs:[[1030]]},{type:"MultiPolygon",id:"IND",properties:{name:"India",iso:"IND"},arcs:[[[1031]],[[1032]],[[1033]],[[1034]],[[1035]],[[1036]],[[1037]],[[1038]],[[1039]],[[1040]],[[1041,-531,1042,-529,-322,-528,1043,-247,1044,1045,1046,-533]]]},{type:"Polygon",id:"CCK",properties:{name:"Cocos (Keeling) Islands",iso:"CCK"},arcs:[[1047]]},{type:"Polygon",id:"CXR",properties:{name:"Christmas Island",iso:"CXR"},arcs:[[1048]]},{type:"Polygon",id:"IOT",properties:{name:"British Indian Ocean Territory",iso:"IOT"},arcs:[[1049]]},{type:"MultiPolygon",id:"IRL",properties:{name:"Ireland",iso:"IRL"},arcs:[[[1050]],[[-748,1051]]]},{type:"MultiPolygon",id:"IRN",properties:{name:"Iran, Islamic Republic of",iso:"IRN"},arcs:[[[1052]],[[-47,-215,1053,1054,-3,1055,1056,1057,1058,-213]]]},{type:"Polygon",id:"IRQ",properties:{name:"Iraq",iso:"IRQ"},arcs:[[1059,1060,1061,1062,1063,-1058,1064]]},{type:"Polygon",id:"ISL",properties:{name:"Iceland",iso:"ISL"},arcs:[[1065]]},{type:"Polygon",id:"ISR",properties:{name:"Israel",iso:"ISR"},arcs:[[1066,1067,1068,-653,1069,1070,1071,1072,1073]]},{type:"MultiPolygon",id:"ITA",properties:{name:"Italy",iso:"ITA"},arcs:[[[1074]],[[1075]],[[1076]],[[1077]],[[1078]],[[1079]],[[1080]],[[1081,1082,-727,-472,-206],[1083]]]},{type:"Polygon",id:"JAM",properties:{name:"Jamaica",iso:"JAM"},arcs:[[1084]]},{type:"Polygon",id:"JEY",properties:{name:"Jersey",iso:"JEY"},arcs:[[1085]]},{type:"Polygon",id:"JOR",properties:{name:"Jordan",iso:"JOR"},arcs:[[-1068,1086,-1074,1087,-1062,1088,1089]]},{type:"MultiPolygon",id:"JPN",properties:{name:"Japan",iso:"JPN"},arcs:[[[1090]],[[1091]],[[1092]],[[1093]],[[1094]],[[1095]],[[1096]],[[1097]],[[1098]],[[1099]],[[1100]],[[1101]],[[1102]],[[1103]],[[1104]],[[1105]],[[1106]],[[1107]],[[1108]],[[1109]],[[1110]],[[1111]],[[1112]],[[1113]],[[1114]],[[1115]],[[1116]],[[1117]],[[1118]],[[1119]],[[1120]],[[1121]],[[1122]]]},{type:"MultiPolygon",
id:"KAZ",properties:{name:"Kazakhstan",iso:"KAZ"},arcs:[[[1123]],[[1124]],[[1125]],[[-538,1126,1127,1128,1129,1130]]]},{type:"MultiPolygon",id:"KEN",properties:{name:"Kenya",iso:"KEN"},arcs:[[[1131]],[[1132,1133,1134,1135,1136,-689]]]},{type:"Polygon",id:"KGZ",properties:{name:"Kyrgyzstan",iso:"KGZ"},arcs:[[1137,1138,-1127,-537],[1139],[1140],[1141]]},{type:"MultiPolygon",id:"KHM",properties:{name:"Cambodia",iso:"KHM"},arcs:[[[1142]],[[1143,1144,1145,1146]]]},{type:"MultiPolygon",id:"KIR",properties:{name:"Kiribati",iso:"KIR"},arcs:[[[1147]],[[1148]],[[1149]],[[1150]],[[1151]],[[1152]],[[1153]]]},{type:"MultiPolygon",id:"KNA",properties:{name:"Saint Kitts and Nevis",iso:"KNA"},arcs:[[[1154]],[[1155]]]},{type:"MultiPolygon",id:"KOR",properties:{name:"Korea, Republic of",iso:"KOR"},arcs:[[[1156]],[[1157]],[[1158]],[[1159]],[[1160]],[[1161]],[[1162]],[[1163]],[[1164]],[[1165]],[[1166,1167]]]},{type:"Polygon",id:"kosovo",properties:{name:"Kosovo",iso:null},arcs:[[-20,1168,1169,1170]]},{type:"MultiPolygon",id:"KWT",properties:{name:"Kuwait",iso:"KWT"},arcs:[[[1171]],[[1172,-1060,1173]]]},{type:"Polygon",id:"LAO",properties:{name:"Lao People's Democratic Republic",iso:"LAO"},arcs:[[-1145,1174,1175,-526,1176]]},{type:"Polygon",id:"LBN",properties:{name:"Lebanon",iso:"LBN"},arcs:[[1177,-1072,1178]]},{type:"Polygon",id:"LBR",properties:{name:"Liberia",iso:"LBR"},arcs:[[1179,-775,-546,1180]]},{type:"Polygon",id:"LBY",properties:{name:"Libya",iso:"LBY"},arcs:[[1181,1182,1183,-635,1184,1185,-656]]},{type:"Polygon",id:"LCA",properties:{name:"Saint Lucia",iso:"LCA"},arcs:[[1186]]},{type:"Polygon",id:"LIE",properties:{name:"Liechtenstein",iso:"LIE"},arcs:[[-208,-471]]},{type:"MultiPolygon",id:"LKA",properties:{name:"Sri Lanka",iso:"LKA"},arcs:[[[1187]],[[1188]],[[1189]]]},{type:"Polygon",id:"LSO",properties:{name:"Lesotho",iso:"LSO"},arcs:[[1190,1191]]},{type:"MultiPolygon",id:"LTU",properties:{name:"Lithuania",iso:"LTU"},arcs:[[[1192,1193]],[[-278,1194,1195,1196,1197]]]},{type:"Polygon",id:"LUX",properties:{name:"Luxembourg",iso:"LUX"},arcs:[[-726,-223,-610]]},{type:"Polygon",id:"LVA",properties:{name:"Latvia",iso:"LVA"},arcs:[[-279,-1198,1198,-685,1199]]},{type:"Polygon",id:"MAC",properties:{name:"Macao",iso:"MAC"},arcs:[[-523,1200]]},{type:"Polygon",id:"MAF",properties:{name:"Saint Martin (French part)",iso:"MAF"},arcs:[[1201,1202]]},{type:"Polygon",id:"MAR",properties:{name:"Morocco",iso:"MAR"},arcs:[[-640,1203,1204]]},{type:"Polygon",id:"MCO",properties:{name:"Monaco",iso:"MCO"},arcs:[[1205,-729]]},{type:"Polygon",id:"MDA",properties:{name:"Moldova, Republic of",iso:"MDA"},arcs:[[1206,1207]]},{type:"MultiPolygon",id:"MDG",properties:{name:"Madagascar",iso:"MDG"},arcs:[[[1208]],[[1209]],[[1210]]]},{type:"MultiPolygon",id:"MDV",properties:{name:"Maldives",iso:"MDV"},arcs:[[[1211]],[[1212]]]},{type:"MultiPolygon",id:"MEX",properties:{name:"Mexico",iso:"MEX"},arcs:[[[1213]],[[1214]],[[1215]],[[1216]],[[1217]],[[1218]],[[1219]],[[1220]],[[1221]],[[1222]],[[1223]],[[1224]],[[1225]],[[-284,-855,1226,1227,1228]]]},{type:"MultiPolygon",id:"MHL",properties:{name:"Marshall Islands",iso:"MHL"},arcs:[[[1229]],[[1230]]]},{type:"Polygon",id:"MKD",properties:{name:"Macedonia",iso:"MKD"},arcs:[[-831,-16,-1171,1231,-250]]},{type:"Polygon",id:"MLI",properties:{name:"Mali",iso:"MLI"},arcs:[[-237,-548,-780,1232,1233,-637,1234]]},{type:"Polygon",id:"MLT",properties:{name:"Malta",iso:"MLT"},arcs:[[1235]]},{type:"MultiPolygon",id:"MMR",properties:{name:"Myanmar",iso:"MMR"},arcs:[[[1236]],[[1237]],[[1238]],[[1239]],[[1240]],[[1241]],[[1242]],[[1243]],[[1244]],[[1245]],[[1246]],[[1247]],[[1248]],[[1249]],[[1250]],[[1251]],[[-1176,1252,1253,-245,-1044,-527]]]},{type:"Polygon",id:"MNE",properties:{name:"Montenegro",iso:"MNE"},arcs:[[-1169,-19,1254,-872,-271,1255]]},{type:"Polygon",id:"MNG",properties:{name:"Mongolia",iso:"MNG"},arcs:[[1256,-540]]},{type:"MultiPolygon",id:"MNP",properties:{name:"Northern Mariana Islands",iso:"MNP"},arcs:[[[1257]],[[1258]],[[1259]],[[1260]],[[1261]],[[1262]]]},{type:"Polygon",id:"MOZ",properties:{name:"Mozambique",iso:"MOZ"},arcs:[[1263,1264,1265,1266,1267,1268,1269,1270],[1271],[1272]]},{type:"MultiPolygon",id:"MRT",properties:{name:"Mauritania",iso:"MRT"},arcs:[[[1273]],[[1274,1275,1276,-638,-1234]]]},{type:"Polygon",id:"MSR",properties:{name:"Montserrat",iso:"MSR"},arcs:[[1277]]},{type:"Polygon",id:"MUS",properties:{name:"Mauritius",iso:"MUS"},arcs:[[1278]]},{type:"MultiPolygon",id:"MWI",properties:{name:"Malawi",iso:"MWI"},arcs:[[[-1273]],[[-1272]],[[-1268,1279,1280]]]},{type:"MultiPolygon",id:"MYS",properties:{name:"Malaysia",iso:"MYS"},arcs:[[[1281]],[[1282]],[[-1023,1283]],[[1284]],[[1285]],[[1286,1287]],[[-1026,1288,-319,-318,1289]],[[1290]]]},{type:"Polygon",id:"NAM",properties:{name:"Namibia",iso:"NAM"},arcs:[[-324,1291,1292,-9,1293]]},{type:"MultiPolygon",id:"NCL",properties:{name:"New Caledonia",iso:"NCL"},arcs:[[[1294]],[[1295]],[[1296]],[[1297]],[[1298]]]},{type:"Polygon",id:"NER",properties:{name:"Niger",iso:"NER"},arcs:[[1299,-231,-238,-1235,-636,-1184,1300]]},{type:"Polygon",id:"NFK",properties:{name:"Norfolk Island",iso:"NFK"},arcs:[[1301]]},{type:"MultiPolygon",id:"NGA",properties:{name:"Nigeria",iso:"NGA"},arcs:[[[1302]],[[1303,-553,1304,-232,-1300]]]},{type:"Polygon",id:"NIC",properties:{name:"Nicaragua",iso:"NIC"},arcs:[[-585,1305,-865,1306]]},{type:"Polygon",id:"NIU",properties:{name:"Niue",iso:"NIU"},arcs:[[1307]]},{type:"MultiPolygon",id:"NLD",properties:{name:"Netherlands",iso:"NLD"},arcs:[[[-226,1308]],[[1309]],[[1310]],[[-611,1311,-227,1312]],[[1313]],[[1314]]]},{type:"MultiPolygon",id:"NOR",properties:{name:"Norway",iso:"NOR"},arcs:[[[1315]],[[1316]],[[1317]],[[1318]],[[1319]],[[1320]],[[1321]],[[1322]],[[1323]],[[1324]],[[1325]],[[1326]],[[1327]],[[1328]],[[1329]],[[1330]],[[1331]],[[1332]],[[1333]],[[1334]],[[1335,-702,1336,1337]],[[1338]]]},{type:"Polygon",id:"NPL",properties:{name:"Nepal",iso:"NPL"},arcs:[[-530,-1043]]},{type:"Polygon",id:"NRU",properties:{name:"Nauru",iso:"NRU"},arcs:[[1339]]},{type:"MultiPolygon",id:"NZL",properties:{name:"New Zealand",iso:"NZL"},arcs:[[[1340]],[[1341]],[[1342]],[[1343]],[[1344]],[[1345]],[[1346]],[[1347]],[[1348]],[[1349]],[[1350]]]},{type:"MultiPolygon",id:"OMN",properties:{name:"Oman",iso:"OMN"},arcs:[[[1351]],[[1352,1353,-30,1354]],[[-35]],[[-33,1355]]]},{type:"Polygon",id:"PAK",properties:{name:"Pakistan",iso:"PAK"},arcs:[[-1046,1356,-1056,-2,-535,1357]]},{type:"MultiPolygon",id:"PAN",properties:{name:"Panama",iso:"PAN"},arcs:[[[1358]],[[1359]],[[1360]],[[-570,1361,-583,1362]]]},{type:"Polygon",id:"PCN",properties:{name:"Pitcairn",iso:"PCN"},arcs:[[1363]]},{type:"Polygon",id:"PER",properties:{name:"Peru",iso:"PER"},arcs:[[-288,-506,1364,-651,-567,-312]]},{type:"MultiPolygon",id:"PHL",properties:{name:"Philippines",iso:"PHL"},arcs:[[[1365]],[[1366]],[[1367]],[[1368]],[[1369]],[[1370]],[[1371]],[[1372]],[[1373]],[[1374]],[[1375]],[[1376]],[[1377]],[[1378]],[[1379]],[[1380]],[[1381]],[[1382]],[[1383]],[[1384]],[[1385]],[[1386]],[[1387]],[[1388]],[[1389]],[[1390]],[[1391]],[[1392]],[[1393]],[[1394]],[[1395]],[[1396]],[[1397]],[[1398]],[[1399]],[[1400]],[[1401]],[[1402]],[[1403]],[[1404]],[[1405]],[[1406]],[[1407]],[[1408]],[[1409]],[[1410]],[[1411]],[[1412]]]},{type:"Polygon",id:"PLW",properties:{name:"Palau",iso:"PLW"},arcs:[[1413]]},{type:"MultiPolygon",id:"PNG",properties:{name:"Papua New Guinea",iso:"PNG"},arcs:[[[1414]],[[1415]],[[1416]],[[1417]],[[1418]],[[1419]],[[1420]],[[1421]],[[1422]],[[1423]],[[1424]],[[1425]],[[1426]],[[1427]],[[1428]],[[1429]],[[1430]],[[1431]],[[1432]],[[1433]],[[-983,1434,1435]],[[1436]],[[1437]],[[1438]],[[1439]],[[1440]]]},{type:"Polygon",id:"POL",properties:{name:"Poland",iso:"POL"},arcs:[[-1195,-277,1441,1442,-602,-608,1443,-603,1444,1445]]},{type:"MultiPolygon",id:"PRI",properties:{name:"Puerto Rico",iso:"PRI"},arcs:[[[1446]],[[1447]],[[1448]]]},{type:"Polygon",id:"PRK",properties:{name:"Korea, Democratic People's Republic of",iso:"PRK"},arcs:[[1449,1450,-1167,1451,-519]]},{type:"MultiPolygon",id:"PRT",properties:{name:"Portugal",iso:"PRT"},arcs:[[[1452]],[[1453]],[[1454]],[[1455]],[[1456]],[[1457]],[[1458]],[[-679,1459]]]},{type:"Polygon",id:"PRY",properties:{name:"Paraguay",iso:"PRY"},arcs:[[-40,-290,-311]]},{type:"MultiPolygon",id:"PSE",properties:{name:"Palestinian Territories",iso:"PSE"},arcs:[[[-658,1460,-1070]],[[-1067,-1087]]]},{type:"MultiPolygon",id:"PYF",properties:{name:"French Polynesia",iso:"PYF"},arcs:[[[1461]],[[1462]],[[1463]],[[1464]],[[1465]],[[1466]],[[1467]],[[1468]],[[1469]],[[1470]],[[1471]]]},{type:"Polygon",id:"QAT",properties:{name:"Qatar",iso:"QAT"},arcs:[[1472,1473]]},{type:"Polygon",id:"ROU",properties:{name:"Romania",iso:"ROU"},arcs:[[-252,1474,-887,1475,-1208,1476,1477]]},{type:"MultiPolygon",id:"RUS",properties:{name:"Russian Federation",iso:"RUS"},arcs:[[[1478]],[[1479]],[[1480]],[[1481]],[[1482]],[[1483]],[[1484]],[[1485]],[[1486]],[[1487]],[[1488]],[[1489]],[[1490]],[[1491]],[[1492]],[[1493]],[[-1196,-1446,1494,-1193,1495]],[[1496]],[[1497]],[[1498]],[[1499]],[[1500]],[[1501]],[],[[1502]],[[1503]],[[1504]],[[1505]],[[1506]],[[1507]],[[1508]],[],[[1509]],[[1510]],[[1511]],[[1512]],[[1513]],[[1514]],[[1515]],[[1516]],[[1517]],[[1518]],[[1519]],[[1520]],[[1521]],[[1522]],[[1523]],[[1524]],[[1525]],[[1526]],[[1527]],[[1528]],[[1529]],[[1530]],[[1531]],[[1532]],[[1533]],[[1534]],[[1535]],[[1536]],[[1537]],[[1538]],[[1539]],[[1540]],[[1541]],[[-1450,-541,-1257,-539,-1131,1542,-217,-770,1543,1544,-280,-1200,-684,1545,-699,-1336,1546]],[[1547]],[[1548]],[[1549]],[[1550]],[[1551]],[[1552]],[[1553]],[[1554]],[[1555]],[[1556]],[[1557]],[[1558]],[[1559]],[[1560]],[[1561]],[[1562]],[[1563]],[[1564]],[[1565]],[[1566]],[[1567]],[[1568]],[[1569]],[[1570]],[[1571]],[[1572]],[[1573]],[[1574]],[[1575]],[[1576]]]},{type:"Polygon",id:"RWA",properties:{name:"Rwanda",iso:"RWA"},arcs:[[-220,-556,1577,1578]]},{type:"Polygon",id:"ESH",properties:{name:"Western Sahara",iso:"ESH"},arcs:[[-1204,-639,-1277,1579]]},{type:"MultiPolygon",id:"SAU",properties:{name:"Saudi Arabia",iso:"SAU"},arcs:[[[1580]],[[1581]],[[-1173,1582,-1473,1583,-31,-1354,1584,1585,-1089,-1061]]]},{type:"Polygon",id:"SDN",properties:{name:"Sudan",iso:"SDN"},arcs:[[-662,-691,1586,-331,1587,-1182,-655,1588]]},{type:"Polygon",id:"SSD",properties:{name:"South Sudan",iso:"SSD"},arcs:[[-690,-1137,1589,-561,-326,-1587]]},{type:"Polygon",id:"SEN",properties:{name:"Senegal",iso:"SEN"},arcs:[[-779,-789,1590,-781,1591,-1275,-1233]]},{type:"Polygon",id:"SGP",properties:{name:"Singapore",iso:"SGP"},arcs:[[1592]]},{type:"MultiPolygon",id:"SGS",properties:{name:"South Georgia and the South Sandwich Islands",iso:"SGS"},arcs:[[[1593]],[[1594]]]},{type:"MultiPolygon",id:"SHN",properties:{name:"Saint Helena, Ascension and Tristan da Cunha",iso:"SHN"},arcs:[[[1595]],[[1596]]]},{type:"MultiPolygon",id:"SLB",properties:{name:"Solomon Islands",iso:"SLB"},arcs:[[[1597]],[[1598]],[[1599]],[[1600]],[[1601]],[[1602]],[[1603]],[[1604]],[[1605]],[[1606]],[[1607]],[[1608]],[[1609]],[[1610]],[[1611]],[[1612]],[[1613]],[[1614]],[[1615]],[[1616]],[[1617]]]},{type:"MultiPolygon",id:"SLE",properties:{name:"Sierra Leone",iso:"SLE"},arcs:[[[1618]],[[-1180,1619,-776]]]},{type:"Polygon",id:"SLV",properties:{name:"El Salvador",iso:"SLV"},arcs:[[-853,-867,1620]]},{type:"Polygon",id:"SMR",properties:{name:"San Marino",iso:"SMR"},arcs:[[-1084]]},{type:"Polygon",id:"somaliland",properties:{name:"Somaliland",iso:null},arcs:[[-687,-619,1621,1622]]},{type:"Polygon",id:"SOM",properties:{name:"Somalia",iso:"SOM"},arcs:[[-688,-1623,1623,-1133]]},{type:"Polygon",id:"SPM",properties:{name:"Saint Pierre and Miquelon",iso:"SPM"},arcs:[[1624]]},{type:"Polygon",id:"SRB",properties:{name:"Serbia",iso:"SRB"},arcs:[[-1475,-251,-1232,-1170,-1256,-270,-880,-888]]},{type:"MultiPolygon",id:"STP",properties:{name:"Sao Tome and Principe",iso:"STP"},arcs:[[[1625]],[[1626]]]},{type:"Polygon",id:"SUR",properties:{name:"Suriname",iso:"SUR"},arcs:[[-307,-860,1627,-732]]},{type:"Polygon",id:"SVK",properties:{name:"Slovakia",iso:"SVK"},arcs:[[-890,-212,-600,-1443,1628]]},{type:"Polygon",id:"SVN",properties:{name:"Slovenia",iso:"SVN"},arcs:[[-1082,-205,-889,-882,1629]]},{type:"MultiPolygon",id:"SWE",properties:{name:"Sweden",iso:"SWE"},arcs:[[[1630]],[[1631]],[[1632]],[[1633]],[[1634]],[[-1337,-701,1635]]]},{type:"Polygon",id:"SWZ",properties:{name:"Swaziland",iso:"SWZ"},arcs:[[1636,-1264]]},{type:"Polygon",id:"SXM",properties:{name:"Sint Maarten (Dutch part)",iso:"SXM"},arcs:[[-1202,1637]]},{type:"Polygon",id:"SYC",properties:{name:"Seychelles",iso:"SYC"},arcs:[[1638]]},{type:"Polygon",id:"SYR",properties:{name:"Syrian Arab Republic",iso:"SYR"},arcs:[[-1088,-1073,-1178,1639,1640,-1063]]},{type:"MultiPolygon",id:"TCA",properties:{name:"Turks and Caicos Islands",iso:"TCA"},arcs:[[[1641]],[[1642]],[[1643]]]},{type:"Polygon",id:"TCD",properties:{name:"Chad",iso:"TCD"},arcs:[[-330,-554,-1304,-1301,-1183,-1588]]},{type:"Polygon",id:"TGO",properties:{name:"Togo",iso:"TGO"},arcs:[[-773,-234,-229,1644]]},{type:"MultiPolygon",id:"THA",properties:{name:"Thailand",iso:"THA"},arcs:[[[1645]],[[1646]],[[1647]],[[1648]],[[1649]],[[1650]],[[1651]],[[1652]],[[1653]],[[-1175,-1144,1654,-1287,1655,-1253]]]},{type:"MultiPolygon",id:"TJK",properties:{name:"Tajikistan",iso:"TJK"},arcs:[[[-1140]],[[1656]],[[-1138,-536,-6,1657]]]},{type:"MultiPolygon",id:"TKM",properties:{name:"Turkmenistan",iso:"TKM"},arcs:[[[1658]],[[-4,-1055,1659,-1129,1660]]]},{type:"MultiPolygon",id:"TLS",properties:{name:"Timor-Leste",iso:"TLS"},arcs:[[[-896,1661]],[[-898,1662]],[[1663]]]},{type:"MultiPolygon",id:"TON",properties:{name:"Tonga",iso:"TON"},arcs:[[[1664]],[[1665]],[[1666]]]},{type:"MultiPolygon",id:"TTO",properties:{name:"Trinidad and Tobago",iso:"TTO"},arcs:[[[1667]],[[1668]]]},{type:"MultiPolygon",id:"TUN",properties:{name:"Tunisia",iso:"TUN"},arcs:[[[1669]],[[1670]],[[-1185,-642,1671]]]},{type:"MultiPolygon",id:"TUR",properties:{name:"Turkey",iso:"TUR"},arcs:[[[1672]],[[-768,-49,-214,-1059,-1064,-1641,1673]],[[-832,-248,1674]]]},{type:"MultiPolygon",id:"TWN",properties:{name:"Taiwan",iso:"TWN"},arcs:[[[1675]],[[1676]]]},{type:"MultiPolygon",id:"TZA",properties:{name:"Tanzania, United Republic of",iso:"TZA"},arcs:[[[1677]],[[1678]],[[1679]],[[-1135,1680,-1269,-1281,1681,-557,-221,-1579,1682]]]},{type:"Polygon",id:"UGA",properties:{name:"Uganda",iso:"UGA"},arcs:[[-1578,-555,-1590,-1136,-1683]]},{type:"MultiPolygon",id:"UKR",properties:{name:"Ukraine",iso:"UKR"},arcs:[[[1683]],[[-1477,-1207,-1476,-891,-1629,-1442,-276,-1545,1684]]]},{type:"Polygon",id:"URY",properties:{name:"Uruguay",iso:"URY"},arcs:[[-42,-310,1685]]},{type:"MultiPolygon",id:"USA",properties:{name:"United States",iso:"USA"},arcs:[[[1686]],[[1687]],[[1688]],[[1689]],[[1690]],[[1691]],[[1692]],[[1693]],[[1694]],[[1695]],[[1696]],[[1697]],[[1698]],[[1699]],[[1700]],[[1701]],[[1702]],[[1703]],[[1704]],[[1705]],[[1706]],[[1707]],[[1708]],[[1709]],[[1710]],[[1711]],[[1712]],[[1713]],[[1714]],[[1715]],[[1716]],[[1717]],[[1718]],[[1719]],[[-344,1720,-1228,1721,-429]],[[1722]],[[1723]],[[1724]],[[1725]],[[1726]],[[1727]],[[1728]],[[1729]],[[1730]],[[1731]],[[1732]],[[1733]],[[1734]],[[1735]],[[1736]],[[1737]],[[1738]],[[1739]],[[1740]],[[1741]],[[1742]],[[1743]],[[1744]],[[1745]],[[1746]],[[1747]],[[1748]],[[1749]],[[1750]],[[1751]],[[1752]],[[1753]],[[1754]],[[1755]],[[1756]],[[1757]],[[1758]],[[1759]],[[1760]],[[1761]],[[1762]],[[1763]],[[1764]],[[1765]],[[1766]],[[1767]],[[1768]],[[1769]],[[1770]],[[1771]],[[1772]],[[1773]],[[1774]],[[1775]],[[1776]],[[1777]],[[1778]],[[1779]],[[1780]],[[1781]],[[1782]],[[1783]],[[1784]],[[1785]],[[1786]],[[-427,1787,-372,1788]]]},{type:"MultiPolygon",id:"UZB",properties:{name:"Uzbekistan",iso:"UZB"},arcs:[[[-1141]],[[-1142]],[[-1139,-1658,-5,-1661,-1128]]]},{type:"Polygon",id:"VCT",properties:{name:"Saint Vincent and the Grenadines",iso:"VCT"},arcs:[[1789]]},{type:"MultiPolygon",id:"VEN",properties:{name:"Venezuela, Bolivarian Republic of",iso:"VEN"},arcs:[[[1790]],[[1791]],[[1792]],[[1793]],[[-858,-314,-566,1794]]]},{type:"Polygon",id:"VGB",properties:{name:"Virgin Islands, British",iso:"VGB"},arcs:[[1795]]},{type:"MultiPolygon",id:"VIR",properties:{name:"Virgin Islands, U.S.",iso:"VIR"},arcs:[[[1796]],[[1797]],[[1798]]]},{type:"MultiPolygon",id:"VNM",properties:{name:"Viet Nam",iso:"VNM"},arcs:[[[1799]],[[1800]],[[1801]],[[1802]],[[1803]],[[1804]],[[1805]],[[-1146,-1177,-525,1806]]]},{type:"MultiPolygon",id:"VUT",properties:{name:"Vanuatu",iso:"VUT"},arcs:[[[1807]],[[1808]],[[1809]],[[1810]],[[1811]],[[1812]],[[1813]],[[1814]],[[1815]],[[1816]],[[1817]],[[1818]],[[1819]],[[1820]]]},{type:"MultiPolygon",id:"WLF",properties:{name:"Wallis and Futuna",iso:"WLF"},arcs:[[[1821]],[[1822]]]},{type:"MultiPolygon",id:"WSM",properties:{name:"Samoa",iso:"WSM"},arcs:[[[1823]],[[1824]]]},{type:"MultiPolygon",id:"YEM",properties:{name:"Yemen",iso:"YEM"},arcs:[[[1825]],[[1826]],[[1827]],[[-1585,-1353,1828]]]},{type:"MultiPolygon",id:"ZAF",properties:{name:"South Africa",iso:"ZAF"},arcs:[[[1829]],[[-1265,-1637,-1271,1830,-1292,-323,1831],[-1192,1832]]]},{type:"Polygon",id:"ZMB",properties:{name:"Zambia",iso:"ZMB"},arcs:[[-1267,1833,-1294,-8,-558,-1682,-1280]]},{type:"Polygon",id:"ZWE",properties:{name:"Zimbabwe",iso:"ZWE"},arcs:[[-325,-1834,-1266,-1832]]},{type:"MultiPolygon",id:"SJM",properties:{name:"Svalbard and Jan Mayen",iso:"SJM"},arcs:[[[1834]],[[1835]],[[1836]],[[1837]],[[1838]],[[1839]],[[1840]],[[1841]],[[1842]],[[1843]]]},{type:"MultiPolygon",id:"BES",properties:{name:"Bonaire, Sint Eustatius and Saba",iso:"BES"},arcs:[[[1844]],[[1845]],[[1846]]]},{type:"Polygon",id:"MYT",properties:{name:"Mayotte",iso:"MYT"},arcs:[[1847]]},{type:"Polygon",id:"MTQ",properties:{name:"Martinique",iso:"MTQ"},arcs:[[1848]]},{type:"Polygon",id:"REU",properties:{name:"Réunion",iso:"REU"},arcs:[[1849]]},{type:"Polygon",id:"VAT",properties:{name:"Holy See (Vatican City State)",iso:"VAT"},arcs:[[1850]]},{type:"MultiPolygon",id:"TKL",properties:{name:"Tokelau",iso:"TKL"},arcs:[[[1851]],[[1852]],[[1853]]]},{type:"MultiPolygon",id:"TUV",properties:{name:"Tuvalu",iso:"TUV"},arcs:[[[1854]],[[1855]],[[1856]],[[1857]],[[1858]],[[1859]],[[1860]],[[1861]],[[1862]]]},{type:"Polygon",id:"BVT",properties:{name:"Bouvet Island",iso:"BVT"},arcs:[[1863]]},{type:"Polygon",id:"GIB",properties:{name:"Gibraltar",iso:"GIB"},arcs:[[1864]]},{type:"MultiPolygon",id:"GLP",properties:{name:"Guadeloupe",iso:"GLP"},arcs:[[[1865]],[[1866]],[[1867]]]},{type:"Polygon",id:"UMI",properties:{name:"United States Minor Outlying Islands",iso:"UMI"},arcs:[[1868]]}]}},arcs:[[[3058,5901],[0,-2],[-2,1],[-1,3],[-2,3],[0,3],[1,1],[3,-8],[1,-1]],[[7069,7316],[-3,-3],[-11,-9],[-7,4],[-10,0],[-8,-1],[-10,-2],[-4,0],[-5,-4],[-3,-1],[-5,-3],[-2,-4],[-4,-5],[-3,-3],[-3,-4],[-3,1],[-2,-3],[-2,-5],[-4,-7],[-3,-3],[-1,-5],[1,-2],[4,-4],[2,-6],[2,-13],[2,-3],[0,-5],[1,-3],[-2,-5],[0,-2],[2,-5],[0,-3],[-2,-3],[-2,-8],[-5,-5],[-2,-5],[-3,-6],[-1,-5],[-3,-4],[0,-2],[4,-7],[0,-6],[-1,-4],[1,-4],[-2,-4],[-5,-4],[-6,-2],[-9,0],[-2,1],[-7,5],[-3,-3],[0,-6],[5,-10],[2,-6],[2,-10],[2,-5],[0,-4],[-5,-6],[-5,-4],[-10,-3],[-2,-3],[-1,-11],[-1,-4],[0,-4],[-5,-15],[1,-10],[0,-18],[-2,-6],[-3,-6],[-3,-4],[-3,-2],[-3,1],[-1,4],[-4,5],[-2,0],[-2,-3],[-3,1],[-3,2],[-2,0],[-4,-7],[-8,-8],[-3,0],[-1,-2],[2,-6],[2,-1],[0,-2],[-7,-7],[-5,-1],[-5,2],[-2,3],[-3,0],[-3,-2],[-3,-4],[-3,-9],[0,-1],[-6,-6],[-1,-7],[-2,-11],[1,-6],[0,-10],[-1,-8],[-1,-4],[0,-4],[2,-5],[-2,-5],[-2,-2],[-6,-3],[-8,-5],[-16,-8],[-5,-1],[-2,1],[-9,0],[-7,-3],[-3,-3],[-2,-4],[-3,2],[-11,4],[-31,-5],[-3,1],[-10,6],[-13,8],[-8,5],[-11,6]],[[6689,6903],[7,16],[6,13],[7,14],[6,13],[1,5],[0,9],[-2,12],[-2,6],[-9,2],[-14,4],[-1,0],[-1,10],[1,4],[-1,8],[0,7],[1,10],[1,5],[-4,20],[-2,11],[-1,12],[-1,3],[0,5],[4,11],[2,2],[2,5],[2,3],[0,2],[-3,1],[-4,0],[-3,2],[-2,7],[1,8],[-1,14],[2,7],[2,5],[7,1],[-3,9],[-1,1],[0,3],[3,2],[3,4],[0,4],[3,8],[0,4],[2,7],[0,6],[-1,3],[0,4],[3,2],[0,3],[1,4],[0,3],[1,2],[0,6]],[[6701,7235],[2,0],[5,-9],[5,-3],[8,2],[3,-4],[4,-7],[1,-4],[1,-1],[2,4],[2,1],[2,-1],[4,1],[5,5],[5,6],[1,7],[1,4],[2,2],[-2,5],[0,5],[2,1],[3,0],[6,3],[10,6],[5,0],[0,3],[1,2],[3,2],[5,5],[4,6],[1,5],[1,8],[2,11],[3,12],[0,6],[1,4],[4,4],[4,2],[6,1],[7,0],[2,12],[1,3],[2,3],[1,0],[9,-9],[7,-2],[3,-2],[2,1]],[[6847,7335],[8,1],[7,-2],[3,-6],[4,-1],[5,3],[1,-2],[2,-1],[2,1],[2,-2],[0,-2]],[[6881,7324],[2,-6],[4,-5],[3,-1],[4,4],[1,-1],[1,2],[0,3],[2,2],[5,3],[3,4],[2,1],[1,-1],[2,1],[0,3],[2,1],[4,-4],[3,-6],[3,-3],[1,0],[3,5],[0,16],[2,4],[4,3],[5,1],[4,-1],[2,-3],[3,0],[3,7],[0,6],[-1,6],[0,3],[3,3],[3,5],[3,7],[2,8],[4,5],[4,2],[4,-2],[6,-6],[2,-8],[-1,-10],[0,-5],[1,-1],[5,2],[2,-1],[0,-3],[-1,-4],[-2,-20],[0,-10],[-1,-8],[1,-7],[2,-9],[2,-7],[3,-3],[2,1],[4,4],[6,8],[6,4],[8,3],[3,8],[4,6],[8,8],[5,3],[3,1],[5,-3],[2,0],[0,-3],[-1,-3],[-2,-3],[1,-2],[2,0],[10,5],[2,0],[1,3],[4,3],[5,-3],[4,1],[2,-2],[4,-7]],[[7079,7328],[-1,-1],[-3,4],[-5,-3],[-5,-4],[0,-2],[4,-6]],[[5665,4557],[0,-7],[1,-11],[0,-7],[1,-4],[0,-2],[-1,-2],[0,-4],[-1,-4],[0,-23],[-1,-8],[2,-13],[-1,-4],[-1,-7],[-2,-12],[0,-3],[3,-9],[0,-2],[-2,0],[-2,-1],[-14,0],[-16,0],[-22,0],[0,-45],[0,-37],[0,-37],[0,-19],[0,-32],[2,-17],[3,-20],[5,-5],[4,-7],[2,-6],[5,-9],[7,-12],[6,-11],[5,-10]],[[5648,4167],[-8,-3],[-21,-8],[-10,-4],[-7,-2],[-8,-4],[-4,3],[-5,0],[-5,-3],[-5,-1],[-6,4],[-4,4],[-5,1],[-8,-1],[-8,1],[-7,3],[-5,1],[-3,-1],[-4,1],[-3,2],[-3,4],[-4,7],[-3,8],[-1,2],[-17,0],[-4,1],[-21,0],[-21,0],[-11,0],[-21,0],[-17,0],[-5,-1],[-6,0],[-3,2],[-3,5],[-3,3],[-3,5],[-3,6],[-2,2],[-6,2],[-2,0],[-7,-5],[-2,-3],[-6,-6],[-10,0],[-3,3],[-2,-1],[-3,-3],[-5,-1]],[[5325,4190],[1,22],[1,9],[0,42],[-2,8],[5,7],[1,5],[2,7],[1,15],[6,35],[3,35],[3,16],[2,18],[9,24],[3,14],[5,8],[7,7],[5,14],[2,9],[3,18],[0,19],[2,25],[-1,7],[-2,10],[-1,7],[-2,7],[-3,5],[-1,10],[-5,14],[-1,10],[-2,7],[0,9],[-2,9],[-4,20],[0,3],[1,1],[1,-1],[8,18],[1,4],[-1,4],[0,4],[1,6],[-8,34],[-7,32],[-1,16],[-8,21],[-4,13],[-1,10],[-2,4],[3,2],[5,2],[6,2],[8,8]],[[5362,4845],[3,1],[3,-1],[2,1],[17,0],[4,-1],[2,0],[6,-1],[7,0],[3,1],[18,0],[9,1],[9,-1],[7,0],[3,-2],[3,-3],[2,-4],[1,-5],[2,-3],[0,-17],[1,-9],[2,-9],[3,-9],[1,-7],[0,-6],[1,-6],[2,-6],[2,-3],[0,-2],[3,-10],[5,-15],[3,-11],[1,-1],[2,0],[8,2],[2,-3],[5,5],[4,1],[4,2],[3,2],[2,0],[7,-3],[1,-1],[6,0],[5,2],[1,15],[0,3],[1,6],[2,5],[0,11],[1,8],[4,6],[6,3],[3,0],[6,2],[8,2],[3,0],[0,-1],[-2,-11],[0,-3],[1,-4],[1,-2],[17,0],[8,-1],[7,0],[2,-2],[1,-5],[-1,-11],[-1,-15],[1,-14],[2,-13],[0,-20],[-1,-13],[-1,-15],[0,-17],[1,-7],[3,-8],[4,-8],[3,-10],[2,-13],[0,-16],[1,-9],[-1,-5],[-2,-2],[-1,-4],[1,-7],[0,-6],[1,-3],[2,-2],[5,7],[2,1],[3,0],[4,-1],[9,0],[7,6],[4,0],[4,-2],[4,0],[2,2],[0,2],[1,3],[1,1]],[[5333,4895],[1,3],[3,7],[1,3],[3,1],[1,2],[1,4],[0,2],[7,5],[2,4],[2,2],[2,0],[1,-1],[2,-6],[2,-4],[1,-1]],[[5362,4916],[0,-1],[-7,-5],[-4,-9],[-2,-4],[-3,-4],[-1,-2],[2,-4],[0,-16],[-1,-17],[-7,-2],[-1,0]],[[5338,4852],[-1,7],[0,5],[1,4],[-1,9],[-2,7],[-2,9],[0,2]],[[3249,6233],[-4,-3],[0,2],[3,4],[2,-1],[-1,-2]],[[5570,7595],[-1,-9],[0,-8],[-2,-3],[1,-8],[0,-6],[2,-9],[3,-4],[1,-7],[1,-2],[4,1],[2,-4]],[[5581,7536],[0,-4],[2,-7],[0,-2],[-2,-7],[-4,-3],[-3,-9],[0,-3],[-1,-7],[-2,-2],[-4,-1],[-4,-5],[0,-2],[2,-6],[0,-3],[-2,1],[-1,-6],[-2,-3],[-5,3]],[[5555,7470],[-1,6],[0,4],[-4,10],[-10,9],[-2,5],[-2,7],[3,-2],[0,5],[-3,9],[1,10],[3,8],[-1,10],[1,7],[-1,5],[0,6],[2,8],[2,5],[0,8],[-3,4],[-4,1]],[[5536,7595],[0,3],[1,4],[0,4],[-2,6],[1,5],[6,14],[1,4],[3,5],[1,-1],[0,-6],[2,-3],[2,0],[5,4]],[[5556,7634],[1,-1],[3,-6],[1,-5],[5,-4],[2,-3],[1,-3],[1,-9],[1,-5],[-1,-3]],[[5571,8642],[0,-2],[-5,1],[0,2],[2,1],[3,-2]],[[5545,8650],[-3,-2],[-1,2],[1,3],[2,0],[1,-3]],[[5554,8659],[3,1],[5,-6],[-2,-4],[-2,1],[-3,-3],[0,-3],[-6,-1],[-2,1],[-2,8],[4,5],[0,2],[2,3],[3,-4]],[[5039,7637],[2,2],[2,0],[4,-3],[0,-3],[-1,-2]],[[5046,7631],[-6,-4],[-1,1],[0,3],[-1,2],[1,4]],[[6497,6576],[0,-2],[-3,0],[-1,-1],[-4,2],[1,3],[4,3],[3,-5]],[[6460,6582],[-1,3],[2,2],[1,-2],[-2,-3]],[[6480,6581],[-2,-1],[-2,2],[4,3],[3,4],[-1,-7],[-2,-1]],[[6512,6591],[-1,-1],[-2,1],[-1,2],[2,2],[2,-4]],[[6565,6622],[-1,0],[-2,-6],[-2,-2],[-1,-3],[-3,-3],[-2,7],[1,1],[-1,5],[-2,1],[-3,-4],[0,-16],[-1,-3],[0,-9],[1,-4],[-1,-6],[1,-2],[3,0],[2,-7],[0,-2],[-6,-2],[-2,0],[-4,-2],[-2,-3],[1,-3],[0,-9],[-1,-5],[-4,-15],[-2,-11],[-2,-9],[0,-19]],[[6532,6491],[-2,-5],[-6,2],[-3,0],[-4,1],[-5,2],[-6,1],[-6,2],[-6,1],[-6,2],[-6,1],[-6,2],[-5,1],[-7,2],[-5,1],[-2,3],[-1,4],[-2,4],[-1,4],[-2,3],[-1,4],[-2,4],[-1,4],[-2,3],[-1,4],[-2,4],[-1,4],[-5,11],[-1,4],[-3,6],[-1,3],[0,9]],[[6431,6582],[1,3],[2,-5],[2,1],[1,-1],[1,-10],[1,-4],[2,-1],[6,-1],[3,1],[8,7],[3,3],[11,-1],[8,-3],[13,-1],[3,0],[7,6],[4,4],[3,2],[2,4],[2,10],[2,5],[1,6],[3,5],[9,14],[6,11],[1,4],[3,5],[2,6],[12,17],[2,7],[1,8],[1,0]],[[6557,6684],[2,0],[0,-18],[-1,-3],[1,-3],[3,-1],[1,2]],[[6563,6661],[1,-5],[1,-34]],[[6560,6636],[1,-1],[1,2],[0,4],[-2,-2],[0,-3]],[[3206,2032],[3,-2],[6,1],[5,0],[0,-1],[5,1],[1,-2],[-4,-3],[-1,1],[-9,0],[-3,-2],[-2,0],[-3,-4],[-3,2],[-1,2],[2,3],[2,0],[2,4]],[[3092,2024],[0,13],[1,17],[0,47],[0,32],[0,18]],[[3093,2151],[1,-3],[7,-12],[2,-4],[1,-6],[-3,3],[-3,-2],[-2,-7],[0,-2],[3,-4],[7,-1],[0,-1],[4,-14],[9,-13],[5,-8],[6,-7],[6,-6],[6,-4],[5,-5],[6,-7],[6,-6],[7,-4],[7,-3],[10,2],[4,-1],[2,-2],[-2,-6],[-3,-6],[-3,-2],[-7,0],[-4,1],[-9,-4],[-3,0],[-6,-3],[-4,1],[-8,5],[-5,1],[-19,2],[-6,1],[-6,2],[-7,-1],[-4,0],[-1,-1]],[[3280,2927],[1,-4],[-2,1],[-3,3],[-1,4],[5,-2],[0,-2]],[[3259,3903],[1,-4],[2,-3],[5,-5],[4,-10],[4,-15],[4,-11],[7,-12],[3,-3],[2,-4],[8,-10],[3,-5],[2,-6],[5,-6],[9,-6],[7,-3],[4,0],[6,-4],[8,-10],[5,-7],[2,-4],[5,-6],[13,-13],[6,-4],[5,-7],[2,1],[3,-1],[5,-4],[4,-6],[7,-15],[0,-7],[-5,-10],[0,-1],[-4,-14],[0,-3],[-1,-2],[-4,-5],[-1,-5],[-2,-5],[-1,-4],[0,-6],[1,-6],[0,-3],[-2,-2],[0,-6],[-2,-1],[0,-4],[-1,-2],[-2,-1],[-3,-10],[-2,-2],[-1,-4],[1,-7],[12,2],[10,-2],[12,-7],[8,-2],[4,2],[2,0],[2,-3],[3,0],[3,1],[2,-1],[2,-4],[2,1],[2,6],[4,7],[3,0],[3,-1],[3,-2],[1,-3],[3,0],[2,4],[1,4],[0,4],[1,3],[2,2],[2,7],[2,2],[4,0],[2,2],[0,3],[3,4],[3,8],[2,1],[2,7],[2,13],[2,17],[0,25]],[[3482,3710],[2,0],[1,-2],[2,-1],[3,3],[2,0],[1,3],[2,0],[2,-3],[2,0],[1,-4],[2,-1],[1,-5],[1,-12],[4,-15],[0,-4],[-1,-4],[0,-5],[-1,-13],[0,-4],[1,-4],[0,-4],[-1,-6],[-2,-8],[-3,-2],[-3,-5],[-2,-2],[-1,2],[-2,-3],[-1,-5],[-5,-4],[-3,0],[-2,-1],[-1,-3],[-5,-2],[-2,-5],[0,-4],[-1,-2],[-3,-1],[-1,-2],[1,-2],[-1,-2],[-4,-2],[-3,-3],[-2,-5],[-2,-3],[-3,-1],[-4,-5],[0,-3],[2,-5],[-2,-3],[-2,2],[-3,-2],[0,-5],[-2,-1],[-1,-2],[0,-3],[-2,-4],[-4,-5],[-4,-15],[-5,-8],[-2,-4],[-1,-5],[-7,-17],[-11,-15],[0,-5],[-2,-6],[-5,-6],[-1,-2]],[[3399,3445],[-1,-3],[0,-4],[-2,-5],[-3,-6],[-1,-6],[1,-7],[0,-12],[-2,-1],[1,-5],[0,-4],[-1,-6],[-4,-12],[0,-5],[1,-2],[0,-9],[-1,-5],[-4,-6],[1,-6],[0,-4],[-1,-4],[0,-4],[2,-3],[0,-4],[-3,-9]],[[3382,3313],[0,-5],[1,-23],[-2,-7],[-3,0],[-2,-2],[-3,-32],[0,-5],[2,-8],[2,-10],[0,-7],[-1,-4],[-3,-2],[3,-14],[4,-8],[15,-13],[6,-7],[6,-10],[4,-10],[0,-8],[-5,-12],[-1,-11],[2,-7],[1,-7],[6,-8],[4,-4],[5,1],[1,-3],[1,-20],[0,-6],[-12,-35],[-8,-17],[-3,-9],[-1,-10],[-3,-5],[-15,-16],[-23,-13],[-19,-7],[-4,-3],[-30,-8],[-5,-1],[-8,1],[-6,-1],[-7,2],[-6,3],[-3,6],[-4,0],[-1,-3],[2,-7],[-1,-10],[1,-5],[2,-1],[4,-7],[-3,0],[1,-3],[2,-2],[0,-6],[-2,-15],[-4,-4],[-1,-3],[-2,-14],[-1,-9],[1,-6],[4,-12],[-1,-9],[-3,-4],[-16,-13],[-7,-2],[-15,0],[-10,8],[-7,5],[-7,4],[-6,2],[1,4],[-3,1],[-4,-4],[-2,-4],[-1,-4],[0,-9],[1,-8],[3,-19],[0,-10],[-1,-13],[2,-8],[2,-3],[6,-4],[2,-2],[3,0],[0,-2],[-2,-3],[1,-4],[4,-1],[9,2],[1,3],[0,5],[-6,1],[1,2],[9,5],[3,1],[3,-5],[2,-5],[1,-7],[0,-9],[-1,-8],[-2,-6],[-10,-5],[-2,2],[-3,6],[0,6],[-3,4],[-4,4],[-5,-1],[-4,-6],[-5,-2],[-1,-6],[11,-8],[5,-3],[4,-1],[-4,-5],[-7,-4],[-4,-3],[-4,-6],[-7,-16],[-1,-4],[-1,-9],[2,-15],[-2,-6],[1,-7],[0,-5],[-2,-7],[-8,-10],[-2,-8],[3,-4],[0,-4],[-1,-4],[-3,0],[-12,2],[-5,-4],[-4,-4],[-2,-4],[-9,-3],[-1,-1],[-9,-19],[-4,-11],[-4,-12],[-2,-4],[0,-7],[1,-6],[0,-4],[2,-6],[3,-6],[17,-26],[4,-2],[18,-3],[4,-4],[2,-6],[1,-5],[-1,-13],[-1,-4],[-6,-8],[-5,-2],[1,-2],[2,0],[5,2],[2,-2],[1,-5],[-3,-2],[-1,-3],[-12,-18],[-6,-5],[-5,-6],[-7,-6],[-3,-3],[-3,-7],[-6,-8],[-6,-17],[0,-4],[1,-2],[-4,-29],[-1,-4],[-2,-4],[-7,-6],[-3,-1],[-4,4],[-6,10],[-1,-4],[-3,-3],[5,-1],[2,-2],[3,-7],[-2,-2],[-8,-5],[-5,-6],[-3,-6],[-1,-5],[-1,-10],[-1,-6],[-2,-5],[3,-9],[2,-12],[1,-8],[-1,-6],[-5,-1],[-3,1],[-2,-3],[3,0],[4,-3],[4,1],[3,-4],[6,-18],[6,-10],[2,-7],[-1,-2]],[[3098,2168],[-1,3],[-7,2],[-5,3],[-8,4],[-8,0],[-6,4],[-7,4],[-27,0],[-14,1],[-14,0],[-1,1],[0,5],[-2,4],[-3,4],[-3,3],[-4,9],[3,14],[0,4],[-2,3],[0,6],[2,2],[1,7],[-2,13],[-2,3],[-3,1],[-3,-2],[-5,1],[-2,-1],[-2,-3],[-4,-3],[-2,1],[0,4],[-2,3],[-1,3],[0,5],[-1,7],[-2,7],[-3,6],[-1,6],[0,7],[1,6],[-1,6],[-2,6],[1,7],[2,4],[1,5],[9,1],[-1,6],[2,5],[1,5],[2,2],[7,5],[2,3],[2,7],[0,3],[-1,9],[3,6],[4,3],[2,7],[-1,7],[-2,6],[-3,2],[0,6],[1,5],[4,12],[0,5],[1,2],[5,6],[2,6],[4,3],[0,3],[-2,3],[0,9],[1,6],[6,7],[1,3],[0,4],[-1,9],[-1,6],[-3,10],[1,3],[4,3],[1,5],[-1,5],[-2,2],[0,15],[2,3],[5,1],[0,4],[4,6],[0,6],[-5,9],[-2,6],[-12,4],[-1,5],[0,3],[3,-2],[14,3],[3,-2],[3,1],[1,8],[2,4],[0,4],[-2,3],[-3,0],[-14,3],[0,16],[2,2],[2,8],[-3,10],[2,6],[-1,4],[-2,3],[-2,5],[0,6],[4,3],[0,3],[-1,4],[-3,1],[-6,5],[-1,4],[1,12],[0,8],[-1,4],[1,3],[2,3],[-1,7],[-1,3],[0,3],[2,6],[3,-1],[5,3],[0,8],[-2,11],[-2,7],[0,3],[1,2],[-1,10],[0,6],[1,17],[0,6],[-2,6],[0,6],[1,4],[2,5],[1,5],[2,3],[1,3],[-3,5],[-1,4],[2,5],[1,0],[2,4],[0,8],[-1,3],[0,7],[-1,4],[2,3],[3,-1],[0,5],[1,1],[3,17],[-1,13],[2,5],[4,5],[4,3],[3,1],[2,3],[1,5],[0,3],[-1,3],[-2,3],[-2,14],[0,9],[-4,16],[0,12],[1,7],[-2,8],[3,11],[0,3],[-1,8],[-1,4],[1,5],[2,7],[0,7],[3,2],[2,4],[3,0],[1,1],[0,3],[3,8],[2,3],[3,1],[2,4],[0,5],[-1,6],[1,6],[-1,9],[0,5],[-1,4],[0,8],[-2,1],[-1,3],[1,2],[2,1],[2,3],[1,13],[2,8],[0,3],[2,8],[3,9],[1,5],[0,3],[5,2],[1,2],[0,8],[-1,9],[0,19],[2,12],[0,6],[-2,2],[-2,-2],[-2,1],[-2,4],[0,10],[2,4],[0,4],[-2,5],[-2,10],[0,9],[-2,2],[0,7],[-2,3],[-1,5],[0,8],[2,0],[1,5],[-2,4],[-2,0],[-2,2],[-2,10],[-2,6],[1,8],[0,6],[1,6],[0,4],[2,2],[2,0],[2,5],[-1,4],[0,3],[1,4],[1,9],[3,14],[0,5],[2,-2],[4,2],[2,8],[1,2],[0,3],[-2,1],[-1,2],[0,3],[1,9],[0,6],[-2,13],[-1,12],[1,5],[5,8],[0,3],[2,15],[0,9],[1,4],[1,9],[4,7],[1,5],[1,0],[3,7],[3,6],[2,3],[0,4],[3,16],[3,10],[3,14],[4,3],[1,-2],[2,0],[1,3],[4,2],[2,2],[0,8],[-1,4],[-3,8],[-3,9],[0,9],[5,12],[-1,5],[-2,19],[-1,5],[-1,9],[0,4],[1,11],[2,4],[3,4],[-2,2],[0,3],[-1,5],[-1,1],[-1,4],[0,5],[1,7],[2,2],[2,5],[2,2],[1,4],[6,5],[4,4],[9,7],[6,5],[1,3],[0,3],[3,17],[4,22],[2,14],[-5,11]],[[3133,3869],[4,10],[0,5],[1,3],[6,6],[1,3],[0,5],[1,3],[2,0],[8,6],[1,3],[2,13],[1,2],[3,-2],[1,-3],[6,-8],[2,-5],[3,0],[4,1],[1,-1],[14,0],[4,-2],[2,-2],[5,-3],[2,-8],[2,-13],[3,-14],[1,2],[1,11],[4,14],[4,17],[3,4],[4,-1],[1,1],[12,0],[12,0],[0,-3],[2,-6],[3,-4]],[[6264,7523],[-2,-1],[0,3],[2,0],[0,-2]],[[6290,7424],[-5,1],[-4,-3],[-1,1]],[[6280,7423],[-2,8],[-3,9],[1,4],[-1,2],[-5,5],[1,3],[0,7],[-3,1],[-6,-4],[-3,2],[-3,4],[-2,-2],[-1,1],[0,4],[-3,7],[-5,-3],[-3,-1]],[[6242,7470],[-1,3],[-4,8],[-5,6],[-3,3],[-8,-2],[-6,3],[-3,4],[1,2],[-3,11],[0,5],[-1,2],[3,5],[1,5],[0,8],[-2,8],[-3,4],[-2,4],[0,2]],[[6206,7551],[5,1],[4,0],[4,2],[4,1],[2,2],[9,-1],[3,1],[7,0],[1,1],[-1,2],[4,1],[1,1]],[[6249,7562],[2,-6],[2,-1],[1,-3],[-3,-1],[1,-2],[4,-4],[3,0],[2,-1],[0,-2],[4,-6],[0,-2],[-5,-6],[-1,-4],[2,-6],[4,-7],[4,-5],[7,-5],[0,-4],[-1,-4],[-2,-5],[-7,0],[-1,-2],[2,-1],[4,-5],[2,-4],[2,-2],[7,-10],[4,1],[4,-3],[0,-5],[-3,-2],[0,-3],[2,-2],[4,-7],[-1,-2],[-4,1],[0,-3],[2,-3],[0,-12]],[[6248,7546],[2,0],[0,2],[-2,1],[0,-3]],[[257,4357],[-1,-1],[-2,3],[4,3],[1,-1],[-2,-4]],[[500,396],[-9,-2],[-21,3],[-14,6],[-1,4],[-5,5],[27,-2],[13,-3],[20,-6],[-6,-1],[-4,-4]],[[611,454],[-22,13],[12,-1],[2,-3],[12,-5],[-4,-4]],[[542,484],[-3,-1],[-74,7],[-15,2],[-5,3],[3,4],[18,3],[21,-2],[25,-5],[17,-4],[9,-3],[4,-4]],[[724,574],[-6,-1],[-23,4],[-2,4],[-20,4],[2,4],[14,-5],[18,-5],[14,-3],[3,-2]],[[3340,556],[-1,-18],[-2,-5],[-8,-6],[-13,-6],[-40,3],[-18,3],[-7,4],[-6,10],[-16,-1],[-11,-3],[-4,-5],[-26,8],[-39,15],[-5,3],[6,4],[5,1],[5,-2],[1,-6],[5,-2],[97,1],[8,0],[16,2],[9,2],[3,3],[-8,0],[-6,7],[1,6],[10,2],[-1,6],[7,1],[2,3],[12,4],[20,-2],[5,-5],[-3,-8],[0,-5],[8,-1],[5,-5],[-8,-3],[-3,-5]],[[4135,587],[3,-1],[4,5],[5,0],[22,-5],[7,-5],[-11,-2],[-11,-4],[-12,4],[-21,3],[-6,2],[-5,7],[11,5],[14,-9]],[[4101,594],[-7,1],[6,7],[6,1],[6,-3],[-11,-6]],[[3161,571],[-4,0],[-3,6],[-13,4],[-5,8],[-18,8],[-2,5],[3,1],[7,-2],[13,-1],[5,-2],[14,0],[7,-1],[4,-6],[9,-2],[2,-11],[-11,-5],[-8,-2]],[[3131,607],[-5,-3],[-20,1],[-11,3],[6,8],[8,4],[9,1],[18,-3],[-5,-4],[0,-7]],[[4056,615],[-3,-3],[-67,4],[-4,1],[1,4],[22,3],[7,4],[32,-8],[11,-3],[1,-2]],[[581,587],[-34,-3],[-14,2],[-30,6],[-40,12],[-18,7],[-7,4],[-2,4],[2,11],[2,3],[9,4],[4,4],[9,5],[3,3],[10,0],[14,-2],[20,-8],[25,-14],[14,-8],[16,-7],[12,-11],[3,-5],[4,-3],[-2,-4]],[[3045,594],[-18,0],[-12,2],[-7,4],[-3,7],[3,12],[6,7],[6,4],[17,9],[25,7],[9,5],[54,19],[12,2],[9,-3],[-2,-3],[-11,-8],[-8,-7],[-19,-11],[-13,-8],[-17,-11],[-13,-14],[2,-4],[-3,-6],[-17,-3]],[[9655,682],[-3,-4],[-4,-2],[-12,2],[-9,-4],[-9,-1],[-5,2],[-2,3],[-1,7],[15,-3],[9,-3],[7,4],[10,8],[3,-2],[1,-7]],[[3743,644],[33,0],[9,-1],[5,-4],[7,-15],[2,-8],[7,-10],[-1,-19],[-2,-5],[-6,-5],[-9,0],[-4,-3],[7,-4],[-1,-6],[-157,-26],[-6,-1],[-6,-3],[-4,-4],[-122,-5],[-6,7],[1,11],[8,4],[10,12],[6,6],[2,4],[9,-4],[7,1],[10,6],[3,-1],[1,-4],[17,9],[29,21],[10,11],[-2,6],[-10,3],[6,10],[0,9],[4,1],[4,6],[-4,3],[6,13],[22,19],[8,10],[38,12],[19,3],[21,-1],[8,-1],[38,-12],[14,-8],[7,-5],[2,-5],[0,-5],[-2,-6],[-3,-4],[-31,-3],[-4,-2],[-4,-6],[4,-1]],[[854,729],[-6,-2],[-6,4],[8,1],[4,-3]],[[822,727],[-27,4],[-4,1],[13,4],[15,-7],[3,-2]],[[9640,730],[10,-4],[28,0],[23,-4],[2,-4],[-7,-2],[-10,-5],[-6,-2],[-6,0],[-11,2],[-15,0],[-3,-3],[-7,-3],[-8,-6],[-2,5],[-12,13],[11,10],[0,2],[-6,5],[3,3],[6,2],[7,-2],[3,-4],[0,-3]],[[872,748],[-12,-1],[-6,2],[-2,4],[2,1],[15,-2],[7,-2],[-4,-2]],[[854,741],[-2,-1],[-12,1],[-3,1],[-17,2],[-9,5],[3,2],[6,1],[2,2],[17,1],[1,-3],[6,-4],[3,-4],[5,-3]],[[927,750],[-10,-2],[-3,1],[1,3],[-2,3],[1,3],[6,0],[17,-3],[2,-4],[-12,-1]],[[851,764],[19,0],[8,-1],[0,-3],[-8,0],[-4,-3],[-5,0],[-7,2],[-6,3],[3,2]],[[826,761],[-11,-1],[-7,3],[1,2],[19,1],[2,-3],[-4,-2]],[[900,768],[-4,0],[-8,5],[7,0],[5,-5]],[[922,769],[-3,-4],[-9,2],[-4,3],[2,4],[4,1],[6,-1],[4,-5]],[[925,792],[-6,-1],[-13,6],[-2,5],[13,-2],[8,-8]],[[9525,831],[-5,-8],[-5,2],[7,6],[3,0]],[[965,822],[-22,6],[-3,2],[2,3],[8,1],[10,-4],[5,-6],[0,-2]],[[9553,873],[-5,2],[-1,5],[7,5],[6,1],[-3,-7],[-4,-6]],[[1322,896],[-4,-4],[-9,2],[1,3],[7,2],[6,-2],[-1,-1]],[[1359,887],[-3,-1],[-22,5],[-6,5],[6,5],[10,1],[1,-2],[9,-3],[7,0],[1,-2],[-3,-8]],[[1461,885],[-4,-1],[-11,6],[-5,4],[-1,8],[3,1],[5,-1],[10,-4],[7,-1],[3,-4],[-3,-5],[-4,-3]],[[1757,912],[-14,-2],[-4,2],[0,4],[28,13],[6,-3],[-13,-9],[3,-1],[-6,-4]],[[1679,915],[-8,-1],[-2,2],[6,6],[-4,10],[4,0],[4,2],[9,0],[7,-2],[2,-4],[-5,-7],[-11,-4],[-2,-2]],[[1651,935],[6,-9],[1,-4],[-19,-10],[-3,-10],[-34,-4],[-15,3],[-3,3],[0,3],[5,1],[-3,7],[7,8],[-10,7],[-10,0],[3,6],[6,4],[3,-1],[13,0],[13,-1],[13,-2],[27,-1]],[[4427,928],[-2,-13],[2,-5],[5,-7],[0,-8],[-2,-2],[-7,0],[-3,3],[-4,12],[-5,5],[-12,3],[-12,-1],[3,3],[18,4],[4,2],[3,4],[1,5],[3,7],[5,3],[3,0],[2,-5],[0,-5],[-2,-5]],[[9716,944],[-3,-1],[-6,3],[-1,2],[5,7],[1,4],[3,1],[3,-8],[2,-3],[-4,-5]],[[1490,962],[8,-2],[5,-4],[7,-3],[3,-7],[5,-3],[1,-4],[-12,-1],[-3,-1],[-1,-3],[2,-2],[7,-1],[6,2],[9,-2],[11,5],[2,0],[11,-5],[3,-3],[-3,-5],[6,-2],[3,-4],[-1,-9],[-2,-2],[-8,2],[-18,1],[-6,2],[-10,6],[-7,2],[-6,5],[-9,3],[-7,5],[0,6],[-6,3],[-4,0],[-5,-4],[-3,-1],[-3,2],[0,7],[-3,1],[-2,3],[1,8],[3,4],[4,1],[4,-1],[11,2],[7,-1]],[[2947,958],[-3,-1],[-4,3],[2,6],[6,6],[5,1],[3,-2],[-4,-5],[-1,-4],[-4,-4]],[[2095,969],[-3,-3],[-6,1],[-5,4],[-2,6],[1,4],[3,1],[12,-13]],[[2934,973],[-4,-8],[-5,-2],[3,-3],[0,-3],[5,-5],[-2,-6],[-3,-3],[-37,16],[-3,3],[-3,8],[3,4],[6,1],[8,-3],[2,4],[4,0],[1,2],[-10,3],[-3,5],[9,3],[25,-4],[4,-2],[3,-4],[-3,-6]],[[2394,983],[-5,0],[-4,4],[3,2],[6,-4],[0,-2]],[[2467,968],[-10,-1],[2,13],[3,4],[-6,9],[-3,7],[1,2],[9,3],[10,-1],[4,-3],[1,-7],[-4,-5],[4,-2],[0,-8],[-6,-8],[-5,-3]],[[2360,998],[-6,0],[0,4],[13,4],[5,3],[2,-1],[2,-7],[-16,-3]],[[4552,997],[-6,-1],[-4,3],[-2,7],[2,3],[3,1],[5,-8],[2,-5]],[[6901,1019],[-2,0],[7,11],[2,1],[3,-4],[-1,-4],[-4,-3],[-5,-1]],[[4652,1026],[-6,-1],[-5,3],[-2,3],[1,4],[4,1],[4,-4],[4,-6]],[[6941,1041],[-4,-7],[-2,4],[1,3],[5,0]],[[2275,1041],[-3,-6],[0,-6],[7,0],[3,12],[7,2],[3,-7],[-3,-5],[3,-6],[3,0],[6,9],[1,5],[6,6],[14,1],[7,-4],[-5,-8],[-11,-5],[-8,-6],[8,-2],[6,3],[16,5],[6,4],[2,-1],[0,-6],[3,-4],[-2,-9],[-7,-2],[-7,-1],[2,-4],[-1,-3],[-18,2],[-9,-2],[-6,3],[-16,-2],[-9,0],[-7,1],[-7,3],[-6,1],[-8,0],[-8,4],[-6,1],[-10,4],[-5,3],[-4,-1],[-35,6],[-8,-1],[-10,3],[-2,4],[2,4],[3,1],[48,7],[5,2],[4,0],[7,-12],[3,0],[5,5],[8,-1],[5,2],[3,5],[10,5],[6,-1],[6,-2],[3,-6]],[[4917,1081],[-3,-1],[-7,2],[-3,5],[1,3],[3,1],[2,-3],[7,-7]],[[3317,1091],[-3,-1],[-7,3],[-1,3],[5,3],[7,-3],[-1,-5]],[[4929,1107],[3,-2],[4,1],[5,-2],[-8,-13],[-6,-5],[-5,-2],[-1,3],[0,8],[-4,2],[-2,5],[-13,7],[-1,3],[14,1],[8,-2],[6,-4]],[[2952,1115],[4,-5],[-4,-4],[-14,-8],[-8,-3],[-9,-2],[-38,-7],[-5,1],[-2,2],[-2,5],[0,3],[7,5],[29,5],[2,1],[5,9],[5,-2],[5,-9],[4,4],[0,8],[2,0],[7,-4],[1,4],[2,2],[9,-5]],[[3312,1110],[-2,0],[-5,7],[1,4],[2,1],[9,0],[3,-2],[-1,-6],[-7,-4]],[[4835,1120],[-7,-4],[-1,2],[-7,7],[6,1],[4,2],[4,-1],[1,-7]],[[5083,1117],[-9,-2],[-2,2],[-1,4],[1,2],[12,6],[4,0],[2,-3],[-3,-6],[-4,-3]],[[4908,1121],[-5,0],[-1,2],[6,9],[3,2],[10,1],[3,-2],[0,-8],[-1,-3],[-15,-1]],[[3008,1136],[1,-2],[6,2],[3,-3],[-6,-7],[-4,0],[-3,7],[0,2],[3,1]],[[6999,1115],[-5,1],[-5,7],[0,9],[4,4],[2,-8],[4,-3],[3,-7],[-3,-3]],[[5125,1124],[-5,-2],[-5,3],[-3,8],[1,3],[4,2],[7,-1],[3,-7],[-2,-6]],[[5745,1129],[-2,-2],[-5,1],[-4,-2],[-3,0],[-10,4],[-1,6],[1,4],[9,7],[3,1],[5,-1],[4,-6],[3,-9],[0,-3]],[[5035,1137],[-2,-8],[-2,1],[-1,4],[-5,8],[0,4],[3,3],[8,1],[2,-1],[2,-5],[-5,-7]],[[3300,1153],[-4,0],[-3,2],[3,5],[5,-2],[1,-4],[-2,-1]],[[2916,1167],[5,-1],[10,-10],[0,-3],[-3,-1],[-3,-8],[-5,-3],[-12,2],[-12,3],[-3,6],[4,6],[9,3],[3,5],[7,1]],[[5450,1151],[-2,-4],[-9,5],[-5,2],[-3,4],[1,3],[3,3],[6,3],[9,1],[9,-1],[2,-1],[-9,-6],[-2,-9]],[[3e3,1169],[-6,-3],[-4,2],[-12,4],[-5,7],[0,3],[2,2],[4,1],[7,-2],[4,-2],[10,-12]],[[3277,1167],[-2,0],[-3,5],[-1,8],[-8,12],[-2,7],[4,2],[9,-4],[8,-10],[1,-3],[-1,-5],[-3,-1],[1,-3],[-3,-8]],[[3053,1198],[0,-7],[4,3],[6,-3],[10,-20],[3,-14],[4,-11],[10,-18],[8,-16],[0,-8],[3,-2],[1,-3],[1,-11],[0,-12],[1,-24],[0,-6],[-5,-8],[-1,-7],[-5,-7],[-15,-12],[-1,-7],[-24,-5],[-13,-2],[-11,3],[-6,-1],[-36,-2],[-1,3],[-8,2],[-7,5],[-2,5],[6,6],[7,1],[7,-1],[6,-2],[36,-2],[12,3],[6,5],[-6,4],[-3,0],[-18,-6],[-6,-1],[-7,2],[-7,5],[0,2],[22,4],[6,4],[2,5],[-15,4],[-6,-1],[-7,1],[-12,11],[-4,-1],[-15,-15],[-6,1],[-7,3],[-6,1],[-6,-2],[8,-7],[1,-2],[-13,-9],[-5,1],[-4,5],[-3,1],[-7,-1],[-7,2],[-12,9],[-1,3],[2,6],[-1,3],[2,3],[5,4],[7,1],[6,-5],[7,-1],[-1,10],[1,3],[5,2],[7,-3],[6,-5],[7,-4],[3,3],[-6,5],[-1,3],[1,3],[5,1],[22,-4],[11,4],[-6,3],[-13,3],[-4,5],[9,4],[10,-1],[18,-4],[6,2],[5,6],[4,2],[12,-1],[10,3],[2,0],[11,-11],[2,2],[1,7],[-2,6],[-3,-1],[-9,3],[-10,1],[-7,2],[-7,4],[0,3],[3,7],[14,8],[7,3],[9,0],[3,3],[-7,4],[-5,4],[-11,1],[-6,-3],[-5,0],[-16,8],[-5,5],[0,10],[3,9],[1,7],[-1,6],[-2,3],[-4,2],[-3,4],[-2,5],[1,7],[3,5],[17,5],[27,5],[3,-2],[6,-8],[1,-13]],[[3314,1222],[-1,-1],[-5,2],[-4,3],[6,1],[3,-2],[1,-3]],[[3128,1280],[-5,-1],[-4,1],[0,5],[-2,1],[9,4],[5,0],[3,-3],[-6,-7]],[[9577,1293],[-2,-2],[-2,1],[-1,3],[1,6],[0,8],[4,-4],[3,-7],[-3,-5]],[[3128,1330],[-6,1],[2,7],[2,1],[3,-1],[2,-5],[-3,-3]],[[7383,1327],[-5,-2],[-1,2],[-7,6],[-1,7],[6,0],[7,-3],[4,-7],[-3,-3]],[[6347,1337],[-4,-2],[-3,2],[2,4],[8,0],[4,-1],[0,-3],[-7,0]],[[9535,1335],[-4,0],[-2,6],[4,0],[2,-6]],[[7403,1338],[-3,-2],[-3,0],[-3,4],[1,2],[3,1],[8,-3],[-3,-2]],[[3111,1297],[-3,-4],[-3,-1],[-4,2],[-3,-8],[-4,-4],[-2,1],[-2,-2],[-5,0],[-6,10],[0,7],[1,3],[8,10],[6,14],[7,11],[14,10],[3,-1],[1,-4],[-7,-8],[-1,-11],[3,-1],[1,-2],[4,-3],[-7,-7],[-8,-6],[6,-3],[1,-3]],[[7369,1347],[-5,-2],[-2,2],[1,5],[6,-5]],[[7744,1355],[-2,-1],[-3,2],[-1,4],[4,1],[5,-3],[-3,-3]],[[9516,1354],[-3,-2],[-6,7],[1,3],[8,-8]],[[7784,1369],[-4,0],[-1,2],[2,3],[4,1],[-1,-6]],[[3149,1370],[-6,-6],[-1,2],[2,2],[0,7],[4,3],[2,-1],[-1,-7]],[[7682,1380],[4,-2],[5,0],[2,-2],[1,-4],[-3,-2],[-15,-1],[-2,2],[2,6],[6,3]],[[7571,1393],[-4,-1],[-3,1],[-3,4],[2,2],[5,0],[4,-2],[1,-2],[-2,-2]],[[3170,1391],[-6,-2],[-3,0],[1,6],[2,2],[0,4],[2,2],[1,4],[3,2],[6,-1],[-1,-6],[-3,-1],[-2,-4],[0,-6]],[[7804,1400],[-12,-1],[-6,2],[-2,4],[4,8],[5,4],[8,1],[5,-2],[4,-4],[1,-5],[-7,-7]],[[7871,1414],[-2,-2],[-5,2],[-1,7],[-2,2],[-7,3],[-1,4],[1,2],[3,0],[7,-4],[1,-2],[0,-6],[6,-6]],[[3240,1447],[-6,-2],[2,6],[3,0],[4,4],[1,-1],[-4,-7]],[[3409,1464],[-5,2],[-1,5],[4,1],[8,5],[2,-2],[-1,-5],[-7,-6]],[[3244,1470],[-3,-6],[5,0],[5,3],[3,-3],[-6,-2],[-6,-6],[-3,-1],[-5,0],[-5,-6],[-2,2],[-6,2],[-2,2],[-5,2],[3,6],[8,5],[-1,3],[6,2],[0,4],[4,4],[6,1],[3,-4],[-1,-3],[2,-5]],[[3268,1473],[-2,-3],[-3,1],[-2,-4],[-6,2],[4,5],[5,11],[-4,5],[1,3],[3,3],[6,-1],[-1,-3],[6,-3],[-1,-6],[-2,-3],[0,-4],[-4,-3]],[[3392,1494],[2,-1],[5,6],[4,0],[-2,-3],[8,-5],[-1,-4],[2,-3],[-3,-1],[-3,-3],[4,-4],[-3,-1],[-5,2],[-3,-1],[-1,4],[-3,0],[-1,-6],[-3,0],[1,4],[-1,1],[-7,-3],[-2,3],[7,4],[-3,2],[0,6],[-3,0],[-3,-2],[-2,1],[0,3],[3,4],[1,5],[10,6],[3,0],[1,-3],[-2,-11]],[[3405,1508],[1,-1],[5,1],[2,-2],[-3,-2],[-11,1],[-2,3],[7,1],[1,-1]],[[3314,1505],[-5,-2],[1,3],[0,7],[3,3],[4,-1],[-3,-4],[-1,-3],[1,-3]],[[3447,1524],[-2,-3],[-6,4],[-2,3],[1,1],[10,2],[2,-1],[1,-4],[-4,-2]],[[0,325],[44,1],[19,-4],[20,0],[20,-1],[11,-5],[34,2],[82,-4],[84,-8],[17,-3],[16,-6],[16,1],[96,-5],[15,0],[58,-5],[112,-12],[9,1],[-5,6],[-9,5],[-13,4],[8,2],[19,0],[-4,3],[-47,3],[-146,15],[-15,4],[-23,1],[-5,3],[34,2],[4,2],[-26,9],[5,5],[14,3],[-2,4],[-25,8],[-16,3],[-10,-2],[-21,0],[-25,-1],[-14,4],[-8,6],[-23,11],[-56,11],[-10,3],[-70,17],[-4,7],[32,-8],[26,4],[9,0],[66,-14],[23,-6],[5,-2],[6,1],[55,1],[17,-1],[19,-4],[8,-7],[6,-3],[19,5],[18,3],[15,-5],[10,-6],[44,1],[19,0],[13,-3],[49,10],[7,2],[12,6],[-16,3],[-3,3],[19,3],[27,3],[16,3],[9,7],[37,11],[11,4],[11,8],[-24,16],[-23,14],[14,7],[7,6],[-15,8],[-12,3],[-59,11],[6,6],[8,3],[17,2],[108,6],[109,8],[3,3],[-15,5],[-17,2],[-1,7],[-26,5],[-11,6],[-1,3],[4,8],[6,4],[10,2],[30,0],[12,2],[0,4],[-3,4],[9,2],[1,3],[-3,4],[-6,3],[-18,4],[-40,7],[-24,8],[-8,5],[-12,4],[1,3],[-6,5],[-12,-2],[-23,1],[-28,4],[-19,5],[-25,13],[-10,6],[7,4],[8,3],[34,7],[5,2],[7,6],[-12,2],[-9,0],[-9,2],[-34,0],[-19,-1],[-16,7],[-12,7],[-4,4],[-2,6],[7,17],[1,19],[5,4],[5,1],[10,-9],[9,-1],[14,2],[12,6],[8,1],[16,-2],[15,0],[25,-6],[9,-5],[4,-6],[10,-1],[30,1],[8,0],[21,-9],[18,-9],[6,-2],[11,-2],[6,5],[10,4],[22,5],[5,6],[-11,5],[-5,1],[-3,4],[0,5],[2,4],[5,1],[11,-6],[13,-6],[4,-1],[10,3],[8,1],[15,-12],[9,-1],[11,0],[2,2],[-3,7],[-3,3],[8,5],[-6,5],[-6,2],[1,3],[8,4],[-1,9],[-2,3],[-12,5],[-17,9],[-15,4],[-35,-4],[-13,2],[-17,6],[11,3],[10,2],[8,6],[8,4],[13,-2],[29,-11],[6,-1],[20,-5],[12,1],[-5,5],[-6,3],[-15,10],[2,5],[9,7],[25,1],[10,2],[14,6],[18,10],[16,1],[19,3],[6,-2],[17,-9],[10,-4],[7,0],[-9,12],[14,3],[11,5],[17,11],[15,3],[43,5],[14,-4],[13,-1],[2,1],[9,18],[6,4],[18,4],[15,0],[10,-5],[10,-3],[9,-1],[9,0],[13,3],[18,1],[8,1],[10,-3],[23,-1],[19,-3],[11,0],[15,3],[9,1],[30,6],[23,1],[18,-3],[28,2],[29,-1],[12,-3],[65,2],[52,5],[7,2],[11,6],[6,6],[13,2],[15,-1],[20,-4],[18,1],[34,-2],[3,2],[3,10],[6,17],[4,5],[8,-2],[23,-9],[1,-4],[-6,-4],[-1,-8],[3,-2],[5,0],[3,-3],[-12,-10],[-4,-1],[-2,-12],[-3,-3],[0,-5],[5,0],[5,2],[18,4],[25,3],[9,2],[5,0],[3,3],[-5,5],[-1,5],[3,4],[-1,7],[-2,6],[4,6],[5,-2],[8,1],[4,-2],[14,-4],[6,-4],[2,-10],[-2,-10],[-6,-7],[-12,-7],[-14,-10],[3,-5],[7,1],[31,0],[20,1],[12,-1],[16,-3],[13,-4],[15,-1],[9,2],[9,-2],[34,8],[13,5],[8,-3],[13,2],[7,-1],[13,3],[9,0],[10,-1],[29,-1],[2,-5],[9,-9],[8,-3],[9,1],[7,3],[10,-1],[16,4],[21,-1],[3,2],[3,5],[-5,3],[-14,4],[-12,7],[-5,2],[-9,-1],[-9,4],[6,3],[7,9],[-3,8],[-3,2],[-8,0],[-10,-3],[-4,2],[-6,1],[-3,8],[-7,14],[-3,5],[-20,5],[-9,3],[-3,5],[2,8],[11,2],[10,-1],[20,-3],[5,-3],[4,-1],[8,0],[26,2],[6,4],[18,2],[-17,7],[-14,5],[-12,3],[-21,2],[-10,0],[-7,1],[-24,-1],[-6,2],[-5,6],[-6,14],[-2,7],[7,6],[7,0],[10,-1],[4,-2],[2,-4],[-5,-7],[2,-2],[10,0],[5,-2],[5,0],[10,2],[14,1],[15,-4],[13,3],[44,-2],[6,0],[10,-7],[5,1],[14,-4],[8,-4],[8,-2],[14,1],[10,3],[8,1],[18,-2],[9,-3],[8,1],[7,4],[25,3],[16,-1],[30,-7],[7,-1],[13,5],[5,7],[-1,8],[4,2],[3,-1],[6,6],[14,-2],[3,4],[2,7],[10,1],[7,-1],[9,-5],[0,-4],[-10,-15],[4,-7],[6,1],[8,-1],[14,3],[11,-10],[12,0],[17,9],[5,1],[6,-4],[9,-9],[8,-5],[11,-3],[10,-1],[18,-8],[15,0],[6,-2],[17,-7],[16,4],[9,3],[4,6],[-2,9],[-1,9],[2,4],[5,1],[19,-10],[-3,11],[-5,8],[1,6],[4,2],[8,-3],[9,-2],[8,-4],[16,-12],[5,-12],[10,-2],[8,0],[19,4],[9,-1],[7,2],[3,-6],[-8,-9],[-2,-5],[2,-2],[8,3],[13,-1],[10,4],[9,2],[9,4],[12,-1],[7,-4],[7,2],[10,-1],[29,15],[16,0],[10,4],[15,1],[12,5],[20,0],[10,3],[19,3],[12,4],[23,9],[10,6],[10,13],[6,13],[7,17],[-4,11],[-6,10],[-8,11],[-2,14],[1,13],[-5,22],[-6,15],[-14,23],[0,12],[-2,10],[-4,7],[-2,5],[6,3],[9,2],[22,-4],[2,6],[5,4],[4,5],[-2,7],[-4,3],[-6,7],[3,5],[4,0],[3,6],[-2,5],[2,8],[4,8],[3,4],[-5,5],[-5,7],[1,6],[5,13],[4,6],[3,2],[-1,2],[-6,2],[-5,0],[-10,-3],[-3,2],[0,4],[2,19],[6,2],[4,7],[3,0],[2,-2],[1,-9],[1,-2],[0,-5],[2,-1],[2,3],[4,1],[4,-2],[-1,11],[-1,4],[2,6],[-2,8],[1,3],[5,6],[4,0],[9,-4],[4,5],[1,10],[-3,3],[0,3],[2,2],[2,7],[9,0],[4,1],[-2,3],[-1,4],[8,3],[10,-4],[3,3],[-1,4],[-3,1],[0,7],[5,-2],[3,5],[-2,3],[6,1],[3,4],[2,1],[5,-1],[2,5],[-3,0],[-4,3],[-1,8],[1,6],[4,5],[4,3],[8,-2],[6,0],[2,-3],[4,-1],[0,4],[-2,8],[9,6],[3,-1],[4,1],[-1,4],[2,6],[3,1],[2,-5],[2,-1],[3,1],[7,6],[7,1],[4,4],[1,4],[8,6],[8,12],[-1,3],[1,2],[17,8],[8,1],[13,5],[8,6],[5,3],[5,7],[5,1],[13,5],[10,7],[13,6],[6,-1],[3,-2],[1,-6],[3,-8],[4,-3],[-2,-4],[-3,1],[-4,-1],[-1,4],[1,2],[-1,3],[-9,-2],[-11,-8],[-11,-6],[-8,-9],[-5,-9],[-3,-7],[-5,0],[-1,-3],[3,-2],[4,-1],[-3,-5],[3,-4],[0,-4],[-3,-1],[-4,5],[-5,0],[-7,6],[-2,-1],[-2,-4],[1,-6],[-2,-3],[-2,2],[-1,6],[-5,1],[-8,-7],[-3,0],[-1,-3],[-8,-7],[-7,-10],[-4,-5],[-7,-2],[-3,0],[-5,2],[-3,0],[-1,-3],[5,-8],[-3,-3],[-5,0],[-3,2],[-2,-2],[-3,-6],[2,-7],[8,-4],[1,-2],[-7,-2],[-9,-14],[1,-4],[3,-7],[5,-5],[10,1],[2,2],[6,0],[2,5],[7,-1],[1,3],[2,1],[8,0],[2,-3],[-5,-7],[-3,2],[-3,0],[-2,-3],[3,-4],[-3,-9],[-3,3],[0,5],[-8,3],[-3,-4],[-4,-2],[-2,-10],[-3,2],[-1,6],[-6,5],[-13,-1],[-3,-1],[-2,-4],[3,-3],[1,-4],[-1,-7],[3,-4],[0,-5],[-3,0],[-2,2],[-8,13],[-5,5],[-2,6],[-9,1],[-5,-2],[3,-6],[-3,-2],[-6,-10],[-3,-4],[8,-6],[1,-6],[-2,-3],[-6,-1],[-10,5],[-4,0],[-1,3],[-3,-1],[-1,-5],[-4,-7],[1,-5],[2,-1],[-7,-5],[5,-2],[1,-3],[-8,-2],[-7,1],[-3,-1],[-2,-6],[3,-13],[-5,-9],[0,-3],[4,-8],[-3,-2],[-2,-5],[2,-1],[10,1],[7,4],[3,-1],[-1,-5],[-14,-7],[-2,-3],[10,-2],[3,-2],[-2,-2],[-5,-8],[2,-2],[7,-3],[13,-4],[10,-2],[-2,5],[0,6],[6,5],[4,2],[16,2],[8,-1],[-1,-2],[-10,-1],[-10,-6],[-2,-2],[0,-4],[9,-3],[3,-3],[-4,-8],[1,-5],[4,-6],[6,-7],[2,-4],[5,-2],[7,-6],[3,-7],[2,-14],[5,-11],[7,-6],[1,-4],[-2,-5],[-6,3],[-3,-3],[-2,-5],[11,-7],[14,0],[0,-4],[-6,-7],[-8,-3],[-1,-4],[2,-5],[7,2],[11,-1],[2,-7],[8,-14],[-1,-5],[-4,-1],[-7,-6],[-4,-2],[-7,-8],[-5,-2],[11,-1],[10,6],[3,-1],[3,-4],[1,-5],[-2,-4],[-17,-3],[-8,-2],[-9,-7],[10,-3],[7,1],[9,-3],[6,1],[4,2],[7,-1],[0,-11],[1,-6],[-2,-3],[-9,-3],[-6,0],[0,-7],[9,-6],[6,3],[6,-2],[0,-9],[4,-10],[3,0],[3,4],[4,0],[2,-5],[-2,-9],[-3,-5],[-12,3],[-9,-6],[-6,0],[-9,8],[-16,2],[2,-4],[4,-2],[1,-7],[3,-7],[6,2],[10,-4],[5,-5],[3,-5],[-4,-10],[-8,-4],[-5,3],[-4,0],[-4,-2],[-2,-4],[-3,-2],[15,0],[4,-1],[4,-4],[-6,-5],[-9,1],[-4,-2],[-4,-4],[15,-2],[5,1],[10,4],[2,-4],[-4,-3],[-5,-7],[-17,-2],[-17,5],[1,-4],[9,-12],[1,-4],[-2,-5],[-12,-5],[-6,3],[-4,10],[-5,2],[-8,1],[2,-10],[-2,-3],[-5,1],[-5,-1],[-11,-6],[17,-2],[4,-4],[-1,-2],[-9,-1],[-9,-2],[-11,-5],[8,-3],[8,1],[11,-2],[1,-3],[-3,-3],[-19,-7],[-20,-9],[-15,-5],[-29,-11],[-32,-6],[-50,-13],[-17,-10],[-5,-8],[-13,-4],[-9,-1],[-25,-1],[-26,4],[-21,1],[-11,-1],[-39,6],[-15,-1],[-12,1],[-26,-2],[-3,-5],[4,-7],[9,-9],[16,-17],[9,-3],[5,-4],[10,-4],[23,0],[30,-4],[18,-3],[-1,-6],[-11,-11],[-6,-5],[-16,-8],[-21,-4],[-16,2],[-29,6],[-36,6],[-54,6],[-26,5],[-14,-5],[-13,-1],[4,-2],[54,-15],[45,-12],[6,-3],[6,-1],[0,-8],[-3,-5],[-9,-5],[-23,-1],[-30,-4],[-14,0],[-15,4],[-31,11],[-18,9],[-14,9],[-9,8],[-9,3],[2,-5],[5,-6],[7,-6],[-8,0],[-7,-6],[5,-9],[9,-9],[8,-2],[11,-6],[26,-11],[12,-11],[2,-6],[7,-6],[10,-1],[2,5],[-1,7],[10,3],[19,-3],[82,-1],[8,-3],[3,-5],[2,-9],[-8,-11],[-6,-5],[-19,-5],[-13,-1],[-28,1],[-27,0],[21,-6],[21,-4],[28,1],[11,1],[10,2],[11,-12],[8,-5],[6,-13],[7,-11],[12,-5],[8,3],[16,1],[16,-4],[10,-1],[13,3],[10,5],[22,5],[10,4],[13,-2],[5,-5],[4,-7],[13,-6],[16,-2],[17,2],[7,-2],[5,-8],[5,-1],[67,-18],[23,-3],[35,-2],[27,0],[9,-5],[-21,-3],[-36,2],[-13,0],[-9,-2],[-17,-2],[4,-3],[19,-1],[17,0],[2,-4],[-16,-1],[-34,-1],[-6,-3],[8,-2],[2,-3],[-4,-8],[6,-6],[8,0],[14,-5],[14,0],[18,4],[8,0],[23,2],[21,0],[29,4],[9,0],[-8,-5],[-36,-11],[-17,-3],[2,-6],[14,-11],[6,-9],[6,-2],[14,1],[0,-6],[-11,-14],[5,-3],[12,-2],[32,-1],[9,-1],[54,33],[6,3],[36,15],[7,6],[14,0],[19,9],[18,7],[11,1],[7,2],[15,-1],[10,1],[19,5],[15,2],[15,3],[17,0],[47,4],[13,-1],[15,-5],[22,1],[8,2],[4,-5],[2,-7],[-4,-6],[-7,-4],[-2,-7],[9,-3],[32,4],[16,4],[5,3],[6,-1],[11,4],[14,14],[17,15],[14,9],[9,11],[8,7],[15,7],[13,0],[19,8],[27,9],[21,-5],[23,-6],[11,5],[8,1],[15,4],[5,5],[7,3],[6,6],[55,6],[4,2],[4,-1],[10,1],[12,3],[17,1],[9,-1],[9,9],[16,1],[30,7],[142,6],[6,3],[12,2],[5,7],[-19,2],[-6,3],[-10,-1],[-147,11],[-3,0],[-4,6],[1,10],[-4,9],[-9,2],[-10,0],[-11,-1],[-32,-5],[-12,0],[-34,7],[-22,7],[-14,3],[-21,9],[0,9],[2,9],[19,24],[11,12],[8,1],[7,5],[8,12],[6,6],[13,6],[27,10],[15,-1],[11,7],[33,16],[8,6],[9,3],[26,13],[24,7],[12,2],[14,4],[30,11],[50,11],[30,3],[20,3],[14,-2],[15,1],[18,5],[8,6],[28,-3],[17,4],[8,1],[8,2],[-6,2],[-7,8],[4,8],[3,3],[8,5],[4,6],[4,10],[14,18],[4,3],[8,1],[7,-1],[9,0],[21,-4],[4,1],[12,13],[12,10],[2,3],[-1,5],[-18,-3],[-13,-3],[-14,2],[-1,3],[3,2],[5,1],[1,3],[-4,3],[-8,1],[-4,3],[3,12],[4,2],[13,14],[6,3],[16,3],[19,-4],[5,1],[4,6],[-5,9],[-3,3],[0,3],[10,-1],[9,-2],[11,0],[13,9],[18,8],[9,3],[8,1],[4,8],[6,14],[5,8],[0,4],[-2,4],[-9,-1],[-10,3],[-12,6],[-4,7],[-2,6],[4,4],[4,2],[4,0],[7,-2],[9,-7],[5,-2],[5,-4],[4,0],[5,6],[4,9],[8,5],[5,4],[-2,4],[-6,2],[-1,3],[3,3],[5,0],[5,-6],[8,-4],[6,-1],[5,-3],[7,-11],[9,-18],[4,0],[8,2],[8,0],[6,5],[1,13],[2,6],[-1,6],[-3,6],[-4,4],[1,3],[3,3],[10,3],[10,-3],[13,1],[9,4],[8,2],[7,-2],[3,-6],[-4,-6],[-10,-11],[-1,-10],[5,-1],[41,1],[6,-1],[7,0],[8,-2],[13,1],[12,2],[6,0],[9,-2],[7,-4],[14,1],[4,2],[4,5],[4,2],[5,-5],[2,-11],[2,-5],[6,-5],[6,4],[4,5],[9,9],[11,7],[8,4],[20,7],[10,5],[19,6],[25,3],[45,11],[15,1],[24,3],[12,3],[13,2],[7,8],[18,-6],[6,-1],[8,5],[9,12],[13,-5],[8,-8],[9,-6],[27,-13],[14,-2],[4,2],[6,7],[7,10],[4,4],[13,9],[-2,3],[-7,3],[1,3],[12,0],[6,-10],[15,-6],[19,2],[15,0],[14,-2],[7,1],[6,7],[10,3],[6,-3],[3,-11],[13,-4],[26,-5],[3,2],[4,5],[2,8],[5,1],[7,4],[4,-1],[5,-4],[-2,-12],[-3,-10],[4,-9],[3,-5],[11,-1],[13,1],[26,4],[3,9],[5,11],[10,14],[7,-3],[7,-7],[4,-3],[1,-5],[-4,-5],[1,-3],[4,-2],[15,-4],[5,1],[7,4],[7,8],[4,10],[6,0],[6,-2],[4,-6],[0,-9],[6,-7],[5,-4],[12,-5],[12,-1],[9,-2],[15,1],[7,3],[5,0],[8,3],[8,6],[5,2],[19,5],[15,6],[15,10],[15,6],[30,4],[9,0],[21,8],[8,4],[5,1],[5,6],[5,16],[0,6],[-2,8],[-5,7],[-4,11],[2,12],[3,4],[10,6],[10,1],[20,-2],[0,-5],[-9,-11],[-3,-2],[1,-5],[7,0],[15,1],[4,-5],[11,-18],[2,-9],[4,-2],[6,1],[12,0],[9,1],[7,0],[4,-1],[4,-4],[7,-5],[7,4],[5,2],[7,-1],[9,-5],[10,-14],[11,-6],[1,4],[-2,5],[5,5],[5,8],[8,10],[6,10],[1,15],[3,12],[5,6],[12,7],[10,1],[8,8],[7,4],[13,5],[16,4],[11,14],[10,3],[11,1],[22,5],[10,3],[8,8],[5,2],[11,0],[9,4],[7,0],[7,3],[1,4],[-3,4],[-1,4],[4,6],[3,2],[9,-1],[8,-4],[5,-1],[2,-2],[-5,-4],[-3,-6],[10,-9],[6,1],[7,3],[7,-2],[3,-5],[0,-8],[2,-4],[5,4],[2,7],[-1,10],[1,6],[11,10],[5,7],[-8,2],[-6,-1],[-3,2],[-4,8],[10,6],[12,0],[7,-6],[14,-8],[8,0],[7,-1],[2,3],[-3,12],[0,7],[-6,3],[-1,9],[2,9],[7,5],[10,3],[21,14],[5,3],[14,3],[16,1],[20,5],[35,-3],[16,-5],[13,-12],[10,-10],[14,-3],[4,-3],[5,-8],[-5,-5],[-5,0],[-8,3],[-6,3],[-5,-1],[5,-6],[4,-3],[1,-5],[-3,-6],[-16,-13],[10,-4],[6,3],[5,6],[9,3],[13,0],[8,2],[5,-1],[6,-4],[19,-7],[15,-15],[11,2],[6,3],[17,1],[15,-7],[8,-2],[24,-2],[14,-4],[9,5],[6,2],[13,1],[7,-1],[18,-6],[31,-5],[22,-3],[19,0],[25,-5],[7,-2],[16,2],[7,2],[7,4],[4,-1],[3,-6],[-2,-10],[5,-13],[4,-6],[2,-5],[-2,-4],[-11,-12],[1,-7],[2,-4],[-3,-5],[3,-8],[0,-4],[-2,-4],[-5,-2],[-9,0],[-4,-2],[-1,-6],[2,-4],[5,-2],[2,-5],[-1,-6],[-2,-6],[-5,-3],[-14,1],[-6,4],[-5,-4],[-12,-11],[-9,-10],[11,-3],[8,-6],[17,1],[13,5],[4,-1],[2,-5],[-1,-9],[0,-7],[-9,-19],[-3,-3],[-4,-6],[-5,-4],[-4,-2],[-7,-6],[-5,-11],[-5,-9],[-7,-15],[-6,-26],[-3,-11],[-6,-17],[-4,-3],[-7,-8],[2,-4],[12,-2],[9,-4],[12,8],[6,5],[1,9],[-1,10],[4,6],[8,8],[25,6],[7,2],[6,7],[5,7],[9,4],[8,7],[1,5],[4,1],[9,5],[6,7],[2,6],[1,12],[2,9],[8,20],[4,6],[10,3],[4,3],[10,12],[-1,9],[3,8],[6,5],[8,9],[9,1],[8,5],[8,-3],[9,-5],[16,2],[8,-2],[6,2],[5,7],[2,9],[6,5],[7,0],[11,8],[12,8],[10,2],[7,6],[6,10],[6,8],[7,8],[2,13],[5,7],[8,6],[7,3],[30,10],[23,6],[23,8],[7,0],[9,5],[20,0],[5,10],[11,8],[8,3],[9,8],[7,0],[10,-1],[9,-2],[8,0],[11,6],[17,1],[6,3],[4,3],[25,8],[9,-1],[13,1],[8,0],[17,-2],[17,3],[7,3],[13,7],[15,2],[14,4],[15,-7],[4,0],[9,3],[8,-1],[10,-3],[7,-3],[3,0],[7,3],[7,5],[7,3],[12,-4],[8,-4],[24,2],[19,6],[8,-5],[9,-1],[15,8],[13,-5],[4,-7],[14,1],[23,11],[11,2],[8,4],[12,15],[0,5],[4,4],[20,-1],[6,2],[8,4],[13,-3],[14,-5],[8,0],[10,-2],[10,-6],[9,-2],[39,-14],[22,-3],[11,-5],[6,-6],[5,-1],[5,2],[6,-7],[15,-6],[15,-3],[10,5],[17,12],[6,6],[-1,12],[8,13],[16,7],[30,7],[15,2],[8,-2],[4,-3],[5,-2],[7,-8],[11,-17],[8,-6],[12,-2],[7,-4],[9,-12],[-6,-10],[-4,-4],[-20,-5],[-8,-4],[-8,-2],[-2,-9],[3,-4],[8,2],[10,1],[14,4],[6,4],[14,3],[9,3],[8,2],[6,3],[6,0],[5,-3],[5,0],[12,-1],[6,2],[5,0],[5,-1],[6,-3],[5,-1],[7,2],[23,9],[11,1],[5,-1],[-11,-5],[-19,-7],[-10,-7],[6,-3],[35,8],[16,5],[14,3],[4,2],[11,9],[5,2],[28,7],[13,4],[8,4],[7,0],[4,-3],[7,-3],[6,1],[8,3],[8,12],[13,4],[6,-2],[9,-4],[7,-2],[6,-15],[14,-13],[4,-4],[12,2],[13,-6],[6,1],[5,2],[4,-1],[8,3],[14,33],[6,7],[4,3],[5,1],[8,4],[10,1],[8,-2],[17,-1],[13,4],[16,0],[7,4],[8,1],[11,-4],[10,-7],[3,-12],[3,0],[10,7],[6,2],[10,11],[6,-3],[13,-5],[5,-1],[10,-8],[5,1],[4,4],[13,0],[11,-4],[5,-3],[6,-5],[3,-1],[3,2],[24,-2],[11,-4],[8,-4],[28,-3],[10,-4],[7,2],[12,-1],[10,-8],[10,-4],[6,1],[8,3],[7,4],[8,0],[4,-3],[1,-9],[6,0],[6,4],[6,-1],[2,-6],[-3,-8],[-7,-11],[-3,-10],[-6,-9],[1,-4],[6,-2],[6,6],[13,5],[7,5],[12,2],[11,-2],[9,-7],[15,-12],[2,-9],[0,-4],[-3,-5],[9,-6],[7,-1],[6,1],[24,-5],[12,2],[11,0],[12,1],[10,-1],[8,0],[9,1],[7,3],[4,-2],[2,-21],[4,-3],[8,7],[19,-2],[8,0],[7,-3],[8,-5],[7,2],[4,4],[6,2],[2,5],[1,8],[-1,8],[4,2],[8,-5],[10,-13],[12,-12],[5,-3],[10,-7],[13,-3],[13,-7],[16,1],[12,-8],[8,6],[5,2],[6,-2],[7,-5],[6,-1],[21,-9],[11,-3],[4,-6],[5,-6],[0,-6],[3,-8],[12,-6],[11,-14],[11,-29],[5,-5],[8,0],[8,-7],[3,4],[-7,19],[-1,11],[6,6],[12,2],[10,-11],[9,-7],[6,-2],[12,1],[11,7],[9,-3],[14,0],[18,-5],[7,1],[14,-2],[17,-6],[9,-2],[2,-3],[5,-4],[4,-10],[6,-5],[6,-1],[11,-4],[24,-14],[9,-4],[5,-3],[3,4],[0,7],[5,2],[9,-19],[3,-7],[-5,-6],[-13,1],[-5,-9],[-3,-17],[5,0],[4,2],[1,-6],[-3,-5],[-4,-2],[-17,6],[-10,1],[-10,5],[-8,0],[11,-10],[12,-4],[16,-6],[0,-4],[-3,-4],[-5,-10],[-14,-9],[-8,6],[-10,2],[-5,-4],[-10,1],[-19,-2],[-8,8],[-12,4],[1,-3],[10,-13],[11,-3],[11,-4],[2,-3],[-5,-3],[-6,0],[-9,-6],[-15,1],[-8,0],[-4,-3],[-4,-1],[3,-2],[4,-6],[-6,-5],[-5,-2],[-5,1],[-5,-2],[-3,6],[0,12],[-4,11],[-8,-1],[-2,-10],[4,-16],[2,-5],[-2,-4],[-3,-2],[13,-23],[4,-3],[0,-4],[-3,-2],[-8,2],[-9,-1],[-7,2],[-7,1],[-7,-3],[-5,1],[-5,8],[-5,2],[-3,-3],[-3,-10],[-12,-7],[-4,-5],[-2,-20],[-3,-4],[-5,0],[-4,-2],[-11,3],[-22,-7],[4,-3],[24,-1],[8,-3],[1,-9],[3,-4],[11,-6],[2,-3],[-4,-12],[-6,-6],[1,-3],[7,-1],[2,-14],[-4,-6],[3,-10],[-8,-7],[-1,-5],[6,-3],[12,-2],[10,-13],[4,-7],[1,-11],[4,-7],[7,-4],[0,-5],[11,-2],[2,-4],[-2,-5],[-9,-6],[-4,-4],[9,-1],[10,-5],[11,6],[6,5],[4,5],[3,-1],[4,-14],[15,-8],[9,-3],[15,-1],[2,-5],[-2,-5],[-15,0],[-11,7],[-41,-2],[-10,-2],[-11,-5],[-11,-2],[-17,-5],[-7,-3],[-18,12],[-6,8],[-3,1],[-4,-2],[0,-6],[8,-14],[4,-3],[0,-4],[-6,-1],[-5,2],[-10,2],[-9,-4],[-11,-9],[6,-9],[-1,-4],[-12,-7],[-7,-2],[3,-2],[7,-1],[1,-3],[-3,-2],[-11,-3],[1,-4],[6,-2],[8,0],[4,-3],[1,-4],[-11,-5],[-39,-11],[-6,-4],[0,-4],[14,-1],[41,1],[3,-1],[-4,-8],[3,-3],[6,-2],[0,-4],[-16,-3],[1,-3],[12,-4],[0,-17],[-7,-4],[0,-4],[12,-3],[19,-12],[4,0],[19,-9],[5,-4],[6,-2],[5,-6],[17,-9],[2,-4],[-35,-7],[-35,-5],[4,-5],[37,0],[11,-3],[7,5],[41,6],[6,-2],[28,-14],[13,-5],[14,-3],[9,-6],[-1,-5],[10,-5],[14,4],[14,-5],[-10,-10],[-16,0],[5,-5],[7,-2],[48,-2],[14,-5],[13,3],[12,-3],[2,-4],[17,-5],[15,-2],[12,0],[14,-5],[7,0],[5,-3],[33,-2],[9,-6],[16,-1],[46,-6],[51,-8],[-9982,-8]],[[3457,1545],[1,-2],[9,0],[2,-7],[-2,-2],[-12,1],[-4,3],[-8,-3],[-2,-2],[-8,-4],[-2,2],[-1,5],[3,5],[9,5],[13,1],[2,-2]],[[3442,1550],[-6,-5],[-2,0],[-6,4],[-1,3],[3,4],[12,-2],[0,-4]],[[3318,1556],[-5,-1],[-1,3],[3,3],[3,-5]],[[3260,1551],[-1,2],[3,6],[6,3],[-2,-6],[-6,-5]],[[3315,1580],[1,-1],[13,2],[3,-4],[5,0],[-11,-8],[-3,4],[-1,4],[-9,-1],[-3,-2],[-7,-1],[-3,5],[5,0],[4,3],[1,4],[2,-1],[3,-4]],[[3349,1587],[-3,-1],[-3,3],[-1,3],[5,0],[2,-1],[0,-4]],[[3365,1595],[-6,-3],[-4,4],[4,2],[5,-1],[1,-2]],[[3389,1617],[3,-1],[3,1],[2,-1],[1,-5],[-5,1],[-4,-4],[-5,1],[-1,-7],[-4,3],[-4,-1],[-1,-5],[-2,-1],[-5,2],[-5,3],[6,7],[1,2],[8,4],[4,-1],[8,2]],[[3497,1653],[-1,-1],[-2,2],[0,2],[2,2],[2,-3],[-1,-2]],[[3467,1657],[-4,-2],[-2,6],[-2,3],[2,2],[20,-3],[-2,-1],[-9,-2],[-3,-3]],[[3729,1697],[6,-1],[3,-2],[1,-3],[4,0],[1,-2],[0,-4],[-6,5],[-9,0],[-2,4],[-4,-2],[0,5],[3,-1],[3,1]],[[6923,2358],[-1,-1],[-2,6],[0,5],[3,0],[3,-1],[0,-3],[-2,-5],[-1,-1]],[[6921,2355],[2,-1],[7,8],[2,1],[0,-6],[1,-3],[-5,0],[-1,-3],[4,-5],[3,0],[5,2],[4,4],[2,1],[4,0],[3,5],[5,-2],[2,-7],[-2,-7],[-3,-2],[1,-3],[-2,-1],[-3,4],[-2,1],[-7,0],[0,-2],[-3,-3],[-2,-1],[3,-5],[4,-3],[2,0],[0,4],[3,1],[4,-5],[-3,-2],[0,-2],[-2,-3],[-6,1],[-3,3],[0,2],[-2,0],[-4,-3],[-3,2],[-4,4],[-2,1],[-3,0],[-2,-7],[-3,-3],[-3,0],[-2,1],[-1,2],[1,3],[0,3],[2,6],[0,3],[-2,3],[1,4],[-1,5],[2,1],[-3,6],[2,8],[0,5],[2,4],[1,5],[3,2],[1,-2],[-1,-4],[2,-1],[0,-5],[-1,-4],[-2,-5],[1,-4],[4,-1]],[[6439,2508],[-4,1],[-1,3],[2,3],[3,-7]],[[3285,6165],[-1,-3],[-3,1],[-1,3],[0,2],[2,4],[4,-4],[0,-2],[-1,-1]],[[3284,6196],[0,-2],[-3,3],[0,7],[3,-3],[0,-5]],[[9412,2032],[-1,0],[1,12],[2,2],[0,-6],[-2,-8]],[[9092,2684],[-1,-6],[-3,1],[-2,-1],[-1,4],[2,1],[1,2],[0,3],[3,2],[0,-3],[1,-3]],[[9094,2693],[-2,0],[-1,3],[0,4],[1,2],[1,-2],[1,-7]],[[9113,2723],[-2,0],[0,3],[-1,1],[2,3],[2,-1],[0,-2],[-2,-2],[1,-2]],[[9028,2834],[3,0],[3,1],[4,-5],[3,0],[1,-3],[5,-3],[2,-4],[8,-5],[6,-3],[7,2],[4,3],[3,-2],[1,3],[2,3],[2,1],[3,0],[4,2],[2,0],[4,-2],[4,9],[7,-2],[3,5],[2,0],[5,-4],[2,-5],[0,-30],[0,-33],[1,-2],[0,-11],[-1,0],[-1,3],[1,2],[-1,4],[-2,2],[-2,-2],[-1,-4],[-2,-5],[0,-10],[-3,-13],[0,-9],[2,-8],[0,-11],[-1,-2],[-4,-2],[-3,6],[-1,5],[1,3],[2,-2],[1,2],[0,3],[-3,3],[-3,1],[-1,-1],[0,-7],[-3,-2],[-1,8],[-2,-4],[0,-3],[-2,-4],[0,-8],[-2,-2],[-5,6],[0,-4],[2,-3],[-2,-6],[-1,-7],[-3,-7],[-4,1],[-5,5],[-10,0],[-4,-2],[0,6],[-1,4],[3,1],[3,0],[0,2],[-7,3],[-2,-1],[-2,3],[-6,14],[-3,4],[-6,22],[-1,5],[-1,13],[5,-6],[2,-9],[2,6],[0,2],[-5,7],[-1,2],[-2,0],[1,5],[-1,5],[-5,11],[-4,11],[-4,13],[0,4],[-2,9],[-1,6],[0,6],[1,11],[1,7],[2,-3],[7,-4]],[[9116,2850],[-1,-5],[-2,4],[3,1]],[[9020,2850],[-2,1],[2,3],[1,0],[-1,-4]],[[9119,2862],[4,-8],[-2,-3],[-2,0],[0,3],[-3,-1],[-3,0],[-3,3],[1,3],[4,0],[4,3]],[[9110,2893],[5,-10],[3,-3],[0,-4],[-1,-2],[2,-3],[-3,-5],[-3,-2],[-3,5],[-3,10],[-1,6],[-2,0],[-1,2],[2,2],[3,6],[2,-2]],[[8997,2873],[-1,-1],[-1,4],[0,4],[-1,5],[1,4],[0,8],[2,2],[0,4],[2,1],[2,-4],[1,-8],[0,-5],[1,-5],[-1,-4],[-2,-3],[-3,-2]],[[9035,2966],[-1,-1],[-4,-1],[2,4],[3,-2]],[[9040,2974],[-4,-4],[-2,2],[0,3],[1,1],[3,0],[2,-2]],[[8821,3125],[6,-2],[3,3],[3,-2],[2,-6],[-1,-3],[-2,0],[-5,2],[-4,-1],[-2,-3],[0,-5],[-4,-3],[-2,4],[-5,2],[-2,-3],[-3,0],[-3,-1],[-5,1],[-6,8],[1,5],[2,3],[13,5],[6,4],[7,-1],[2,-2],[-1,-5]],[[9264,3603],[-3,-16],[-1,0],[0,12],[1,6],[3,-2]],[[9261,3610],[-1,-1],[-1,6],[0,10],[3,1],[-2,-9],[1,-7]],[[8143,3683],[-1,-3],[-5,18],[-2,13],[2,2],[3,-17],[1,-4],[0,-3],[2,-6]],[[9251,3700],[-1,-1],[-1,2],[-1,11],[2,11],[0,9],[4,7],[1,4],[0,5],[-1,5],[-1,1],[1,3],[2,2],[1,-11],[2,-3],[-8,-41],[0,-4]],[[9197,3830],[3,-2],[-1,-4],[2,-4],[0,-3],[-1,-3],[-2,2],[-4,12],[1,4],[2,-2]],[[9180,3898],[-2,0],[2,5],[0,-5]],[[9163,3905],[-1,-2],[0,9],[1,1],[0,-8]],[[8206,3986],[-2,-5],[-2,1],[0,3],[3,8],[1,-3],[0,-4]],[[9139,4015],[-2,-1],[-1,1],[1,7],[2,-7]],[[9062,4133],[0,-5],[2,-5],[-2,-4],[-3,7],[-2,4],[0,2],[2,0],[3,1]],[[8872,4198],[-1,1],[1,2],[1,4],[2,-3],[1,-3],[-4,-1]],[[8874,4229],[-2,-5],[-1,0],[-1,-2],[-2,-2],[-2,0],[-2,-1],[0,7],[2,5],[2,4],[4,1],[4,3],[1,-1],[2,-6],[-4,-1],[-1,-2]],[[8807,4275],[-1,-3],[-2,3],[0,3],[-1,0],[0,3],[1,1],[2,-1],[0,-4],[1,-2]],[[8793,4283],[-2,0],[-1,3],[1,2],[2,1],[0,-6]],[[8460,4296],[-2,-1],[0,2],[-1,3],[0,2],[1,2],[2,-5],[0,-3]],[[8476,4344],[-1,-4],[-2,3],[1,6],[1,2],[1,-1],[0,-6]],[[8796,4388],[1,-2],[2,0],[1,5],[1,0],[0,-2],[1,-2],[-2,-4],[-2,-3],[-1,-7],[0,-3],[1,-2],[3,-2],[1,1],[1,-1],[-2,-6],[-3,1],[-4,0],[-8,3],[0,1],[2,5],[0,15],[3,4],[2,4],[2,3],[1,-1],[0,-7]],[[8783,4387],[-1,-1],[-2,1],[0,4],[1,1],[1,4],[2,-2],[0,-5],[-1,-2]],[[8623,4511],[2,-2],[1,-2],[0,-2],[1,-2],[-3,-1],[-5,3],[-6,-3],[-1,0],[-1,2],[1,7],[2,-1],[1,2],[0,7],[-1,3],[3,7],[2,1],[1,-4],[0,-6],[2,-4],[1,-5]],[[8627,4528],[4,0],[4,4],[2,-2],[1,0],[3,5],[3,1],[1,3],[1,-4],[4,-3],[2,-7],[-2,-9],[-2,0],[-2,-7],[-10,-13],[-8,11],[-4,7],[-3,10],[0,8],[-1,5],[0,2],[2,0],[2,-5],[3,-6]],[[8793,4528],[-1,1],[2,9],[2,1],[0,2],[1,3],[0,4],[1,1],[-1,-10],[-4,-11]],[[8682,4532],[-1,-1],[-2,9],[1,3],[-1,5],[1,0],[1,4],[1,-2],[0,-6],[1,-4],[-1,-8]],[[8976,4495],[-2,-13],[0,-7],[2,-4],[2,-2],[1,-6],[3,-8],[0,-5],[2,-7],[1,-14],[1,-12],[1,-8],[-1,-17],[1,-7],[2,-6],[1,-12],[2,-10],[2,-3],[4,-4],[4,4],[2,6],[4,1],[4,3],[3,-8],[2,-7],[7,-11],[4,-7],[3,-3],[3,-5],[0,-5],[-1,-4],[1,-6],[1,-8],[-1,-8],[2,-13],[1,-10],[2,-11],[0,-10],[-1,-4],[0,-6],[2,-7],[2,-5],[5,-15],[3,-2],[2,0],[-1,-9],[5,-18],[2,-14],[-2,-20],[-1,-12],[0,-5],[5,-14],[3,-2],[0,-7],[-1,-10],[3,-8],[3,-6],[2,-3],[3,-3],[4,-3],[5,-1],[3,-4],[1,-4],[4,-1],[1,1],[3,1],[2,-5],[2,-9],[5,-8],[3,-2],[1,-4],[5,-2],[3,-3],[5,-8],[4,-1],[2,-2],[5,-8],[2,-5],[1,-6],[-2,-1],[-2,1],[-1,-6],[3,-9],[3,-6],[4,-7],[4,-9],[1,-8],[1,-3],[2,-10],[3,-6],[0,-10],[4,-29],[3,-10],[2,1],[1,2],[3,-7],[2,-1],[-1,12],[1,8],[2,1],[2,-6],[3,-6],[5,-6],[3,-5],[1,0],[0,10],[2,1],[1,-3],[2,-9],[1,-19],[0,-16],[2,-16],[4,-8],[4,-11],[3,-2],[7,-11],[2,-1],[3,0],[4,-5],[2,-5],[4,-17],[2,-5],[7,-8],[2,-4],[3,-16],[3,-7],[4,-4],[3,-10],[0,-14],[3,-11],[3,-3],[1,-2],[-2,-20],[2,-39],[-1,-12],[2,-12],[5,-21],[2,-16],[4,-11],[-1,-17],[2,-8],[-1,-11],[-4,-11],[-3,-14],[0,-12],[-2,-22],[-2,-16],[-5,-23],[0,-9],[1,-11],[-1,-10],[-1,-7],[-1,-13],[-4,-21],[-7,-14],[0,-12],[-2,-11],[-6,-10],[-1,-4],[-2,-4],[-5,-4],[-4,-5],[-4,-11],[-4,-12],[-2,-2],[0,-3],[-1,-7],[-4,-4],[1,-7],[-1,-8],[0,-5],[-1,-3],[-2,0],[1,-3],[-3,-7],[-4,-8],[-1,-5],[-2,-7],[-1,-14],[-1,-8],[1,-6],[-1,-2],[-1,1],[-2,-4],[1,-5],[-4,-3],[-5,-21],[-3,-6],[-2,-9],[-2,-16],[-1,-15],[-1,-10],[-2,-10],[-1,-7],[0,-13],[1,-11],[-1,-5],[0,-5],[-1,-5],[-3,-1],[-3,-4],[-4,-7],[-2,-2],[-5,-2],[-10,1],[-19,-3],[-4,-1],[-7,-5],[-7,-7],[-6,-9],[-15,-26],[-12,-2],[-4,0],[-2,-1],[0,-4],[2,-3],[1,-3],[3,4],[1,-1],[1,-8],[0,-5],[-1,-3],[-2,-1],[-1,1],[-5,15],[-3,2],[-1,-2],[-3,-2],[-4,13],[-2,1],[-3,0],[-6,7],[2,7],[2,1],[0,5],[-1,4],[-3,1],[-2,-1],[-2,-3],[-1,-6],[-7,-6],[-3,3],[-3,6],[5,0],[3,5],[3,9],[-2,5],[-2,3],[-3,3],[-9,-10],[-4,-3],[3,-2],[2,0],[2,-3],[-3,-4],[-3,-1],[-3,-3],[-7,-6],[-8,-14],[-3,-4],[-4,-3],[-6,4],[-3,1],[-4,5],[-7,4],[-6,8],[-4,3],[-3,1],[-5,-1],[-7,6],[-6,1],[-3,-7],[-5,2],[-6,11],[-5,5],[-11,3],[-7,8],[-5,14],[-9,17],[-4,12],[0,5],[1,9],[3,14],[-4,16],[-5,16],[-2,5],[-6,11],[-6,8],[-2,4],[0,2],[3,-1],[1,3],[2,1],[1,-4],[2,-1],[0,7],[1,4],[-1,3],[-3,1],[-3,-2],[-2,-3],[-3,-3],[-1,-3],[-4,0],[-6,-6],[-3,0],[-6,2],[2,7],[4,10],[3,17],[0,15],[-2,6],[-5,13],[-2,7],[-3,8],[-2,-9],[-2,-7],[-2,-16],[-5,-24],[-3,0],[-3,1],[-5,-3],[-4,-3],[-3,0],[-2,-1],[-2,1],[4,18],[10,0],[2,9],[1,10],[-1,6],[0,6],[1,7],[0,6],[4,17],[4,9],[4,7],[0,7],[-2,8],[0,7],[2,2],[2,4],[-2,19],[-4,11],[0,-14],[-3,-9],[-4,-7],[-3,-6],[-2,-13],[-3,-12],[-3,-4],[-3,-1],[-3,-2],[-8,-8],[-3,-5],[-3,-3],[-8,-23],[-4,-7],[-1,-4],[-2,-2],[2,-6],[1,-10],[0,-3],[-2,2],[-3,5],[-3,-2],[-1,-2],[-5,10],[-4,7],[-3,4],[-3,-1],[0,3],[3,3],[5,-7],[1,1],[-4,23],[0,3],[-2,10],[-1,3],[-8,16],[-2,11],[-1,7],[-2,4],[-3,4],[-9,1],[-3,11],[-2,13],[3,1],[1,4],[-1,7],[-8,7],[-4,9],[-3,3],[-4,2],[-4,-1],[-5,1],[-13,13],[-3,0],[-9,-4],[-3,1],[-13,18],[-10,8],[-3,2],[-3,1],[-4,-2],[-2,-2],[-5,-2],[-18,1],[-15,-2],[-11,-2],[-7,-3],[-11,-10],[-13,-11],[-11,-5],[-10,-6],[-6,-2],[-9,-1],[-18,3],[-6,-2],[-9,-12],[-3,-3],[-6,-3],[-14,-16],[-6,-3],[-5,-1],[-3,-3],[-3,-7],[-5,-18],[-3,-9],[-6,-14],[-4,-4],[-4,0],[-4,-4],[-4,5],[-3,1],[-5,-1],[-17,-6],[-3,7],[-3,1],[-6,0],[-9,2],[-16,-3],[-8,-2],[-3,-3],[-6,2],[-10,-3],[-4,-3],[-2,-4],[-5,-15],[-6,-5],[-10,-2],[-10,-15],[-11,-14],[-3,-1],[-4,-3],[-6,-1],[-2,-1],[-12,3],[-8,1],[-10,2],[-8,7],[-6,4],[-8,16],[-4,5],[-8,7],[-2,0],[-2,-2],[-4,5],[0,7],[-1,5],[0,14],[1,17],[3,-4],[2,-4],[5,1],[4,6],[3,9],[2,10],[0,11],[-2,20],[1,4],[2,1],[0,10],[1,30],[-1,11],[-7,22],[-5,20],[-3,9],[-3,14],[-3,30],[0,35],[-3,17],[-6,15],[-1,6],[0,6],[-2,7],[-5,15],[-5,12],[-1,6],[-1,25],[-2,11],[-9,29],[-10,25],[-3,10],[1,2],[2,-2],[0,9],[1,-1],[1,-6],[4,-13],[1,-7],[4,-3],[3,6],[0,10],[-2,4],[-2,2],[-3,7],[-2,12],[-3,10],[0,4],[1,3],[3,-2],[4,-12],[0,-15],[2,-3],[1,2],[1,6],[1,-1],[2,-13],[1,-4],[3,-4],[2,3],[1,3],[0,9],[1,10],[-1,6],[-6,18],[-5,22],[-4,11],[-4,22],[-3,9],[0,17],[2,15],[2,8],[6,18],[0,14],[1,9],[0,6],[-3,16],[3,18],[4,23],[2,3],[3,3],[0,-5],[-1,-15],[2,-8],[-1,-10],[5,4],[2,4],[1,5],[5,18],[3,7],[4,5],[9,6],[8,8],[4,8],[5,7],[3,7],[3,5],[17,18],[3,4],[3,0],[5,-1],[4,1],[4,-4],[3,0],[8,4],[4,4],[7,9],[3,3],[7,3],[8,3],[10,16],[7,-1],[6,-2],[6,5],[11,3],[7,3],[12,11],[4,3],[5,7],[4,9],[4,13],[3,11],[1,5],[5,17],[1,3],[5,5],[7,13],[2,3],[1,4],[-2,3],[-2,1],[-1,15],[-1,9],[0,14],[3,10],[2,5],[3,5],[2,1],[2,5],[4,4],[3,14],[2,7],[2,0],[2,-16],[2,-9],[4,-10],[3,-15],[3,-6],[1,-5],[1,4],[1,11],[0,13],[2,-1],[2,-5],[2,-1],[0,7],[2,5],[-1,3],[-2,0],[-1,4],[-2,4],[-2,3],[-2,8],[-1,2],[1,2],[1,0],[2,3],[0,4],[-1,7],[1,2],[3,0],[3,-11],[2,1],[1,4],[2,1],[3,0],[1,-3],[3,-4],[5,1],[2,-1],[7,0],[-3,3],[-3,1],[-3,-1],[-2,3],[0,5],[1,4],[0,2],[2,-1],[2,0],[0,6],[2,8],[0,4],[-1,-1],[-3,-9],[-1,7],[-2,6],[0,7],[1,8],[2,1],[2,-1],[2,4],[1,4],[0,5],[2,-1],[6,-7],[1,-4],[2,2],[0,8],[-1,-1],[-4,0],[0,4],[-2,5],[2,3],[2,0],[2,2],[1,2],[3,0],[3,-4],[2,-1],[0,2],[1,4],[-4,5],[0,4],[-2,4],[0,5],[2,4],[2,5],[3,0],[2,3],[2,1],[0,12],[1,1],[2,-2],[0,-11],[1,2],[3,-1],[0,-7],[2,-2],[1,6],[2,1],[0,8],[1,5],[0,3],[1,2],[1,4],[-1,3],[-1,5],[2,1],[2,-2],[1,-7],[1,-3],[1,2],[1,4],[2,3],[4,-8],[4,4],[2,7],[0,10],[4,3],[3,-2],[2,-5],[6,-4],[4,-6],[2,-4],[4,-5],[3,-6],[3,-11],[8,-13],[1,-2],[-4,-20],[0,-14],[1,1],[2,5],[1,-1],[1,2],[-2,6],[0,4],[1,3],[2,3],[2,2],[2,4],[1,3],[5,0],[12,-6],[3,-6],[0,-7],[1,-3],[1,5],[-1,10],[1,2],[4,-2],[2,-2],[3,-6],[0,-4],[2,-2],[0,3],[-1,5],[0,5],[1,4],[3,0],[0,3],[-3,4],[-1,5],[2,4],[0,1],[-2,0],[-4,4],[-3,5],[3,11],[4,10],[3,3],[0,3],[1,7],[1,5],[0,4],[1,5],[3,4],[4,1],[2,2],[3,8],[-4,9],[1,5],[0,6],[5,4],[2,11],[1,2],[4,0],[1,1],[0,12],[1,2],[2,-2],[1,-3],[3,-4],[1,2],[-1,4],[0,5],[2,1],[2,0],[0,8],[1,1],[5,1],[2,5],[1,-7],[3,-4],[8,0],[4,3],[2,-2],[3,-1],[5,5],[4,-3],[1,-3],[1,7],[1,2],[3,2],[3,-1],[-2,5],[0,18],[1,4],[-6,9],[-5,2],[-4,-2],[-2,1],[-3,8],[-4,2],[0,2],[4,5],[2,-1],[2,-4],[2,-2],[1,0],[1,4],[1,2],[2,-1],[6,-8],[3,-8],[2,2],[3,4],[3,-1],[2,-2],[2,-10],[2,-5],[5,-1],[5,-5],[3,0],[7,-1],[7,-6],[2,-4],[4,-1],[1,-2],[4,0],[5,4],[3,-4],[1,-3],[4,-5],[6,-2],[3,6],[6,4],[4,6],[4,3],[0,-3],[1,-2],[-5,-10],[0,-3],[1,-2],[2,1],[1,3],[3,1],[2,-2],[0,-8],[2,-5],[3,-1],[2,0],[2,8],[-1,6],[-2,1],[1,3],[5,10],[2,0],[2,-11],[3,-5],[4,0],[1,-1],[2,-6],[-12,-25],[0,-3],[1,-4],[1,-6],[-4,-12],[-1,-1],[-1,3],[-2,3],[-2,-2],[-2,-1],[-7,-7],[0,-18],[2,-11],[-3,-20],[-2,-5],[-2,-3],[-5,-17],[-2,-4],[-2,-6],[1,-5],[0,-4],[2,-5],[9,-9],[4,-6],[6,-8],[2,-5],[0,-5],[9,-7],[1,1],[2,0],[0,-4],[-1,-2],[1,-3],[2,-3],[4,0],[2,1],[3,-4],[2,-2],[3,-5],[12,-10],[6,-14],[4,-8],[5,-6],[7,-4],[3,1],[6,-5],[5,-2],[3,-7],[1,-5],[0,-4],[3,-9],[5,-3],[7,-9],[6,-4],[1,-3],[2,-2],[5,0],[9,4],[4,5],[5,7],[2,13],[1,10],[7,22],[2,10],[2,14],[2,9],[-1,9],[2,17],[3,24],[2,8],[-1,12],[-2,22],[1,7],[1,11],[-2,8],[-1,5],[-1,8],[2,14],[2,7],[1,10],[-1,18],[4,6],[1,3],[3,0],[1,-1],[0,4],[-1,3],[0,4],[-1,2],[-2,0],[-1,3],[-2,2],[0,8],[4,16],[1,6],[3,-5],[0,9],[2,15],[3,21],[1,19],[4,3],[2,5],[2,6],[2,0],[2,-3],[-2,-7],[5,-8],[2,-6],[0,-6],[1,-5],[1,-7],[0,-23],[2,-3],[2,-2],[5,-2]],[[8951,4567],[-3,-4],[-1,2],[0,5],[2,3],[2,-6]],[[8952,4596],[-1,-3],[-2,1],[-1,2],[1,3],[2,0],[1,-3]],[[8948,4598],[-1,-1],[-1,3],[1,4],[1,-2],[0,-4]],[[5475,7948],[-2,-6],[-1,-1],[0,-7],[1,-3],[-3,-1],[-3,1],[-3,-1],[-4,4],[-5,-5],[0,-1],[6,-3],[1,-4],[-1,-5],[-6,-4],[1,-7],[-1,-2],[1,-4],[1,0],[0,-5],[-2,-4],[-2,1],[-3,-2],[-4,-6]],[[5446,7883],[-3,-4],[0,-6],[-1,-1],[-5,2],[-4,-1],[-5,-4],[-6,1],[-6,-1],[-3,-1],[-2,-2],[-2,-4],[-5,-4],[-1,-2],[-3,1],[-9,2],[-5,3],[-5,0],[-1,1]],[[5380,7863],[-6,2],[-4,0],[-5,1],[-13,4],[-3,0],[-3,2],[-3,1],[-2,4],[-1,4],[-3,6],[-1,3],[2,4],[-1,1],[-6,-2],[-5,-3],[-7,0],[-2,-1],[-6,0],[-3,-2],[-3,-8],[-2,-2],[-3,0],[-4,5],[-6,0],[-1,1]],[[5289,7883],[-1,5],[-2,2],[-4,-8],[-2,0],[-7,5],[0,2],[-3,4],[-5,1]],[[5265,7894],[1,1],[0,3],[-2,3],[0,5]],[[5264,7906],[2,7],[0,4],[-2,4]],[[5264,7921],[3,0],[2,1],[1,2],[2,-2],[4,-2],[2,-2],[1,-3],[0,-3],[3,-1],[0,-5],[3,2],[3,6],[1,8],[6,0],[6,-2],[3,-7],[2,0],[4,2],[3,0],[2,3],[5,4],[4,2],[13,2],[1,2],[0,4],[6,-3],[3,-2],[4,2],[3,-2],[0,-4],[5,-5],[2,2],[0,4],[1,4],[-1,3],[-3,0],[1,6],[0,5],[-6,10],[0,2],[4,6],[5,4],[4,1],[3,2],[2,4],[2,10],[1,1],[5,-4],[3,4],[0,9],[1,1]],[[5383,7992],[5,-4],[1,-5],[4,-2],[5,0],[2,3],[3,-1],[4,0],[0,4],[4,6],[2,-1],[1,4],[1,10],[5,-2],[1,-1],[2,1],[4,-1],[5,-4],[3,-1],[4,0],[6,-7],[9,0],[3,3],[3,-1],[3,-3],[5,-1],[1,-5],[1,-1]],[[5470,7983],[0,-3],[-3,-7],[0,-3],[3,-11],[3,-6],[2,-5]],[[6280,7423],[-6,1],[-9,4],[-3,2],[-2,5],[-4,6],[-2,1],[-1,2],[-2,7],[-2,3],[-5,12],[0,1]],[[6244,7467],[-2,3]],[[6356,7397],[-6,-2],[-1,1],[-5,10],[-3,1],[-2,2],[-1,5],[-5,5],[-1,4],[2,3],[5,2],[1,1],[0,6],[-5,6],[0,5],[1,2],[3,2],[2,3],[-9,16],[-3,0],[-3,-2],[-5,-6],[-7,-7],[-8,-10],[-2,-4],[-4,-2],[-2,-3],[-6,-11],[-2,0]],[[6249,7562],[8,9],[4,-2],[8,-5],[-1,-3],[3,-3],[7,-4],[3,2],[3,-2],[5,-5],[2,1],[3,4],[1,5],[-1,6],[-3,3],[-4,3],[-2,3],[-1,6],[-2,0],[0,7],[3,1],[4,8]],[[6289,7596],[3,-1],[0,-3],[2,-1],[2,2],[4,-5],[3,-5],[3,-6],[2,-2],[2,-4],[2,-8],[1,-2],[8,-4],[5,-1],[2,1],[6,14],[6,5],[3,3],[1,4],[4,10]],[[6348,7593],[3,-3],[4,-9],[6,-15],[2,-4],[3,-16],[7,-13],[2,-5],[5,-6],[4,-2],[3,0],[4,-2],[4,-4],[3,-11],[-6,3],[-7,-1],[-3,-1],[-3,-2],[-4,-4],[-2,-6],[-1,-14],[-3,-13],[0,-6],[1,-6],[0,-3],[-3,-4],[-1,-12],[-1,-3],[-2,-1],[0,5],[-3,2],[-1,-3],[-1,-7],[-2,-7],[0,-23]],[[5816,4927],[-1,9],[-1,11],[-4,15],[0,9],[1,12],[-1,7],[0,4],[1,9],[0,4],[-2,6],[-3,6],[-1,3],[0,5]],[[5805,5027],[0,3],[1,3],[1,1],[3,-2],[3,-3],[1,-6],[1,-1],[9,0],[5,5],[0,3],[1,6],[0,13],[2,0],[3,-5],[1,0],[1,2],[2,2],[1,0],[4,2],[2,-4],[2,-1]],[[5848,5045],[-1,-1],[-2,-11],[-1,-2],[1,-3],[0,-4],[-1,-3],[0,-3],[3,-3],[7,-4],[0,-4],[1,-3],[0,-5],[-1,-4],[-3,-2],[-1,-3],[0,-4],[-3,-4],[-3,-5],[-1,-4],[0,-5],[-3,-6],[-3,-9],[-1,-5],[-5,-13],[-5,-6],[-2,-2],[-8,0]],[[5165,8106],[4,-4],[3,-4],[-2,-3],[1,-3],[3,-1],[1,-2],[0,-3],[1,-5],[-5,-4],[-2,-7]],[[5169,8070],[-1,2],[-3,1],[-3,-5],[-2,-7],[-2,-5],[0,-4],[4,-9],[-1,-5],[-1,-1]],[[5160,8037],[-2,0],[-6,-2],[-4,6],[-2,2],[0,2],[-2,0],[-3,2],[-1,2],[-4,2],[-2,0],[0,3],[-2,7],[2,10],[-1,1],[-3,-3],[-2,-6],[-3,-2],[-5,-1],[-5,1],[-1,1],[0,3],[1,1],[0,3],[-1,2],[1,6],[-4,5],[-2,1],[-6,0],[-2,-1],[-1,8],[-4,2],[-5,0],[-2,5],[0,4],[-4,7],[-7,-4],[-5,6],[-2,4],[0,6],[-2,4],[0,2]],[[5069,8126],[12,10],[11,7]],[[5092,8143],[2,-8],[4,2],[3,0],[4,-4],[2,0],[4,2],[4,4],[1,4]],[[5116,8143],[4,-2],[1,4],[3,3],[2,-3],[2,0],[3,4],[2,-2],[1,-3],[2,0],[3,4],[2,-7],[3,-4],[3,-1],[5,1],[3,-5],[4,-1],[2,-3],[0,-2],[-3,-9],[-2,-4],[0,-3],[1,-2]],[[5157,8108],[4,2],[2,-3],[2,-1]],[[5044,5541],[0,2],[4,3],[-1,7],[-2,9],[-2,2],[0,4],[1,3],[-1,2],[0,6],[-1,7],[2,0],[0,42],[0,32],[0,28],[-1,17],[0,5],[-4,8],[-2,5],[0,5],[-1,6],[0,25],[-4,6],[-6,8],[-5,7],[-1,2],[1,18],[1,3],[2,13]],[[5024,5816],[1,0],[1,2],[0,3],[3,-1],[0,6],[2,1],[0,4],[4,2],[1,1],[1,5],[1,1],[0,2],[1,1],[3,0],[1,-3],[8,2],[3,-1],[7,12],[2,4],[2,8],[0,4]],[[5065,5869],[1,5],[-1,11],[0,2],[3,3],[5,2],[2,3],[2,2],[2,-1],[7,-15],[4,-7],[1,-4],[1,-2],[3,-2],[2,-4],[2,-5]],[[5099,5857],[-3,-11],[0,-6],[4,-13],[2,-3],[0,-3],[1,-6],[0,-11],[3,-10],[-2,-10],[-1,-1],[-2,1],[-1,-1],[-2,-8],[2,-6],[-1,-9],[-1,-6],[-2,-3],[-2,-1],[-3,-3],[0,-7],[-2,-6],[-3,-6],[0,-8],[-2,-13],[-8,-3],[-1,-15],[0,-19],[-1,-5],[0,-31],[1,-6],[0,-10],[1,-4],[0,-3],[-1,-2],[0,-14],[1,-5],[-1,-2],[0,-15],[1,-3],[-1,-3],[0,-4],[-1,-9],[0,-4]],[[5074,5550],[-11,-2],[-14,-4],[-5,-3]],[[5024,5816],[-7,0],[-3,-2],[-1,0],[0,2],[-1,0],[-9,5],[-6,3]],[[4997,5824],[-6,2],[-2,-4],[-2,0],[-2,-5],[-4,-4],[-1,3],[-2,1],[-4,-1],[-2,1],[-7,0],[-9,1],[-1,-1],[-9,0],[-9,-1],[-14,0],[0,1],[-3,0],[0,-1],[-2,-15],[0,-8],[2,-8],[2,-3],[-1,-2],[0,-2],[1,-3],[0,-11],[1,-10],[0,-6],[-1,-3],[0,-5],[2,-8],[0,-3]],[[4924,5729],[0,-1],[-2,-2],[-1,0],[-2,5],[-1,1],[-2,9],[-2,2],[-1,2],[-2,6],[-2,2],[-1,-1],[-3,2],[-5,1],[-6,0],[-3,-2],[-2,-2],[-6,-4],[-3,-3],[-1,-5],[-2,0],[-4,4],[-2,0],[-3,2],[-3,5],[-2,2],[-2,3],[-1,7],[-1,5],[-2,6],[-2,3],[-2,2],[-3,-1],[-3,3],[-1,4]],[[4846,5784],[0,3],[1,5],[0,27],[1,3],[2,2],[2,5],[1,10],[1,8],[-1,3],[0,3],[-1,3],[0,9],[4,6],[1,2],[4,1],[5,2],[2,3],[4,4],[1,5],[2,3],[1,3],[0,14],[-1,3],[0,2],[7,7],[0,5],[-1,6],[-2,4],[0,4],[2,4],[1,4],[2,3],[2,4],[3,1],[3,-1],[8,-11],[3,0],[2,3],[2,2],[1,7],[0,10],[1,5],[1,1],[5,-2],[2,0],[1,2],[0,6],[1,10],[3,7],[5,9],[2,2],[2,0],[9,-6],[2,2],[2,15],[6,2],[3,2],[5,6],[8,8],[5,4],[3,6],[4,6],[2,1],[4,1],[2,-1],[2,-3],[4,3],[7,-5],[6,-4]],[[5005,6042],[0,-7],[-1,-8],[0,-9],[2,-5],[4,-9],[-1,-6],[0,-4],[2,-6],[3,-8],[2,-7],[4,-2],[2,-3],[3,-2],[1,-2],[1,-5],[3,-3],[2,-3],[0,-2],[-6,2],[0,-19],[1,0],[2,-2],[6,-9],[6,-10],[1,-2],[3,-1],[4,0],[4,5],[2,1],[2,0],[0,-1],[2,-4],[1,-6],[1,-4],[0,-2],[-1,-1],[-4,-2],[1,-4],[0,-2],[7,-19],[1,-2]],[[7553,6422],[-2,0],[-1,2],[1,2],[-1,8],[2,1],[1,-3],[0,-10]],[[7551,6441],[-1,-5],[-1,4],[1,4],[1,0],[0,-3]],[[7531,6461],[-3,-4],[1,23],[2,-8],[0,-11]],[[7542,6472],[-1,-1],[-2,1],[-1,6],[1,7],[1,-1],[2,-9],[0,-3]],[[7520,6456],[-4,-2],[-3,0],[5,15],[-1,7],[0,6],[-3,4],[0,3],[-1,5],[0,5],[2,1],[3,-4],[0,-4],[1,-5],[4,-9],[0,-5],[-1,-13],[-2,-4]],[[7517,6506],[-1,-1],[-2,2],[1,3],[2,-4]],[[7570,6449],[1,-21],[0,-8],[1,-7],[0,-3],[-2,-2],[-1,3],[-2,3],[-4,4],[-1,-1],[-3,-7],[1,-5],[0,-6],[2,-3],[0,-7],[1,-4],[0,-4]],[[7563,6381],[-2,5],[-1,6],[-4,11],[-1,20],[0,9],[-3,12],[-2,16],[-1,4],[0,4],[-2,6],[-1,6],[-5,11],[-1,5],[0,5],[-2,-5],[-3,-3],[-2,-6],[-2,-1],[-6,-1],[-3,7],[-5,18],[-1,3],[1,11],[-1,10],[0,8],[-2,-3],[1,-4],[-1,-3],[-8,2],[4,-5],[3,-1],[2,-5],[0,-7],[-3,-5],[0,-4],[2,-4],[-2,-2],[-1,-3],[0,-4],[2,-7],[-1,-3],[2,-2],[2,-11],[-1,-6],[-3,-4],[-3,-8],[-2,-8],[-2,-4],[-2,-1],[-2,4],[0,7],[2,7],[-6,-6],[-1,5],[0,11],[2,9],[-3,-4],[0,-17],[-1,-6],[-2,-4],[-4,-6],[-1,2],[-1,8],[-2,-10],[-3,-6],[-4,0],[-1,4],[-2,5],[-1,8],[-1,5]],[[7472,6456],[1,5],[-1,5],[-3,21],[0,3],[-1,9],[-1,6],[0,5],[2,9],[-6,4],[1,10],[-3,7],[-1,1],[-1,6],[1,9],[3,10],[0,10],[1,3],[-3,5],[-7,4],[-1,4],[-2,1],[-2,-1],[-4,5],[-1,5],[0,5],[3,11],[1,1],[3,-3],[1,0],[2,5],[2,13],[6,0],[4,-1],[2,1],[2,4],[-4,6],[-1,8],[-5,0],[-3,2],[-4,9],[-3,6],[-3,1],[-1,2],[0,6],[1,4],[0,4],[3,5],[2,5],[2,3],[2,5],[-3,5],[0,4],[2,1],[3,-3],[4,-10],[0,-3],[4,-3],[2,1],[2,-1],[0,5],[-1,2],[1,3],[3,-2],[1,-4],[0,-6],[2,-6],[5,-6],[3,-1],[2,1],[1,4],[0,7],[3,1],[1,-2],[3,-14],[-1,-5],[1,-16],[-1,-13],[1,-3],[1,0],[7,-4],[9,-4],[3,1],[5,-1],[9,1],[7,1],[5,-3],[8,2],[8,0],[4,-3],[5,-6],[3,-6],[-1,-3],[-2,0],[-4,2],[0,-7],[-4,-22],[-4,-2],[-2,-5],[0,-4],[-1,-1],[-2,2],[-3,-1],[-4,-6],[-4,0],[-1,-4],[-3,-6],[-1,-9],[-1,-6],[0,-4],[3,-12],[1,-16],[2,-2],[0,7],[2,1],[2,-10],[1,-2],[2,-1],[2,1],[2,6],[0,6],[-1,5],[1,4],[5,8],[-1,6],[0,5],[4,-1],[2,3],[1,0],[0,-3],[2,0],[1,-11],[2,-9],[0,-23],[1,-2],[2,-9],[1,-3],[0,-9],[1,-7],[1,-21],[0,-4]],[[5777,7601],[-4,1],[-2,-2],[-4,0],[-3,-2],[-2,1],[-5,8],[-1,1],[-2,-1],[-5,-1],[-3,-4],[-9,-3],[-1,-5],[-1,-2],[-4,-1],[-1,-2],[0,-3]],[[5730,7586],[-3,2],[-3,-1],[-1,-5],[1,-2],[1,-5],[0,-8],[-2,-2],[-4,-2],[-4,1],[-4,-1],[-7,-3],[-4,-1],[-3,4],[-4,3],[-4,2],[-2,-3],[-3,4],[-2,1],[-1,2],[-1,5],[-4,-2],[-9,0],[0,-3],[-1,-1],[-4,0],[-7,-4],[-5,1],[-2,-1],[-4,0],[-2,-4],[-3,1],[-4,0]],[[5635,7564],[1,1],[0,15],[2,6],[0,2],[-2,1],[-3,13],[-1,2],[-6,4],[-6,13]],[[5620,7621],[2,0],[0,2],[3,5],[0,3],[-2,3],[-1,5],[1,4],[0,3],[-1,2],[1,3],[2,2],[5,0],[2,6],[2,2],[3,7],[0,3],[-3,4],[-5,8],[-4,3],[-2,9],[-3,10],[0,5],[1,6],[1,2],[5,4],[0,7],[3,2]],[[5630,7731],[9,-9],[0,-2],[-4,-3],[-1,-2],[0,-5],[2,-2],[8,2],[9,-1],[11,-4],[8,-1],[6,2],[20,-6],[9,-1],[5,2],[4,3],[3,6],[8,8],[8,4],[10,4],[6,1],[10,-8],[4,0],[4,-3],[0,-1],[4,2],[5,-10],[9,-4],[6,0]],[[5793,7703],[-1,-14],[-2,-7],[-4,3],[-6,-2],[-2,-8],[-3,-4],[-1,-10],[0,-15],[-4,-3],[-8,-14],[5,-3],[2,-3],[3,-9],[4,-9],[1,-4]],[[6405,6674],[-1,-4],[-1,1],[-2,8],[0,5],[-1,8],[1,2],[3,1],[-1,-3],[2,-4],[0,-14]],[[2971,6404],[-1,-4],[-3,-8],[-7,-2],[-7,-1],[-1,4],[1,3],[0,3],[2,1],[2,4],[3,0],[3,-2],[2,0],[3,3],[2,6],[1,-1],[0,-6]],[[2974,6422],[-4,-3],[0,4],[2,2],[2,-3]],[[2970,6475],[6,-2],[2,-3],[-1,-3],[-2,4],[-3,1],[-5,0],[1,5],[2,-2]],[[2938,6463],[-2,-2],[0,3],[4,5],[2,5],[2,2],[2,5],[0,2],[-2,4],[0,3],[1,2],[3,1],[-1,-3],[1,-9],[-4,-10],[-3,-3],[-3,-5]],[[2942,6492],[-1,-3],[-4,3],[-1,-1],[-1,3],[0,5],[4,-5],[3,-2]],[[2920,6502],[-3,10],[-5,3],[-2,3],[2,2],[0,3],[-3,12],[-1,6],[-1,1],[0,5],[3,-7],[1,-7],[2,-6],[1,-10],[4,-4],[2,-5],[0,-6]],[[2897,6534],[-3,1],[-5,7],[-2,1],[1,4],[2,-2],[3,-6],[4,-5]],[[2932,6570],[-2,-7],[-2,1],[1,8],[2,1],[1,-3]],[[2842,6580],[0,-1],[-3,-4],[2,-3],[2,6],[2,-4],[1,-9],[-1,-2],[1,-1],[0,-4],[-2,-7],[-5,0],[0,7],[-1,1],[-1,9],[-2,3],[-2,7],[1,2],[3,0],[4,2],[1,-2]],[[2907,6577],[-1,-2],[-4,-1],[3,7],[-3,4],[-3,9],[-1,2],[0,4],[-3,3],[1,3],[2,-1],[3,-13],[0,-2],[6,-13]],[[2851,6624],[-3,-1],[-3,1],[1,3],[2,1],[3,0],[2,-2],[-2,-2]],[[2840,6606],[0,-14],[-3,-3],[-1,-2],[-3,-2],[-2,-3],[-1,5],[-1,2],[0,5],[-4,-1],[-3,4],[-2,5],[3,1],[1,-3],[2,3],[-2,6],[3,9],[1,7],[-1,9],[1,1],[4,-4],[1,-3],[0,-4],[2,-4],[2,-9],[3,-5]],[[2870,6651],[5,-6],[4,-3],[4,-8],[2,-3],[-1,-14],[-1,-8],[-1,-4],[-1,4],[-2,4],[3,0],[0,7],[2,5],[0,5],[-4,6],[-2,5],[-4,2],[-3,5],[-2,1],[-3,-1],[2,7],[2,-4]],[[2819,6723],[3,-2],[3,1],[5,0],[4,2],[1,-5],[-9,-1],[-8,-5],[-4,-3],[-4,1],[-5,10],[2,-1],[3,-6],[3,1],[2,4],[0,4],[1,4],[3,-4]],[[2854,6675],[-1,0],[-2,6],[-2,1],[3,4],[1,4],[0,8],[1,4],[0,3],[1,4],[-1,4],[-3,3],[-5,14],[-8,3],[0,2],[4,-2],[3,0],[3,-4],[2,-5],[3,-3],[0,-3],[3,-3],[2,-4],[1,-11],[-3,-5],[-1,-17],[-1,-3]],[[5527,7768],[6,2],[4,-3],[-2,-9],[-5,-13],[0,-8],[1,-2],[2,-1],[3,-3],[3,-4],[4,-7],[-1,-3],[-3,-1],[-5,1],[0,-3],[3,-5],[3,-8],[0,-7],[-1,-2],[-2,2],[-3,0],[-2,-3]],[[5532,7691],[-2,-1],[-4,1],[-1,-2],[3,-8],[-1,-4],[-1,-1],[-1,4],[-2,0],[-5,-7],[-2,-4],[0,-7],[-3,-1],[-2,-3],[1,-7],[0,-4],[2,-6],[0,-3],[-3,-3]],[[5511,7635],[-4,2],[-5,5],[-5,7],[-5,6],[-2,-1]],[[5490,7654],[-3,2]],[[5487,7656],[2,2],[0,4],[-7,9],[-3,7],[0,8],[-5,4],[-6,7],[-5,8],[0,2],[-3,6],[-3,5],[-3,3],[-5,9],[-2,15],[-2,4],[-5,8],[-4,5],[0,5],[2,20],[2,1],[4,-2],[4,-7],[4,-3],[2,3],[2,6],[2,3],[7,-1],[4,4],[6,-6],[2,-1],[3,1],[6,-3],[3,3],[5,-5],[1,0],[4,3],[4,-1],[4,1],[6,-3],[4,0],[3,-3],[1,-3],[0,-4],[1,-2],[3,-1],[2,1]],[[3252,6219],[3,-2],[0,-1],[1,-1],[-1,-2],[-1,0],[-1,2],[-1,4]],[[5881,8184],[-5,1],[-6,-1],[-4,-3],[-4,2],[-3,-2],[-3,-5],[-3,-4],[-2,-4],[-3,-8],[-1,-5],[2,-7],[0,-4],[1,-3],[-2,-2],[-1,-3],[-2,1],[-3,3],[-1,4],[-4,4],[-3,1],[-4,-2],[-6,-1],[-4,0],[-2,-2],[-4,-1],[-3,6],[-3,7],[-2,1],[-2,-3],[-4,-2],[-3,-6],[-2,1],[-2,5],[-8,2],[-3,2],[-3,-3],[-2,0],[-4,2],[-3,-6],[-2,-1],[0,6],[-7,2],[-2,-1],[-3,1],[-3,8],[-2,1],[-3,-1],[-5,1],[-9,3],[-2,1],[-17,5],[-6,0],[-8,1],[-6,-1],[-2,-1],[-8,-1],[-6,0],[-3,-1],[-3,-6],[-4,-6],[-4,-4],[-5,3],[-3,0],[-2,-2],[0,-5]],[[5655,8151],[-2,5],[0,6],[2,5],[0,4],[1,6],[0,4],[-5,7],[-4,2],[-4,3],[0,5],[6,10],[2,2],[10,7],[2,2],[0,12],[-1,7],[0,4],[-2,10],[-6,19],[-3,19]],[[5651,8290],[2,-1],[5,0],[4,1],[6,0],[3,1],[3,-4],[9,5],[4,0],[1,2],[1,6],[1,2],[5,-1],[3,5],[3,2],[3,0],[2,2],[2,-4],[-1,-2],[2,-2],[3,0],[3,2],[-1,5],[-5,3],[0,3],[3,9],[2,2],[-1,4],[0,5],[2,7],[2,5],[7,2],[2,2],[3,8],[9,0],[1,4],[3,2],[1,2],[-3,2],[-5,1],[-1,3],[2,4],[2,10],[0,3]],[[5738,8390],[5,1],[5,7],[2,1],[15,-2],[2,7],[7,9],[4,3],[3,1]],[[5781,8417],[4,-5],[3,2],[4,0],[4,-5],[1,-3],[2,-1],[4,4],[4,1],[8,-5],[1,-3],[-2,-6],[4,-5],[4,3],[1,2],[4,1],[4,3],[2,-1],[6,1],[6,-3],[0,-2],[4,-3],[3,-5],[5,-1],[0,-12],[-2,-4],[0,-3],[2,-3],[2,-5],[0,-5],[-4,-8],[-1,-7],[6,-5],[4,-4],[-2,-8],[3,-2],[2,-4],[1,-6],[3,-5],[6,-5],[5,-3],[1,-2],[0,-5],[-2,-7],[2,-1],[5,0],[5,-1],[7,-5],[0,-7],[7,-7],[1,-5],[-2,-2],[-5,-3],[-1,-4],[-5,-5],[-3,-2],[-8,1],[-2,2],[-1,3],[-2,1],[-8,-1],[-4,-10],[5,-9],[3,-4],[1,-3],[-2,-2],[3,-9],[-1,-1],[0,-13],[2,-2],[3,-8],[0,-2]],[[2559,6187],[0,4],[1,3],[1,-1],[-2,-6]],[[2556,6216],[0,4],[2,9],[1,-1],[-3,-12]],[[2530,6099],[-6,0],[-3,-1],[-1,1],[1,14],[0,38],[1,16],[0,28],[1,14]],[[2523,6209],[0,9],[3,2],[3,-3],[1,-2],[2,3],[2,6],[5,13],[1,9],[2,2],[2,0],[3,-1]],[[2547,6247],[-2,-6],[2,-1],[4,0],[1,-7],[0,-6],[-3,-16],[0,-5],[-2,-8],[2,-6],[-2,-7],[0,-11],[1,-14],[-2,-19],[-2,-8],[-2,-3],[-3,-8],[-4,-3],[-5,-13],[-1,-4],[1,-3]],[[3201,7043],[-1,1],[2,5],[1,-1],[-2,-5]],[[3133,3869],[-11,-4],[-6,0],[-3,6],[0,3],[1,6],[0,8],[-2,9],[0,7],[-1,9],[-3,4],[-1,7],[0,6],[-2,8],[0,18],[-3,10],[-4,11],[-3,1],[-1,4],[0,5],[3,7],[-1,2],[-5,7],[-2,4],[0,3],[2,2],[-1,6],[0,5],[-1,3],[1,1],[4,2],[1,4],[0,4],[-1,3],[-3,6],[0,1],[3,10],[3,6],[0,4],[-2,2],[-4,6],[-2,5],[-5,7],[-1,4],[0,9],[-1,9],[-1,6],[0,7],[-1,4],[0,4],[-1,5],[-1,3],[1,3],[1,1],[0,2],[-6,6],[-1,10],[-4,8],[-1,7]],[[3068,4175],[0,7],[-1,3],[-2,2],[0,6],[5,6],[7,18],[2,4],[2,2],[1,2],[-1,5],[1,4],[0,3],[3,2],[2,3],[0,2],[-2,3],[-4,2],[-2,0],[-2,2],[-1,2],[-4,24],[-1,5],[0,3],[4,15],[3,6],[-5,11],[-1,4],[0,5],[1,5],[2,3],[1,4],[0,5],[2,3],[1,4],[3,5],[0,7],[4,3],[0,6],[-3,7],[-1,12],[-2,5],[2,5],[1,6],[0,35],[1,4],[2,4],[2,1],[1,3],[0,4],[2,6],[-3,14],[-4,11],[-3,11],[-3,13],[-3,8],[-3,11],[-2,9],[-4,12]],[[3066,4552],[4,1],[6,-1],[6,-2],[5,-1],[2,-2],[0,-3],[1,-1],[3,0],[3,4],[6,4],[4,11],[2,5],[7,2],[1,-1],[2,0],[4,10],[4,7],[3,2],[1,2],[3,0],[13,20],[4,4],[3,1],[6,3],[9,3],[6,1],[2,-3],[2,1],[2,4],[1,1],[2,0],[2,-9],[0,-22],[-2,-8],[-2,-4],[0,-7],[1,-8],[2,-10],[1,-8],[-2,-5],[0,-10],[1,-1],[1,-3],[0,-5],[1,-4],[2,-4],[1,-4],[-1,-3],[0,-2],[2,-1],[1,1],[2,-5],[1,-5],[0,-3],[4,-4],[2,-1],[2,-5],[2,-4],[3,-2],[1,-5],[2,-6],[4,-3],[6,-1],[3,-1],[4,3],[3,0],[4,-4],[2,-4],[6,-6],[2,3],[2,1],[1,-1],[1,-5],[2,-6],[4,-6],[2,-2],[2,0],[4,-4],[5,-4],[3,-1],[2,1],[2,-2],[0,-4],[4,-10],[2,-4],[3,-3],[6,0],[2,-1],[2,1],[8,2],[2,0],[4,-4],[5,-6],[4,-4],[2,-3],[2,-4],[1,-5],[0,-9],[-2,-5],[2,-8],[1,-5],[1,-9],[1,-3],[1,-27],[-9,0],[2,-3],[4,-10],[4,-9],[0,-15],[1,-10],[0,-13],[1,-8],[9,-1],[11,0],[13,-1],[13,-1],[4,2],[1,-3],[-1,-4],[0,-5],[-3,-9],[0,-15],[1,-10],[1,-8],[1,-3],[4,-5],[6,-8],[3,-2],[2,2],[1,-4],[0,-6],[3,-15],[3,-11],[0,-3],[2,-2],[0,-1],[-2,-1],[0,-2],[-2,-11],[-2,-15],[-2,-10],[2,0],[0,-8],[-2,0],[0,-2],[-5,-20],[-5,-18],[8,-13],[-1,-3],[-4,-2],[-2,-5],[-1,-1]],[[3384,4022],[0,18],[-1,2],[-8,10],[-8,9],[-9,11],[-13,0],[-13,0],[-12,-5],[-12,-6],[-6,-2],[-11,-5],[-7,-2],[-5,-24],[-2,-8],[-3,-9],[-5,-12],[0,-29],[-3,-20],[-2,-17],[-5,-27],[0,-3]],[[3652,3584],[-2,-3],[1,14],[1,5],[2,5],[1,-3],[-1,-6],[-2,-9],[0,-3]],[[3650,3663],[-1,-1],[-2,7],[4,7],[1,-3],[-2,-10]],[[3742,3807],[-4,-2],[-1,2],[4,10],[2,-6],[-1,-4]],[[3773,3850],[0,-1],[-5,-3],[-1,3],[3,5],[1,0],[2,-4]],[[3918,4407],[0,-3],[-2,0],[0,3],[-1,2],[1,3],[2,-1],[0,-4]],[[3923,4429],[-1,2],[3,5],[1,3],[1,-4],[-4,-6]],[[3763,5014],[-3,-6],[1,7],[0,8],[2,3],[0,-12]],[[3752,5107],[-2,-4],[-1,1],[0,2],[1,4],[2,0],[0,-3]],[[3559,5101],[-3,-1],[4,14],[4,7],[0,13],[3,12],[4,5],[4,1],[3,-7],[-3,-21],[-1,0],[-4,-10],[-5,-8],[-6,-5]],[[3621,5170],[2,0],[4,1],[2,3],[6,0],[9,-3],[5,-1],[4,-2],[2,-2],[0,-3],[-2,-11],[-1,-7],[-1,-2],[-1,1],[1,-7],[0,-3],[-1,-2],[-4,-12],[0,-2],[-2,-2],[-2,-3],[1,-3],[0,-7],[-3,-5],[-3,-2],[-1,1],[-3,5],[0,-4],[-1,-4],[0,-3],[-4,0],[-1,3],[-3,2],[-1,-7],[-1,-4],[-2,-2],[-3,-1],[-1,-2],[-3,2],[-3,3],[-2,0],[-1,-2],[-6,-1],[-3,-2],[-2,0],[-3,9],[-1,7],[-2,8],[-1,8],[1,6],[2,0],[2,-1],[0,4],[-3,0],[-3,4],[0,6],[1,13],[0,2],[2,7],[-1,3],[2,12],[5,6],[6,3],[18,-7]],[[3592,5176],[-7,-12],[-3,4],[-1,2],[2,7],[4,3],[2,1],[3,-1],[0,-4]],[[3626,5177],[-8,-2],[-3,3],[3,6],[3,3],[3,1],[3,-1],[1,-4],[-2,-6]],[[3618,5199],[1,-3],[-4,-12],[-2,-2],[-3,0],[-3,3],[-5,0],[-1,1],[0,5],[2,6],[4,-1],[7,5],[4,-2]],[[3598,5191],[0,-8],[-5,3],[0,9],[3,3],[2,4],[0,13],[1,2],[2,0],[0,-19],[-3,-7]],[[3606,5206],[-3,-2],[-1,2],[0,7],[1,4],[4,1],[2,2],[0,-7],[-3,-7]],[[3602,5295],[-3,-3],[-1,1],[-2,7],[1,6],[2,2],[2,-1],[1,-10],[0,-2]],[[3430,5295],[1,0],[12,-6],[2,1],[1,2],[0,9],[-1,3],[-2,4],[-1,4],[-2,1],[0,3],[3,5],[1,7],[3,-1],[4,-5],[2,1],[8,1],[1,3],[1,0],[3,3],[3,0],[2,3],[1,0],[0,-3],[1,-3],[2,-3],[3,1],[1,-1],[1,-3],[0,-2],[1,-2],[1,0]],[[3482,5317],[1,0],[2,-4],[2,-3],[4,-3],[2,0],[3,-2],[1,2],[4,5],[3,5],[2,2],[1,-3],[1,-1],[5,-2],[5,5],[2,-6],[1,-2],[1,1],[5,-2],[1,0],[2,2],[1,3],[2,3],[2,2],[2,4],[2,6],[0,7],[3,12],[2,6],[1,5],[0,4],[2,7],[3,7],[1,5],[4,11],[0,4],[1,1],[2,6],[1,2],[2,7],[3,4]],[[3564,5417],[3,10],[0,5],[3,0],[3,-5],[3,-8],[4,-24],[1,-23],[2,-11],[4,-25],[1,-5],[0,-5],[2,-6],[1,-9],[0,-2],[-1,-3],[2,0],[1,-2],[1,-6],[1,-4],[3,-5],[4,-2],[3,-1],[4,-3],[2,-4],[3,-14],[-1,-9],[0,-6],[-1,-2],[-3,-4],[-7,-13],[-1,-4],[-4,-7],[-3,-12],[-5,-12],[-1,-3],[-3,0],[-2,-2],[-3,-10],[-5,-3],[-1,-5],[-3,-12],[-2,-7],[-2,-2],[-4,-13],[-1,-5],[0,-9],[-2,-6],[-3,-4],[0,-8],[-2,-2],[-1,-2],[-6,2],[-9,-9],[7,-3],[3,-4],[7,3],[9,11],[3,2],[6,8],[3,5],[5,6],[3,5],[2,-3],[0,-3],[-2,-4],[0,-3],[2,-3],[0,-5],[1,-4],[0,-7],[3,-8],[0,-7],[2,-3],[6,-12],[4,6],[2,1],[2,2],[3,2],[3,-2],[5,-4],[4,4],[7,8],[-2,-14],[-2,-13],[-1,-5],[-1,-14],[-2,-4],[1,-2],[3,7],[2,9],[5,25],[2,2],[4,3],[8,20],[3,0],[2,-5],[2,-3],[0,6],[3,2],[-3,3],[0,6],[1,5],[-1,5],[4,6],[0,5],[1,4],[2,4],[2,1],[1,4],[2,2],[2,-4],[2,4],[2,2],[2,-3],[2,0],[3,3],[3,-5],[1,2],[-1,2],[0,2],[2,1],[3,-1],[2,-2],[2,-4],[5,0],[2,-2],[2,0],[1,-3],[3,-4],[1,-4],[3,-1],[5,-3],[3,1],[0,-4],[2,-1],[3,1],[2,-5],[5,-4],[4,-5],[3,1],[2,-2],[3,-12],[1,-9],[1,2],[3,10],[3,3],[1,-3],[3,-4],[3,-5],[1,-3],[2,-1],[0,-3],[2,3],[1,-6],[2,-6],[0,-6],[-2,-6],[-1,-4],[-3,-2],[1,-3],[2,-3],[2,8],[1,2],[3,1],[1,-5],[0,-6],[-4,-2],[0,-5],[-1,-2],[0,-3],[-2,-11],[-2,-22],[0,-3],[3,4],[5,11],[1,12],[2,11],[3,4],[3,-1],[0,-6],[-3,-9],[1,-4],[5,10],[2,3],[2,0],[3,4],[8,1],[1,5],[1,2],[4,0],[8,-5],[3,-3],[5,-4],[2,-4],[10,-8],[6,0],[4,3],[4,-3],[2,-5],[5,-2],[4,-1],[4,3],[9,1],[11,4],[6,-1],[8,-3],[5,-7],[5,-4],[3,-4],[4,-4],[9,-11],[4,-6],[5,-9],[6,-4],[3,-9],[3,-4],[6,-16],[7,-10],[5,-11],[9,-7],[3,-12],[7,-1],[2,-2],[3,-5],[5,-2],[12,0],[5,2],[12,-4],[4,-7],[4,-18],[3,-21],[1,-15],[3,-12],[2,-23],[1,-7],[0,-5],[1,-1],[1,-16],[0,-6],[-1,-8],[0,-5],[-1,-4],[0,-3],[1,-7],[0,-6],[-1,-7],[-2,-18],[-6,-30],[-5,-17],[-7,-18],[-4,-10],[-2,-1],[-2,2],[1,-5],[-1,-4],[-4,-13],[-5,-9],[-5,-15],[-7,-6],[-3,-4],[-5,-9],[-4,-13],[-1,-2],[-2,1],[0,-7],[-3,-11],[-2,-2],[0,4],[1,2],[-1,3],[-2,-8],[1,-6],[-2,-9],[-6,-26],[-7,-21],[-2,-7],[-6,-15],[-5,-7],[-2,1],[-1,11],[-4,7],[-1,1],[-1,-7],[-1,-2],[-2,0],[2,-4],[0,-3],[-2,-7],[0,-7],[-3,-7],[-2,-6],[-2,-12],[2,1],[1,-1],[0,-5],[-1,-5],[0,-14],[-1,-3],[2,-3],[-2,-32],[1,-16],[2,-36],[2,-16],[0,-1],[-2,-19],[-3,-18],[-2,-15],[-1,-16],[-1,-8],[0,-8],[1,-19],[0,-3],[-3,-9],[-4,-4],[-2,-4],[-4,-15],[-3,-22],[0,-12],[1,-25],[-1,-10],[-1,-7],[-2,-4],[-4,-6],[-4,-13],[-2,-14],[-2,-5],[-1,-7],[-2,-8],[-6,-13],[-3,-3],[-2,-4],[-1,-7],[-4,-12],[-2,-15],[1,-6],[1,-18],[-1,-5],[-3,-5],[-13,-9],[-3,-4],[-8,-15],[0,-9],[1,-3],[-1,-4],[-2,-5],[-15,0],[-7,-2],[-3,0],[-4,4],[0,3],[1,5],[-1,2],[-4,-1],[0,-5],[1,-2],[0,-4],[-1,-3],[-4,0],[-4,-3],[-6,-1],[-4,-2],[-2,2],[2,2],[3,-1],[3,2],[-1,2],[-4,4],[-5,-2],[-3,-4],[-6,0],[-8,-3],[-1,-3],[0,-5],[3,-4],[-1,-3],[-2,-1],[-8,-2],[-7,-12],[-3,-1],[-3,-5],[0,-4],[-1,-3],[-2,0],[-3,2],[-5,1],[-4,-2],[-18,-18],[-7,-8],[-7,-14],[-13,-17],[-7,-10],[-1,-3],[-3,-2],[2,-2],[0,-5],[-3,-4],[-5,-11],[-1,1],[2,5],[-3,1],[-3,2],[-2,-3],[1,-5],[-1,-2],[-5,0],[-1,-3],[7,-3],[1,-3],[-4,-13],[-4,-1],[0,-2],[2,0],[1,-4],[-1,-14],[-3,-2],[-1,-3],[1,-4],[2,-4],[0,-6],[-1,-6],[0,-5],[2,-10],[0,-10],[1,-4],[0,-4],[-1,-4],[1,-6],[-2,-11],[1,-15],[0,-15],[-2,-13],[-3,-8],[0,-8],[-7,-7],[-7,-10],[-6,-11],[-7,-17],[-8,-25],[-7,-36],[-9,-27],[-4,-10],[-4,-11],[-7,-13],[-8,-13],[-10,-11],[-3,-5],[-3,-7],[-1,3],[1,4],[-1,4],[0,5],[2,1],[3,-3],[2,4],[4,1],[6,13],[5,4],[3,8],[0,13],[2,2],[3,-1],[1,3],[-1,2],[1,6],[5,5],[2,7],[-1,16],[1,1],[2,-3],[1,1],[1,7],[0,4],[-3,1],[-8,-8],[-2,0],[-1,6],[-4,3],[-1,5],[0,4],[-2,1],[0,-6],[1,-6],[3,-7],[-1,-2],[-3,-11],[0,-6],[-1,1],[-1,-9],[-2,-4],[-1,-4],[1,-4],[-7,-11],[-8,-8],[0,-6],[-1,-7],[-3,-5],[-2,-11],[0,-5],[2,-12],[-2,-3],[-4,-12],[-4,-25],[-4,-15],[-3,-8],[-17,-27]],[[3517,3240],[-1,0],[-4,5],[0,28],[2,6],[2,3],[2,5],[3,6],[2,5],[0,3],[-2,3],[-4,3],[-4,4],[-3,6],[-1,6],[-2,6],[-1,8],[-3,3],[-3,4],[-7,4],[-4,7],[-5,12],[-1,3],[-9,5],[-4,7],[-1,-2],[-5,5],[-1,5],[-4,10],[-3,5],[-2,1],[-1,-4],[-4,-6],[-4,-3],[-2,0],[0,5],[1,9],[-2,4],[-3,8],[-7,11],[-8,15],[-4,4],[-2,1],[-3,-1],[-3,-2],[-1,-7],[-1,-1],[-5,0],[-5,1],[-1,5]],[[3482,3710],[0,8],[4,13],[1,5],[0,4],[1,11],[2,20],[1,12],[-1,6],[0,5],[2,4],[-5,9],[-3,2],[-2,3],[-2,-1],[-1,-2],[-3,-2],[-3,-3],[-1,-2],[-6,-2],[-5,1],[-2,8],[0,10],[-2,3],[-1,3],[0,3],[1,4],[0,6],[-1,2],[0,10],[-2,7],[0,4],[-1,4],[0,4],[1,4],[0,4],[-2,5],[-2,11],[-2,5],[-2,0],[-2,2],[-6,0],[-4,6],[-1,5],[-2,1],[-2,-2],[-3,-7],[-2,0],[-2,-2],[-4,0],[-3,1],[-3,2],[-3,1],[-2,-1],[-2,1],[-5,1],[-2,3],[-3,1],[-2,-2],[-2,0],[-2,2],[-1,3],[2,8],[-1,4],[1,3],[0,17],[2,8],[-1,5],[2,8],[0,8],[-2,6],[0,8],[-1,4],[-1,1],[-1,4],[0,8],[-2,4],[0,3],[-2,6],[0,4]],[[3066,4552],[-2,0],[-5,2],[-3,0],[-7,-7],[-2,-1],[-3,0],[-2,2],[-2,5],[-2,-2],[-1,-2],[0,25],[0,43],[2,7],[-1,5],[0,5],[-1,3],[-1,-2],[-6,-9],[-2,-5],[-2,-3],[-2,-2],[-4,-7],[-2,-1],[-8,-1],[-16,0],[0,9],[-2,4],[0,5],[-2,8],[-1,3],[-3,1],[-4,2],[-5,2],[-11,0],[3,9],[3,8],[0,7],[-3,7],[-1,4],[-2,5],[-3,4],[-1,5],[0,3],[-2,3],[-2,4],[-2,3],[0,5],[-2,3],[0,7],[-3,5],[-1,3],[0,3],[2,3],[-1,3],[-2,3],[-2,4],[-3,4],[0,3],[1,2],[0,7],[3,2],[3,1],[0,4],[-1,5],[-1,2],[0,4],[1,6],[0,4],[2,4],[10,15],[3,0],[3,6],[0,7],[-2,11],[-1,3],[1,4],[1,6],[3,8],[2,9],[0,2],[1,6],[1,11],[0,8],[2,4],[4,1],[2,4],[4,6],[3,7],[3,2],[5,6],[3,4],[4,4],[8,2],[3,2],[3,0],[2,3],[3,0],[5,2],[1,3],[2,4],[2,3],[2,1],[2,-1],[3,0],[4,1],[2,-5],[2,-3],[3,0],[2,-2],[2,0],[1,2],[0,3]],[[3056,4939],[0,2],[1,12],[2,19],[1,18],[2,20],[4,40],[1,17],[1,14],[1,9],[2,22],[0,5],[-1,3],[0,6],[-1,2],[-2,2],[0,5],[-1,2],[0,2],[-1,3],[1,2],[0,7],[-2,5],[-2,1],[-2,4],[-3,4],[-3,7],[-1,3],[0,42],[4,0],[5,2],[2,3],[1,-1],[3,4],[3,-1],[1,-2],[2,-1],[1,-2],[3,1],[0,13],[-1,2],[-2,7],[-1,2],[-2,1],[-1,-2],[-3,1],[-1,1],[-2,0],[-2,-1],[-1,1],[-2,0],[-1,-1],[0,38],[3,1],[2,0],[2,2],[3,0],[5,-3],[11,0],[20,0],[-2,8],[1,3],[0,3],[1,2],[2,-2],[1,-6],[1,-4],[2,-2],[3,1],[1,1],[3,8],[3,7],[2,2],[1,2],[3,0],[1,-2],[4,-13],[3,-9],[1,-5],[0,-12],[-1,-11],[1,-2],[6,3]],[[3142,5254],[7,-14],[5,-9],[2,-4],[5,0],[5,3],[5,7],[3,3],[1,0],[3,-3],[1,-5],[-1,-6],[0,-3],[2,0],[2,6],[4,8],[3,5],[2,5],[5,7],[3,2],[2,-1],[2,3],[4,8],[1,1],[5,0],[3,4],[2,6],[2,8],[0,8],[1,2],[2,2],[3,0],[4,4],[3,4],[3,1],[1,1],[1,4],[1,7],[-1,4],[-5,1],[-4,0],[-8,3],[-1,1],[0,2],[1,3],[0,5],[-1,8],[-3,11],[-2,12],[0,22],[-1,4],[-8,14],[-3,6],[-1,5],[-3,8],[0,3],[2,-1],[2,-2],[1,-4],[1,-1],[9,0],[2,-1],[2,-3],[1,-6],[2,-2],[10,0],[4,-2],[4,2],[2,-1],[4,-9],[3,-4],[2,-6],[3,0],[3,5],[0,15],[1,5],[1,1],[2,0],[4,6],[2,1],[7,-4],[2,2],[7,4],[7,5],[2,7],[4,2],[2,4],[5,0],[2,1],[2,3],[1,6],[2,3],[3,2],[2,3],[2,7],[0,3],[-2,10],[-2,2]],[[3312,5483],[2,1],[2,-2],[4,0],[1,1],[2,0],[3,3],[1,-1],[2,0],[1,-3],[0,-2],[3,-4],[0,-5],[-1,-5],[0,-10],[-1,-4],[-2,-4],[0,-2],[-1,-2],[1,-1],[5,0],[1,-2],[2,0],[3,-3],[1,-2],[0,-2],[-1,-4],[0,-5],[1,-2],[2,-8],[2,-5],[-1,-3],[-2,-8],[-2,-5],[-3,-4],[0,-14],[-1,-4],[-3,-16],[0,-18],[3,-19],[3,-5],[1,-9],[-1,-9],[0,-3],[1,-2],[1,0],[1,-2],[0,-5],[3,-3],[5,-10],[1,-1],[0,-2],[3,-5],[7,-5],[3,-5],[1,-1],[3,3],[1,2],[5,0],[0,2],[1,2],[-1,5],[1,2],[2,1],[0,2],[2,4],[3,-2],[2,-2],[3,0],[1,1],[0,2],[1,4],[3,1],[2,2],[5,0],[2,2],[1,2],[2,8],[3,3],[4,1],[2,2],[2,-4],[5,-3],[2,0],[2,2],[2,0],[2,-1],[2,2]],[[3347,5937],[-1,-1],[-3,2],[-1,3],[0,9],[2,0],[4,-9],[-1,-4]],[[8194,5466],[3,0]],[[8197,5466],[1,-2],[1,-7],[2,-7],[0,-10],[1,-5],[-2,-1],[-4,2],[-1,11],[-1,7],[0,12]],[[8194,5466],[-2,-3],[-3,-3],[-3,-5],[0,-3],[1,-6],[0,-6],[2,-4],[-1,-2],[-1,-4],[1,-1],[-1,-6],[-2,-4],[-1,-3],[-2,-1],[-1,2],[-4,11],[-3,1],[-1,2],[0,7],[-1,3],[-2,3],[-2,2],[-1,2]],[[8167,5448],[3,0],[4,1],[6,6],[3,5],[6,8],[4,5],[1,-1],[0,-6]],[[7468,6757],[2,8],[2,3],[2,5],[1,6],[4,7],[5,14],[5,5],[3,2],[2,4],[4,3],[7,-2],[4,-3],[0,-3],[-1,-5],[4,-1],[4,1],[8,-3],[3,-4],[2,1],[2,3],[3,3],[3,-4],[7,-5],[0,-10]],[[7544,6782],[-1,-5],[0,-6],[4,-7],[3,0],[3,1],[1,-1],[2,-5],[1,-4],[-2,-4],[-1,-4],[0,-4],[2,-6],[0,-6],[-2,-1],[-4,0],[-3,-1],[-2,-2],[-4,0],[-2,4],[-1,0],[-4,-5],[-4,1],[-7,-1],[-4,-1],[-5,2],[-3,3],[-3,2],[-4,-2],[-2,-6],[-5,-1],[-5,-2],[-1,1],[-3,0],[0,3],[-2,2],[-4,1],[-2,2],[-5,-2],[-3,3],[-3,4],[-2,1],[-1,8],[-2,2],[0,5],[4,5],[0,1]],[[5815,3905],[-7,-1],[-3,-4],[-2,-7],[-3,-5],[-4,-3],[-4,-2],[-5,-1],[-4,-6],[-6,-10],[-2,-7],[-1,-5],[-3,-2],[-1,-2],[0,-3],[-3,-1],[-2,-2],[0,-4],[-2,-3],[-3,-1],[-2,-2],[-2,-4],[-3,-2],[-2,-3],[-3,-10],[-4,-28],[-6,-9],[-3,-7],[-1,-4],[-9,-5],[-6,-4],[-1,-2],[-1,-9],[-2,-12],[-2,-9],[-1,-8],[-2,-10],[-4,-6],[-7,-2],[-6,0],[-3,-4],[-4,0],[-5,2],[-6,3],[-4,6],[-6,0],[-13,16],[-3,4],[-4,1],[-7,-3],[-2,-3],[-2,-5],[-1,-8],[-3,-15],[-2,-12],[-1,-4],[-4,-5],[-7,-10],[-3,-11],[-3,-3],[-5,-2],[-1,-2],[-1,-6],[-1,-2],[-6,0],[-1,1],[-11,-1],[-5,2],[-4,-2],[-1,1],[-2,5],[0,17],[4,11],[1,5],[0,15],[-3,10],[-3,14],[-3,16],[-2,4],[-2,7],[-9,12],[-1,2]],[[5554,3756],[0,31],[0,33],[0,33],[0,33],[0,30],[14,0],[13,0],[1,2],[0,34],[0,24],[0,23],[0,24],[0,23],[0,24],[0,23],[0,35],[7,1],[8,2],[13,4],[13,5],[8,3],[13,4],[2,-2],[5,-12],[3,-13],[3,2],[6,11],[3,5],[3,4],[3,3],[4,3],[3,-3],[1,-2],[8,11],[3,3],[8,2],[2,-1]],[[5701,4158],[-1,-2],[0,-8],[1,-4],[2,-3],[3,-8],[1,-7],[2,-5],[6,-12],[0,-4],[1,-4],[3,-9],[1,-2],[0,-6],[3,-16],[3,-10],[2,-2],[6,-10],[6,-8],[7,-6],[4,-4],[3,-2],[1,-3],[1,-5],[1,-9],[0,-5],[5,0],[4,-1],[2,-1],[0,-35],[4,-8],[2,-6],[3,-11],[1,-1],[4,-1],[9,-4],[6,-3],[7,-4],[2,-2],[-1,-7],[0,-3],[2,-5],[4,0],[2,-5],[2,-2]],[[5670,5682],[1,0],[1,-3],[-1,-8],[0,-6],[3,-4],[2,-2],[2,-1],[8,-3],[3,-3],[5,-10],[5,-9],[1,-5],[0,-4],[-2,-5],[3,-8],[3,-5],[5,-6],[9,-10],[4,-6],[4,-10],[3,-5],[2,-4],[-1,-10],[0,-3],[1,-3],[2,-4],[2,-12],[3,-3],[3,-1],[2,-3],[8,-10],[2,-3],[2,-6],[0,-10],[1,-9],[2,-6],[2,-4]],[[5760,5478],[-8,5],[-3,-1],[-4,-6],[-1,-1],[-2,0],[-3,1],[-13,5],[-10,5],[-3,2],[-5,1],[-4,-3],[-3,-11],[-1,-2],[-5,-4],[-2,1],[-6,-3],[-9,5],[-4,-1],[-2,-2],[-7,-5],[-8,-6],[-5,-4],[-3,-2],[-2,0],[-6,4],[-3,1],[-4,-2],[-3,-4],[-4,-12],[-3,-13],[-2,-5],[-14,7],[-7,2],[-4,-2],[-5,4],[-2,0],[-1,-1],[-3,2],[-5,4],[-4,2],[-5,0],[-2,1],[-5,13],[-4,8],[-6,7],[-4,5],[-2,3],[-3,2],[-5,1],[-5,-4],[-7,-10],[-7,-21],[-4,-8],[-3,-2],[0,-5],[2,-18],[-1,-16],[0,-11]],[[5516,5384],[-2,1],[-1,6],[-1,1],[-4,-2],[-2,-3],[-2,-2],[-1,0],[-1,3],[-6,0],[-2,2],[-8,4],[-1,2],[-2,0],[-4,-4],[-8,-4],[-6,-1],[-3,0],[-2,-2],[-1,-2],[-1,-6],[-1,-9],[0,-6],[-1,-6],[0,-10],[-1,-7],[-3,-9],[-4,-16]],[[5448,5314],[-1,5],[-1,7],[0,12],[-1,5],[1,4],[-2,8],[-3,5],[0,2],[-2,0],[-2,1],[-3,6],[-2,6],[-4,7],[-2,7],[-4,8],[-3,7],[-2,7],[0,4],[2,0],[0,3],[-1,5],[-1,7],[-1,4],[-3,7],[-4,5],[-1,2],[0,4],[-2,23],[0,7],[-2,4],[-1,1],[1,5],[0,5],[1,3],[0,21],[-1,1],[0,2],[-2,0],[-2,7],[0,3],[3,6],[4,3],[2,4],[1,3],[2,11],[3,11],[2,2],[1,7],[3,13],[0,4],[1,4],[4,5],[3,10]],[[5429,5617],[6,-2],[4,-1],[3,2],[2,3],[5,3],[5,4],[1,5],[1,3],[2,2],[1,-1],[1,-6],[2,-5],[3,-6],[1,1],[2,4],[5,3],[1,1],[4,6],[5,5],[2,1],[4,4],[8,0],[9,2],[6,1],[3,1],[0,1],[2,6],[0,1],[3,3],[4,9],[3,8],[1,4],[2,3],[-1,3],[-5,7],[0,3],[4,6],[3,2],[7,-1],[7,1],[8,3],[4,3],[7,0],[6,9],[3,2],[0,2],[3,3],[3,7],[3,6],[1,5],[7,15],[2,0],[1,1],[3,10],[1,2],[3,2],[2,7],[0,12],[2,4],[5,6],[2,5],[3,0],[3,4],[3,3],[4,3],[3,-1],[3,-2],[3,-1],[1,-1]],[[5634,5812],[2,-7],[9,-19],[1,-4],[5,-13],[5,-20],[0,-12],[-1,-16],[-1,-4],[-3,-9],[0,-7],[2,-3],[0,-7],[1,-3],[3,-2],[6,-1],[4,-1],[3,-2]],[[3338,7714],[-3,-2],[-4,0],[-2,3],[5,-1],[2,1],[2,-1]],[[3145,7757],[-4,-3],[1,8],[2,2],[1,-1],[0,-6]],[[3306,7803],[-2,1],[-2,3],[2,1],[3,0],[-1,-5]],[[2952,7809],[-4,-1],[3,6],[5,1],[-4,-6]],[[2956,7802],[-2,-1],[-4,1],[-5,-1],[3,4],[4,3],[5,8],[1,0],[-2,-9],[0,-5]],[[3026,7883],[-2,0],[0,2],[6,5],[-1,-4],[-3,-3]],[[3302,7830],[1,-1],[3,3],[2,0],[0,-2],[-3,-2],[-1,-2],[2,-1],[0,-2],[-3,-2],[-1,-3],[1,-2],[4,2],[3,0],[3,2],[6,10],[-6,-1],[-1,1],[5,6],[-1,4],[2,5],[6,6],[2,-3],[0,-4],[4,1],[4,-1],[3,-3],[-1,-5],[-2,-2],[3,-3],[0,-2],[-5,-3],[-3,-4],[-2,-4],[-5,-5],[-8,-4],[-3,0],[-3,1],[-3,0],[-8,-2],[-5,8],[-1,13],[0,7],[2,7],[5,7],[7,20],[2,5],[1,4],[7,10],[4,2],[2,0],[0,-5],[2,-9],[-1,-9],[-3,-11],[-1,-7],[1,-2],[-1,-3],[-6,-7],[-3,-1],[-7,-7]],[[3227,7860],[2,0],[1,5],[4,-1],[2,-2],[3,0],[2,-3],[5,-2],[4,0],[8,2],[14,2],[3,-1],[1,-3],[-8,-8],[-6,-4],[0,-13],[-7,-1],[-2,2],[-1,4],[0,3],[-2,4],[-4,3],[-2,-1],[1,-2],[-2,-2],[-2,0],[-10,4],[-2,3],[-2,5],[1,2],[-7,0],[-3,1],[0,10],[-3,2],[-4,1],[-1,3],[4,8],[1,4],[2,3],[5,6],[-1,-5],[1,-4],[-3,-8],[5,-7],[1,-2],[0,-4],[-1,-2],[3,-2]],[[3279,7907],[4,-2],[-1,-2],[-4,0],[-1,1],[2,11],[3,2],[5,8],[5,3],[2,-1],[-2,-4],[-3,0],[-3,-4],[-2,-4],[-4,-5],[-1,-3]],[[3493,7916],[-2,-2],[-1,2],[2,3],[2,6],[1,-2],[-2,-7]],[[3207,7941],[0,-4],[-4,-4],[-1,1],[1,2],[0,4],[4,1]],[[1571,7991],[-2,-1],[-1,1],[-1,10],[3,-3],[-1,-1],[2,-3],[0,-3]],[[3135,7785],[-4,1],[-2,-2],[-1,1],[-3,6],[1,4],[-2,8],[3,5],[-2,3],[-3,0],[-2,1],[-2,3],[-2,1],[0,5],[1,1],[-1,3],[1,4],[-1,1],[0,22],[0,43],[-4,5],[-4,6],[-4,4],[-2,1],[-5,-4],[-5,-2],[-5,-3],[-5,2],[-1,2],[0,9],[-5,2],[-2,-3],[-1,-3],[-4,-7],[-6,-14],[-5,-9],[-3,-7],[-2,-16],[-3,-5],[-2,-6],[-2,-11],[0,-4],[1,-5],[-2,-2],[-2,-4],[0,-3],[-1,-2],[-4,-4],[-3,-5],[0,-3],[1,-4],[-3,-1],[-2,-3],[1,-3],[-2,-3],[-3,5],[-4,-5],[-2,0],[-3,2],[-3,-5],[-2,-11],[-12,0],[-23,0],[-23,0],[-12,-1],[-19,0]],[[2924,7775],[4,3],[8,8],[6,3],[8,9],[6,2],[1,2],[1,7],[3,10],[3,6],[3,8],[5,6],[7,4],[6,10],[4,3],[4,2],[1,4],[2,3],[6,4],[6,1],[7,4],[5,2],[3,4],[4,2],[13,10],[4,5],[5,10],[4,5],[1,6],[6,8],[6,12],[3,8],[5,5],[9,13],[5,5],[2,1],[5,4],[3,5],[6,5],[9,6],[9,7],[13,7],[14,9],[12,5],[8,1],[10,2],[4,0],[15,-4],[8,-5],[8,-11],[2,-7],[-5,2],[-1,-2],[5,-6],[-1,-8],[-2,-8],[-8,-3],[-2,-3],[-3,-7],[-4,-2],[-2,-3],[-7,-5],[-6,1],[-7,4],[-5,5],[-4,-5],[-5,1],[-2,-1],[-4,1],[1,-3],[2,0],[4,-5],[10,-4],[3,-3],[2,-9],[2,-2],[3,1],[4,5],[3,2],[7,2],[-2,-3],[5,0],[5,-4],[-2,-3],[-2,-6],[-2,-11],[-5,-8],[-6,-8],[1,-2],[2,-1],[4,3],[6,-2],[-2,-10],[3,-11],[2,-2],[1,-9],[2,-5],[-1,-4],[3,-2],[0,-4],[10,-1],[1,-2],[7,-2],[2,-3],[-6,-5],[5,-4],[5,-5],[5,1],[4,-4],[2,-3],[5,1],[6,0],[5,-2],[0,-3],[-1,-2],[5,0],[3,-2],[1,3],[6,3],[7,8],[1,-1],[0,-3],[1,-5],[3,-3],[3,-1],[5,3],[2,-2],[4,-10],[0,-2],[-3,-2],[-2,-3],[10,-1],[2,-3],[-2,-3],[-2,1],[-3,-1],[-3,-3],[-3,-2],[-2,0],[-13,-9],[-6,-3],[-7,-6],[-7,-3],[-8,-4],[-1,-1],[-2,1],[-4,-4],[-5,-1],[-2,1],[0,-6],[-2,-4],[-4,1],[-4,3],[0,3],[-3,3],[-1,-6],[-1,-3],[-2,5],[-4,-2],[-1,-6],[1,-1],[1,-5],[-2,-3],[-1,1],[-3,-7],[-3,-2],[-3,-7],[-4,-5],[-1,-4],[-6,-8],[-4,0],[-3,-3],[0,-7],[-1,1],[-2,-3],[-3,2],[-3,-1],[-2,1],[-4,14],[-3,1],[-1,-4],[-3,4],[-1,15],[-1,4],[3,13],[7,11],[-3,1],[-5,-8],[0,2],[3,5],[3,3],[4,2],[3,0],[4,5],[-5,0],[22,22],[5,4],[8,4],[1,3],[2,0],[-1,-4],[0,-3],[1,-3],[3,-1],[4,6],[9,5],[8,1],[3,2],[-7,2],[-8,-1],[-5,2],[-7,-1],[-7,1],[-3,-2],[-1,-3],[-3,1],[-2,2],[2,6],[8,8],[4,8],[2,1],[1,3],[-3,0],[-2,-1],[-1,3],[-3,3],[1,-6],[-5,-10],[-4,-1],[-4,-4],[-14,-12],[-9,-7],[-2,0],[-4,2],[-1,-2],[-3,-2],[-5,-5],[-2,2],[-6,-3],[-4,-1],[-2,5],[-4,0],[-1,1]],[[1497,8026],[1,-5],[-4,1],[-1,1],[1,4],[3,-1]],[[3484,8040],[-7,-6],[-1,1],[-1,5],[2,0],[2,-2],[3,3],[2,-1]],[[3497,8048],[3,-4],[-7,-4],[-2,0],[0,7],[3,-2],[1,4],[2,-1]],[[1551,8036],[0,-1],[-6,4],[-3,3],[-1,3],[-4,3],[1,2],[2,0],[3,-2],[3,-4],[5,-8]],[[1482,8041],[-2,-1],[-7,7],[1,3],[0,4],[2,2],[3,-2],[1,-2],[2,-7],[0,-4]],[[3282,8011],[-11,-1],[-9,4],[-7,1],[-7,4],[-15,10],[-1,3],[-4,8],[-3,4],[-16,9],[-1,4],[3,2],[4,1],[3,0],[10,-4],[13,-3],[6,-3],[12,-8],[14,-13],[3,-1],[6,-6],[3,-8],[-1,-2],[-2,-1]],[[1528,8065],[-1,-1],[-1,7],[1,2],[2,0],[1,-6],[-2,-2]],[[1522,8069],[-2,2],[-3,10],[2,6],[3,-1],[3,-7],[0,-3],[-3,-7]],[[1466,8100],[14,-7],[14,-4],[10,-4],[6,-1],[4,-3],[4,-12],[3,-5],[4,-10],[4,-6],[1,-3],[-1,-2],[3,-7],[5,-6],[13,-7],[5,-4],[5,-9],[2,-7],[3,-8],[4,-13],[1,1],[0,5],[2,-1],[3,-13],[-2,-3],[-3,2],[-2,-5],[-2,-1],[-9,3],[-13,8],[-8,4],[-9,7],[-3,3],[-1,3],[6,8],[2,4],[2,7],[-1,0],[-2,-7],[-1,-1],[-7,-1],[-5,1],[-3,-4],[-2,1],[-3,4],[-5,4],[4,3],[1,3],[-2,0],[-3,5],[-2,-2],[-2,2],[1,5],[-3,0],[-1,3],[-4,1],[-1,-3],[-1,0],[-4,4],[-2,-3],[-1,1],[0,10],[3,1],[3,3],[-6,4],[-5,10],[-5,2],[-2,-4],[-4,0],[-2,4],[0,3],[1,3],[-1,4],[-2,1],[0,-4],[-2,-1],[-3,7],[-6,0],[-3,-3],[-3,2],[2,3],[-1,6],[-3,1],[1,7],[2,1],[6,1],[2,-1],[1,4],[2,3],[-2,1],[-6,0],[0,-4],[-3,-2],[-6,0],[-2,1],[-4,5],[-2,5],[0,3],[1,3],[2,2],[4,2],[5,0],[6,-3],[14,-10]],[[3459,8152],[-2,-6],[-3,-4],[-3,-1],[-6,0],[-2,-1],[-1,-4],[2,-4],[4,1],[2,-5],[0,-2],[-3,-11],[-2,-4],[-4,-3],[-1,-3],[0,-4],[-7,-14],[-2,-2],[0,-2],[-2,-8],[-5,-8],[-1,-3],[0,-8],[-3,-5],[1,-4],[0,-6],[2,2],[4,8],[3,5],[2,1],[5,11],[2,1],[1,-2],[0,-3],[-1,-4],[7,4],[1,0],[3,-3],[3,0],[4,2],[0,-3],[-2,-3],[-4,-4],[-9,-7],[0,-2],[4,1],[1,-1],[0,-5],[-5,-7],[7,3],[4,-4],[5,1],[3,2],[1,-3],[0,-4],[2,2],[0,7],[2,-3],[0,-4],[-2,-8],[-2,-6],[0,-5],[3,4],[-1,2],[2,4],[4,3],[2,-2],[4,5],[3,2],[4,6],[3,2],[0,-11],[1,0],[2,5],[3,0],[8,1],[3,-1],[3,-2],[4,-4],[1,-3],[0,-7],[-7,-9],[0,-2],[-2,-4],[-1,-5],[1,-2],[-2,-1],[0,-2],[2,-2],[3,1],[2,-2],[-2,-5],[0,-3],[-3,-2],[-6,-5],[0,-1],[7,4],[2,0],[1,3],[3,0],[3,-1],[5,5],[2,-1],[2,1],[4,5],[1,0],[0,-8],[-3,-7],[-2,-2],[-3,0],[-2,-4],[-4,-4],[-2,-1],[2,-6],[-1,-1],[-4,-1],[2,-2],[0,-4],[-1,-3],[-5,-7],[1,-4],[2,-4],[4,1],[3,4],[6,15],[6,4],[4,4],[2,-1],[-3,-5],[-4,-13],[-2,-9],[0,-8],[2,-3],[4,5],[2,4],[3,9],[2,-2],[0,-3],[2,-8],[-1,-7],[-7,-19],[1,-3],[0,-4],[-2,-9],[-2,-6],[-2,-3],[-2,-1],[-3,4],[-3,0],[-4,-5],[-1,0],[-1,3],[0,12],[1,4],[-1,3],[1,5],[-1,3],[-5,-8],[-2,-4],[-4,-6],[-2,-1],[-2,1],[-1,5],[3,9],[3,11],[3,7],[0,4],[-1,3],[-1,8],[-3,9],[-4,3],[-1,-1],[0,-4],[-5,-13],[-2,-8],[-2,1],[-1,2],[-2,-3],[-3,-1],[-3,0],[-6,-13],[0,-4],[-2,-3],[-4,-8],[-3,0],[-2,1],[-1,-1],[-9,-2],[-3,3],[0,3],[3,6],[6,2],[4,3],[3,5],[5,11],[6,4],[3,3],[2,4],[0,2],[-4,-3],[-4,2],[-8,0],[-2,-10],[-4,-1],[-5,2],[-3,2],[-6,-2],[0,2],[6,4],[1,11],[-2,0],[-3,-2],[-3,2],[-1,-1],[-2,-6],[-6,-3],[-7,-1],[-2,-2],[-19,4],[-6,-1],[-6,2],[-1,1],[-11,0],[0,4],[-5,-5],[-3,-2],[-14,-3],[-3,2],[-3,8],[-1,9],[3,6],[8,9],[7,10],[3,5],[3,1],[5,5],[-5,0],[-3,1],[-3,0],[-6,-1],[-6,0],[0,2],[3,4],[4,4],[0,-3],[2,-2],[3,-1],[1,2],[1,7],[3,9],[1,6],[4,5],[1,-1],[4,-1],[2,1],[3,8],[-3,1],[-3,4],[0,5],[1,3],[2,3],[3,3],[4,-4],[2,2],[-3,5],[-1,6],[6,19],[3,10],[4,15],[3,7],[5,2],[-3,2],[0,4],[4,4],[4,8],[-1,4],[6,7],[2,9],[3,5],[12,7],[5,5],[3,-1],[1,-3],[5,-2],[1,2],[-1,3],[1,1],[5,1],[1,-3]],[[1446,8148],[-2,-1],[-3,3],[-1,9],[3,3],[3,-6],[0,-8]],[[3461,8172],[-1,3],[4,3],[-1,-4],[-2,-2]],[[2794,8176],[-1,-1],[-5,2],[-1,2],[8,5],[2,-1],[-1,-5],[-2,-2]],[[1360,8176],[-2,1],[-1,7],[1,3],[2,-3],[0,-8]],[[1434,8202],[-3,-1],[1,3],[0,15],[2,4],[3,1],[-1,-14],[-2,-8]],[[1418,8208],[-1,-3],[-4,6],[-4,9],[0,5],[2,-1],[5,-7],[2,-4],[0,-5]],[[1407,8236],[-2,1],[-3,6],[0,4],[2,-1],[3,-10]],[[2757,8221],[-8,1],[-10,5],[-13,7],[-5,3],[-1,2],[4,7],[2,1],[14,2],[5,-1],[11,-16],[1,-6],[0,-5]],[[1340,8247],[2,-5],[1,-5],[0,-5],[-5,-3],[-3,2],[-2,-2],[5,-3],[2,-4],[4,-1],[4,-2],[-4,-7],[5,-9],[1,-1],[3,1],[0,-2],[-2,-4],[2,-2],[4,0],[0,-4],[-3,-4],[-5,5],[-3,5],[-1,4],[-7,9],[-8,12],[-2,2],[-3,7],[1,2],[3,1],[0,2],[-9,4],[-2,4],[5,0],[9,2],[1,2],[4,1],[3,-2]],[[1428,8233],[2,-19],[0,-6],[-2,-4],[-3,-9],[-2,4],[0,23],[-1,0],[-1,-4],[-2,-1],[-4,5],[-2,8],[-2,4],[0,3],[3,7],[0,6],[1,2],[2,0],[6,-6],[3,-4],[2,-9]],[[1411,8243],[-3,-1],[-1,2],[0,4],[2,4],[2,1],[0,-10]],[[2779,8254],[0,-2],[-2,0],[-2,3],[1,2],[3,-3]],[[1392,8246],[-2,0],[-6,10],[-4,3],[-3,5],[-3,3],[2,5],[1,0],[6,-4],[7,-7],[5,-11],[-3,-4]],[[1382,8291],[-3,-5],[-2,-1],[-2,1],[-3,4],[-2,-1],[1,-3],[-2,0],[0,5],[1,2],[6,6],[4,-3],[2,-5]],[[1314,8301],[3,-3],[6,2],[4,-5],[1,-4],[0,-6],[-1,-2],[-10,-7],[0,-2],[11,1],[0,7],[2,4],[-1,10],[5,0],[4,2],[3,4],[1,0],[-1,-9],[-5,-16],[-1,-7],[0,-12],[-1,-4],[-2,-3],[-9,-4],[-5,0],[-4,4],[-2,3],[1,3],[5,0],[2,-2],[1,1],[-7,6],[-5,3],[-2,7],[-4,9],[-1,8],[0,5],[1,8],[1,1],[10,-2]],[[1362,8321],[0,4],[1,5],[4,-1],[-1,-4],[-4,-4]],[[1372,8338],[8,10],[2,5]],[[1382,8353],[1,-5],[-4,-7],[-6,-4],[-1,1]],[[3305,8411],[0,-1],[-6,2],[1,4],[2,1],[4,-3],[-1,-3]],[[2810,8417],[-3,-1],[0,2],[2,4],[1,4],[0,5],[2,3],[2,0],[0,-10],[-1,-3],[-3,-4]],[[2778,8421],[-3,0],[0,4],[6,5],[3,0],[2,2],[1,-1],[-1,-3],[-8,-7]],[[2807,8424],[-5,-11],[-2,-11],[-2,0],[-1,2],[4,13],[-1,4],[-7,-16],[-3,-4],[-2,1],[3,12],[-2,2],[-6,-11],[-3,-4],[-3,2],[0,2],[11,18],[2,5],[2,-1],[-1,-4],[-2,-3],[1,-1],[2,2],[2,4],[2,10],[1,8],[2,-3],[2,-1],[1,-3],[4,-3],[0,-4],[1,-1],[0,-4]],[[2781,8453],[-2,1],[1,5],[2,-3],[-1,-3]],[[3284,8498],[2,-1],[1,-7],[-4,1],[-5,4],[1,3],[2,2],[3,-2]],[[2785,8496],[-3,0],[1,5],[2,0],[0,-5]],[[3078,8584],[-2,-4],[-2,0],[0,6],[-1,3],[4,1],[1,-6]],[[2775,8626],[-3,0],[4,6],[4,-1],[-2,-3],[-3,-2]],[[3210,8660],[-1,-4],[-8,5],[-3,4],[0,3],[5,1],[5,-5],[2,-4]],[[3104,8653],[-4,1],[1,6],[3,5],[2,7],[2,1],[3,-1],[4,-5],[0,-5],[-5,-5],[-6,-4]],[[2818,8681],[-4,-1],[2,4],[5,2],[5,0],[-1,-2],[-7,-3]],[[3198,8718],[-1,-1],[-2,3],[-12,9],[-1,5],[2,1],[6,1],[5,0],[4,-1],[4,-4],[-1,-3],[0,-4],[-4,-6]],[[2415,8745],[-4,3],[-1,2],[4,1],[2,-3],[-1,-3]],[[3193,8747],[2,0],[0,-2],[3,-3],[-2,-3],[-7,4],[-2,4],[0,2],[2,2],[3,-1],[1,-3]],[[2790,8778],[2,-1],[3,-6],[2,-2],[-1,-13],[-2,-3],[-6,-15],[-3,-6],[-3,-1],[-8,9],[-3,2],[-2,4],[0,12],[1,5],[6,11],[5,4],[4,-1],[5,1]],[[3199,8787],[8,-1],[3,-4],[-2,-4],[-5,-2],[-7,3],[-1,2],[3,2],[1,4]],[[2944,8790],[-7,0],[-11,5],[2,2],[5,-3],[8,0],[2,-1],[1,-3]],[[3045,8786],[-5,0],[-4,1],[-3,2],[-2,3],[0,3],[-4,5],[-4,1],[-2,4],[11,-2],[10,-6],[5,-7],[0,-3],[-2,-1]],[[2721,8809],[2,-1],[-1,-9],[-1,-3],[-3,-4],[-12,-14],[-13,-12],[-3,0],[-3,2],[-4,0],[-9,-4],[-1,8],[-5,7],[0,2],[5,6],[10,20],[3,0],[5,-2],[4,0],[7,4],[7,-1],[6,3],[3,0],[3,-2]],[[2836,8839],[2,-2],[3,0],[5,-10],[0,-2],[-4,-4],[-4,-2],[-6,1],[-7,6],[-7,10],[0,2],[8,2],[8,0],[2,-1]],[[2869,8835],[-3,-1],[-4,1],[-12,11],[7,5],[10,-6],[3,-4],[-1,-6]],[[2842,8869],[-2,-3],[-5,1],[-1,3],[7,2],[1,-3]],[[2640,8942],[3,0],[1,3],[5,8],[3,1],[7,-6],[2,-3],[1,-4],[7,-3],[11,-3],[8,-10],[6,-3],[11,-9],[9,-2],[6,-4],[7,-13],[4,-15],[-2,-3],[-5,-5],[5,0],[11,3],[9,-3],[2,4],[3,0],[4,-4],[3,-5],[0,-2],[9,-6],[-1,-2],[-12,-10],[-6,-6],[-3,-1],[-4,1],[-5,3],[-22,9],[-6,1],[-1,1],[-2,11],[-2,2],[-13,4],[0,6],[-1,2],[-7,-1],[-8,-5],[0,-3],[-2,-8],[-2,-3],[-11,-12],[-5,-1],[-5,-12],[-8,-8],[-5,-3],[-7,-3],[-5,-1],[-3,1],[-2,8],[-4,22],[-2,3],[-14,-3],[-8,0],[-7,-5],[-6,0],[-3,1],[-1,5],[7,13],[18,11],[1,2],[0,6],[-2,8],[-1,8],[1,9],[3,13],[1,7],[2,23],[1,7],[3,10],[5,7],[3,3],[4,2],[3,-4],[5,-3],[4,-6],[0,-6],[-4,-4],[6,-5],[3,-10]],[[2647,8960],[-3,0],[-2,5],[-7,6],[-1,3],[-1,8],[1,4],[6,-1],[7,-12],[2,-8],[0,-3],[-2,-2]],[[2674,8973],[3,-2],[9,-2],[1,-2],[-4,-4],[-6,4],[-1,-2],[-5,1],[3,5],[-3,2],[-5,-3],[-3,2],[-1,8],[-2,3],[-4,2],[-3,4],[2,3],[8,-3],[9,-6],[2,-3],[0,-3],[-2,-2],[2,-2]],[[2690,9001],[6,-1],[-4,-4],[-2,5]],[[1997,9043],[3,-1],[5,0],[-1,-4],[-3,-4],[-3,5],[-1,4]],[[3258,9046],[-3,-2],[-2,2],[7,7],[6,0],[-8,-7]],[[2002,9066],[-1,-5],[-6,6],[0,6],[1,6],[2,2],[2,-3],[0,-6],[2,-3],[0,-3]],[[1967,9099],[5,0],[3,-5],[-1,-1],[-7,4],[0,2]],[[2954,9088],[-13,-1],[-8,1],[-5,2],[-5,9],[1,5],[9,1],[14,-4],[8,0],[3,-1],[2,-7],[0,-5],[-6,0]],[[2594,9085],[-8,4],[-1,3],[2,9],[-3,3],[0,3],[3,6],[4,5],[4,-1],[4,-6],[-1,-3],[2,-9],[0,-3],[-2,-7],[-4,-4]],[[2897,9119],[15,-6],[2,-3],[0,-7],[-2,-4],[1,-13],[0,-7],[-1,-6],[-5,-8],[-13,-6],[-7,-2],[-8,0],[-10,-1],[-5,0],[-4,2],[-2,3],[-4,11],[-2,10],[2,9],[3,6],[5,8],[7,10],[9,3],[8,0],[3,1],[8,0]],[[2805,9111],[-2,-1],[-3,4],[1,5],[5,1],[4,-5],[-5,-4]],[[2095,9123],[-4,1],[-7,4],[-3,3],[2,2],[8,0],[3,-1],[3,-3],[1,-4],[-3,-2]],[[2919,9120],[-2,0],[-3,3],[-7,4],[-2,3],[0,4],[3,6],[6,-1],[2,-2],[5,-9],[0,-5],[-2,-3]],[[2170,9134],[-13,5],[1,2],[4,2],[4,5],[7,-3],[1,-3],[-1,-4],[-3,-4]],[[2215,9146],[-4,-4],[-7,3],[1,13],[2,2],[3,-1],[3,-4],[4,-3],[-2,-6]],[[2222,9158],[-1,-3],[-5,2],[-1,5],[2,3],[4,-2],[1,-5]],[[2486,9170],[-3,0],[-3,4],[-2,0],[0,3],[5,2],[3,-7],[0,-2]],[[2799,9149],[-4,0],[-1,5],[4,6],[3,3],[7,2],[2,6],[4,2],[0,5],[6,2],[3,0],[3,-5],[-1,-2],[-5,-4],[-4,-7],[-7,-9],[-10,-4]],[[2494,9182],[0,-4],[-2,-5],[-2,-1],[-4,5],[0,2],[3,3],[5,0]],[[2860,9166],[-3,-1],[-3,1],[-3,3],[-1,4],[1,9],[6,1],[3,-2],[7,0],[2,-2],[0,-3],[-5,-5],[-1,-3],[-3,-2]],[[2189,9180],[-3,0],[0,3],[2,2],[-3,2],[0,4],[6,-2],[3,-5],[-2,0],[-3,-4]],[[2346,9191],[4,-4],[-2,-8],[-4,-2],[-4,1],[2,3],[-1,8],[-3,1],[0,-7],[-2,-5],[-3,2],[0,7],[1,3],[4,4],[3,0],[5,-3]],[[1137,9191],[-2,-2],[-5,3],[4,3],[2,0],[6,-3],[-5,-1]],[[3113,9189],[-1,-1],[-7,3],[-1,2],[7,4],[2,0],[4,-3],[-4,-5]],[[2832,9199],[1,-5],[-9,-5],[-7,-3],[-6,2],[5,6],[8,2],[3,4],[5,-1]],[[2793,9203],[2,-4],[-1,-2],[-5,-3],[-9,-1],[-2,-3],[0,-3],[-5,1],[-3,4],[-2,-1],[-3,4],[-10,2],[0,2],[4,2],[5,-1],[1,4],[4,-1],[2,1],[7,-4],[10,4],[5,-1]],[[2293,9195],[2,-1],[2,3],[5,-4],[3,-4],[8,-4],[11,-8],[7,-12],[3,-6],[3,-4],[7,-7],[4,3],[4,-1],[0,-4],[-5,-3],[-4,0],[-5,-3],[-2,-4],[-4,-1],[-7,-6],[-4,-2],[-5,0],[-11,4],[-7,-1],[-6,1],[-12,8],[-11,5],[-1,5],[-6,-3],[-4,0],[-4,2],[-1,5],[-3,1],[-3,-2],[0,-2],[-7,0],[-3,3],[-3,7],[3,5],[15,2],[5,3],[6,5],[2,3],[-3,4],[0,9],[4,-1],[5,-5],[2,2],[-4,7],[0,3],[2,6],[4,3],[8,1],[3,-1],[8,-7],[-2,-2],[1,-2]],[[2585,9222],[3,-1],[3,1],[4,-2],[0,-5],[-8,-1],[-4,2],[-2,-1],[-4,1],[-3,5],[6,3],[5,-2]],[[2213,9244],[-6,1],[-3,2],[-1,3],[1,4],[3,0],[7,-5],[-1,-5]],[[1388,8402],[0,8],[-2,5],[-4,-1],[-5,2],[-2,6],[-5,2],[-2,4],[-6,3],[-4,1],[-3,3],[-8,6],[-2,2],[-7,0],[-2,9],[0,2],[-2,2],[-4,2],[2,10],[-9,3],[3,7],[-6,12],[-3,5],[-7,16],[-5,10],[-3,7],[-5,9],[-4,6],[1,5],[-8,10],[-4,7],[-11,8],[-5,9],[-1,5],[-5,4],[-5,5],[-4,2],[-4,9],[1,3],[0,5],[-6,7],[-6,5],[-17,-9],[-6,-2],[2,-4],[-1,-3],[-5,-1],[0,-10],[-3,-8],[-7,0],[-13,-9],[-4,-5],[-3,1],[1,4],[-1,7],[-2,7],[-7,8],[-4,4],[-5,6],[-13,13],[-2,8],[-9,5],[-4,5],[1,5],[2,6],[0,4],[-4,0],[-7,-1],[-6,0],[-8,-8],[-13,6],[-2,-4],[-13,4],[0,34],[0,34],[0,17],[0,33],[0,34],[0,34],[0,33],[0,17],[0,34],[0,17],[0,33],[0,17],[0,34],[0,33],[0,34],[0,34],[0,33],[0,34]],[[1083,9195],[16,-3],[12,1],[22,-6],[14,-11],[11,-6],[4,-4],[25,-10],[5,-1],[10,-4],[6,1],[10,-1],[7,-3],[14,-8],[4,0],[-5,8],[-6,3],[-7,2],[-2,3],[2,2],[6,1],[-7,5],[6,12],[2,-2],[3,3],[6,-2],[2,7],[2,3],[8,1],[11,-1],[-1,6],[3,6],[4,-1],[3,-5],[7,-3],[-1,-6],[-2,-2],[-5,-8],[7,3],[7,4],[6,2],[5,0],[6,4],[4,9],[2,1],[11,0],[1,1],[-4,2],[2,2],[4,1],[3,-3],[2,0],[7,3],[9,7],[8,3],[2,-2],[3,1],[6,8],[7,5],[7,0],[6,-3],[4,1],[3,-1],[6,6],[3,-1],[2,-6],[-3,-4],[-22,-12],[-7,-6],[-7,-3],[-25,-5],[-3,-1],[-5,-7],[-5,-6],[-5,-2],[-5,0],[-4,-4],[-4,-6],[-12,-12],[2,-2],[17,-2],[4,2],[1,2],[-5,1],[-2,6],[2,4],[5,4],[5,1],[6,4],[6,3],[4,5],[-1,2],[5,3],[8,-1],[1,-2],[4,3],[3,0],[2,-6],[3,-2],[6,9],[8,10],[7,4],[15,6],[13,3],[3,3],[2,-3],[-6,-2],[0,-5],[3,-3],[9,6],[10,10],[2,7],[5,3],[9,4],[3,2],[-10,3],[1,3],[-5,3],[0,4],[4,5],[5,-1],[3,-2],[10,-9],[7,-7],[6,-10],[6,-17],[12,-13],[6,-5],[9,-5],[9,-1],[6,4],[0,3],[-2,5],[-3,4],[4,6],[1,5],[3,0],[9,10],[-6,1],[0,2],[6,2],[1,2],[4,2],[4,-2],[-1,-12],[3,-10],[6,-3],[0,-2],[-9,-11],[1,-5],[9,-1],[2,1],[12,0],[4,3],[3,4],[4,3],[2,5],[2,9],[3,2],[5,-1],[2,1],[9,-1],[9,1],[9,-1],[21,-8],[19,-14],[12,-5],[27,-5],[4,-1],[7,-5],[11,-6],[22,-6],[5,-2],[3,1],[13,-2],[3,0],[10,-3],[-5,8],[9,-1],[1,2],[7,-1],[6,-2],[5,-3],[7,-2],[10,-6],[6,-5],[6,-6],[4,-8],[3,-1],[-4,-8],[-5,-1],[-14,2],[-2,-5],[-8,-3],[-1,-7],[-7,-5],[0,-2],[4,-1],[4,-3],[8,-1],[16,-4],[3,0],[8,-2],[18,0],[4,-1],[18,0],[3,2],[6,1],[15,1],[11,4],[1,-2],[4,0],[5,2],[12,7],[5,0],[3,3],[2,-1],[3,-6],[4,-3],[2,-4],[2,-1],[11,-1],[4,-1],[3,-4],[0,-6],[4,-6],[1,1],[2,8],[3,1],[4,-7],[14,-13],[2,-5],[-2,-4],[-3,-2],[-4,-1],[-6,1],[6,-7],[3,-5],[10,-10],[1,-3],[4,-1],[-4,7],[0,5],[-1,8],[4,3],[3,-4],[3,0],[7,-3],[-6,10],[2,2],[-8,10],[-2,7],[0,7],[-6,7],[-3,6],[0,5],[6,5],[1,3],[-1,4],[9,1],[9,3],[8,1],[3,5],[8,0],[0,5],[4,5],[7,1],[5,4],[3,7],[-5,3],[-3,-1],[-12,-6],[-2,-3],[-2,-6],[-9,1],[-6,-4],[-4,-1],[-6,2],[-3,0],[-4,-3],[2,-4],[-1,-2],[-8,-1],[-3,1],[-4,-1],[-3,1],[-10,7],[2,5],[10,13],[15,2],[9,3],[17,7],[3,0],[11,5],[4,1],[10,-3],[4,-2],[4,-7],[4,-17],[8,-7],[4,1],[1,-4],[4,0],[4,-2],[0,-5],[8,-5],[12,0],[7,2],[5,3],[13,-10],[5,-5],[4,-3],[10,-4],[7,1],[5,-1],[9,-3],[13,4],[2,0],[8,3],[3,0],[5,2],[7,0],[20,-3],[5,-3],[4,-1],[6,0],[4,1],[3,2],[8,2],[-2,3],[-4,3],[-3,5],[1,4],[4,-1],[4,-4],[9,-12],[4,-4],[9,-4],[4,-1],[9,6],[0,4],[-2,4],[-4,2],[-5,4],[-6,1],[-10,-5],[-9,10],[1,3],[-1,5],[-2,1],[-4,6],[0,2],[5,1],[7,-4],[4,2],[8,2],[-3,4],[-1,4],[3,1],[8,-4],[1,2],[4,-1],[6,-6],[4,-7],[10,-1],[6,3],[-9,-13],[1,-2],[6,3],[1,4],[11,5],[2,0],[-5,-24],[-1,-6],[-5,-10],[0,-2],[5,-6],[1,-7],[4,-1],[8,3],[1,-1],[-2,-6],[6,1],[4,-4],[0,-8],[-3,-2],[-7,-1],[-5,3],[-7,-1],[-4,4],[-2,-2],[17,-19],[0,-5],[1,0],[1,5],[-1,2],[-7,8],[-1,3],[2,2],[10,-2],[4,0],[4,3],[0,10],[2,7],[-3,14],[-2,6],[-5,5],[-1,2],[7,18],[5,0],[3,2],[7,-3],[3,2],[8,7],[6,6],[4,6],[5,4],[13,7],[0,2],[-5,0],[-1,3],[1,9],[-3,8],[-4,1],[-1,-6],[-4,-6],[-11,-2],[-4,3],[2,6],[2,3],[7,5],[4,5],[-5,1],[-1,6],[1,4],[18,5],[-6,-9],[2,-1],[9,8],[-3,1],[0,5],[-3,2],[-4,-1],[-6,-3],[-4,0],[-5,2],[-8,10],[-3,0],[-3,-4],[-13,5],[-8,5],[-13,4],[-3,6],[-9,11],[-2,5],[0,7],[6,8],[1,3],[5,3],[4,1],[2,6],[-8,-3],[-4,2],[-6,8],[0,4],[3,11],[-2,3],[3,3],[-1,4],[1,2],[10,8],[9,-5],[5,0],[4,9],[-1,1],[-9,0],[-3,4],[7,6],[3,6],[9,7],[16,5],[4,-4],[0,-4],[5,-5],[3,-1],[3,1],[7,0],[2,-1],[-1,-4],[1,-2],[10,-7],[10,-11],[2,-4],[2,-8],[0,-12],[-3,-4],[6,-3],[6,-6],[6,-3],[4,-8],[5,-8],[-1,-3],[4,-1],[3,3],[3,-3],[4,-8],[-12,-1],[-4,2],[-4,4],[-7,-8],[2,-1],[9,0],[4,-3],[-2,-3],[-6,-5],[-17,-13],[2,-1],[9,2],[7,-2],[1,-3],[8,-4],[5,1],[10,6],[5,0],[1,-2],[-4,-2],[0,-2],[10,-2],[11,0],[4,-3],[-6,-1],[-4,-3],[-2,-6],[-2,-1],[-9,1],[14,-10],[4,-9],[3,-4],[-2,-4],[1,-12],[-2,-8],[7,-8],[2,-4],[2,1],[5,7],[4,7],[-1,6],[3,6],[2,12],[5,8],[5,9],[5,2],[3,0],[7,-8],[5,-4],[12,-8],[5,-6],[2,-6],[1,-8],[3,-7],[0,-9],[-2,-3],[-6,0],[-4,6],[-3,-3],[1,-7],[0,-13],[3,-11],[6,-8],[14,-15],[0,-2],[3,-8],[2,-1],[14,14],[2,0],[5,4],[1,10],[4,10],[12,14],[6,22],[-1,7],[2,6],[4,3],[1,3],[6,-2],[12,2],[0,1],[-7,3],[3,6],[2,0],[2,7],[-7,5],[-4,0],[-4,4],[-1,5],[1,5],[-1,5],[1,3],[-3,6],[2,6],[-2,5],[3,1],[6,-3],[5,0],[10,3],[11,-1],[9,-5],[7,-3],[19,-1],[7,1],[10,-3],[0,-3],[-3,-4],[-8,-2],[4,-2],[9,-3],[3,-6],[-1,-3],[8,1],[6,-1],[9,-3],[2,-5],[-17,-13],[7,0],[9,-2],[3,-4],[-1,-7],[-6,-6],[-9,-4],[-2,-2],[-6,3],[-8,-2],[-2,1],[-2,-2],[5,-7],[-2,-1],[2,-2],[4,-8],[6,2],[-2,-7],[0,-4],[3,-7],[8,-8],[8,-7],[4,-8],[-1,-6],[-5,-17],[-4,-3],[-7,-1],[-4,-4],[-3,-6],[-4,-5],[-3,-1],[-7,-7],[-9,-2],[-10,-10],[-3,-1],[-5,1],[-1,6],[-3,3],[-7,11],[-6,0],[-4,5],[2,1],[-7,7],[-4,3],[-5,1],[-5,-4],[-2,-4],[3,-1],[4,4],[3,0],[12,-13],[3,-2],[3,-9],[4,-6],[5,-10],[-2,-2],[-4,1],[-8,4],[-3,-2],[-2,-5],[-12,5],[-6,4],[-5,6],[-4,6],[-5,2],[-5,-3],[-25,0],[-1,-1],[1,-8],[3,-3],[13,-5],[3,-2],[1,-4],[-2,-6],[-25,-28],[-7,-9],[-7,-2],[-14,0],[-5,3],[-7,7],[-5,4],[-3,1],[-2,4],[-9,4],[-14,10],[-5,1],[-5,0],[2,-4],[-7,1],[-6,3],[-5,-1],[-14,3],[-8,0],[-3,-1],[9,-4],[3,2],[11,-2],[12,-4],[3,0],[7,-4],[5,-5],[10,-12],[8,-6],[21,-4],[8,0],[15,-1],[10,-3],[1,-6],[-6,-10],[-2,-6],[-17,-24],[-3,-9],[-3,-4],[-8,-5],[-7,-5],[-5,-1],[-4,1],[-3,2],[-2,-4],[-7,4],[-3,-2],[-3,1],[-4,4],[-2,5],[-7,-3],[4,-3],[2,-7],[-2,-1],[-6,3],[3,-6],[1,-5],[-4,-6],[-3,-3],[-3,-1],[-6,2],[-3,-4],[-3,-1],[-9,3],[-11,6],[-12,2],[1,3],[-3,0],[-2,-2],[-7,0],[-17,9],[-13,5],[-5,1],[-2,-6],[3,-4],[4,-2],[5,1],[-4,3],[0,3],[6,-3],[18,-8],[10,-4],[-1,-2],[-7,-5],[0,-1],[5,0],[9,7],[3,1],[4,-2],[6,-6],[4,-3],[7,-2],[10,-7],[1,-16],[-2,-6],[-7,-1],[-9,-7],[-3,-1],[-12,1],[-6,2],[-3,-2],[-4,0],[-1,-3],[2,-4],[5,-2],[5,-1],[0,-4],[-4,-2],[-3,2],[-5,-2],[-3,1],[-2,-1],[-1,-5],[-5,-5],[7,-10],[-3,0],[-6,6],[-8,4],[-1,-1],[7,-6],[1,-2],[-5,-4],[1,-3],[-1,-2],[-3,-2],[-5,0],[2,-4],[-2,-2],[-6,1],[1,-4],[6,-5],[-1,-3],[-2,-2],[-8,-5],[-5,-7],[-1,-3],[1,-5],[-1,-2],[-4,0],[1,-6],[-3,-11],[-4,-9],[-4,-8],[-2,-7],[-2,-4],[-3,0],[-2,-2],[3,-3],[0,-8],[-2,-12],[-2,-8],[1,-28],[-1,-12],[-1,-7],[-1,-3],[3,-4],[0,-3],[2,-6],[3,0],[5,-7],[3,-2],[-1,-21],[2,2],[1,14],[3,6],[2,2],[7,1],[8,-2],[4,0],[2,1],[3,-2],[1,-2],[0,-7],[1,-5],[5,-15],[6,-26],[6,-18],[2,-8],[-5,-16],[-2,-3],[1,-2],[5,5],[4,0],[2,-2],[6,3],[25,10],[6,1],[9,-2],[7,-4],[7,-6],[8,-4],[13,-3],[3,-2],[7,-2],[4,-2],[10,-12],[5,-4],[6,-4],[5,-8],[9,-16],[2,-2],[6,-3],[10,-3],[15,-8],[15,-7],[4,-3],[4,-4],[4,-6],[5,-5],[0,-7],[4,4],[4,0],[6,-2],[6,0],[8,2],[5,0],[3,1],[7,-3],[3,0],[10,-2],[6,1],[3,-5],[5,1],[3,-1],[6,-5],[2,-4],[2,-8],[0,-3],[-4,-19],[-1,-7],[0,-6],[1,-4],[4,-8],[3,-13],[-1,-4],[-1,-8],[0,-5],[1,-9],[0,-6],[-2,-3],[-2,-8],[1,-6],[7,-9],[4,-9],[4,-5],[4,-8],[0,-3],[-2,-5],[0,-3],[3,0],[4,-5],[3,-3],[5,-3],[4,-4],[9,-13],[2,-5],[2,-8],[2,-5],[0,-3],[-7,-7],[-5,-8],[2,0],[9,11],[3,1],[7,-3],[8,-6],[2,1],[1,3],[2,10],[3,4],[1,5],[4,3],[2,0],[0,-4],[4,-2],[3,-3],[1,-5],[2,-7],[1,0],[1,7],[3,6],[0,2],[-7,12],[0,2],[3,4],[0,4],[5,7],[3,6],[3,7],[-1,2],[0,6],[-1,6],[-5,8],[-1,7],[2,6],[-4,7],[-3,13],[-1,12],[-1,8],[-2,6],[0,3],[2,6],[2,1],[-2,3],[-1,4],[2,3],[-5,6],[1,3],[-4,3],[-4,7],[-5,15],[-2,3],[0,3],[21,10],[2,2],[15,9],[5,5],[7,5],[20,24],[2,6],[9,14],[3,6],[3,14],[0,9],[1,12],[0,10],[-2,17],[-2,11],[-4,13],[0,3],[-10,21],[-9,10],[-2,3],[-13,9],[-9,10],[-5,4],[1,7],[0,4],[2,4],[5,8],[3,6],[4,6],[4,3],[2,4],[0,2],[-3,4],[4,5],[0,7],[4,0],[5,-7],[2,1],[-2,2],[-2,4],[0,2],[4,4],[-1,8],[2,5],[0,2],[-7,1],[-1,2],[4,2],[0,1],[-6,12],[-1,4],[5,6],[0,2],[-6,0],[-2,4],[2,3],[2,6],[-6,-1],[-3,2],[-5,0],[0,2],[9,14],[3,7],[0,13],[6,7],[-5,4],[-7,8],[-4,9],[-1,11],[-1,5],[1,5],[2,4],[4,4],[9,6],[6,2],[5,-1],[9,-1],[7,-4],[22,-8],[4,-4],[-4,-3],[1,-1],[8,6],[4,1],[12,-4],[8,-7],[1,1],[-3,3],[2,2],[12,6],[4,3],[10,6],[8,-6],[10,-10],[5,-4],[5,0],[2,-6],[-1,-4],[-3,-7],[1,0],[6,5],[8,-5],[4,-6],[2,-7],[2,4],[2,0],[6,-4],[1,-2],[-4,-3],[-3,-5],[2,-1],[4,0],[-3,-5],[6,-7],[5,-4],[5,0],[4,-1],[9,-4],[5,-1],[7,2],[3,-2],[1,-3],[0,-4],[1,-2],[5,-1],[6,3],[1,2],[0,4],[1,2],[4,-1],[0,-2],[2,-5],[0,-4],[-2,-4],[-4,-5],[-3,-7],[0,-5],[-1,-2],[1,-3],[0,-4],[3,-6],[0,-6],[-1,-2],[-4,-3],[-4,-1],[-15,0],[-4,1],[1,-3],[8,0],[14,-2],[4,-4],[2,-9],[0,-6],[-2,-3],[-1,-4],[0,-6],[1,-3],[7,0],[2,-3],[-3,-6],[1,-6],[-2,-4],[0,-5],[-1,-3],[-3,-3],[-1,1],[-2,6],[-4,-5],[-3,-2],[-5,-2],[0,-1],[4,-1],[4,-3],[3,0],[3,2],[8,7],[6,3],[6,-1],[7,1],[4,-2],[5,-7],[1,-9],[3,-4],[0,-7],[-2,-10],[-5,-9],[0,-3],[4,4],[4,18],[2,4],[3,1],[1,-1],[2,-8],[2,-1],[2,5],[1,-1],[1,-8],[3,-2],[5,5],[7,4],[4,4],[3,2],[5,1],[3,4],[1,5],[6,9],[2,0],[3,-4],[4,-7],[0,-10],[1,0],[2,6],[0,4],[-4,10],[1,2],[5,2],[-2,3],[2,4],[4,0],[0,3],[5,-1],[0,2],[4,0],[0,1],[-6,3],[-2,2],[-1,5],[3,-1],[1,2],[0,4],[1,2],[3,-1],[-2,6],[0,2],[4,0],[2,-1],[6,-5],[1,1],[-4,4],[-5,3],[-2,2],[-2,4],[0,4],[2,6],[4,2],[6,-4],[1,1],[-4,3],[0,5],[7,20],[3,4],[3,1],[6,-4],[2,-6],[-3,-4],[-1,-3],[4,1],[4,0],[2,-5],[1,-11],[3,2],[2,-4],[1,-6],[3,-4],[2,-4],[-2,-4],[-4,-2],[1,-2],[4,-1],[1,-2],[6,1],[4,-8],[-3,-5],[-7,-3],[-6,0],[1,-2],[4,0],[6,1],[5,2],[4,0],[-1,-4],[2,-6],[-2,-2],[3,-1],[4,2],[5,-12],[-7,-8],[-3,-1],[0,-3],[2,0],[2,-3],[7,4],[6,1],[0,-2],[-2,-9],[-4,-6],[-7,-5],[-5,-6],[1,-1],[7,5],[4,2],[7,2],[2,0],[5,-11],[3,-1],[3,1],[4,-3],[2,-3],[-3,-5],[2,-6],[-1,-3],[-6,-5],[-2,0],[-2,-3],[-2,0],[0,-2],[6,1],[7,-2],[2,-3],[-3,-8],[5,-3],[2,1],[2,-1],[8,-10],[0,-5],[-1,-4],[0,-10],[-4,-1],[-15,2],[-8,4],[-1,-2],[8,-4],[3,-4],[5,-1],[2,-4],[-4,0],[-3,-3],[2,-2],[11,-2],[3,-1],[-2,-2],[-6,-3],[0,-3],[4,-1],[4,1],[2,-1],[1,-9],[-4,-2],[3,-3],[5,-1],[2,-5],[3,0],[4,5],[3,-1],[0,-3],[4,-4],[3,0],[4,-2],[-2,-7],[3,-6],[3,-4],[-5,-7],[-2,-7],[0,-2],[3,-1],[4,3],[7,1],[2,2],[3,1],[2,-2],[0,-4],[2,-2],[3,2],[2,-2],[-1,-2],[1,-5],[5,9],[5,-1],[2,-2],[2,-6],[1,-6],[3,-6],[11,-4],[5,2],[1,3],[6,1],[1,-6],[6,-6],[6,-2],[3,-2],[0,-2],[-3,-3],[-2,-4],[-4,-3],[-5,0],[-7,-2],[0,-2],[-2,-2],[-6,-3],[-3,-7],[-3,-4],[-8,0],[-2,-4],[-5,-2],[-9,-6],[-4,0],[-3,1],[-7,-5],[-2,-4],[0,-3],[-2,-3],[-3,1],[-3,3],[0,-3],[6,-4],[2,-3],[-6,-5],[0,-2],[2,-1],[-3,-3],[0,-2],[5,3],[5,5],[4,6],[6,2],[8,6],[6,6],[6,7],[7,6],[9,5],[7,2],[4,0],[0,1],[-4,1],[-7,-1],[-1,3],[1,2],[4,2],[16,-2],[5,-2],[6,-14],[2,-4],[0,-3],[-3,-5],[-7,-5],[2,-2],[3,-7],[3,3],[5,9],[5,4],[4,1],[7,0],[0,-3],[3,-5],[7,-2],[4,-7],[1,-4],[2,-3],[-1,-2],[2,-4],[0,-6],[-2,-8],[1,-10],[-1,-5],[2,-4],[-1,-3],[-13,-3],[2,-2],[5,0],[6,-1],[3,-2],[1,-3],[-2,-4],[-7,2],[0,-1],[7,-5],[3,-6],[-1,-3],[-9,-12],[-7,-7],[-8,-7],[-12,-13],[-3,-1],[-5,2],[-5,0],[-11,-4],[-5,-5],[-6,-1],[-7,0],[-2,-2],[-2,-5],[-11,-17],[-3,-6],[-6,-6],[-7,-10],[-5,-5],[-2,-6],[-6,-3],[-10,-1],[-4,-1],[-6,2],[-4,-3],[-6,-1],[-3,1],[-12,-6],[-3,6],[-3,2],[-7,0],[-5,2],[-10,2],[-3,0],[-3,-1],[-6,0],[-2,-3],[-10,1],[-4,3],[-8,0],[-4,-2],[-10,2],[-10,-2],[-8,1],[-3,2],[-14,-4],[-5,2],[-5,-5],[-3,1],[-3,-1],[-2,1],[-2,-1],[-1,-3],[-2,0],[-4,-5],[-5,-4],[-8,-23],[-1,-8],[-3,-6],[-5,-1],[-14,-5],[-7,-3],[2,-3],[-2,-2],[-7,-3],[-2,-3],[-1,-4],[-8,-6],[-8,-15],[-4,-11],[-5,-8],[-3,-3],[-3,0],[-2,1],[-4,4],[-3,0],[-8,5],[-15,3],[2,-3],[5,-1],[5,0],[10,-6],[5,-2],[5,-6],[-2,-9],[-2,-7],[-2,-5],[-9,-14],[-4,-4],[-7,-17],[-7,-7],[-4,-5],[-4,-7],[-10,-6],[-4,-1],[-3,0],[-9,-7],[-2,-4],[-12,-12],[-4,-1],[-4,-3],[-1,-5],[-4,-3],[-3,-10],[-6,-9],[-6,-2],[-3,-3],[-3,-5],[-3,-4],[1,-4],[0,-5],[-3,-1],[-7,-7],[-10,-12]],[[2924,7775],[-4,0],[-4,-1],[-5,-5],[-6,-7],[-11,-16],[-2,-4],[-4,-3],[-4,-4],[-1,-3],[-2,-2],[-6,-9],[-6,-16],[-4,-9],[-12,0],[-17,0],[-23,0],[-4,-2],[-4,-4],[-5,-3],[3,-11],[0,-11],[1,-1],[0,-4],[2,-2],[1,-3],[-1,-3],[-2,-3],[-12,-9],[-8,-7],[-14,-9],[-12,-4],[-10,-3],[-6,-3],[-14,-12],[-12,-12],[-7,-6],[-7,0],[-5,4],[-4,5],[-3,8],[0,10],[1,6],[1,3],[5,5],[9,13],[2,7],[2,16],[0,3],[3,11],[3,12],[2,6],[-2,14],[-2,22],[-2,11],[-4,40],[-2,15],[-17,17],[-12,10],[4,11],[-1,1],[-3,6],[-2,0],[-7,-3],[-3,4],[-2,5],[0,8],[-1,4],[0,6],[-7,-1],[-3,-4],[-2,0],[-3,5],[-3,6],[-2,15],[-6,4],[-5,5],[-6,4],[-10,10],[-6,4],[-5,5],[-12,10],[-7,6],[-8,6],[-15,13],[-5,4],[-2,1],[-5,4],[-6,4],[-6,-2],[-13,-10],[-6,-4],[-7,-1],[-7,1],[-3,-1],[-3,1],[-2,6],[-7,-1],[-8,1],[-3,-1],[-2,2],[-1,4],[-6,-1],[-5,-5],[-4,-3],[-4,0],[-4,3],[-5,5],[-4,6],[-5,3],[-4,-1],[-1,-3],[-2,0],[-2,9],[-2,2],[-8,6],[-6,3],[-9,0],[-2,-4],[-7,-2],[-4,5],[-5,3],[-16,5],[-2,2],[-3,13],[-1,6],[-1,9],[0,3],[-2,2],[-6,1],[0,-22],[-19,0],[-23,0],[-24,0],[-24,0],[-23,0],[-12,0],[-24,0],[-23,0],[-12,0],[-24,0],[-24,0],[-23,0],[-24,0],[-24,0],[-23,0],[-12,0],[-24,0],[-12,0],[-23,0],[-24,0],[-12,0],[-24,0],[-23,0],[-24,0],[-24,0],[-12,0],[-23,0],[-12,0],[-24,0],[-24,0],[-23,0],[-24,0],[-24,0],[-23,0],[-12,0],[-24,0],[-14,0]],[[1589,8005],[-4,5],[-3,-2],[-1,-3],[-1,0],[-1,4],[2,3],[-4,2],[0,4],[-1,3],[2,1],[3,0],[1,2],[-4,2],[-3,-1],[0,3],[1,3],[0,9],[-3,-3],[1,-2],[-1,-3],[-2,0],[-2,-3],[-1,0],[-9,4],[-3,3],[-2,4],[-1,4],[2,4],[2,-1],[3,-8],[6,4],[0,2],[-3,-2],[-3,2],[-2,3],[0,16],[-2,-1],[0,-6],[-3,-2],[-2,-4],[-4,-1],[-4,0],[-2,2],[-8,12],[0,3],[-4,11],[-1,6],[-2,0],[0,3],[3,7],[2,6],[0,13],[-2,-3],[0,-8],[-1,-5],[-3,-4],[-4,-2],[-8,1],[-5,-2],[-4,3],[-4,-2],[-12,3],[-1,1],[1,3],[5,1],[9,4],[-2,1],[-11,-2],[-4,0],[0,3],[3,5],[0,2],[-3,1],[1,6],[-2,0],[-2,-3],[-9,-1],[-3,-2],[-6,3],[-5,4],[-7,10],[0,11],[8,15],[2,2],[10,1],[-1,3],[-9,0],[-3,-2],[-5,-12],[-3,2],[0,2],[-2,4],[-2,9],[4,13],[-3,0],[0,5],[1,6],[10,10],[6,2],[2,-4],[4,-2],[2,-2],[1,-4],[5,-7],[1,0],[-6,9],[-1,5],[-6,5],[-1,4],[0,4],[6,7],[1,4],[0,4],[-2,3],[0,-9],[-2,-3],[-12,-16],[-5,-2],[-4,-4],[-1,-6],[-3,-11],[-3,-10],[-3,12],[-4,10],[9,9],[-1,8],[-6,-6],[0,4],[4,22],[2,6],[-1,0],[-7,-5],[-3,3],[-2,15],[-3,6],[-6,5],[-6,2],[-2,4],[-1,6],[2,6],[2,3],[5,1],[-1,-9],[2,0],[8,-8],[2,0],[3,2],[2,0],[4,-2],[1,2],[-3,2],[-4,0],[-4,-1],[-3,2],[-2,3],[-3,9],[2,6],[4,2],[-2,4],[-2,0],[-6,-6],[-4,-2],[-4,-8],[0,-4],[-1,-5],[0,-4],[-6,-4],[-3,-6],[-3,5],[-4,5],[-2,8],[-5,1],[-5,5],[-2,4],[3,8],[4,6],[0,8],[1,1],[7,2],[5,4],[-8,0],[-5,-3],[-6,5],[-3,5],[-1,4],[1,3],[0,4],[3,9],[2,2],[3,9],[5,11],[1,5],[7,15],[-1,0],[-3,7],[-1,-1],[0,-12],[-1,-4],[-3,-8],[-2,-3],[-1,2],[3,15],[-2,6],[-1,6],[0,11],[2,7]],[[2311,9384],[-5,0],[-4,4],[0,6],[2,3],[5,2],[3,-4],[3,-1],[1,-4],[-2,-4],[-3,-2]],[[1818,9365],[5,-1],[11,4],[7,1],[3,-1],[3,2],[0,8],[5,7],[6,3],[9,-1],[9,-3],[11,-2],[16,-8],[5,-3],[1,-2],[-3,-6],[-7,-8],[-6,-2],[-2,-2],[6,-3],[4,3],[6,6],[1,-5],[4,-1],[5,4],[5,6],[8,4],[2,2],[6,1],[0,6],[-2,2],[-8,4],[-3,5],[0,3],[16,0],[3,-1],[11,-6],[3,-4],[10,-5],[4,-3],[0,-4],[5,-2],[3,-4],[4,-10],[2,-11],[6,-13],[1,-9],[2,-3],[4,-1],[2,-2],[4,-1],[3,5],[10,7],[-2,2],[3,1],[-7,8],[-4,7],[-3,9],[-1,8],[-3,4],[0,4],[-2,4],[-6,26],[0,3],[3,3],[5,0],[-4,4],[1,4],[9,-1],[6,-2],[11,-6],[4,5],[4,-1],[9,-4],[12,-7],[7,-3],[5,-5],[6,-8],[0,-5],[3,-4],[0,-4],[2,-9],[10,-25],[3,-6],[7,-10],[4,-7],[1,-11],[-3,-5],[-3,-10],[1,-4],[10,-7],[6,-10],[2,-2],[8,-5],[11,-5],[3,-3],[2,1],[-2,6],[1,2],[8,-8],[11,-6],[12,-8],[5,1],[3,-2],[2,-7],[12,1],[3,-2],[3,-14],[0,-9],[-3,-3],[-9,2],[-3,8],[-1,0],[-4,-8],[-3,0],[-10,7],[-4,1],[-8,-5],[-2,-2],[2,-3],[0,-4],[-2,-3],[-9,1],[-12,7],[-3,-2],[10,-10],[2,0],[0,-6],[-2,-8],[1,-1],[5,7],[13,8],[8,1],[5,-4],[-3,-4],[0,-4],[2,-3],[5,-1],[1,-5],[-2,-6],[-18,-8],[-7,-1],[-4,-3],[-7,1],[-9,-1],[-16,3],[-8,3],[-3,0],[-3,-3],[-15,3],[-2,2],[4,7],[-7,1],[-7,2],[-13,1],[-4,1],[-6,4],[0,9],[-5,3],[-3,0],[-6,-5],[-5,-10],[-9,-9],[-2,-1],[-12,-3],[-14,-1],[-5,-2],[-11,-8],[-15,-5],[-13,-3],[-14,-1],[-11,-2],[-8,1],[-5,-3],[-27,-1],[-16,-3],[-7,1],[-6,6],[-8,14],[1,11],[-2,9],[-1,1],[-10,3],[-7,1],[-24,0],[-12,1],[-7,1],[-7,2],[-11,5],[-6,9],[-11,13],[-2,11],[0,3],[2,3],[16,4],[28,5],[26,3],[12,0],[7,-2],[7,0],[13,-1],[15,-2],[4,0],[9,3],[11,0],[4,2],[-2,2],[-11,6],[-29,10],[-7,2],[-10,2],[-16,-1],[-7,-2],[-7,-1],[-13,-1],[-21,-1],[-4,2],[-21,-1],[-17,1],[-19,15],[-3,5],[3,4],[9,6],[18,4],[24,7],[15,3],[-4,2],[0,2],[8,2],[11,-1],[0,2],[-6,2],[-34,-6],[-15,0],[-11,-3],[-6,0],[-7,3],[-1,2],[2,3],[8,2],[4,6],[-18,-1],[-6,0],[-8,2],[-3,5],[0,8],[1,5],[10,10],[6,2],[5,5],[-8,8],[3,6],[7,6],[24,16],[8,3],[11,5],[29,9],[25,9],[9,-2],[4,-3],[3,-12],[0,-9],[-1,-3],[-5,-7],[-7,-8]],[[2075,9383],[-4,1],[-4,3],[-14,12],[-1,4],[-12,9],[-11,4],[-1,1],[8,10],[2,1],[30,4],[11,-1],[8,-6],[3,0],[5,-6],[-1,-11],[-6,-10],[-5,-5],[0,-3],[-8,-7]],[[2790,9426],[5,-1],[30,1],[6,-1],[19,-6],[5,-2],[5,-9],[7,-2],[3,-3],[2,-6],[8,-4],[1,-7],[5,-5],[-3,-2],[-6,-1],[-17,1],[-23,3],[-20,-2],[-16,-5],[-10,-1],[-12,6],[-5,12],[-2,9],[-12,3],[-5,3],[-1,3],[1,6],[-2,6],[0,8],[3,2],[10,0],[8,-3],[16,-3]],[[2594,9273],[1,-1],[12,4],[13,6],[15,0],[3,-1],[-2,-4],[6,-4],[2,5],[2,15],[2,9],[0,5],[-5,4],[-6,-1],[-6,2],[-4,3],[-5,8],[-9,7],[1,2],[9,4],[4,7],[2,1],[9,-1],[11,-5],[-1,3],[-4,4],[-1,4],[6,3],[-10,2],[-5,-2],[-7,4],[-7,11],[0,8],[2,5],[3,4],[6,1],[28,-9],[-1,3],[-22,9],[-9,3],[-2,3],[13,13],[11,3],[5,4],[9,0],[9,-2],[-4,5],[5,4],[9,3],[21,6],[20,0],[9,-2],[6,-3],[5,-9],[2,-10],[4,-4],[9,-4],[3,-6],[-1,-4],[1,-4],[4,-7],[4,-2],[0,-2],[-4,-4],[-16,-14],[7,2],[4,-2],[-6,-10],[-3,-4],[7,-5],[-7,-1],[0,-10],[4,1],[2,4],[9,9],[8,4],[5,-3],[1,1],[-6,7],[1,4],[4,3],[4,1],[4,-6],[6,0],[3,3],[9,-7],[-1,-10],[1,-3],[6,-7],[4,1],[-4,5],[-2,4],[1,10],[3,5],[8,-5],[8,1],[11,-6],[6,0],[-1,2],[-4,1],[-16,7],[-5,4],[-1,5],[4,5],[10,5],[12,3],[8,0],[10,-1],[6,-2],[14,-7],[10,1],[15,-6],[5,-6],[2,-6],[-1,-3],[-9,-10],[-4,-2],[-3,-4],[1,-1],[13,8],[7,2],[5,0],[12,-3],[2,-4],[-1,-5],[-2,-3],[-16,-6],[-9,-1],[7,-3],[7,1],[0,-2],[-3,-4],[-1,-4],[0,-6],[-5,-10],[1,-1],[7,7],[1,8],[3,6],[5,6],[8,0],[4,4],[5,1],[3,-3],[-5,-7],[-9,-11],[4,1],[2,3],[8,7],[2,-4],[4,-3],[2,-6],[4,-3],[2,2],[-3,8],[3,4],[8,7],[9,-4],[13,-1],[13,-4],[11,-9],[2,-5],[-6,-8],[-5,-3],[-8,1],[-4,-2],[-8,-8],[-9,-6],[9,0],[8,11],[7,1],[11,-4],[5,1],[4,4],[7,3],[3,-3],[1,-3],[0,-8],[-3,-4],[-12,-10],[-6,-1],[-5,-2],[-4,-5],[-5,-3],[4,-2],[2,1],[3,5],[3,3],[3,0],[2,-3],[9,5],[3,3],[8,6],[6,3],[11,3],[4,-1],[3,-3],[9,1],[6,-2],[3,-2],[16,-7],[2,-2],[1,-5],[-3,-4],[-2,0],[-8,-6],[-17,-3],[-7,-4],[-10,-7],[4,-2],[3,1],[5,5],[11,3],[13,1],[1,-3],[-8,-10],[3,-2],[7,1],[2,4],[3,2],[5,1],[2,3],[-3,1],[1,4],[5,5],[7,-2],[4,-3],[10,-11],[5,-10],[0,-6],[-4,-2],[-13,3],[-6,0],[-5,-2],[-5,-5],[-8,0],[-5,-1],[-8,-3],[-3,-2],[0,-2],[4,0],[8,3],[8,1],[13,-6],[4,-1],[2,1],[13,0],[9,-3],[7,-5],[3,-3],[0,-5],[-3,-3],[-12,1],[-3,1],[-4,-1],[-8,2],[-5,3],[-7,-3],[-6,2],[-6,-2],[-12,-6],[2,-1],[16,5],[3,0],[15,-7],[0,-6],[-3,-9],[-13,4],[-6,0],[-5,-2],[-14,3],[-2,-1],[12,-5],[15,-2],[5,-3],[0,-4],[6,-5],[8,2],[5,-3],[7,-2],[10,0],[4,-1],[-1,-2],[-7,-2],[-1,-3],[6,-7],[0,-2],[-3,-6],[6,3],[3,-1],[-1,6],[3,2],[9,2],[-2,-9],[0,-5],[-4,-8],[-3,-3],[4,-1],[5,8],[6,6],[1,0],[0,-6],[3,-2],[4,3],[4,0],[4,-6],[3,4],[9,5],[2,0],[2,-3],[-5,-5],[-1,-4],[1,-2],[5,0],[6,3],[3,-2],[3,-4],[7,-7],[4,2],[5,-5],[-7,-4],[2,-9],[-8,1],[-2,-3],[0,-3],[5,0],[4,1],[6,0],[0,3],[4,1],[3,2],[7,-2],[8,-6],[-3,-4],[-4,-10],[-11,-10],[2,0],[13,6],[9,1],[3,1],[3,-2],[6,-1],[8,8],[4,-2],[4,-5],[8,-8],[5,-6],[1,-4],[-4,-3],[-2,0],[-5,5],[-5,2],[-3,0],[-3,-3],[13,-7],[2,-5],[0,-3],[-8,-3],[-8,1],[-6,4],[-4,1],[-1,-1],[4,-5],[-4,-5],[14,-9],[1,-2],[-4,-2],[-13,1],[6,-7],[0,-4],[-3,-1],[-3,-5],[-1,-5],[-5,0],[-4,-1],[-6,2],[-6,6],[-1,-3],[-6,-2],[0,-1],[9,-2],[-1,-5],[0,-18],[-1,-6],[-2,-6],[-4,-5],[-6,9],[-6,2],[-3,-3],[-5,6],[1,9],[-1,2],[-4,-6],[-2,-8],[-3,3],[-9,12],[-3,5],[-6,14],[-3,3],[1,4],[5,6],[5,3],[5,2],[2,3],[3,7],[6,7],[-2,1],[-7,-6],[-6,-9],[-9,-4],[-6,-1],[-8,1],[-2,1],[1,4],[-2,2],[-4,0],[-4,5],[-6,2],[-8,12],[-2,6],[-6,4],[1,-5],[-6,-1],[-3,3],[-1,-3],[4,-5],[0,-7],[-4,-1],[-6,6],[-9,5],[2,-7],[3,-6],[14,-13],[-2,-5],[-4,-2],[-4,0],[-8,3],[-4,3],[-5,6],[-8,7],[-2,0],[-2,-3],[3,-1],[7,-6],[1,-2],[-2,-3],[0,-3],[4,-6],[7,-3],[-2,-9],[-1,-2],[2,-1],[7,4],[2,0],[5,-3],[3,-6],[5,-2],[-1,-2],[-5,-3],[4,-3],[5,-8],[0,-4],[5,-2],[1,-3],[3,-2],[4,0],[9,-7],[0,-2],[-3,-3],[3,-3],[2,1],[1,3],[5,6],[4,-2],[7,-9],[3,1],[4,-5],[-2,-3],[-5,-3],[0,-1],[10,0],[2,-1],[1,-3],[-4,-8],[-4,1],[-7,0],[7,-5],[5,-8],[0,-4],[4,-1],[3,1],[7,0],[-1,-4],[-3,-2],[1,-1],[4,1],[1,-1],[5,-11],[-4,-2],[0,-6],[2,-6],[0,-6],[-1,-6],[-2,-1],[-3,1],[-5,17],[-3,5],[-4,3],[3,-15],[0,-8],[-1,-3],[5,-7],[4,-10],[2,-1],[-2,-3],[-4,0],[-7,4],[-1,-1],[3,-13],[-1,-5],[-2,2],[-6,8],[-10,8],[-3,-1],[-2,3],[-8,8],[0,-6],[-6,2],[-5,11],[-1,-8],[-2,-1],[-3,8],[-3,1],[-2,5],[-5,0],[-9,10],[-6,9],[-3,0],[3,-13],[-1,0],[-13,13],[-7,5],[-4,1],[-7,0],[-1,-3],[3,-6],[4,-4],[8,-10],[6,-10],[14,-6],[-2,-3],[10,-6],[11,-12],[1,-2],[6,-2],[2,-2],[5,-8],[5,-9],[7,-4],[1,-4],[-4,-4],[2,-7],[0,-4],[-5,-2],[-5,1],[-10,7],[-11,4],[-4,1],[-3,3],[-31,6],[-5,4],[-10,5],[-8,9],[-6,12],[-6,1],[-7,-2],[-5,0],[-9,6],[-7,3],[-5,4],[-3,1],[3,7],[-7,-5],[-7,5],[-10,13],[-4,4],[1,1],[8,0],[2,1],[6,6],[-4,2],[-2,4],[-3,3],[-3,1],[-11,-1],[-2,3],[3,6],[-1,1],[-6,-4],[-2,0],[-5,12],[-1,0],[-5,5],[-7,10],[-6,5],[-2,3],[5,8],[-10,2],[-3,-2],[-5,1],[-1,-7],[-2,-2],[-2,1],[-1,10],[-2,1],[-6,0],[-3,2],[-3,9],[-2,0],[-6,-3],[3,-3],[5,-9],[-2,-4],[-5,-2],[-5,0],[-7,2],[-5,3],[-6,-1],[-1,-8],[-8,0],[-10,-5],[-4,0],[-5,-3],[-4,-1],[-8,3],[-7,1],[-6,4],[-4,-1],[-8,8],[-4,10],[0,5],[2,3],[1,8],[1,2],[5,5],[12,5],[2,3],[-2,7],[0,3],[3,4],[2,1],[8,-3],[5,0],[20,-7],[7,-4],[5,-5],[4,-7],[-2,-4],[0,-4],[3,-2],[1,1],[0,5],[2,1],[-1,6],[-3,4],[-8,7],[2,3],[11,-2],[4,1],[5,5],[4,1],[5,-2],[3,0],[5,2],[4,5],[7,2],[3,0],[6,-2],[3,0],[0,3],[-2,7],[-3,6],[-8,7],[-10,12],[-1,3],[1,4],[12,8],[10,9],[9,10],[7,3],[1,6],[5,11],[9,4],[3,2],[4,7],[0,2],[-4,3],[-6,18],[-4,9],[-5,8],[-4,9],[-8,9],[1,6],[-8,-4],[-6,4],[-2,6],[3,6],[0,3],[-2,4],[-6,1],[-2,-1],[5,-7],[-1,-1],[-8,-1],[-4,2],[-8,11],[1,2],[-7,1],[5,4],[0,2],[-5,1],[0,3],[6,3],[-4,1],[-3,-2],[-4,-5],[-3,-2],[-4,3],[-5,0],[-2,-4],[-7,-3],[-10,-6],[-5,-2],[-5,0],[-1,2],[1,5],[0,9],[2,3],[4,2],[8,-2],[3,0],[6,5],[3,6],[-4,6],[-7,4],[-10,3],[-3,4],[0,5],[8,3],[0,1],[-8,1],[-7,-6],[-4,2],[-3,0],[-3,3],[3,1],[4,4],[-4,5],[-6,1],[-10,-1],[-2,7],[0,5],[-3,11],[-14,-1],[-10,8],[-4,5],[-2,1],[-4,7],[-2,1],[-8,-7],[-1,-5],[1,-1],[9,-3],[5,-5],[2,-8],[0,-3],[-3,-4],[-6,-3],[-6,-2],[-8,0],[-16,6],[-2,0],[-12,3],[-4,0],[-8,2],[-12,2],[-3,-1],[4,-3],[5,-1],[4,-3],[7,-7],[3,-5],[-3,-2],[-17,12],[-16,-6],[-10,1],[-18,9],[-11,-3],[-9,0],[-19,2],[-6,2],[-4,3],[-4,0],[-11,2],[-10,-5],[-11,4],[-5,4],[-4,10],[1,4],[-9,-1],[-9,1],[-1,-2],[3,-3],[-5,-1],[-11,1],[-6,-5],[-15,12],[-8,1],[-5,3],[-10,14],[-4,14],[0,4],[9,-2],[14,0],[6,-3],[8,-2],[14,0],[10,2],[1,1],[-7,3],[-14,9],[-5,1],[-15,1],[-13,2],[-10,4],[-10,6],[-3,8],[-1,9],[-2,11],[2,6],[8,6],[-5,3],[-1,3],[0,9],[1,3],[14,22],[0,6],[3,9],[7,9],[6,3],[1,5],[22,16],[12,5],[20,4],[10,1],[13,0],[23,-2],[4,-3],[0,-4],[-7,-5],[-13,-8],[-9,-9],[-13,-20],[-4,-5],[-1,-9],[2,-4],[6,-7],[1,-4],[0,-20],[3,-12],[5,-8],[14,-12],[13,-9],[1,-3],[-3,-3],[-7,-4],[-10,-2],[-5,-2],[-7,-4],[-8,-3],[-3,-2]],[[2221,9442],[24,-12],[18,4],[10,1],[9,4],[7,0],[10,-2],[6,-8],[0,-3],[-3,-3],[-15,-6],[2,-2],[6,1],[3,-4],[-1,-2],[-6,-2],[-8,-4],[-18,-15],[0,-4],[2,-1],[5,4],[7,2],[8,0],[5,-2],[5,-5],[-3,-3],[4,-1],[5,-5],[-3,-7],[3,0],[5,3],[10,1],[2,-9],[0,-4],[-2,-5],[-3,-3],[-5,-2],[6,-4],[0,-4],[-5,-7],[4,-4],[1,-8],[-12,-4],[-5,-5],[-7,-3],[-3,0],[-17,2],[-3,3],[-1,5],[-4,-2],[1,-3],[6,-9],[1,-7],[-6,-5],[-7,-3],[-4,1],[-5,3],[-7,1],[-5,10],[-5,5],[-4,6],[-11,9],[-6,6],[-7,8],[-6,3],[-5,0],[-6,7],[-8,-3],[-8,4],[-1,4],[-3,1],[-1,3],[-12,7],[-9,9],[2,9],[3,4],[6,5],[8,0],[6,-3],[2,-4],[4,-2],[5,-5],[2,-5],[7,-2],[6,1],[11,3],[3,12],[4,-5],[3,1],[1,3],[-5,9],[-5,0],[-3,2],[3,6],[6,0],[5,-3],[1,2],[-7,6],[-3,1],[-3,-3],[-7,-2],[-4,0],[-16,9],[-2,4],[6,4],[9,2],[4,-2],[5,-5],[4,1],[-2,4],[-5,2],[-5,5],[-1,4],[2,2],[12,3],[8,-3],[6,0],[2,3],[-7,0],[-2,2],[6,3]],[[2270,9438],[-12,-1],[-4,-2],[-4,0],[-9,3],[-3,2],[9,3],[7,4],[7,1],[14,4],[10,0],[2,-2],[-3,-4],[-11,-7],[-3,-1]],[[2411,9455],[11,-3],[8,-3],[5,-4],[3,-1],[16,3],[15,-1],[13,-3],[7,-5],[0,-3],[-5,-7],[-6,-7],[-6,-4],[-2,-5],[-5,-7],[-9,-3],[4,-3],[-1,-3],[-9,-13],[-4,-4],[-9,-7],[-4,0],[-27,5],[-6,-1],[-18,-2],[13,-5],[6,-8],[0,-6],[-9,-10],[-5,-13],[-3,-2],[-10,3],[-14,-2],[-5,1],[1,9],[-1,9],[-2,9],[-8,16],[-2,10],[1,10],[0,12],[-2,13],[0,7],[3,3],[5,1],[10,-4],[3,2],[-4,5],[-3,6],[0,3],[3,4],[9,4],[7,1],[15,1],[4,-1],[11,4],[6,-1]],[[1673,9452],[8,5],[7,0],[2,-2],[3,-7],[8,9],[5,3],[16,1],[13,-2],[9,-4],[13,-8],[21,-16],[13,-7],[3,-5],[-2,-6],[-15,-6],[-13,-4],[-16,-9],[-12,-4],[-14,-8],[-27,-12],[-5,-5],[-10,-17],[-8,-4],[-8,0],[-3,-1],[0,-5],[-4,-9],[-3,-20],[-2,-4],[-3,-3],[-9,-4],[-15,-3],[-4,4],[-4,-1],[-11,-10],[-11,-4],[-8,-6],[-7,0],[-8,7],[-8,16],[-8,9],[-1,2],[-21,9],[-15,8],[-15,-1],[2,6],[0,4],[4,3],[-1,3],[4,4],[3,7],[3,1],[3,4],[6,5],[-2,3],[1,9],[2,3],[10,4],[0,4],[-5,1],[-2,2],[1,4],[4,5],[6,12],[9,6],[2,7],[7,7],[-3,4],[-6,1],[-4,6],[-9,17],[-4,4],[1,2],[34,5],[23,1],[24,5],[7,0],[11,-3],[7,-4],[9,-4],[17,-6],[10,-1],[-5,-7]],[[2295,9476],[-8,-4],[-3,3],[9,7],[4,-3],[-2,-3]],[[2352,9475],[-1,-1],[-12,3],[-2,2],[5,3],[4,0],[7,-5],[-1,-2]],[[2107,9505],[-5,0],[-9,2],[-6,3],[-1,2],[5,10],[6,5],[11,1],[7,-3],[2,-7],[3,-3],[0,-4],[-4,-3],[-9,-3]],[[2401,9505],[2,-5],[0,-5],[-2,-10],[-1,-1],[-27,-2],[-7,2],[-14,7],[-4,1],[-12,1],[-6,6],[-5,0],[-3,4],[-6,0],[0,4],[6,8],[6,2],[1,7],[5,5],[8,5],[17,5],[11,0],[11,-4],[10,-7],[6,-9],[3,-3],[2,-5],[-1,-6]],[[2330,9533],[-2,-2],[-8,1],[-7,-7],[-6,0],[-3,5],[1,3],[16,5],[1,3],[7,-2],[5,-4],[-4,-2]],[[1636,9546],[-4,0],[0,2],[6,5],[2,-3],[-4,-4]],[[2374,9546],[-3,0],[-5,3],[-3,7],[10,5],[2,-2],[5,-10],[-1,-2],[-5,-1]],[[1712,9537],[-8,-4],[-5,0],[-8,3],[-6,1],[-2,2],[4,4],[17,12],[14,5],[10,7],[7,0],[-3,-8],[-7,-9],[-10,-12],[-3,-1]],[[2803,9557],[0,-4],[-8,-2],[-5,0],[-5,3],[4,4],[16,11],[4,-2],[-3,-5],[-3,-2],[0,-3]],[[2160,9562],[5,-5],[-8,-2],[-7,-7],[-10,-1],[-11,0],[2,4],[6,5],[-4,2],[-16,-3],[-6,2],[5,6],[-12,0],[-5,4],[2,4],[9,3],[12,2],[13,3],[15,-2],[2,-11],[2,0],[6,-4]],[[2110,9594],[8,1],[4,-3],[15,-5],[-4,-5],[-8,-2],[-25,0],[-6,12],[0,4],[11,3],[7,-1],[-2,-4]],[[2285,9588],[1,-3],[-2,-3],[1,-4],[4,-4],[1,-7],[-2,-3],[-1,-7],[1,-5],[-2,-3],[-6,-2],[1,-1],[12,-3],[1,-1],[-2,-12],[-5,2],[-7,-5],[1,-9],[4,-4],[1,-3],[-9,-1],[1,-3],[-4,-2],[-13,-1],[-16,0],[-7,2],[-6,-4],[-17,2],[-2,1],[-5,9],[1,2],[8,1],[-6,3],[-10,3],[1,4],[12,3],[8,6],[6,2],[0,2],[15,2],[1,1],[-20,-1],[-28,-3],[-8,-2],[-7,1],[-30,-5],[-5,1],[-2,4],[2,2],[9,4],[4,4],[-1,2],[4,4],[6,0],[9,-3],[5,-3],[5,0],[-5,4],[-2,4],[2,4],[-8,1],[-3,2],[-1,4],[9,6],[-1,1],[-10,0],[-6,3],[1,3],[9,7],[10,-2],[8,-4],[1,-5],[24,-15],[4,-3],[6,-2],[5,2],[-8,4],[-4,6],[3,1],[6,-1],[0,2],[-5,2],[-6,0],[-6,3],[12,4],[-5,2],[-14,3],[-6,3],[1,4],[13,5],[9,1],[11,0],[14,-10],[7,1],[-3,8],[8,5],[5,-2],[8,-5],[8,-3],[4,0],[3,-3]],[[2187,9594],[-7,0],[-3,2],[12,3],[8,5],[12,0],[5,-1],[-13,-5],[-14,-4]],[[1991,9564],[8,1],[6,-2],[2,-5],[-7,-6],[2,-3],[6,5],[4,1],[9,0],[5,-3],[2,-4],[8,2],[-4,3],[-1,5],[9,6],[4,0],[13,-3],[9,-4],[3,-11],[-1,-6],[-4,-8],[-5,-18],[-7,-6],[-13,-4],[-13,-5],[-12,1],[-10,3],[-11,-3],[-7,0],[-8,3],[3,2],[-5,2],[-18,-11],[-19,-2],[-10,-3],[-6,-6],[-5,-3],[-10,-3],[-12,-5],[-22,-4],[-14,-1],[-14,1],[-21,10],[-3,4],[2,3],[5,3],[22,6],[14,6],[5,1],[13,1],[6,-1],[8,1],[5,2],[12,8],[1,2],[-4,2],[-8,-4],[-9,-1],[-6,-2],[-7,0],[-6,4],[-5,0],[-4,-4],[-4,-2],[-11,0],[-10,-2],[-3,1],[-2,7],[3,7],[7,4],[-2,1],[-8,-2],[-5,1],[-3,-9],[-10,2],[5,-6],[-3,-5],[-11,-5],[-6,-1],[-6,7],[-4,1],[-3,-2],[-5,-7],[-12,5],[-9,7],[-15,-1],[-14,3],[-2,4],[2,5],[5,5],[12,2],[19,0],[4,1],[21,7],[6,4],[-1,1],[-25,-6],[-11,-1],[-16,1],[-4,1],[3,6],[7,3],[11,2],[16,2],[10,0],[-4,3],[-23,-1],[-6,3],[3,5],[-2,3],[4,4],[7,3],[13,-1],[23,-1],[-3,3],[-18,2],[-4,1],[1,6],[6,4],[22,4],[7,0],[9,-3],[2,-2],[2,-7],[4,-4],[3,-1],[18,3],[13,-4],[10,-7],[13,-8],[-6,-5],[1,-1],[14,0],[7,-13],[7,-3],[16,0],[38,-3],[4,2],[1,3],[-1,6],[-24,10],[-2,4],[12,5],[1,5],[-8,6],[-6,1],[-8,3],[-3,5],[1,3],[12,6],[9,10],[5,4],[7,3],[7,0],[8,-4],[1,-4],[-3,-3],[3,-11],[9,-6],[2,-6],[-8,-8],[3,-2]],[[2507,9590],[-9,-1],[-7,5],[-7,9],[1,3],[10,3],[6,0],[5,-3],[2,-4],[-3,-3],[-1,-4],[3,-5]],[[1845,9604],[-4,-2],[-29,2],[-3,3],[6,3],[6,1],[15,1],[8,-2],[3,-4],[-2,-2]],[[2380,9613],[10,1],[9,-3],[11,-6],[1,-5],[-4,-6],[-5,-5],[2,-1],[12,9],[8,-1],[11,0],[15,4],[13,0],[5,-1],[11,-5],[5,-4],[-2,-2],[-22,2],[2,-4],[14,0],[43,-8],[2,-2],[-5,-4],[-25,-2],[-15,1],[-12,3],[-4,-1],[4,-3],[7,-1],[6,-2],[2,-2],[13,-1],[6,-5],[4,0],[6,-7],[5,1],[8,-6],[-1,-4],[-3,-3],[-8,-4],[10,0],[10,-7],[3,3],[-1,7],[4,2],[4,-1],[10,-7],[13,3],[3,-1],[3,-4],[4,6],[3,2],[13,-8],[7,-1],[3,-2],[14,-2],[1,3],[-5,3],[3,2],[11,3],[6,-1],[10,4],[11,1],[19,9],[5,0],[14,-4],[25,5],[5,0],[14,-2],[14,-3],[-1,-4],[5,-2],[13,0],[11,-3],[1,-3],[-5,-3],[5,-1],[10,0],[5,-5],[2,-7],[-13,-8],[-12,-5],[7,-3],[13,2],[4,-1],[4,-5],[-3,-2],[-12,-2],[-8,3],[-3,-1],[4,-3],[-2,-14],[-27,-1],[-16,-5],[-7,0],[-10,3],[-9,0],[-7,3],[-4,7],[1,7],[-3,0],[-6,4],[-2,-3],[4,-2],[-1,-8],[-4,-5],[-9,-1],[-11,-3],[-12,1],[-7,2],[-8,-3],[-6,5],[-3,-4],[-7,-2],[-4,0],[-5,3],[-6,-2],[-9,3],[0,-4],[-9,-1],[-11,2],[-6,-2],[-11,1],[-12,0],[-4,3],[6,14],[-4,2],[-5,-1],[-3,-5],[-3,0],[-1,4],[-5,-3],[-3,0],[1,-6],[-7,-4],[-11,-1],[-15,4],[-5,0],[-7,5],[-9,2],[0,-5],[-6,1],[-6,-1],[-3,3],[-6,2],[-6,12],[-2,7],[3,3],[-4,4],[-4,2],[-2,4],[0,7],[9,11],[1,3],[-3,11],[-15,15],[-11,14],[-2,1],[-11,-3],[-2,-2],[-6,-1],[-24,2],[-8,-2],[-7,0],[-5,6],[-14,4],[-3,3],[5,4],[-21,8],[-7,2],[0,4],[6,-2],[6,0],[1,2],[-7,3],[-4,3],[2,4],[25,5],[6,0],[28,-6],[9,-3]],[[1790,9639],[1,-4],[-20,-6],[-3,-3],[1,-2],[12,-7],[-1,-4],[-8,1],[-1,-3],[8,-8],[-1,-3],[-7,-4],[-7,-2],[-15,-3],[0,-7],[-3,-5],[-6,-3],[-4,0],[-7,3],[-7,5],[-1,5],[3,9],[4,8],[-3,1],[-9,-2],[-5,-4],[-2,-9],[-8,-1],[-2,-4],[5,-2],[0,-5],[-6,-4],[-3,-6],[-6,-2],[-8,9],[-5,0],[0,-7],[-3,-2],[6,-4],[0,-4],[-2,0],[-4,-4],[-5,-3],[-12,-2],[-3,2],[-1,5],[-4,5],[-3,7],[-4,0],[-3,-8],[-9,-3],[-10,3],[-6,1],[-4,-1],[-7,-4],[-6,0],[-3,3],[2,4],[-1,5],[-9,-1],[11,12],[4,3],[21,2],[2,1],[12,12],[3,2],[15,5],[3,6],[4,2],[11,9],[20,13],[8,2],[22,2],[21,-4],[3,3],[10,-1],[3,2],[-10,3],[0,2],[6,4],[13,1],[23,-11]],[[2504,9634],[-7,-4],[-25,7],[-5,4],[-1,9],[2,4],[8,2],[12,-1],[6,-2],[10,-6],[3,-3],[1,-6],[-4,-4]],[[2095,9627],[-4,-1],[-14,3],[-5,4],[-9,12],[-1,4],[-9,11],[6,2],[7,-1],[4,-2],[11,-9],[3,-8],[5,0],[6,-4],[3,-5],[-1,-5],[-2,-1]],[[2347,9664],[7,-2],[7,1],[27,-1],[12,1],[8,-2],[4,-5],[-5,-1],[-6,-10],[-8,-1],[-16,2],[-44,0],[-8,7],[2,6],[2,1],[18,4]],[[2174,9658],[-10,0],[-9,2],[-2,3],[0,6],[6,1],[17,0],[9,-2],[9,-7],[-17,-1],[-3,-2]],[[1837,9662],[-7,-2],[-5,0],[-9,3],[-11,8],[-1,3],[19,6],[2,-4],[3,0],[7,-5],[5,-1],[3,-5],[-6,-3]],[[1931,9682],[22,-1],[0,-5],[-3,-2],[-12,-4],[-15,-2],[-3,-2],[4,-3],[12,1],[4,-2],[1,-8],[-3,-5],[-13,-5],[-6,-1],[-9,0],[-20,-5],[-12,1],[-8,5],[-8,2],[-6,3],[-1,4],[2,1],[-4,9],[0,5],[2,3],[5,0],[6,2],[14,3],[30,5],[9,0],[12,1]],[[2138,9684],[-7,0],[0,3],[4,3],[6,2],[3,-3],[-6,-5]],[[1949,9713],[5,-3],[4,0],[4,-8],[-1,-7],[-9,-2],[-9,2],[-7,-2],[-13,1],[-13,4],[-2,-3],[-6,-3],[-7,0],[-10,5],[-12,-1],[-17,-4],[-4,3],[4,4],[8,4],[18,5],[14,1],[6,2],[12,6],[13,3],[5,0],[17,-7]],[[2327,9707],[6,-2],[12,1],[15,-5],[4,-5],[-11,-5],[-2,-2],[10,-5],[1,-4],[-7,-6],[-7,0],[-16,-5],[-13,0],[-3,-2],[-11,-2],[-2,3],[1,3],[-11,4],[-6,6],[12,1],[7,2],[-10,4],[-14,1],[-6,6],[-1,3],[-7,5],[0,3],[7,2],[-6,8],[-1,5],[3,1],[17,0],[12,-2],[7,-3],[9,-1],[9,-6],[2,-3]],[[2126,9752],[7,-1],[8,-4],[7,-8],[-2,-7],[3,-4],[3,0],[3,6],[14,5],[5,-1],[11,-5],[5,-1],[3,-3],[-3,-7],[6,-1],[13,2],[12,-5],[12,-10],[-7,-7],[2,-2],[0,-6],[6,-1],[12,-9],[3,-7],[-3,-7],[-6,-2],[-9,-1],[-8,-2],[-9,2],[-9,4],[-5,5],[-1,6],[-4,2],[-3,4],[-7,0],[-14,4],[-13,1],[-9,-2],[-5,5],[2,2],[-27,-3],[-7,-3],[-11,0],[-12,5],[-6,7],[2,5],[5,1],[14,-2],[13,-1],[5,1],[3,3],[-3,2],[-12,1],[13,3],[5,2],[-4,2],[-14,0],[-5,1],[1,2],[8,5],[-7,5],[-8,-2],[-11,-9],[-5,2],[7,9],[0,2],[-5,2],[-11,-2],[-6,0],[-1,2],[1,11],[4,4],[15,-1],[24,3],[8,0],[7,-2]],[[2255,9790],[1,-7],[-2,-7],[-3,-1],[-8,2],[-3,5],[-5,3],[-13,-1],[-3,2],[-1,7],[2,4],[7,2],[10,-1],[12,0],[3,-2],[3,-6]],[[2447,9856],[17,-16],[18,-11],[-1,-4],[12,-2],[10,-3],[5,2],[10,0],[5,-4],[-2,-3],[2,-3],[-2,-4],[5,-5],[14,-4],[6,0],[2,2],[-10,5],[-2,5],[7,5],[8,0],[13,-3],[1,-11],[-7,-3],[1,-3],[18,-2],[6,-9],[-4,-13],[-5,-5],[2,-1],[10,2],[6,3],[12,-2],[8,-7],[5,6],[3,1],[4,-5],[9,-8],[4,-6],[-4,-3],[-35,-11],[-8,-4],[-5,1],[-3,-5],[-13,-11],[-4,-2],[-8,4],[-1,10],[4,7],[-2,0],[-8,-6],[0,-14],[-2,-2],[6,-2],[2,-4],[-2,-4],[-3,-1],[-12,8],[-5,-1],[4,-11],[-5,-12],[-9,1],[-15,13],[-10,10],[-2,-3],[16,-20],[-2,-2],[-11,5],[-1,2],[-8,2],[-10,-1],[8,-5],[0,-4],[-15,0],[-14,2],[-13,3],[-13,4],[-9,4],[-5,4],[4,2],[11,2],[12,1],[-1,1],[-22,3],[-15,0],[-4,2],[-7,6],[2,2],[10,-1],[-3,3],[-16,3],[-6,3],[-2,3],[7,4],[18,6],[17,2],[4,6],[33,4],[1,1],[-26,0],[-11,5],[-11,-2],[-14,-4],[-11,-4],[-5,2],[5,4],[-10,1],[-15,-4],[-7,-3],[-6,4],[-10,2],[-2,2],[2,6],[10,2],[22,6],[3,4],[-25,-5],[-15,1],[-17,10],[-4,4],[-1,7],[-4,6],[28,-4],[10,-1],[22,0],[1,5],[8,3],[-8,1],[-17,-4],[-6,0],[-7,5],[-10,0],[-10,4],[1,3],[6,2],[16,-1],[-17,11],[1,8],[6,2],[6,0],[5,-2],[8,0],[6,-3],[3,-4],[12,-1],[15,0],[-3,2],[-15,3],[-6,6],[-11,4],[-9,1],[0,2],[7,8],[8,3],[13,-1],[8,1],[11,3],[13,-1],[3,4],[-4,3],[-14,0],[-9,3],[0,4],[4,1],[13,0],[8,1],[8,-1],[23,-6],[9,-7]],[[3069,9965],[30,-1],[13,-3],[37,0],[5,-2],[-11,-6],[-43,-8],[18,-1],[9,1],[11,3],[11,1],[24,6],[10,-2],[7,5],[10,-1],[7,-6],[11,3],[13,-1],[5,-2],[-5,-4],[16,-8],[-5,-7],[22,4],[21,-1],[9,-3],[5,-6],[-2,-4],[-9,-5],[-10,-4],[-6,-4],[-9,-2],[-30,-10],[-28,-6],[-18,1],[-7,-5],[-14,-2],[-18,-1],[-6,-7],[-2,0],[-49,-11],[4,-3],[78,14],[14,1],[13,-1],[-2,-3],[-18,-9],[-23,-8],[-11,-6],[-29,-10],[-24,-11],[-9,-5],[-17,-12],[-5,-1],[-11,2],[-4,-9],[-23,-3],[-15,-3],[-8,0],[-4,-2],[13,-2],[20,3],[9,-1],[-5,-6],[-15,-5],[5,-4],[-8,-5],[-23,-4],[-6,1],[-28,7],[-10,1],[-9,2],[-7,0],[-8,-2],[17,-4],[12,0],[6,-2],[5,-5],[0,-6],[-7,-3],[-15,0],[-5,-2],[-17,0],[-19,-3],[-8,1],[-8,3],[-8,1],[-9,-1],[11,-4],[5,-5],[5,0],[9,-5],[7,0],[7,-2],[10,2],[7,0],[-1,-10],[-3,-1],[-17,0],[-7,1],[-4,2],[-7,1],[-7,-1],[-6,1],[-29,-3],[-16,1],[-17,0],[16,-7],[4,-1],[29,5],[9,0],[12,-2],[8,-6],[11,0],[8,-2],[19,-7],[-4,-6],[-9,-5],[-14,-1],[-27,0],[24,-7],[9,-4],[-10,-6],[-9,-12],[-6,-2],[-8,0],[-10,-3],[-20,1],[-16,0],[-2,-6],[1,-13],[-1,-6],[-5,-6],[-12,-4],[-12,-1],[-21,-1],[-11,0],[-16,3],[-18,9],[-4,-1],[4,-4],[7,-4],[-7,-3],[-15,-1],[8,-5],[18,4],[9,-1],[14,-6],[10,3],[12,0],[4,-3],[2,-4],[-1,-6],[9,-5],[6,0],[11,5],[3,0],[8,-7],[0,-6],[-4,-6],[-4,-4],[-18,-7],[-10,-6],[-19,-6],[-6,0],[-14,-4],[-8,0],[0,5],[4,6],[-4,6],[-6,2],[-15,-1],[-3,2],[-5,6],[-6,1],[-3,-1],[4,-7],[-1,-2],[-32,-2],[-14,1],[-3,2],[-8,-8],[-24,-3],[-15,3],[-12,5],[-5,3],[-3,5],[-4,-3],[-4,-9],[-8,3],[-10,2],[-4,-4],[-17,2],[-8,-1],[-12,3],[-15,1],[-6,1],[2,19],[20,10],[6,5],[12,3],[22,0],[8,2],[6,0],[-9,10],[-7,0],[-5,3],[-5,6],[-9,13],[2,4],[15,5],[13,1],[18,-5],[6,-4],[12,-13],[4,-3],[17,-5],[6,-1],[22,2],[7,1],[6,6],[7,4],[15,15],[2,5],[-2,2],[-20,-20],[-10,-5],[-11,-1],[-9,3],[-10,-4],[-6,1],[-6,3],[0,11],[-7,10],[26,15],[6,1],[-4,2],[-10,0],[-4,4],[-6,-7],[-9,-5],[-18,-1],[5,6],[-1,5],[-10,-5],[-13,-4],[-12,1],[-6,2],[2,6],[0,8],[15,14],[4,7],[31,4],[19,4],[6,-2],[24,-3],[18,-4],[8,5],[15,-1],[8,2],[11,5],[-3,1],[-10,-3],[-11,-1],[-12,2],[-20,0],[-10,1],[-8,2],[-4,5],[9,3],[12,-4],[7,0],[-18,10],[-17,15],[-7,7],[-5,3],[-22,3],[-3,1],[-7,6],[-2,10],[-4,6],[4,8],[5,4],[32,-3],[13,0],[17,-1],[10,-2],[10,-4],[10,-6],[9,-3],[8,-5],[14,-11],[11,-4],[12,-2],[16,-1],[10,4],[-5,1],[-12,-1],[-8,1],[-10,6],[-14,10],[-13,6],[-17,12],[-1,3],[13,3],[43,4],[26,5],[11,6],[35,8],[42,5],[-7,2],[-25,0],[-15,1],[-4,2],[2,5],[10,7],[20,9],[-12,1],[-10,-4],[-11,-7],[-13,-1],[-3,-2],[-8,-12],[-15,-7],[-32,-8],[-7,0],[-23,-4],[-14,1],[3,3],[12,6],[3,3],[-32,-4],[-7,-2],[-12,-7],[-4,-1],[-30,-1],[-12,4],[-15,-1],[-10,3],[10,10],[28,11],[16,3],[37,4],[2,2],[-70,-6],[-12,-5],[-24,-13],[-7,-3],[-10,-1],[-8,1],[-18,6],[-12,3],[-5,5],[2,1],[21,4],[29,-1],[13,1],[12,2],[19,5],[20,7],[4,2],[-8,1],[-18,-3],[-21,-7],[-18,-3],[-45,-1],[-14,-2],[-6,1],[-10,5],[1,3],[10,3],[9,1],[-11,3],[-1,2],[22,8],[8,2],[13,1],[14,-1],[1,1],[-14,2],[-24,-1],[-37,-8],[-9,2],[2,2],[20,8],[0,1],[-14,0],[-8,2],[-13,-4],[-9,-1],[-8,3],[1,3],[12,6],[21,5],[9,1],[14,0],[14,4],[16,6],[14,2],[12,-1],[17,-7],[5,4],[6,1],[13,-1],[14,-4],[17,1],[-4,3],[-39,9],[-1,2],[23,4],[14,7],[15,2],[11,-4],[15,-1],[6,-2],[12,-8],[11,-5],[3,3],[-2,3],[6,3],[26,-8],[40,-8],[0,3],[-37,9],[-14,5],[-13,7],[0,2],[12,4],[9,1],[-12,5],[0,2],[9,1],[26,-5],[2,1],[-11,9],[5,2],[10,0],[16,-4],[29,-2],[7,1],[-29,7],[-9,6],[7,1],[20,0],[18,-2],[15,1],[10,-1],[11,-3],[22,-10],[8,-7],[4,-1],[12,4],[-23,12],[-14,6],[-6,5],[38,3],[37,-2],[10,-4],[10,-6],[12,-4],[14,-1],[-19,8],[3,6],[15,5],[23,1],[15,-5],[16,5],[25,1],[13,-6]],[[5264,7906],[-2,-6],[0,-4],[1,-2],[2,0]],[[5289,7883],[-1,-8],[0,-4],[1,-3],[0,-3],[-2,-1],[-3,1],[-2,4],[-3,-2],[-1,-3],[0,-5],[2,-5],[0,-7],[-2,0],[-3,7],[-4,-1],[-4,-3],[-3,0],[-2,3],[-1,5],[0,3],[-4,0],[-1,-1],[0,-11],[-1,-4],[-4,-6],[-2,-5],[1,-5],[0,-5],[-2,-1],[-2,2],[0,3],[-3,5],[1,4],[-5,2],[-6,10],[1,7],[-1,3],[-4,-3],[-1,-4],[-4,-4],[1,-6],[-4,-8],[-6,-6],[-7,4],[-5,-4],[-6,-2],[-2,1],[-1,2]],[[5194,7829],[0,1],[-3,6],[-2,2],[-2,4],[1,7],[-1,2],[0,6],[-5,1],[-4,0],[-6,-6],[1,-5],[-2,-3],[-3,-3],[-3,1],[0,3],[2,2],[2,5],[0,3],[-2,2],[1,2],[2,9],[4,4],[3,4],[1,5],[0,6],[6,5],[4,8],[5,8],[0,3],[-2,0],[0,2],[2,4],[2,2],[2,0],[2,-4],[4,0],[2,2],[2,5],[4,3]],[[5211,7925],[2,-2],[6,0],[8,2],[3,0],[3,-1],[1,2],[3,0],[0,2],[-3,0],[-2,2],[1,3],[2,2],[3,0],[3,-4],[3,0],[2,-3],[8,1],[10,-8]],[[3122,1964],[-7,2],[0,2],[8,0],[1,-1],[-2,-3]],[[3130,1971],[-1,-1],[-2,2],[-5,3],[4,3],[2,3],[1,-5],[2,-3],[-1,-2]],[[3153,2002],[-2,-2],[-3,1],[0,2],[3,3],[3,-2],[-1,-2]],[[3136,2007],[-1,-3],[-4,-5],[-4,1],[-1,4],[-3,1],[-4,-4],[-2,-1],[-9,3],[-3,8],[-3,5],[5,3],[7,0],[12,-2],[5,0],[4,-5],[1,-5]],[[3063,2020],[22,-6],[7,4],[6,0],[1,-5],[-5,-5],[0,-3],[6,-1],[2,-3],[-1,-5],[7,-8],[1,-2],[0,-8],[-3,1],[-2,2],[-3,5],[-4,1],[-3,2],[-6,1],[-2,-1],[-2,6],[2,5],[-1,2],[-4,-1],[-3,4],[-4,1],[-1,-6],[1,-6],[4,-6],[-2,0],[-5,2],[-3,4],[-4,4],[0,5],[-4,-1],[-2,3],[-3,2],[2,5],[1,10],[5,-2]],[[3027,2023],[1,-4],[4,-2],[11,4],[4,-9],[-3,-6],[-2,-1],[-2,1],[0,2],[-2,3],[-4,-2],[-2,2],[-4,2],[0,2],[-7,7],[-2,0],[-3,-3],[-1,3],[1,3],[11,-2]],[[3016,2071],[6,-5],[4,1],[1,-8],[-4,-8],[-9,9],[-3,-1],[-5,1],[-2,-3],[-3,-1],[-1,5],[-3,5],[-4,4],[2,7],[4,3],[8,-3],[5,-1],[4,-5]],[[2974,2103],[0,-5],[6,0],[6,-1],[3,-6],[2,-2],[2,-5],[-2,-3],[-2,-5],[0,-2],[-5,-5],[-10,-3],[-1,3],[2,2],[2,5],[1,5],[-3,1],[-3,-1],[-2,2],[-1,-3],[0,-7],[-1,-1],[-5,4],[0,13],[-5,-1],[-3,5],[-1,5],[-6,1],[4,7],[7,1],[2,-4],[8,-2],[-1,5],[2,2],[4,-5]],[[2933,2135],[9,-2],[5,-3],[3,-3],[3,0],[3,-4],[3,-1],[4,-6],[4,-5],[-2,-1],[-5,2],[-5,1],[0,3],[-6,8],[-5,2],[-4,-1],[-4,1],[-4,5],[-4,4],[-4,9],[1,2],[3,-2],[2,-4],[2,-1],[1,-4]],[[3092,2024],[-4,0],[-1,-2],[-7,-1],[-11,3],[-3,2],[-4,6],[-1,-2],[-7,-4],[-3,0],[-3,2],[-1,2],[-6,-4],[-7,4],[-5,2],[-8,1],[-6,4],[-11,0],[-2,1],[-1,5],[4,5],[6,-4],[2,3],[4,3],[6,-3],[2,0],[3,2],[2,5],[5,-1],[1,-4],[-1,-4],[4,-1],[4,0],[3,-1],[0,2],[-4,6],[-2,5],[-6,3],[-3,8],[0,13],[6,3],[-2,6],[3,4],[2,1],[2,-15],[2,-5],[-2,-1],[-5,0],[3,-8],[4,-2],[4,-6],[0,-4],[2,-2],[5,0],[3,1],[2,3],[2,0],[3,-3],[6,-2],[3,-8],[1,-1],[4,6],[2,1],[0,2],[-4,3],[-22,14],[-3,5],[-1,7],[0,8],[1,2],[4,3],[7,4],[10,7],[0,4],[-1,2],[-4,2],[-6,0],[-4,-1],[-6,-4],[-6,3],[-3,4],[-1,6],[0,7],[4,5],[2,-1],[2,2],[1,3],[-5,6],[-2,4],[1,1],[4,0],[6,-5],[2,0],[4,5],[6,11],[2,3],[2,0],[7,-10],[2,-1],[8,6],[1,0],[4,-4]],[[2940,2192],[-6,2],[-2,3],[0,3],[-2,4],[4,-1],[2,-4],[4,-3],[0,-4]],[[2921,2209],[1,-11],[4,-2],[3,-7],[-4,-10],[-1,-7],[-4,1],[-2,6],[-3,7],[-2,14],[3,4],[2,-1],[0,5],[3,1]],[[2928,2230],[0,-5],[-1,-2],[-4,2],[-1,-3],[-4,-1],[-3,2],[-4,-10],[-3,-3],[0,4],[2,10],[2,6],[3,-3],[4,3],[4,4],[4,0],[1,-4]],[[2907,2264],[0,-5],[-3,0],[-1,7],[1,3],[0,7],[3,-1],[5,0],[1,-1],[-3,-4],[-2,-1],[-1,-5]],[[2914,2286],[-5,-4],[-2,2],[-4,0],[2,10],[1,3],[1,6],[3,-2],[6,-3],[3,-1],[1,-5],[-3,-2],[-3,-4]],[[2913,2370],[0,-4],[-4,-9],[-7,-9],[-2,0],[-2,2],[4,6],[0,4],[-1,2],[-3,2],[1,4],[2,2],[7,2],[1,2],[4,0],[0,-4]],[[2930,2352],[1,-8],[-1,-8],[-1,-13],[2,-1],[0,-6],[-1,-5],[-2,-7],[-4,-2],[-2,1],[-1,4],[0,7],[-2,5],[0,2],[2,5],[0,5],[-4,-1],[-1,-2],[0,-10],[-1,-5],[-1,-1],[-6,0],[-5,5],[-2,-2],[-1,6],[1,4],[6,0],[0,8],[-3,4],[-1,3],[1,2],[4,4],[2,-2],[3,1],[0,5],[-3,2],[1,4],[4,4],[2,3],[0,4],[-1,4],[3,5],[4,2],[3,-3],[2,0],[1,-3],[1,-20]],[[2902,2375],[-3,0],[-1,10],[4,20],[-2,9],[5,3],[3,-11],[4,-12],[-1,-11],[-1,-3],[-6,-3],[-2,-2]],[[2928,2384],[-1,-1],[-3,1],[-6,-2],[-2,6],[-2,8],[0,2],[-2,4],[-3,13],[1,5],[7,3],[2,5],[2,-1],[-1,-10],[1,-3],[3,-4],[0,-3],[1,-6],[2,-2],[0,-3],[-1,-2],[2,-10]],[[2913,2428],[-2,-1],[-2,5],[1,2],[3,2],[3,0],[2,-1],[0,-2],[-4,-3],[-1,-2]],[[2935,2552],[-2,-3],[-2,-1],[-3,2],[-3,-1],[-1,4],[4,8],[2,6],[0,8],[2,5],[3,1],[1,-6],[-1,-10],[2,-7],[0,-4],[-2,-2]],[[2915,2598],[-2,-1],[-1,2],[0,3],[2,1],[1,-1],[0,-4]],[[2954,2602],[-2,-1],[-1,2],[0,3],[-2,4],[0,4],[2,4],[3,-4],[0,-12]],[[2972,2604],[-7,-5],[-3,2],[-2,3],[0,3],[-1,5],[1,3],[3,3],[1,3],[0,8],[2,1],[5,-3],[5,-4],[2,-3],[0,-3],[-2,-5],[-4,-8]],[[2951,2626],[-1,-2],[-3,-1],[-3,-3],[0,-5],[2,-4],[2,-10],[1,-8],[2,-8],[0,-9],[-3,-1],[0,-3],[-5,-1],[-2,2],[0,7],[-3,3],[-2,5],[-2,9],[-2,2],[-2,7],[-4,6],[4,3],[0,7],[5,4],[3,-2],[2,1],[1,2],[0,11],[3,3],[2,0],[1,-3],[2,-3],[3,-2],[0,-3],[-1,-4]],[[2949,2659],[0,-3],[-3,0],[-1,-3],[-5,2],[0,4],[8,2],[1,-2]],[[2925,2672],[-4,-1],[-1,3],[3,2],[2,-4]],[[2950,2687],[-2,-2],[-4,1],[-4,0],[-3,2],[-3,3],[-1,2],[0,3],[3,6],[2,12],[1,16],[-1,6],[0,3],[1,3],[0,10],[3,6],[0,6],[1,6],[0,3],[-1,1],[1,2],[8,-5],[6,-1],[0,-5],[2,-10],[1,-2],[-1,-5],[-2,-2],[0,-4],[1,-5],[-4,-2],[-4,-5],[0,-2],[6,-8],[1,-5],[2,-5],[-3,-8],[-5,-5],[0,-7],[-1,-3]],[[2810,3245],[-5,-1],[1,3],[2,2],[3,-2],[-1,-2]],[[1964,3620],[-5,-2],[2,6],[4,-2],[-1,-2]],[[3098,2168],[-16,5],[-3,3],[-3,0],[-6,-3],[-3,-9],[-2,-3],[-4,-2],[-4,0],[-13,-9],[-5,-1],[-6,-5],[-2,-7],[1,-4],[-4,-15],[-1,-9],[0,-4],[1,-7],[-1,-12],[-2,-3],[-6,-3],[-4,2],[-7,2],[-5,5],[-7,3],[-2,2],[-5,9],[-1,7],[3,6],[6,0],[4,1],[2,-3],[1,-6],[-2,-6],[3,1],[1,14],[10,7],[6,11],[1,4],[-2,2],[-5,3],[-14,-14],[-6,-3],[-5,-4],[-5,-7],[0,-2],[-2,-5],[0,-5],[-5,2],[-8,8],[-1,3],[1,3],[3,4],[0,10],[2,7],[4,4],[2,-1],[0,-3],[5,0],[9,10],[4,0],[5,-2],[6,1],[2,3],[-4,3],[-5,1],[-11,1],[-3,-1],[-3,-5],[-2,4],[-4,2],[-3,-3],[0,-4],[-1,-4],[-4,-4],[-2,-6],[0,-8],[-3,-3],[-6,1],[-3,6],[-5,7],[11,7],[2,7],[2,3],[-1,3],[-2,0],[0,-4],[-1,-4],[-4,2],[-6,-5],[-3,1],[-6,-1],[-3,2],[0,4],[1,4],[-1,6],[-2,2],[-2,-1],[0,4],[-2,7],[-2,4],[1,1],[4,-3],[3,0],[5,-4],[4,2],[0,7],[1,0],[4,-5],[2,1],[5,-1],[4,2],[5,4],[4,6],[3,-2],[1,-7],[2,-2],[0,-6],[-4,-6],[1,-2],[2,1],[3,6],[0,5],[-3,8],[0,5],[3,3],[1,8],[-8,11],[-10,7],[0,-3],[9,-7],[4,-4],[2,-3],[0,-3],[-10,-4],[-12,-12],[-4,2],[-2,4],[-2,6],[-2,4],[-3,0],[-1,2],[-3,-1],[-6,6],[4,5],[4,-2],[1,17],[-2,3],[-5,5],[-2,-1],[-4,1],[-7,3],[-3,3],[-3,1],[-7,16],[-1,6],[7,0],[5,1],[1,3],[-2,5],[-2,3],[4,7],[7,-8],[1,-4],[4,-12],[1,-2],[9,-8],[1,0],[0,6],[2,8],[3,4],[-3,5],[-4,-14],[-3,-2],[-5,11],[-1,1],[0,7],[5,1],[-8,4],[-3,3],[-3,5],[-3,4],[6,8],[2,5],[9,-3],[2,2],[-2,3],[-1,-1],[-3,3],[-4,7],[0,3],[1,7],[1,2],[4,1],[4,-2],[2,-2],[1,1],[-1,5],[-3,2],[-3,3],[0,4],[2,7],[-1,3],[-2,-3],[-1,-4],[0,-5],[-1,-6],[-3,2],[-2,4],[1,3],[-1,17],[0,15],[1,11],[3,5],[2,1],[3,0],[1,1],[-4,3],[-5,-4],[-4,2],[0,6],[-2,5],[-1,6],[0,10],[6,-1],[4,-2],[11,0],[9,-9],[4,1],[0,2],[-3,2],[-2,5],[-2,2],[0,6],[-2,13],[-1,0],[-3,-12],[-3,-3],[-4,-2],[-4,-1],[-3,2],[-1,3],[0,3],[-1,2],[-4,2],[-3,4],[2,5],[2,2],[2,0],[4,-5],[2,-1],[3,5],[-2,1],[-8,8],[2,6],[6,7],[1,2],[-1,5],[1,7],[-1,5],[-3,5],[-4,2],[-1,-2],[1,-4],[-1,-1],[-6,1],[-3,4],[-5,3],[-2,7],[2,6],[-1,0],[-3,-5],[-5,-3],[-4,0],[-3,-4],[3,-1],[2,-7],[-1,-4],[-2,0],[-4,4],[-2,5],[0,4],[2,6],[6,7],[1,3],[4,3],[5,8],[4,5],[-2,3],[-2,6],[0,7],[8,3],[4,-1],[5,0],[2,2],[2,0],[4,2],[2,3],[0,7],[-1,6],[3,4],[3,1],[3,-2],[-2,-7],[-2,-16],[-1,-3],[-2,-3],[1,-6],[-2,-5],[-7,-4],[-1,-2],[5,0],[3,1],[4,4],[1,6],[1,12],[4,2],[1,-3],[0,-12],[-3,-18],[-4,-7],[0,-4],[3,0],[4,9],[1,7],[0,8],[1,10],[1,5],[0,7],[-5,4],[0,4],[1,9],[5,0],[5,5],[3,2],[2,0],[6,-6],[1,2],[-1,2],[-7,8],[-6,1],[2,15],[8,3],[10,11],[2,17],[-5,2],[-5,6],[-7,7],[1,6],[0,10],[5,2],[2,13],[-3,10],[0,8],[4,6],[2,10],[3,0],[0,8],[-2,6],[0,8],[2,9],[3,-1],[1,1],[-3,6],[-2,6],[1,2],[4,4],[2,-4],[3,-10],[1,3],[-2,10],[-1,13],[-3,-1],[-3,0],[-3,5],[1,4],[4,6],[5,1],[3,4],[1,9],[-1,-1],[-2,-7],[-3,-3],[-3,2],[-4,6],[-2,2],[-2,0],[-2,-2],[-4,-11],[-2,-2],[-8,-1],[-3,1],[-3,2],[0,3],[1,3],[2,3],[-2,1],[-3,3],[-1,4],[-3,19],[-1,8],[2,6],[4,23],[1,12],[2,11],[0,6],[5,7],[2,4],[4,21],[1,11],[-7,35],[-1,6],[0,8],[1,14],[1,5],[-2,8],[-4,12],[0,6],[2,7],[-2,8],[2,8],[6,-2],[3,1],[3,9],[0,10],[1,5],[0,6],[3,3],[1,6],[3,8],[3,24],[2,6],[3,7],[-1,10],[2,4],[3,10],[1,6],[5,8],[1,10],[4,17],[0,12],[1,7],[0,7],[2,9],[3,11],[5,10],[0,8],[-1,5],[0,8],[-2,11],[5,7],[3,18],[0,7],[1,9],[-2,10],[-1,23],[-1,18],[-2,19],[0,11],[-2,13],[0,7],[1,17],[8,11],[1,12],[1,17],[0,11],[-1,6],[-4,9],[0,19],[3,5],[2,6],[4,17],[1,18],[2,14],[1,5],[2,7],[1,1],[0,16],[3,21],[0,6],[3,14],[1,10],[1,6],[-1,6],[1,13],[-2,8],[0,4],[2,14],[2,3],[2,7],[1,7],[0,4],[-3,23],[0,8],[1,18],[1,11],[-1,10],[1,5],[0,6],[2,7],[1,5],[-3,5],[-3,6],[0,7],[1,5],[0,6],[3,2],[2,3],[2,7],[2,17],[0,21],[2,13],[0,6],[1,13],[2,16],[-1,6],[-3,31],[0,11],[2,17],[0,25],[-2,11],[0,7],[-2,13],[-2,25],[0,25],[-2,3]],[[3043,4127],[4,1],[3,0],[3,2],[4,5],[2,6],[1,6],[0,5],[-1,7],[0,5],[1,2],[4,1],[4,8]],[[8079,6335],[2,-6],[1,-7],[0,-7],[-2,-4],[-3,-1],[-5,-16],[-1,-4],[-1,-2],[0,-5],[-1,-7],[-1,-9],[-1,-4],[-3,-4],[-2,0],[-1,-1],[-2,-5],[-3,-4],[0,-3],[-1,-2],[-2,0],[-4,-1],[-3,-8],[-3,-2],[-2,0],[-3,3],[-6,3],[-5,2],[-3,3],[-6,7],[-1,12],[-1,7],[0,2],[1,21],[0,2],[4,7],[3,3],[4,8],[3,3],[2,5],[-2,1],[2,4],[1,3],[1,1],[3,-1],[3,1],[2,4],[9,-1],[5,2],[2,3],[5,-1],[1,2],[6,-5],[0,7],[2,2],[2,-4],[2,-3],[2,-1]],[[8065,6398],[1,-2],[3,2],[0,-4],[-1,-3],[-2,2],[-4,0],[1,4],[2,1]],[[8128,6430],[-3,-2],[-1,1],[1,3],[3,2],[0,-4]],[[8132,6428],[-1,-2],[-1,2],[0,5],[2,4],[0,-9]],[[8153,6497],[-3,1],[-1,2],[1,3],[2,-3],[1,-3]],[[8282,6594],[-1,-3],[-2,0],[0,6],[2,-1],[1,-2]],[[8327,6650],[-2,-3],[-1,1],[0,12],[2,1],[0,-2],[2,-2],[-1,-4],[0,-3]],[[8367,6801],[-4,-1],[0,4],[2,4],[2,-4],[0,-3]],[[8392,6893],[-3,3],[0,2],[2,1],[1,-6]],[[8399,6905],[-1,-2],[-1,6],[2,-1],[0,-3]],[[8396,6909],[-1,-1],[-3,3],[-4,1],[-1,3],[0,4],[4,0],[6,-6],[-1,-4]],[[8384,6997],[-3,-1],[-7,5],[-5,5],[-3,7],[0,2],[3,0],[4,-3],[0,-3],[2,-1],[1,-2],[6,-5],[2,-4]],[[8624,7633],[0,2],[-2,1],[-4,6],[-1,3],[0,8],[-3,2],[-2,4],[-2,-1],[-3,2],[-2,-6],[-1,-7],[-1,-4],[0,-6],[-1,-7],[-1,-2],[-2,0],[-1,-3],[-3,1],[-1,2],[-2,0],[-3,-5],[-1,-5],[-2,-6],[-2,-1],[-4,-6],[-5,0],[-3,-1],[-6,-1],[-3,1],[-8,-2],[0,-5],[2,-4],[2,-8],[2,-2],[1,-3],[0,-3],[-2,-7],[-2,-3],[-1,0],[-2,4],[-3,0],[-6,-1],[-4,1],[-1,2],[-3,0],[-4,2],[-3,0],[-1,2],[0,3],[-2,4],[-1,4],[-3,2],[-3,-4],[-2,0],[-4,-4],[0,-3],[-2,-11],[-1,-3],[-1,0],[-5,-12],[-5,-7],[0,-3],[-3,-4],[-3,0],[-2,-2],[-3,-1],[-1,-4],[-2,0],[-1,-2],[-4,-5],[-2,-1],[-7,-5],[-2,-3],[0,-2],[-3,0],[-5,-8],[-7,-8],[-2,-5],[-1,-6]],[[8453,7487],[-2,-4],[-5,-5],[-10,-1],[-3,3],[-2,-5],[-2,-1],[-4,0],[-2,-2],[-1,-3],[-6,-1],[-2,-3],[-3,-1],[-14,-13],[-3,-6],[-3,-7],[-2,-3],[-4,-3],[-1,-3],[-5,1],[-2,-3],[1,-5],[-4,-2],[-5,-1],[-5,-5],[-1,5],[0,6],[2,2],[2,0],[12,9],[-2,6],[1,3],[3,5],[1,3],[-8,-2],[-4,0],[-3,1],[1,4],[0,4],[-1,1],[6,6],[1,2],[-1,4],[1,5],[8,6],[2,6],[3,5],[6,13],[0,2],[2,6],[0,2],[-4,9],[-7,9],[-1,7],[-1,0],[-1,-5],[-1,-2],[-4,0],[-1,2],[-10,1],[-3,-3],[-2,-6],[-2,-3],[-3,-2],[-2,-4],[-8,-20],[-3,-2],[-14,-12],[-7,-5],[-6,-9],[-4,-11],[-1,-9],[-6,-13],[-2,-1],[-3,1],[-2,-1],[-3,1],[-4,-4],[-5,-3],[-4,8],[-3,2],[-5,-2],[-3,-4],[-4,-16],[-2,-9],[0,-4],[3,-12],[3,-6],[7,-7],[15,-5],[3,1],[4,0],[4,-5],[2,-7],[0,-8],[2,-4],[-3,-4],[-1,-8],[0,-9],[1,-4],[3,-4],[5,-4],[5,0],[8,1],[4,6],[0,6],[7,8],[5,7],[-2,4],[3,1],[11,7],[8,-6],[5,-7],[5,-1],[3,-4],[4,-3],[4,0],[5,-1],[2,5],[2,0],[1,-4],[5,-3],[4,0],[3,1],[2,-1],[-3,-5],[1,-8],[-4,-7],[2,-3],[0,-4],[-2,-1],[-3,-5],[-2,0],[-3,7],[-3,1],[-3,-1],[-15,-13],[-7,-4],[-3,-3],[-2,-1],[-3,2],[-2,-1],[3,-4],[0,-6],[-1,-1],[-2,2],[-2,-2],[-1,-5],[0,-9],[-1,-3],[-4,-1],[-3,-3],[-2,3],[1,5],[-1,2],[-4,-2],[-2,-4],[2,-6],[3,-2],[-2,-3],[-4,-4],[-1,-4],[-2,-3],[-1,-3],[-3,-4],[-3,-2],[-3,-7],[-2,-6],[-3,-3],[-2,-11],[-4,-6],[-1,-9],[1,-6],[4,0],[2,-2],[4,-8],[6,-5],[5,-3],[7,-7],[3,-9],[3,-17],[2,-9],[0,-4],[3,-9],[3,-14],[4,-13],[1,-10],[-1,-5],[0,-5],[3,-6],[9,-6],[3,-5],[0,-10],[2,-5],[6,-4],[2,-3],[2,-5],[1,-5],[0,-7],[-3,0],[-2,1],[-9,8],[-3,1],[-3,-2],[-5,2],[-5,9],[-4,3],[-4,2],[-9,-9],[-2,1],[-2,-2],[4,-2],[5,3],[4,4],[6,-2],[2,-10],[4,-4],[3,-2],[4,-5],[5,-8],[8,-10],[4,-9],[2,-14],[-3,-3],[-7,-1],[-3,-3],[-3,-5],[-8,-9],[-2,-5],[-1,-4],[-2,-2],[-6,2],[-5,0],[-5,-6],[0,-2],[3,-1],[4,4],[4,-10],[7,2],[7,8],[3,0],[2,-1],[3,-4],[7,-14],[7,-5],[4,-1],[-5,-5],[-6,-12],[-3,-2],[3,-2],[4,5],[1,2],[2,-1],[1,-7],[-2,-21],[-2,0],[-1,6],[-2,1],[-2,-1],[-3,0],[-2,-2],[-1,-4],[2,-1],[4,-6],[1,-3],[-1,-2],[0,-4],[-1,-5],[-1,-2],[-2,-1],[-1,-4],[2,-7],[1,-9],[1,-4],[-3,2],[-4,-6],[-3,0],[-1,7],[-2,-1],[-1,-2],[-4,-15],[-2,-2],[-4,1],[0,-2],[2,-3],[0,-2],[-4,-9],[-1,-3],[0,-3],[-2,-3],[1,-6],[0,-4],[-4,-9],[-2,-6],[-3,-3],[-4,-12],[-2,-12],[-1,-3],[-2,-2],[-2,1],[0,4],[-2,3],[0,7],[-1,-1],[0,-4],[-2,-2],[-2,1],[-1,-1],[1,-3],[0,-3],[2,-1],[2,-4],[1,-5],[2,-5],[0,-2],[-3,-2],[-3,-4],[-3,-6],[-3,-4],[-4,0],[-2,3],[-3,1],[4,-9],[1,-1],[3,0],[2,3],[3,0],[1,-5],[-1,-5],[-2,-14],[2,-9],[1,-2],[-1,-2],[-3,3],[-2,3],[-2,-1],[-2,1],[-3,-1],[-1,-2],[1,-3],[2,-3],[1,-4],[-1,-2],[-6,1],[-3,-5],[1,-7],[-1,-5],[-3,-1],[-3,-3],[-2,-1],[0,-2],[2,-1],[-1,-10],[-3,-2],[-4,1],[-3,-1],[-3,3],[-3,0],[-2,-4],[0,-5],[-5,0],[1,-5],[4,0],[1,-3],[0,-5],[-4,-8],[-2,-6],[-3,1],[-2,-5],[-1,-6],[-1,1],[-3,-1],[-1,-4],[1,-2],[-3,-8],[-1,3],[0,4],[-1,0],[-2,-4],[-4,-4],[-1,3],[-4,1],[-1,-11],[-5,-7],[0,-3],[-1,-3],[-2,0],[-1,-3],[-1,-10],[-1,-3],[-4,0],[-2,2],[-1,-4],[-4,-2],[-6,-4],[-3,1],[-3,2],[-2,-2],[-2,-6],[-3,0],[-3,3],[-2,3],[-3,-3],[-3,-4],[-2,-1],[-2,-4],[-3,1],[-1,6],[-2,1],[-3,-8],[1,-5],[-2,0],[-2,3],[-2,1],[-2,-3]],[[8173,6482],[-2,1],[-4,-1],[-1,-2]],[[8166,6480],[-3,1],[-2,4],[-2,8],[-3,4],[-1,3],[-1,6],[0,6],[1,3],[-3,-1],[-2,-3],[0,-6],[-3,-2],[0,-3],[3,-4],[0,-4],[3,-7],[0,-11],[1,-3],[0,-3],[-1,-5]],[[8153,6463],[-1,2],[-1,-3]],[[8151,6462],[-2,-1],[-4,-5],[-3,-1],[-2,7],[-2,-5],[-1,-10],[-2,-3],[-3,3],[-2,-2],[-4,-7],[-2,2],[-2,4],[0,4],[-2,1],[0,-3],[1,-7],[-1,-2],[-2,-1],[-3,1],[-2,2],[-5,3],[0,-4],[-2,-4],[-2,0],[-2,-3],[-1,-3],[-2,-3],[-6,-1],[-2,-3],[-6,0],[-3,1],[0,-4],[-3,-2],[-3,-1],[-4,-6],[-2,-4],[-3,1],[-1,6],[-1,-5],[0,-4],[-5,-8],[-1,-5],[0,-5],[5,-1],[1,-5],[-2,-2],[0,-3],[5,-9],[1,-3],[-2,-6],[-3,-4],[-6,-2],[-5,2],[-2,4],[1,2],[2,0],[-1,5],[-3,2],[-2,6],[1,5],[-2,8],[-2,2],[1,10],[-1,4],[3,6],[0,6],[4,3],[0,6],[-2,0],[-2,4],[-2,-2],[-3,9],[-2,1],[1,-9],[-3,-4],[-8,-3],[-2,1],[0,3],[1,3],[-1,3],[-2,2],[-7,0],[-1,1],[-4,10],[1,3],[-1,2],[-3,0],[0,-10],[1,-3],[0,-3],[-2,-1],[-3,5],[-2,-8],[-3,0],[-2,-2],[-3,-1]],[[7998,6422],[-5,8],[-1,1],[-3,-3],[-5,-1],[-1,3],[-2,-2],[-3,6],[-2,0],[-3,5],[-2,2],[0,3],[-4,4],[-4,2],[-1,-1],[-1,3],[0,15],[-2,3],[-1,3],[0,6],[1,4],[2,1],[2,3],[2,8],[-7,8],[-5,-3],[-3,1],[-2,4],[-3,2],[-2,0],[-1,-3],[-3,0],[-2,2],[-2,4],[-4,2],[-3,10],[-5,6],[-2,-4],[-6,-5],[-3,-3],[-1,-2],[-1,-5],[0,-6],[-3,-5],[-3,0],[-2,-1],[-4,-6],[-2,0],[-2,4],[0,2],[-2,0],[-3,-3],[-2,-10],[0,-2],[-2,-1],[-7,14],[-1,1],[-3,-10],[-1,-1],[-3,9],[-2,0],[-4,-9],[0,-3],[-2,-3],[-3,-3],[-3,5],[-1,3],[-3,4],[-3,3],[-4,3],[-2,-3],[-3,-9],[-1,-5],[-3,-5]],[[7836,6472],[-3,4],[-2,0],[-3,-3],[-3,6],[-2,-2],[-2,-8],[-2,-6],[1,-3],[0,-6],[1,-4],[3,-6],[1,-4],[0,-16],[-1,-8],[0,-5],[3,-5],[-3,-4],[-2,1],[-3,3],[-2,0],[-5,-3],[-1,1],[-1,5],[0,6],[-1,1],[1,7],[-2,3]],[[7808,6426],[0,10],[-2,0],[-6,-5],[-5,-9],[-4,-3],[-2,2],[-3,1],[-4,-2],[-2,2],[-1,3],[0,6],[-3,2],[-2,7],[1,5],[0,5],[-1,2],[-9,4],[-5,1],[-3,-1],[-3,2],[0,9],[1,5],[3,7],[0,11],[1,8],[4,8],[-1,5],[-4,3],[-3,0],[-5,2],[-5,3],[1,7],[-1,4],[0,3],[-2,5],[1,6],[-1,7],[-2,2],[-1,4],[0,7],[4,7],[0,2],[-7,-3],[0,1],[-6,2],[-4,-1],[-6,-3],[-5,-4],[-2,-3],[-3,-3],[-2,2],[0,4],[3,8],[1,6],[-1,5],[0,4],[-3,3],[-1,3],[0,8],[1,8],[4,4],[1,2],[-1,6],[0,3],[1,7],[2,6],[3,-1],[4,6],[1,4],[1,9],[1,1],[3,-1],[1,1],[2,5],[2,7],[2,2],[2,0],[1,2],[0,3],[-2,5],[0,6],[2,2],[1,3],[0,6],[1,8],[0,35],[-1,8],[0,14],[-1,8],[-1,2],[-3,3],[-3,-1],[0,-3],[-1,-3],[-2,1],[0,3],[-1,4],[-4,22],[0,5],[-5,10],[-1,3],[-3,0],[-2,3],[-2,5],[-1,1],[-2,-1],[-2,-4],[-1,-5],[-3,-7]],[[7702,6809],[-5,7],[-2,1],[-2,-1],[-6,1],[-3,5],[-2,1],[-5,-4],[-1,-2],[-2,1],[-1,3],[2,4],[-1,1],[2,5],[6,9],[-4,15],[0,2],[-3,-2],[-5,-7],[-1,1],[0,9],[1,2],[3,3],[2,3],[0,3],[-3,-1],[-1,1],[-2,7],[-1,2],[-2,1],[-9,-7],[-5,-6],[0,-4],[-1,0],[-2,-5],[-2,-1],[-2,1],[-3,3],[-11,4],[-2,7],[-2,1],[-4,-6],[-5,-4],[-3,-5],[-2,-5],[-3,-1],[0,-3],[-3,-6],[-6,-6],[-9,-2],[-3,-2],[-3,-8],[-1,-5],[-2,-4],[-4,-6],[-5,-4],[-2,-4],[1,-2],[0,-6],[-4,-4],[-1,-2],[-2,-1],[-4,0],[-1,1],[-2,-2],[-2,0],[-3,-4],[-2,-1],[-6,2],[-2,0]],[[7468,6757],[-2,2],[-2,4],[0,6],[2,14],[1,5],[-1,3],[0,5],[-6,5],[-1,0],[-2,-3],[-6,-4],[-4,-1],[-1,-1],[0,-3]],[[7446,6789],[-5,1],[-7,-4],[-1,-1],[-2,1],[-8,0],[-4,1],[-3,5],[-5,4],[-3,1],[0,3],[-1,2],[-4,-1],[-1,-7],[-3,-2],[-5,5],[-3,6],[-1,-2],[0,-5],[-1,-4],[-2,-1],[-2,4],[-2,9],[-2,5],[-2,3],[-8,0],[-8,2],[-1,3],[2,13],[-2,1],[-6,-3],[-2,0],[-2,2],[-2,4],[-5,5],[-1,3],[-3,4],[-3,3],[-2,14],[-1,3],[-5,4],[-4,-3],[-3,-3],[-2,0],[-4,7],[-3,8],[-3,7],[-2,3],[-4,0],[-5,4],[-10,15],[-7,7],[-3,5],[-2,10],[-11,4],[-7,-3],[-4,-14],[-2,-3],[-2,-1],[-2,4],[-1,4]],[[7249,6921],[-1,4],[-3,3],[-5,7],[-12,9],[-2,0],[1,7],[-2,6],[-2,-1],[-4,6],[0,1],[-4,4],[-3,0],[-3,-1],[-2,2]],[[7207,6968],[-4,7]],[[7203,6975],[-3,8],[-4,9],[-2,1],[-1,-5],[-3,0],[-1,-2],[-3,0],[1,8],[-1,2],[0,5],[2,3],[-2,3],[-1,4],[0,9],[1,6],[-2,2],[-5,11],[-1,5],[0,5],[-2,7],[1,3],[3,0],[5,2],[1,-2],[0,-4],[5,-8],[2,0],[2,2],[2,5],[2,1],[0,4],[1,8],[0,3],[-1,3],[0,8],[-3,4],[1,5],[0,4],[-3,7],[-5,8],[-1,4],[-1,9],[0,13],[-1,7],[0,5],[5,6],[2,4],[-2,5],[-2,2],[-2,4],[-3,3],[-4,3],[-5,3],[-2,2],[-1,7],[-4,21],[-2,7],[0,3],[1,10],[-4,-2],[-2,1],[-1,2]],[[7160,7228],[-6,-2],[-4,1],[-4,2],[-6,2],[-9,6]],[[7131,7237],[-4,4],[-1,3],[-1,6],[-1,0],[-3,-3],[-4,-1],[-3,1],[-1,7],[-1,2],[-4,2],[-1,4],[2,5],[0,16],[-2,8],[-2,3],[-1,3],[-3,3],[-3,1],[-4,-2],[-1,9],[-1,1],[-8,5],[-5,-2],[-3,3],[-5,2],[-2,-1]],[[7079,7328],[3,3],[2,3],[1,3],[0,3],[-3,5],[-3,4],[1,5],[0,7],[-1,1],[0,6],[-1,6],[-2,4],[0,10],[2,7],[-1,4],[-8,8],[-7,3],[-4,0],[-2,-3],[-1,-4],[-4,1],[-2,3],[-1,5],[-2,7],[0,4],[1,2],[2,1],[0,4],[-2,2],[-1,4],[-3,7],[1,4],[0,8]],[[7044,7455],[5,3],[2,2],[1,3],[-1,8],[-1,3],[0,3],[3,9],[1,4],[3,2],[4,1],[5,2],[5,8],[2,2],[4,1],[1,1],[-1,5],[1,4],[4,-3],[3,0],[4,2],[8,8],[1,-1],[1,-5],[1,-11],[1,-1],[5,0],[4,4],[2,1],[2,-1],[3,3],[2,-4],[4,5],[1,4],[2,4],[2,9],[0,2],[2,2],[3,10],[4,3],[6,-2],[3,1],[8,-2],[4,2],[2,2],[4,0],[5,1],[6,12],[0,3],[3,5],[3,2],[5,6],[11,9],[4,4],[2,0],[4,2],[8,5],[2,5],[1,1],[9,1],[1,1],[-1,5],[0,3]],[[7227,7613],[1,5],[-3,20],[3,10],[5,4],[3,1],[0,2],[-2,1],[-3,4],[1,3],[6,4],[4,-1],[1,3],[-2,7],[-2,4],[2,5],[-2,8],[-2,6],[-2,12],[-2,4],[-2,8],[0,13],[-1,7],[2,11],[0,3],[2,0],[0,4],[-3,1],[-3,2],[-7,0],[-2,1],[-2,4],[3,3],[3,4],[4,1],[12,6],[6,0],[5,2],[8,4],[10,6],[2,-2],[1,-5],[4,-4],[1,1],[4,1],[4,2],[2,-1],[4,-5],[2,2],[2,8],[0,8],[-1,1],[-4,1],[-3,3],[-1,3],[1,6],[5,19],[1,9],[4,13],[3,14],[5,19],[0,4],[1,9],[2,1],[3,-1],[7,-4],[5,-4],[5,-3],[6,-1],[5,1],[4,0],[5,-1],[4,0],[3,-8],[2,0],[7,7],[3,5],[4,0],[3,1],[2,2],[1,5],[2,4],[0,8],[-2,6],[0,4],[-2,20],[1,8],[2,9],[2,6],[2,4],[2,2],[6,0],[6,2],[3,2],[5,2],[3,7],[2,3],[1,10],[-1,4],[1,4],[3,5],[5,1],[5,0],[2,-1]],[[7424,8011],[3,-1],[4,3],[7,2]],[[7438,8015],[0,-5],[2,-4],[-2,-4],[-2,-1],[0,-2],[3,-5],[3,-2],[3,-3],[0,-2],[-3,-4],[1,-3],[9,-5],[3,-4],[3,-1],[1,-4],[0,-5],[7,-7],[3,-1],[3,-5],[4,-1],[4,2],[4,1],[3,-2],[3,-7],[3,-3],[3,1],[2,2],[2,0],[0,-2],[2,-6],[6,-5],[0,-3],[1,-3],[2,-3],[1,-5],[0,-5],[2,-6],[5,-12],[4,-3],[3,-12],[0,-5],[1,-4],[0,-4],[-1,-8],[-2,-4],[0,-3],[3,-13],[-2,-3],[-4,-8],[-3,-7],[-1,-7],[0,-5],[3,-6],[0,-2],[3,-10],[1,-1],[1,2],[3,0],[7,-6],[4,0],[4,-2],[4,-1],[8,0],[4,-2],[7,-1],[4,0],[6,1],[14,-3],[6,-2],[4,-2],[3,-4],[3,-7],[3,-2],[6,-2],[5,-7],[4,-3],[6,-7],[4,-3],[5,-2],[8,1],[1,-1],[-1,-4],[0,-9],[1,-2],[3,-1],[3,-8],[3,-11],[4,-16],[0,-6],[2,-4],[5,-6],[2,-5],[4,-5],[1,-5],[0,-6],[1,-1],[13,2],[10,2],[14,-3],[15,-3],[13,-3],[21,-4],[8,4],[6,2],[3,0],[19,-5],[9,-2],[6,-1],[7,0],[3,-2],[8,-16],[5,-3],[12,-4],[6,-3],[8,-2],[5,-4],[5,-5],[8,-6],[16,6],[5,1],[0,-12],[10,-1],[4,-3],[2,1],[4,7],[3,2],[6,5],[9,8],[19,13],[4,3],[6,2],[5,1],[6,2],[13,3],[8,1],[3,1],[5,0],[10,-2],[12,2],[6,0],[3,1],[11,8],[6,3],[9,7],[2,4],[5,8],[2,5],[4,7],[4,9],[5,3],[8,4],[5,5],[3,6],[3,1],[2,2],[0,6],[-3,7],[-4,6],[-5,9],[0,4],[-2,3],[-1,3],[0,3],[3,5],[0,3],[1,6],[2,9],[4,8],[4,6],[4,1],[2,-1],[8,0],[3,-3],[2,-6],[3,-1],[10,-5],[4,-1],[3,0],[8,-2],[2,1],[2,3],[5,5],[5,4],[2,4],[7,9],[2,4],[0,2],[2,5],[2,1],[3,0],[5,-2],[14,2],[3,2],[4,1],[7,9],[3,3],[2,1],[4,6],[-1,3],[1,7],[5,11],[2,3],[2,5],[3,1],[3,4],[10,-2],[3,0],[3,2],[0,3],[1,6],[1,3],[3,0],[3,-4],[4,1],[3,4],[4,3],[7,3],[3,-1],[9,0],[1,3],[2,1],[9,-7],[4,-2],[4,1],[4,-1],[3,0],[4,4],[1,3],[0,7],[-4,10],[0,4],[-1,3],[-5,6],[-4,7],[-2,2],[-1,4],[-3,3],[-2,5],[0,2],[-2,2],[-7,4],[-6,11],[-2,2],[-7,1],[-2,2],[-5,-2],[-4,0],[-2,-1],[-3,-4],[-3,-6],[-3,-4],[-2,-4],[-2,0],[-6,8],[-5,3],[-4,1],[-7,-2],[-4,0],[-1,1],[-3,0],[-4,-4],[-2,-5],[-3,-1],[-2,3],[-3,3],[-3,5],[-1,4],[-1,11],[3,3],[4,3],[0,12],[1,7],[4,7],[2,5],[0,3],[2,6],[1,6],[3,7],[4,14],[5,16],[3,8]],[[8240,8053],[6,-5],[9,-6],[7,-1],[6,-5],[5,-1],[9,11],[7,8],[8,7],[7,1],[4,2],[3,3],[2,5],[1,7],[-1,5],[-3,1],[-1,2],[2,4],[1,5],[2,4],[3,4],[1,4],[0,5],[2,5],[5,9],[0,4],[6,14],[3,10],[5,7],[7,8],[5,7],[2,7],[0,6],[-3,6],[0,5],[1,6],[-1,4],[-4,3],[-4,1],[-5,-2],[-3,2],[-1,5],[2,4],[3,3],[6,7],[8,12],[7,6],[12,2],[9,4],[10,4],[7,2],[5,-2],[6,1],[12,4],[4,1],[7,-2],[1,1],[4,-2],[7,-6],[4,-2],[4,-1],[2,-4],[3,-3],[5,-1],[7,-5],[0,3],[5,2],[4,-2],[6,-5],[6,-3],[1,-2],[0,-4],[1,-2],[4,-1],[2,-4],[3,-4],[0,-4],[-1,-3],[1,-3],[3,-1],[1,-4],[4,-7],[0,-3],[2,-5],[3,-17],[4,-8],[1,-5],[0,-8],[3,-3],[1,-5],[0,-9],[2,-5],[0,-4],[3,-7],[5,-9],[3,-7],[1,-5],[0,-4],[-1,-3],[0,-3],[1,-1],[0,-5],[1,-3],[6,-5],[-3,-13],[0,-6],[2,-4],[4,-5],[0,-3],[3,-3],[5,-3],[7,0],[8,2],[5,0],[2,-1],[0,-5],[1,-2],[6,-2],[2,-4],[2,2],[4,-2],[2,2],[3,0],[2,-6],[3,0],[3,-5],[7,-13],[4,-5],[5,-1],[5,0],[2,-5],[-2,-6],[0,-4],[3,-7],[2,-3],[2,-5],[0,-5],[-2,-8],[0,-6],[3,-5],[2,-5],[1,-5],[0,-3],[2,-1],[8,2],[4,0],[3,-2],[6,0],[10,2],[10,0],[2,3],[2,7],[2,3],[2,0],[3,2],[4,5],[3,2],[9,0],[3,2],[3,4],[4,4],[13,6],[1,-1],[7,-2],[3,-7],[-1,-5],[-2,-6],[0,-2],[3,-10],[2,-5],[-2,-6],[-3,-5],[-1,-3],[-2,-2],[-3,0],[-4,-5],[-2,-6],[1,-3],[0,-4],[-1,-4],[-2,-5],[-2,-15],[-1,-6],[-3,-6],[1,-4],[0,-6],[-1,-1],[0,-4],[-3,-3],[-1,-3],[0,-4],[-1,-4],[-2,-5],[-3,-2],[0,-4],[-1,-3],[0,-6],[-1,-3],[-3,-3],[-2,0],[-2,-3],[-2,-10],[0,-11],[-3,-3],[-2,-3],[-2,2],[-4,1],[-1,1],[-9,3],[-5,3],[-5,2],[-4,5],[-3,-5],[-2,-2],[-2,-7],[-4,-6],[-5,-2],[-1,-1],[-6,-2],[-1,-5],[1,-3],[2,-9],[1,-7],[4,-23],[-2,-4],[-1,-17],[1,-3],[0,-10],[2,-3],[0,-3],[-2,-7],[-1,-7],[-2,-6],[0,-4],[-1,-4],[-3,-3],[-4,1],[-6,-3],[-4,-3],[-1,-3],[3,-2],[2,-3],[0,-3],[-2,-2]],[[4913,5479],[0,-3]],[[4913,5476],[-4,2],[1,2],[3,-1]],[[4924,5729],[0,-10],[1,-1],[-1,-4],[-1,-6],[0,-4],[1,-1],[1,-4],[1,-7],[1,-3],[2,-33],[-1,-2],[-2,-1],[0,-2],[1,-2],[-2,-4],[-4,-7],[-1,-4],[0,-3],[-1,-5],[-2,-13],[-1,-11],[0,-4],[-1,-2],[0,-3],[-4,-10],[-2,-8],[0,-21],[4,-20],[2,-17],[1,-5],[0,-2],[1,-2],[4,-1],[1,-11],[0,-10],[-1,-4],[0,-2],[-2,0],[-2,-2],[-2,1]],[[4915,5479],[-4,4],[0,8],[-1,1],[-1,-1],[-2,-10],[-1,-2],[-15,5],[-3,4],[-3,1],[-7,0],[-5,-2],[-2,-2],[15,1],[1,-1],[-17,-4],[-7,-2],[-2,1],[-2,3],[-7,0],[1,-3],[4,1],[1,-2],[-14,-3],[-9,-4],[-4,-3],[-14,-11],[-8,-6],[-2,-2],[-4,-5],[-5,-3],[-5,-7],[-4,-1]],[[4789,5434],[0,13],[-1,14],[0,5],[1,6],[0,4],[2,3],[0,6],[2,5],[0,19],[-1,11],[-2,0],[-3,4],[-3,0],[-2,3],[0,4],[-1,2],[0,5],[-1,4],[-3,3],[-2,1],[-2,-1],[-4,2],[-2,2],[-1,4],[-2,3],[-1,-1],[-3,2],[0,1],[6,11],[2,6],[0,10],[1,6],[-4,19],[0,6],[-2,3]],[[4763,5619],[2,2],[2,0],[3,-2],[1,1],[3,10],[0,4],[-1,2],[2,7],[2,6],[-2,5],[-1,0],[-3,3],[-1,2],[0,11],[1,2],[4,1],[5,-2],[2,0],[2,-5],[1,0],[1,2],[-1,8],[0,5],[-2,5],[-5,3],[0,6],[1,6],[1,2],[3,3],[-2,4],[-2,3],[1,6],[0,7],[-2,-1],[-2,0],[-2,1],[-1,4],[0,22],[-1,6],[1,3],[2,2],[2,6]],[[4777,5769],[3,1],[2,3],[2,6],[2,5],[4,0],[1,1],[1,-4],[1,-2],[1,0],[0,-5],[6,-2],[2,-1],[1,-3],[2,0],[1,3],[-1,3],[0,3],[1,2],[3,1],[2,0],[2,-1],[1,3],[-1,7],[0,4],[1,4],[3,-4],[4,-2],[-1,6],[2,2],[3,2],[1,-7],[0,-7],[1,-6],[-1,-3],[0,-4],[3,-3],[2,0],[2,2],[2,4],[0,3],[2,2],[4,2],[4,1],[1,-1]],[[5448,5314],[0,-4],[-2,-5],[-1,-5],[2,-13],[0,-5],[-2,-2],[-2,5],[-3,3],[-4,6],[-4,2],[-5,0],[-2,-1],[-2,2],[-3,4],[-2,-2],[-5,0],[0,3],[-1,1],[-3,0],[-1,2],[-2,1],[-2,4],[-3,-3],[-5,1],[-14,0],[-14,0]],[[5368,5308],[0,3],[-2,2],[-15,0],[-4,2],[-5,1],[-5,-1],[-6,0],[-11,1],[-6,0],[0,-8]],[[5314,5308],[-15,0],[-14,0],[-9,0],[-4,4],[0,4],[-1,0]],[[5271,5316],[1,14],[1,11],[2,20],[-1,9],[-1,4],[-5,13],[2,5],[-3,-1],[-1,5],[-2,6],[1,1],[1,3],[4,-1],[-3,7],[0,2],[-1,1],[-2,0],[-1,-1],[-1,-4],[-1,-1],[-2,0],[-1,1],[-2,4],[-4,2],[-3,3],[-1,8],[-1,3],[0,4],[-1,5],[1,7],[-1,1],[-4,0],[-1,4],[-1,1],[0,-7],[-1,-2],[-2,1],[-1,3],[0,2],[1,8]],[[5237,5457],[0,5],[2,5],[2,7],[2,9],[2,15],[1,10],[1,8],[2,8],[2,5],[5,11],[3,7],[6,9],[2,4],[2,6],[2,7],[2,2],[8,11],[0,-2],[1,-4],[3,-1],[3,0],[2,1],[1,2],[1,7],[2,1],[3,-4],[6,-12],[2,-3],[0,-2],[2,-11],[0,-3],[2,-1],[5,3],[4,6],[1,4],[1,2],[0,9],[6,12],[2,3],[0,1],[-2,8],[2,8],[5,10],[0,8],[4,13],[2,16],[0,3],[2,8],[3,10],[4,2],[5,7],[2,8],[0,8],[1,9],[2,14],[3,4],[5,4],[0,5],[1,10],[0,8],[1,4],[4,8],[1,12],[2,13],[5,16],[5,15],[2,4],[2,2],[3,0],[1,1],[6,8],[3,3],[2,5],[0,3],[-1,8],[1,6],[1,9],[0,9],[-1,4],[-2,5],[-3,2],[-4,1],[-2,2],[0,8],[-1,5],[-2,27]],[[5390,5937],[5,0],[6,-4],[1,-2],[1,-9],[2,-5],[4,-5],[2,-9],[1,-13],[2,-8],[1,-1],[2,-12],[1,-3],[0,-12],[1,-6],[-2,-10],[0,-6],[-1,-9],[2,-15],[1,-11],[2,-10],[2,-7],[4,-8],[3,-8],[4,-4],[-3,-3],[-6,0],[-4,1],[-2,0],[-1,-1],[-7,-1],[-13,2],[-3,0],[-3,-4],[-5,-12],[1,-6],[2,-4],[6,-14],[1,-5],[6,-10],[6,-11],[3,-2],[3,-5],[4,-9],[4,-13],[2,-14],[3,-13],[1,-3],[2,-1],[0,-7],[-2,-8]],[[5856,5384],[1,-1],[0,-3],[-2,-8],[-1,-6],[-1,-8],[3,-6],[0,-5],[-2,-9],[-1,-9],[-1,-4],[3,-3],[4,0],[3,-7],[2,0],[1,-1],[0,-2],[2,-2],[1,-3],[-1,-3],[0,-3],[-9,-21],[-12,-25],[-5,-3],[-2,-5],[-2,-8],[-3,-6],[-4,-4],[0,-17],[-4,-19],[-1,-1],[-1,-3],[0,-9],[-1,-3],[-1,-19],[0,-6],[-1,-9],[0,-11],[-1,-5],[0,-8],[1,-14],[-1,-2]],[[5820,5103],[-3,-4],[-1,-3],[-2,0],[-4,-12],[-2,-5],[0,-10],[1,-8],[-1,-4],[-1,-2],[-5,-8],[-1,-2],[0,-9],[1,-4],[0,-3],[3,-2]],[[5816,4927],[0,-3],[-2,-19],[-1,-4],[3,-16],[2,-8],[0,-5],[2,-5],[1,-9],[0,-7],[-3,-11],[0,-4],[1,-8],[0,-8],[2,-5],[3,-13],[3,-4],[4,-7],[6,-9],[1,-4],[5,-17],[1,-7],[2,-10],[2,-9],[2,-11],[2,-8],[1,-5]],[[5853,4711],[-5,-1],[-7,-2],[-7,-3],[-8,-2],[-8,-3],[-8,-2],[-6,-2],[-2,-1],[1,-6],[-1,-7],[-1,-5],[-2,-6],[-3,-7],[-8,-12],[0,-3],[4,-13],[2,-19],[0,-33],[1,-8],[-1,-7],[-2,-8],[-1,-7],[-1,-11],[-3,-21],[0,-5],[1,-3],[2,-11],[3,-6],[5,-8],[6,-12],[2,-5],[4,-1],[4,-2],[2,-2],[2,1],[0,9],[2,3],[4,1],[1,2],[2,0],[0,-39],[0,-32],[-1,-3],[-1,-1],[-3,5],[0,4],[-1,3],[-3,-1],[-6,-6],[-2,-1],[-2,0],[-3,1],[-2,4],[-2,11],[-4,11],[-2,4],[-3,1],[-1,5],[-1,7],[-2,6],[-1,2],[-4,3],[-4,4],[-6,5],[-3,0],[-3,1],[-2,2],[-1,2],[-2,7],[-1,7],[-5,10],[-2,10],[-2,1],[-2,-2],[0,-3],[-2,-9],[0,-4],[-2,-3],[-5,-2],[-3,1],[-5,1],[-2,1],[-7,2],[-2,0],[-3,2],[-2,2],[-6,5],[-3,-1],[-5,8],[-1,4],[-1,8],[0,5],[1,5],[-1,1],[-2,-1],[-4,-1],[-5,-3],[-6,-3],[-4,-5],[-1,0],[-3,2],[-1,2],[2,7],[-1,7],[-2,4],[-3,2],[-2,0],[0,4],[-1,4],[-3,1]],[[5362,4845],[-2,2],[-4,-1],[-2,-1],[-3,-5],[-4,-3],[-3,1],[-3,6],[-3,8]],[[5362,4916],[1,2],[1,0],[2,-6],[5,-7],[1,0],[1,2],[2,2],[3,2],[1,2],[1,4],[0,10],[2,1],[3,-3],[1,0],[3,4],[3,1],[6,6],[2,-7],[0,-2],[-1,-3],[-1,-5],[1,-5],[0,-9],[2,-2],[2,1],[2,-2],[3,0],[5,10],[6,14],[4,9],[4,4],[2,4],[1,5],[2,3],[5,3],[3,3],[3,9],[4,18],[2,15],[0,42],[0,17],[6,12],[3,7],[3,8],[4,19],[3,9],[2,5],[4,4],[5,4],[7,13],[6,13],[-1,15],[2,13],[3,17],[1,17],[-1,19],[0,15],[3,17],[2,7],[0,27],[4,23],[3,14],[5,16],[1,9],[2,13],[0,10]],[[5760,5478],[1,-4],[2,-5],[4,-7],[2,-3],[1,-5],[2,-6],[4,-4],[1,-3],[5,-7],[2,0],[3,-2],[2,0],[5,8],[3,3],[6,-1],[6,-6],[2,0],[4,6],[3,7],[2,1],[3,-3],[3,-6],[3,-8],[1,-4],[3,-5],[5,-11],[6,-6],[2,-3],[2,-6],[0,-4],[1,-2],[1,1],[2,0],[1,-1],[3,-8]],[[5333,4895],[-1,1],[-3,7],[-2,6],[0,3],[-1,2],[0,6],[-3,8],[-8,13],[0,4],[-7,13]],[[5308,4958],[3,13],[2,3],[6,7],[0,-1],[5,-9],[1,-1],[1,1],[2,-1],[1,2],[0,2],[-1,3],[0,3],[1,3],[0,3],[1,4],[0,2],[-1,2],[-3,3],[-2,3],[0,7],[2,3],[0,1],[-2,3],[-2,5],[-3,1],[2,9],[0,19],[2,-1],[2,-2],[4,3],[2,0],[1,-2],[2,-2],[11,5],[0,5],[1,4],[0,4],[-2,7],[0,3],[1,2],[4,4],[1,0],[2,-2],[2,-4],[2,-8],[2,-6],[2,-8],[4,-3],[6,-2],[3,0],[7,12],[0,3],[2,-1],[1,-7],[2,-5],[-1,-4],[1,-2],[3,-1],[2,1],[1,3],[2,4],[0,3],[-1,2],[0,3],[1,2],[2,6],[0,4],[1,3],[3,3],[1,11],[-1,3],[0,4],[1,3],[1,7],[-1,10],[0,8],[-1,7],[2,21],[0,2],[-1,3],[-2,3],[-4,3],[-2,3],[-1,4],[-1,2],[-5,1],[-1,3],[0,6],[1,10],[0,12],[1,4],[3,4],[1,6],[4,1],[2,2],[1,2],[0,3],[3,8],[0,5],[-1,6],[-3,7],[-1,11],[-2,3],[-3,2],[-6,1],[-4,-2],[-5,-4],[-7,-4],[-2,0],[-1,2],[1,1],[1,4],[-2,10],[0,14],[1,8],[2,10],[0,4]],[[562,3959],[-3,2],[1,2],[2,-1],[0,-3]],[[2829,5330],[-2,1],[0,3],[1,2],[1,-1],[0,-5]],[[3018,5867],[-2,-3],[-4,-3],[-5,-2],[-7,-4],[-1,-3],[-7,-24],[-5,-5],[-2,-3],[-2,-4],[-3,-9],[-1,-6],[-4,-13],[-2,-17],[-1,-10],[-1,-14],[-1,-7],[-2,-6],[-3,-7],[-2,-7],[-1,-5],[-1,-2],[1,-2],[4,2],[4,4],[1,-1],[2,-7],[3,0],[1,-1],[2,-15],[2,-13],[7,-14],[0,-5],[1,-8],[0,-4],[-1,-2],[-1,-5],[-1,-9],[0,-16],[2,-7],[5,-2],[2,-7],[2,-9],[2,-4],[3,-2],[2,1],[6,1],[4,0],[7,-2],[6,0],[5,5],[2,1],[3,-1],[3,-2],[4,-4],[3,-2],[4,1],[1,-1],[5,-14],[5,-12],[8,-20],[1,-1],[3,1],[1,-2],[2,1],[3,4],[4,0],[6,-2],[7,0],[9,2],[6,3],[2,3],[4,-1],[4,-2],[3,-4],[0,-3],[1,-6],[-1,-5],[-3,-6],[-1,-7],[-1,-9],[-1,-6],[-3,-4],[-1,-6],[1,-8],[-1,-12],[-1,-15],[0,-9],[2,-7],[0,-11],[2,-6],[3,-19],[2,-2],[1,-2],[5,-16],[0,-4],[-1,-1],[-4,-8],[-10,-19],[0,-4],[3,2],[3,-1],[2,-2],[0,-5],[3,-2],[4,-10],[3,-5],[1,-3],[-1,-4],[1,-7],[2,-6],[-1,-3],[2,-3],[2,-15],[1,-5],[0,-2],[2,-11],[0,-4],[1,-4]],[[3056,4939],[-2,5],[-2,4],[-2,2],[-1,3],[-1,7],[-2,2],[-1,2],[-4,-4],[-6,5],[-1,0],[3,11],[6,18],[4,11],[4,13],[2,7],[0,3],[-1,2],[-2,1],[-2,2],[-1,3],[-4,4],[-3,2],[-1,2],[-2,1],[-2,3],[-6,8],[-1,0],[-4,-2],[-2,-4],[-3,-1],[-3,0],[-1,2],[-2,1],[-2,3],[-3,3],[-3,1],[-5,-10],[-2,0],[-3,-3],[-2,-1],[-2,0],[-3,-2],[-3,2],[-3,3],[-1,-1],[-4,-2],[-4,0],[-1,4],[-5,3],[0,7],[1,4],[-1,5],[-1,7],[0,3],[-2,3],[-2,0],[-3,2],[-2,6],[1,6],[-1,5],[-2,3],[-2,8],[-2,2],[-2,0],[-2,1],[-1,4],[-2,2],[-2,4],[-5,3],[-1,3],[-2,4],[1,3],[-1,2],[-1,4],[-1,7],[-1,3],[-2,3],[-2,6],[-3,2],[-1,2],[-2,6],[-4,0],[-1,2],[-4,6],[-2,1],[-2,-4]],[[2908,5177],[-5,4],[-4,6],[-5,1],[-3,4],[-2,6],[-3,5],[-5,6],[-2,0],[-2,-2],[0,-2],[-1,-4],[0,-3],[-2,-1],[-3,0],[-2,2],[-2,-2],[-4,2],[-3,1],[-3,4],[-1,-1],[-4,1],[-3,2],[0,2],[-2,12],[-5,5],[0,3],[-1,4],[-4,-1],[-5,4],[-4,4],[-4,5],[-6,8],[-2,3],[-2,2],[-2,5],[-2,4],[-1,1]],[[2809,5267],[-1,4],[-4,6],[2,7],[5,6],[6,-5],[0,9],[-2,8],[0,14],[1,3],[2,4],[2,3],[3,-1],[1,3],[5,-1],[2,1],[2,3],[2,8],[1,1],[2,0],[1,4],[3,5],[0,2],[-1,7],[4,2],[2,10],[2,6],[1,0],[1,7],[3,7],[4,19],[-2,-3],[-2,0],[-1,2],[0,9],[-3,-6],[-2,6],[0,4],[1,4],[0,3],[-3,-2],[0,2],[2,3],[1,3],[2,3],[0,4],[1,7],[0,11],[-1,3],[-1,14],[0,14],[-1,5],[-4,7],[6,8],[2,6],[-2,13],[-4,10],[0,6],[2,0],[1,13],[0,4],[-2,7],[-2,0],[-2,8],[-2,2],[-1,5],[-3,10],[-3,6]],[[2835,5600],[2,12],[2,2],[1,3],[-1,8],[0,2],[2,-1],[2,-7],[1,-1],[1,1],[6,8],[-1,3],[2,9],[2,1],[1,2],[-1,4],[-4,18],[-1,5],[-2,4],[2,8],[1,1]],[[2850,5682],[1,-1],[2,-8],[4,-6],[4,-8],[1,-6],[2,-4],[0,-1],[-2,-5],[2,-4],[2,1],[1,4],[0,18],[-2,9],[-2,6],[0,3],[3,1],[3,3],[11,17],[4,16],[3,6],[4,4],[4,-1],[3,2],[1,5],[-1,7],[-1,4],[1,6],[1,9],[0,8],[2,4],[-1,2],[-2,-4],[-1,2],[3,7],[2,12],[1,4],[5,7],[1,3],[3,5],[6,11],[2,3],[11,-7],[3,1],[0,-2],[-2,0],[-2,-2],[-1,-4],[2,-4],[2,-2],[1,3],[1,8],[3,9],[0,9],[2,3],[2,1],[4,-1],[3,-2],[4,0],[10,1],[16,24],[8,5],[5,5],[3,10],[0,7],[3,3],[2,0],[1,2],[0,2],[6,7],[6,0],[7,-5],[3,-10],[0,-7],[-4,-7],[-1,-3]],[[6215,4474],[-3,-2],[-1,4],[0,2],[2,-1],[2,-3]],[[6234,4487],[2,-8],[0,-6],[-1,-1],[-1,1],[-2,5],[-5,4],[2,1],[1,-1],[2,1],[0,2],[1,2],[1,0]],[[6206,4498],[0,-1],[-4,4],[-2,5],[0,19],[1,2],[2,1],[1,-2],[0,-12],[2,-8],[1,-6],[-1,-2]],[[4324,6039],[-2,-2],[-2,1],[-2,5],[1,3],[3,3],[1,-1],[1,-5],[0,-4]],[[4355,6055],[-1,0],[-1,3],[0,4],[1,4],[2,0],[1,-3],[0,-6],[-2,-2]],[[4348,6048],[-2,-6],[-4,1],[-4,9],[0,5],[1,4],[0,5],[2,0],[0,-3],[4,-8],[3,-7]],[[4362,6119],[3,-2],[2,1],[2,-3],[0,-4],[-1,-4],[-3,-3],[-2,0],[-2,3],[2,6],[-1,6]],[[4330,6141],[1,-3],[-1,-1],[-4,2],[-1,-1],[-2,-5],[-2,7],[0,3],[1,1],[3,-2],[5,-1]],[[4363,6143],[-1,-3],[-1,4],[-1,7],[2,2],[1,0],[0,-10]],[[4308,6152],[-4,-1],[-2,2],[1,2],[3,3],[2,-4],[0,-2]],[[4300,6159],[-3,-1],[-1,1],[0,4],[-1,3],[0,2],[6,6],[3,-1],[1,-5],[-1,-3],[-4,-6]],[[2706,5735],[0,-1],[-2,-2],[0,-1],[-3,2],[-2,3],[-1,-1],[0,-4],[-1,-2],[-2,-1],[0,-23],[2,0],[3,-4],[1,-2],[0,-3],[-4,-6],[-1,-3],[2,-6],[0,-11],[-5,-6],[0,-2],[2,-3],[2,-7],[0,-4]],[[2697,5648],[-2,7],[-2,6],[-3,3],[0,9],[-1,5],[-3,4],[-3,3],[-2,0],[1,-5],[4,-9],[0,-4],[-3,1],[-4,2],[-2,2],[-4,7],[3,7],[1,4],[0,9],[-1,5],[-7,14],[-6,6],[-3,4],[-8,4],[-2,2],[-3,8],[1,5],[-2,6],[-9,13],[-4,5],[-2,3],[1,-9],[2,-5],[7,-7],[0,-4],[-3,-7],[-2,-2],[0,-4],[-1,-1],[-6,13],[-8,6],[-2,3],[-3,10],[-1,9],[0,6],[4,10],[1,4],[-1,2],[1,4],[-2,3],[-3,3],[-2,3],[0,1],[4,4],[0,4]],[[2617,5820],[2,2],[1,4],[1,2],[1,0],[1,-2],[5,-3],[5,-4],[8,-5],[3,3],[2,3],[2,0],[4,-4],[3,-1],[1,1],[3,-5],[1,-3],[0,-3],[1,-1],[2,0],[5,-2],[3,0],[3,3],[1,2],[1,5]],[[2676,5812],[1,-2],[0,-4],[1,-4],[3,-16],[3,-9],[6,-15],[3,-3],[4,-13],[2,-2],[1,-4],[5,-3],[1,-2]],[[2706,6426],[-8,-8],[-3,0],[-3,2],[-2,3],[-1,4],[4,-2],[1,2],[-3,11],[3,9],[8,-3],[4,-15],[0,-3]],[[2842,6448],[-1,-2],[-4,4],[-2,3],[0,3],[8,-2],[-1,-6]],[[2836,6458],[-4,2],[-1,2],[2,2],[3,-1],[1,-4],[-1,-1]],[[2832,6467],[-1,-1],[-1,2],[-2,1],[-2,3],[-1,3],[2,1],[3,-3],[1,-5],[1,-1]],[[2815,6482],[4,-1],[1,1],[3,-1],[2,-4],[-2,-1],[-2,1],[-4,0],[-4,4],[2,1]],[[2795,6489],[0,-2],[-5,4],[-2,5],[1,1],[6,-8]],[[2726,6517],[7,-2],[6,1],[3,1],[0,-2],[2,-4],[5,2],[10,1],[3,-5],[5,-4],[3,-1],[2,1],[3,0],[3,-4],[4,1],[-1,-4],[5,-5],[4,-9],[2,-4],[5,-6],[3,-1],[9,0],[4,-2],[0,1],[16,-15],[4,-8],[3,-4],[9,-8],[2,1],[-3,5],[0,1],[3,-1],[5,-9],[4,-4],[-1,-3],[-5,1],[3,-4],[0,-3],[2,-1],[1,4],[2,3],[4,-8],[3,-3],[-1,-4],[4,2],[2,-5],[5,0],[6,-3],[5,-5],[5,-2],[5,0],[2,-3],[1,-3],[-2,-6],[2,-3],[-4,-2],[0,-4],[1,-2],[2,2],[3,-1],[5,-1],[4,0],[7,-2],[2,-1],[6,-8],[4,-8],[4,-3],[4,0],[2,-2],[1,-3],[-1,-4],[-2,-5],[-5,0],[-6,-1],[-9,-6],[-1,-2],[-3,-1],[-2,3],[-1,-2],[-2,-2],[-7,0],[-6,4],[-11,2],[-3,0],[-7,-2],[-8,-1],[-3,-1],[-3,-2],[-6,0],[-7,-2],[-7,0],[5,13],[9,13],[2,2],[2,6],[-3,7],[-1,4],[-3,2],[-4,1],[-3,0],[-7,1],[-4,0],[-4,3],[-5,10],[-3,2],[-2,5],[-1,14],[-1,7],[-2,6],[-5,6],[-10,-4],[-3,0],[-2,2],[-16,9],[-6,5],[-5,6],[-2,5],[-2,3],[-1,-1],[-13,0],[-3,2],[-3,6],[-1,-3],[-4,-3],[-2,5],[-10,1],[-5,5],[-3,6],[3,2],[6,2],[2,4],[0,4],[-1,2],[-5,3],[-23,0],[-3,-5],[-5,-5],[-3,-7],[-2,-2],[-5,-8],[-3,-2],[-3,1],[-1,-1],[-7,-1],[-2,-4],[-1,-7],[-1,-2],[-6,-2],[-6,-7],[-1,0],[0,8],[-2,1],[-2,-1],[-4,-5],[-3,1],[1,2],[10,9],[2,-1],[2,1],[1,2],[-2,10],[1,7],[2,6],[7,11],[22,17],[2,1],[14,4],[2,1],[7,5],[7,2],[7,-2]],[[3089,5878],[-1,-1],[-5,6],[-5,9],[0,4],[1,0],[1,-2],[2,-6],[5,-4],[2,-6]],[[2739,6298],[2,-1],[0,2],[5,-1],[0,-3],[-3,0],[-2,-2],[-3,1],[1,4]],[[2778,6318],[-2,0],[-2,-2],[0,2],[1,1],[3,0],[0,-1]],[[5943,7203],[-3,2],[-2,-3],[-4,-2],[-1,1],[-3,0],[-1,-2],[-1,1],[0,5],[-2,4],[-1,-1],[-3,0],[-1,1],[-3,-1],[-5,-4],[-1,0],[-4,4],[0,1]],[[5908,7209],[1,-1],[3,2],[2,5],[0,7],[5,-2],[5,-1],[4,0],[4,1],[13,7],[4,4],[6,4],[1,-2],[-14,-17],[-1,-5],[0,-4],[2,-4]],[[5943,7203],[2,-4],[-7,-2],[-3,1],[-5,-10],[-3,-3],[-3,-2],[-7,-2],[-1,-3],[0,-4],[-2,1],[-2,5],[-5,-1],[-5,3],[-3,4],[-2,11],[-1,7],[3,-2],[2,2],[2,4],[3,2],[2,-1]],[[5522,8035],[-2,-1],[-4,0],[-6,-6],[-1,-3],[-6,-5],[-1,-4],[0,-4],[-1,-3],[-4,-3],[-1,-2],[-4,-5],[-3,-2],[-4,-1],[-6,1],[-3,1],[-3,-5],[-3,-10]],[[5383,7992],[-4,7],[-4,4],[-3,0],[-1,3],[-3,5],[-2,1],[-2,3],[-3,6],[-3,4],[-3,0],[-4,4],[-3,10],[-2,3],[-2,5],[-1,1],[4,8],[-2,5],[-5,5],[-2,3],[-3,10],[1,2],[3,-4],[1,-3],[1,1],[1,4],[3,4],[3,3],[2,0],[4,2],[5,-1],[2,4],[4,2],[2,3],[3,2],[3,1],[3,5],[4,0],[11,7],[2,2],[5,2],[0,1],[-3,3],[1,4],[6,-2],[2,-5],[1,0],[0,-4],[4,-2],[1,3]],[[5410,8113],[3,0],[2,1],[0,8],[8,-4],[0,-4],[2,-4],[4,-1],[5,-3],[2,0],[4,-4],[2,0],[2,-4],[1,1],[6,2],[4,-4],[-1,-4],[-3,-2],[-2,-3],[2,-3],[6,-7],[3,-8],[2,-1],[2,1],[1,2],[3,3],[3,2],[-2,6],[-1,5],[7,-3],[8,-7],[4,0],[4,3],[1,-4],[-1,-3],[-3,-2],[6,-10],[4,1],[2,2],[5,-4],[2,-3],[2,1],[4,-1],[2,-2],[0,-7],[6,-8],[1,-6]],[[5394,8291],[-1,-2],[1,-3]],[[5394,8286],[-5,0],[-3,1],[-1,3],[1,3],[-3,4],[0,4],[6,-5],[5,-5]],[[5312,8318],[-4,0],[-2,2],[1,4],[4,-2],[1,-4]],[[5380,8316],[0,-6],[-3,3],[-4,0],[-1,-5],[-2,0],[-5,4],[-1,4],[1,9],[2,2],[0,3],[2,4],[3,0],[2,-5],[4,-2],[1,-3],[-3,-4],[1,-2],[3,-2]],[[5238,8335],[-2,-2],[-2,0],[-2,2],[2,2],[3,0],[1,-2]],[[5395,8278],[1,-6],[0,-4],[3,-16],[0,-5],[-1,-5],[-2,-4],[-3,-3],[-2,-6],[4,-6],[7,-7],[3,-7],[-2,-10],[2,-5],[2,-1],[0,-8],[2,-2],[-2,-7],[0,-3],[-2,-4],[0,-4],[3,-6],[0,-8],[5,-3],[3,-13],[-1,-9],[-5,-13]],[[5211,7925],[-2,0],[-1,4],[0,6],[2,8],[0,9],[1,5],[4,15],[1,8],[1,5],[8,13],[0,6],[-9,4],[-6,1],[-4,5],[-7,-2],[-2,1],[-3,0],[-1,3],[-3,2],[-3,-4],[-1,1],[-3,7],[-3,6],[-2,3],[-3,1]],[[5175,8032],[0,3],[1,5],[2,5],[1,1],[0,6],[-4,2],[-4,4],[-2,4],[0,8]],[[5165,8106],[2,9],[-1,3],[-4,3],[0,2],[2,0],[5,6],[-1,2],[0,3],[3,10],[0,5],[-3,6],[-1,4],[-3,6],[0,2],[6,5],[6,-3],[4,1],[6,3],[2,4],[-3,5],[8,8],[1,4],[0,6],[-1,4],[-4,0],[-3,1],[-1,2],[0,6],[1,2],[8,0],[0,1],[4,18],[1,2],[0,16]],[[5199,8252],[-1,3],[-3,3],[0,6],[1,4],[3,6],[2,1],[10,1],[10,0],[5,-9],[-2,-4],[3,-2],[2,4],[1,6],[4,-3],[2,0],[-1,7],[1,6],[2,5],[8,-2],[9,1],[3,-2],[7,-12],[2,0],[-9,14],[-3,2],[-7,2],[-2,5],[0,15],[-3,3],[-4,-1],[0,6],[5,1],[4,3],[0,4],[-2,3],[-6,11],[0,7]],[[5240,8346],[5,0],[1,-1],[8,-3],[2,-2],[2,0],[8,3],[4,-2]],[[5270,8341],[0,-1],[4,-1],[3,-7],[1,-5],[-5,-6],[8,1],[0,-2],[2,-3],[4,2],[10,-7],[6,3],[2,0],[1,-5],[-1,-6],[-6,-6],[1,-4],[2,-1],[5,1],[9,-4],[1,2],[7,8],[3,2],[8,1],[2,4],[4,3],[2,4],[5,7],[13,-4],[3,-7],[9,-8],[7,0],[3,-7],[1,-10],[2,-3],[3,-2],[6,-2]],[[5230,8339],[-1,7],[3,-1],[7,0],[-1,-2],[-7,-1],[-1,-3]],[[6191,5817],[-4,0],[-1,2],[-2,2],[-3,1],[-7,-5],[-7,-2],[-3,-2],[-2,1],[-2,2],[-1,12],[0,23],[1,5],[0,3],[4,7],[1,3],[5,13],[3,11],[3,8]],[[6176,5901],[2,4],[1,-1],[5,-8],[1,0],[2,3],[1,8],[2,3],[3,3],[4,2]],[[6197,5915],[0,-2],[5,-12],[3,-16],[-2,-9],[-2,-3],[-6,-8],[-7,-6],[-5,-10],[-3,1],[1,-4],[1,-1],[2,1],[3,3],[4,2],[4,0],[3,-2],[2,-3]],[[6200,5846],[-2,-8],[-3,-10],[-4,-11]],[[3297,6062],[-3,-2],[-1,10],[-2,8],[1,4],[0,2],[4,-3],[1,-3],[1,-9],[-1,-7]],[[5315,8345],[4,-4],[4,1],[3,-4],[0,-5],[-3,-2],[-2,1],[-4,-2],[-11,8],[0,10],[6,0],[3,-3]],[[5290,8342],[-4,1],[0,3],[5,-3],[-1,-1]],[[5348,8349],[-2,-1],[-4,1],[-5,-4],[-1,4],[3,3],[1,3],[7,-4],[1,-2]],[[5278,8345],[-2,-1],[-5,2],[-1,9],[2,0],[5,-5],[1,-5]],[[5297,8337],[-1,0],[-2,4],[0,2],[3,6],[4,5],[1,6],[1,0],[-1,-5],[-5,-18]],[[5418,8352],[-1,-1],[-5,2],[-5,4],[1,8],[1,3],[10,-8],[0,-4],[-1,-4]],[[5295,8386],[2,-9],[3,-7],[-1,-3],[0,-8],[-5,-5],[-5,0],[-5,2],[-8,5],[-3,11],[0,9],[4,1],[8,4],[2,0],[2,-3],[2,0],[3,4],[1,-1]],[[5351,8386],[-3,-3],[-1,4],[2,3],[2,-4]],[[5294,8396],[-3,0],[0,4],[1,3],[-1,3],[1,2],[3,-6],[-1,-6]],[[5348,8396],[0,-5],[-2,-3],[-5,-3],[-2,-3],[-1,-4],[2,-3],[3,-2],[1,-5],[-3,-3],[-6,-3],[-1,-7],[0,-14],[-6,-3],[-3,8],[0,4],[-1,3],[0,4],[-1,5],[-7,2],[-4,-1],[-3,7],[1,8],[-2,4],[0,4],[-3,2],[-1,5],[2,1],[5,-1],[2,2],[4,7],[1,4],[4,0],[2,-2],[-1,-5],[1,-6],[3,-2],[1,5],[2,3],[0,6],[-1,2],[4,5],[5,4],[3,0],[6,-2],[2,-3],[-2,-5],[1,-10]],[[5306,8481],[-1,-1],[-4,2],[2,2],[6,1],[-3,-4]],[[5240,8346],[0,4],[-3,9],[3,1],[-1,10],[-1,5],[-13,11],[1,17],[1,5],[-2,9],[0,10],[1,17],[3,0],[5,-3],[3,0],[1,-3],[2,-1],[2,8],[4,6],[5,4],[2,-3],[2,3],[1,12],[-4,2],[-3,-2],[-3,-7],[-3,-9],[-5,-1],[-4,-3],[-5,5],[0,6],[4,8],[5,7],[6,0],[4,2],[9,0],[4,1],[3,4],[8,14],[4,6],[8,2],[6,2],[-1,-5],[3,-7],[-1,-4],[0,-8],[-2,-4],[-4,-10],[0,-21],[2,-4],[3,-2],[10,0],[2,-5],[0,-5],[-1,-3],[-7,-6],[-2,0],[-3,5],[-3,-4],[-3,-12],[-1,-8],[-5,1],[-3,-2],[2,-2],[1,-4],[-6,-5],[-1,-3],[-5,-6],[3,-13],[-1,-4],[-4,-5],[-1,-5],[3,1],[2,-1],[2,-4],[1,-8]],[[3006,6222],[0,18],[-3,4],[-2,6],[-2,5],[4,0],[3,7],[1,4],[0,3],[-2,4],[0,4],[1,3],[3,5],[0,4],[-3,5],[0,2],[1,6],[0,4],[-1,11],[-1,2]],[[3005,6319],[2,1],[0,3],[1,4],[3,2],[4,0],[4,-3],[1,1],[8,3],[4,-1],[1,-2],[4,-5],[6,0],[3,-5],[3,-3],[2,0],[3,2],[2,0],[2,-4],[0,-7],[2,-6],[2,-4],[11,2],[3,-4],[-2,-4],[-8,1],[-1,-3],[0,-3],[3,0],[4,-1],[6,-4],[7,-2],[6,-5],[7,-11],[2,-2],[1,-4],[-3,-11],[-1,-2],[-2,-1],[-2,-3],[-1,-5],[-1,-1],[-2,3],[-1,5],[-4,4],[-3,-1],[-6,2],[-4,-1],[-3,0],[-7,2],[-3,-2],[-4,-2],[-3,-6],[-1,-1],[-9,-2],[-2,2],[-2,4],[-3,1],[-5,-3],[-3,-1],[-1,-2],[0,-7],[-5,-16],[-3,-9],[-2,-3],[-2,5],[-2,2],[-2,1],[0,7],[-2,6],[-1,2]],[[5263,6924],[-5,-6],[2,-7],[7,-21],[1,-4],[2,-11],[1,-11],[1,-4],[0,-32],[1,-29],[1,-15],[-2,-14],[-2,-12],[0,-7],[1,-10],[1,-7],[2,-4],[0,-13],[-1,-4],[-5,-7],[-5,-6],[-2,-5],[0,-10],[4,-10],[6,-16],[6,-17],[0,-4],[1,-12],[2,-15],[3,-6],[1,-5],[2,-4],[3,-3],[7,4],[12,-6],[11,-7],[0,-2],[3,-8],[7,-26],[2,-10]],[[5331,6538],[-14,-18],[-14,-17],[-15,-18],[-14,-17],[-15,-18],[-14,-18],[-14,-17],[-15,-18],[-9,-11],[-6,-11],[-8,-13],[-7,-12],[-13,-24],[-4,-6],[-8,-15],[-2,-2],[-11,-5],[-10,-4],[-9,-3],[-7,-3],[-6,-2]],[[5116,6286],[-8,-4],[-7,-2],[-6,-3],[-4,0],[-2,1],[-4,8],[1,4],[2,6],[0,2],[1,1],[0,6],[-1,5],[0,13],[-2,4],[-4,3],[-3,3],[-6,2],[-5,2],[-2,2],[-4,8],[-1,3],[-8,1],[-3,1],[-2,2],[-2,3],[-2,8],[0,2],[-9,9],[-4,6],[0,5],[1,5],[-1,4],[0,3],[-4,5],[-9,13],[-9,12],[-10,12],[-9,13],[-18,24],[-9,13],[-18,24],[-9,13],[-18,24],[-9,13],[-10,12],[-9,12],[-16,23],[-9,11]],[[4865,6623],[-6,8],[-7,8],[-6,9],[-5,5],[-5,6],[-5,7],[-5,6],[-6,6],[-5,7],[-5,6],[-5,7],[-5,6],[-6,6],[-5,7],[-10,12],[-11,13],[-5,7],[-5,6]],[[4758,6755],[0,21]],[[4758,6776],[0,27],[0,34],[3,3],[5,7],[1,3],[2,3],[8,8],[1,3],[9,11],[4,1],[2,2],[5,9],[4,3],[13,-4],[2,2],[1,4],[0,8],[1,1],[3,-1],[4,0],[2,1],[11,3],[9,5],[4,6],[3,6],[3,9],[3,8],[5,5],[7,4],[6,5],[5,6],[4,6],[8,2],[2,3],[0,4],[-1,2],[-3,3],[-1,0],[0,9],[1,3],[0,4],[-2,4],[0,7],[2,4],[5,-1],[4,1],[12,8],[1,2],[2,10],[1,2],[10,3],[8,-1],[4,0],[8,-1],[15,0],[1,1],[0,3],[-1,6],[1,4],[4,7],[-1,5],[-5,7],[-2,2],[-4,10],[-1,11],[-4,14],[2,15],[-3,12],[0,4],[1,8],[0,11],[-3,11],[2,7],[-3,7],[1,8],[-3,5],[-8,11],[-1,4]],[[4937,7205],[6,-1],[3,1],[7,5],[5,7],[4,3],[4,8],[3,5],[5,5],[13,11],[2,0],[5,-3],[4,1],[2,4],[3,9],[10,12],[8,5],[5,5],[8,5],[20,3],[10,2],[7,-1],[7,8],[4,3],[15,1],[7,5],[27,0],[3,-1],[4,-4],[5,-7],[3,-2],[4,2],[8,7],[9,4],[6,4],[2,6],[4,2],[3,-4],[9,-5],[6,1],[3,2],[-1,7],[6,-2],[5,-4],[5,-6],[4,-2],[6,3],[12,2]],[[5237,7311],[1,-3],[0,-3],[-4,-4],[-3,-8],[-3,-5],[-1,-3],[3,-2],[1,-5],[-2,-18],[-1,-11],[0,-4],[2,-8],[0,-15],[2,-11],[-2,-7],[-1,-6],[-1,-9],[0,-5],[-1,-5],[-2,-5],[-5,-5],[-3,-4],[-3,-9],[-5,-7],[-1,-3],[-1,-6],[0,-8],[1,-7],[3,-9],[3,-16],[1,-3],[8,-8],[4,-9],[3,-13],[0,-9],[6,-7],[4,-7],[5,-5],[5,-6],[0,-2],[2,-13],[1,-13],[2,-15],[2,-14],[3,-26],[2,-12],[1,-14]],[[2773,5012],[0,-2],[-3,0],[-1,1],[0,2],[1,8],[1,4],[2,3],[2,2],[2,-1],[3,-3],[-3,-5],[-3,-2],[-1,-7]],[[2487,5106],[-1,0],[-1,2],[1,5],[2,-2],[1,-2],[-2,-3]],[[2515,5131],[-3,-3],[-2,4],[2,4],[2,2],[1,4],[3,2],[2,-1],[0,-2],[-1,-3],[-2,-2],[-2,-5]],[[2490,5139],[-2,0],[-4,5],[0,6],[2,3],[6,2],[2,-3],[0,-7],[-2,-4],[-2,-1],[0,-1]],[[2460,5157],[-3,-1],[-2,2],[-2,7],[1,2],[5,2],[1,-4],[0,-8]],[[2483,5164],[-1,-2],[-5,2],[-2,4],[1,4],[2,2],[3,-2],[3,-5],[-1,-3]],[[2464,5185],[2,-4],[1,-11],[5,-11],[1,-6],[-1,-3],[1,-1],[2,-4],[2,-5],[-3,-11],[-6,-4],[-7,0],[-1,1],[-2,4],[0,4],[1,3],[3,6],[5,4],[1,4],[-2,4],[-1,7],[-4,5],[-1,15],[-2,1],[-2,-2],[-1,2],[3,6],[3,2],[2,-2],[1,-4]],[[2807,5255],[-1,0],[-1,3],[3,4],[-1,-7]],[[2908,5177],[-2,-2],[-3,-1],[-3,2],[-2,0],[0,-2],[2,-2],[2,-3],[2,-9],[3,-6],[2,-3],[0,-2],[-1,-3],[0,-3],[1,-15],[-3,0],[-1,1],[-1,-1],[-1,-6],[-1,-15],[-2,-12],[-2,-4],[-3,-7],[-4,-10],[-5,-14],[-5,-6],[-3,-5],[-4,-6],[-5,-7],[-5,-5],[-8,-5],[-6,-5],[-4,-2],[-4,-3],[-6,-4],[-2,-4],[-3,-9],[-2,-5],[-2,-4],[0,-3],[1,-1],[0,-2],[-2,-2],[0,3],[-1,3],[-2,0],[0,-2],[-2,-10],[0,-10],[-2,-4],[0,-3],[-2,-5],[0,-3],[-1,-7],[-2,-10],[0,-11],[-2,-4],[-5,-7],[0,-9],[-2,0],[0,-2],[-1,-4],[-1,-1],[-3,2],[-3,0],[-1,1],[-2,6],[-2,4],[-1,5],[-1,8],[-3,5],[-4,-2],[-5,5],[-3,4],[-2,2],[-1,-1],[-3,-6],[-3,-3],[-1,0],[-2,4],[2,4],[2,7],[-3,0],[-1,2],[0,9],[2,2],[2,-1],[2,0],[1,3],[2,2],[0,2],[-1,5],[0,10],[-1,2],[0,5],[-1,2],[0,3],[-1,1]],[[2768,4988],[5,4],[1,3],[2,2],[2,4],[1,4],[3,18],[3,12],[-1,5],[-2,8],[-1,10],[1,4],[-1,2],[-1,-4],[0,-16],[-1,-7],[-2,-2],[-1,1],[1,12],[-1,-2],[-3,-8],[-3,-6],[0,-2],[-1,-3],[-5,5],[-6,13],[-4,3],[-3,5],[0,2],[-1,2],[3,3],[3,4],[0,14],[-2,11],[1,15],[-1,5],[-2,12],[2,6],[6,5],[2,2],[1,10],[1,6],[2,0],[-2,8],[0,4],[4,12],[2,3],[3,6],[3,9],[0,15],[-1,10],[0,11],[1,3],[4,2],[3,3],[1,4],[4,-1],[4,5],[6,3],[10,6],[2,5],[-1,9]],[[5950,6981],[2,-12],[2,-10],[3,-13],[1,-6],[0,-3],[4,-15],[2,-12],[1,-10],[3,-14],[0,-5]],[[5968,6881],[-1,-2],[-3,-10],[-4,-29],[-4,-23],[-1,-15],[-1,-5],[-2,-7],[-3,-8],[-4,4],[-8,13],[-5,12],[-5,8],[-5,10],[-1,7],[0,5],[-3,17],[-6,12],[-4,14],[-2,16],[-2,10],[-3,-3],[0,-4],[-2,-6],[-1,-7],[1,-6],[4,-8],[3,-12],[-1,-11],[1,-4],[4,-8],[2,-9],[4,-10],[5,-14],[5,-9],[3,-4],[2,-5],[0,-17],[3,-10],[1,-5],[3,-4],[1,-5],[1,-8],[2,-23],[3,-5],[7,-31],[7,-19],[3,-14],[5,-18],[10,-38],[5,-12],[2,-6],[4,-6],[5,-7],[-4,1],[-3,-2],[-1,-4],[0,-4],[1,-19],[1,-10],[4,-19],[2,-6],[2,-3],[1,-3],[9,-6],[5,-14],[12,-17],[1,-6]],[[6023,6450],[-9,0],[-18,0],[-18,0],[-19,0],[-18,0],[-18,0],[-18,0],[-19,0],[-14,0],[2,9],[-1,2],[-2,1],[-1,-1],[-3,-10],[-1,-1],[-14,0],[-11,0],[-21,0],[-21,0],[-21,0],[-22,0],[-21,0],[-21,0],[-21,0]],[[5693,6450],[0,26],[0,26],[0,26],[0,26],[0,26],[0,25],[0,39],[0,26],[0,26],[0,39],[0,26],[0,38],[0,39],[0,29],[-2,8],[-1,11],[-2,14],[0,5],[-3,14],[0,4],[5,15],[1,5],[2,13],[-2,9],[-2,15],[0,8],[2,5],[3,5],[2,7],[2,2]],[[5698,7007],[2,-7],[4,-2],[14,7],[16,-7],[8,-2],[14,-5],[8,-10],[2,-1],[6,0],[4,-6],[15,-2],[8,-6],[7,-7],[3,0],[3,2],[9,9],[9,12],[4,2],[4,0],[3,5],[2,6],[5,1],[10,5],[-1,-2],[-9,-6],[4,-1],[8,4],[1,2],[0,5],[1,1],[3,-1],[10,-8],[2,0],[8,5],[2,-2],[5,-10],[-2,1],[-5,8],[-1,-4],[-3,-7],[4,-3],[3,-1],[2,-4],[1,-4],[3,2],[2,4],[-2,6],[3,-2],[6,-9],[2,-2],[2,0],[5,3],[1,-1],[6,4],[2,-5],[5,2],[8,0],[7,3],[8,8]],[[5949,6987],[1,-6]],[[6114,6087],[1,-3],[2,2],[0,2],[4,-4],[0,-3],[-3,0],[-3,1],[-2,-1],[-4,2],[0,4],[2,-2],[1,1],[-2,4],[-2,0],[0,3],[2,2],[-1,3],[2,0],[2,-2],[1,-3],[0,-6]],[[6112,6110],[1,-6],[-3,2],[1,4],[1,0]],[[6176,5901],[-4,12],[-3,6],[-2,3],[-3,3],[-2,9],[-3,9],[-4,7],[-7,11],[-7,13],[-5,15],[-3,7],[-2,2],[-6,5],[-5,6],[-4,6],[-2,1],[-2,0],[-5,-1],[-4,3],[-4,1],[-2,2],[-2,-2],[-5,-2],[-2,0],[-1,4],[-3,5],[-1,0],[-1,-3],[-5,-6],[-9,-3],[-2,0],[-1,3],[-4,10],[-2,2],[-3,1],[-3,6],[-2,3],[-5,-23],[-1,-8],[-2,-10],[-2,1],[-7,17],[-2,-1],[-2,-2],[-2,-7],[-1,-1],[-6,3],[-3,-1],[-4,-2],[-1,-1]],[[6013,6004],[0,17],[-2,23],[0,11],[2,7],[2,6],[3,21],[1,4],[2,12],[1,3],[2,14],[0,19],[2,10],[0,4],[1,9],[0,2],[4,-1],[3,1],[4,0],[1,3],[2,10],[1,2],[3,3],[3,5],[3,1],[2,2],[2,1],[2,0],[2,1],[0,1],[2,0],[0,1],[2,3],[2,5],[0,3],[1,3],[3,7],[2,3]],[[6071,6220],[9,-33],[6,-40],[2,-31],[3,-16],[3,-7],[2,-15],[2,-1],[2,-4],[2,-13],[2,-6],[1,5],[0,2],[-1,5],[1,5],[1,3],[5,-7],[1,-7],[0,-4],[4,-8],[2,-2],[4,-1],[6,-4],[4,-9],[11,-7],[8,-21],[5,-15],[16,-23],[3,-11],[2,-11],[3,1],[6,-12],[2,-9],[4,-3],[1,5],[3,-4],[1,-7]],[[4502,6785],[-3,-9],[-4,4],[0,2],[3,1],[3,4],[1,-2]],[[4571,6805],[0,-5],[1,-4],[0,-7],[-2,-4],[-3,-4],[-3,1],[-4,8],[0,6],[2,4],[1,5],[7,-1],[1,1]],[[4522,6797],[-3,1],[-1,5],[2,5],[1,0],[2,-3],[1,-4],[-2,-4]],[[4545,6818],[-2,-13],[-3,-7],[-4,-2],[-3,9],[-2,8],[-2,3],[2,2],[3,-1],[5,2],[7,9],[5,1],[0,-3],[-6,-8]],[[4605,6806],[-4,-7],[-4,2],[7,7],[2,11],[4,18],[1,2],[3,0],[1,-3],[0,-6],[-1,-10],[-2,-9],[-7,-5]],[[4504,6824],[-1,0],[-1,5],[-3,11],[2,5],[4,0],[2,-7],[-1,-2],[0,-7],[-2,-5]],[[4618,6849],[-2,-4],[-2,1],[1,8],[1,3],[4,4],[3,1],[1,4],[1,1],[1,-2],[-1,-3],[0,-8],[-2,-3],[-5,-2]],[[5043,7411],[-5,0],[0,4],[1,1],[4,-5]],[[5039,7425],[-1,-4],[-5,3],[1,4],[1,1],[1,5],[6,3],[2,-2],[0,-3],[-3,-6],[-2,-1]],[[5086,7475],[3,-2],[3,2],[3,-2],[0,-3],[-1,-4],[-4,-9],[-1,-5],[-2,-3],[-3,-2],[-4,4],[-4,2],[-1,6],[-1,2],[-2,1],[-1,-2],[-3,-3],[-1,3],[-2,3],[0,2],[11,14],[4,3],[7,4],[1,-1],[-1,-3],[1,-3],[-2,-4]],[[5118,7478],[0,-1],[-9,7],[-3,1],[0,6],[6,1],[4,-3],[3,-7],[-1,-4]],[[4949,7683],[0,-2],[2,-3],[3,-2],[2,0],[4,-2],[0,-3],[-2,-5],[0,-3],[3,-1],[0,2],[2,2],[0,-3],[10,-6],[5,0],[0,-2],[5,-7],[1,1],[2,-1],[5,2],[4,-4],[3,-4],[7,2],[1,-2],[3,1],[4,-1],[4,0],[0,7],[1,2],[2,0],[10,-6],[5,-2],[4,-6]],[[5046,7631],[5,-2],[2,-2],[1,-4],[1,0],[5,4],[5,-2],[5,-3],[3,0],[0,3],[4,2],[2,2],[2,0],[7,-2]],[[5088,7627],[3,-8],[-4,-2],[0,-7],[2,-1],[0,-10],[-3,-5],[-4,-5],[-19,-17],[-4,-9],[-2,-2],[-14,-5],[-15,-8],[-6,-9],[-3,-4],[2,-1],[3,-5],[-1,-2],[-4,-3],[-3,-1],[-7,-17],[-6,-13],[-3,-5],[-3,-8],[-7,-20],[0,-6],[3,-21],[2,-5],[3,-5],[5,-3],[2,-4],[-2,-4],[-5,-6],[-10,-9],[-3,-7],[-1,-6],[-3,-3],[-1,-9],[-2,-7],[0,-2],[-2,-4],[0,-4],[3,-4],[-1,-2],[-5,-2],[-11,0],[-9,-10],[-4,-9],[-4,-17],[-5,-9],[-2,-2],[-3,4],[-4,1],[-4,-2],[-2,-3],[-3,-2],[-4,2],[-6,1],[-4,-1],[-4,-2],[-4,1],[-7,1],[-15,-2],[-2,-1],[-2,-4],[-5,-7],[-7,0],[-7,-5],[-4,-11],[-1,-5]],[[4850,7265],[-2,1],[-1,-5],[-4,-3],[-5,4],[-5,5],[-2,1],[-5,13],[-1,6],[0,4],[-3,3],[-1,5],[2,7],[-2,-1],[-2,7],[-11,14],[-1,1],[-2,-1],[-5,0],[-7,-1]],[[4793,7325],[-1,14],[-1,6],[0,3],[1,8],[2,4],[2,7],[3,5],[5,3],[2,8],[-4,-1],[-7,16],[0,3],[2,8],[0,4],[1,3],[3,4],[2,4],[2,9],[-2,3],[-3,1],[-4,12],[-1,8],[-3,4],[-2,6],[2,2],[9,0],[3,2],[3,13],[0,7],[-3,4],[0,4],[4,6],[2,2],[-1,4],[0,12],[1,2],[-1,7],[0,6],[-2,7],[0,2],[4,4],[2,6],[4,5],[4,4],[5,9],[0,4],[-2,3],[-5,1],[-2,1],[0,11],[-2,4],[-6,1],[-1,-1],[-6,1],[-2,1],[-1,-1],[0,-4],[-6,-3],[-3,0],[-5,3],[-5,-1],[-1,1],[-5,-4],[-2,0],[-1,6],[2,5],[-2,7],[-3,-1],[-8,-4],[-5,-6]],[[4755,7599],[-2,-1],[-1,1],[0,9],[3,7],[3,3],[-1,1],[-3,0],[0,3],[3,4],[-2,1],[-1,3],[0,5],[1,2],[-1,2],[-5,-3],[-1,1],[0,4],[3,6],[0,1],[-3,1],[-3,3],[-3,7],[0,3],[2,8],[9,9],[5,-1],[4,1],[3,3],[5,3],[0,4],[-1,2],[1,2],[7,7],[4,1],[4,3],[3,-2],[3,1],[6,-9],[6,-2],[4,2],[8,0],[4,-1],[7,2],[4,-1],[7,3],[5,-3],[9,-2],[6,-3],[16,-5],[6,0],[8,3],[4,2],[3,-1],[5,2],[2,-1],[3,-3],[10,-5],[3,4],[2,1],[8,-2],[7,-5],[4,0],[6,1],[4,3],[1,0]],[[5627,8560],[2,-2],[4,2],[4,-1],[9,-7],[1,-2],[-6,-1],[-2,-4],[-2,0],[-2,-3],[-4,-3],[-1,-2],[-6,1],[-4,-1],[-2,-4],[-4,-11],[-2,-2],[-2,0],[-1,2],[6,11],[-2,1],[-6,5],[-1,2],[2,1],[2,4],[-4,7],[2,1],[4,-2],[3,2],[2,-1],[2,4],[6,3],[2,0]],[[5647,8556],[-2,-1],[-5,4],[2,4],[5,-2],[1,-4],[-1,-1]],[[5636,8572],[-3,-3],[-2,2],[-3,-6],[-3,-1],[-2,1],[0,2],[-2,7],[-2,2],[-4,0],[-3,2],[11,2],[3,6],[2,1],[2,-1],[0,-4],[5,-1],[2,-4],[1,-5],[-2,0]],[[5777,8609],[2,-1],[2,-5],[-3,-2],[-1,-2],[-3,-1],[-1,-5],[-3,-8],[-4,-7],[-3,-3],[-2,-6],[0,-3],[3,-17],[0,-3],[-2,-6],[3,-8],[3,-12],[3,-4],[-7,-4],[-1,-4],[-3,-3],[-1,-3],[0,-5]],[[5759,8497],[-5,0],[-6,4],[-4,-1],[-8,-3],[-7,4],[-2,4],[-5,7],[-1,3],[-6,1],[-2,3],[-4,2],[-6,5],[-2,1],[-1,-3],[-4,4],[-5,-4],[-4,-1],[-9,-4],[-2,-3],[-1,1]],[[5675,8517],[0,2],[3,11],[1,9],[2,3],[-1,2],[-5,2],[-1,-3],[-5,-4],[-3,3],[-7,3],[-2,4],[0,4],[-4,4],[-1,5],[1,3],[3,2],[1,2],[-5,0],[0,2],[-2,6],[2,5],[-1,1],[1,5],[0,5],[4,3],[4,1],[8,1],[-1,5],[3,0],[6,6],[6,-1],[8,4],[16,0],[2,2],[-1,2],[1,2],[7,0],[19,-4],[5,0],[6,-5],[3,-1],[10,0],[16,-3],[3,4]],[[6191,5817],[0,-2],[-1,-4],[-2,-3],[-4,-13],[0,-3],[2,-4],[2,-14],[1,-3],[2,-4],[3,-7],[1,-5],[3,-3],[1,-6],[3,-9],[2,-8],[5,-8],[2,0],[5,-11],[5,-8],[1,-1],[8,-5],[9,-7],[7,-5],[18,-12],[21,-14],[17,-12],[2,-2],[18,0],[10,0]],[[6332,5644],[-7,-14],[-8,-15],[-8,-17],[-5,-10],[-9,-17],[-7,-13],[-7,-16],[-6,-13],[-9,-19],[-5,-12],[-8,-20],[-6,-12],[-8,0],[-8,1],[-10,1],[-3,-1],[-10,-5],[-11,-11],[-3,-5],[-3,-7],[-1,-5],[-2,-3],[-13,-5],[-3,-1],[-6,-3],[-3,-7],[-1,-3]],[[6162,5412],[-11,0],[-3,-1],[-1,-1],[-3,0],[-2,2],[-2,1],[-6,12],[-3,4],[-6,-5],[-6,-6],[-9,-7],[-4,-6],[-2,-5],[-4,-11],[-3,-6],[-1,-1],[-8,2],[-2,1],[-5,1],[-6,2],[-4,3],[-4,0],[-6,1],[-4,1],[-4,6],[-10,14],[-6,7],[-6,8],[-7,9],[-2,1],[-8,1],[-8,0],[-5,1],[-3,3],[-1,6],[-2,5],[-3,6],[0,8],[1,9],[0,10],[-1,4],[-8,4],[-1,0],[-1,-2],[-2,-1],[-2,3],[0,3],[1,2]],[[5979,5500],[-1,1],[-2,4],[-3,5],[-2,11],[-1,10],[-2,7],[-1,8],[-4,21],[-2,3],[-2,4],[-2,7],[-6,6],[-6,12],[-1,5],[0,4],[-1,4],[-2,4],[-7,9],[-4,2],[-4,1],[-4,2],[-4,4],[-2,3],[0,4],[1,5],[3,13],[2,8],[1,2],[4,1],[4,0],[2,-1],[4,0],[5,1],[2,2],[2,6],[0,36],[-1,12],[1,2]],[[5946,5728],[0,3],[1,13],[1,7],[0,4],[4,15],[0,4],[-1,16],[2,7],[2,8],[2,3],[2,2],[6,-8],[3,4],[1,3],[0,6],[1,11],[0,7],[1,8],[2,12],[0,7],[1,4],[4,8],[3,11],[3,9],[4,13],[3,8],[3,1],[5,1],[3,1],[0,2],[1,3],[0,16],[2,11],[1,7],[1,4],[2,3],[1,6],[1,13],[0,8],[2,15]],[[5600,8645],[-3,0],[-1,3],[4,1],[0,-4]],[[5605,8647],[-2,-2],[-1,4],[2,2],[2,0],[-1,-4]],[[5615,8661],[3,-2],[2,1],[2,-3],[-3,-2],[1,-6],[-3,0],[-2,4],[-3,3],[3,5]],[[5610,8659],[-2,-1],[-3,3],[1,2],[4,-4]],[[5595,8670],[-1,-3],[-3,0],[-2,2],[-1,5],[2,2],[1,-2],[4,-4]],[[5588,8826],[2,-1],[2,2],[2,-1],[-3,-5],[-5,2],[-1,5],[4,0],[-1,-2]],[[5689,8927],[-4,-2],[-3,1],[0,4],[5,2],[3,-3],[-1,-2]],[[5804,9159],[-12,-6],[-4,-1],[1,-2],[7,0],[2,-2],[0,-4],[-8,-13],[0,-3],[2,-8],[4,-9],[18,-7],[5,-8],[8,-10],[5,-4],[-1,-8],[-11,-13],[-9,-13],[-4,-7],[-1,-5],[7,-11],[4,-10],[3,-5],[1,-5],[3,-7],[3,-3],[3,-5],[0,-4],[5,-14],[0,-6],[-10,-2],[-1,-1],[3,-3],[-2,-6],[-1,-7],[-2,-7],[5,-1],[0,-6],[-3,-1],[-3,-5],[1,-5],[4,-6],[8,-2],[2,-7],[-4,-5],[1,-7],[2,-4],[8,-5],[4,-5],[0,-7],[-3,-7],[-6,-9],[-6,-3],[0,-1],[12,-13],[6,-5],[15,-12],[4,-8],[5,-7],[1,-4],[-3,-6],[-1,-5],[-3,-7],[-3,-5],[-7,-9],[-10,-11],[-2,-4],[-5,-6],[-8,-12],[-3,-2],[-6,-10],[-6,-6],[-7,-9],[-7,-6],[-7,-7],[-2,-3],[-3,-2],[-4,-4],[-7,-9],[-10,-12]],[[5771,8670],[-3,-2],[-6,-2],[-7,5],[-4,-2],[-3,-3],[-7,-1],[-5,-2],[0,8],[2,3],[-1,1],[-2,-4],[-1,-5],[-2,-2],[-5,-1],[-5,4],[-2,0],[2,-6],[0,-2],[-2,0],[-6,-4],[-2,3],[-3,-1],[-3,-3],[-5,0],[-3,-4],[-6,-2],[-3,0],[-7,-2],[-2,-4],[-2,-2],[-3,2],[-9,-2],[-8,-3],[-4,0],[-3,1],[-4,-3],[-4,-5],[-6,-1],[1,3],[3,2],[2,4],[-1,4],[-2,0],[-5,9],[-1,-1],[-1,-5],[-2,-3],[-2,-1],[-6,0],[-1,2],[1,8],[3,0],[0,3],[-2,0],[2,6],[-1,1],[-8,1],[-9,6],[-2,0],[-1,5],[-3,0],[-3,-3],[-5,4],[0,5],[-1,4],[0,5],[-1,7],[1,5],[3,7],[1,6],[0,7],[-1,5],[2,0],[-2,4],[3,1],[-4,14],[-2,5],[-4,5],[2,7],[1,6],[-1,7],[-4,4],[-2,12],[1,7],[9,12],[0,5],[5,0],[-2,5],[-1,5],[8,2],[2,-2],[6,2],[6,4],[-2,7],[4,3],[4,5],[0,4],[6,2],[7,8],[7,5],[7,8],[2,0],[2,5],[6,7],[2,1],[2,7],[7,7],[5,10],[2,3],[1,4],[3,0],[2,3],[6,2],[9,-2],[-1,5],[4,4],[-1,5],[-3,2],[2,6],[0,7],[1,7],[-3,4],[-11,6],[-5,1],[-2,5],[1,4],[-1,2],[-5,-5],[-7,2]],[[5670,8974],[-3,10],[-4,9],[-4,3],[-2,3],[0,13],[5,6],[1,8],[2,7],[-3,6],[-5,7],[-2,7],[1,5],[3,2],[-1,7],[-2,1],[-5,0],[-1,1],[3,7],[-2,12],[1,5],[4,4],[-5,4],[-4,6],[-4,1],[-2,7],[-4,3],[-5,5],[-22,7],[-8,5],[-7,5],[-1,2],[-5,3],[-2,3],[-7,4],[-1,4],[-7,4]],[[5572,9160],[1,2],[6,0],[5,-2],[2,2],[-2,6],[2,4],[9,2],[5,-1],[5,-7],[16,-21],[0,-4],[3,0],[16,-2],[2,-2],[5,0],[10,4],[5,5],[4,0],[9,-5],[10,-3],[3,-3],[4,-1],[4,3],[2,7],[5,6],[6,1],[5,6],[1,5],[-1,9],[3,8],[4,16],[9,8],[7,8],[10,0],[5,-1],[7,3],[6,5],[9,1],[4,-5],[6,-6],[4,-3],[20,-9],[6,-11],[-3,-5],[-6,-6],[-5,-6],[1,-7],[3,-2]],[[9957,4090],[-1,-2],[-3,-2],[-2,3],[-2,-4],[-1,-1],[0,-2],[-1,0],[-3,-2],[-2,2],[2,3],[2,0],[3,6],[2,0],[1,2],[3,-1],[2,-2]],[[5,4092],[-1,-1],[0,-2],[-1,0],[0,3],[1,1],[1,-1]],[[9980,4141],[-2,4],[0,3],[1,2],[2,-7],[-1,-2]],[[28,4148],[-2,-1],[-1,3],[1,1],[2,-3]],[[48,4149],[-1,0],[-2,2],[1,3],[2,-3],[0,-2]],[[9966,4162],[-1,-1],[-1,4],[1,3],[1,0],[1,-3],[-1,-3]],[[9951,4183],[0,-3],[1,-1],[2,-5],[5,-7],[0,-6],[1,-5],[0,-6],[1,-8],[-1,-2],[-4,0],[0,-1],[-4,0],[-5,-7],[-2,0],[-3,-1],[-3,1],[-2,2],[-4,2],[-5,2],[-4,4],[-2,6],[0,3],[1,3],[2,3],[0,2],[2,2],[-1,4],[0,3],[6,10],[6,4],[3,-1],[5,4],[2,1],[2,-1],[1,-2]],[[9982,4183],[-1,6],[2,-1],[0,-2],[-1,-3]],[[28,4188],[0,4],[-1,2],[0,2],[2,-2],[0,-4],[-1,-2]],[[9922,4196],[-2,-1],[1,4],[1,2],[1,0],[0,-3],[-1,-2]],[[9999,4206],[-3,-2],[0,2],[1,5],[2,5],[-1,-4],[1,-6]],[[0,4216],[2,5],[1,1],[1,-4],[-1,-5],[-3,-5],[0,8]],[[0,4234],[2,3],[0,-3],[-1,-1],[-1,-2],[0,3]],[[9998,4252],[-4,-8],[-2,-8],[-4,-5],[-2,-6],[1,-6],[3,6],[4,6],[1,1],[1,-2],[0,-2],[-1,-5],[1,-4],[-5,0],[-4,-3],[-3,-1],[-2,0],[-2,2],[0,3],[-1,1],[-3,0],[-4,-6],[-1,-5],[-2,0],[-2,1],[-2,-4],[-2,-2],[-2,4],[0,4],[-1,3],[-3,0],[0,4],[2,3],[0,3],[3,-3],[2,2],[1,0],[2,6],[6,6],[4,1],[4,2],[3,5],[4,4],[3,1],[3,-1],[5,4],[-1,-1]],[[9919,4463],[-2,-1],[-1,2],[1,1],[2,-1],[0,-1]],[[3341,2175],[-2,-1],[-1,2],[0,4],[3,-2],[0,-3]],[[3376,2188],[0,-6],[-2,2],[-1,3],[3,1]],[[3304,2201],[4,-1],[-2,-9],[-2,0],[-3,6],[3,4]],[[3325,2219],[4,-1],[3,4],[5,1],[1,-3],[3,0],[9,5],[3,-4],[-1,-3],[-2,-2],[-2,-4],[-4,-5],[-4,-8],[-5,-9],[-2,-1],[-7,0],[-3,-9],[-3,-1],[-2,-2],[-5,0],[-7,8],[5,6],[5,0],[4,4],[3,2],[1,3],[2,1],[-1,4],[-6,-3],[-3,3],[9,3],[1,1],[-2,3],[-3,2],[-3,4],[0,7],[7,-6]],[[3329,2223],[-3,0],[-1,2],[0,5],[3,0],[3,-2],[-2,-5]],[[3364,2230],[5,-3],[5,1],[2,-1],[2,-3],[-1,-2],[-3,-1],[1,-5],[6,-3],[-1,6],[1,3],[8,2],[1,-1],[3,-7],[-3,-1],[-1,-3],[3,-1],[2,-2],[-1,-4],[-9,-3],[-2,-4],[-3,-2],[-10,-4],[1,-4],[0,-6],[-13,6],[-2,-1],[3,-9],[-2,-1],[-3,1],[-2,-1],[-2,-7],[-4,5],[-3,5],[0,4],[3,6],[-1,2],[8,9],[3,4],[4,1],[-1,2],[0,9],[5,8],[0,5],[1,0]],[[5262,7649],[0,-11],[2,-4],[0,-24],[-4,-12],[0,-11],[-2,-6],[-2,-10],[-2,-4],[-8,8],[-2,4],[0,2],[2,2],[0,2],[-5,4],[1,6],[0,3],[-4,0],[0,2],[3,5],[0,3],[-2,1],[-2,6],[3,4],[-1,3],[-2,1],[2,4],[2,7],[3,3],[5,3],[4,5],[4,-3],[1,2],[0,13],[1,4],[2,0],[1,-2],[0,-10]],[[4966,7827],[-1,-5],[-4,9],[2,2],[3,-6]],[[5160,8037],[1,-2],[2,-1],[3,-3],[2,1],[1,2],[3,0],[3,-2]],[[5194,7829],[-2,-4],[-4,-3],[0,-6],[2,-2],[4,-10],[4,-6],[-1,-3],[-1,-6],[-3,-1],[-4,-5],[-4,1],[-2,-2],[0,-3],[2,-2],[1,-3],[0,-3],[2,-3],[4,-1],[1,-2],[1,-8],[-2,0],[0,-3],[-3,-7],[1,-3],[0,-4],[1,-3],[2,-3],[5,-5],[6,-4],[7,2],[1,-3],[0,-4],[-4,-7],[-1,-3],[0,-6]],[[5207,7704],[-1,-1]],[[5206,7703],[-2,1],[0,-2]],[[5204,7702],[-6,-4],[-8,-13],[-4,-3],[-2,-7],[-3,-4],[-7,-3],[-5,-4],[-3,2],[-6,0],[-3,4],[-8,3],[-2,7],[-6,0],[-1,1],[0,5],[-5,-1],[-1,-2],[-2,-1],[-4,0],[-7,4],[-5,2],[-4,6],[-4,-2],[-4,-5],[-14,-16],[-3,-6],[-3,-10],[0,-4],[1,-15],[3,-7],[0,-2]],[[4949,7683],[5,2],[4,7],[4,27],[2,31],[2,6],[3,1],[-2,5],[-1,-3],[-2,-3],[2,29],[1,10],[2,11],[4,-4],[5,-9],[2,-12],[1,-1],[-2,17],[-4,9],[-9,10],[-1,4],[5,-2],[-1,4],[-1,7],[-1,16],[1,2],[-1,4],[-7,2],[-11,9],[-3,10],[-4,7],[-1,4],[0,3],[2,7],[-2,4],[-2,1],[-1,2],[2,6],[3,0],[1,2],[-10,-2],[-5,2],[0,4],[3,6],[-4,3],[-3,0],[-3,-1],[-1,1],[2,4],[-1,1],[-5,-1],[-3,1],[-3,4],[-3,0],[-1,2],[-4,-1],[-1,3],[-11,5],[-5,0],[-4,-2],[-3,1],[-2,3],[-1,5],[-7,4],[1,3],[7,2],[2,3],[-3,3],[-3,1],[-1,3],[5,0],[4,1],[-1,2],[-2,1],[-10,0],[-1,3],[1,7],[5,5],[13,5],[6,-1],[4,1],[5,3],[2,3],[6,1],[7,-2],[5,-11],[3,-4],[7,6],[10,0],[2,-3],[1,3],[2,3],[2,-1],[0,-3],[11,1],[-3,9],[-1,23],[-3,7],[-5,16],[0,5],[5,0],[3,-1],[6,2],[3,-1],[0,-5],[1,-6],[2,-6],[5,0],[6,-2],[7,0],[9,-3],[5,2],[4,4],[8,2],[0,2],[-4,-1],[-4,3],[-1,3],[1,2],[1,6],[12,9],[9,3],[9,5],[4,5],[4,9],[1,1],[-1,2],[1,26],[2,8],[7,6],[15,5],[2,1]],[[3482,5317],[0,1],[2,0],[2,4],[2,3],[4,15],[2,6],[0,20],[3,10],[2,6],[0,10],[-1,0],[-1,5],[-1,3],[-4,8],[-3,9],[1,5],[-2,3],[0,8],[-1,5],[0,16],[-1,3],[0,9],[1,3],[0,3],[3,10],[2,6],[3,4]],[[3495,5492],[2,3],[2,15],[2,6],[2,0],[11,-12],[5,-1],[11,-7],[3,-9],[9,-14],[5,-5],[0,-4],[-1,-6],[3,5],[4,-8],[3,-12],[-1,-5],[1,-1],[1,2],[0,5],[1,6],[1,0],[2,-3],[2,-17],[1,-3],[0,-10]],[[4813,8722],[-2,1],[-3,5],[-1,4],[4,-2],[2,-5],[0,-3]],[[4815,8743],[-1,-2],[-6,5],[0,3],[6,-3],[1,-3]],[[4799,8762],[4,-3],[-2,-2],[-4,0],[-3,2],[-1,3],[5,1],[1,-1]],[[4815,8768],[-1,-8],[-5,2],[4,-10],[-3,1],[-6,7],[-4,11],[6,2],[4,-3],[5,-2]],[[4821,8769],[-1,-4],[-3,1],[2,5],[2,-2]],[[9526,5490],[0,-3],[-2,2],[1,2],[1,-1]],[[9396,5576],[-1,-2],[-2,1],[-1,5],[-1,1],[0,2],[2,2],[3,-1],[1,-4],[-1,-2],[0,-2]],[[9211,5606],[-1,1],[0,2],[1,0],[0,-3]],[[9218,5611],[-1,0],[0,2],[1,0],[0,-2]],[[8836,5731],[0,4],[1,1],[1,-3],[-1,-2],[-1,0]],[[5265,5243],[2,1],[2,2],[1,-1],[1,-4],[3,-2],[1,0],[1,2],[10,0],[15,0],[13,0],[0,43],[0,24]],[[5308,4958],[-3,5],[-2,9],[-8,16],[-2,6],[-7,16],[-9,15],[-7,13],[0,3],[7,-7],[1,2],[-2,4],[-3,3],[-3,1],[-2,0],[-2,3],[-1,4],[0,4],[-1,4],[-4,8],[-2,7],[4,-4],[1,2],[-1,2],[-4,4],[-2,0],[0,6],[-3,11],[-3,9],[0,4],[8,-19],[2,0],[4,2],[-1,3],[-2,2],[-1,-1],[-2,0],[-1,1],[0,2],[2,9],[-1,0],[-2,-3],[-1,0],[-4,5],[-4,13],[-1,2],[0,5],[-1,2],[-4,18],[1,-1],[2,-6],[3,2],[2,3],[2,0],[2,3],[4,13],[1,17],[0,10],[-1,10],[2,1],[1,-4],[0,-2],[2,-3],[3,0],[6,-6],[1,5],[5,4],[-2,1],[-4,-2],[-7,6],[-2,4],[-2,7],[-2,4],[0,3],[5,4],[1,-1],[0,-3],[2,-2],[0,12],[-1,12],[0,3]],[[4969,8103],[-2,-2],[-1,-3],[-3,-1],[-6,5],[0,2],[4,1],[2,3],[4,-2],[2,-3]],[[4882,8255],[4,-4],[-4,-2],[-4,-5],[-3,2],[-2,5],[-1,7],[3,2],[4,0],[3,-5]],[[4826,8299],[-2,0],[-3,-2],[-7,0],[0,7],[-4,2],[-2,5],[0,2],[-4,4],[-1,0],[-4,-6],[1,-4],[-4,-4],[0,-2],[-3,1],[-4,-1],[-3,3],[-5,2],[-1,4],[-6,7],[-1,4],[10,6],[1,2],[-5,4],[1,2],[4,0],[4,2],[3,4],[1,3],[1,7],[1,2],[5,4]],[[4799,8357],[1,-3],[2,0],[2,2],[2,6],[7,0],[6,3],[10,-1],[2,-4],[2,-7],[3,-7],[4,-5],[0,-4],[-2,-5],[6,0],[3,-6],[0,-7],[-4,6],[-2,0],[1,-4],[0,-5],[3,-1],[-2,-6],[-6,-2],[-1,-4],[-2,-4],[-2,-2],[-3,0],[-3,2]],[[4857,8377],[-3,0],[-3,2],[-2,8],[2,5],[2,1],[3,-3],[1,-6],[0,-7]],[[4829,8405],[2,-14],[-1,-2],[-5,-3],[0,4],[-2,6],[-4,-5],[0,7],[4,4],[1,-1],[5,4]],[[4833,8398],[-2,0],[-1,5],[3,5],[1,3],[5,5],[1,0],[-2,-7],[-5,-11]],[[4839,8429],[-12,-4],[-3,1],[0,2],[3,1],[1,8],[-5,5],[1,2],[3,2],[2,0],[3,-2],[2,-4],[3,-1],[2,-2],[0,-8]],[[4793,8464],[-3,0],[0,3],[3,-1],[0,-2]],[[4825,8464],[-2,0],[-3,3],[3,2],[2,-1],[0,-4]],[[4798,8473],[-3,0],[-2,4],[0,11],[3,1],[1,-1],[1,-15]],[[4828,8495],[0,-8],[2,-4],[6,-1],[5,0],[1,-3],[-4,-4],[-3,-5],[-3,-1],[-1,9],[-3,-1],[-5,1],[-3,7],[-6,2],[-3,6],[2,2],[3,0],[-1,4],[7,2],[0,4],[2,0],[4,-5],[0,-5]],[[4799,8506],[3,-4],[-2,-5],[-4,0],[-6,4],[2,3],[4,1],[1,-1],[2,2]],[[4827,8545],[-4,-10],[-1,0],[-2,-6],[1,-4],[-8,-6],[-3,-5],[-1,0],[-3,-4],[-2,0],[-2,3],[4,3],[0,2],[2,2],[-5,4],[1,4],[-2,1],[0,5],[2,3],[2,0],[2,-2],[4,0],[-2,5],[2,3],[5,3],[7,6],[2,1],[1,-4],[0,-4]],[[4913,8554],[0,-6],[-3,-5],[-6,-5],[-10,-11],[-6,-5],[-1,-3],[0,-4],[5,-1],[-6,-9],[-2,-5],[4,0],[4,1],[6,4],[6,2],[3,0],[6,-2],[4,1],[20,0],[4,1],[4,-2],[2,-3],[3,-8],[-5,-7],[-3,-9],[0,-3],[-6,-16],[-4,-8],[-2,-6],[-5,-7],[-11,-3],[-1,-4],[6,1],[6,-5],[0,-4],[-3,-3],[-6,0],[-5,-7],[-5,-3],[8,-4],[1,0],[5,4],[7,0],[12,-7],[4,-5],[5,-8],[5,-6],[4,-18],[2,-13],[4,-15],[4,-7],[11,-6],[2,-2],[9,-13],[8,-10],[-4,-5],[1,-5],[5,-11],[1,-6],[-3,0],[-3,2],[-2,3],[-6,-1],[0,-1],[5,0],[12,-13],[4,-8],[2,-10],[-2,-4],[-7,-10],[7,-6],[3,1],[3,6],[2,2],[4,1],[6,-2],[3,1],[6,-2],[3,-2],[8,-8],[2,-5],[0,-5],[1,-7],[-2,-5],[-2,-12],[-2,-5],[-6,-7],[-3,1],[1,-7],[-2,-3],[-2,-1],[-4,1],[-6,-4],[4,-2],[1,-3],[-1,-4],[-3,-2],[-6,-1],[2,-7],[1,-1],[6,-1],[14,0],[0,-11],[-1,-1],[-9,-6],[-2,-5],[0,-2],[-6,0],[-2,-3],[-7,-4],[-6,-3],[-12,3],[-7,0],[-9,-3],[-6,3],[-3,2],[-5,1],[-1,-3],[-5,-4],[-2,-1],[-3,1],[-5,-2],[-4,1],[0,-3],[2,-3],[-3,-1],[-8,2],[-2,0],[-1,-2],[-3,1],[-3,3],[-3,2],[-4,1],[-2,-1],[-12,-4],[-2,-5],[-1,-7],[-4,-11],[-3,-1],[-3,4],[-6,3],[-2,3],[-3,-2],[-3,0],[-3,-1],[-9,-5],[-6,-7],[-2,-6],[-3,-1],[-3,4],[-3,1],[-3,-1],[-2,-2],[-1,2],[0,3],[2,4],[7,2],[5,8],[3,4],[1,3],[3,2],[1,3],[8,11],[0,3],[1,4],[0,5],[7,2],[3,10],[9,2],[7,0],[6,-2],[4,0],[3,1],[3,2],[6,13],[2,6],[-7,-2],[-8,-8],[0,-1],[-8,2],[-9,10],[-6,-2],[-4,1],[4,5],[-5,1],[-3,3],[-4,1],[-5,-4],[-5,-3],[-6,4],[-2,2],[0,7],[-2,2],[2,4],[8,5],[14,9],[5,4],[2,3],[2,9],[2,4],[-2,3],[1,6],[-2,7],[0,5],[-7,-1],[-6,-5],[-3,0],[1,5],[3,4],[4,3],[3,7],[5,5],[8,4],[1,1],[4,-1],[6,3],[3,0],[6,-5],[-2,8],[3,2],[0,9],[4,8],[-2,1],[-2,6],[1,3],[3,3],[2,10],[-1,3],[-8,-3],[-7,10],[-4,10],[-1,5],[4,12],[5,8],[-4,3],[-4,-1],[-4,-4],[-2,0],[-3,-4],[-7,-2],[-2,4],[-3,0],[-2,-3],[-3,-2],[-9,5],[-2,-4],[0,-5],[-4,4],[-4,9],[0,4],[2,2],[2,-1],[2,9],[5,12],[2,3],[1,5],[-1,6],[-5,5],[0,5],[2,9],[4,2],[-5,5],[-2,-2],[-4,-2],[-1,-2],[-4,-1],[0,4],[2,7],[-3,-2],[-3,-4],[-1,-3],[1,-1],[1,-7],[-1,-3],[-4,-22],[-2,-4],[-3,0],[-1,2],[0,5],[2,10],[2,6],[3,4],[-3,0],[0,15],[2,5],[0,6],[2,6],[2,9],[2,3],[0,3],[4,8],[-1,0],[-12,-13],[-6,2],[-2,3],[-1,5],[-4,1],[2,3],[5,1],[4,4],[-4,3],[4,3],[4,8],[1,8],[-3,6],[-4,2],[-1,4],[4,5],[-2,8],[4,12],[7,0],[2,2],[3,0],[-6,8],[1,5],[0,4],[1,2],[7,0],[2,1],[-2,5],[0,10],[2,3],[2,1],[5,-2],[1,-3],[6,4],[2,-3],[7,2],[9,1],[5,2],[11,2],[6,0],[-1,-7]],[[4911,8570],[-3,-1],[-3,3],[0,4],[3,0],[3,-6]],[[4914,8583],[0,-1],[7,-1],[1,-2],[-1,-4],[-2,0],[-3,3],[-5,-1],[-2,1],[0,4],[-3,-2],[0,5],[1,4],[2,1],[5,-3],[1,-2],[-1,-2]],[[4928,8595],[-3,0],[2,3],[5,1],[0,-2],[-4,-2]],[[4923,8592],[-3,0],[0,4],[-5,2],[-1,2],[2,2],[4,-4],[1,-3],[2,0],[0,-3]],[[4963,8670],[0,-4],[2,1],[2,-4],[2,-2],[-1,-10],[-1,-5],[-1,0],[0,-6],[-2,-2],[-1,-5],[-2,1],[3,12],[-2,4],[-4,-1],[-1,4],[-3,-1],[-1,3],[4,1],[4,2],[-2,8],[-4,2],[5,6],[3,0],[0,-4]],[[4970,8669],[-1,-1],[-2,6],[2,7],[2,-1],[-1,-3],[0,-8]],[[4977,8686],[-1,-7],[-3,0],[0,6],[4,1]],[[6206,7551],[-1,4],[-2,1],[-2,-1],[-2,1],[-2,4],[1,1],[-3,4],[-4,7],[-3,1],[-1,4],[-2,2],[-4,-2],[-1,-5],[-1,-2],[-8,3],[-8,0],[-2,-3],[-2,0],[-2,2],[-3,1],[-2,2]],[[6152,7575],[5,10],[2,7],[0,9],[-3,10],[-2,14],[-3,15],[-2,5],[-8,5],[-2,6],[-6,8],[-10,4],[-8,10],[-6,6]],[[6109,7684],[2,4],[1,4],[2,1],[10,-3],[4,1],[4,-3],[4,-4],[4,-2],[8,-3],[6,-6],[13,-2],[6,2],[4,0],[4,-4],[3,0],[3,1],[3,-2],[3,-3],[0,-2],[3,-4],[7,-5],[6,-3],[7,-7],[-2,-4],[0,-3],[2,-2],[4,0],[1,2],[3,1],[3,2],[3,3],[5,3],[4,-1],[4,-7],[2,7],[10,-5],[3,-7],[7,0],[4,-3],[-1,-7],[-2,-7],[1,-2],[7,-7],[1,-3],[6,-2],[2,0],[1,-2],[5,-4]],[[4929,8034],[-1,-4],[-2,2],[2,3],[1,-1]],[[4913,5479],[2,0]],[[4997,5824],[2,-4],[0,-9],[-2,-6],[-1,-5],[1,-2],[0,-2],[3,-4],[1,-3],[2,-4],[5,-8],[2,-1],[-1,-3],[0,-23],[-1,-2],[0,-8],[-2,0],[1,-5],[-1,-2],[0,-3],[-1,-2],[2,-1],[2,3],[1,0],[4,-5],[0,-3],[-1,-8],[-1,-6],[0,-8],[1,-4],[0,-3],[-1,-2],[-3,-3],[1,-2],[2,-9],[4,-5],[2,-7],[0,-3],[-2,-6],[-1,-4],[1,-24],[-3,-10],[0,-6],[1,-3],[1,0],[2,-2],[-1,-7],[0,-8],[-1,-5],[-1,-2],[0,-10],[2,-3],[2,-9],[1,-1],[0,-7],[5,-7],[2,-1],[2,-6],[1,-2],[3,-2],[0,-3]],[[5032,5534],[-2,-2],[-2,-3],[-1,-6],[-2,-5],[-5,-3],[-14,0],[-11,-11],[-6,-4],[-3,-6],[-6,-4],[-3,-6],[-8,-2],[-16,-12],[-3,-6],[-7,-6],[-2,0],[-5,6],[-4,3],[-9,5],[-6,2],[-4,2]],[[4763,5619],[-2,3],[0,3],[-1,1],[-2,0],[-1,-2],[0,-3],[-1,-3],[0,-3],[-1,-2],[-2,-8],[-1,-3],[-2,0],[0,-1],[-2,-2],[-2,0],[-2,4],[-2,5],[-3,2],[-1,-1],[-2,1],[0,2],[2,4],[0,3],[1,4],[0,4],[-2,9],[0,6],[-1,3],[0,8],[-1,1],[0,10],[-1,2],[-2,1],[-1,2],[0,2],[-1,1],[-1,-1],[-1,4],[-1,-1],[-8,-5],[0,4],[-2,1],[-2,-2],[-2,0]],[[4713,5672],[-2,1],[-1,-1],[-3,-7],[-1,-3],[-2,0],[-2,3],[0,2],[2,8],[3,7],[0,2],[-1,4],[-2,6],[0,11],[-3,1],[-1,3],[2,8],[0,3],[-2,4],[-3,7],[-2,9],[-3,7],[-2,3],[-2,5],[0,3],[-2,1],[-18,0],[0,-4],[-6,-3],[-4,3],[-4,-2],[-2,-2],[-2,-9],[-1,-2],[0,-2],[-1,-2],[0,-2],[-3,-11],[-2,-4],[-4,-2],[-1,-7],[-2,-4],[-2,-2],[-3,2],[-1,-1]],[[4630,5705],[0,9],[-3,6],[0,2],[-1,4],[-4,7],[-3,0],[1,5],[0,8],[-2,5],[1,4],[-1,0],[-1,-3],[-2,1],[-4,4],[-2,9],[0,1],[-4,0],[-7,7],[-5,17],[0,4],[1,8],[-3,-4],[0,3],[-2,7],[0,4],[-2,2],[-3,-1],[-1,-8],[-2,1],[0,6]],[[4581,5813],[3,8],[5,19],[1,5],[1,1],[2,0],[5,3],[3,4],[2,2],[4,-1],[4,1],[7,4],[0,13],[-1,3],[-3,5],[-2,5],[0,2],[2,3],[3,0],[1,1],[1,6],[0,5],[-1,7],[0,4]],[[4618,5913],[9,0],[1,-1],[4,-1],[4,0],[0,-8],[2,0],[2,2],[8,-8],[3,-1],[2,0],[2,-2],[3,-1],[3,3],[8,2],[2,-1],[7,2],[3,0],[2,-1]],[[4683,5898],[-1,-2],[-2,-7],[0,-5],[2,-4],[3,-5],[3,1],[5,10],[2,0],[2,-3],[2,-7],[2,-6],[1,-1],[2,2],[4,11],[3,3],[1,0],[2,2],[3,-2],[4,-4],[5,-4],[2,-1],[1,1],[2,6],[5,5],[3,1],[1,2],[0,5],[-2,4],[0,1],[3,2],[5,-3],[2,-2],[1,-4],[2,-13],[3,-11],[0,-14],[1,-2],[1,0],[1,-2],[1,-5],[6,-6],[2,-3],[0,-2],[-1,-2],[-3,-4],[-4,-11],[0,-2],[2,-1],[4,4],[2,-1],[2,-5],[0,-19],[1,-8],[1,-2],[7,-7],[0,-3],[1,-2],[-1,-4]],[[4539,5966],[16,0],[13,0],[3,8],[4,4],[4,1],[5,-2],[5,-6],[5,-3],[2,-4],[3,-3],[2,-1],[1,1],[3,1],[1,1],[5,0],[3,-3],[1,-4],[-1,-5],[-4,-2],[-7,-3],[-5,2],[-7,4],[-3,4],[-2,1],[-2,2],[-2,3],[-4,2],[-1,-1],[-1,-3],[0,-3],[-2,-2],[-10,-2],[-4,-2],[-1,-10],[-22,0],[-2,-2],[-2,-3]],[[4533,5936],[0,5],[-1,11],[2,5],[2,2],[2,-2],[0,-4],[1,-3],[4,-2],[4,1],[2,-1],[0,3],[1,3],[5,2],[5,1],[5,2],[4,-1],[1,2],[-3,1],[-8,-2],[-8,-1],[-6,-6],[-3,0],[-2,6],[-1,8]],[[4557,5822],[0,-2],[-1,0],[0,8],[1,-2],[0,-4]],[[4551,5820],[-2,-1],[-1,4],[2,1],[2,4],[1,0],[0,-6],[-2,-2]],[[4562,5829],[0,-2],[-1,0],[0,5],[1,2],[2,0],[0,-2],[-2,-3]],[[4557,5844],[-1,-2],[-2,2],[0,3],[2,4],[1,0],[0,-7]],[[4567,5848],[0,-2],[-2,2],[2,4],[2,1],[0,-3],[-2,-2]],[[4555,5868],[-1,-7],[-2,0],[-1,5],[3,2],[1,0]],[[4535,5895],[5,0],[5,2],[3,3],[3,1],[8,-1],[7,3],[6,5],[5,6],[13,0],[10,-1],[18,0]],[[4581,5813],[-1,5],[1,7],[-1,0],[-3,-6],[-1,0],[0,7],[-2,0],[-3,3],[0,7],[2,3],[0,1],[-2,0],[-1,-1],[-1,2],[1,5],[5,4],[3,0],[2,1],[-1,4],[-3,1],[-2,-1],[-3,-3],[-3,7],[0,3],[1,3],[2,2],[6,0],[3,3],[0,3],[-1,0],[-2,-3],[-7,1],[-2,-1],[-4,-6],[-4,-3],[-4,1],[1,8],[-1,2],[-5,-2],[-4,3],[-2,4],[1,6],[2,3],[0,2],[-2,0],[-4,-2],[-7,9]],[[5265,5243],[1,1],[-3,4],[-2,0],[-1,1],[1,9],[2,8],[2,6],[2,1],[0,3],[2,10],[2,8],[0,22]],[[5242,5400],[4,0],[2,-3],[-1,-5],[-4,-13],[-2,-10],[-2,0],[-5,2],[0,2],[-1,2],[1,5],[0,2],[3,2],[2,11],[1,3],[2,2]],[[5661,7230],[6,0],[1,3],[2,1],[1,-4],[-2,-1],[0,-2],[4,-1],[0,-5],[1,-1],[4,0],[5,3],[3,1],[7,-1],[3,-4],[6,0],[5,-2],[2,1],[5,1],[0,-12],[1,-1],[2,1],[1,3],[4,2],[4,0],[3,5],[0,-9],[-1,-3],[0,-3],[-2,-2],[-4,0],[-6,1],[-6,-1],[-11,-3],[-11,-2],[-2,1],[0,7],[-4,3],[-4,2],[-16,5],[-6,0],[-2,1],[-1,2],[0,7],[1,7],[3,-1],[1,2],[0,6],[1,-1],[1,-5],[1,-1]],[[5754,7226],[-1,-3],[-1,3],[0,3],[-1,5],[2,7],[0,4],[2,1],[0,-6],[-2,-5],[2,-4],[0,-4],[-1,-1]],[[5639,7268],[0,-3],[-3,2],[-1,3],[0,5],[1,3],[2,-2],[3,-5],[-2,-3]],[[5772,7253],[-2,-1],[-1,2],[1,7],[-1,6],[5,10],[9,5],[0,-4],[-2,-9],[-2,-5],[0,-3],[-3,-1],[-4,-7]],[[5707,7279],[-2,-3],[-1,2],[2,4],[1,-3]],[[5734,7291],[-4,-5],[-1,2],[0,3],[2,-1],[2,3],[1,-2]],[[5773,7289],[-1,-1],[-1,4],[2,2],[0,-5]],[[5680,7301],[1,-4],[-1,-1],[-5,-1],[0,3],[1,2],[1,-2],[1,2],[2,1]],[[5704,7296],[-1,-1],[-2,3],[0,3],[1,1],[3,-4],[-1,-2]],[[5748,7299],[0,2],[3,4],[4,4],[4,-2],[-6,-5],[-3,-1],[-2,-2]],[[5686,7310],[-2,2],[1,4],[2,-4],[-1,-2]],[[5749,7312],[-2,-1],[0,5],[1,1],[2,-4],[-1,-1]],[[5701,7318],[-2,-4],[-2,0],[-1,2],[1,5],[3,2],[1,-1],[0,-4]],[[5709,7313],[-3,-3],[-2,4],[-1,4],[5,8],[2,-3],[0,-6],[-1,-4]],[[5680,7322],[-1,-1],[-2,1],[2,5],[1,-1],[0,-4]],[[5678,7334],[-2,-1],[1,4],[-1,2],[2,1],[1,-2],[-1,-4]],[[5692,7343],[0,-6],[-2,1],[1,6],[1,-1]],[[5705,7339],[-3,-1],[0,5],[1,1],[3,-2],[-1,-3]],[[5722,7345],[-1,2],[3,4],[3,0],[0,-4],[-5,-2]],[[5700,7349],[-1,-4],[-6,8],[1,1],[2,-2],[4,-1],[0,-2]],[[5675,7348],[-1,-3],[-1,4],[1,4],[2,1],[1,-2],[-2,-4]],[[5744,7361],[3,-2],[3,0],[0,-4],[-2,0],[-3,-3],[-2,0],[-2,3],[-3,0],[-1,1],[2,3],[3,2],[2,0]],[[5579,7361],[1,-4],[-3,-4],[-3,4],[-2,5],[0,2],[2,4],[2,-4],[2,-1],[1,-2]],[[5693,7358],[-1,-4],[-2,5],[-2,3],[-1,3],[-2,1],[0,4],[3,1],[1,-4],[3,0],[0,-3],[1,-6]],[[5653,7368],[-2,-2],[-2,2],[2,3],[2,-1],[0,-2]],[[5572,7394],[0,-7],[2,-1],[2,-6],[0,-4],[-5,3],[-2,-1],[-1,3],[0,4],[-1,1],[-3,-4],[0,3],[3,8],[1,-3],[1,1],[1,4],[2,-1]],[[5576,7391],[-2,-1],[-2,6],[0,4],[2,-2],[0,-3],[2,-4]],[[5724,7385],[-3,-4],[-3,5],[0,2],[2,1],[1,3],[-1,4],[-3,5],[0,4],[4,2],[3,-4],[2,0],[-1,-4],[1,-10],[-2,-1],[0,-3]],[[5574,7407],[-3,0],[-1,3],[1,6],[1,3],[2,2],[0,-14]],[[5684,7419],[-3,-2],[0,3],[-3,3],[1,4],[2,-1],[3,-7]],[[5649,7427],[3,-8],[3,-3],[2,0],[5,-4],[6,-1],[3,-8],[0,-4],[2,-14],[3,-4],[2,-1],[3,1],[1,-2],[0,-6],[-2,-3],[-3,3],[-1,0],[-2,3],[-3,3],[0,5],[-3,6],[-1,1],[0,3],[-5,1],[-3,0],[-3,3],[-1,6],[-3,3],[-1,3],[-6,8],[-3,3],[-3,1],[-3,-2],[-2,2],[8,8],[5,2],[2,-5]],[[5659,7436],[-1,-2],[-2,1],[-2,7],[5,-6]],[[5662,7439],[0,4],[3,2],[-1,-4],[-2,-2]],[[5733,7449],[-1,-4],[4,-5],[2,-8],[-2,-3],[-4,-1],[-6,3],[-2,3],[4,5],[-2,2],[-3,-6],[-6,5],[2,6],[3,0],[4,3],[0,2],[5,1],[2,-3]],[[5557,7455],[0,-4],[-3,2],[-3,3],[-2,7],[-4,8],[0,3],[1,2],[4,1],[3,-4],[-3,-5],[2,-3],[0,-6],[3,-4],[2,0]],[[5706,7486],[-2,-2],[0,-3],[-1,-5],[-6,1],[-2,2],[0,8],[5,1],[1,-3],[2,1],[1,2],[2,1],[0,-3]],[[5712,7512],[-3,-2],[-3,5],[3,2],[2,-1],[1,-4]],[[5687,7523],[-3,-2],[-4,3],[0,3],[2,5],[1,1],[3,0],[1,-4],[0,-6]],[[5581,7536],[4,1],[6,0],[2,2],[2,0],[3,-2],[6,5],[4,9],[9,3],[4,-2],[3,0],[3,1],[3,2],[1,8],[1,1],[3,0]],[[5730,7586],[3,-1],[2,-4],[2,-2],[2,-11],[-1,-3],[-2,0],[-6,-6],[0,-10],[1,-4],[-3,-7],[-2,-3],[-2,-5],[-2,-1]],[[5722,7529],[-1,3],[-4,4],[-10,2],[-5,4],[-2,-1],[-4,4],[-8,-8],[-4,0],[-3,4],[-2,1],[-3,-2],[-4,-7],[-4,-4],[-4,1],[-5,0],[-1,-4],[1,-3],[3,-4],[-1,-4],[1,-4],[4,0],[6,-5],[2,-5],[1,-5],[-5,7],[-7,5],[-2,0],[-3,-2],[0,-2],[5,-8],[2,-2],[1,-5],[-2,-4],[-3,4],[-5,11],[-6,2],[-1,-2],[1,-6],[1,-3],[6,-6],[-2,-2],[-6,4],[-2,5],[-1,8],[-5,5],[-6,5],[-1,5],[2,6],[-3,0],[-2,-3],[-3,-2],[-1,-4],[1,-4],[-1,-5],[-1,-9],[0,-5],[7,-13],[4,-14],[4,-4],[3,-8],[2,-4],[1,-6],[-3,-4],[-2,-1],[-1,2],[2,5],[-1,2],[-4,5],[-5,-4],[3,-9],[1,-5],[-1,-4],[-4,-3],[-3,0],[0,-3],[3,-3],[6,-3],[4,-4],[3,-1],[3,-8],[6,-2],[3,-8],[4,-1],[4,-3],[1,-3],[0,-5],[1,-11],[0,-14],[-2,-2],[-3,6],[-4,6],[-4,8],[-2,1],[-3,-2],[-6,-2],[-4,-4],[3,-6],[0,-4],[1,-6],[6,-2],[0,-2],[2,-3],[0,-3],[-9,-6],[-1,1],[0,5],[-7,5],[-2,3],[-2,-2],[1,-9],[3,-6],[4,-16],[2,-9],[0,-5],[-1,-7],[2,-6],[-1,-3],[-3,2],[-4,9],[-1,6],[-2,1],[-3,-1],[-3,-12],[0,-7],[-4,3],[1,8],[-5,14],[-1,1],[-3,7],[-3,-2],[-1,-6],[0,-5],[-1,-4],[-4,8],[-5,12],[0,7],[4,6],[-1,5],[-3,9],[-4,5],[-3,2],[-1,6],[-4,5],[0,3],[5,7],[2,9],[2,1],[3,-2],[3,0],[2,6],[2,3],[4,0],[8,-8],[8,-4],[5,-4],[2,-4],[4,-1],[-1,5],[2,1],[4,0],[2,4],[-1,2],[-3,2],[-3,0],[-3,2],[-2,3],[-5,3],[-4,5],[-1,-3],[-5,-2],[-7,4],[-4,-3],[-7,-2],[-3,0],[-3,8],[-1,1],[0,-6],[-4,-2],[-2,2],[-1,7],[-2,9],[-3,7],[-3,2],[0,6],[3,1],[5,-3],[3,2],[-1,3],[0,3],[-3,0],[-3,1],[-4,-2],[-2,2],[0,2],[-4,4],[-2,6],[-5,4],[-3,13],[-3,6],[-2,3]],[[3285,5875],[-1,2],[0,4],[2,7],[2,-1],[-1,-9],[-2,-3]],[[3714,8684],[-3,-7],[-3,2],[-2,3],[-3,1],[-4,0],[0,1],[11,8],[6,2],[-2,-6],[0,-4]],[[3970,8958],[-4,0],[-1,4],[0,5],[5,2],[3,-4],[-1,-5],[-2,-2]],[[3582,9189],[-4,-2],[-2,2],[-3,11],[1,4],[-1,3],[7,4],[4,-1],[7,-4],[0,-1],[-6,-4],[-2,-5],[-1,-7]],[[3534,9212],[10,-5],[9,-3],[2,-4],[-1,-3],[3,-3],[0,-2],[-5,-6],[-19,-7],[-22,-7],[-6,1],[-7,4],[-4,4],[4,2],[11,1],[-5,5],[-3,-1],[-6,2],[-10,1],[-6,2],[-4,3],[-1,3],[2,11],[1,2],[4,1],[8,-2],[1,1],[-9,4],[-3,2],[-2,5],[1,5],[3,2],[9,3],[10,-1],[18,-4],[7,-5],[10,-11]],[[3564,9264],[-13,1],[1,6],[4,0],[9,-4],[-1,-3]],[[4293,9268],[1,-5],[-2,-3],[3,-5],[-2,-2],[-11,-3],[-7,-5],[-4,-4],[-2,0],[-2,4],[-7,2],[-14,-1],[-16,-3],[-6,-2],[-3,1],[-1,3],[3,6],[4,1],[2,4],[-1,5],[1,6],[3,1],[10,-3],[8,0],[10,1],[7,2],[15,7],[2,0],[4,-4],[5,-3]],[[3512,9275],[-3,0],[-7,3],[-2,2],[3,5],[4,4],[4,1],[4,-7],[0,-4],[-3,-4]],[[3471,9376],[-14,-13],[-7,3],[-3,3],[-5,-1],[-4,4],[6,3],[9,1],[4,-1],[8,3],[5,0],[1,-2]],[[4499,9527],[3,-12],[4,-4],[7,1],[3,-7],[-5,-2],[-22,1],[-9,-1],[-6,4],[1,7],[0,8],[6,4],[6,-4],[12,5]],[[4483,9563],[-3,-1],[-11,24],[1,15],[5,0],[4,-3],[2,-14],[2,-21]],[[3008,9637],[-9,0],[-10,2],[-4,2],[2,3],[13,1],[15,-4],[-1,-2],[-6,-2]],[[4500,9655],[-5,0],[-1,5],[8,8],[6,0],[1,-5],[-2,-4],[-7,-4]],[[4471,9674],[-6,5],[-2,8],[0,9],[5,4],[5,0],[0,-12],[2,-5],[-4,-9]],[[4510,9781],[-12,-6],[-17,0],[-11,3],[-3,5],[4,5],[13,4],[16,2],[14,-1],[2,-5],[-6,-7]],[[4481,9898],[-3,-2],[-8,0],[-15,10],[-1,5],[9,2],[6,-4],[12,-11]],[[3753,9911],[-6,-1],[-12,6],[-18,6],[-17,4],[-15,11],[1,7],[24,2],[28,-6],[13,-6],[5,-5],[-3,-18]],[[4167,9996],[27,-3],[14,-4],[22,-1],[18,-2],[30,-5],[5,-2],[-11,-2],[-39,-2],[-70,-2],[-40,-4],[-13,0],[-1,-6],[15,0],[31,6],[12,1],[22,0],[28,-2],[32,0],[24,2],[28,3],[8,-8],[10,-8],[9,1],[13,-4],[8,0],[24,-2],[24,-6],[4,-5],[-2,-3],[-11,-5],[-13,-4],[-18,-4],[-21,-2],[-159,-7],[-5,-2],[-3,-4],[2,-6],[7,-1],[18,3],[30,3],[22,0],[52,-3],[16,-6],[8,-11],[18,2],[4,2],[6,7],[3,6],[7,2],[38,3],[6,-1],[6,-7],[0,-14],[-3,-6],[-7,-9],[-6,-5],[-20,-12],[-18,-12],[-3,-5],[6,-1],[4,5],[20,6],[18,9],[9,3],[11,5],[20,14],[11,5],[11,0],[2,-8],[29,-2],[4,-2],[14,-2],[7,2],[26,18],[20,5],[9,-1],[27,0],[15,-2],[21,-4],[15,-2],[16,-6],[12,-6],[-3,-3],[-20,-6],[-6,-5],[-19,-8],[-9,-3],[-20,-1],[-8,-3],[5,-3],[1,-5],[-7,-4],[-19,-2],[-10,-4],[-12,-1],[-9,1],[-13,-5],[10,-5],[13,-3],[0,-2],[-6,-4],[-9,-4],[-14,-4],[-10,1],[-10,-2],[-10,0],[-17,2],[-14,3],[-7,0],[-12,-6],[-8,-8],[-1,-9],[6,-6],[16,0],[3,-4],[-4,-16],[1,-3],[7,-2],[5,-6],[-3,-4],[-18,-5],[-4,-9],[-5,-4],[-9,0],[-7,-2],[-14,-8],[5,-4],[0,-2],[-7,-10],[-2,-5],[-3,-13],[-4,-4],[-6,-12],[0,-5],[5,-3],[5,3],[7,8],[8,4],[8,-1],[23,-7],[7,-3],[5,-6],[0,-2],[-6,-1],[-12,6],[-6,1],[-14,-4],[6,-10],[6,-4],[12,-2],[14,-7],[5,1],[6,3],[9,0],[7,-4],[1,-12],[-1,-5],[-5,-8],[-7,-1],[-6,3],[-15,2],[-15,4],[-12,0],[-13,-2],[0,-3],[-18,-9],[-4,1],[-12,6],[-10,-4],[-2,-3],[9,-5],[11,-1],[4,-10],[7,-8],[9,0],[8,2],[12,-4],[10,-1],[6,-5],[-2,-7],[4,-6],[7,-6],[2,-6],[0,-5],[2,-6],[1,-12],[-4,-6],[-8,-2],[-6,6],[-5,3],[-8,0],[-12,-9],[-9,-1],[-5,-4],[-6,-2],[-6,0],[-1,-2],[5,-2],[7,2],[11,5],[4,-2],[4,-9],[-3,-9],[-4,-5],[5,-1],[7,6],[5,14],[6,2],[6,-2],[5,-7],[7,-13],[7,-5],[2,-4],[0,-4],[-2,-6],[-10,-3],[-11,2],[-6,0],[1,-5],[-12,-4],[-13,-1],[-12,3],[-11,5],[4,6],[2,7],[-5,5],[-2,0],[2,-7],[-1,-3],[-10,-5],[4,-6],[-4,-6],[1,-4],[8,-3],[19,-1],[8,-1],[18,-5],[1,-2],[-3,-9],[-2,-10],[-3,-1],[-19,-1],[-6,-1],[-10,-4],[-8,-5],[-5,-1],[-17,5],[-7,3],[-15,8],[-11,13],[-8,-8],[-6,-1],[-7,3],[0,-5],[4,-2],[-1,-2],[-6,-1],[-8,-3],[-12,-9],[-12,-1],[-6,3],[-10,2],[-14,5],[2,-3],[16,-6],[2,-2],[-5,-4],[-15,0],[-9,-2],[1,-2],[5,-2],[5,4],[12,-1],[9,3],[11,1],[18,5],[3,5],[6,2],[13,1],[13,0],[6,-1],[5,-5],[8,-3],[5,-4],[7,-1],[4,-5],[11,-6],[8,-1],[4,-3],[0,-11],[1,-5],[-2,-14],[-6,-3],[1,-7],[-1,-6],[-6,2],[-6,4],[-14,6],[-13,4],[-11,6],[-8,11],[-5,13],[-2,7],[-5,1],[-10,-4],[-2,-3],[-17,-5],[-6,-3],[-4,0],[-12,-4],[5,-3],[7,1],[3,2],[12,4],[9,1],[10,5],[5,0],[1,-2],[3,-16],[-1,-4],[-12,-5],[-2,-2],[2,-3],[8,3],[5,3],[3,-1],[4,-5],[17,-8],[6,-4],[8,-3],[9,-5],[13,-5],[4,-8],[3,-1],[8,0],[-1,-4],[-9,-7],[-5,-3],[1,-7],[3,-1],[3,5],[2,0],[6,3],[6,-2],[2,-15],[0,-20],[1,-3],[3,-17],[-3,-3],[-8,-1],[-4,1],[-9,0],[0,8],[-1,3],[0,12],[-3,-3],[0,-5],[-2,-13],[-2,-4],[-7,1],[-11,0],[-13,6],[-5,6],[-7,15],[-1,7],[-3,6],[-5,5],[-13,6],[-12,8],[-12,6],[-9,1],[-13,-1],[-9,3],[-4,-2],[1,-4],[18,-2],[11,0],[6,-1],[3,-2],[2,-10],[-2,-5],[-8,-5],[-15,-7],[-4,-1],[-17,0],[-16,3],[-11,0],[-3,-1],[3,-2],[9,-3],[-1,-8],[-4,-6],[-7,-5],[-17,-6],[2,-1],[11,2],[15,-5],[12,1],[23,4],[4,-1],[3,-4],[-2,-2],[-14,-5],[-4,-1],[-10,-8],[-1,-5],[6,-2],[3,2],[7,10],[8,2],[9,-1],[8,1],[17,7],[22,-4],[19,-6],[11,-3],[13,-1],[25,0],[2,-1],[-2,-4],[-4,-3],[-5,-1],[-12,-4],[-1,-1],[2,-4],[-6,-1],[-9,-3],[-9,0],[3,-3],[1,-6],[-6,-1],[-8,2],[-2,-1],[2,-3],[0,-3],[-2,-2],[-16,-9],[-9,-1],[3,-4],[0,-2],[-5,-4],[-9,-4],[0,-4],[-3,-4],[-7,-4],[-5,-2],[-6,-5],[-13,-2],[-7,-3],[-5,-1],[-17,-6],[-7,0],[-7,-2],[-13,-5],[-7,-2],[-4,-2],[-5,0],[-13,1],[-5,-2],[-4,-5],[-3,0],[-11,3],[3,-5],[0,-2],[-7,-3],[-9,1],[-7,2],[-9,6],[-11,9],[-5,3],[0,-3],[4,-5],[0,-2],[-5,-3],[6,-8],[0,-5],[-6,-6],[-2,0],[-13,-10],[-4,-1],[-2,-2],[-6,-12],[-5,-4],[1,-3],[-3,-9],[-8,-13],[-6,-12],[-5,-6],[-4,0],[-2,-2],[-2,-7],[-2,-2],[-15,-11],[-7,1],[-7,5],[-2,-2],[3,-10],[-5,-5],[-6,-4],[-9,-9],[-1,7],[-3,1],[-4,-10],[-8,-1],[-3,5],[-5,-4],[-2,0],[-3,-8],[-3,-2],[-4,1],[-3,-3],[-5,3],[-1,4],[4,6],[1,3],[-1,3],[1,4],[9,12],[6,6],[-1,1],[-14,4],[-7,1],[-3,-1],[5,-4],[6,-3],[-6,-7],[-2,-10],[-2,-4],[-8,5],[-1,-4],[7,-5],[0,-7],[-12,-5],[-13,-1],[-24,-3],[-6,0],[0,-2],[17,-10],[-2,-3],[-3,-2],[-5,-7],[-9,-5],[-12,3],[-5,-1],[-6,1],[0,-4],[3,-9],[4,0],[5,2],[4,-5],[2,-9],[4,-4],[3,-7],[-8,-8],[-6,0],[0,-4],[-3,-3],[-5,1],[-6,3],[-11,1],[11,-7],[4,-3],[6,2],[6,-2],[-1,-12],[2,-9],[1,-2],[-6,-6],[-1,-5],[-3,-2],[-4,1],[0,-6],[-3,-4],[1,-4],[-4,-8],[-4,-4],[-12,0],[-7,7],[-2,-2],[6,-6],[9,-5],[-1,-3],[-2,-1],[-5,-9],[-2,0],[-2,-3],[-10,2],[-9,-1],[-3,1],[0,-3],[10,-4],[9,-2],[0,-3],[-2,-3],[1,-4],[-1,-6],[-2,-8],[2,-5],[2,-3],[1,-9],[-3,-5],[-8,-1],[-2,-2],[7,-2],[0,-4],[-2,-4],[-2,-10],[-4,-18],[-2,-17],[-10,-14],[-4,-1],[-4,1],[-7,3],[-5,1],[-4,0],[3,-4],[4,-1],[4,-2],[6,-1],[3,-3],[1,-4],[0,-4],[1,-11],[-3,-4],[-2,-4],[-8,1],[-4,-2],[2,-3],[-7,-2],[-5,1],[1,5],[-6,-2],[-3,0],[-2,7],[8,13],[-1,2],[-4,-4],[-5,-10],[-2,-1],[-6,2],[-15,9],[0,10],[5,0],[6,5],[-3,2],[-6,-3],[-4,1],[-4,3],[-10,4],[-3,2],[-3,9],[4,11],[4,7],[1,5],[-1,2],[-2,0],[-2,-7],[-8,-4],[-8,-3],[-6,-6],[-2,-3],[-7,0],[-3,-2],[-4,1],[-2,3],[-4,0],[-6,-1],[2,-6],[-8,0],[-2,1],[-4,4],[1,2],[12,9],[-2,1],[-8,-1],[-2,1],[-5,-1],[0,8],[-1,3],[-2,2],[-12,3],[-2,8],[-1,6],[-5,1],[-2,3],[2,2],[1,3],[-4,4],[1,1],[-3,7],[2,3],[7,4],[1,2],[6,2],[-5,2],[-6,-1],[-4,-5],[-7,-1],[-1,1],[-1,8],[4,5],[-7,3],[-8,4],[-7,7],[2,6],[0,6],[-1,2],[6,10],[0,5],[-7,-9],[-2,1],[-3,6],[-8,8],[-2,5],[-4,5],[-5,10],[-8,12],[-1,7],[2,8],[-3,6],[8,3],[19,6],[7,0],[-4,3],[1,3],[-1,2],[-7,-5],[-23,-7],[-4,6],[5,7],[3,8],[5,6],[3,1],[8,-1],[-1,3],[1,2],[4,2],[6,1],[3,-1],[3,-4],[3,-7],[4,-3],[0,4],[-2,4],[-1,7],[-5,4],[-6,0],[-4,5],[-1,4],[-3,7],[-3,9],[-1,0],[1,-6],[2,-4],[3,-13],[-1,-3],[-6,-5],[-7,-2],[2,4],[1,5],[-4,-2],[-3,-3],[-1,-5],[-7,-14],[-5,-8],[-2,-1],[-2,2],[-3,10],[0,15],[-4,22],[0,5],[-6,3],[-2,7],[2,2],[8,5],[6,5],[6,8],[3,2],[10,2],[5,0],[0,2],[-8,0],[-10,-3],[-8,-9],[-9,-6],[-6,0],[-5,7],[-7,-1],[-6,1],[-1,11],[4,11],[-5,1],[-3,4],[10,7],[15,11],[12,8],[5,7],[6,3],[11,9],[-4,1],[-35,-29],[-4,-3],[-6,-6],[-3,-1],[-8,-1],[-3,-1],[-2,1],[-1,7],[1,4],[-1,4],[2,5],[3,4],[1,4],[9,6],[2,4],[12,2],[5,0],[1,2],[-5,1],[-9,0],[-9,1],[-6,0],[-4,1],[-3,3],[-6,8],[3,11],[0,5],[10,7],[6,3],[7,6],[8,4],[8,0],[13,-5],[7,-1],[6,1],[7,-2],[14,-7],[2,1],[-1,2],[-14,7],[0,3],[4,0],[4,3],[-3,1],[-9,-1],[-3,-2],[-10,-1],[-9,2],[-7,4],[-5,-2],[-13,-3],[-12,-11],[-5,-2],[-3,1],[3,10],[1,7],[6,7],[6,14],[3,1],[17,-5],[10,-4],[8,-1],[5,0],[4,4],[2,6],[5,6],[0,5],[-7,-1],[-5,-7],[-5,-2],[-11,-1],[-5,0],[-9,2],[-2,3],[-11,-1],[-6,0],[5,7],[5,11],[4,3],[8,3],[8,-1],[15,-8],[4,-1],[14,3],[5,5],[4,7],[-6,-2],[-6,-1],[2,11],[1,9],[1,2],[8,-1],[11,1],[3,3],[-5,1],[-2,3],[-8,-3],[-7,1],[5,11],[3,11],[0,4],[2,3],[11,4],[0,2],[-5,6],[1,2],[4,2],[0,2],[-3,0],[-10,-2],[-8,3],[-3,0],[-8,-4],[-3,1],[-18,4],[-3,1],[-6,5],[-13,8],[-9,3],[-18,3],[-4,3],[-10,11],[-1,2],[6,6],[5,1],[8,0],[10,-3],[11,0],[13,-2],[6,-2],[18,-11],[7,-4],[3,0],[13,-4],[7,2],[-1,2],[-6,1],[-10,8],[-1,6],[2,4],[0,5],[-4,3],[-9,5],[2,2],[4,0],[7,-3],[4,0],[3,2],[-4,2],[-6,5],[-19,0],[-5,1],[-5,3],[-10,-1],[-6,0],[-3,8],[0,2],[3,1],[3,5],[4,3],[22,5],[1,4],[-5,-2],[-3,0],[-13,3],[-7,-5],[-7,-3],[-3,0],[-4,2],[-1,4],[4,2],[5,5],[0,2],[-5,-1],[-1,2],[0,7],[-6,9],[-4,-1],[6,-6],[1,-7],[-7,-6],[-2,-4],[-3,-2],[-3,1],[3,-8],[-2,-4],[-10,-4],[-14,-1],[-6,2],[-8,1],[-7,8],[-2,4],[0,4],[3,4],[3,11],[4,9],[12,12],[1,3],[-2,1],[-12,-11],[-7,-1],[-2,2],[2,6],[6,-1],[2,3],[-4,4],[-4,1],[4,3],[9,0],[9,8],[2,4],[-1,5],[1,5],[-4,5],[-6,3],[-3,-5],[-3,0],[-10,4],[-1,6],[7,3],[4,6],[-1,8],[-3,4],[-8,-5],[-1,5],[-9,5],[0,4],[2,3],[1,5],[4,0],[-2,8],[-3,3],[-6,10],[-4,3],[-3,0],[-19,-4],[-2,1],[9,4],[6,1],[2,4],[-2,8],[1,2],[9,2],[3,2],[-8,5],[-8,3],[-7,10],[-8,6],[-13,5],[-4,4],[-4,6],[-4,4],[-9,4],[-1,2],[9,5],[1,2],[-7,11],[-10,2],[-6,2],[-10,6],[-8,2],[-12,5],[-20,6],[-9,4],[-12,1],[-13,4],[-11,1],[-7,-1],[-7,4],[-8,2],[-4,-1],[-11,-7],[-3,0],[-10,6],[-11,-6],[-6,-2],[-15,-3],[-3,1],[-9,6],[-2,0],[-11,-5],[-6,-1],[-8,4],[-6,-1],[6,-8],[5,-5],[-4,0],[-37,6],[-5,1],[-21,11],[-8,3],[-3,4],[2,2],[15,7],[6,2],[11,1],[4,2],[-3,2],[-15,-1],[-13,1],[-12,3],[-6,5],[0,3],[-9,-1],[-7,-3],[-8,2],[-1,5],[-10,6],[0,3],[5,4],[10,3],[26,2],[19,-2],[7,6],[4,2],[13,2],[19,1],[20,-3],[9,-3],[-2,6],[4,4],[0,6],[-10,7],[-4,0],[-9,-3],[-10,-5],[-13,-2],[-9,2],[-7,3],[-5,-1],[-3,-3],[-10,-4],[-4,0],[-18,5],[-4,2],[0,3],[-5,3],[-7,2],[13,6],[0,1],[-9,0],[-5,-3],[-11,0],[-11,2],[-3,3],[-16,3],[-20,13],[-1,2],[7,5],[-4,5],[1,2],[8,6],[11,3],[14,5],[17,0],[13,5],[12,3],[28,4],[2,2],[-3,3],[18,6],[14,1],[14,4],[22,1],[9,-2],[8,1],[11,8],[8,10],[8,17],[5,15],[5,3],[12,3],[-4,2],[-6,0],[-12,-3],[-11,0],[-5,-2],[-12,-1],[-13,3],[-14,0],[-7,8],[6,11],[11,7],[18,7],[9,2],[16,8],[10,8],[5,2],[17,3],[13,-2],[6,4],[0,3],[6,4],[9,0],[18,-2],[11,-4],[6,1],[7,9],[2,7],[-3,20],[10,6],[11,4],[15,1],[17,-3],[24,-11],[10,-4],[16,-5],[18,-9],[5,0],[-5,4],[-28,12],[-10,5],[-17,10],[-12,3],[0,2],[15,5],[28,4],[31,3],[11,0],[18,2],[2,2],[21,4],[5,0],[16,-5],[8,-6],[3,-6],[-1,-19],[5,-3],[11,11],[3,10],[-5,4],[0,8],[2,4],[7,0],[29,-14],[11,-3],[12,-8],[15,1],[20,-1],[3,2],[-4,3],[-20,8],[-9,7],[-6,8],[-1,5],[4,1],[22,0],[33,-4],[42,-14],[20,-4],[37,-15],[11,-3],[5,0],[5,4],[-3,10],[3,13],[6,3],[2,4],[-2,6],[-7,4],[-27,10],[5,3],[8,1],[67,-3],[12,-1],[7,-2],[17,1],[-2,4],[-78,5],[-22,1],[-7,-1],[-23,0],[-10,5],[9,7],[21,-3],[21,6],[12,1],[28,7],[12,0],[20,-3],[6,-4],[15,-2],[17,10],[9,3],[13,-2],[16,-5],[11,-2],[18,-10],[7,3],[1,8],[-18,5],[-3,5],[6,3],[9,-1],[13,6],[17,-2],[9,0],[5,4],[40,0],[14,2],[15,-3],[8,0],[24,5],[63,-1],[21,-2]],[[2548,6089],[-3,-6],[-5,-8],[-4,-7],[-8,-12],[0,-1],[-6,-5],[-1,-8],[0,-2],[1,-5],[1,-7],[-1,-3],[-3,-5],[-1,-4],[-1,-2]],[[2517,6014],[-2,1],[-2,-1],[-2,-2],[0,-2],[1,-4],[0,-2],[-4,-4],[-1,-2],[-1,-4],[-2,-1],[-3,-3],[-5,-10],[0,-3],[1,-3]],[[2497,5974],[-11,10],[-4,2],[-15,-1],[-6,4],[-7,7],[-5,7],[-12,18]],[[2437,6021],[2,5],[0,19],[2,4],[1,3],[-4,9],[0,2],[1,3],[2,10],[4,12],[4,13],[2,8],[21,0],[15,0],[-1,5],[2,11],[0,2],[-2,3],[-3,2],[-1,2],[0,3],[-2,9],[-3,4],[-5,5],[-4,6],[-5,13],[-3,3],[12,0],[0,32],[22,0],[13,0],[16,0]],[[2530,6099],[1,-2],[2,0],[2,-3],[3,-3],[2,5],[-2,5],[0,1],[10,-13]],[[9019,5947],[-1,0],[-1,2],[0,8],[4,5],[1,6],[2,-1],[1,-2],[-5,-9],[-1,-9]],[[3312,5483],[-6,13],[-12,28],[0,1],[2,7],[2,4],[3,5],[-1,10],[1,4],[-1,3],[-1,5],[2,6],[1,1],[4,1],[2,3],[2,0],[3,-1],[3,5],[6,5],[2,9],[-2,4],[-2,0],[-2,-1],[-2,0],[-1,4],[0,2],[1,4],[-1,2],[-2,8],[0,2],[1,4],[2,3],[1,7],[1,2],[4,1],[6,10],[4,3],[1,6],[0,2],[4,3],[0,4],[-5,14]],[[3332,5676],[1,-1],[4,-9],[2,-2],[1,0],[0,2],[2,-1],[5,-6],[8,-11],[11,-19],[3,-8],[2,-3],[3,-9],[1,-4],[0,-16],[-3,-12],[-1,-8],[1,-4],[2,6],[3,7],[3,2],[3,-3],[3,-1],[3,-2],[5,-11],[5,-8],[2,-7],[5,-3],[4,-6],[1,-5],[0,-12],[-1,-19]],[[3410,5503],[-1,-4],[0,-2],[-1,-4],[-1,-2],[1,-5],[2,-1],[0,-3],[-2,-2],[-1,-3],[0,-5],[-7,0],[-2,-1],[-2,0],[-1,-2],[-2,-2],[-1,0],[-2,-6],[1,-2],[1,-4],[0,-8],[-2,-7],[-2,-13],[-1,-3],[0,-10],[4,-9],[1,-4],[1,-6],[3,-5],[2,-4],[0,-7],[1,-2],[3,-1],[2,1],[0,1],[3,0],[1,-2],[0,-10],[1,-2],[0,-3],[1,-5],[0,-8],[2,-5],[1,-1],[1,-5],[1,-3],[1,-6],[1,-3],[2,-8],[2,-5],[1,-7],[2,-4],[2,-2],[2,0],[2,-4]],[[8172,6463],[-1,-1],[-2,4],[2,2],[1,-2],[0,-3]],[[8165,6463],[-4,0],[1,4],[3,-1],[0,-3]],[[8173,6482],[0,-5],[2,-4],[-2,-1],[0,-5],[-4,4],[-3,1],[-2,-1],[-2,4],[4,3],[0,2]],[[7046,2123],[-3,-3],[-4,0],[-3,9],[-2,3],[1,1],[2,-2],[6,-2],[6,-6],[-3,0]],[[2689,6047],[-7,1],[-3,-2],[-3,-6],[-1,1],[-2,-2],[-3,-4],[-3,-1],[-3,1],[-1,-1],[0,-2],[-2,-1],[-2,2],[-1,-4],[-3,1],[-2,-3],[-2,-1],[-3,2],[-2,3],[-2,4],[-2,1],[-3,-3],[-2,-4],[0,-4],[-1,-2],[-1,0],[-1,-3],[-1,-5],[0,-6],[-3,-3],[-2,-3],[-3,-7],[-3,-5],[-3,-2],[-1,-3],[0,-4],[-2,-1],[-5,7],[-2,5],[-3,-4],[-5,-13],[-8,1],[-3,-1],[-1,-1],[0,-6],[1,-13],[1,-6],[-1,-2],[-2,0],[-2,-1],[-1,-2],[0,-3],[-1,-3],[0,-4],[-3,-3],[-8,-1]],[[2573,5931],[0,6],[-2,2],[-2,9],[0,4],[-3,2],[-3,-1],[-3,2]],[[2560,5955],[2,3],[0,3],[-1,1],[0,4],[1,4],[1,9],[-1,2],[-2,2],[-2,1],[-3,-1],[-1,1],[-1,3],[-2,2],[-4,-3],[-5,-5],[-1,0],[0,7],[-2,2],[-3,1],[-2,3],[-3,3],[0,2],[-4,5],[-1,3],[-2,4],[-2,-1],[-5,4]],[[2548,6089],[3,-1],[2,3],[2,2],[2,4],[1,1],[5,2],[2,0],[2,-5],[2,-2],[3,2],[3,0],[10,-4],[4,2],[8,0],[3,-1],[5,6],[3,1],[4,3],[0,3],[4,0],[9,-6],[9,1],[3,3],[2,1],[9,-6],[2,-5],[2,0],[2,1],[0,1],[-2,1],[-1,2],[8,-3],[13,-23],[0,-1],[-5,6],[-3,0],[-1,-1],[0,-6],[2,0],[1,1],[2,-1],[5,-10],[1,0],[1,2],[2,1],[2,-3],[4,1],[3,-9],[3,-5]],[[2599,6127],[-5,-5],[1,4],[3,3],[1,-2]],[[2614,6131],[-2,-3],[-1,2],[1,3],[3,1],[-1,-3]],[[5461,7660],[6,-2],[3,1],[4,-1],[0,-3],[-3,1],[-4,-2],[-3,1],[-3,5]],[[5511,7635],[0,-2],[2,-6]],[[5513,7627],[-10,12],[-9,9],[-7,3],[-9,7],[-1,4],[14,-11],[-1,3]],[[5477,7667],[-15,0],[-3,1],[-5,4],[4,1],[4,-1],[1,-2],[14,-3]],[[5465,7676],[-4,-1],[-6,3],[1,4],[4,0],[7,-2],[1,-3],[-3,-1]],[[5421,7737],[-1,-2],[-2,3],[-2,5],[-3,3],[-1,3],[0,4],[1,0],[9,-15],[-1,-1]],[[5411,7761],[-4,1],[-1,2],[1,2],[2,-1],[2,-4]],[[5401,7756],[-1,0],[-3,13],[-1,3],[1,2],[-1,10],[2,1],[0,-5],[1,-3],[2,-3],[-1,-6],[1,-9],[0,-3]],[[5410,7774],[-3,-1],[-2,2],[0,2],[-3,0],[-2,3],[4,8],[3,-8],[1,-1],[2,-5]],[[5524,7829],[0,-4],[-2,-2],[2,-4],[1,-6],[-1,-3],[1,-3],[4,-2],[-2,-3],[0,-4],[2,-3],[5,-4],[2,0],[2,-4],[0,-2],[-6,0],[-4,-2],[2,-9],[-1,-3],[-2,-3]],[[5487,7656],[-1,2],[-6,9],[-5,5],[-7,11],[-8,4],[-6,4],[-3,0],[-4,-2],[-4,1],[-1,3],[0,5],[-4,4],[-4,5],[-5,5],[-10,20],[5,2],[2,0],[0,3],[-3,3],[-8,12],[-2,6],[-1,7],[1,9],[-1,6],[-7,8],[-2,4],[-4,3],[-2,0],[-2,-4],[-1,-7],[-4,-9],[-1,-4],[-2,-5],[-2,-1],[-1,1],[-3,9],[-3,6],[-1,4],[0,4],[-3,14],[2,2]],[[5376,7805],[1,-2],[7,-3],[2,1],[2,4],[2,-2],[8,0],[2,1],[2,6],[2,3],[2,-5],[2,-3],[3,-3],[3,2],[5,-3],[3,0],[3,1],[-1,4],[0,5],[1,2],[-2,4],[5,4],[5,2],[1,2],[0,11],[-2,3],[1,5],[4,2],[2,2],[4,2],[3,5],[4,-1],[0,7],[2,3],[6,-2]],[[5458,7862],[6,-5],[4,-5],[2,-5],[2,-3],[3,-3],[3,-4],[4,-7],[6,-2],[1,-3],[5,-4],[4,-1],[8,-1],[5,0],[4,3],[2,5],[2,0],[5,2]],[[2977,6265],[-1,-4],[-7,5],[-5,6],[0,3],[3,1],[3,-2],[4,-4],[3,-5]],[[3006,6222],[-3,5],[-2,4],[-3,2],[-13,0],[-3,-3],[-4,-1],[-3,0],[-8,3],[-3,2],[-3,1],[-7,-2],[-3,-2],[-2,-4],[-1,-4],[-1,-1],[-3,6],[-6,8],[-6,4],[-2,6],[3,10],[3,2],[5,-1],[6,-4],[5,0],[3,-3],[19,-4],[3,-1],[3,2],[2,5],[6,0],[1,1],[1,3],[0,3],[-4,4],[-5,9],[-4,10],[2,3],[-1,7],[2,11],[-10,10],[-7,1],[-3,2],[-1,3],[1,5],[5,5],[3,1],[7,1],[7,-1],[5,-5],[6,-4],[11,-3],[1,1]],[[2981,6337],[1,-1],[-1,-2],[-5,3],[-2,0],[-1,2],[4,2],[4,-4]],[[5634,7945],[0,-1],[-5,-8],[-3,-2],[-2,1],[-6,-3],[-1,-1],[-4,-8],[-3,-3],[0,-7],[-1,-2],[-2,-1],[-1,-2],[-2,-10],[-4,-7],[0,-3],[-1,-5],[-3,-5],[0,-5],[-2,-3],[-3,-2],[-1,-2],[-1,-5],[1,-4],[-2,-2],[-2,-6],[-3,-2],[-5,1],[-2,-1],[-1,-3],[-2,-3],[-4,1],[-7,-2],[-1,-1]],[[5561,7839],[-2,2],[-6,1],[-3,-1],[-6,2],[-3,-1],[-3,-6],[-5,-4],[-4,1],[-4,-4],[-1,0]],[[5458,7862],[-1,1],[-3,7],[0,3],[-1,1],[-1,4],[0,3],[-1,1],[-5,1]],[[5475,7948],[1,1],[3,-1],[6,-6],[4,-5],[3,-2],[6,0],[5,-1],[16,2],[2,4],[-1,2],[0,3],[1,3],[3,3],[10,1],[6,2],[2,6],[2,1],[2,-1],[3,-3],[4,-1],[5,5],[6,4],[4,12],[0,1],[4,2],[7,-1],[5,-2],[4,0],[5,3],[2,0],[1,-2],[2,-1],[2,-6],[2,-3],[2,-1],[9,4],[1,0]],[[5614,7971],[2,1],[2,-3],[0,-2],[2,-4],[4,-3],[2,-4],[3,-2],[3,0],[2,-4],[0,-5]],[[8414,4555],[-3,0],[-1,1],[0,5],[1,2],[6,4],[2,3],[4,7],[3,3],[0,-5],[1,-5],[-3,-3],[-3,-6],[-6,-4],[-1,-2]],[[8384,4573],[-4,1],[-1,1],[3,3],[2,4],[4,0],[-1,-5],[-3,-4]],[[8427,4590],[-3,-2],[0,4],[2,5],[2,2],[1,-3],[-2,-2],[0,-4]],[[8332,4643],[2,-2],[4,-5],[1,-2],[0,-4],[1,-2],[2,-1],[2,1],[2,-2],[1,-3],[3,-5],[1,-5],[3,-3],[1,-5],[-1,-4],[-3,-6],[-1,-1],[-2,0],[-4,-4],[-1,2],[-4,1],[-3,3],[-3,4],[-1,5],[-2,4],[-3,3],[-6,8],[-4,1],[-1,-1],[-2,0],[-7,4],[-2,2],[-1,3],[0,3],[-1,3],[2,5],[4,3],[3,1],[4,0],[5,1],[5,-2],[2,1],[2,4],[2,-5]],[[8444,4645],[2,-4],[5,-1],[1,1],[3,6],[0,7]],[[8455,4654],[4,2],[2,2],[2,3],[6,7]],[[8469,4668],[0,-6],[1,-1],[4,4],[1,-3],[0,-4],[-1,-4],[-4,0],[0,-6],[2,-5],[1,-8]],[[8473,4635],[-2,-3],[-1,-5],[-4,-6],[-3,-9],[-3,-4],[-3,-6],[-2,-3],[-7,-2],[-6,-7],[-3,-2],[-3,-1],[-3,2],[-1,3],[0,3],[3,8],[-3,3],[0,3],[2,15],[1,5],[7,14],[2,2]],[[8210,4678],[-1,-2],[-2,4],[-1,1],[2,3],[1,0],[1,-3],[0,-3]],[[8415,4691],[-1,-3],[-2,1],[1,3],[0,2],[3,3],[0,-3],[-1,-3]],[[8317,4680],[-1,-1],[-1,1],[0,9],[1,2],[0,5],[3,-1],[1,-2],[0,-2],[-3,-7],[0,-4]],[[8424,4702],[0,-2],[-8,0],[0,3],[2,4],[3,2],[4,-2],[-1,-5]],[[8239,4687],[-4,-12],[2,-4],[-6,-2],[-9,3],[-5,3],[0,5],[5,-2],[1,2],[0,17],[4,9],[2,3],[3,2],[7,-5],[2,-3],[0,-3],[-2,-13]],[[8451,4704],[-2,-4],[-1,-6],[-1,-2],[-2,-1],[-1,6],[-3,0],[1,5],[1,2],[2,0],[1,-2],[4,9],[2,-2],[-1,-5]],[[8441,4707],[-4,-2],[-2,-7],[-2,0],[-1,-3],[0,-3],[-1,-2],[-2,2],[-2,-3],[-3,3],[-2,0],[2,5],[4,5],[-2,4],[2,1],[2,0],[2,-1],[5,6],[3,-3],[1,-2]],[[8857,4700],[-2,-1],[-7,2],[0,4],[3,6],[2,2],[1,0],[3,-10],[0,-3]],[[8264,4701],[-2,1],[1,3],[-1,4],[0,3],[2,2],[3,0],[0,-2],[-3,-11]],[[8306,4709],[-1,0],[0,4],[2,1],[1,-3],[-2,-2]],[[8459,4714],[1,-3],[2,2],[7,0],[5,-2],[1,-7],[-1,-2],[-19,-5],[-2,3],[2,5],[-1,3],[1,4],[2,3],[2,-1]],[[8549,4717],[5,-3],[3,1],[1,-2],[-3,-5],[-6,4],[-1,4],[1,1]],[[8409,4687],[-4,-2],[-4,-4],[-2,-1],[-9,0],[-7,-7],[-5,-2],[-2,4],[-2,1],[-3,0],[-2,-6],[-4,1],[-3,-2],[-3,0],[-5,5],[-7,2],[-6,-1],[-6,3],[-3,-2],[-3,-3],[0,3],[-2,6],[0,8],[1,2],[0,3],[1,3],[2,-1],[4,4],[3,5],[4,2],[2,0],[1,-1],[4,2],[4,-5],[4,0],[6,-6],[4,-3],[3,-4],[2,-2],[3,0],[2,3],[2,1],[2,0],[3,1],[3,2],[2,-2],[6,-7],[2,-1],[3,2],[1,2],[0,3],[2,5],[5,4],[3,3],[2,5],[-4,2],[2,5],[2,-1],[2,-2],[0,-10],[-2,-3],[0,-2],[-3,-4],[1,-5],[-2,-3]],[[8634,4704],[-1,3],[5,10],[2,-2],[2,0],[-3,-5],[-4,-2],[-1,-4]],[[8283,4704],[2,-2],[1,0],[2,4],[2,1],[2,0],[3,-3],[1,-4],[1,3],[3,3],[2,-1],[2,-2],[1,-7],[0,-6],[3,-6],[-2,-4],[-2,-1],[-2,3],[-5,-2],[0,-2],[3,-2],[-1,-2],[-2,2],[-2,0],[-5,-3],[-2,0],[0,9],[-1,2],[-5,-10],[-2,-1],[-2,1],[-5,-5],[-2,1],[-2,0],[-6,-6],[-4,-1],[-4,0],[-2,-2],[-3,-2],[-2,2],[-3,1],[-3,5],[0,4],[1,5],[0,12],[1,4],[2,1],[4,4],[3,4],[2,0],[4,-3],[2,-1],[3,1],[2,-2],[1,-4],[0,-2],[1,-1],[3,-7],[2,0],[3,-1],[3,4],[3,0],[1,3],[-2,4],[-3,4],[-2,0],[-5,7],[-1,3],[-1,5],[1,3],[3,3],[1,0],[6,-2],[1,-1],[1,-7],[1,-3]],[[8206,4714],[2,-3],[4,-9],[1,-3],[-2,-2],[-2,-4],[-7,-6],[-1,-3],[-1,-5],[0,-2],[-1,-3],[-2,0],[-1,1],[1,3],[0,4],[-2,8],[-6,8],[-3,2],[-4,1],[-3,6],[0,3],[-1,3],[1,3],[4,-1],[5,-3],[5,0],[4,7],[1,0],[8,-5]],[[8605,4725],[-1,-5],[-2,0],[-4,7],[1,5],[0,2],[6,-1],[0,-8]],[[8521,4742],[0,-4],[-3,-1],[-3,-3],[-2,-4],[-1,-5],[-5,2],[-4,1],[-1,1],[-2,0],[-3,-1],[-4,-5],[0,6],[1,4],[4,9],[3,-2],[4,-1],[4,2],[3,4],[4,2],[3,-5],[2,0]],[[8538,4744],[-2,-1],[1,4],[0,4],[3,-1],[0,-3],[-2,-3]],[[8847,4707],[-7,-8],[-9,2],[-3,0],[-5,-2],[-1,1],[1,7],[4,19],[5,17],[2,4],[3,5],[3,3],[7,3],[6,0],[4,-7],[2,-5],[0,-6],[-2,-11],[-3,-10],[-5,-8],[-2,-4]],[[8647,4723],[-1,-1],[-3,1],[-2,0],[0,4],[-1,3],[1,5],[0,6],[2,0],[0,4],[2,8],[2,3],[2,5],[1,1],[1,4],[1,1],[0,4],[3,3],[2,-2],[1,-3],[-3,-4],[2,-10],[-2,-11],[-1,-3],[-3,-3],[0,-3],[-3,-5],[-1,-4],[0,-3]],[[8665,4768],[-1,-2],[-1,1],[-1,3],[-2,1],[3,3],[2,-6]],[[8177,4772],[-1,-2],[-1,1],[-1,4],[1,1],[1,-1],[1,-3]],[[8573,4770],[-1,-2],[-3,3],[1,4],[2,1],[1,-2],[0,-4]],[[8354,4773],[-4,0],[0,6],[4,-3],[0,-3]],[[8161,4774],[0,-1],[-5,1],[-3,-5],[-2,-1],[-9,0],[-1,-1],[-10,5],[-1,4],[1,4],[3,6],[5,1],[26,0],[2,-5],[1,-1],[-6,-4],[-1,-3]],[[8204,4782],[-3,-1],[-2,2],[0,3],[1,2],[3,1],[2,0],[3,-3],[0,-2],[-3,0],[-1,-2]],[[8740,4795],[-1,-1],[-1,1],[0,2],[2,5],[1,0],[0,-3],[-1,-4]],[[7922,4801],[-1,-1],[-2,1],[0,1],[2,4],[2,2],[0,-3],[-1,-4]],[[8741,4806],[-2,0],[-1,4],[2,1],[1,-2],[0,-3]],[[8736,4812],[-1,-4],[0,-4],[-3,-5],[-1,-8],[-1,-2],[-4,-4],[-3,5],[-1,3],[2,18],[0,16],[2,1],[1,-3],[5,-10],[4,-3]],[[7981,4837],[3,-6],[3,-4],[2,-2],[3,0],[3,-1],[4,-2],[5,-1],[2,1],[2,-1],[2,-5],[3,-5],[1,-3],[1,-12],[3,-4],[2,-1],[7,0],[8,-3],[3,0],[2,3],[3,-2],[6,-3],[3,-1],[4,1],[4,0],[1,-1],[4,-2],[1,0],[3,3],[1,5],[2,7],[1,7],[1,3],[2,4],[1,1],[4,0],[1,-2],[4,-12],[1,-1],[5,-1],[3,3],[2,0],[3,-3],[1,-2],[2,-2],[7,-2],[2,-5],[10,0],[3,-2],[2,-14],[1,-3],[3,-2],[1,-2],[0,-15],[6,-6],[6,-3],[7,-1],[11,3],[4,3],[1,0],[9,-8],[1,-2],[1,-5],[0,-7],[-2,-15],[0,-8],[2,-9],[4,-7],[0,-5],[-4,2],[-2,2],[-1,3],[-2,2],[-3,-1],[-6,4],[-7,5],[-12,11],[-4,0],[-6,-4],[-6,-3],[-3,0],[-6,3],[-7,2],[-17,1],[-5,2],[-14,4],[-6,3],[-16,15],[-5,3],[-16,8],[-8,0],[-4,2],[-3,0],[-4,-3],[-2,-1],[-2,-4],[-3,0],[-12,4],[-3,2],[-3,3],[-2,4],[-2,2],[-7,4],[-18,3],[-3,1],[-2,2],[-1,3],[0,4],[2,8],[1,3],[-9,7],[-7,4],[-3,1],[-3,0],[-4,-1],[-5,2],[-2,0],[-1,-1],[-2,1],[0,3],[1,3],[2,3],[1,0],[0,-5],[2,-2],[1,1],[3,6],[0,3],[2,9],[1,-2],[2,2],[2,20],[2,6],[3,4],[1,2],[3,-3],[5,-1],[3,-2],[6,-2],[4,-3],[2,0],[1,1],[2,4],[1,6],[3,-3],[5,-1],[1,-2]],[[8445,4839],[-1,-3],[-1,4],[-1,1],[0,4],[2,-2],[1,-4]],[[8347,4821],[-1,-10],[-1,3],[0,9],[-1,4],[1,5],[-1,13],[1,6],[2,-8],[0,-22]],[[8130,4849],[-1,-2],[-2,0],[-1,2],[2,4],[2,-1],[0,-3]],[[8688,4846],[-2,-5],[-1,2],[-1,0],[0,10],[-1,7],[2,0],[0,-2],[1,-1],[2,-7],[0,-4]],[[8742,4855],[-1,-3],[0,-4],[1,-4],[-1,-3],[1,-6],[0,-9],[-1,-5],[-2,-3],[0,-1],[-6,1],[-5,10],[-2,5],[-1,1],[0,3],[4,0],[0,2],[1,8],[-3,5],[0,3],[1,1],[2,-2],[4,9],[0,2],[1,5],[2,1],[1,-1],[1,-3],[0,-5],[1,-1],[2,-6]],[[8691,4843],[0,13],[2,4],[3,17],[1,0],[1,-2],[-2,-13],[-4,-9],[-1,-10]],[[7842,4868],[-2,-1],[-5,10],[1,2],[2,0],[4,-5],[1,-2],[-1,-4]],[[8433,4880],[0,-6],[-1,0],[-2,4],[0,2],[1,1],[2,-1]],[[8389,4870],[-2,-1],[-3,6],[-2,6],[2,5],[0,4],[1,1],[2,0],[1,-4],[1,-1],[0,-16]],[[8405,4880],[0,-4],[-2,-3],[-2,0],[-3,3],[0,-3],[-2,0],[-1,4],[2,10],[2,4],[-1,4],[-1,9],[1,5],[4,3],[5,5],[1,-3],[1,-15],[-4,-12],[0,-7]],[[8420,4921],[1,-12],[-2,1],[-2,0],[-1,-5],[0,-5],[-1,-3],[0,-12],[2,1],[2,-4],[2,-2],[0,-4],[-2,-3],[-2,-2],[-2,2],[-1,-1],[0,-2],[-1,-2],[0,-3],[-2,-6],[-1,-2],[-2,2],[-1,-2],[-2,0],[-1,7],[0,3],[1,4],[0,2],[1,3],[2,4],[1,3],[0,2],[1,7],[0,7],[1,6],[0,12],[3,10],[3,4],[0,-3],[3,-7]],[[8709,4939],[-2,-1],[-5,5],[0,4],[4,-6],[3,-2]],[[8422,4946],[-3,-7],[-2,1],[-2,4],[0,5],[-1,2],[2,3],[5,-1],[1,-2],[0,-5]],[[8570,4977],[-5,-3],[1,5],[1,2],[2,-2],[1,-2]],[[8562,4972],[-2,-4],[-1,2],[-2,1],[-3,-5],[-2,2],[0,3],[3,5],[3,1],[4,4],[1,0],[0,-3],[-1,-2],[0,-4]],[[8574,4979],[0,-3],[-3,1],[-1,4],[1,1],[2,-1],[1,-2]],[[8233,4984],[-1,-10],[-2,5],[2,7],[1,-2]],[[8543,4992],[-2,-1],[-1,3],[2,2],[1,-4]],[[8229,4960],[-6,-10],[0,13],[-2,7],[1,5],[1,9],[1,7],[4,5],[0,-8],[1,-3],[0,-16],[1,-2],[-1,-4],[0,-3]],[[8523,5005],[4,-4],[2,-6],[2,-4],[2,-3],[0,-14],[-4,-2],[-4,-6],[-2,-1],[-2,0],[-3,-2],[-4,3],[-4,4],[-6,7],[-1,3],[-3,6],[0,4],[-1,11],[2,3],[4,-2],[2,3],[7,2],[7,0],[2,-2]],[[8554,5014],[-2,-5],[-2,1],[2,3],[2,1]],[[7968,5010],[-1,-1],[-2,2],[-1,3],[1,2],[3,-2],[0,-4]],[[7984,5016],[-1,-1],[-1,1],[0,2],[1,2],[2,-1],[-1,-3]],[[8603,5018],[6,-6],[4,-1],[5,1],[2,-1],[6,-8],[1,-6],[1,-4],[0,-5],[3,-2],[2,-6],[1,-2],[-2,-17],[-6,6],[-6,7],[-3,3],[-7,6],[-2,5],[-3,4],[-9,0],[0,-6],[-1,-2],[-4,3],[-3,1],[-3,2],[-4,2],[0,5],[-3,0],[-2,-2],[-4,-9],[-3,-1],[-2,0],[-1,2],[-4,10],[-1,2],[-2,2],[-3,-1],[0,-3],[-1,-4],[0,-2],[-2,-6],[-1,-4],[-1,1],[1,6],[0,3],[-1,3],[0,4],[6,16],[3,4],[10,2],[6,-1],[3,0],[3,1],[2,0],[0,-3],[1,-3],[2,0],[3,3],[2,4],[2,2],[3,0],[2,-1],[4,-4]],[[7788,5e3],[1,-8],[-3,5],[0,7],[-2,3],[-2,4],[-1,10],[1,2],[1,0],[7,-15],[-1,-4],[0,-2],[-1,-2]],[[8004,5011],[0,-6],[-1,-3],[-3,-5],[-2,1],[0,3],[-3,5],[-1,-1],[0,-4],[-5,-2],[0,4],[-2,4],[0,8],[1,3],[0,4],[1,4],[0,9],[5,3],[1,-2],[6,-2],[4,-6],[2,-8],[-3,-9]],[[7782,5025],[-2,-4],[-3,0],[-1,3],[0,14],[1,1],[5,-10],[0,-4]],[[8731,5061],[-1,2],[1,3],[1,0],[-1,-5]],[[7772,5048],[0,-1],[-4,5],[-2,1],[-2,6],[0,6],[1,2],[1,0],[2,-3],[1,-6],[2,-6],[1,-4]],[[8500,5042],[-2,2],[-1,9],[-1,2],[-1,9],[0,2],[2,4],[1,-1],[0,-11],[2,-11],[0,-5]],[[8439,5071],[0,-3],[-1,0],[-1,5],[2,-2]],[[8499,5080],[9,-2],[-1,-2],[-10,-3],[-3,1],[-10,-2],[-1,0],[0,3],[-1,2],[1,2],[2,1],[6,-1],[8,1]],[[8420,5079],[-2,-5],[-1,2],[1,4],[1,1],[1,-2]],[[8620,5086],[0,-3],[2,-4],[-1,-5],[-1,0],[1,-4],[-3,-2],[-1,-3],[-4,-1],[-1,2],[-5,3],[-4,5],[-1,2],[8,6],[3,2],[2,0],[4,2],[1,0]],[[8470,5085],[3,-2],[1,0],[0,2],[1,1],[1,-1],[0,-4],[2,0],[2,-2],[0,-4],[-5,-1],[-4,-3],[-5,3],[-5,-5],[-3,-1],[-3,0],[-3,8],[2,10],[1,2],[2,1],[5,0],[8,-4]],[[8762,5092],[11,-3],[3,0],[6,-1],[5,-4],[9,-1],[3,-1],[2,-2],[-5,-3],[-2,-2],[-5,-1],[-4,1],[-2,-1],[-1,2],[-4,2],[-5,4],[-11,5],[0,5]],[[8025,5090],[-3,-2],[-1,5],[2,2],[2,-2],[0,-3]],[[7944,5087],[1,-4],[2,-3],[1,-4],[1,-19],[4,-16],[13,-6],[-2,-2],[-2,-5],[-2,-11],[0,-3],[2,-8],[-2,0],[-2,1],[-2,4],[-2,1],[-4,5],[-3,2],[-4,2],[-2,4],[0,17],[-2,2],[-1,6],[-1,8],[-2,2],[-3,2],[-1,2],[-6,-3],[-3,3],[-3,2],[0,4],[2,3],[3,3],[2,3],[0,3],[-1,3],[2,6],[1,2],[4,2],[2,-8],[1,-3],[1,4],[-1,7],[3,2],[3,0],[2,-2],[1,-3],[0,-5]],[[8432,5085],[-2,0],[-1,1],[0,9],[1,2],[1,-1],[0,-4],[1,-2],[0,-5]],[[8558,5088],[-1,-3],[-5,1],[-5,0],[-5,-2],[-3,2],[-2,3],[0,3],[2,8],[4,5],[1,2],[3,-2],[5,-5],[3,-5],[3,-4],[0,-3]],[[8421,5116],[1,-4],[-1,-3],[1,-6],[3,8],[2,1],[2,-1],[2,-5],[-1,-6],[-2,-3],[-2,-1],[-2,4],[-1,1],[-1,-9],[-2,-2],[-1,2],[0,2],[1,3],[0,11],[-2,-2],[-3,-10],[-3,-4],[-1,2],[-1,7],[1,8],[2,6],[2,0],[5,2],[1,-1]],[[8046,5115],[-5,-6],[-2,1],[-1,2],[1,11],[1,4],[4,0],[2,-2],[2,-5],[-2,-5]],[[8748,5119],[-2,-1],[-1,1],[-2,5],[1,3],[2,2],[1,-2],[0,-3],[2,0],[-1,-5]],[[7753,5081],[-2,0],[-6,6],[-1,4],[0,4],[-6,16],[0,3],[2,13],[5,4],[2,-3],[0,-6],[4,-10],[1,-6],[0,-2],[1,-2],[-1,-2],[3,-7],[1,-3],[0,-7],[-3,-2]],[[8638,5108],[-1,-2],[-4,1],[-2,4],[-1,5],[0,4],[-2,7],[0,1],[7,4],[3,-2],[2,-2],[-1,-13],[-1,-7]],[[8635,5139],[-2,-5],[-12,-4],[1,2],[0,2],[1,1],[4,2],[3,-1],[2,0],[0,3],[3,0]],[[8759,5146],[6,-2],[2,0],[2,-3],[3,1],[1,-1],[5,-8],[3,-6],[3,-5],[3,-2],[-2,-4],[-4,-3],[-2,0],[-3,3],[-2,-1],[-2,4],[0,5],[-3,12],[-2,-4],[-4,6],[-1,0],[-3,5],[0,3]],[[8535,5138],[-1,-1],[-2,2],[-1,0],[1,9],[2,-1],[1,-7],[0,-2]],[[8627,5153],[-1,0],[-3,2],[1,2],[2,2],[2,-1],[1,-2],[-2,-3]],[[8384,5160],[1,-3],[-1,-3],[-1,1],[-3,0],[-1,-2],[-1,0],[0,3],[3,4],[1,-1],[2,1]],[[8915,5033],[0,-46]],[[8915,4987],[0,-24],[0,-23],[0,-24],[0,-23],[0,-35],[0,-40],[-1,-6],[-2,-10],[-1,-7],[2,-6],[2,-3],[0,-45],[0,-24],[0,-23],[0,-36]],[[8915,4658],[-2,2],[-4,6],[-3,8],[-2,7],[-3,6],[-11,18],[-4,12],[-8,-2],[-4,-2],[-4,-1],[-3,4],[0,8],[-2,-6],[-3,-4],[-4,-7],[-2,4],[0,3],[1,3],[0,3],[1,8],[2,4],[1,8],[1,3],[0,3],[-1,4],[-2,1],[-1,2],[-1,6],[-1,2],[-2,2],[-1,3],[1,2],[2,1],[-1,3],[-3,4],[-3,8],[0,1],[2,2],[5,1],[-4,8],[-1,6],[-1,3],[-4,7],[-2,6],[-2,13],[-2,10],[2,6],[-2,0],[-3,2],[2,5],[0,2],[-2,-2],[-3,0],[0,15],[-2,2],[-2,3],[-2,1],[-2,2],[-1,4],[-12,13],[-1,4],[-2,-2],[-2,2],[-1,2],[-2,-1],[-2,2],[-3,0],[-6,5],[-7,7],[-5,2],[-3,4],[-3,3],[-7,3],[-8,2],[-7,0],[-12,15],[-2,6],[0,8],[-2,-2],[-2,0],[-4,4],[-4,-2],[-2,3],[0,4],[-1,2],[-3,-2],[-2,0],[-2,6],[-2,4],[-3,4],[-1,6],[0,13],[3,6],[1,5],[-2,1],[-3,-8],[0,-10],[-1,-3],[-3,0],[1,-6],[-1,-6],[-3,-10],[1,-3],[-1,-3],[-4,-10],[-5,0],[-3,-2],[-1,3],[-2,2],[0,4],[-2,7],[-1,7],[3,9],[-1,8],[-2,7],[-5,9],[-6,9],[-3,2],[-5,1],[-2,4],[-1,4],[3,1],[5,5],[2,0],[7,-3],[2,-2],[2,-1],[5,7],[4,10],[2,2],[2,1],[2,-1],[5,-4],[3,-1],[2,0],[1,-3],[2,-2],[0,5],[1,5],[2,2],[1,0],[1,2],[0,5],[-3,0],[2,4],[2,5],[0,2],[-6,-5],[-6,-2],[-4,1],[-4,0],[-7,-4],[-3,1],[-6,1],[-4,2],[-2,-2],[-3,0],[-3,4],[-3,8],[-2,3],[-1,3],[-1,13],[-1,8],[-5,2],[-12,8],[-3,-3],[-2,-1],[-4,2],[1,3],[1,5],[1,2],[2,2],[1,3],[2,9],[0,9],[5,4],[10,5],[2,2],[2,5],[3,2],[2,5],[7,6],[7,0],[6,-4],[6,-5],[11,-13],[11,0],[5,-2],[2,-4],[-1,-3],[0,-6],[1,-6],[4,-12],[0,-3],[-1,-7],[0,-3],[-2,-5],[-1,-6],[0,-7],[1,-7],[0,-13],[1,-7],[5,-18],[3,-12],[0,15],[1,2],[2,2],[2,-5],[0,-7],[1,-13],[2,0],[2,2],[1,-4],[0,-14],[1,-2],[5,-6],[5,-1],[3,0],[3,2],[2,4],[2,5],[6,11],[2,5],[2,8],[1,2],[6,9],[1,3],[2,11],[1,3],[6,3],[7,2],[6,5],[3,5],[0,3],[-1,5],[0,2],[1,2],[12,14],[6,5],[2,0],[6,-8],[15,-10],[2,-3],[2,-4],[3,-3],[4,-1],[3,-3],[3,-4],[6,-6],[9,-8],[10,0],[2,-4],[2,0],[9,-2],[3,-3],[0,-6],[7,0]],[[7901,5164],[2,-6],[1,-2],[-2,-7],[-1,-1],[-2,2],[-1,-5],[-1,7],[-2,5],[1,4],[2,-1],[3,4]],[[8542,5165],[3,-9],[-2,-8],[2,-4],[4,-1],[1,-1],[0,-2],[1,-3],[-1,-3],[-2,-2],[-3,3],[-1,4],[-4,-2],[-1,0],[0,9],[-2,3],[-2,5],[0,3],[1,4],[-1,3],[2,0],[2,-4],[1,4],[1,2],[1,-1]],[[8533,5155],[-1,-2],[-2,0],[-1,6],[1,8],[2,2],[2,-2],[-1,-2],[1,-4],[-1,-6]],[[7880,5163],[-3,-2],[-4,2],[0,3],[2,4],[2,0],[3,-3],[1,-2],[-1,-2]],[[8632,5183],[5,-2],[1,0],[7,-6],[1,-3],[0,-3],[1,-2],[-2,-5],[-1,0],[-4,2],[-2,-1],[-2,1],[-1,4],[-3,2],[-3,9],[-2,-1],[0,-3],[2,-2],[2,-6],[2,-1],[2,-3],[0,-4],[-4,-1],[-2,3],[0,5],[-2,-2],[-1,-2],[-1,0],[-1,6],[-5,0],[-3,3],[2,3],[0,3],[2,2],[2,-1],[2,2],[1,-1],[1,2],[4,1],[2,1]],[[7734,5153],[-2,-3],[-2,3],[0,3],[3,14],[-3,13],[1,1],[1,-2],[2,-8],[2,-6],[-2,-15]],[[7909,5173],[1,-1],[1,3],[3,-6],[0,-2],[-1,-2],[-6,6],[-4,-2],[-3,3],[3,12],[2,-2],[1,-3],[3,-6]],[[8597,5173],[-1,-1],[-1,4],[-3,3],[-1,7],[6,-11],[0,-2]],[[8539,5183],[-2,1],[1,6],[1,-3],[0,-4]],[[7907,5187],[-1,0],[-2,2],[-3,8],[2,-1],[4,-9]],[[7868,5215],[-3,-1],[-1,1],[0,5],[1,4],[1,0],[2,-5],[0,-4]],[[8538,5220],[-1,0],[0,6],[2,0],[0,-3],[-1,-3]],[[8537,5229],[-1,-2],[-2,3],[1,2],[1,0],[1,-3]],[[7872,5222],[-3,6],[1,4],[1,1],[1,-2],[2,-6],[-2,-3]],[[7883,5229],[-3,2],[0,3],[1,1],[2,-6]],[[7894,5231],[-1,-1],[-3,5],[1,2],[1,-2],[2,-1],[0,-3]],[[7861,5226],[-1,-2],[-1,2],[-5,2],[-2,0],[-5,3],[-2,4],[0,3],[1,2],[0,6],[1,2],[3,-4],[2,-4],[2,-1],[6,-6],[1,-7]],[[7872,5244],[0,-3],[-2,0],[-1,4],[1,3],[1,-3],[1,-1]],[[7864,5233],[0,-1],[-2,0],[-3,6],[-2,3],[-3,2],[-2,0],[0,7],[2,0],[6,-5],[2,-3],[2,-9]],[[7888,5251],[2,-2],[1,1],[0,-4],[-2,-6],[-2,2],[-1,2],[0,5],[2,0],[0,2]],[[7904,5253],[0,-4],[2,-2],[0,-8],[-2,-6],[0,-2],[-2,1],[-1,2],[0,3],[-1,1],[0,6],[-4,-2],[-1,0],[-1,3],[1,2],[4,5],[2,-1],[3,2]],[[7844,5240],[-1,-1],[-2,2],[-2,8],[0,7],[-1,5],[1,3],[1,0],[2,-3],[2,-5],[0,-2],[1,-4],[-1,-5],[0,-5]],[[7707,5268],[6,-17],[2,-2],[3,-7],[1,-3],[-1,-5],[0,-15],[-2,-3],[-4,2],[0,2],[-2,11],[-4,7],[-2,0],[-1,6],[-2,8],[-6,13],[5,0],[3,6],[0,1],[4,-4]],[[7846,5267],[0,-7],[-2,2],[-2,3],[-2,2],[-3,1],[-3,2],[-1,3],[0,4],[12,-7],[1,-3]],[[8468,5241],[-6,-10],[-1,-5],[-2,-5],[-2,-6],[-2,-5],[-4,-4],[-2,-1],[-3,0],[-10,-4],[-3,-1],[-3,1],[-7,1],[-3,5],[-2,4],[-3,1],[-2,-1],[-18,0],[-6,-1],[-6,-2],[-3,1],[-3,2],[-3,1],[-2,0],[-12,-3],[-3,0],[-6,4],[-3,1],[-3,-1],[-3,-4],[-5,-10],[-1,-6],[-2,-7],[-1,-8],[-1,-6],[0,-6],[2,-15],[1,-5],[4,-13],[0,-1],[5,-4],[2,-5],[3,-12],[2,-7],[3,1],[3,-1],[4,-2],[3,4],[2,7],[1,6],[5,10],[2,5],[2,2],[3,-4],[1,-2],[3,-1],[4,1],[3,3],[2,5],[3,2],[7,0],[4,-1],[6,1],[0,2],[-1,3],[5,4],[4,1],[3,-1],[3,-3],[1,-3],[0,-5],[-1,-10],[0,-3],[-2,-1],[-2,2],[-2,5],[-3,2],[-6,-3],[-1,-2],[-4,-12],[-4,-10],[-5,-9],[-2,-3],[-3,-3],[-8,-5],[-3,-4],[-1,-6],[-2,-2],[-2,0],[-2,1],[-3,3],[-2,-7],[2,-1],[3,-4],[2,-7],[4,-3],[3,-7],[4,-12],[1,-7],[2,-5],[6,-9],[0,-8],[3,-9],[-3,-4],[0,-7],[-1,-8],[0,-5],[1,-3],[4,-4],[2,-7],[2,-1],[0,-6],[2,-2],[1,-4],[1,-1],[2,3],[2,-3],[0,-4],[1,-3],[-1,-7],[0,-3],[-2,0],[-2,3],[-1,-2],[1,-2],[-7,0],[-8,-5],[-2,-2],[-2,-5],[0,-3],[1,-7],[-1,-2],[-4,-1],[-4,2],[-5,3],[-2,5],[-1,5],[2,18],[0,2],[2,5],[0,4],[-2,4],[-4,2],[-3,4],[-11,20],[0,9],[4,12],[0,2],[1,9],[0,7],[-1,8],[-1,4],[-4,2],[-3,0],[-3,-1],[-9,-12],[-2,-5],[0,-6],[1,-5],[2,-6],[1,-6],[1,-20],[0,-3],[-1,-6],[-1,-13],[1,-19],[1,-12],[-1,-6],[-3,-21],[0,-3],[3,-14],[1,-6],[0,-6],[-3,3],[-2,0],[-1,-1],[-4,-1],[-3,0],[-2,-1],[-2,-4],[-3,-2],[-4,5],[-3,5],[-2,6],[-1,6],[2,14],[3,11],[0,15],[2,6],[0,6],[1,22],[-1,2],[-3,13],[0,13],[-2,4],[-2,1],[-3,-1],[-7,-3],[-2,3],[-2,11],[-1,7],[0,7],[1,7],[-2,9],[0,3],[2,4],[2,1],[1,2],[4,6],[1,6],[0,7],[1,7],[4,12],[1,6],[-1,10],[0,14],[1,10],[4,19],[4,10],[2,3],[4,-10],[0,5],[-1,5],[-3,34],[1,2],[1,0],[2,2],[0,4],[-1,8],[0,3],[3,12],[2,4],[1,3],[1,7],[4,10],[1,6],[2,1],[1,-6],[4,-4],[3,3],[0,2],[1,3],[2,2],[1,3],[1,6],[3,9],[3,2],[2,0],[4,-4],[2,-1],[2,1],[2,-3],[2,-6],[1,-2],[9,1],[7,-3],[9,-1],[3,-2],[3,-3],[3,-4],[3,-1],[2,4],[3,2],[6,-1],[16,-5],[2,0],[10,10],[4,10],[3,2],[2,9],[1,2],[3,1],[1,2],[4,12],[2,1],[3,-1],[1,-2],[2,-8],[0,-2],[-2,-4],[-1,-1],[-2,-12],[-4,-10]],[[7824,5303],[1,-5],[1,-3],[-1,-3],[-1,-6],[-3,-4],[-3,1],[-1,2],[-2,8],[1,7],[1,2],[2,0],[3,4],[2,-3]],[[8547,5232],[2,-1],[2,0],[1,3],[0,3],[1,6],[3,5],[1,0],[2,2],[-1,5],[2,9],[6,7],[3,2],[4,1],[1,-3],[-1,-3],[1,-6],[0,-15],[-1,-2],[-11,-11],[-1,-4],[0,-4],[4,-6],[6,-5],[1,-2],[1,-4],[0,-5],[2,-2],[2,-1],[2,-5],[-10,7],[-2,3],[-4,0],[-3,1],[-3,3],[-3,0],[-2,-1],[-1,-4],[0,-5],[1,-5],[0,-3],[-1,-6],[3,-17],[3,-14],[4,-14],[2,-5],[-1,-3],[-1,5],[-6,5],[0,2],[-4,14],[-4,7],[-1,3],[-1,5],[1,5],[-1,6],[0,7],[1,8],[-2,5],[-2,6],[-1,7],[0,5],[2,6],[0,3],[-2,5],[-3,12],[0,6],[3,13],[0,6],[1,3],[0,4],[2,8],[3,8],[4,9],[2,3],[2,1],[0,-5],[-3,-10],[-1,-2],[0,-4],[2,-3],[2,-5],[0,-21],[-1,-2],[-3,-8],[-6,-8],[-1,-2],[0,-3],[1,-3],[2,-2]],[[7702,5303],[-3,5],[-3,3],[2,1],[3,-2],[1,-3],[0,-4]],[[8567,5301],[-5,-1],[-1,3],[-1,13],[3,10],[4,5],[3,2],[1,0],[2,-7],[-1,-15],[-3,-7],[-2,-3]],[[8482,5336],[-1,6],[1,3],[1,-1],[0,-2],[-1,-3],[0,-3]],[[7678,5319],[-3,1],[-9,13],[-2,0],[-2,2],[-2,1],[-2,7],[0,3],[2,5],[3,-1],[2,-7],[4,-3],[1,-3],[7,-9],[1,-3],[0,-6]],[[8023,5351],[-1,-3],[-1,2],[2,1]],[[7936,5348],[-1,0],[0,12],[1,-3],[2,-2],[1,0],[-1,-4],[-2,-3]],[[7951,5365],[0,-4],[-2,2],[0,6],[2,0],[0,-4]],[[8267,5372],[0,-2],[-3,5],[0,6],[2,0],[2,-1],[-1,-8]],[[8489,5381],[-1,-2],[-3,4],[0,7],[-1,3],[0,5],[2,-3],[1,-6],[2,-5],[0,-3]],[[8522,5400],[-2,3],[0,2],[1,1],[1,-3],[0,-3]],[[8519,5406],[-2,4],[-1,6],[2,-2],[1,-5],[0,-3]],[[8267,5423],[2,0],[4,1]],[[8273,5424],[1,-5],[0,-2],[-5,-3],[-3,7],[1,2]],[[8007,5396],[-3,-2],[-3,3],[4,4],[0,2],[-4,2],[-1,2],[-1,6],[0,3],[5,9],[2,1],[0,-4],[4,-9],[0,-9],[-3,-8]],[[8044,5300],[-3,-7],[1,-3],[0,-3],[2,-1],[1,-10],[4,-10],[2,-2],[2,-4],[2,-6],[2,-2],[6,-11],[2,-4],[3,-4],[3,1],[9,8],[2,0],[3,2],[5,-1],[5,-2],[2,0],[2,1],[2,0],[2,-1],[5,6],[4,2],[3,17],[2,3],[2,2],[4,2],[13,1],[2,-5],[-1,-2],[2,-1],[2,-2],[7,-4],[2,-2],[2,1],[3,-5],[2,2],[2,3],[2,4],[2,3],[2,1],[4,0],[4,1],[3,2],[4,-3],[1,1],[0,3],[2,5],[1,4],[0,8],[1,2],[3,2],[0,8],[-1,1],[-1,7],[1,3],[0,2],[2,1],[3,5],[4,5],[2,5],[0,2],[-1,3],[-2,1],[0,5],[1,2],[0,8],[2,5],[2,3],[2,-2],[4,2],[1,5],[0,13],[1,1],[1,5],[0,3],[-1,8],[1,5],[0,12],[1,2],[2,13],[3,3],[1,5],[2,1],[3,-4],[4,4],[2,1],[3,-1],[2,-3],[3,4],[2,-2],[2,0],[1,1],[4,-1],[7,0],[5,-2],[5,-6],[4,-1]],[[8265,5424],[-3,-3],[0,-3],[2,-5],[0,-3],[5,-8],[0,-2],[1,-2],[0,-2],[-1,-3],[-3,0],[-2,2],[-1,3],[-1,-4],[-1,-2],[-4,1],[-4,0],[-1,-2],[1,-1],[5,-9],[1,-4],[-1,-7],[0,-3],[2,-1],[3,-4],[1,0],[2,-2],[0,-7],[2,-3],[-2,-4],[3,-3],[2,-1],[0,-5],[2,-7],[4,-10],[1,-3],[0,-6],[-3,-3],[-2,-4],[0,-2],[-2,-2],[2,-3],[1,-6],[5,-10],[11,-16],[4,-6],[6,-13],[3,-3],[1,-3],[-3,-6],[-4,-2],[-6,-2],[-6,2],[-3,2],[-3,3],[-2,6],[-3,4],[2,-8],[-2,-8],[-4,-4],[-1,-2],[-5,-22],[-1,-6],[-1,-25],[0,-7],[2,-14],[0,-7],[1,-3],[-2,-4],[-4,-4],[-4,-3],[-2,-5],[-2,-6],[-2,-4],[-3,-2],[-2,0],[-1,2],[-1,-1],[0,-7],[-1,-3],[-3,-3],[-2,-3],[0,-4],[-2,-5],[-4,-4],[-1,-2],[0,-3],[2,1],[2,-1],[0,-15],[-3,-5],[3,-3],[3,-1],[1,-5],[-1,-7],[0,-5],[-3,-2],[-2,1],[-1,-2],[1,-1],[0,-15],[-2,-7],[-2,-1],[-1,2],[-1,-3],[1,-2],[2,-6],[-2,-3],[-1,-3],[-3,-7],[-1,-4],[0,-6],[-1,-4],[-20,-18],[-15,-15],[-2,1],[0,2],[-1,24],[-2,12],[0,7],[-2,-6],[-2,0],[-2,4],[0,2],[-1,4],[-1,-3],[-2,0],[-2,4],[-4,-6],[-4,-4],[-3,0],[-2,2],[0,13],[-3,1],[-3,-3],[-1,1],[-1,-2],[-8,18],[-2,-14],[-6,-8],[-5,-5],[-4,2],[-4,3],[-5,-3],[-4,-9],[-3,-1],[-1,1],[0,30],[-2,4],[-2,3],[-2,-5],[-3,0],[-4,2],[-3,-1],[-6,-6],[-3,-1],[-2,2],[-1,3],[0,3],[-3,-5],[-1,1],[-3,7],[-5,-3],[-1,0],[-1,-3],[-2,1],[0,3],[-3,40],[-1,13],[-1,3],[-3,5],[0,7],[2,6],[0,14],[-1,7],[-1,5],[-2,5],[-3,5],[-3,4],[-6,4],[-3,0],[-2,2],[0,6],[1,3],[2,1],[0,2],[-3,3],[-3,5],[-1,3],[0,10],[1,5],[0,2],[1,8],[2,2],[-1,3],[-2,2],[0,3],[-2,5],[-4,6],[-1,10],[0,22],[1,13],[2,4],[2,1],[0,2],[-2,-1],[1,11],[3,10],[3,6],[1,6],[2,6],[7,6]],[[8521,5416],[-1,-2],[-2,1],[0,3],[2,5],[1,6],[-1,1],[-1,4],[0,4],[1,7],[1,0],[2,-4],[0,-6],[1,-5],[-2,-6],[-1,-8]],[[7679,5484],[3,0],[7,3],[3,0],[4,-2],[2,-2],[8,2],[2,-2],[5,-9],[5,-10],[2,-6],[1,-6],[7,-14],[1,-6],[-1,-7],[1,-6],[7,-5],[3,-4],[2,-6],[2,-4],[2,-3],[8,-7],[10,-16],[6,-7],[7,-17],[1,-6],[3,-8],[5,-11],[1,-3],[2,-4],[1,-5],[2,-4],[2,-3],[3,-1],[3,-7],[2,-2],[0,5],[-2,6],[0,3],[2,5],[1,0],[4,-2],[5,-9],[2,-5],[1,-7],[2,-7],[2,-4],[5,-2],[3,-2],[7,-11],[2,-4],[1,-6],[2,-7],[0,-7],[7,-14],[3,-2],[8,-1],[5,-8],[1,-5],[-2,-5],[-6,-7],[0,-3],[3,2],[3,3],[3,4],[6,7],[4,-2],[3,-5],[3,-6],[1,-7],[2,-7],[-3,-4],[-3,-3],[-4,-7],[-1,-3],[1,-1],[-1,-6],[3,-3],[0,-3],[-2,-3],[0,-3],[4,-13],[4,-5],[6,-5],[3,-3],[4,-1],[5,0],[0,-2],[1,-10],[1,-6],[1,-14],[1,-6],[0,-7],[1,-5],[3,-4],[4,-3],[1,-3],[0,-8],[-2,-3],[-3,-6],[0,-3],[-1,-6],[1,-3],[2,1],[5,11],[3,2],[7,0],[3,-2],[6,-6],[8,-23],[5,-16],[0,-3],[-1,-3],[-4,-8],[0,-2],[-1,-10],[0,-7],[2,-5],[0,-3],[-2,-14],[-1,-2],[2,-23],[0,-26],[-2,-39],[0,-2],[-2,-6],[-2,0],[-3,3],[0,3],[-1,3],[-5,7],[-1,-2],[-5,-8],[-1,-2],[-2,1],[-3,3],[-8,9],[0,-7],[1,-10],[1,-4],[-3,-1],[-3,6],[-3,7],[-6,12],[-3,5],[-6,18],[-2,2],[-10,13],[-5,8],[-2,5],[-6,7],[-11,18],[-5,11],[-5,17],[-1,4],[-9,13],[-5,7],[-2,5],[-4,15],[-2,6],[-1,4],[-3,4],[-2,4],[-5,14],[-2,6],[-1,6],[0,12],[-10,36],[-3,12],[-2,16],[0,1],[-6,14],[-2,5],[-2,4],[-2,5],[-4,16],[-2,5],[-2,3],[-7,6],[-3,4],[-2,5],[-3,19],[-3,20],[-4,26],[-3,12],[-3,10],[0,2],[-14,17],[-4,4],[-4,1],[-2,4],[-1,8],[-1,10],[-1,7],[0,3],[-6,8],[-4,12],[-2,5],[-6,17],[-2,5],[-2,3],[-8,3],[-2,3],[-6,15],[-7,11],[-11,23],[-3,6],[-1,6],[-2,6],[-5,18],[1,3],[0,13],[5,4],[9,-3],[3,-4],[5,-9],[3,-4],[3,-1],[7,-3]],[[7648,5518],[-1,-2],[-2,1],[-1,6],[4,-1],[0,-4]],[[4876,8304],[-5,-7],[-4,3],[1,7],[3,2],[3,6],[2,2],[1,-1],[2,-7],[-2,-2],[-1,-3]],[[7607,5577],[-2,-5],[-3,15],[-2,0],[0,7],[1,3],[4,3],[1,-2],[2,-13],[-1,-8]],[[7602,5607],[-2,-5],[-1,3],[0,2],[2,3],[1,-3]],[[7594,5637],[-2,0],[0,2],[-1,3],[0,2],[2,1],[2,-7],[-1,-1]],[[7597,5647],[-1,-2],[-1,0],[0,9],[1,3],[1,-1],[-1,-3],[1,-6]],[[7586,5658],[-1,-1],[-1,3],[0,3],[1,1],[1,-6]],[[7576,5710],[-1,-1],[-1,2],[0,2],[2,3],[1,-4],[-1,-2]],[[7568,5791],[-1,-2],[-2,2],[0,6],[-1,6],[4,8],[2,-6],[0,-5],[-2,-9]],[[7583,5877],[1,-8],[-2,3],[-1,3],[2,2]],[[7574,5924],[-1,5],[1,1],[1,-1],[-1,-5]],[[7574,5848],[-1,0],[-3,10],[0,7],[-1,2],[3,8],[0,6],[1,5],[1,1],[2,0],[0,5],[-2,3],[0,11],[1,4],[0,12],[2,3],[0,9],[1,11],[0,8],[2,7],[3,3],[1,0],[0,-8],[-1,-4],[1,-4],[0,-2],[-2,-8],[-1,-1],[-1,-5],[-1,-2],[2,-6],[1,-18],[-2,-4],[-2,-1],[1,-12],[-3,-9],[0,-3],[-1,-2],[1,-3],[0,-17],[-2,-6]],[[7203,6975],[0,-2],[1,0],[3,-5]],[[7249,6921],[-1,1],[-2,-1],[-6,-10],[-2,-2],[-6,-13],[-4,-18],[0,-6],[-1,-7],[-1,-4],[-3,-8],[-1,-7],[5,-8],[3,-4],[3,-3],[1,0],[1,3],[2,-1],[3,-3],[1,-2],[8,-8],[6,-7],[0,-3],[2,-4],[9,-11],[4,-4],[2,-3],[4,3],[4,-3],[9,-11],[5,1],[1,-1],[2,-9],[5,-3],[4,-1],[4,-2],[2,-2],[3,2],[0,2],[2,1],[3,0],[5,-4],[2,-1],[2,4],[4,1],[2,2],[3,-4],[7,-4],[4,-3],[1,-3],[0,-9],[1,-3],[7,-7],[2,-3],[4,-1],[1,-5],[3,-1],[8,5],[2,0],[2,-7],[0,-4],[4,-3],[4,3],[3,-2],[7,-2],[5,-5],[4,-3],[2,0],[7,7],[2,-7],[5,-4],[4,3],[3,-1],[3,0],[3,2],[3,0],[4,-3],[2,3],[1,9],[2,8],[0,4],[-2,7],[-3,9],[0,3],[1,16],[1,9],[1,4],[1,7],[0,5],[-1,2]],[[7702,6809],[0,-8],[1,-3],[0,-3],[-1,-4],[-3,-1],[-1,-3],[-3,-5],[-3,-3],[-2,-3],[0,-12],[6,-16],[0,-3],[-2,-1],[-4,5],[-2,7],[-2,2],[-2,0],[-11,-4],[-2,0],[-4,-3],[-4,-10],[-5,-5],[-7,-12],[-8,-6],[-2,-3],[-2,-7],[0,-7],[1,-9],[1,-6],[0,-3],[-2,-6],[-1,-1],[-1,-8],[-3,-10],[-2,-5],[-4,-3],[-1,-3],[-2,-10],[1,-3],[3,-3],[1,-5],[-2,-7],[-4,-17],[-4,-9],[-2,-9],[-2,-12],[-1,-8],[-2,-5],[-1,-1],[-2,2],[-4,2],[-5,4],[-5,-2],[-4,6],[-1,-3],[1,-14],[2,-6],[-1,-9],[0,-10],[-1,-12],[0,-3],[-1,-3],[-2,-1],[-2,1],[-1,-2],[1,-5],[-2,-6],[-1,-5],[1,-5],[0,-5],[2,-11],[0,-4],[-2,-5],[-1,1],[-3,-12],[-1,-1],[-2,1],[-2,5],[-2,2],[-1,-1],[-1,-6],[-2,-2]],[[7472,6456],[0,-9],[-2,0],[2,-6],[0,-10],[-4,-1],[-1,6],[-1,-5],[-2,-4],[-2,4],[0,4],[2,16],[-2,3],[-1,3],[-2,-16],[1,-7],[-1,-3],[-3,-3],[-5,9],[0,-4],[-1,-4],[-3,0],[-2,4],[4,25],[-3,5],[-3,3],[-1,-1],[1,-2],[3,-2],[2,-4],[-3,-6],[-3,-11],[-4,-5],[-4,-4],[-13,-7],[-3,-2],[-4,-8],[-2,-8],[-1,-7],[2,-8],[1,-13],[1,-2],[-4,-10],[-2,-7],[0,-3],[-1,-3],[-6,-8],[-2,-5],[-2,-4],[-2,2],[0,-6],[-2,-3],[-18,-11],[-2,0],[0,2],[1,1],[0,7],[-2,1],[-6,-8],[-3,-8],[2,-1],[4,5],[2,-1],[0,-2],[-6,-7],[-12,-22],[-1,-4],[-4,-10],[-4,-11],[-8,-17],[-2,-6],[-13,-13],[-2,-4],[-5,-12],[-5,-10],[-6,-9],[-11,-11],[-6,-10],[-2,-7],[-1,-2],[1,-4],[2,-5],[-1,-4],[0,-3],[-2,-6],[-4,-4],[-10,-9],[-1,0],[-9,2],[-3,-2],[-2,-4],[-3,-17],[-2,-5],[-2,-7],[-2,0],[-1,1],[-1,-1],[-1,6],[-4,2],[-7,-6],[-3,-5],[-5,-22],[-2,-14],[2,-16],[2,-13],[0,-13],[-2,-8],[1,-9],[3,-16],[0,-5],[2,-12],[-2,2],[-1,5],[-2,6],[-2,-6],[1,-4],[5,-6],[2,-4],[-4,-39],[-2,-13],[-3,-9],[-2,-4],[-3,-14],[-2,-17],[-1,-7],[1,-7],[-1,-5],[1,-2],[2,-8],[0,-24],[0,-26],[-3,-1],[-4,0],[-2,1],[-4,-1],[-2,-3],[-2,-5],[0,-8],[-7,-20],[-2,-13],[1,-4],[2,-3],[-1,-4],[-16,-9],[-4,-7],[-2,-6],[-2,-13],[0,-8],[-2,-8],[-8,-11],[-5,-3],[-2,-3],[-6,3],[-6,10],[-3,6],[-10,25],[-2,3],[-2,11],[0,4],[-2,4],[-2,13],[-2,27],[1,-1],[1,-5],[1,-7],[0,-9],[2,-1],[1,1],[-3,22],[-3,5],[-1,1],[-1,3],[0,7],[-2,7],[0,4],[-5,22],[-2,16],[-4,18],[-2,6],[-3,13],[-3,7],[-3,8],[-3,6],[-7,29],[-3,16],[-1,8],[-1,6],[-3,24],[0,10],[-2,10],[-3,11],[-1,7],[0,3],[-2,11],[0,5],[-1,5],[-2,4],[-1,4],[-4,11],[-2,2],[-2,8],[-2,13],[-2,5],[3,0],[-4,10],[2,5],[-3,0],[-2,3],[-2,9],[-3,11],[-4,23],[-3,43],[-2,19],[0,5],[-5,28],[0,9],[-1,6],[-1,12],[-1,4],[0,2],[1,6],[2,8],[1,6],[-1,7],[-2,-7],[-2,-3],[-1,6],[0,17],[-1,2],[0,3],[1,4],[-2,3],[-1,10],[0,3],[-1,2],[1,14],[5,28],[1,6],[-2,16],[0,8],[-4,5],[-2,11],[3,6],[-3,-1],[5,10],[1,3],[-8,1],[1,10],[1,5],[-3,1],[1,11],[2,2],[2,0],[3,2],[-3,2],[-3,0],[-4,-1],[-3,1],[-2,-1],[1,-4],[-1,-5],[0,-4],[-3,-2],[-2,-4],[0,-3],[-1,-3],[4,-3],[2,-6],[0,-8],[-5,-17],[-2,-4],[-12,-11],[-5,-6],[-10,-7],[-4,-2],[-5,2],[-6,6],[-10,14],[-3,5],[-8,19],[-5,10],[-10,18],[-5,12],[-1,5],[0,6],[2,3],[2,-2],[3,-6],[1,-1],[8,7],[3,0],[2,3],[2,-1],[5,6],[3,0],[2,1],[4,14],[3,9],[3,2],[-1,2],[0,3],[-2,-1],[-2,-5],[0,-2],[-4,1],[-10,-6],[-3,-5],[-2,-1],[-12,5],[-12,12],[-5,8],[-3,10],[-3,12],[1,3],[5,7],[1,4],[-6,-6],[-3,-5],[-3,-2],[-2,15]],[[6892,6557],[4,5],[5,2],[7,0],[0,18],[2,1],[1,-2],[2,2],[2,-2],[2,1],[2,-1],[3,0],[6,1],[3,-1],[4,-5],[3,-1],[6,2],[2,5],[5,4],[6,3],[1,1],[1,-2],[0,-6],[4,-3],[3,2],[3,6],[2,-1],[1,3],[-2,5],[0,7],[2,4],[0,4],[-2,8],[-2,10],[-3,8],[-4,13],[1,11],[-1,3],[-2,2],[-2,-1],[-5,0],[-1,1],[-5,12],[-1,4],[0,5],[2,8],[0,8],[1,7],[-3,6],[-4,1],[-5,2],[-4,4],[-3,4],[0,11],[1,10],[1,3],[3,5],[2,2],[9,22],[2,9],[5,8],[2,2],[3,0],[4,-5],[0,-5],[1,-4],[3,-4],[3,1],[11,8],[7,1],[5,2],[4,3],[2,12],[7,14],[1,9],[3,10],[8,9],[8,7],[1,4],[5,16],[4,14],[1,9],[2,9],[3,3],[5,3],[4,4],[4,7],[-1,3],[-1,7],[4,7],[5,15],[4,7],[1,0],[4,4],[3,4],[-1,4],[-2,1],[0,8],[2,12],[0,3],[-2,11],[0,3],[3,7],[12,12],[2,0],[3,3],[2,4],[0,6],[-2,3],[-7,5],[-6,0],[-3,2],[-1,6],[1,9],[-5,1],[-4,0],[-1,2],[1,3],[-1,4],[0,4],[-1,0],[-4,4],[-4,7],[0,3],[2,3],[2,5],[0,4],[1,3],[-3,5],[-2,2],[0,9],[6,6],[1,4],[-1,3],[-3,0],[-4,1],[-1,1],[0,4],[2,5],[0,2],[-2,3],[-3,2],[0,6],[4,13],[10,7],[18,-7],[6,-1],[2,-2],[10,-5],[3,0],[4,3],[2,3],[3,3],[4,0],[8,5],[3,-1],[3,3],[2,3],[0,2],[7,7],[1,4],[0,3]],[[7139,7206],[7,7],[3,4],[5,4],[3,4],[3,3]],[[7689,4482],[-1,1],[0,2],[1,0],[0,-3]],[[7936,4579],[-1,-4],[-3,3],[0,3],[2,0],[1,2],[1,-4]],[[7012,4758],[0,-2],[-1,-1],[-1,6],[2,3],[1,-1],[-1,-5]],[[4723,8289],[-2,0],[-1,2],[-6,1],[2,3],[1,-1],[4,0],[2,-5]],[[4826,8299],[2,-4],[-5,-2],[0,-6],[2,-3],[2,-11],[2,-8],[-1,-2],[1,-4],[-1,-2],[1,-4],[2,-12],[1,-9],[-2,-4],[-3,-11],[-1,-7],[-3,-8],[-4,-4],[4,-5],[-3,-3],[-3,-1],[-4,2],[-2,0],[-4,-3],[-1,5],[-2,-5],[-2,-2],[-3,1],[-9,-3],[-2,-5],[-2,-2],[-6,-2],[-2,-4],[-3,-3],[-2,0],[-4,4],[-2,-2],[0,-7],[-3,-1],[-4,-4],[-4,-1],[-2,-2],[-13,-5],[-1,-1],[-2,2],[-4,0],[-5,-3],[-3,1],[3,7],[5,3],[-1,2],[-9,-3],[-6,-3],[1,4],[9,9],[-9,-3],[-4,1],[0,2],[-3,-1],[-1,4],[6,9],[6,3],[1,2],[-2,1],[-12,0],[1,4],[4,4],[3,1],[5,-3],[5,1],[-2,2],[-2,7],[4,3],[3,5],[2,1],[7,1],[7,2],[8,4],[-4,1],[-2,3],[-3,-5],[-2,-2],[-6,-1],[-5,2],[-1,-2],[-4,-2],[0,4],[7,7],[3,7],[-2,3],[5,9],[4,1],[2,2],[2,0],[2,3],[-3,2],[-13,0],[-2,2],[-1,3],[-6,-1],[-1,2],[2,3],[-6,0],[-2,1],[1,4],[-2,1],[0,3],[3,0],[4,2],[-1,4],[0,4],[4,3],[5,1],[0,5],[-5,0],[-4,-1],[0,4],[1,4],[0,5],[-2,-1],[0,4],[-1,2],[-3,-1],[0,3],[2,4],[5,-1],[3,2],[11,0],[5,-5],[3,4],[8,-1],[4,-2],[2,1],[-3,6],[2,3],[9,6],[1,4],[2,4],[-9,-2],[-8,4],[1,3],[5,3],[4,6],[-1,4],[1,3],[2,2],[1,6],[4,0],[4,2],[5,1],[1,3],[3,0],[3,-5],[0,-3],[-2,-4],[1,-3],[3,3],[0,6],[-1,5],[2,2],[4,1],[-2,4],[4,0],[2,-3],[6,-4],[-3,-4],[-3,-2],[-1,-2]],[[6560,6734],[-3,-7],[-4,-6],[-3,2],[-5,-3],[-3,-4],[-4,-2],[-3,1],[1,3],[5,4],[7,6],[-1,6],[1,1],[4,-2],[4,4],[4,2],[2,-3],[-2,-2]],[[6356,7397],[1,-17],[3,-21],[2,-6],[3,-4],[5,-5],[3,-1],[7,-1],[7,-2],[4,-2],[3,-4],[3,-11],[6,-8],[11,-11],[5,-4],[18,-8],[12,1],[32,14],[11,3],[2,-2],[-4,-2],[2,-2],[6,0],[2,5],[-1,3],[-1,13],[-2,9]],[[6496,7334],[8,0],[3,1],[8,5],[2,0],[1,2],[2,1],[2,13],[7,10],[4,5],[4,4],[6,3],[7,-1],[9,0],[2,-1],[2,1],[0,6],[4,3],[3,0],[3,1],[7,-3],[8,0],[3,-4],[0,-3],[1,-3],[0,-4],[5,-2],[5,-1],[5,-3],[2,-2],[4,-2],[4,-7],[5,-2],[3,3],[4,-2],[4,2],[3,-2],[8,-8],[1,1],[2,-3],[1,-8],[2,-5],[3,-4],[11,-8],[3,-5],[3,-7],[4,-11],[23,0],[1,-4],[0,-16],[1,-6],[0,-5],[-1,-3],[0,-5],[1,-1],[1,-5],[0,-12],[1,-2]],[[6689,6903],[5,-11],[4,-7],[5,-12],[0,-4],[6,-23],[5,-11],[4,-7],[4,-4],[3,0],[6,-4],[6,-10],[5,1],[0,-15],[1,-11],[1,-18],[-2,-8],[0,-6],[4,-2],[8,2],[2,-3],[1,-4],[-2,-8],[1,-7],[-2,-2],[-1,-11],[-2,-1],[-9,1],[-3,-3],[-6,-2],[-3,-4],[-2,-4],[0,-4],[-3,1],[-1,-3],[-7,-4],[-1,-5],[-2,-19],[-2,-3],[0,-5],[-1,-6],[-1,-17],[0,-5]],[[6710,6635],[-2,0],[-1,-3],[-2,-3],[-5,2],[-4,3],[-12,6],[-1,2],[-1,5],[-2,1],[-3,-7],[-11,4],[-3,-1],[-3,2],[-5,0],[-5,5],[-6,-3],[-5,-1],[-7,8],[-7,2],[-9,0],[-5,3],[-3,3],[-4,-2],[-1,4],[-12,4],[-2,7],[-1,7],[0,7],[-3,12],[-1,18],[-2,13],[-2,5],[-3,6],[-2,2],[-11,4],[-6,-3],[-5,-6],[-8,-4],[-2,-2],[-2,-6],[-3,-4],[-3,1],[-4,-3],[-7,-10],[-4,-3],[-3,0],[-4,5],[-7,6],[-5,2],[-7,-1],[-3,1],[-6,7],[-1,5],[-3,4],[-10,8],[-8,10],[-2,4],[-1,6],[-3,7],[-8,6],[-5,6],[-5,1],[-5,0],[-2,1],[-2,3],[-7,13],[0,5],[-4,12],[-1,5],[-1,12],[-1,3],[-4,5],[-1,3],[1,5],[0,3],[-2,3],[-3,2],[-1,4],[0,12],[-3,7],[-5,8],[-4,11],[-2,3],[-2,16],[-3,0],[-12,-10],[-3,6],[-11,10],[-1,4],[3,2],[2,-2],[2,2],[-1,3],[-2,3],[-4,-1],[1,-3],[-3,-3],[-1,-4],[0,-5],[1,-7],[-3,-5],[-4,0],[-2,-3],[-2,-1]],[[6347,6909],[-3,4],[-1,5],[0,7],[-3,4],[-2,1],[-2,5],[-2,3],[-1,0],[0,21],[-1,9],[-4,1],[-5,0],[0,23],[4,23],[-3,8],[-3,9],[-2,3],[-3,11],[-1,5],[-1,2],[-2,1],[-4,-1],[-9,13],[-7,8],[-5,6],[-2,1],[-5,1],[-1,1],[0,6],[2,5],[0,3],[-5,14],[-3,1],[1,3],[0,3],[-1,2],[-4,-1],[-1,5],[-6,13],[-2,2],[1,5],[3,6],[0,8],[-3,8],[2,6],[0,3],[4,0],[0,10],[1,3],[6,13],[4,3],[2,3],[1,4],[-1,2],[0,5],[-3,6],[-1,5],[2,9],[4,2],[2,2],[0,2],[-3,3],[-12,0],[-2,6],[-3,3],[-4,1],[-1,3],[-3,17],[-1,3],[-3,0],[-2,4],[0,11],[-4,8],[-4,20]],[[6242,7323],[0,4],[1,4],[-2,4],[-4,5],[0,9],[-1,2],[1,6],[-5,5],[-2,3],[-3,0],[0,5],[2,4],[2,6],[0,4],[1,3],[2,3],[-1,3],[-4,1],[0,15],[-1,3],[1,8],[-3,6],[-1,3],[1,2],[0,7],[-3,4],[0,6],[-1,4],[3,1],[5,-1],[2,2],[2,14],[1,4],[2,2],[4,-5],[3,-2]],[[6332,6910],[-7,6],[-2,1],[-4,0],[-5,-1],[-3,-2],[-4,-6],[-1,-7],[-2,-9],[-2,-7],[-6,-16],[-5,-10]],[[6291,6859],[-4,-2],[-24,4],[-13,2],[-10,2],[-9,14],[-7,10],[-9,14],[-9,13],[-10,14],[-7,10],[-8,13],[-7,11],[-6,9],[-8,9],[-22,22],[-6,7],[-12,12],[-18,6],[-10,3],[-6,2]],[[6086,7034],[4,6],[-1,7],[-3,-1],[-3,-2],[-1,10],[2,1],[-2,12],[-4,26],[-2,12]],[[6076,7105],[8,9],[14,14],[8,9],[16,16],[7,8],[7,3],[1,2],[4,11],[2,9],[0,15],[1,15],[2,15],[2,5],[0,10],[-2,7],[-1,8],[0,12],[1,6],[3,7],[11,5],[5,9],[3,4],[8,16],[0,1]],[[6176,7321],[2,1],[5,7],[3,6],[1,1],[5,-3],[4,3],[2,-2],[4,-1],[7,-5],[3,0],[5,-1],[4,5],[3,0],[1,-1],[2,-5],[0,-11],[2,-2],[3,5],[3,3],[3,4],[4,-2]],[[6347,6909],[-2,-1],[-3,1],[-6,5],[-2,0],[-2,-2],[0,-2]],[[4567,8998],[3,0],[8,3],[5,5],[3,1],[5,-1],[-6,-5],[-3,-6],[-3,-4],[3,-3],[3,-1],[5,1],[2,-6],[-5,-11],[11,2],[2,-1],[0,-4],[2,-5],[4,1],[6,-1],[3,-2],[1,-3],[3,1],[2,-4],[-2,-5],[-3,-2],[2,-4],[2,0],[0,-3],[-3,-3],[5,-3],[0,-4],[-2,-3],[-6,-1],[1,-5],[-1,-3],[-5,-7],[-7,-1],[-5,-5],[2,-3],[-4,-8],[-13,-8],[-7,0],[-6,-3],[-10,-4],[-11,-8],[-6,-7],[-8,-4],[-10,-2],[-15,-4],[-5,-2],[0,-2],[-3,-2],[1,-3],[-1,-3],[-4,-2],[-5,1],[1,-3],[-12,-4],[-17,2],[-6,3],[-8,3],[-5,1],[-7,0],[-6,5],[-2,3],[0,3],[-5,-1],[-2,4],[-4,0],[-4,2],[-6,6],[-6,-5],[-25,0],[-8,-1],[-1,2],[-2,9],[1,3],[2,0],[2,-4],[2,-1],[9,3],[5,3],[5,6],[1,5],[3,4],[2,1],[-1,2],[-9,-5],[-2,0],[2,4],[-1,1],[1,6],[7,5],[3,1],[-2,2],[-7,-5],[-5,-2],[-5,3],[-1,4],[2,4],[-6,4],[-7,0],[-17,2],[-4,-1],[-6,-3],[-4,-1],[-3,2],[-2,7],[4,2],[5,-1],[6,2],[3,0],[4,3],[3,-2],[8,3],[1,2],[3,-1],[5,0],[5,1],[12,0],[2,2],[2,5],[-1,1],[-7,-4],[-10,2],[-3,3],[5,5],[5,3],[7,3],[1,3],[-4,3],[-9,-1],[-2,3],[-7,2],[-5,-1],[-2,2],[-6,-3],[-14,-4],[-8,-3],[-3,2],[-6,2],[-6,1],[-1,1],[4,5],[2,1],[8,-4],[-1,8],[-3,4],[1,1],[5,-1],[8,-5],[4,1],[4,4],[-7,0],[-3,1],[-4,4],[3,2],[6,0],[-7,7],[1,4],[7,-3],[0,2],[-3,2],[1,3],[5,2],[8,-5],[2,-3],[0,-3],[5,0],[3,3],[3,-2],[2,-6],[3,1],[0,9],[-12,6],[-2,3],[8,4],[-1,2],[-4,-1],[-8,1],[1,3],[4,3],[14,0],[7,-8],[6,-2],[0,-1],[9,-9],[7,-5],[-4,-2],[4,-2],[2,-3],[-2,-8],[-2,-3],[0,-3],[3,-4],[-2,-6],[3,0],[2,-3],[2,-6],[2,-1],[1,8],[2,1],[1,7],[4,4],[4,1],[3,-4],[3,-1],[3,9],[0,6],[-1,7],[2,8],[3,1],[5,-3],[4,-7],[6,-8],[5,-2],[1,2],[0,14],[2,2],[5,1],[5,4],[6,1],[6,-6],[3,-6],[5,-5],[3,-7],[2,-1],[0,5],[-1,4],[-5,11],[1,4],[11,-1],[9,-10],[4,3],[9,11],[5,-4],[5,-1],[3,3],[4,1],[2,5],[-3,10],[1,2],[7,2],[6,0],[5,-5],[4,-5],[0,-4],[4,-3]],[[5986,7049],[-4,3],[0,3],[-6,2],[-3,-4],[-2,-7],[0,-3],[-1,-7],[0,-5],[1,-5],[0,-7],[-1,-3],[3,1],[4,-3],[0,-2],[-2,-1],[-3,-3],[-2,-4],[-1,-4],[-1,-10],[1,-1],[5,1],[5,3],[3,4],[2,-1]],[[5984,6996],[-2,-14],[1,-1],[0,-5],[-1,-8],[-3,-11],[-1,-7],[-2,-9],[-1,-6],[0,-16],[-2,-9],[0,-5],[-3,-19]],[[5970,6886],[-2,-5]],[[5950,6981],[3,5],[0,4],[5,9],[-1,4]],[[5957,7003],[5,17],[4,18],[3,24],[2,12],[2,8],[1,7]],[[5974,7089],[6,0],[3,-1],[2,3],[1,7],[1,2],[1,-2],[1,2],[3,3],[2,5],[1,1]],[[5995,7109],[0,-4],[-1,-2],[0,-3],[2,-5],[0,-3],[-1,-3],[0,-3],[1,-2],[0,-3],[-1,-5],[-2,-4],[0,-3]],[[5993,7069],[-5,-3],[-1,-4],[-1,-13]],[[5334,7300],[-2,0],[-1,2],[0,3],[2,-1],[1,-4]],[[5432,7385],[-2,-7],[-8,-18],[-1,-4],[0,-4],[-3,-11],[1,-7],[3,-5],[-2,-3],[2,-4],[2,-2],[0,-5],[-3,-4],[-2,-6],[0,-9],[-3,1],[-3,2],[-4,-1],[-7,5],[-4,10],[-3,4],[-3,3],[-3,1],[-4,-1],[-3,2],[-6,7],[-9,9],[-2,4],[-4,2],[-3,3],[-2,1],[-4,-1],[-5,6],[-3,9],[4,13],[1,2],[2,1],[2,5],[4,-9],[2,0],[2,3],[1,3],[3,3],[3,0],[2,-1],[2,-4],[2,0],[6,-7],[2,0],[7,3],[7,-1],[6,2],[4,2],[2,4],[2,1],[5,0],[4,-1],[2,1],[2,3],[2,0],[4,4],[2,0],[2,-2],[-1,-2]],[[5235,7434],[-2,-6],[-2,4],[0,4],[4,-2]],[[5386,7528],[-2,0],[0,3],[3,-1],[-1,-2]],[[5229,7547],[-1,-3],[-1,3],[3,5],[1,-1],[-2,-4]],[[5267,7538],[1,-4],[3,-15],[0,-6],[-4,-10],[0,-7],[2,-8],[-1,-5],[-2,-33],[-1,-6],[0,-5],[-3,-1],[-6,4],[-3,-1],[-2,2],[-1,-11],[-4,-7],[-3,-1],[-4,1],[-2,6],[-4,10],[0,5],[-1,11],[2,5],[1,9],[1,1],[0,6],[-1,3],[-2,1],[-1,4],[2,6],[0,12],[-2,9],[-1,3],[-2,3],[-1,3],[-2,3],[0,7],[1,5],[0,3],[4,-4],[3,-1],[3,1],[4,3],[3,3],[5,9],[5,4],[0,4],[1,1],[2,-4],[2,0],[3,-3],[2,-5],[2,-2],[-2,-5],[3,-3]],[[5288,7652],[1,-4],[-1,-1],[0,-3],[-2,2],[-3,-1],[-3,0],[0,4],[4,0],[3,1],[1,2]],[[5380,7863],[-1,-4],[-1,0],[-5,-5],[-2,-3],[0,-5],[2,0],[2,-2],[3,-1],[-1,-3],[-2,-2],[-2,-5],[1,-2],[3,1],[-1,-10],[3,-1],[4,-7],[1,-5],[-4,0]],[[5380,7809],[2,2],[-4,9],[-2,0],[-3,-4],[-7,4],[-2,-2],[-1,-3],[-2,-3],[-4,-2],[-11,-8],[-2,0],[-2,2],[-2,-3],[-1,-5],[0,-7],[1,-2],[3,-9],[4,-5],[-2,-7],[-2,-2],[-3,2],[-1,-7],[2,-17],[2,-11],[3,-6],[5,-8],[6,-4],[11,-13],[8,-7],[3,-11],[3,-12],[6,-28],[5,-10],[10,-16],[9,-11],[8,-6],[7,-2],[15,2],[3,-1],[3,-2],[1,-4],[-1,-3],[-4,-4],[-3,-4],[0,-7],[3,-4],[15,-12],[15,-10],[5,-5],[5,-7],[14,-11],[2,-5],[8,-11],[4,-9],[0,-7],[-1,-7],[-1,-4],[-2,-5],[-3,2],[-4,5],[-6,19],[-11,2],[-6,5],[0,2],[-2,4],[-4,1],[-3,-3],[-7,-19],[-4,-16],[0,-6],[2,-7],[6,-3],[5,-6],[3,-5],[1,-15],[1,-7],[-2,-5],[-4,1],[-6,-3],[-3,-5],[-2,-5],[0,-17],[-8,-10],[-4,-9],[-2,-8],[-9,0],[-2,5],[-1,8],[2,5],[3,2],[3,11],[-1,7],[1,4],[2,2],[6,3],[0,10],[-3,5],[-1,7],[-1,12],[-5,16],[-2,14],[-2,7],[-3,3],[-6,0],[-2,1],[-10,10],[0,4],[1,4],[-2,10],[-2,5],[-2,2],[-6,-3],[-2,1],[-4,-2],[4,7],[-1,2],[-4,3],[-5,1],[-1,-2],[-1,1],[0,3],[-5,15],[-5,7],[-4,-1],[-5,3],[-5,0],[-2,-2],[-2,1],[0,2],[-5,6],[-6,4],[-12,20],[-4,7],[-7,8],[-5,12],[-4,4],[-5,4],[-3,-2],[-3,1],[1,2],[2,1],[-1,4],[-6,12],[-4,4],[-4,9],[-2,-1],[-2,1],[0,6],[1,4],[-3,13],[-3,9],[-2,19],[-2,6],[-4,4],[-9,4],[-12,13],[-3,0],[-7,5],[-5,1],[-5,-4],[-8,-13],[-6,-12],[-2,-2],[-7,-5],[-7,-2]],[[5343,7714],[1,-2],[2,0],[1,3],[-2,2],[-2,-3]],[[2853,6246],[3,-2],[4,-1],[3,0],[3,-5],[3,-3],[9,-6],[4,-11],[0,-3],[-2,-2],[-3,-1],[-3,0],[-3,2],[-1,2],[-3,1],[-1,2],[-2,0],[-2,-8],[-3,1],[-1,2],[-2,-3],[-1,-7],[-2,3],[-3,3],[-3,2],[-5,0],[-3,1],[-2,6],[-1,2],[-2,2],[-3,7],[0,1],[-7,2],[-1,4],[0,3],[3,5],[1,1],[3,0],[3,1],[3,3],[12,-3],[2,0],[3,-1]],[[4943,8019],[0,-3],[-6,0],[0,5],[6,-2]],[[5984,6996],[0,5],[1,7],[2,5],[-1,13],[0,6],[1,8],[-1,9]],[[5993,7069],[3,-1],[2,-3],[3,-8],[4,-2],[2,-2],[2,-4],[3,-2],[10,-2],[13,15],[8,9],[5,5],[8,10],[6,6],[7,8],[7,7]],[[6086,7034],[-4,-7],[-6,-4],[-11,-5],[-7,-4],[-18,-9],[-14,-8],[10,-20],[9,-18],[4,-9],[5,-10],[-9,-9],[-1,-2],[-4,-18],[-8,-3],[-7,-3],[-5,-1],[-2,-2],[-6,-20],[-5,-8],[-6,-9],[-2,0],[-11,3],[-7,3],[-5,1],[-6,2]],[[5970,6874],[1,8],[-1,4]],[[8440,6582],[-2,-1],[-4,1],[0,2],[2,2],[1,4],[4,-3],[0,-3],[-1,-2]],[[8451,6595],[-1,-9],[-2,-1],[-1,1],[-2,5],[1,2],[3,-1],[2,7],[1,-1],[-1,-3]],[[8483,6608],[-2,-1],[-3,1],[1,8],[1,-1],[0,-3],[3,-4]],[[8948,6716],[-2,6],[2,0],[1,-4],[-1,-2]],[[8561,6718],[-2,-2],[-1,-3],[-3,-1],[-2,-5],[-2,-1],[0,-3],[1,-3],[-2,-1],[-2,-3],[0,-3],[1,-3],[-2,-4],[-2,0],[-1,4],[1,2],[2,7],[0,7],[2,2],[4,7],[-2,2],[0,3],[1,1],[2,-1],[1,-2],[2,1],[3,8],[1,5],[2,-4],[0,-6],[-2,-4]],[[8582,6780],[-1,-1],[-2,1],[0,10],[2,1],[1,-6],[0,-5]],[[8591,6802],[0,-1],[-3,1],[-1,5],[2,-1],[2,-4]],[[8595,6808],[-3,-5],[-2,5],[-3,2],[2,2],[0,2],[2,3],[5,2],[2,2],[3,5],[1,-5],[-2,-1],[-4,-7],[-2,-2],[1,-3]],[[8627,6926],[-3,-1],[-2,1],[-1,8],[3,4],[4,-4],[-1,-8]],[[8636,6934],[-2,-1],[0,4],[2,7],[0,6],[2,7],[2,0],[-1,-9],[-2,-6],[-1,-8]],[[8620,7051],[-3,0],[-1,2],[4,4],[3,-1],[-3,-5]],[[8612,7040],[-2,-2],[0,7],[-1,1],[1,7],[0,3],[4,2],[1,-3],[0,-9],[-3,-6]],[[8573,7072],[1,-2],[3,1],[2,-5],[0,-2],[-3,-1],[-1,-3],[-2,1],[-1,2],[1,9]],[[8883,7087],[-2,2],[0,2],[3,-2],[-1,-2]],[[8584,7075],[-1,-1],[0,5],[-1,2],[1,1],[2,6],[1,-4],[0,-3],[-1,-1],[-1,-5]],[[8596,7097],[-2,-3],[0,5],[1,4],[1,-3],[0,-3]],[[8604,7127],[-2,-2],[-1,2],[0,5],[1,1],[2,-1],[0,-5]],[[8642,7119],[4,-2],[2,0],[3,3],[3,2],[3,-3],[1,-3],[-3,-9],[-3,-7],[5,-1],[5,0],[-1,-4],[0,-4],[3,-4],[-1,-4],[3,-4],[-1,-4],[-7,-14],[-4,-16],[-2,-12],[0,-6],[-2,-7],[1,-6],[-1,-7],[-3,-15],[-3,0],[-3,2],[-2,0],[0,-3],[1,-7],[-5,-9],[-6,-5],[0,4],[2,4],[1,6],[-1,7],[-2,8],[0,3],[2,1],[1,2],[0,3],[-1,2],[-3,0],[-3,-9],[-1,-6],[1,-3],[0,-3],[3,-5],[-2,-5],[-11,7],[-1,6],[4,3],[1,8],[-2,6],[-2,4],[1,5],[-1,6],[0,8],[4,3],[4,9],[2,9],[3,9],[-4,2],[2,5],[-1,5],[-3,7],[-2,8],[-2,4],[-2,1],[-3,-4],[2,-5],[-1,-5],[1,-5],[4,1],[1,-3],[0,-3],[-2,-5],[-3,2],[-1,3],[-3,1],[-3,-3],[-2,-6],[-3,-3],[2,9],[-1,3],[-3,6],[0,3],[-1,4],[1,3],[3,-4],[1,-5],[2,-2],[3,-1],[-2,8],[-10,15],[1,6],[2,1],[4,-2],[1,3],[-1,3],[3,3],[5,3],[1,4],[3,-1],[3,3],[2,5],[0,3],[1,3],[5,5],[5,0],[3,-3],[2,-5],[1,-6],[3,-4]],[[8673,7138],[1,-2],[3,1],[0,-2],[-2,-2],[-4,1],[0,5],[2,-1]],[[8681,7148],[0,-2],[-3,1],[2,4],[1,-3]],[[8590,7149],[-2,-3],[-1,4],[1,10],[3,-2],[0,-3],[-1,-6]],[[8731,7156],[4,-2],[4,1],[-1,-11],[2,-7],[0,-4],[1,-2],[-5,-5],[-5,-7],[-2,-5],[-3,-16],[-2,3],[-4,9],[-3,2],[-5,2],[-11,-9],[-1,-7],[-4,-12],[-2,-1],[0,-2],[-2,-8],[-3,-5],[-4,1],[-2,-1],[2,8],[-3,1],[-3,0],[0,5],[-2,3],[2,4],[0,5],[1,5],[-3,2],[0,6],[-4,-1],[-5,-4],[0,3],[5,4],[2,3],[8,10],[2,6],[0,3],[2,8],[2,2],[2,4],[2,0],[1,-6],[3,-4],[4,3],[5,0],[3,3],[2,6],[0,6],[2,0],[3,4],[3,3],[4,0],[4,-2],[4,-4]],[[8731,7169],[-1,0],[-2,-3],[-2,4],[0,2],[5,0],[0,-3]],[[8747,7158],[-3,-5],[-3,1],[-2,5],[3,4],[2,6],[2,3],[3,1],[-3,-8],[1,-7]],[[8593,7162],[-1,-3],[-3,4],[2,9],[0,5],[4,4],[0,-8],[-2,-7],[0,-4]],[[8872,7183],[-1,-2],[-1,2],[0,3],[2,0],[0,-3]],[[8703,7269],[-1,-3],[-2,1],[-2,3],[1,4],[2,2],[3,-5],[-1,-2]],[[8842,7362],[-2,2],[1,8],[-2,0],[0,5],[1,4],[5,8],[1,-2],[-1,-8],[0,-3],[3,0],[-2,-9],[-4,-5]],[[8922,7566],[1,-1],[5,3],[-2,-18],[1,-14],[0,-7],[1,-7],[2,-4],[3,-3],[4,-11],[3,-13],[2,-13],[1,-3],[0,-3],[-1,-4],[1,-3],[-2,-23],[-1,-6],[-2,-4],[-4,-4],[-1,-3],[0,-3],[-2,-3],[-1,-3],[0,-8],[-2,-13],[-2,-1],[-4,0],[-5,-4],[-3,-9],[-1,-6],[0,-6],[2,-14],[1,-14],[-1,-20],[-1,-6],[-3,-7],[-2,-2],[-1,-7],[-3,-13],[0,-7],[-2,-9],[2,-10],[4,-12],[1,-4],[2,-3],[-7,-4],[-1,-1],[-4,-7],[-1,-7],[0,-7],[-3,-7],[-4,-3],[-3,-4],[-3,-5],[-1,-3],[-2,1],[-1,3],[1,3],[0,16],[2,3],[1,5],[4,6],[0,3],[-1,3],[-2,2],[-4,-1],[-2,-6],[0,-3],[-3,-5],[0,-5],[2,-6],[-3,-5],[-2,6],[-2,3],[-3,0],[-3,-1],[-3,-4],[-1,-3],[0,-11],[-1,-7],[-2,-6],[-3,-6],[-2,-1],[-2,5],[1,10],[0,6],[3,3],[-2,4],[-3,1],[-4,-2],[-2,-6],[-7,-14],[-2,-8],[-6,3],[-6,0],[-6,1],[-6,-2],[-7,-3],[0,2],[6,5],[0,4],[-5,-1],[-2,1],[-2,4],[-1,-1],[1,-6],[-1,-1],[-1,2],[0,4],[-1,6],[0,4],[1,3],[-1,2],[-3,-2],[-5,-14],[-1,-6],[3,-5],[7,-9],[0,-3],[-1,-4],[-8,-4],[-6,-4],[-2,-5],[-6,-18],[-4,-13],[-6,-4],[-7,4],[-3,10],[-5,10],[-1,6],[0,10],[-1,6],[1,2],[4,4],[3,6],[1,3],[0,4],[-2,2],[-4,0],[-4,-1],[-3,2],[-4,5],[-2,1],[-4,0],[-3,-1],[-3,-2],[-3,0],[-8,-11],[-3,-2],[-5,0],[-6,-4],[-1,1],[-8,-8],[-3,2],[-7,-5],[-3,0],[-4,2],[-3,4],[-3,-2],[-2,-5],[-1,-12],[-2,-11],[-11,13],[-7,-2],[-7,-4],[-2,1],[-2,3],[-3,-1],[-2,-2],[-1,17],[2,5],[2,2],[3,1],[4,-1],[2,1],[3,4],[4,8],[4,3],[3,3],[6,10],[6,8],[9,16],[4,8],[5,4],[6,2],[3,0],[4,-5],[3,2],[3,1],[4,-1],[6,0],[7,2],[3,3],[4,2],[11,2],[8,5],[3,-1],[0,-4],[-1,-4],[1,-2],[2,-1],[7,-1],[3,-1],[6,6],[5,9],[-2,7],[0,6],[1,8],[3,6],[3,3],[2,5],[6,12],[4,10],[1,12],[-1,14],[4,10],[13,9],[1,-5],[-6,-9],[-3,-4],[-3,-3],[-1,-3],[3,-5],[1,-4],[0,-7],[3,-4],[3,-1],[3,1],[4,9],[0,2],[12,6],[5,5],[3,1],[3,3],[9,15],[2,5],[1,6],[2,6],[2,4],[10,10],[4,7],[2,15],[1,6],[4,11],[3,5],[4,26],[4,10],[0,20],[-3,8],[-4,-1],[-2,3],[1,2],[2,0],[2,3],[2,7],[1,7],[0,3],[-1,6],[-2,7],[0,4],[3,7],[4,2],[3,3],[0,2],[2,6],[0,3],[-1,9],[2,4],[2,-1],[3,0],[2,-1],[1,-17],[2,-4],[2,0],[2,6],[1,0],[6,-3],[3,6],[1,7],[-1,6],[-1,2],[-4,-3],[-7,-3],[0,6],[1,10],[1,3],[2,2],[3,-2],[5,-6]],[[8873,7607],[-1,0],[-1,5],[2,4],[2,0],[-1,-8],[-1,-1]],[[8923,7782],[-4,2],[0,3],[3,2],[2,-3],[-1,-4]],[[8917,7794],[-1,-3],[-2,11],[3,-1],[0,-7]],[[8994,7724],[5,0],[2,-1],[11,-8],[6,-2],[3,1],[8,13],[7,10],[1,-3],[-4,-12],[-3,-12],[-1,-6],[1,-6],[4,-11],[2,-10],[4,-1],[3,3],[2,3],[2,1],[0,-3],[-3,-3],[-3,-6],[-1,-1],[-4,0],[-3,-2],[-6,-6],[-3,-2],[-3,0],[-5,-3],[-3,0],[-6,2],[-3,0],[-6,-6],[-6,-7],[-5,-9],[-4,-10],[-2,-6],[-1,-6],[0,-8],[-3,-5],[-3,2],[-6,5],[-11,8],[-12,13],[-6,6],[-12,-2],[-12,-12],[-1,1],[-7,11],[-2,1],[-4,0],[-3,-5],[-2,-6],[0,-2],[3,-8],[3,-4],[2,-1],[3,1],[1,-1],[5,-8],[5,-7],[1,-3],[-4,-4],[-5,2],[-4,3],[-5,-8],[-3,-9],[-3,-4],[-3,-2],[-2,1],[-3,8],[1,7],[2,6],[1,6],[-2,9],[-4,7],[-2,5],[0,10],[1,8],[0,4],[4,2],[6,6],[3,4],[3,5],[1,6],[-3,11],[0,3],[3,3],[3,-2],[5,-6],[5,0],[5,-2],[5,2],[2,4],[1,6],[-1,8],[0,7],[2,6],[4,10],[1,6],[1,14],[2,12],[1,14],[-2,13],[-4,12],[2,11],[0,2],[4,2],[4,6],[2,-2],[1,-3],[4,-6],[7,-12],[8,-17],[5,-9],[5,-8],[6,-8],[10,-10],[3,-5],[2,-1]],[[6393,7767],[-1,-2],[-2,0],[-2,7],[1,0],[1,-4],[3,-1]],[[6396,7774],[-1,3],[1,3],[1,0],[0,-5],[-1,-1]],[[6462,7799],[-2,1],[-1,3],[1,3],[2,-1],[1,-3],[-1,-3]],[[7227,7613],[-4,7],[-4,6],[-3,2],[-6,1],[-3,0],[-2,1],[-6,11],[-1,5],[-1,1],[-2,-1],[-5,1],[-7,3],[-3,2],[-4,1],[-2,-1],[-8,0],[-6,2],[-8,0],[-2,1],[-6,0],[-7,4],[-1,-1],[-12,-3],[-8,1],[-12,0],[-3,-6],[-1,-1],[-8,2],[-9,4],[-6,4],[-5,4],[-8,7],[-4,4],[0,-2],[-2,-1],[-5,0],[-2,-3],[-7,-5],[-2,-3],[-4,-23],[2,-11],[-5,3],[-3,4],[-9,2],[-3,4],[-6,2],[-8,5],[-3,0],[-9,4],[-3,0],[-3,-3],[-3,0],[-2,1],[-5,-3],[-4,-9],[-2,-3],[-1,-4],[-3,-7],[0,-3],[2,-2]],[[6970,7617],[-3,-3],[-3,0],[-2,-5],[-2,-3],[-2,-1],[-1,2],[-2,0],[-3,-3],[-2,-5],[-4,-7],[-4,-4],[-5,-3],[-3,-1],[-3,-3],[-4,-5],[-1,-3],[-4,-2],[-5,-5],[0,-6],[-6,-8],[-5,-9],[-3,-8],[0,-4],[1,-3],[0,-5],[-3,-1],[-5,3],[-4,4],[-3,5],[0,3],[1,6],[1,3],[-2,2],[-2,4],[-1,4],[-4,-2],[-2,2],[-5,-1],[-5,0],[-4,-1],[-5,0],[-6,-1],[-3,2],[-2,10],[-4,31],[0,6],[-8,0],[-6,1],[0,5],[1,6],[0,7],[1,9],[0,17],[1,6],[0,6],[-6,-4],[-2,-2],[-2,5],[-7,20],[-6,6],[-3,4],[-2,5],[-3,4],[-2,4],[-3,-1],[-3,-2],[-3,-3],[-4,-3],[-4,0],[-3,1],[-5,0],[-9,2],[-7,0],[-6,1],[-10,-2],[-6,-2],[-5,-1],[-6,-2],[-7,-1],[-8,13],[-2,5],[-7,11],[-6,10],[-2,5],[-1,6],[-5,6],[-4,4],[-4,3],[-4,4],[-3,4],[-8,8],[-4,3],[-8,8],[-3,4],[-4,4],[-4,3],[-15,15],[-4,3],[-7,-2],[-5,-2],[-12,-6],[-6,-2],[-14,-7],[-5,-2],[-5,-3],[-14,-6],[-3,-2],[0,-27],[0,-26],[0,-26],[0,-27],[0,-26],[0,-27],[0,-26],[0,-27]],[[6554,7563],[-4,0],[-8,-3],[-3,2],[-2,3],[-1,3],[-2,3],[-3,6],[-6,14],[0,4],[-2,5],[-5,7],[-13,13],[-3,2],[-3,0],[-2,-1],[-7,-1],[-5,-3],[-7,-3],[-7,-4],[-4,-4],[-4,-7],[-6,-9]],[[6457,7590],[-1,6],[0,12],[2,8],[2,11],[1,7],[-1,12],[-1,3],[-2,1],[-5,-1],[-1,-1],[-3,4],[-3,1],[-3,-2],[-2,2],[-2,4],[-3,9],[-2,3],[-3,1],[-6,0],[0,18],[-2,5],[-3,4],[-2,6],[-3,12],[-3,14],[-4,4],[-10,3],[-2,2],[0,10],[1,3],[3,3],[13,0],[5,-6],[3,-1],[6,2],[5,-1],[-2,3],[-5,2],[-2,5],[-5,6],[-1,3],[0,4],[1,3],[3,4],[2,4],[3,9],[2,5],[4,-1],[5,3],[9,0],[10,1],[10,-4],[8,-2],[4,1],[-4,5],[-6,5],[-2,4],[3,12],[4,11],[3,13],[-1,13],[-1,3],[0,4],[3,7],[-1,5],[-2,6],[-4,6],[-7,0],[-5,2],[-2,-2],[-2,-4],[-4,-3],[-3,0],[-2,4],[-2,-1],[-6,3],[-3,5],[-9,4],[-4,1],[-7,-4],[-9,-9],[-2,-1],[-1,1],[-2,-1],[-11,-14],[-3,-2],[-4,-1],[-3,0],[-2,-2],[-4,0],[-2,-1],[0,-7],[-2,2],[-2,-3],[0,-3]],[[6366,7852],[-12,10],[-5,3],[-3,5],[0,3],[3,4],[2,-2],[6,-2],[2,2],[0,2],[-7,19],[-4,13],[-4,8],[-4,7],[-3,7],[-2,2],[-14,3],[-3,1],[-5,-4],[-3,3],[-2,5],[-1,4],[1,4],[0,6],[-3,9],[-5,3],[-5,5],[-1,9],[2,13],[4,10],[5,7],[0,6],[-2,3],[-3,3],[-1,4],[1,8],[1,11],[3,9],[4,5],[3,3],[2,4],[0,12],[3,5],[2,2],[3,1],[3,-2],[4,-6],[6,-10],[4,-10],[6,-6],[5,3],[6,5],[1,3],[-1,5],[-2,7],[-1,8],[-1,11],[-1,4],[5,-1],[3,2],[4,5],[7,7],[2,5],[1,5],[2,4],[9,2],[3,4],[9,5],[3,5],[4,8],[4,5],[3,5],[1,3],[10,-5],[3,-3],[1,-6],[3,-1],[5,1],[5,4],[6,7],[6,2],[3,-2],[3,-5],[2,-5],[4,-2],[5,1],[2,-1],[4,0],[8,1],[6,-5],[4,-9],[8,-5],[5,-7],[4,-7],[4,-8],[0,-6],[2,-8],[1,0],[3,3],[0,11],[-1,6],[-2,4],[1,2],[4,1],[8,-8],[5,-7],[10,-8],[4,-1],[3,1],[7,6],[2,8],[10,10],[4,-2],[4,3],[2,0],[5,2],[4,-2],[7,-9],[4,1],[4,5],[1,4],[2,2],[6,-1],[4,0],[0,1],[5,-2],[5,-5],[3,-6],[5,-7],[1,-3],[3,-1],[3,0],[2,-1],[8,-2],[2,-2],[0,-5],[7,3],[1,2],[4,12],[2,3],[3,-1],[5,-7],[3,-2],[3,0],[3,-1],[9,2],[8,5],[4,5],[2,7],[2,9],[2,5],[-1,6],[-4,5],[-11,4],[-1,3],[-15,6],[-2,7],[-3,4],[-6,3],[-1,3],[1,2],[5,3],[5,6],[2,1],[5,0],[8,8],[1,6],[-5,10],[-1,6],[3,9],[2,2],[1,4],[2,2],[9,2],[14,-3],[4,1],[1,5],[-2,3],[-6,4],[-3,3],[-7,1],[-6,3],[-1,2],[0,4],[2,3],[2,1],[2,-1],[4,3],[0,3],[-3,2],[-5,-2],[-7,4],[0,2],[3,5],[0,8],[1,5],[3,3],[3,1],[7,-3],[9,-2],[2,0],[1,3],[13,0],[4,4],[12,2],[1,2],[5,1],[8,3],[3,2],[4,-1],[5,2],[1,2],[4,3],[7,2],[2,-2],[4,0],[7,2],[5,-3],[2,2],[2,8],[4,3],[3,4],[6,-1],[6,5],[1,-2],[7,0],[10,3],[5,1],[10,3],[4,2],[6,2],[6,1],[4,4],[3,1],[4,0],[4,2],[0,7],[-1,2],[3,2],[4,0],[2,1],[9,9],[4,2],[14,-2],[7,-3],[4,-4],[6,-4],[2,0],[6,2],[1,3],[9,3],[1,-3],[4,-7],[2,-11],[4,-13],[1,-7],[-1,-3],[0,-10],[-3,-6],[2,-3],[6,-3],[10,1],[6,2],[3,-1],[2,2],[1,4],[2,1],[2,-3],[2,-5],[2,-3],[-1,-4],[2,-7],[4,3],[0,4],[-1,2],[1,2],[4,0],[5,-1],[6,-7],[3,-2],[4,0],[7,6],[2,-1],[-1,-6],[-3,-4],[-4,-3],[-3,-6],[0,-7],[2,-5],[0,-3],[3,1],[4,6],[6,3],[6,-1],[4,-2],[4,-5],[2,1],[0,6],[1,2],[11,11],[4,-1],[6,4],[5,5],[0,6],[1,1],[7,1],[6,3],[10,9],[7,1],[7,6],[2,0],[-1,-7],[-4,-10],[-6,0],[1,-7],[3,-5],[15,-15],[10,-10],[11,-13],[4,-11],[5,-9],[8,-17],[6,-16],[8,-18],[4,-10],[9,-22],[3,-6],[4,-13],[4,-12],[4,-10],[2,-1],[0,5],[2,1],[2,3],[4,0],[2,2],[1,3],[-1,5],[0,5],[5,3],[1,3],[2,1],[4,-1],[2,-2],[1,-3],[4,0],[1,-3],[-2,-7],[0,-3],[1,-1],[6,1],[2,-1],[1,-5],[0,-5],[1,-2],[4,0],[4,1],[5,0],[4,-3],[7,2],[4,-1],[4,3],[4,7],[7,0],[2,4],[5,2],[2,0],[10,-7],[4,-4],[3,-2],[1,-6],[3,-4],[2,-5],[1,-5],[1,-8],[2,-3],[2,0],[6,-2],[6,-7],[3,0],[2,-1],[0,-3],[-1,-4],[1,-3],[4,-8],[2,-5],[0,-3],[2,-1],[2,2],[4,-2],[10,-2],[2,-1],[1,-3],[1,1],[5,-1],[1,3],[5,5],[6,8],[3,-1],[0,-3],[-3,-5],[0,-3],[2,0],[3,-4],[4,-10],[3,-4],[5,-2],[2,-4],[0,-3]],[[6138,5059],[-1,-1],[0,4],[3,4],[2,-2],[0,-1],[-4,-4]],[[6162,5412],[-3,-10],[-4,-12],[-8,-22],[-5,-12],[-5,-9],[0,-36],[0,-48],[0,-49],[0,-48],[0,-33],[8,-20],[5,-13],[3,-10],[0,-4]],[[6153,5086],[-4,-10],[-4,-5],[-4,-2],[-3,2],[-1,-2],[-1,-4],[-1,1],[0,-6],[1,-3],[-1,-4],[-2,-4],[0,-4],[-5,-8],[-7,-1],[-3,-4],[-2,-4],[-1,-7],[0,-12],[-1,-8],[-1,-5],[-3,-6],[-2,-5],[-1,-5],[-1,-3],[-1,-12],[-2,-7],[0,-5],[-2,-4],[0,-3],[-1,-2],[-4,-19],[-3,-8],[-3,1],[-2,-5]],[[6088,4913],[0,1],[-3,3],[-4,6],[-4,7],[-4,6],[-5,6],[-4,7],[-4,6],[-4,7],[-5,6],[-3,6],[-1,4],[-2,3],[-1,0],[0,6],[2,6],[0,3],[-1,4],[0,8],[-3,3],[-12,14],[-12,14],[-6,6],[-12,14],[-12,14],[-5,7],[-6,7],[-6,6],[-12,14],[-12,14],[-2,2],[-2,3],[-2,0]],[[5941,5126],[0,34],[0,22],[1,11],[2,7],[2,5],[0,7],[2,6],[3,5],[0,2],[4,8],[2,10],[1,4],[3,5],[3,1],[2,2],[0,2],[-1,6],[1,2],[2,8],[2,5],[0,4],[1,3],[0,6],[-3,32],[1,3],[-2,6],[-1,2],[-2,12],[-1,1],[-3,5],[-2,11],[-2,3],[-1,11],[-1,3],[2,11],[0,3],[-2,2],[-3,2],[-3,5],[0,2],[-1,2],[-4,19]],[[5943,5426],[5,12],[6,11],[7,15],[7,14],[5,11],[6,11]],[[7044,7455],[-1,1],[-3,0],[-3,-1],[-1,-2],[-3,-2],[-3,-1],[-7,0],[-6,2],[-8,-3],[-3,-7],[-1,0],[-4,6],[-2,2],[-6,-4],[-2,1],[0,7],[-1,1],[-4,1],[-1,1],[0,6],[-3,1],[-3,-4],[-5,-1],[-1,-1],[-2,-5],[-6,-1],[-3,5],[-2,5],[-1,1],[-5,0],[-4,-2],[-1,2],[-2,-1],[-5,-1],[-10,2],[-4,-3],[-4,0],[-1,8],[-1,5],[0,4],[2,8],[2,-1],[1,-2],[2,1],[0,4],[-1,1],[2,5],[7,3],[5,3],[12,-8],[2,-1],[2,-6],[3,3],[0,5],[3,3],[6,3],[0,3]],[[6970,7501],[1,1],[8,2],[5,-3],[1,-2],[4,1],[1,-4],[5,5],[3,1],[1,5],[3,5],[3,1],[4,-3],[1,2],[-1,5],[0,3],[1,1],[5,-4],[3,2],[2,3],[0,3],[10,8],[0,2],[-4,2],[-3,-1],[-1,1],[-5,0],[-1,1],[-3,6],[-4,3],[-5,-1],[0,6],[-2,4],[-2,-2],[-2,2],[-3,0],[0,7],[-2,6],[-3,2],[0,5],[-2,-2],[0,-8],[-1,-2],[-2,-1],[-2,2],[-1,-13],[-3,2],[-2,-1],[-3,1],[-2,2],[-2,0],[-5,4],[-1,8],[-2,3],[-6,-2],[-1,2],[-6,3],[-1,4],[8,9],[3,6],[4,4],[3,1],[1,6],[5,3],[5,5],[0,2],[-2,3],[-3,2],[-2,-2]],[[6963,7477],[-1,2],[-5,1],[2,-5],[4,2]],[[6993,7484],[0,3],[-3,-2],[1,-3],[2,2]],[[6977,7481],[-1,5],[1,4],[-4,2],[-1,4],[-2,-1],[0,-6],[2,-2],[-1,-6],[6,0]],[[7861,5833],[-1,0],[0,6],[1,0],[0,-6]],[[7858,5858],[0,1],[-5,21],[-1,9],[1,8],[0,2],[-1,4],[-2,4],[-4,6],[0,9],[-1,11],[-1,4],[-2,6],[-1,6],[0,15],[6,2],[1,2],[-1,2],[2,3],[3,8],[3,7],[2,10],[4,6],[4,5],[7,2],[3,3],[2,0],[3,-3],[5,0],[2,-1],[2,1],[5,1],[5,-1],[5,1],[5,2],[3,-1],[3,-2],[0,-7],[2,-1],[2,3],[1,4]],[[7920,6010],[1,-2],[0,-3],[1,-4],[3,-5],[1,0],[4,3],[6,-4],[2,-7],[2,-3],[5,0],[2,8],[-1,4],[-3,8],[0,5],[5,1],[1,6],[2,0],[2,-1],[3,3],[1,4],[3,-6],[2,-2],[2,-3],[1,-3],[1,-1],[3,1],[3,5],[2,0],[3,4],[1,5],[1,1],[2,-2],[1,0],[2,6],[1,2]],[[7985,6030],[1,-3],[-1,-6],[-4,-10],[0,-4],[-1,-10],[0,-3],[2,-5],[2,-10],[2,-9],[1,-8],[1,-5],[-2,-12],[-2,-11],[0,-6],[1,-5],[1,-8],[0,-16],[-1,-4],[-2,-3],[-1,-3],[-2,4],[-3,-1],[-2,-2],[-3,-5],[-3,-6],[-5,-2],[-1,-4],[-2,0],[-4,-1],[-2,0],[0,-15],[-2,-1],[-3,2],[-4,2],[-3,1],[-1,-5],[-1,-2],[-2,-1],[0,-19],[1,-3],[6,-10],[2,-2],[-1,-7],[1,-7],[-2,0],[-5,5],[-2,-1],[-1,4],[-3,4],[-4,-2],[-5,-2],[-2,-5],[-4,3],[-3,1],[-1,-2],[0,-4],[1,-4],[0,-2],[-2,-3],[-2,-4],[-3,-4],[-7,0],[-2,-5],[-2,-1]],[[7899,5783],[-4,7],[-9,3],[-1,3],[-1,1],[-1,-4],[-5,-4],[-2,2],[-1,3],[0,4],[1,3],[3,2],[1,8],[-2,9],[-3,5],[-2,-3],[-2,-6],[-1,-4],[-6,0],[-2,17],[1,9],[0,5],[-3,8],[0,7],[-2,3],[0,-3]],[[783,4524],[-1,1],[0,2],[1,0],[0,-3]],[[670,4859],[-2,0],[0,1],[2,0],[0,-1]],[[9846,5137],[-1,2],[-1,7],[1,0],[1,-5],[0,-4]],[[9805,5242],[1,-3],[0,-3],[-2,-5],[-1,1],[2,4],[1,3],[-1,3]],[[9805,5261],[0,1],[4,1],[0,-2],[-4,0]],[[629,5290],[4,-6],[-2,-1],[-4,3],[-5,7],[2,1],[0,-2],[2,-2],[1,4],[2,3],[0,-7]],[[573,5409],[3,-5],[-1,-2],[-1,0],[0,4],[-2,1],[1,2]],[[3262,6169],[-1,-1],[-1,2],[0,4],[1,0],[1,-2],[0,-3]],[[3259,6176],[-2,3],[-2,1],[-1,2],[0,3],[1,1],[2,-3],[1,-4],[1,-1],[0,-2]],[[8508,7097],[-2,-1],[-1,1],[-2,5],[1,3],[4,6],[10,5],[2,0],[4,-2],[1,-4],[-2,-6],[-8,-6],[-7,-1]],[[8520,7161],[0,-2],[-2,0],[-1,3],[1,2],[2,-3]],[[8505,7163],[-2,-1],[-1,2],[0,3],[4,7],[2,-1],[1,-3],[-1,-4],[-3,-3]],[[8549,7177],[-1,-2],[-1,3],[1,3],[1,-4]],[[8503,7184],[-1,-1],[-2,7],[-1,2],[2,2],[2,-5],[0,-5]],[[8556,7188],[0,-6],[-2,0],[-1,4],[-2,-2],[-1,4],[0,4],[2,3],[1,-2],[2,-1],[1,-4]],[[8575,7188],[-3,-4],[-4,7],[5,9],[1,0],[1,-12]],[[8510,7285],[0,-4],[-2,3],[-1,8],[2,-2],[1,-5]],[[8635,7342],[-1,-2],[-2,2],[0,2],[3,2],[1,-1],[-1,-3]],[[8513,7357],[0,-8],[-3,1],[-1,9],[1,3],[2,-2],[1,-3]],[[8516,7359],[1,2],[0,6],[3,4],[3,7],[4,8],[4,4],[17,0],[4,-1],[5,2],[2,2],[3,9],[2,5],[1,1]],[[8565,7408],[6,-26],[7,-16],[5,-13],[8,-23],[3,-12],[0,-8],[1,-10],[-1,-6],[0,-15],[-1,-4],[0,-15],[2,-3],[1,2],[2,1],[0,-6],[-3,-15],[-1,-11],[-3,-10],[-3,-8],[-4,-4],[-3,-1],[-5,0],[-4,1],[-4,-1],[-2,-5],[1,-5],[0,-3],[-2,0],[-3,2],[-4,0],[-1,1],[-2,6],[-4,-4],[-5,0],[-2,-4],[1,-3],[2,-3],[-1,-4],[-2,-2],[-2,5],[-1,4],[-3,-1],[-1,-5],[1,-3],[2,-3],[-3,-8],[-2,-2],[-4,5],[3,7],[0,3],[-1,2],[-6,-8],[-3,-10],[-2,1],[-2,3],[-4,-6],[-1,-5],[-2,0],[0,6],[-1,4],[-4,6],[-2,4],[1,3],[3,-1],[3,0],[0,2],[2,5],[-1,1],[-2,-2],[-2,1],[0,6],[-2,7],[-1,6],[2,4],[1,5],[1,8],[1,3],[3,2],[1,2],[-4,2],[0,3],[2,1],[1,2],[4,4],[1,5],[-1,2],[-2,1],[0,3],[1,4],[-3,4],[-1,3],[0,18],[-2,13],[-3,-3],[-4,3],[-1,0],[-1,4],[2,6],[3,5],[3,1],[1,2],[3,1],[3,-4],[2,-1],[2,-5],[1,0],[3,5],[-3,2],[-3,11],[-1,2],[2,5],[-4,9],[0,6],[-3,10],[2,3]],[[5556,7634],[1,5],[-2,6],[1,1],[4,0],[0,2],[4,2]],[[5564,7650],[4,2],[-1,4],[5,6],[1,4],[-2,4],[5,5],[1,0],[0,-3],[1,-2],[3,-3],[5,-4],[3,-8],[4,-5],[0,-4],[10,-5],[0,-4],[-4,-10],[0,-2],[-2,-2],[0,-4],[1,-2]],[[5598,7617],[-5,-2],[-2,-2],[0,-3],[-2,-2],[-3,5],[-10,-6],[-1,-4],[0,-8],[-1,-1],[-4,1]],[[6340,6890],[-2,-2],[-2,4],[-2,8],[2,5],[1,5],[2,-2],[3,-9],[0,-5],[-2,-4]],[[6344,6827],[-21,0],[-2,5],[-2,12],[-3,9],[-12,3],[-7,2],[-6,1]],[[6332,6910],[-1,-2],[1,-6],[4,-13],[0,-2],[-5,2],[-4,-7],[-3,-6],[4,-1],[4,1],[2,-2],[1,-4],[0,-4],[2,-14],[2,-4],[3,-8],[1,-4],[0,-4],[1,-5]],[[7920,6010],[2,1],[3,3],[4,6],[0,8],[1,10],[1,5],[-1,7],[-1,5],[0,11],[2,5],[1,4],[1,6],[0,7],[-2,2],[-3,2],[-2,3],[0,7],[1,2],[-2,3],[-5,3],[-3,4],[-1,5],[-2,5],[-4,8],[-2,10],[0,14],[1,11],[1,13],[-2,9],[-2,5],[-7,9],[-2,6],[-4,10],[-4,14],[-3,5],[-1,-1],[-3,1],[-5,4],[-4,2],[-5,0],[-1,-2],[0,-2],[1,-2],[-1,-2],[-2,-1],[-3,-7],[-1,-6],[-1,-3],[-3,0],[-3,-2],[-3,-5],[0,-2],[-2,0],[0,6],[-2,2],[-2,1],[-3,4],[-6,9],[-1,0],[-2,-2],[-2,-5],[-2,-2],[-2,1],[-1,-2],[-1,-5],[-5,-7],[0,-1],[-4,-5],[-3,-6],[-4,-7],[-2,-1],[-1,2],[-3,2],[-1,2],[2,12],[3,14],[1,6],[0,9],[-2,7],[0,4],[3,8],[1,10],[2,10],[0,7],[-2,14],[0,12],[-1,2],[-7,2],[-2,-2],[-1,-2],[-2,-2],[-3,-1],[-3,4],[-3,5],[0,6],[1,8],[2,6],[1,5],[-1,3],[0,3],[-1,0],[-2,3],[-1,6],[-3,2],[-4,-8],[0,5]],[[7780,6354],[0,3],[2,12],[1,8],[5,6],[2,-1],[2,1],[0,3],[-1,2],[0,4],[1,3],[2,1],[1,4],[1,7],[2,4],[1,0],[3,3],[5,6],[1,6]],[[7836,6472],[1,-5],[3,-6],[4,-9],[4,-7],[2,-8],[0,-5],[1,-1],[2,1],[1,7],[1,0],[1,-5],[2,0],[1,-5],[-2,-7],[0,-4],[-1,-6],[0,-4],[7,-21],[3,-3],[7,-4],[4,-5],[3,2],[2,5],[2,3],[6,5],[3,-2],[4,-5],[5,-8],[2,-2],[0,-3],[-3,-4],[-3,-5],[0,-1],[7,-3],[1,-3],[0,-6],[1,-1],[3,1],[2,-3],[1,-5],[0,-4],[-3,-6],[0,-4],[-2,-5],[-4,-8],[-1,0],[-8,4],[-7,0],[0,-2],[1,-5],[0,-5],[-1,-3],[-3,-5],[0,-4],[6,-4],[9,-12],[2,-3],[6,-8],[7,-4],[4,-3],[0,-6],[-1,-4],[0,-3],[2,-6],[3,-6],[2,-3],[3,-2],[2,-4],[2,-6],[0,-4],[1,-4],[2,-6],[7,-17],[1,-2],[8,-11],[1,-4],[3,-8],[2,-3],[1,-5],[0,-13],[2,-3],[1,-3],[0,-3],[1,-2],[2,0],[2,4],[1,0],[1,-7],[1,-3],[4,-4],[4,-8],[2,-3],[2,-1],[1,-2],[0,-5],[-1,-2],[-5,-4],[0,-6],[1,-4],[2,-3],[1,-3],[4,-6],[3,-4],[1,-5],[1,-3],[0,-4],[-2,-4],[-3,-8],[1,-4],[0,-12]],[[5998,7178],[8,0],[1,3],[3,-1],[1,-3],[-1,-3],[-2,-3],[5,-4],[2,-13],[-1,-5],[-2,-4],[-1,0],[-4,-6],[0,-3],[2,-4],[-8,0],[-2,-3],[-2,-7],[3,-4],[0,-2],[-2,-1],[-1,-4],[-2,-2]],[[5974,7089],[3,10],[1,8],[2,6],[5,22],[3,8],[1,13],[4,11],[4,3],[1,3],[0,5]],[[4679,5581],[2,3],[2,8],[3,8],[3,5],[4,8],[4,4],[5,12],[1,1],[1,8],[1,10],[2,3],[3,2],[1,2],[2,7],[0,10]],[[4789,5434],[-3,1],[-9,8],[-7,5],[-25,26],[-6,11],[-8,16],[-17,32],[-4,6],[-5,2],[-6,6],[-1,9],[-13,13],[-6,12]],[[5693,6450],[0,-28],[0,-29],[0,-29],[0,-29],[-14,0],[-14,0],[0,-29]],[[5665,6306],[-13,14],[-14,14],[-13,13],[-13,14],[-13,13],[-14,14],[-13,14],[-13,13],[-14,14],[-13,14],[-13,13],[-14,14],[-13,13],[-13,14],[-14,14],[-13,13],[-9,10],[-10,-9],[-8,-8],[-10,-9]],[[5415,6508],[-12,-12],[-9,-10],[-1,0],[-9,16],[-7,13],[-4,3],[-13,7],[-14,6],[-15,7]],[[5263,6924],[4,4],[4,3],[3,3],[1,2],[3,9],[2,5],[3,6],[1,5],[0,10],[-4,25],[1,4],[3,8],[1,1],[5,2],[2,4],[1,5],[1,2],[6,9],[5,5],[4,5],[5,5],[5,4],[0,7],[-2,6],[0,15],[1,4],[0,11],[1,2]],[[5319,7095],[4,-4],[4,-2],[13,-13],[4,-2],[9,-1],[11,5],[4,1],[10,-7],[5,0],[11,-6],[6,-8],[2,-2],[19,-7],[5,-13],[0,-11],[1,-8],[2,-10],[3,-8],[3,-6],[12,-9],[9,-2],[9,-1],[16,-7],[13,-9],[4,-5],[6,-4],[14,-21],[7,-7],[5,-1],[5,1],[8,7],[4,4],[8,18],[3,10],[1,6],[-2,13],[-2,6],[-2,9],[-1,15],[2,10],[1,7],[3,6],[7,12],[7,9],[12,11],[7,0],[3,1],[6,8],[2,1],[4,-2],[9,0],[5,-2],[5,-5],[6,-3],[5,-3],[4,-4],[1,-10],[0,-6],[5,-7],[14,-3],[3,-2],[6,-7],[10,-1],[6,1],[5,-1],[2,-2],[2,-4],[4,-13]],[[3308,5979],[-2,-6],[-3,4],[0,8],[2,5],[1,4],[1,1],[1,-5],[0,-11]],[[7218,5705],[0,-5],[-2,3],[-1,3],[3,-1]],[[7220,5738],[-2,-1],[-1,4],[0,4],[1,-1],[2,-6]],[[7221,5748],[7,0],[3,-9],[10,-16],[5,-16],[0,-4],[1,-3],[2,-2],[6,-19],[0,-6],[3,-2],[1,-2],[2,-13],[0,-5],[7,-22],[0,-3],[3,-13],[1,-2],[1,-8],[0,-22],[-1,-9],[-2,-8],[-1,-6],[-3,-5],[-7,-10],[-2,-2],[-9,-7],[-7,-6],[-6,-2],[-7,3],[-4,9],[-3,12],[-1,13],[-3,14],[-2,43],[-1,12],[-1,16],[2,-3],[1,2],[0,15],[1,6],[2,16],[0,12],[4,11],[1,7],[0,14],[-1,7],[3,-2],[2,-3],[2,-2],[1,1],[2,0],[-1,4],[-4,4],[-6,2],[-2,3],[0,5],[1,1]],[[5769,3516],[7,4]],[[5776,3520],[3,6],[4,4],[7,5],[4,2],[5,-10],[1,-1],[3,-6],[3,-4],[3,-5],[3,-3],[1,0],[2,-8],[0,-5],[-2,-15],[-3,-5],[-2,-2],[0,-6],[-1,-7],[-3,-5],[-7,-6],[-2,-1],[-4,0],[-3,-1],[-3,-4],[-5,-18],[-2,-6],[-1,-1],[-7,3],[-3,3],[-2,4],[-2,6],[-3,3],[-1,2],[0,7],[-5,13],[-1,6],[-2,5],[-1,5],[1,2],[6,6],[4,9],[1,4],[2,3],[1,6],[4,11]],[[5581,8367],[-2,1]],[[5579,8368],[4,6],[1,5],[1,0],[-2,-8],[-2,-4]],[[5651,8290],[0,8],[-1,4],[-2,3],[-5,5],[-4,1],[-1,3],[-3,2],[-2,0],[-2,-2]],[[5631,8314],[-2,8],[0,4],[4,16],[0,2],[-2,3],[-4,3],[-1,5],[-14,0],[-5,2],[-9,5],[-5,5],[-4,-1]],[[5589,8366],[-1,5],[1,6],[-2,10],[-3,11],[0,15]],[[5584,8413],[7,7],[9,7],[3,1],[8,4],[15,-2],[6,1],[2,1],[3,-1],[2,-4],[4,3],[12,-2],[5,0],[6,-2],[3,-2],[10,1],[6,6],[2,1],[4,0],[1,-4],[3,-8],[15,-4],[2,-1],[6,-7],[6,-5],[5,-9],[7,-4],[2,0]],[[5584,8413],[-1,11],[0,21],[1,11],[8,11],[2,7],[0,6],[1,5],[8,14],[5,2],[8,4],[9,3],[3,-7],[11,-12],[3,-4],[4,-13],[10,-7],[8,2],[9,9],[3,5],[1,4],[-1,19],[-2,8],[1,5]],[[5759,8497],[4,-1],[1,-5],[7,-6],[1,-2],[0,-7],[-2,-2],[-1,-4],[0,-5],[-2,-8],[4,2],[2,-3],[1,-5],[3,-8],[3,-3],[1,-9],[1,-4],[0,-7],[-1,-3]],[[8153,6463],[-2,-1]],[[3249,6224],[-3,0]],[[3246,6224],[1,3],[2,-1],[0,-2]],[[4758,6776],[-4,0],[1,-7],[0,-16],[1,-6],[-1,-2],[-3,-1],[-14,0],[-3,-3],[-5,-8],[-1,-3],[-5,0],[-2,2],[-3,1],[-3,-3],[-2,0],[-8,8],[-3,0],[-3,2],[-4,-1],[-4,-2],[-6,-4],[-3,-1],[0,-5],[2,-3],[0,-4],[-1,-3],[-4,-6],[-2,-7],[-4,-11],[0,-6],[-1,-1],[-4,-1],[-4,-2],[-2,-7],[0,-5],[-2,-11],[-2,-13],[-1,-9],[-2,-16],[-1,-6],[-3,-6],[-2,-2],[-4,-6],[-6,-6],[-4,-7],[-1,-6],[-2,-5],[-1,-7],[-3,-6],[-2,-3],[-2,-1],[-5,-5],[-3,-2],[-4,-6],[-1,-4],[-2,-12],[-1,-4],[-2,-14],[0,-8],[-2,-12],[0,-18],[-1,-4],[0,-4],[-2,-7],[-2,-4],[-2,-2],[-5,-13],[0,-6],[-1,-4],[0,-5],[-5,-8],[-4,-1],[-5,0],[-4,1],[-4,0],[-5,1],[-8,2],[-4,0],[-4,-1],[-11,0],[-10,-3],[-1,-1]],[[4527,6417],[2,28],[4,15],[3,6],[4,4],[5,15],[1,14],[3,6],[1,5],[-1,4],[2,7],[4,12],[1,7],[4,11],[-1,3],[-2,-4],[-1,1],[1,6],[9,13],[11,23],[4,4],[4,10],[1,9],[1,20],[1,11],[3,8],[2,15],[3,7],[1,13],[2,5],[6,10],[6,4],[8,9],[3,5],[2,8],[3,16],[4,16],[2,13],[4,7],[2,8],[5,4],[9,2],[13,6],[12,11],[4,4],[3,8],[6,11],[12,13],[5,7],[8,19],[5,15],[4,9],[3,9],[2,9],[2,14],[-1,5],[-3,9],[-3,2],[0,5],[1,7],[0,13],[1,20],[3,17],[9,21],[2,9],[1,14],[0,5],[12,20],[6,16],[8,11],[21,15],[12,11],[6,8],[4,9],[12,37],[11,52],[0,6],[5,2],[4,1],[3,2],[3,4],[3,-2],[-1,-2],[0,-7],[2,-7],[4,-9],[8,-11],[5,-4],[9,-2],[9,4],[6,0],[2,2],[3,-3],[6,-1],[5,2],[4,5],[2,5],[1,-3],[0,-3],[1,-1],[1,-7],[1,-2],[3,0],[3,-1],[6,0],[5,-1]],[[5206,7703],[-2,-1]],[[5738,7963],[1,2],[6,5],[1,-1],[9,0],[3,4],[2,-1],[4,4],[1,-1],[4,-1],[3,-2],[4,-5],[2,0],[1,-4],[2,-1],[4,0],[2,-5],[3,-4],[1,4],[2,-1],[5,-1],[4,-10],[2,-1],[2,1],[1,2],[1,-1],[2,-5],[0,-13],[-2,-7],[1,-4],[5,-5],[1,-3],[2,-2],[2,0],[1,-2],[0,-4],[-1,-5],[1,-3],[0,-5],[4,-4],[5,-3],[2,-6],[-1,-6],[0,-5],[6,-7],[-2,-2],[-5,-1],[-1,-1],[-4,6],[-2,-3],[-2,0],[-3,3],[-3,-1],[-2,-3],[-2,0],[0,8],[-1,0],[-6,-4],[-1,-2],[1,-3],[0,-5],[2,-6],[-2,-7],[-3,-4],[-3,-3],[0,-5],[-2,-3],[-3,-3],[-2,-4],[1,-3],[0,-6],[-1,-1],[-5,0],[-2,-3]],[[5783,7801],[-4,9],[2,2],[0,4],[-1,5],[0,5],[-1,5],[1,10],[3,18],[0,11],[-2,8],[-2,11],[-8,11],[-1,4],[-4,6],[-4,11],[-4,6],[-5,19],[-2,5],[-2,3],[-1,3],[-2,3],[-3,3],[-5,0]],[[6386,4210],[-2,-2],[3,13],[1,1],[-2,-12]],[[6342,4414],[0,-3],[-4,1],[0,8],[1,0],[1,3],[1,0],[1,-6],[0,-3]],[[6375,4467],[1,-6],[2,-6],[4,-14],[2,-5],[2,-6],[1,-11],[3,-18],[3,-26],[0,-28],[1,-12],[2,-12],[4,-12],[1,-14],[-2,-14],[-3,-13],[-2,-6],[-1,0],[-3,4],[-2,5],[-3,20],[-1,1],[-3,-1],[-3,-4],[0,-2],[1,-8],[0,-6],[1,-7],[0,-9],[2,-4],[1,-6],[0,-20],[-3,-6],[0,-3],[1,-3],[0,-2],[-3,-3],[-1,-2],[-2,-6],[-3,-12],[0,-6],[2,-18],[-1,-14],[-3,-25],[-2,-12],[-2,-14],[-4,-19],[-4,-24],[-4,-24],[-2,-15],[-3,-14],[-4,-26],[-3,-25],[-5,-29],[-7,-32],[0,-4],[-2,-16],[-1,-14],[-2,-14],[-4,-23],[0,-7],[-1,-7],[-4,-14],[-2,-11],[-2,-15],[-3,-12],[-4,-11],[-2,-4],[-6,-6],[-3,-1],[-7,-1],[-6,-3],[-7,-6],[-8,-11],[-3,-2],[-8,-1],[-3,2],[-8,12],[-4,2],[-6,2],[-3,2],[-3,7],[-5,5],[-2,5],[0,4],[-1,5],[-1,8],[-2,6],[-5,10],[0,22],[-1,14],[2,12],[0,6],[-2,7],[-2,13],[-5,11],[-2,11],[-1,18],[-1,6],[1,13],[0,7],[2,5],[0,3],[2,6],[0,2],[2,17],[3,4],[3,2],[3,4],[3,18],[4,13],[1,6],[4,9],[3,14],[1,6],[0,7],[1,14],[1,7],[0,7],[-6,21],[0,19],[-4,14],[-2,12],[-1,20],[0,14],[-1,7],[1,11],[12,39],[0,27],[3,2],[10,2],[2,1],[2,3],[5,9],[1,-1],[1,-3],[1,-1],[4,3],[2,0],[1,-1],[2,6],[0,3],[1,1],[9,2],[4,3],[1,-1],[3,-9],[1,-1],[2,0],[1,2],[-3,4],[0,6],[1,7],[3,5],[5,7],[6,9],[2,1],[1,-2],[1,-10],[0,-2],[2,1],[1,4],[0,4],[-1,3],[0,6],[3,6],[2,6],[1,7],[1,3],[3,3],[1,-3],[0,-6],[-2,-7],[2,-1],[1,1],[4,14],[1,4],[2,2],[3,0],[-2,6],[-1,10],[5,17],[0,4],[1,2],[-3,6],[0,7],[2,4],[1,3],[1,1],[2,-1],[2,-5],[2,-1],[3,5],[1,6],[3,4],[3,2],[5,9],[4,25],[-2,13],[-2,8],[1,2],[2,-1],[1,1],[3,7],[5,14],[3,-3],[0,-4],[4,-9],[2,-5]],[[7038,5369],[-1,1],[0,2],[1,1],[1,-1],[0,-2],[-1,-1]],[[7041,5423],[-1,0],[0,3],[1,1],[0,-4]],[[2452,6259],[-3,-1],[0,1],[3,0]],[[1918,6263],[-1,-1],[-3,3],[2,5],[2,-4],[0,-3]],[[2584,6353],[-1,-2],[-1,6],[1,6],[2,4],[2,0],[2,2],[-1,-7],[-4,-9]],[[2041,6428],[-1,-5],[-2,2],[-1,3],[0,5],[1,1],[2,-2],[1,-4]],[[1897,6588],[-1,-2],[-8,10],[4,1],[5,-9]],[[1928,6623],[1,-6],[-2,1],[-2,3],[-1,7],[3,-2],[1,-3]],[[1887,6597],[-1,-1],[-2,7],[-1,5],[-1,2],[-2,1],[2,9],[2,20],[1,-4],[-2,-19],[0,-3],[2,-6],[0,-5],[2,-6]],[[1913,6682],[1,-2],[-1,-1],[-2,4],[2,2],[0,-3]],[[1800,6800],[0,-2],[-5,4],[3,7],[-1,7],[1,1],[1,-2],[2,-9],[-1,-6]],[[1715,6850],[-1,-2],[-4,12],[0,3],[3,1],[0,-3],[2,-5],[0,-6]],[[1883,6854],[-3,-14],[-2,1],[-4,4],[-1,3],[2,15],[1,2],[4,2],[1,-1],[0,-5],[2,-7]],[[1856,6857],[-3,2],[-9,18],[0,10],[2,-1],[3,-4],[1,-4],[0,-5],[5,-2],[0,-10],[1,-4]],[[1813,7009],[-1,0],[-1,3],[0,3],[3,-4],[-1,-2]],[[2437,6021],[-1,1],[-7,16],[-8,17],[-3,6],[-3,4],[-4,8],[-10,17],[-5,8],[-6,10],[-4,5],[-5,4],[-1,2],[-2,2],[-1,0],[-2,-5],[-5,0],[-1,2],[3,5],[-1,2],[-1,0],[-4,-4],[0,5],[-2,3],[-1,0],[-3,-6],[0,-2],[5,-2],[1,-2],[-4,0],[-5,-2],[-10,-12],[-8,-5],[-12,-11],[-6,0],[-3,-2],[-8,4],[-10,11],[-16,3],[-11,14],[-10,5],[-7,14],[-4,0],[-3,2],[-9,5],[-10,3],[-9,12],[-6,4],[-5,4],[-12,8],[-4,4],[-4,7],[-7,7],[-3,6],[-3,2],[-4,11],[-3,5],[-2,2],[-8,0],[-9,4],[-4,2],[-9,7],[-12,8],[-4,9],[-3,9],[-6,11],[-4,5],[-6,5],[-4,5],[-5,3],[-10,9],[-3,8],[-1,7],[-5,8],[-6,16],[-1,6],[-1,8],[-1,5],[-2,4],[1,3],[3,4],[4,1],[3,4],[1,5],[-2,5],[-5,1],[-1,2],[2,2],[4,10],[2,6],[0,15],[1,6],[-6,7],[-3,12],[-3,10],[0,19],[-4,18],[-7,11],[-6,14],[-4,7],[-5,15],[-4,9],[-6,16],[-4,8],[-19,26],[1,0],[5,-7],[1,1],[0,7],[-1,1],[-2,-1],[-3,2],[-3,1],[-3,4],[-2,5],[0,5],[-5,11],[1,2],[3,1],[-1,4],[-8,5],[-3,5],[-6,6],[-2,3],[-1,6],[-1,1],[-5,-4],[-1,4],[2,2],[3,6],[0,3],[-4,-6],[-5,-3],[-2,1],[-3,7],[-1,18],[4,12],[2,3],[-1,6],[0,3],[-1,5],[-6,10],[-7,-1],[-2,4],[-2,7],[-1,5],[0,3],[-1,3],[-9,5],[-3,4],[-3,5],[-2,7],[-1,6],[0,6],[1,8],[1,4],[-6,3],[-3,0],[-2,-1],[-5,4],[-5,9],[-5,15],[-6,5],[-2,6],[-2,4],[-3,9],[0,1],[-3,5],[-3,7],[-1,5],[-1,9],[-4,5],[-1,4],[0,7],[-5,10],[-2,9],[-2,6],[-1,8],[-2,11],[-3,12],[-3,8],[-2,8],[1,8],[0,7],[1,2],[0,5],[-1,2],[-3,1],[-1,2],[-7,2],[-4,3],[0,7],[-2,3],[-7,6],[-1,-2],[0,-4],[-4,-1],[-4,3],[-8,10],[-1,2],[-3,1],[-6,7],[2,-6],[2,-9],[-2,-6],[-1,-22],[1,-5],[3,-7],[1,-11],[2,-15],[0,-20],[2,-7],[4,-8],[1,-4],[6,-5],[3,-7],[6,-10],[2,-4],[6,-15],[0,-5],[2,-6],[3,2],[1,-7],[4,-2],[3,-16],[1,-3],[3,-1],[2,-2],[0,-7],[2,-5],[0,-7],[1,-5],[0,-6],[1,-4],[5,-10],[6,-7],[1,-11],[3,-9],[5,-6],[0,-6],[3,-8],[1,-9],[3,-6],[2,0],[-3,6],[-1,4],[0,7],[1,1],[6,-10],[1,-8],[2,-4],[0,-6],[4,-16],[0,-11],[1,-8],[4,-13],[3,-2],[1,-7],[3,-15],[4,-9],[2,-7],[0,-5],[-1,-7],[-1,-4],[2,-15],[4,-7],[4,-3],[-1,-2],[2,-2],[2,6],[-1,4],[0,4],[1,1],[7,-10],[1,-4],[3,-4],[3,-10],[2,-4],[1,-8],[4,-4],[3,-6],[0,-5],[-1,-11],[-1,-3],[-4,-4],[-3,-6],[-2,-3],[-3,-3],[-2,1],[-3,6],[-2,20],[-2,4],[-1,6],[-2,5],[-8,8],[-3,8],[-4,5],[-4,8],[-11,13],[-4,6],[-3,7],[-3,-1],[-1,2],[0,3],[-7,12],[-1,5],[0,7],[1,16],[1,9],[-2,9],[0,7],[-2,9],[-5,17],[-4,4],[-4,2],[-10,15],[-3,8],[-2,8],[-2,-4],[-4,1],[-5,-5],[-3,4],[-4,11],[-4,1],[-3,7],[-3,2],[-4,1],[-3,3],[-1,4],[0,5],[-1,3],[-9,13],[-4,5],[-1,3],[0,3],[6,-1],[7,-2],[3,0],[4,5],[1,-2],[-1,-4],[2,-3],[3,-3],[0,3],[-1,6],[0,5],[-3,1],[3,5],[2,12],[1,12],[-2,10],[-5,7],[-10,21],[-6,11],[-1,4],[-2,2],[-5,2],[-4,6],[-10,13],[-2,11],[-2,1],[1,7],[-1,13],[-1,3],[-4,3],[-1,9],[0,8],[-1,6],[-6,9],[0,5],[-1,4],[0,5],[-4,9],[-4,8],[-1,3],[0,10],[1,2],[0,5],[-6,8],[-2,12],[-4,6],[0,2],[-2,11]],[[1746,7057],[8,1],[8,2],[24,3],[7,2],[16,2],[4,1],[-2,-9],[-2,-3],[14,-9],[13,-8],[13,-9],[13,-8],[13,-9],[13,-8],[14,-9],[13,-8],[10,0],[19,0],[20,0],[10,0],[19,0],[0,26],[19,0],[6,-1],[25,0],[5,-13],[3,-5],[3,-3],[6,-9],[8,-15],[7,-10],[5,-5],[5,-8],[2,-8],[4,-18],[0,-8],[2,-8],[3,-10],[3,-6],[3,-2],[5,-9],[4,-4],[9,-6],[6,-8],[5,-4],[3,0],[2,2],[2,5],[1,4],[2,1],[1,3],[0,3],[1,7],[3,12],[3,6],[4,1],[2,2],[1,3],[2,1],[3,-3],[5,-2],[11,0],[2,1],[1,-2],[3,-2],[2,-6],[8,-10],[0,-3],[8,-13],[2,-6],[1,-6],[2,-9],[6,-18],[0,-4],[1,-6],[2,-5],[3,-4],[3,-7],[7,-19],[5,-5],[2,-5],[1,-5],[0,-4],[-1,-3],[0,-3],[2,-3],[0,-11],[4,-9],[2,-7],[1,-12],[2,-6],[3,-3],[4,-1],[3,-3],[4,-5],[4,-1],[3,-3],[2,-4],[6,-2],[8,-2],[6,-3],[6,-7],[0,3],[6,3]],[[2301,6679],[-2,-22],[-6,-20],[-2,-13],[-5,-36],[-1,-23],[0,-12],[-1,-1],[1,-2],[-1,-24],[0,-25],[-2,-6],[-1,-9],[0,-6],[2,-13],[1,-10],[5,-18],[2,-6],[4,-5],[1,-3],[-1,-7],[-1,-4],[-1,6],[1,3],[0,3],[-2,2],[-4,9],[-1,-9],[2,-6],[2,-2],[0,-4],[4,-17],[4,-18],[2,-10],[12,-25],[7,-18],[2,-18],[2,-5],[1,-8],[4,-8],[2,-5],[2,-3],[2,-9],[0,-5],[3,-3],[2,0],[1,1],[4,-4],[10,-1],[5,-7],[6,-3],[3,-10],[4,-10],[4,0],[6,1],[9,7],[3,3],[6,4],[9,1],[2,-2],[7,3],[3,3],[2,5],[6,3],[1,1],[7,1],[3,1],[3,0],[3,-4],[0,-2],[-2,-2],[1,-2],[3,-4],[6,-1],[2,0],[2,5],[5,5],[0,6],[-1,3],[-2,1],[1,6],[-3,-4],[0,3],[9,9],[2,3],[3,3],[6,12],[1,22],[1,4],[4,6],[1,2],[0,35],[1,9],[0,3],[2,14],[5,7],[8,7],[2,2],[26,8],[4,2],[5,5],[3,2],[8,0],[0,2],[5,0],[8,-4],[6,-4],[8,-1],[1,3],[-1,2],[-3,-1],[-2,3],[5,0],[2,3],[3,-2],[3,-7],[2,-3],[1,-13],[1,-2],[-1,-9],[-2,-7],[-1,-5],[-4,-9],[-5,-8],[-5,-15],[-1,-8],[0,-6],[1,-6],[-1,-2],[0,-2],[-2,0],[-2,-2],[-3,-9],[0,-2],[2,-2],[1,1],[5,0],[0,-4],[-2,-4],[-2,-1],[-2,-2],[-1,-2],[0,-5],[1,-1],[2,4],[1,0],[1,-2],[-3,-14],[-2,-14],[-2,-8],[-1,-12],[-2,-10],[-1,0],[-2,9],[-3,5],[1,12],[0,6],[-1,0],[-4,-6],[0,-5],[-2,-7],[0,-3]],[[9711,5519],[-1,2],[1,5],[1,-1],[-1,-6]],[[9751,5594],[4,-3],[4,2],[0,-1],[-3,-2],[-1,0],[-4,3],[0,1]],[[5598,7617],[1,-1],[4,2],[4,3],[4,-1],[7,3],[2,-2]],[[4683,5898],[0,4],[-2,3],[0,6],[1,8],[0,3],[1,7],[-2,3],[0,2],[-3,8],[0,4],[-2,7],[-1,1],[-3,1],[0,-2],[-2,-3],[-1,3],[0,5],[-2,4],[-3,7],[0,5],[2,3],[1,3],[0,2],[-1,4],[-1,2],[0,14],[-2,6],[-2,3],[-2,5],[1,7],[1,4],[-3,9]],[[4658,6036],[5,-3],[0,1],[2,2],[2,5],[2,6],[1,8],[0,6],[2,11],[5,8],[3,4],[1,-1],[2,-5],[6,-10],[6,-12],[1,0],[3,7],[2,7],[1,2],[3,0],[3,1],[2,-1],[4,-1],[4,-2],[5,0],[5,1],[5,2],[4,2],[0,9],[1,3],[1,0],[1,-8],[1,-2],[20,0],[17,0],[17,0],[17,0],[22,0],[12,0],[1,17],[2,15],[1,13],[-4,9],[-3,8],[-1,13],[-2,29],[0,14],[-1,15],[-2,28],[-1,15],[0,14],[-2,29],[-2,28],[0,15],[-2,28],[-2,29],[0,14],[-1,15],[-2,28],[-1,15],[0,14],[-3,43],[0,14],[-1,15],[-2,28],[-1,15],[0,14],[-1,13],[17,0],[22,0],[10,0]],[[5116,6286],[0,-42],[1,-16],[0,-18],[0,-48],[-1,-2],[-1,-9],[0,-13],[-2,-13],[-4,-18],[0,-5],[-2,-6],[0,-5],[-2,-5],[-3,-2],[-5,-9],[-1,-7],[-12,4],[-1,-1],[-1,-4],[-8,-1],[-8,0],[-9,-1],[-6,0],[-16,-2],[-5,-8],[-4,-8],[-1,-1],[-6,-1],[-8,1],[-4,0],[-2,-1],[0,-3]],[[5404,7248],[-1,-2],[-3,1],[-2,2],[0,7],[5,-6],[1,-2]],[[7726,5755],[-1,-3],[-1,0],[1,6],[2,4],[2,0],[0,-2],[-3,-5]],[[7727,5814],[2,-10],[-1,-2],[-1,6],[-2,3],[0,4],[1,1],[1,-2]],[[7736,5815],[-2,1],[2,6],[0,-7]],[[7727,5844],[-1,0],[1,6],[1,4],[1,-3],[-2,-7]],[[7736,5860],[0,-12],[-2,2],[-1,0],[-1,6],[0,2],[-1,4],[4,1],[1,-3]],[[7735,5869],[-1,0],[0,10],[2,-4],[2,-3],[-1,-2],[-2,-1]],[[7725,5883],[-2,1],[-1,4],[1,3],[2,-1],[-1,-3],[0,-2],[1,-2]],[[7723,5897],[0,-2],[-2,-4],[-2,3],[2,3],[2,0]],[[7732,5909],[1,-2],[1,0],[0,-5],[-2,-7],[-2,-1],[0,10],[-1,6],[1,4],[2,-2],[0,-3]],[[7730,5938],[0,-10],[-2,5],[0,10],[2,-5]],[[7623,6102],[-2,-6],[0,9],[3,4],[1,5],[2,3],[0,-4],[-1,-7],[-3,-4]],[[7709,6119],[-1,0],[-1,3],[-1,9],[2,2],[1,0],[1,-2],[0,-3],[-1,-9]],[[7601,6259],[-3,5],[-2,6],[3,1],[4,-1],[0,-3],[-1,-6],[-1,-2]],[[7602,6310],[3,-5],[1,0],[2,-3],[0,-3],[-1,-2],[-2,-2],[-2,1],[-1,6],[-2,2],[0,2],[1,3],[1,1]],[[7596,6329],[0,-8],[-2,3],[0,8],[2,-3]],[[7582,6331],[-1,-3],[-1,7],[1,3],[1,-7]],[[7780,6354],[-5,5],[-2,1],[-1,-3],[-3,-3],[-3,0],[-5,2],[1,-6],[1,-4],[-2,-4],[-1,-1],[-3,-1],[-3,2],[-2,0],[-3,-4],[-1,-11],[0,-3],[-2,-2],[-2,1],[-9,-5],[-4,-1],[-3,0],[-4,5],[-2,0],[-1,-1],[0,-6],[-2,-3],[-3,-8],[-1,-11],[1,-8],[-3,-8],[0,-3],[1,-18],[0,-2],[-2,-2],[-3,-1],[-2,-2],[-3,1],[0,-1],[2,-8],[2,-4],[2,1],[1,-1],[-1,-2],[1,-5],[2,-8],[1,-6],[-1,-6],[0,-3],[2,-5],[8,-18],[5,-13],[5,-10],[1,-5],[0,-9],[1,-5],[2,-4],[0,-3],[2,-11],[1,-2],[4,7],[1,-1],[1,-3],[0,-3],[-2,-7],[-7,-7],[0,-7],[-1,-9],[0,-12],[1,-9],[-1,-4],[-2,1],[-4,-5],[-1,0],[-2,-2],[-1,-2],[0,-3],[2,-19],[2,-7],[2,-6],[3,-7],[2,-7],[4,-7],[6,-10],[2,-6],[2,-8],[2,-6],[0,-12],[1,-16],[-2,-7],[0,-4],[2,-4],[0,-5],[1,-8],[2,-5],[2,-3],[1,-3],[0,-9],[1,-5],[1,-7],[1,-5],[3,-18],[0,-2],[-1,-4],[-3,-4],[-1,-3],[-2,-10],[-5,-16],[-5,-11],[-3,-7],[-3,-5],[-1,-3],[0,-18],[-2,-9]],[[7740,5770],[-1,0],[-2,-9],[-2,4],[0,15],[-1,18],[1,3],[1,1],[4,14],[0,9],[2,6],[-1,5],[0,6],[1,5],[0,4],[1,4],[2,3],[-1,1],[-1,3],[-3,-4],[-1,1],[-1,4],[1,4],[0,2],[1,3],[0,5],[-1,5],[1,5],[-2,0],[0,5],[2,3],[-2,5],[1,6],[0,17],[-2,8],[0,10],[-3,8],[-1,11],[-5,14],[0,12],[-1,3],[-2,-20],[-1,4],[0,11],[-1,5],[1,10],[-3,10],[-1,7],[-2,11],[1,3],[0,4],[-2,-2],[-1,7],[-1,19],[-1,7],[1,7],[-2,26],[-4,8],[2,13],[0,12],[1,4],[0,2],[-5,-2],[-3,0],[-2,9],[-3,12],[-1,10],[1,2],[-3,4],[-4,9],[-1,-1],[-2,-6],[2,-10],[-2,-6],[-1,-8],[-1,-4],[-4,-9],[-4,-3],[-2,0],[-4,5],[0,4],[-1,6],[-1,0],[1,-8],[0,-3],[2,-8],[0,-2],[-7,-4],[-1,-3],[0,-2],[-7,-4],[-2,-6],[-1,-5],[-3,-8],[-5,-7],[-1,0],[-1,2],[0,7],[2,6],[-1,3],[-4,-12],[-3,1],[-4,-2],[-1,10],[0,3],[-1,3],[-2,-7],[-4,-4],[0,10],[1,4],[0,6],[1,9],[-1,1],[-1,-6],[-2,-1],[-4,-12],[-4,-5],[-2,1],[0,6],[1,23],[2,3],[1,4],[1,13],[1,5],[1,10],[1,2],[2,8],[0,15],[-2,15],[-2,22],[-5,17],[0,6],[-2,7],[2,1],[-5,6],[0,3],[-1,14],[0,8],[-1,-1],[0,-5],[-2,-2],[1,-9],[0,-2],[-1,-3],[-4,3],[-2,4],[-6,20],[1,2],[1,0],[4,-8],[3,-2],[2,2],[2,4],[1,6],[-1,2],[-2,2],[-2,1],[-2,5],[0,5],[-4,4],[1,5],[2,3],[-4,0],[-6,9],[-3,0],[-3,-1],[2,-9],[-1,-2],[-1,0],[-4,13],[1,3],[-1,3],[1,9],[-4,-11],[-2,1],[-1,2],[2,5],[1,1],[-1,6],[-2,3],[-1,6],[-1,0],[1,-7],[-1,-9],[-3,10],[-6,15],[-2,4]],[[5536,7595],[-4,4],[-2,7],[-6,11],[-8,8],[1,3],[-4,-1]],[[5532,7691],[0,-3],[1,-2],[5,-6],[4,-8],[6,-6],[3,0],[2,-1],[6,-7],[5,-4],[0,-4]],[[7438,8015],[3,0],[2,1],[3,4],[1,3],[0,5],[2,4],[4,1],[5,0],[3,1],[1,-2],[4,-1],[1,2],[0,3],[1,1],[2,-4],[4,1],[2,2],[2,6],[1,-1],[3,0],[2,3],[5,3],[1,2],[-1,4],[0,5],[3,2],[6,2],[1,5],[1,2],[5,1],[8,6],[4,0],[2,2],[1,3],[2,1],[6,6],[5,1],[2,1],[3,0],[1,3],[2,3],[2,0],[1,3],[2,3],[3,1],[8,0],[3,1],[2,4],[0,2],[2,3],[2,-4],[6,-6],[3,1],[1,4],[2,1],[2,-1],[2,-7],[3,-3],[3,0],[2,1],[3,-1],[3,0],[8,-2],[8,0],[5,-1],[1,-2],[1,-6],[0,-6],[1,-5],[1,-2],[2,-1],[3,-5],[1,-3],[3,1],[6,0],[2,-2],[1,-3],[2,-2],[1,1],[6,0],[2,-2],[2,0],[1,2],[4,1],[3,3],[3,-1],[1,-2],[2,2],[6,-2],[2,-3],[2,-1],[3,2],[1,-2],[2,-1],[3,2],[8,-2],[3,-4],[1,-3],[2,-1],[4,0],[5,6],[2,4],[3,2],[4,0],[2,3],[2,1],[3,4],[0,1],[3,7],[2,12],[0,6],[-4,2],[-3,4],[-2,8],[0,4],[-4,8],[0,4],[3,9],[0,8],[2,2],[1,4],[2,2],[3,1],[2,7],[0,3],[2,2],[8,5],[3,6],[4,12],[2,-1],[2,-4],[1,0],[9,-6],[9,-3],[5,-7],[3,-1],[13,0],[6,-4],[11,-6],[3,-3],[5,-3],[5,1],[7,-3],[8,-4],[1,-2],[0,-12],[2,-8],[0,-8],[3,-6],[-1,-3],[0,-5],[1,-2],[4,-2],[2,-3],[6,-6],[3,-2],[8,-2],[4,-5],[4,-1],[5,-3],[5,2],[4,-1],[4,0],[3,1],[4,6],[4,2],[3,0],[3,2],[11,3],[5,4],[3,1],[9,-4],[5,0],[5,-5],[4,-1],[4,1],[6,0],[4,-1],[4,-3],[2,-3],[3,-7],[5,-5],[4,-1],[7,0],[8,-2],[1,-1],[0,-14],[2,-2],[2,-5],[4,-2],[5,-8],[3,-3],[3,-1],[3,1],[14,0],[6,-2],[2,-2],[19,-6],[3,3],[3,0],[6,-4],[5,1],[11,8],[3,3],[3,-1],[8,4],[3,0],[3,1],[4,0],[8,5],[4,1],[5,-1],[3,1],[7,5],[1,5],[2,6],[12,12],[4,3],[4,2],[5,6],[7,4],[2,-1],[5,-1],[5,0],[4,-3],[3,-3],[8,-11],[4,-3],[4,0],[4,-1],[2,2],[4,2],[6,4],[2,0],[9,-5],[4,-6]],[[9034,5999],[-2,-3],[-1,1],[0,2],[2,2],[1,-2]],[[9045,6046],[-1,-3],[-1,4],[0,2],[1,2],[1,-5]],[[9047,6055],[0,-2],[-2,1],[1,6],[2,0],[0,-3],[-1,-2]],[[9046,6124],[-2,1],[0,2],[2,0],[0,-3]],[[9048,6225],[0,4],[1,1],[1,-2],[-2,-3]],[[9046,6264],[-1,-2],[-1,1],[0,4],[2,-1],[0,-2]],[[5891,3637],[0,19],[-2,10],[0,7],[1,6],[-1,6],[-3,3]],[[5886,3688],[0,11],[1,8],[0,32],[0,40],[-2,8],[-1,12],[-2,8],[-3,9],[0,4],[-2,7],[-2,4],[0,11],[-2,16],[-1,11],[-2,12],[-2,8],[0,4]],[[5868,3893],[4,6],[9,18],[4,9],[3,8],[11,22],[1,1],[-2,9],[3,11],[0,16],[2,3],[3,6],[3,9],[3,8],[3,13],[1,3],[0,4],[-1,4],[-4,14],[-2,10],[2,8],[0,11],[-3,3],[-1,3],[0,5],[1,2],[4,4],[0,2],[1,2],[0,3],[2,16],[0,9],[-1,7],[0,18],[1,19],[0,11],[-3,12],[0,9],[2,6],[0,4],[-1,0],[-5,2],[-3,5],[-10,8],[-9,1],[-7,12],[-5,2],[-2,2],[-5,7],[-17,2],[-6,0],[-1,11],[0,9]],[[5843,4282],[0,8],[-1,9],[-1,4],[-2,6],[-1,6],[0,4],[7,6],[2,2],[4,3],[7,4],[6,3],[5,3],[6,4],[2,2],[10,7],[2,2],[6,3],[8,6],[18,12]],[[5921,4376],[1,-2],[4,-14],[4,-8],[3,-8],[2,2],[2,1],[6,2],[2,0],[1,2],[3,2],[4,0],[1,-1],[3,-10],[1,-7],[1,-11],[0,-13],[-1,-9],[-3,-10],[0,-5],[-2,-8],[-2,-4],[-1,-3],[0,-4],[1,-3],[3,-5],[1,-3],[-1,-3],[0,-4],[2,-4],[2,-3],[2,-6],[4,-8],[5,-11],[4,-4],[1,-4],[0,-4],[-2,-3],[2,-5],[1,-1],[4,0],[0,18],[-1,10],[-2,4],[0,4],[2,7],[1,7],[1,4],[1,1],[7,2],[3,2],[1,2],[1,6],[1,16],[0,15],[-1,9],[1,13],[2,9],[-1,1],[0,11],[-5,12],[-8,24],[-4,9],[-6,14],[-3,6],[-2,2],[-5,1],[-2,3],[-1,5],[0,8],[-1,6],[0,11],[-1,15],[-1,4],[-1,11],[-2,11],[0,3],[1,2],[2,8],[3,9],[1,8],[1,4],[1,2],[4,1],[4,-1]],[[5970,4516],[6,1],[8,-1],[1,-1],[2,0],[2,1],[2,3],[2,5],[3,0],[5,-5],[3,-4],[0,-4],[3,-2],[6,-1],[5,2],[2,5],[3,2],[3,0],[2,-1],[2,-4],[3,-2],[4,-1],[5,2],[5,5],[3,6],[0,6],[2,5],[3,0],[4,1],[4,-2],[5,-6],[3,4],[6,7],[5,3],[5,0],[4,3],[3,5],[4,3],[4,1],[8,8],[10,16],[3,5]],[[6123,4581],[1,-6],[3,-6],[-2,-3],[-1,-3],[3,-4],[-3,-5],[0,-4],[1,-2],[0,-2],[-1,-7],[-3,-8],[2,-7],[-1,-12],[2,-11],[0,-5],[1,-4],[-1,-7],[0,-11],[1,-5],[-1,-5],[1,-2],[1,-6],[0,-8],[-1,-3],[-3,-5],[0,-5],[4,0],[0,-13],[-1,-4],[1,-5],[-1,-5],[1,-4],[0,-18],[1,-16],[0,-3],[1,-2],[2,0],[0,-5],[-2,-6],[0,-8],[2,7],[2,0],[1,-3],[0,-19],[-1,-3],[-3,-5],[0,-7],[-2,-3],[1,-5],[0,-4],[-2,-12],[-7,-17],[-6,-12],[0,-5],[-3,-9],[-4,-2],[-2,-2],[2,-8],[-3,-2],[-3,-7],[-11,-12],[-2,-3],[-2,-7],[-4,-2],[-2,-2],[-4,-1],[-2,0],[-8,-7],[-7,-4],[-2,-4],[-6,-5],[-17,-19],[-6,-12],[-2,-3],[-1,-5],[0,-3],[-4,-10],[-6,-12],[-1,-4],[-3,-6],[0,-5],[-2,-1],[-2,4],[-1,-8],[-1,-1],[-2,2],[-4,-4],[-9,-15],[-8,-19],[-11,-18],[-3,0],[-4,6],[0,-3],[1,-3],[0,-16],[-1,-18],[0,-4],[2,-5],[3,-6],[3,-8],[3,-23],[1,-11],[4,-15],[0,-6],[1,-16],[0,-21],[2,-3],[0,8],[1,8],[1,3],[1,0],[0,-4],[1,-3],[0,-8],[-1,-16],[0,-6],[2,-11],[-2,-13],[-3,-30],[-1,-5],[1,-3],[2,0],[1,3],[1,0],[-1,-16],[-7,-21],[-3,-6],[-4,-7],[-11,-9],[-21,-15],[-14,-11],[-11,-13],[-4,-9],[-2,-10],[-4,-10],[3,-9],[4,-7],[2,8],[0,3],[1,0],[0,-10],[-2,-34]],[[5912,3637],[-3,0],[-5,-1],[-6,0],[-5,2],[-2,-1]],[[5961,4491],[0,2],[-1,1],[-2,-3],[1,-3],[2,0],[0,3]],[[5963,4486],[1,1],[0,4],[-2,1],[0,-7],[1,1]],[[4544,6318],[-2,-3],[-1,4],[3,8],[1,1],[-1,-10]],[[4658,6036],[-4,5],[-1,5],[-2,4],[-4,2],[-2,3],[-2,5],[-1,1],[0,6],[-2,6],[-2,3],[-1,0],[-2,2],[0,2],[-1,2],[-2,1],[-1,5],[-1,8],[-2,7],[-1,5],[-2,2],[-1,0],[0,3],[-2,0],[-1,-1],[-2,0],[-1,3],[-1,0],[-2,-2],[-1,0],[-2,4],[-1,3],[0,3],[-3,6],[-6,9],[-7,5],[-7,-1],[-4,1],[-1,1],[-1,-2],[-2,1],[-1,-1],[0,-2],[-2,-2],[-5,0],[-4,-1],[-3,-3],[-4,-1],[-5,0],[-3,1],[-2,2],[-3,-1],[-2,-4],[-1,-8],[-2,-5],[-1,-1],[-1,-7],[0,-10],[-1,-4]],[[4540,6096],[0,25],[2,19],[3,18],[4,16],[3,20],[2,20],[-1,19],[-1,17],[-2,11],[-1,17],[-3,9],[-5,7],[-1,5],[1,1],[3,1],[2,6],[-4,-2],[5,18],[1,12],[0,8],[1,5],[-4,11],[-2,14],[-3,3],[0,-3],[-1,-3],[-2,2],[-3,10],[-4,16],[-1,1],[-2,-4],[-2,-13]],[[4525,6382],[0,5],[2,14],[1,11],[22,0],[20,0],[19,0],[12,0],[13,0],[23,0],[0,30],[-1,8],[0,23],[-1,6],[0,4],[-1,7],[-1,4],[4,14],[4,5],[4,6],[3,5],[2,1],[5,1],[4,4],[6,5],[0,37],[0,31],[0,24],[0,23],[0,31],[10,0],[15,0],[16,0],[10,0],[16,0],[10,0],[16,0],[0,29],[0,45]],[[3273,6148],[0,-4],[-2,1],[0,3],[1,3],[1,-3]],[[6600,4003],[-3,-1],[-4,0],[-2,3],[1,3],[0,4],[1,6],[1,3],[2,2],[0,5],[2,3],[2,1],[3,-6],[1,-7],[0,-7],[-2,-2],[0,-4],[-2,-3]],[[5921,4376],[-1,4],[-2,-1],[-1,-3],[-2,0],[0,2],[-3,9],[-2,2],[-1,2],[1,1],[0,3],[-1,2],[-3,2],[0,2],[3,2],[2,5],[2,6],[1,6],[1,2],[0,13],[1,5],[-1,2],[-1,4],[1,6],[1,4],[6,4],[5,4],[1,2],[2,6],[-1,1],[-3,0],[-1,1],[-2,12],[1,13],[0,16],[-1,1],[-1,3],[0,7],[1,0],[2,9],[1,6],[-1,4],[-2,11],[2,5],[2,0],[1,1],[6,11],[0,2],[-1,4],[-2,6],[0,2],[-1,7],[-3,6],[-3,5],[1,5],[0,5],[-2,6],[-2,5],[0,3],[-1,1],[-2,0],[0,-2],[-3,1],[0,6],[-2,5],[0,1]],[[5913,4641],[2,1],[4,-6],[3,0],[3,-1],[2,-5],[2,-1],[1,1],[7,0],[3,-4],[2,0],[0,8],[1,2],[3,-2],[6,-11],[0,-2],[5,-11],[1,-4],[0,-3],[1,-10],[0,-10],[1,-4],[0,-2],[2,-11],[0,-4],[-1,-5],[-1,-7],[0,-5],[2,-6],[2,-3],[0,-4],[1,-2],[2,-1],[1,-2],[2,-9],[0,-2]],[[8093,5322],[-1,0],[-1,2],[-1,17],[1,2],[1,0],[1,-4],[-1,-7],[1,-7],[0,-3]],[[7894,5341],[-2,-1],[-1,3],[1,5],[1,1],[1,-6],[0,-2]],[[8267,5423],[0,5],[1,1],[2,-1],[3,-4]],[[7785,5488],[-1,-1],[-2,1],[0,9],[1,1],[2,-1],[1,-2],[-1,-7]],[[7772,5556],[2,-6],[-1,-3],[-1,0],[-3,-3],[-1,4],[-1,2],[0,3],[1,1],[2,-2],[2,3],[0,1]],[[7780,5554],[0,3],[1,9],[0,2],[3,0],[2,-7],[6,-5],[2,-1],[2,2],[1,-2],[2,-2],[0,-5],[2,-5],[3,1],[2,-1],[0,-5],[1,-7],[-1,-5],[-2,-6],[0,-4],[1,-3],[2,-3],[0,-2],[1,0],[2,2],[1,4],[0,3],[5,3],[4,4],[1,-2],[1,-5],[1,-1],[3,0],[3,3],[1,5],[0,4],[4,6],[0,6],[1,3]],[[7835,5543],[5,-2],[1,-2],[6,-18],[7,-13],[3,-4],[2,-2],[4,-7],[2,-9],[6,-23],[1,-11],[1,-16],[-1,-24],[-2,-12],[0,-5],[2,-9],[0,-34],[1,-5],[2,-4],[7,-11],[1,-4],[4,-14],[7,-31],[2,-14],[-1,-4],[0,-2],[-3,-1],[-2,5],[0,4],[-2,3],[-1,-7],[-2,0],[-2,1],[-4,-1],[-4,-7],[-2,0],[-1,6],[-1,4],[-1,2],[-13,15],[-5,3],[-5,11],[-11,12],[-7,11],[-3,8],[-7,6],[-3,7],[-4,4],[2,8],[-1,7],[0,7],[-6,12],[-2,9],[-5,9],[-2,5],[-2,6],[3,3],[-1,4],[-3,8],[-1,8],[0,16],[-4,23],[-4,31],[1,11],[-1,12],[-2,11],[-3,9],[-1,6]],[[8044,5300],[2,-8],[0,-2],[4,-5],[4,-3],[3,-1],[6,0],[1,1],[9,-10],[3,-1],[3,1],[1,-1],[5,-7],[1,-1],[2,1],[-3,3],[-1,2],[-1,4],[0,4],[2,3],[1,3],[1,10],[2,9],[0,5],[-1,3],[-1,6],[2,8],[1,-3],[2,-2],[2,1],[1,3],[-1,4],[0,8],[2,6],[3,5],[3,2],[11,3],[17,9],[5,4],[2,1],[2,3],[2,8],[5,12],[4,11],[7,15],[6,14],[1,2],[1,8],[0,7],[2,3]],[[8197,5466],[7,1],[1,3],[3,4],[1,3],[0,5],[-3,4],[-1,4],[0,5],[4,9],[3,-2],[3,0],[2,5],[2,6],[4,9],[2,14],[10,23],[1,3],[6,23],[2,-1],[1,-7],[-2,-8],[0,-5],[3,3],[3,8],[3,10],[4,-3],[-1,-5],[1,-3],[1,-6],[2,-4],[4,-2],[3,-4],[1,-2],[0,-3],[1,-4],[0,-4],[-2,-5],[1,-7],[0,-4],[-1,-4],[5,0],[3,2],[3,5],[3,-11],[-2,-2],[-4,-3],[2,-4],[1,0],[3,3],[3,4],[2,0],[6,-6],[1,-2],[1,-6],[3,-2],[8,-8],[2,0],[3,1],[1,-1],[2,-6],[0,-4],[-2,-5],[-2,-3],[-6,-4],[-7,-4],[-3,0],[-5,3],[-2,0],[-1,-1],[-2,-10],[3,-9],[7,-9],[1,-3],[0,-3],[-1,-1],[-5,-3],[-4,-1],[-6,-4],[-3,1],[-5,4],[-1,0],[-1,-2],[-2,-6],[0,-1]],[[8253,5596],[-2,-3],[-1,4],[0,4],[3,5],[3,1],[0,-8],[-1,-2],[-2,-1]],[[5554,3756],[0,-24],[0,-26],[0,-25],[0,-26],[0,-25],[0,-26],[0,-26],[0,-33],[-3,0],[-6,-3],[-3,-5],[-2,-5],[-2,-3],[-3,-1],[-1,-2],[1,-4],[-1,-3],[-3,-3],[-4,1],[-5,3],[-6,1],[-8,-2],[-6,1],[-4,4],[-3,2],[-4,0],[-7,4],[-1,5],[-2,7],[0,3],[1,2],[0,3],[-1,5],[-1,2],[-2,0],[-1,2],[-2,7],[-2,3],[-4,-2],[-2,-9],[-2,-7],[0,-3],[-1,-4],[-1,0],[-6,-6],[-1,-3]],[[5456,3535],[-3,5],[-9,17],[-4,5],[-4,11],[-11,33],[-1,6],[-2,16],[-3,12],[0,7],[1,4],[-2,10],[-3,6],[-1,21],[-3,14],[1,11],[-1,10],[0,18],[-2,15],[-4,13],[-3,20],[-1,9],[1,24],[-1,9],[0,11],[-1,12],[-1,6],[1,5],[2,-2],[0,13],[-1,14],[-4,15],[-10,25],[-2,9],[-2,7],[-10,33],[-5,22],[-3,20],[-4,9],[-16,63],[-4,10],[-8,16],[-2,12],[-5,15],[-1,15],[0,29]],[[5648,4167],[6,3],[6,2],[7,2],[5,2],[1,0],[13,-2],[5,-1],[5,-5],[5,-10]],[[9653,3880],[-2,-2],[-2,3],[1,4],[2,-2],[1,-3]],[[9666,3949],[3,-1],[0,-10],[-5,-1],[0,2],[-2,1],[0,4],[-2,7],[3,1],[2,2],[0,-4],[1,-1]],[[9649,3964],[-2,0],[-2,4],[-4,2],[-2,4],[-1,4],[3,1],[2,6],[-4,3],[0,2],[4,3],[3,-4],[0,-9],[3,-9],[0,-7]],[[9625,3991],[-2,0],[2,5],[0,3],[1,6],[0,3],[2,-3],[-2,-4],[0,-3],[1,-1],[-2,-6]],[[9560,4017],[3,-3],[3,1],[4,-6],[11,-17],[4,-4],[2,-1],[2,-3],[1,-4],[3,-5],[1,-6],[4,-6],[2,-5],[3,-2],[5,-8],[3,-2],[7,-9],[5,-8],[3,-6],[6,-8],[4,-4],[2,-10],[-1,-3],[-2,-2],[-2,0],[-2,-2],[-7,8],[-1,-1],[-2,4],[-3,2],[-3,4],[-3,8],[-4,2],[-3,4],[-2,4],[-4,3],[-5,6],[-3,2],[-2,3],[-7,12],[-2,2],[-2,5],[-6,12],[-2,5],[-3,5],[-4,11],[-4,9],[-1,3],[0,7],[-2,1],[-1,3],[0,3],[1,2],[4,-6]],[[5377,5973],[-5,-1],[-3,-1],[-4,-6],[-4,-2],[-4,-5],[-7,-7],[-4,-8],[-1,-6],[-4,-1],[-5,1],[-4,6],[-8,6],[-6,3],[-2,0],[-13,1],[-13,-2],[-7,-3],[-1,0],[-4,-4],[-3,-4],[-9,-19],[-11,1],[-7,2],[-6,3],[-8,9],[-10,13],[-4,2],[-5,1],[-12,-14],[-2,1],[-3,-2],[-3,-5],[-3,1],[-2,2],[-2,3],[-6,18],[-2,4],[-4,7],[-3,4],[-2,-1],[-10,6],[-9,6],[-3,0],[-1,-2],[-3,-4],[-4,-1],[-5,0],[-3,1],[-4,-2],[-7,-5],[-5,-8],[-2,-1],[-1,-2],[-1,-23],[-2,-7],[-2,-9],[-5,-9],[-4,-5],[0,-35],[-1,-2],[1,-3],[0,-2],[1,-2],[-2,-4]],[[5415,6508],[3,-33],[2,-29],[1,-18],[0,-5],[1,-3],[2,-3],[8,-27],[-1,-4],[1,-8],[2,-4],[7,-16],[1,-5],[-6,-23],[-1,-24],[-1,-16],[-1,-23],[-1,-28],[-1,-23],[-1,-30],[-1,-29],[-7,-16],[-13,-28],[-11,-23],[-5,-15],[-11,-30],[-4,-19],[-4,-10],[-1,-4],[1,-15],[3,-24]],[[9664,3512],[1,-3],[-2,0],[0,3],[1,0]],[[5202,5438],[-3,-2],[-2,0],[3,8],[1,-2],[2,0],[-1,-4]],[[5377,5973],[4,-13],[5,-13],[4,-10]],[[5237,5457],[-1,0],[-1,-2],[-2,2],[-1,4],[-1,0],[-3,5],[2,-15],[-1,-5],[-7,0],[-6,-2],[-5,0],[-2,2],[-1,2],[-2,-2],[-5,-1],[-5,10],[0,-2],[2,-4],[0,-6],[-4,-6],[-3,-1],[-1,3],[-1,5],[0,7],[-1,4],[-1,0],[0,-4],[1,-3],[0,-7],[2,-6],[-3,-2],[-4,0],[0,2],[-1,5],[-1,-7],[-3,0],[-4,-2],[-1,1],[-1,4],[-1,-5],[-1,-1],[-2,0],[-3,3],[-5,7],[-6,11],[-2,11],[-2,6],[-1,11],[0,2],[-1,2],[0,8],[4,2],[1,3],[0,3],[-4,-5],[-5,5],[-1,3],[1,2],[2,1],[3,-1],[-1,3],[-2,1],[-3,-2],[-2,2],[0,5],[-2,4],[-5,13],[-6,11],[-6,8],[-8,4],[-18,-1],[-1,1],[2,3],[-1,3],[-2,0],[-2,-7],[-16,-1],[-2,-1]],[[2617,5820],[0,2],[-2,6],[-4,8],[-14,23],[-5,14],[-3,10],[-2,6],[-8,10],[-2,5],[-7,14],[-6,9],[0,3],[2,5],[1,-1],[4,-6],[2,1],[0,2]],[[2689,6047],[0,-2],[-1,-2],[-2,-7],[-1,0],[0,5],[-1,1],[-2,-5],[1,-3],[2,-1],[3,-24],[0,-4],[-4,-12],[-2,-4],[-2,-14],[-2,-24],[1,-22],[0,-31],[-2,-1],[-1,4],[0,3],[2,9],[-1,3],[-1,-6],[-1,-3],[-1,-1],[-1,-3],[1,-5],[2,-7],[-1,-3],[0,-12],[-1,0],[0,2],[-2,0],[0,-7],[-1,-2],[0,-3],[2,-2],[1,0],[2,-10],[-3,-4],[-2,-8],[-1,-5],[0,-3],[1,-10],[1,-7],[2,-4],[2,-1]],[[283,4084],[-3,-3],[-1,4],[1,4],[1,2],[1,0],[1,-5],[0,-2]],[[5092,8143],[7,1],[3,-2],[5,-1],[3,3],[3,-2],[3,1]],[[5109,8163],[3,-5],[-3,-1],[-4,4],[-2,-1],[-1,3],[2,1],[5,-1]],[[5135,8240],[-3,-4],[-2,1],[1,4],[4,6],[0,-7]],[[5165,8106],[-6,1],[-2,1]],[[5116,8143],[-6,3],[-5,-2],[-3,3],[-3,0],[-4,5],[3,3],[5,0],[4,-1],[7,-7],[4,1],[-1,2],[-5,3],[-2,2],[4,2],[0,3],[-5,8],[1,2],[2,8],[2,1],[7,11],[3,6],[2,8],[3,21],[2,8],[4,-2],[5,3],[8,8],[2,6],[3,3],[9,7],[5,1],[14,2],[7,0],[7,-8],[4,-1]],[[5147,8258],[6,4],[1,-1],[-7,-3]],[[5164,8262],[-8,0],[0,1],[8,0],[0,-1]],[[5140,8657],[0,-7],[-2,1],[-2,4],[1,4],[-1,4],[2,2],[2,-8]],[[5137,8702],[-3,-1],[-2,1],[1,5],[3,1],[1,-6]],[[5224,8831],[-6,1],[-2,4],[3,2],[4,1],[2,-2],[-1,-6]],[[5234,8850],[-3,0],[-2,2],[12,5],[3,-1],[-1,-3],[-9,-3]],[[5311,8919],[-2,-1],[-3,1],[-6,-1],[-3,2],[2,3],[6,3],[3,0],[3,-4],[0,-3]],[[5331,8963],[-5,-1],[1,5],[5,1],[-1,-5]],[[5346,8979],[-2,2],[4,4],[5,0],[1,-1],[-8,-5]],[[5344,8987],[-3,0],[6,10],[3,-2],[0,-3],[-2,-3],[-4,-2]],[[5359,9093],[-2,2],[2,6],[4,2],[0,-6],[-4,-4]],[[5384,9115],[2,-1],[4,1],[1,-2],[-2,-2],[-4,-1],[-3,-4],[-4,0],[-7,-5],[-5,-1],[0,5],[2,4],[4,0],[3,5],[4,2],[5,-1]],[[5421,9154],[4,-5],[2,-4],[-2,-6],[-3,-4],[-9,0],[-5,4],[-6,-3],[-3,2],[-1,3],[4,3],[1,3],[7,-1],[2,7],[5,-2],[0,7],[4,-1],[0,-3]],[[5437,9132],[4,5],[4,2],[2,4],[1,6],[5,1],[4,-4],[2,-5],[-1,-5],[-9,-5],[-4,-4],[-2,-4],[-2,-1],[-4,2],[-2,-4],[-7,-2],[-3,1],[0,3],[-2,0],[-2,-4],[-4,-2],[-3,2],[-9,-7],[-7,-1],[-3,1],[0,4],[9,8],[14,2],[9,10],[2,11],[2,4],[-1,3],[-2,0],[1,7],[7,7],[4,7],[5,1],[2,-2],[0,-3],[-4,-6],[-5,-5],[3,-7],[0,-10],[-3,-6],[-1,-4]],[[5485,9192],[3,-3],[5,1],[4,-3],[2,0],[2,-7],[-4,-3],[1,-8],[-5,-2],[-6,0],[-2,2],[-5,-4],[-4,-6],[-6,3],[-4,0],[4,4],[1,3],[-1,5],[3,7],[8,-1],[1,3],[-4,2],[0,2],[6,1],[1,4]],[[5831,9203],[-5,-1],[-1,1],[3,7],[2,0],[4,-4],[-3,-3]],[[5576,9220],[-4,-2],[-5,2],[-1,4],[2,3],[8,1],[1,-1],[-1,-7]],[[5534,9219],[2,-3],[5,2],[3,-2],[-1,-3],[-4,-3],[-3,-5],[-6,-1],[-6,-6],[-3,-4],[0,-3],[-14,-3],[-4,2],[-2,4],[4,0],[0,3],[3,2],[2,4],[3,-1],[2,2],[3,-1],[0,6],[4,4],[1,3],[6,4],[-1,5],[2,4],[3,0],[1,-4],[0,-6]],[[5548,9228],[4,-1],[2,-3],[3,-1],[0,-2],[-5,-2],[-4,1],[-5,11],[3,0],[2,-3]],[[5655,9247],[1,-5],[-9,-8],[-5,-3],[-1,5],[-5,1],[0,4],[6,4],[3,-1],[8,7],[2,-4]],[[5666,9248],[-5,-2],[-5,4],[1,7],[2,1],[2,-2],[7,-3],[-2,-5]],[[5650,9262],[0,-2],[-4,-3],[-6,-8],[-7,-3],[-5,1],[-2,-2],[-6,0],[-5,3],[-5,5],[10,0],[2,3],[4,-1],[8,2],[3,-1],[7,6],[5,2],[1,-2]],[[5856,9203],[2,-8],[0,-3],[-4,-4],[-5,0],[-6,3],[-4,3],[-3,-10],[-4,-4],[-4,-2],[-13,-3],[-5,-12],[-2,-3],[-4,-1]],[[5572,9160],[-14,-1],[6,-7],[-1,-9],[-4,-8],[-5,-4],[7,-4],[-5,-5],[-5,-1],[-17,6],[-11,2],[-3,0],[-11,3],[-6,-2],[0,-12],[1,-6],[-3,-7],[-4,-7],[-17,8],[-4,-4],[-11,-8],[-5,-15],[-4,-5],[-7,-3],[-2,-4],[6,-10],[2,-6],[0,-5],[-5,-5],[-10,-12],[-9,-12],[-4,-4],[2,-11],[-3,-3],[-9,-5],[-4,0],[-10,-2],[2,-11],[0,-8],[-2,-9],[-2,-19],[-3,-8],[-12,-22],[-8,-12],[6,-4],[6,-3],[2,-11],[0,-5],[-2,-5],[-3,-5],[-8,2],[-11,2],[-8,-1],[-6,-3],[-7,-9],[-6,-10],[-4,-5],[1,-6],[-6,-11],[4,-12],[2,-5],[-3,-5],[1,-5],[0,-10],[-1,-4],[6,-17],[-2,-18],[-2,-15],[3,-4],[9,-6],[4,-6],[4,-5],[-4,-14],[-2,-4],[-6,0],[-5,-2],[1,-6],[4,-12],[3,-8],[1,-6],[-2,-8],[0,-4],[-1,-8],[-3,-3],[-3,-5],[-3,-3],[-5,-1],[-2,-2],[-2,-9],[-5,-6],[1,-2],[1,-8],[2,-8],[-2,-7],[-1,-8],[-2,-6],[-2,-2],[-2,1],[-3,8]],[[5315,8584],[0,4],[-15,4],[-6,14],[0,15],[-2,1],[1,-7],[-5,-3],[0,-4],[1,-1],[0,-9],[-5,-13],[-2,-1],[0,-2],[-3,1],[-3,-3],[-4,-1],[-1,4],[-4,5],[-1,-2],[2,-4],[-2,-4],[-2,0],[-6,-5],[2,-3],[-2,-3],[-2,0],[-2,-2],[0,-2],[-7,-6],[-11,-16],[-6,-4],[-4,-5],[-4,0],[-4,-3],[-12,-4],[-7,2],[-5,-2],[-3,3],[-1,5],[-3,-1],[-1,-4],[-5,3],[3,6],[0,2],[-8,0],[-9,7],[-2,3],[-7,5],[-4,6],[-2,6],[0,5],[1,9],[2,2],[7,-3],[6,-5],[1,0],[3,4],[4,4],[-1,1],[-7,-4],[-5,6],[0,2],[2,5],[-1,3],[0,4],[3,4],[4,4],[-1,3],[-4,-5],[-5,-3],[-3,-1],[-4,-3],[-3,-5],[-3,-2],[-5,0],[-1,4],[1,13],[2,6],[1,5],[3,0],[2,4],[2,0],[1,-2],[5,-1],[3,4],[3,0],[7,5],[0,1],[-5,-1],[-6,-2],[-2,1],[-1,3],[2,3],[6,7],[2,3],[2,9],[5,7],[5,3],[2,-3],[2,0],[4,5],[0,3],[-13,-5],[-5,-4],[-7,-11],[-1,-5],[-2,-2],[-3,-1],[-4,-6],[-1,-5],[-8,-8],[-2,-3],[-1,2],[0,10],[2,4],[1,4],[-1,4],[1,2],[4,-1],[4,0],[5,3],[-1,2],[-7,0],[-3,3],[-3,6],[-1,8],[1,2],[10,8],[-3,0],[-5,-3],[-4,4],[-2,4],[-1,9],[1,4],[-1,6],[3,2],[2,-1],[9,0],[13,4],[9,-3],[9,4],[4,0],[4,-2],[2,-3],[0,-4],[1,-2],[2,1],[-1,3],[0,4],[14,5],[1,2],[-5,1],[-2,4],[-2,-1],[1,-4],[-1,-2],[-3,-1],[-6,0],[-4,2],[-4,1],[-2,4],[-3,-7],[-3,-1],[-8,1],[-12,-1],[-6,-2],[-3,0],[-9,8],[0,11],[7,1],[2,2],[-4,3],[-2,5],[-3,1],[-2,4],[-1,5],[2,6],[4,-1],[10,0],[9,-4],[6,-2],[13,1],[7,4],[-1,1],[-8,-2],[-8,0],[-13,4],[-5,1],[-6,0],[-3,1],[-1,4],[1,8],[3,1],[3,-2],[5,9],[5,4],[7,2],[3,-3],[3,0],[11,3],[-4,2],[-5,-2],[-4,0],[0,2],[3,4],[1,4],[2,2],[8,0],[3,1],[15,-2],[6,-3],[6,2],[-5,2],[0,3],[8,3],[8,1],[-2,2],[-17,-4],[-5,3],[-3,0],[-3,-2],[-7,-1],[-1,1],[1,4],[7,10],[10,3],[5,5],[8,0],[7,-1],[3,-5],[4,2],[-3,3],[-2,4],[0,5],[3,3],[8,1],[2,2],[-1,5],[-3,-1],[-3,2],[-1,3],[1,2],[5,4],[8,2],[8,-3],[-2,-7],[2,-1],[5,7],[5,1],[5,2],[4,-6],[3,-2],[1,-5],[3,2],[7,2],[7,-1],[5,1],[-3,5],[3,6],[5,2],[5,1],[3,3],[4,2],[-2,4],[-4,2],[8,6],[-4,2],[-3,-1],[-8,-6],[4,-4],[-3,-5],[-17,-11],[-8,-3],[-3,0],[-1,3],[-4,7],[-5,-1],[1,7],[3,4],[4,3],[4,9],[6,6],[9,14],[8,4],[3,5],[4,2],[4,4],[3,0],[5,3],[3,4],[-2,1],[-7,-4],[1,9],[4,4],[19,11],[2,-1],[2,-4],[5,1],[7,7],[-1,3],[-5,-5],[-5,0],[0,3],[-4,0],[-2,2],[0,5],[4,12],[10,14],[1,5],[4,3],[5,-1],[1,1],[-2,4],[-5,3],[0,2],[17,4],[8,0],[2,3],[5,1],[3,3],[-2,1],[-8,-2],[-9,-3],[-7,0],[-1,12],[1,6],[2,0],[1,6],[3,3],[4,1],[4,5],[5,-1],[4,2],[-6,2],[-2,3],[2,2],[5,1],[3,7],[3,2],[3,0],[3,3],[4,-1],[8,3],[18,0],[1,3],[-17,1],[-7,0],[-3,-1],[-1,3],[3,2],[1,3],[5,6],[6,4],[4,-1],[5,-4],[3,0],[2,-2],[3,0],[3,4],[-1,2],[-5,-2],[-4,2],[-3,6],[3,5],[-1,1],[-7,-4],[-7,-1],[1,5],[-1,3],[7,8],[6,1],[4,-3],[6,2],[-1,2],[-6,1],[-2,4],[5,2],[5,3],[5,1],[5,3],[1,-1],[2,-10],[4,-9],[1,0],[-1,7],[3,4],[-3,4],[-3,8],[1,2],[5,4],[7,1],[6,-3],[7,1],[13,5],[-4,2],[-6,-2],[-17,1],[-2,1],[0,3],[4,5],[6,3],[7,1],[7,6],[3,5],[1,7],[5,5],[11,4],[-1,9],[3,7],[3,2],[5,-6],[5,-3],[6,0],[1,1],[-4,2],[-4,4],[0,3],[2,2],[5,0],[4,3],[0,3],[5,7],[14,3],[1,-1],[-1,-10],[-2,-6],[3,0],[6,18],[3,3],[8,4],[1,-4],[-1,-15],[-2,-5],[-6,-10],[4,1],[8,10],[7,-1],[-5,6],[-1,3],[1,10],[2,3],[9,0],[6,-1],[2,6],[5,1],[15,-10],[-2,9],[-2,4],[-6,2],[-6,4],[-1,4],[5,1],[7,-2],[6,4],[2,-1],[4,2],[3,-3],[2,1],[1,4],[7,2],[5,-2],[2,-2],[3,-12],[6,-6],[3,-1],[1,2],[-3,3],[1,8],[1,2],[8,9],[7,5],[4,0],[7,10],[3,3],[0,2],[-4,2],[0,3],[5,4],[6,6],[3,0],[8,-4],[3,-4],[4,-1],[3,4],[4,-1],[2,-2],[4,-1],[0,-2],[-3,-2],[-6,-6],[-5,-7],[-2,-4],[-2,-9],[-4,-6],[0,-5],[2,-2],[4,2],[6,6],[1,6],[15,16],[7,9],[7,8],[5,1],[2,-5],[-2,-6],[-3,-4],[2,-2],[0,-5],[-2,-8],[3,0],[9,6],[4,9],[1,4],[4,3],[6,0],[0,2],[-8,5],[-1,2],[3,3],[8,5],[6,-2],[9,-1],[7,-4],[-1,-6],[-3,-4],[-9,-4],[-1,-3],[3,-1],[6,3],[1,-2],[-2,-6],[0,-7],[3,0],[4,3],[1,7],[4,8],[4,5],[2,1],[7,0],[4,-2],[2,-4],[3,-2],[6,-1],[5,-4],[7,4],[5,-5],[-1,-5],[6,1],[5,-2],[9,-7],[1,-3],[-1,-4],[-13,-4],[-5,-5],[-10,-1],[-32,3],[1,-3],[22,-7],[1,-2],[0,-9],[2,-3],[8,0],[3,-1],[2,2],[0,5],[5,0],[1,-6],[3,3],[10,0]],[[5710,9281],[7,-2],[3,0],[5,-6],[-4,-2],[-11,0],[-3,3],[-5,2],[8,5]],[[9635,5154],[1,1],[1,-1],[0,-2],[-1,0],[-1,0],[0,1],[0,1]],[[9698,2160],[1,-3],[-2,-2],[-3,3],[4,2]],[[9616,2260],[0,-5],[-4,1],[-2,3],[-1,-3],[-2,0],[0,3],[5,5],[1,6],[-1,2],[4,1],[1,-3],[-2,-2],[1,-5],[-1,-1],[1,-2]],[[9669,2484],[0,-2],[-3,1],[0,-3],[3,-1],[1,-2],[2,0],[0,-5],[-2,-2],[-4,-1],[-3,-3],[-4,0],[-3,-4],[-4,-1],[0,4],[3,3],[0,3],[1,3],[2,1],[0,4],[2,3],[-1,6],[0,5],[5,1],[5,-10]],[[9630,2554],[0,-5],[-4,2],[-2,0],[1,3],[4,2],[1,-2]],[[9637,2581],[1,-7],[-2,1],[-2,3],[2,3],[1,0]],[[106,2630],[-2,0],[1,3],[-1,2],[2,1],[1,-2],[-1,-4]],[[106,2664],[-1,-2],[-2,1],[-3,-2],[-1,2],[-2,-6],[1,-5],[2,0],[1,-6],[-3,-1],[-2,-3],[-2,1],[-1,6],[2,3],[1,3],[-3,4],[-5,-1],[-1,1],[2,4],[3,-1],[3,3],[11,-1]],[[9829,2830],[-3,-4],[0,3],[1,5],[1,2],[3,2],[0,-4],[-2,-4]],[[9807,2806],[3,-1],[3,5],[3,3],[4,3],[5,6],[5,4],[2,0],[-1,-3],[-2,-2],[0,-3],[-1,-3],[0,-4],[1,-3],[1,3],[-1,2],[4,5],[-1,4],[3,-1],[3,2],[0,-3],[2,1],[-2,-6],[-3,-6],[1,-2],[4,5],[2,-1],[-4,-7],[-3,-3],[-1,-4],[0,-4],[2,-4],[-2,-6],[3,1],[3,-5],[-1,-4],[-10,-18],[0,-5],[-2,-3],[-7,-12],[-1,-3],[-5,-18],[-4,-8],[-2,-3],[-7,-6],[-2,-4],[-3,-3],[-2,-1],[0,-2],[3,-3],[-3,-4],[3,-2],[0,-3],[2,-6],[7,-3],[1,-2],[0,-8],[-1,-2],[-4,-1],[-3,1],[-2,4],[-5,-1],[1,3],[-3,3],[-2,-1],[-1,-2],[0,-3],[-1,-2],[-4,2],[-2,0],[1,-4],[-2,-3],[-3,-2],[-3,-1],[-6,-7],[-4,0],[-2,-1],[-2,-7],[-2,-2],[-2,-13],[-1,-5],[0,-9],[-1,-9],[-1,-3],[0,-4],[-4,-6],[-5,-22],[-3,-9],[0,-2],[3,-4],[0,-3],[-2,-2],[-9,-4],[-2,-3],[-4,-9],[-8,-10],[-6,-13],[-10,-4],[-6,-1],[-4,1],[-6,3],[-5,-2],[-3,1],[-2,-1],[-2,3],[1,4],[-3,6],[-2,1],[-9,0],[-5,10],[-5,2],[-3,-5],[-8,-1],[-10,3],[-1,4],[1,5],[-2,0],[2,5],[0,4],[-3,-4],[-4,0],[0,7],[1,2],[9,2],[3,1],[2,2],[-6,1],[0,3],[2,6],[-4,0],[0,4],[1,4],[4,0],[-1,2],[0,3],[1,1],[4,-5],[3,-1],[-1,3],[0,5],[-3,3],[0,5],[3,4],[2,1],[-1,3],[7,9],[1,-7],[1,2],[0,3],[-1,4],[1,2],[2,1],[6,9],[2,0],[0,5],[10,16],[4,8],[3,3],[5,4],[5,-2],[7,8],[3,-3],[-1,5],[1,3],[9,9],[4,2],[3,3],[2,0],[0,4],[1,2],[4,4],[4,6],[2,5],[4,6],[2,1],[3,-1],[-1,3],[6,5],[3,4],[4,8],[1,1],[6,13],[2,1],[-1,3],[1,6],[0,6],[2,7],[3,16],[1,2],[6,2],[3,4],[5,12],[2,14],[1,15],[4,11],[5,8],[5,6],[2,1],[3,0],[-2,-3],[-1,-4],[0,-3],[2,-6],[2,-3],[4,-1],[2,-14],[0,-6],[1,-5]],[[9875,3094],[0,-3],[-2,1],[-1,2],[-3,3],[0,5],[2,4],[1,-3],[2,-3],[1,-6]],[[9812,3171],[0,-3],[2,2],[1,3],[2,-3],[6,-3],[3,-4],[2,3],[7,-7],[0,-7],[2,-2],[3,3],[1,0],[2,-7],[0,-2],[2,-3],[2,-7],[0,-3],[-1,-2],[2,-7],[-5,1],[0,-2],[2,-5],[2,-7],[2,-4],[5,-13],[-1,-5],[0,-6],[2,-7],[-2,-2],[0,-7],[-1,-1],[0,-3],[2,0],[3,-4],[0,3],[1,1],[3,-4],[7,-4],[1,-3],[0,-7],[1,-3],[5,1],[0,8],[-2,11],[0,3],[1,4],[-3,9],[-1,2],[2,4],[2,-6],[5,-9],[2,0],[0,-4],[2,-4],[1,-4],[1,-15],[2,-13],[4,-6],[0,-3],[-2,2],[-1,-2],[2,-3],[6,-2],[8,-9],[5,-3],[11,-6],[5,0],[3,2],[3,3],[4,12],[3,2],[2,3],[3,3],[8,0],[2,-3],[5,-5],[-3,-9],[-1,-6],[-2,-28],[-4,-11],[-3,-3],[-3,-2],[-2,-17],[2,-4],[0,-3],[-2,-6],[-1,1],[-1,5],[-1,2],[-7,2],[-4,-1],[-3,-2],[-6,-6],[-3,-8],[-1,-7],[0,-4],[1,-3],[4,-4],[-4,-14],[-3,-14],[-4,-8],[-3,-8],[-3,-7],[-3,-6],[-9,-27],[-2,-5],[-4,-6],[-4,-5],[-7,-7],[-2,-3],[-2,-1],[-3,4],[0,5],[-1,2],[-3,1],[-5,-2],[0,9],[-3,-3],[-3,0],[-1,2],[6,13],[5,13],[4,13],[3,19],[-2,5],[-1,5],[-4,9],[-6,5],[-3,1],[-3,2],[-4,5],[-2,5],[-12,8],[-3,4],[-2,7],[0,3],[1,5],[8,8],[7,4],[2,0],[2,2],[3,5],[0,3],[2,21],[2,12],[3,11],[-1,8],[2,4],[2,1],[-3,7],[-2,10],[-1,3],[1,3],[0,4],[-2,0],[0,3],[-3,11],[2,0],[2,-7],[2,6],[4,1],[-4,8],[-2,0],[-3,-2],[-4,3],[-1,3],[-1,7],[-1,2],[-5,13],[2,1],[4,-7],[1,2],[0,7],[-2,4],[0,3],[1,5],[-3,4],[-1,0],[1,-4],[-1,-1],[-6,8],[-1,-2],[4,-8],[0,-5],[-1,-1],[-2,2],[-1,7],[-2,4],[-14,36],[1,5],[4,6],[0,2],[-2,-1],[-4,-8],[-3,4],[0,4],[-2,0],[-1,5],[-2,3],[2,4],[0,6],[-4,13],[-5,10],[-4,10],[5,1],[4,0],[-2,-6],[1,-3],[2,-3],[3,-10],[0,-2],[3,-5]],[[6630,6348],[-2,-1],[0,8],[4,9],[3,10],[1,-9],[-3,-5],[-2,-9],[-1,-3]],[[6473,6142],[-1,8],[-2,7],[-2,8],[-1,8],[-1,5],[-2,2],[-2,5],[-3,18],[-2,5],[-3,18],[-1,5],[-2,6],[-2,12],[-1,5],[-2,6],[-3,17]],[[6443,6277],[8,6],[5,4],[10,6],[4,4],[10,6],[5,4],[5,3],[4,3],[5,3],[5,4],[5,3],[9,7],[8,5],[1,8],[2,12],[3,20],[2,12],[3,19],[3,20],[2,12],[2,13],[-1,5],[-3,8],[-4,15],[-2,5],[-2,7]],[[6565,6622],[3,-15],[4,-14],[4,-8],[4,-11],[6,-9],[2,-4],[11,-7],[14,-5],[6,-5],[7,1],[5,-7],[2,-7],[2,-4],[4,-11],[4,-10],[3,-10],[7,-12],[8,-4],[0,-12],[-1,-5],[-3,-9],[-1,-6],[-4,-10],[-4,-16],[-2,-4],[-6,-8],[-5,-11],[-6,-17],[-4,-18],[-2,-5],[-3,-1],[-3,0],[-1,2],[0,4],[1,6],[-4,-2],[-5,-13],[-2,-6],[0,-7],[-2,-9],[-1,-9],[-1,-7],[0,-4],[1,-10],[0,-11],[2,-13],[-2,-3],[-2,-1],[-7,-1],[-7,-2],[-6,-4],[-4,-5],[-4,-9],[-3,-24],[-5,-11],[-3,-2],[-8,-1],[-10,-2],[-4,-3],[-6,-15],[-1,-4],[2,-8],[-4,-12],[-3,-7],[-8,-5],[-3,3],[-2,1],[-6,0],[-8,-1],[-3,-5],[-5,-4],[-5,-5],[-9,-2],[-6,-5]],[[6557,6684],[2,9],[1,1],[3,0],[1,5],[2,2],[0,-14],[-1,-17],[-2,-6],[0,-3]],[[6892,6557],[0,-3],[-1,-3],[-2,6],[-3,-1],[-2,4],[-1,-4],[-5,-1],[0,6],[-2,-2],[-2,3],[-1,6],[-3,3],[-2,10],[0,6],[-3,22],[-2,2],[-11,4],[-1,4],[1,11],[0,6],[-4,9],[-1,6],[-3,5],[-3,2],[-3,-1],[-2,-5],[6,0],[-1,-2],[-2,0],[-10,-3],[-6,-3],[-7,1],[-10,-4],[-8,0],[-3,-7],[-2,1],[-1,2],[-11,5],[-1,3],[-2,1],[-2,-3],[-7,2],[-5,-1],[-2,-9],[-5,1],[-3,2],[-5,-2],[-9,3],[-3,-1],[-4,-3],[-1,-3],[-2,-1],[-3,5],[-2,-1],[-1,-3],[-6,-1],[-4,0],[-5,3],[1,1]],[[7131,7237],[3,-13],[2,-5],[1,-6],[1,-2],[1,-5]],[[2732,5606],[-1,-1],[-3,3],[-2,5],[-1,1],[0,2],[2,5],[2,1],[2,-5],[-2,-3],[1,-3],[2,-3],[0,-2]],[[2803,5659],[-1,-3],[-1,3],[1,2],[1,-2]],[[2808,5660],[-1,-3],[-1,6],[0,6],[2,2],[1,-1],[0,-8],[-1,-2]],[[2835,5600],[0,1],[-7,17],[-6,20],[-1,10],[3,0],[1,1],[0,9],[3,5],[1,3],[2,-6],[3,-3],[3,-4],[0,4],[-5,6],[-1,4],[-1,6],[-3,-5],[-1,0],[-1,2],[-2,1],[-1,-1],[0,-5],[-1,0],[-1,2],[0,3],[-2,10],[-4,7],[-1,0],[-2,4],[-2,2],[-3,5],[-4,4],[-4,1],[-5,-1],[-2,-2],[-2,-3],[0,-1],[-3,-3],[-2,-4],[0,-4],[-2,-4],[2,-3],[-10,-14],[-3,-2],[-4,-1],[-3,-5],[0,-7],[3,-5],[3,-8],[5,-11],[1,-4],[1,-6],[-2,-2],[-1,-2],[-5,0],[-2,-2],[0,-4],[-2,-3],[-7,-3],[-4,0],[-2,3],[0,10],[-4,15],[-1,10],[-2,-1],[-1,-3],[0,-8],[-1,-3],[-8,6],[-5,17],[0,3],[-1,4],[-4,2],[-3,2],[-3,1],[-2,-2],[-2,2],[0,5],[-4,-2],[-4,1],[-4,2],[-3,-1],[-3,-4],[1,-8],[-1,-2]],[[2706,5735],[2,-3],[3,-6],[0,-5],[1,-7],[2,-1],[2,1],[0,-3],[-1,-1],[0,-7],[3,-2],[1,-3],[5,1],[2,-1],[2,1],[-2,5],[-2,4],[0,2],[2,-1],[1,-3],[2,-3],[5,-11],[5,-3],[5,0],[3,2],[7,4],[4,8],[15,11],[5,7],[3,2],[4,6],[2,5],[2,2],[6,-2],[4,-2],[3,1],[2,-2],[1,-3],[2,-2],[6,1],[6,-2],[11,-10],[7,-9],[4,-11],[9,-13]],[[1436,3778],[-1,0],[-1,3],[1,1],[1,-4]],[[3043,4127],[-2,4],[-9,12],[-3,7],[-4,4],[-7,11],[-1,3],[-1,12],[-1,3],[-3,4],[-7,6],[-2,2],[-3,5],[-4,4],[-4,7],[-3,6],[-3,4],[-9,5],[-4,6],[-9,7],[-4,5],[-9,6],[-11,17],[-7,4],[-5,8],[-15,17],[-5,13],[-3,5],[-4,11],[-6,7],[-5,8],[-2,8],[-4,10],[-1,6],[-3,5],[0,11],[-2,5],[1,2],[2,1],[2,17],[-1,8],[-6,15],[-2,7],[-1,10],[-3,5],[-3,12],[-2,10],[-5,7],[-1,3],[0,4],[-3,3],[0,8],[-2,15],[-2,7],[-9,14],[0,6],[-1,9],[-2,11],[-13,43],[-2,16],[-2,9],[-3,17],[-4,12],[-2,11],[-3,20],[-4,12],[-3,11],[-4,10],[-4,7],[-2,5],[-6,24],[0,7],[-4,13],[-4,10],[-6,14],[-20,21],[-6,9],[-3,4],[-1,7],[1,4],[2,4],[2,-3],[2,1],[1,5],[1,7],[-2,9],[-6,18],[0,3],[1,5],[-2,8],[-3,7],[-1,5],[1,20],[2,5],[9,21],[3,8],[4,6],[4,8],[5,6]],[[8339,5486],[-2,-5],[-1,1],[-1,-1],[-3,-1],[-1,-4],[-2,-1],[-2,0],[0,4],[7,7],[4,5],[0,-3],[1,-2]],[[8364,5533],[2,-4],[2,1],[3,-1],[0,-4],[-3,-4],[-2,5],[-4,-3],[-2,1],[-2,-1],[-2,3],[1,3],[4,5],[3,-1]],[[8390,5554],[-4,-1],[-2,6],[0,2],[-2,3],[1,3],[2,1],[4,4],[7,-6],[1,-2],[-2,-2],[-2,-5],[-3,-3]],[[8493,5584],[-1,-3],[-1,8],[-1,2],[1,6],[2,-3],[0,-10]],[[8414,5610],[0,-3],[-3,-2],[-1,0],[0,6],[2,-2],[1,2],[1,-1]],[[8251,5637],[-2,-4],[-1,5],[0,9],[3,1],[0,-11]],[[8259,5656],[-2,-1],[-1,4],[0,3],[2,0],[1,-6]],[[8466,5710],[-1,-4],[-3,3],[-1,3],[0,3],[3,1],[2,-6]],[[8435,5715],[0,-6],[-3,-1],[-2,1],[-1,4],[5,5],[1,-3]],[[8498,5736],[-1,-2],[-1,3],[1,7],[1,1],[0,-9]],[[8499,5720],[2,-3],[3,1],[0,-12],[3,-7],[1,-6],[-3,-9],[-2,-4],[0,-4],[3,-1],[3,-3],[0,-9],[2,-7],[0,-3],[-1,-13],[1,-6],[1,-4],[2,-2],[0,-3],[1,-7],[0,-17],[-1,-4],[-3,-10],[-4,-7],[-2,0],[-1,-2],[1,-7],[0,-14],[-1,-10],[-2,10],[-1,14],[-1,6],[-2,6],[0,5],[-2,5],[-2,13],[-2,-1],[-2,-3],[-1,-3],[0,-6],[-3,-6],[-4,-12],[-1,-6],[3,-7],[3,-4],[0,-2],[3,-14],[-1,-14],[-1,-7],[-4,-11],[-4,-4],[-1,2],[-1,7],[-1,3],[1,7],[0,6],[-1,2],[-1,-1],[-3,-9],[-1,-2],[-2,0],[-9,8],[-7,7],[-5,6],[-4,10],[-1,8],[0,7],[-1,12],[0,7],[1,7],[3,6],[2,7],[0,3],[-4,11],[-3,5],[-5,4],[-3,5],[-3,0],[-2,-1],[0,-8],[-3,-15],[-3,3],[-3,4],[0,3],[-1,3],[0,2],[-1,2],[-1,-5],[-2,-4],[-2,-1],[-2,0],[-1,2],[0,9],[-3,3],[-2,-1],[-4,-5],[0,-2],[-1,-4],[-4,-13],[-1,-10],[-3,-9],[0,-3],[-2,-2],[-2,0],[-3,9],[0,7],[2,5],[2,4],[2,17],[0,9],[3,8],[3,5],[1,1],[6,2],[2,3],[4,0],[3,1],[2,4],[0,8],[2,4],[2,5],[4,1],[2,2],[1,3],[1,5],[4,-4],[3,-1],[3,-4],[2,-7],[0,-3],[1,-11],[-1,-3],[-3,-5],[2,0],[3,4],[2,2],[5,3],[1,1],[0,3],[2,6],[1,7],[2,6],[2,0],[4,-5],[3,3],[1,7],[1,10],[0,3],[2,3],[2,-1],[3,-4],[3,-1],[1,3],[1,6],[1,0],[3,-2],[4,2],[1,7],[-1,8],[-3,22],[2,5],[1,0],[4,-6],[6,-8],[2,-5],[2,-6]],[[8500,5746],[-2,4],[1,5],[2,8],[1,-7],[0,-4],[1,-4],[-1,-2],[-2,0]],[[8479,5758],[0,-3],[-4,8],[0,5],[1,0],[1,-2],[2,-8]],[[8460,5747],[-1,-2],[-3,0],[-2,-6],[-1,-1],[-6,-2],[-6,2],[-3,8],[0,3],[1,3],[2,3],[4,4],[1,4],[2,4],[4,1],[2,-1],[3,-4],[2,-2],[0,-12],[1,-2]],[[8490,5754],[-3,5],[-1,5],[-1,2],[0,11],[3,4],[1,3],[1,-2],[-1,-9],[1,-10],[0,-9]],[[8330,5787],[-4,-1],[-1,5],[3,5],[3,-2],[1,-2],[-2,-5]],[[8452,5794],[-1,0],[1,6],[2,-2],[0,-2],[-2,-2]],[[8406,5787],[-2,-1],[-1,-2],[-1,4],[0,6],[5,8],[1,-2],[0,-3],[-2,-9],[0,-1]],[[8419,5705],[-4,0],[-1,3],[-2,12],[-3,3],[-3,2],[-1,2],[-2,2],[-4,13],[0,11],[2,4],[1,1],[4,0],[5,6],[1,2],[0,10],[-2,12],[1,3],[2,3],[1,6],[0,7],[2,5],[6,5],[8,-5],[1,-6],[0,-2],[-1,-7],[-3,-11],[-2,-8],[-1,-12],[-1,-3],[-3,-12],[0,-8],[-1,-3],[0,-3],[5,-15],[0,-5],[-1,-3],[-1,-5],[-1,-2],[-2,-2]],[[8426,5728],[-1,-2],[-1,4],[0,5],[3,18],[-1,4],[4,10],[2,10],[3,10],[6,28],[0,4],[1,2],[0,7],[2,5],[1,-4],[-1,-6],[0,-3],[1,-1],[0,-6],[-1,-9],[1,-11],[-2,-11],[-1,-4],[-2,-4],[-3,-2],[-2,-5],[-2,-7],[0,-5],[-4,-19],[-3,-8]],[[8436,5833],[2,-7],[-2,0],[-1,5],[1,2]],[[8257,5669],[-2,-4],[0,5],[3,15],[2,3],[3,8],[2,4],[4,7],[4,9],[3,0],[1,1],[3,5],[6,14],[5,11],[6,14],[3,6],[5,13],[1,2],[2,1],[2,4],[2,5],[1,7],[-2,9],[3,11],[3,15],[1,3],[2,-2],[0,-3],[-1,-6],[0,-3],[1,-4],[-1,-5],[2,-14],[2,-9],[0,-3],[-2,-5],[-2,-2],[-3,-1],[-2,-2],[-2,-4],[-1,-6],[-1,-3],[0,-2],[-7,-4],[-5,-5],[-1,-3],[1,-5],[-6,-20],[-2,-5],[-1,-5],[-3,-3],[-3,-2],[-3,-3],[-2,-7],[-2,-6],[-3,-5],[-5,-7],[-3,-2],[-2,-6],[-3,-2],[-3,-4]],[[8328,5847],[1,-3],[-1,-4],[-1,-1],[-1,1],[-1,4],[2,3],[1,0]],[[8459,5837],[2,-2],[2,0],[3,5],[3,-2],[3,-9],[0,-15],[-1,-9],[3,-6],[2,-6],[0,-7],[2,-7],[0,-5],[-3,1],[-1,-3],[-2,6],[-1,2],[0,-9],[1,-5],[0,-5],[-3,4],[-3,2],[-1,2],[0,9],[-1,7],[1,14],[0,5],[-1,6],[-2,5],[-2,0],[-3,-4],[-2,1],[0,14],[-2,12],[-1,3],[0,7],[1,-1],[2,-4],[3,-3],[1,-3]],[[8460,5845],[-3,0],[-2,3],[-2,7],[2,2],[2,-1],[2,-2],[1,-5],[0,-4]],[[8467,5851],[-1,-2],[-1,1],[-1,5],[1,1],[2,-5]],[[8401,5852],[4,-3],[3,3],[3,-1],[2,-4],[0,-2],[5,3],[2,0],[0,-6],[-1,-4],[0,-5],[-2,-5],[-1,-4],[-2,-4],[-3,-2],[-2,-5],[1,-3],[-1,-3],[-3,-2],[-4,-6],[-9,-4],[-6,-9],[-1,2],[1,8],[0,4],[-1,3],[3,19],[0,14],[1,18],[0,2],[-1,3],[-4,3],[0,4],[2,3],[3,-3],[6,-5],[3,-4],[2,-5]],[[8333,5857],[-2,-2],[-1,2],[0,4],[-2,11],[2,1],[3,-3],[1,-4],[0,-4],[-1,-5]],[[8335,5884],[1,-1],[1,1],[1,3],[1,-4],[2,-4],[0,-4],[-2,0],[-2,1],[-2,-2],[-3,1],[-3,10],[-1,1],[0,3],[1,1],[0,3],[1,0],[1,-3],[3,-4],[1,-2]],[[8406,5892],[-2,-1],[-5,10],[2,2],[3,0],[2,-4],[1,-3],[-1,-4]],[[8478,5905],[1,-5],[1,-3],[0,-4],[1,-2],[1,0],[2,-2],[2,-3],[-1,-4],[0,-4],[-1,-6],[0,-11],[1,-3],[0,-10],[3,-13],[-1,-2],[0,-2],[1,-1],[2,-4],[2,-5],[-1,-1],[-1,4],[-2,0],[-5,-1],[-3,2],[-3,0],[-2,7],[-2,1],[-1,4],[-3,7],[0,5],[1,5],[1,3],[0,4],[-2,-1],[-3,6],[-4,10],[-4,3],[-3,4],[-1,6],[-2,9],[-1,9],[8,-2],[7,0],[9,2],[3,-2]],[[8435,5891],[6,-7],[3,-11],[1,-9],[-1,-4],[-1,4],[-4,5],[-4,3],[1,3],[-2,2],[0,1],[-2,2],[-2,6],[-2,1],[-1,-1],[-7,-16],[0,3],[1,8],[1,12],[1,4],[-1,6],[0,5],[3,-2],[6,-6],[0,-2],[4,-7]],[[8396,5905],[-1,-2],[-1,4],[1,2],[1,-1],[0,-3]],[[8390,5895],[-2,-14],[-2,5],[1,3],[-2,5],[2,6],[1,9],[2,3],[1,-2],[0,-5],[-1,-10]],[[8437,5901],[0,-5],[-1,1],[-3,10],[-1,4],[1,2],[2,-3],[2,-9]],[[8423,5924],[0,-3],[-3,4],[-3,7],[-3,3],[0,3],[3,1],[4,-12],[2,-3]],[[8352,5960],[1,-1],[4,2],[2,-1],[1,-3],[2,-1],[1,-2],[2,3],[3,-3],[2,-7],[2,-4],[2,-3],[1,-3],[-2,-4],[0,-10],[2,-12],[-1,-3],[-2,-4],[-1,-5],[0,-7],[-1,1],[-4,-6],[-3,2],[0,3],[-2,3],[-2,5],[-1,4],[0,4],[-2,7],[-2,3],[0,2],[-1,3],[0,7],[-2,10],[-1,2],[-2,2],[-2,3],[-1,3],[0,5],[-2,0],[-2,1],[2,6],[2,0],[5,-1],[2,-1]],[[8385,5963],[2,0],[4,-4],[0,-6],[-2,-5],[0,-2],[-1,-2],[-4,4],[-1,3],[-1,6],[2,8],[1,-2]],[[8340,5975],[0,-4],[-5,6],[0,4],[3,-2],[2,-4]],[[8453,5968],[-1,-3],[-2,1],[-2,-3],[-3,4],[-1,3],[3,8],[0,13],[2,3],[3,-7],[0,-1],[3,-4],[-1,-7],[0,-4],[-1,-3]],[[8392,5992],[0,-2],[-6,9],[0,4],[6,-11]],[[8388,6048],[0,-3],[-1,-4],[1,-8],[-1,-5],[-1,-1],[-1,1],[0,3],[1,1],[-1,4],[-1,2],[0,5],[-1,2],[0,4],[4,1],[1,-2]],[[8363,6256],[4,-3],[9,-11],[7,-5],[3,-1],[3,3],[1,2],[2,7],[2,1],[2,-6],[0,-9],[-2,-5],[-1,-5],[-1,-18],[0,-10],[2,-8],[1,-3],[3,-3],[0,-6],[1,-3],[3,-3],[-1,-4],[0,-4],[-2,-10],[-5,-22],[-3,-14],[-4,-2],[-8,-8],[-3,-5],[-1,-6],[2,-6],[0,-3],[-1,-3],[-3,-6],[-1,-6],[-1,-2],[0,-6],[1,-3],[3,-13],[3,-12],[1,-1],[0,-2],[-2,-3],[0,-6],[1,-6],[3,-14],[0,-4],[2,-6],[2,-2],[5,-4],[3,-1],[1,2],[2,1],[-1,3],[-2,4],[0,2],[5,7],[3,3],[4,0],[4,-2],[2,-2],[2,-3],[3,-7],[1,-7],[0,-9],[1,-3],[4,0],[2,5],[0,6],[-1,2],[0,3],[1,2],[2,-2],[1,-3],[6,-4],[1,0],[4,-4],[1,-2],[-1,-4],[-6,-1],[-1,-4],[1,-7],[3,-5],[2,-5],[1,-4],[0,-5],[-1,-5],[3,1],[2,-1],[3,-4],[2,0],[0,-14],[-2,-13],[-3,2],[-2,5],[0,7],[2,6],[-1,2],[-5,-3],[-3,1],[-6,7],[-3,1],[-1,3],[1,6],[-3,8],[0,3],[-1,3],[-8,8],[0,2],[-3,7],[-5,9],[-3,2],[0,-7],[1,-3],[-1,-3],[3,-9],[0,-2],[2,-7],[0,-8],[-2,-4],[-2,4],[0,3],[-3,10],[-1,2],[-5,7],[-3,8],[-10,10],[-6,-6],[-2,-3],[0,-5],[-3,-4],[-4,0],[-3,2],[-2,5],[-2,0],[-3,7],[-3,1],[-2,-6],[-1,11],[0,12],[2,5],[7,12],[0,9],[-1,4],[-5,3],[-4,6],[-1,-6],[1,-10],[0,-7],[-1,-2],[-3,1],[-1,2],[-1,7],[-2,4],[-1,6],[-1,1],[-2,0],[-2,3],[-1,7],[0,8],[-2,13],[-1,5],[-1,24],[0,2],[-1,1],[-3,9],[1,12],[0,2],[1,2],[3,-5],[3,-3],[2,-7],[1,-1],[4,0],[2,3],[1,3],[0,4],[-2,10],[-1,7],[0,7],[1,7],[2,11],[1,8],[-1,10],[1,6],[0,4],[-2,5],[0,6],[4,30],[2,12],[1,8],[6,6],[3,-1],[5,2]],[[8385,6272],[-1,-5],[-1,2],[1,4],[0,4],[2,1],[1,-3],[-2,-3]],[[8367,6282],[0,-3],[-2,2],[0,5],[1,2],[1,-2],[0,-4]],[[8374,6299],[1,-6],[-2,0],[-3,4],[0,3],[1,1],[3,-2]],[[8386,6356],[-1,0],[1,5],[1,2],[1,-1],[-2,-6]],[[8384,6380],[-1,-4],[-1,0],[1,8],[1,0],[0,-4]],[[8737,5608],[-1,-1],[-1,5],[0,5],[1,4],[2,1],[0,-7],[-1,-3],[0,-4]],[[9263,4522],[5,-3],[2,-3],[-2,-2],[-4,-1],[-1,2],[-4,2],[-1,4],[0,2],[-3,3],[-1,3],[0,2],[3,-2],[6,-7]],[[9284,4529],[-1,-2],[-3,-2],[-2,1],[-1,2],[0,2],[3,-1],[-1,3],[4,-2],[1,-1]],[[9190,4575],[0,-5],[-3,3],[0,2],[2,1],[1,-1]],[[9195,4606],[1,0],[2,4],[2,2],[1,-2],[-2,-14],[-1,2],[-6,4],[0,5],[-2,2],[-1,5],[-2,6],[0,4],[1,-1],[1,-4],[5,-8],[0,-3],[1,-2]],[[9180,4645],[4,-5],[2,2],[1,-1],[3,-6],[0,-9],[-1,1],[-5,0],[-3,2],[-4,0],[2,4],[0,1],[-2,6],[0,4],[3,1]],[[9175,4636],[-1,-1],[-1,1],[-5,8],[1,6],[2,3],[3,-3],[1,-5],[0,-9]],[[9238,4667],[2,-1],[3,1],[1,-4],[2,-1],[2,-3],[0,-3],[-3,-4],[-3,3],[-1,0],[-2,7],[-4,2],[2,3],[1,0]],[[8987,4686],[-3,1],[-4,6],[3,0],[4,-7]],[[9196,4680],[-2,1],[1,5],[0,4],[-2,2],[1,5],[2,1],[0,-6],[1,-2],[-1,-10]],[[8987,4695],[-1,0],[-5,3],[-1,3],[5,0],[2,-1],[0,-5]],[[9110,4848],[-1,2],[-3,2],[-2,7],[0,8],[1,0],[6,-7],[1,-2],[-1,-7],[-1,-3]],[[9331,4798],[-1,-5],[-1,1],[-3,-2],[-2,-4],[-3,0],[-5,5],[-2,3],[-3,6],[-1,5],[1,7],[-1,6],[-5,4],[-1,2],[-2,6],[-4,7],[-1,3],[-1,6],[0,4],[1,12],[0,6],[2,-3],[2,-2],[3,-1],[3,-4],[2,-9],[1,-3],[0,-3],[3,-3],[4,-13],[3,-3],[2,-1],[3,-4],[4,-10],[2,-13]],[[9087,4870],[-2,0],[-2,6],[-1,2],[0,2],[4,4],[2,-3],[0,-8],[-1,-3]],[[9294,4870],[-2,13],[0,4],[-1,2],[3,6],[1,-3],[0,-5],[2,-4],[-1,-10],[-2,-3]],[[9055,4911],[-2,-2],[-2,2],[0,7],[3,4],[1,-2],[1,-4],[-1,-5]],[[9218,4936],[2,-1],[4,6],[2,-5],[3,-2],[3,-1],[-1,-8],[0,-4],[1,-4],[0,-6],[-1,-5],[-3,-8],[-3,-2],[-4,-1],[-1,-4],[1,-4],[4,-12],[-2,-6],[-3,-4],[-3,-2],[-5,1],[-5,-1],[-1,-2],[0,-6],[-1,-3],[-6,-10],[-3,-4],[-5,-2],[-3,-2],[-3,-5],[-3,-2],[-5,-5],[-6,-1],[-10,0],[-3,-1],[-2,1],[-2,2],[-3,8],[-3,2],[-3,0],[-4,-3],[-1,1],[-8,12],[-2,2],[-9,6],[-2,6],[0,7],[3,4],[3,-2],[2,0],[1,1],[2,0],[1,-1],[6,1],[4,-2],[3,-3],[7,0],[4,4],[1,-1],[5,0],[3,5],[2,17],[1,6],[1,2],[1,-1],[1,-3],[-2,-4],[0,-2],[-1,-8],[1,-6],[2,-6],[4,-1],[2,4],[4,1],[3,-4],[3,1],[1,2],[5,3],[2,6],[1,7],[2,5],[5,9],[2,1],[5,0],[3,3],[0,7],[-1,7],[-3,17],[0,3],[1,3],[0,2],[4,0],[3,-1],[2,-4]],[[9267,4947],[-2,0],[1,3],[1,1],[0,-4]],[[9239,5003],[0,-5],[-2,3],[-1,4],[1,2],[2,1],[0,-5]],[[9224,5014],[-1,-3],[-1,0],[-2,5],[0,3],[4,-5]],[[9220,5020],[-1,0],[0,7],[2,-1],[0,-5],[-1,-1]],[[8915,4987],[0,35],[0,11]],[[8915,5033],[3,0],[2,-1],[14,-13],[6,-6],[3,0],[6,-7],[9,-7],[10,-7],[6,-2],[7,-2],[4,-2],[5,-9],[3,-2],[2,-5],[5,-6],[2,0],[3,-1],[4,1],[3,-1],[1,-2],[3,-8],[3,-2],[3,-4],[3,-5],[2,-5],[2,-4],[3,-2],[4,0],[12,-26],[0,-20],[-1,-13],[3,-4],[4,-1],[6,-3],[5,-4],[18,-18],[2,-1],[4,-1],[3,1],[2,-1],[2,-4],[2,-2],[2,-5],[2,-6],[2,-3],[1,-4],[1,-10],[-1,-6],[-1,-3],[-2,-1],[-10,-1],[-7,1],[-4,-6],[0,-6],[4,-14],[2,-12],[2,-5],[6,-8],[2,-6],[5,-9],[3,-4],[3,-2],[5,-7],[1,-4],[1,-10],[1,-7],[0,-3],[5,-9],[1,-1],[2,-15],[2,-6],[3,-2],[3,0],[8,4],[3,-1],[1,-2],[1,-7],[-2,-6],[0,-7],[2,-5],[4,-4],[2,-1],[7,-1],[4,-1],[3,-2],[1,-2],[-1,-3],[-2,-1],[-2,0],[-2,-3],[0,-3],[1,-4],[3,-6],[1,-1],[4,-2],[3,-2],[4,-4],[5,-1],[4,-2],[-1,-5],[-5,2],[-1,-2],[2,-5],[3,-4],[1,-2],[-1,-2],[-3,-4],[-2,-1],[-3,0],[-5,2],[-3,2],[-2,6],[-3,4],[-3,3],[-2,1],[-3,0],[-6,3],[-11,2],[-3,1],[-3,4],[-2,0],[-2,-1],[-4,-1],[-2,1],[-3,3],[-3,1],[-1,-1],[-2,0],[-4,2],[-4,1],[-2,4],[-2,3],[-2,2],[-1,7],[-3,7],[-3,6],[-6,8],[-2,3],[-2,8],[0,9],[-2,0],[-5,3],[-1,5],[-3,11],[-2,6],[-5,11],[-1,7],[-3,7],[-2,6],[-1,2],[-6,5],[-2,2],[-5,1],[-3,1],[-5,3],[-2,2],[-3,0],[-5,3],[-1,3],[0,6],[-3,-1],[-7,4],[-2,-1],[0,-5],[-3,1],[0,-1],[-2,-2],[-1,-3],[-2,0],[-5,3],[-2,2],[-2,4],[-2,3],[-1,0],[6,-22],[-1,-1],[-2,1],[1,-5],[-3,0],[-3,2],[-3,0],[0,-2],[2,-10],[-5,-2],[-4,-2],[-6,-2],[-5,-1],[-2,2],[-3,1],[-3,-1],[-2,-2],[-3,0],[-1,4],[0,3],[-1,2],[-1,-2],[2,-7],[2,-3],[3,2],[6,0],[6,-6],[3,-2],[3,-5],[2,-6],[3,-8],[0,-6],[-1,-3],[-4,-4],[-4,-3],[-12,-14],[-3,1],[-3,4],[-4,3],[-2,1],[-7,-2],[-9,0],[-3,1],[-3,2],[-4,-1],[-2,-2],[-2,-1],[-4,6]],[[9248,4909],[-2,-4],[-2,4],[-1,4],[-2,3],[-1,8],[0,13],[-1,8],[-2,8],[-6,19],[-2,5],[-4,5],[-4,2],[-1,0],[-3,3],[-2,4],[-6,11],[-3,3],[-2,3],[-9,12],[-3,3],[-3,0],[-3,3],[2,1],[1,4],[4,-3],[5,-5],[1,-5],[3,0],[4,-4],[6,-8],[3,-5],[7,-5],[4,-9],[4,-7],[1,-3],[18,-30],[3,-9],[0,-8],[-2,-5],[0,-5],[-2,-11]],[[9177,5030],[-5,-1],[-2,1],[-2,3],[-2,6],[-2,2],[4,4],[4,1],[5,-5],[1,-2],[0,-7],[-1,-2]],[[9106,5052],[-1,-3],[-1,1],[0,3],[1,1],[1,-2]],[[9084,5070],[9,-3],[1,0],[0,-2],[-1,-1],[-2,0],[-1,-1],[-2,-5],[-2,1],[-2,-2],[-4,0],[-5,3],[-1,-2],[-2,0],[-2,-2],[-1,0],[0,5],[2,1],[0,5],[1,3],[3,-1],[3,2],[6,-1]],[[9159,5094],[0,-2],[-3,1],[-3,6],[0,3],[1,3],[1,0],[3,-4],[1,-7]],[[5655,8151],[2,-7],[-1,-5],[2,-3],[4,-8],[3,-11],[4,-5],[-4,-4],[2,-3],[1,-6],[0,-5],[-1,-1],[-2,-6],[-7,-2],[-6,-9],[-3,-3],[-4,-6],[-6,-10],[-3,-4],[-1,-3],[-7,-13],[0,-4],[2,-7],[0,-11],[1,-2],[3,-3],[-1,-3],[-8,3]],[[5625,8010],[-2,0],[-7,4],[-5,4],[-2,5],[-2,2],[-7,4],[-8,1],[-8,0],[-2,-5],[-3,-1],[-4,3],[-3,1],[-7,0],[-6,-4],[-2,-3],[-1,-5],[-4,2],[-1,-1],[-3,0],[1,4],[0,3],[-2,4],[-2,0],[-2,3],[-1,4],[-3,5],[-5,-5],[-3,-6],[-5,-1],[0,3],[-1,3],[-3,1]],[[5395,8278],[6,-3],[3,4],[-1,4],[-9,3]],[[5394,8291],[5,-2],[9,6],[16,7],[17,6],[8,2],[1,3],[2,1],[2,5],[5,7],[9,2],[3,3],[7,5],[17,5],[6,1],[7,0],[6,-4],[6,-5],[-2,-1],[-7,5],[4,-14],[3,-5],[4,-3],[4,-1],[12,2],[6,4]],[[5544,8320],[1,-1],[7,0],[8,-1],[26,-2],[29,-2],[16,0]],[[3114,6224],[-2,1],[0,2],[2,0],[0,-3]],[[3182,6226],[-4,0],[0,2],[2,2],[5,-2],[-3,-2]],[[3162,6246],[2,-1],[0,2],[5,-1],[4,-3],[3,-1],[0,-8],[-2,-3],[-4,-8],[-3,-4],[-5,-2],[-4,0],[-1,1],[-2,-1],[-3,2],[-8,0],[-1,-2],[-4,0],[-1,1],[-4,0],[-1,2],[0,13],[-2,6],[0,2],[2,4],[1,4],[2,1],[7,-2],[18,-1],[1,-1]],[[8624,7633],[1,-3],[3,-6],[0,-3],[1,-1]],[[8629,7620],[-2,-2],[-1,1],[-4,1],[-6,-7],[-1,-5],[-3,-3],[-2,-3],[-4,-11],[-3,-5],[-2,-7],[0,-6],[2,-6],[0,-5],[-1,-10],[1,-11],[-1,-4],[-11,-8],[-6,-13],[-5,-4],[-2,-4],[-4,-2],[-3,-7],[-3,-4],[-3,-3],[-2,-3],[-6,0],[-4,-2],[-2,-6],[-9,-6],[-1,-5],[1,-8],[0,-6],[-1,-5],[-2,2],[-2,-6],[0,-5],[6,-4],[3,-1],[2,-3],[5,-10],[5,-5],[3,-4],[4,-7]],[[8516,7359],[-7,6],[-5,-3],[-1,-4],[-1,-1],[-2,8],[-3,0],[-5,6],[-2,-1],[0,-3],[-3,-6],[-4,-5],[-2,0],[-1,7],[-6,2],[-2,3],[4,6],[2,1],[-1,2],[-6,0],[-3,2],[-3,-1],[-3,1],[5,6],[1,4],[0,3],[2,8],[3,4],[6,6],[3,1],[3,0],[1,1],[-3,3],[-4,0],[-3,3],[-1,4],[7,24],[-1,8],[0,6],[-7,4],[-7,6],[-2,3],[-1,-1],[-1,-6],[-2,-1],[-2,10],[-5,4],[-1,3],[1,5],[-1,0]],[[4522,7076],[3,-3],[4,2],[4,-4],[2,-1],[-4,-6],[-5,1],[-4,3],[-2,5],[2,3]],[[4304,7312],[0,-1],[-4,0],[-1,3],[1,2],[2,0],[2,-4]],[[4287,7363],[1,-1],[9,1],[3,0],[-1,-5],[-1,-1],[-6,-1],[-8,2],[-3,4],[0,4],[2,1],[4,-4]],[[4217,7398],[-2,-4],[-3,2],[-3,0],[-2,3],[-1,3],[1,2],[3,0],[7,-6]],[[4203,7402],[-2,0],[-3,5],[4,2],[2,-3],[-1,-4]],[[4247,7409],[-6,1],[-2,2],[-1,4],[4,2],[4,0],[2,-3],[0,-4],[-1,-2]],[[4134,7453],[-1,-3],[-3,2],[1,6],[1,2],[2,-3],[0,-4]],[[4793,7325],[-2,-1],[-10,-9],[-3,0],[-5,4],[-10,1],[-3,1],[-4,-2],[-3,0],[-2,-4],[-2,1],[2,8],[3,15],[0,10],[1,8],[-1,8],[-2,5],[3,13],[-1,6],[-2,9],[6,-2],[-3,6],[-2,-1],[-2,1],[-5,-4],[-2,-1],[-1,1],[0,5],[-1,7],[2,2],[2,0],[4,6],[-1,6],[2,6],[-1,1],[-4,-11],[-1,-5],[-3,-2],[-3,-1],[-3,2],[0,7],[1,6],[2,17],[0,5],[1,3],[2,2],[3,7],[4,16],[5,17],[-2,4],[1,4],[2,20],[3,9],[0,9],[1,7],[-1,3],[0,4],[-2,7],[-2,16],[0,5],[2,3],[-3,0],[-1,4],[0,4],[3,6]],[[5949,6987],[8,16]],[[1213,4115],[-2,2],[-2,1],[0,2],[3,-3],[1,-2]],[[852,4164],[4,-2],[0,-5],[-1,-3],[-2,1],[-1,2],[-1,5],[-4,-1],[-3,1],[-1,7],[0,3],[1,2],[2,2],[4,-2],[1,-4],[1,-6]],[[838,4173],[-1,-2],[-2,3],[0,3],[3,0],[1,-1],[-1,-3]],[[794,4211],[-2,0],[-1,1],[1,7],[2,-2],[1,-5],[-1,-1]],[[792,4224],[-1,0],[0,5],[2,-3],[-1,-2]],[[1148,4578],[-1,-1],[0,6],[2,-2],[-1,-3]],[[1137,4611],[-2,-4],[0,5],[2,-1]],[[1138,4625],[4,-3],[0,-3],[-4,-1],[-2,-2],[-1,1],[-1,4],[4,4]],[[1108,4640],[-1,3],[2,3],[1,-1],[-2,-5]],[[1123,4668],[-2,0],[0,4],[1,1],[2,-2],[-1,-3]],[[1108,4670],[-2,-1],[-2,0],[-1,5],[1,3],[5,-1],[0,-4],[-1,-2]],[[6423,6601],[-5,-3],[-2,0],[-2,2],[-4,11]],[[6410,6611],[1,6],[-2,16],[0,16],[3,10],[1,6],[3,15],[3,5],[4,5],[3,-9],[5,-6],[0,-7],[-1,-5],[-1,-10],[1,-4],[0,-3],[2,-14],[0,-11],[-2,-4],[-3,-13],[0,-1],[-4,-2]],[[5630,7731],[-1,1],[-1,4],[-2,1],[-2,6],[0,3],[1,3],[2,1],[3,0],[0,3],[-6,5],[-4,-1],[-4,-7],[-3,-1],[-2,4],[-3,3],[-5,1],[-3,2],[-3,4],[-5,2],[1,3],[4,0],[0,3],[-2,1],[-3,3],[2,2],[0,3],[2,2],[0,2],[-3,3],[-4,2],[-3,3],[-1,0],[-4,4],[-2,4],[-3,3],[0,16],[-2,-1],[-3,7],[-4,4],[-3,2],[-1,5],[-2,3]],[[5634,7945],[5,3],[1,3],[3,2],[6,-6],[7,1],[10,-4],[1,1],[4,-2],[2,0],[6,2],[3,-1],[7,-10],[1,-2],[3,0],[2,1],[3,5],[8,5],[7,1],[13,4],[2,4],[2,8],[7,2],[1,1]],[[5783,7801],[3,-6],[3,-3],[9,-3],[0,4],[4,-1],[9,6],[5,1],[4,-2],[3,-4],[1,-3]],[[5824,7790],[0,-4],[-1,-2],[-1,-10],[-2,-8],[-14,-5],[1,3],[-1,4],[0,3],[1,3],[-3,1],[-3,-4],[1,-7],[-2,-5],[0,-5],[1,-3],[-1,-4],[-4,-8],[-1,-4],[0,-18],[-2,-11],[0,-3]],[[9074,7703],[-1,-2],[-2,2],[0,4],[6,3],[2,-2],[0,-2],[-5,-3]],[[9060,7746],[4,-4],[6,1],[-2,-4],[-2,0],[-4,-5],[-5,-2],[-5,-8],[-1,-4],[-3,-6],[-5,-5],[-1,-11],[-3,4],[-1,5],[1,3],[6,8],[7,15],[5,13],[3,0]],[[9126,7794],[-5,-5],[-4,-1],[-10,-13],[-3,-2],[-4,1],[-1,-2],[0,-3],[-1,-3],[-7,-9],[-3,-7],[-3,-2],[-6,-7],[1,6],[1,3],[5,6],[0,6],[3,5],[5,5],[3,7],[3,2],[3,5],[4,2],[-1,5],[2,4],[1,0],[2,-7],[8,1],[8,12],[4,3],[2,-3],[-1,-4],[1,-3],[-1,-2],[-6,0]],[[6332,7803],[-1,-1],[-1,6],[0,3],[1,1],[1,-5],[0,-4]],[[9157,7812],[-5,-3],[-2,0],[6,15],[4,2],[4,8],[11,11],[6,0],[-9,-11],[-1,-5],[-4,-5],[-3,-1],[-7,-11]],[[9221,7884],[-5,-6],[-2,0],[-1,4],[4,1],[5,8],[3,6],[2,2],[2,0],[-8,-15]],[[9251,7934],[-1,-3],[-2,1],[2,4],[1,-2]],[[9279,7994],[-1,-3],[-2,2],[3,3],[1,4],[3,-1],[-1,-2],[-3,-3]],[[9299,8024],[-3,-3],[-3,2],[0,5],[6,15],[2,-1],[0,-4],[-2,-5],[0,-9]],[[9330,8081],[-4,-6],[-8,-3],[-1,-4],[-2,-2],[-3,1],[-1,2],[0,6],[-1,5],[3,0],[3,4],[7,2],[3,5],[3,12],[3,4],[3,1],[0,-13],[-5,-14]],[[9343,8101],[-2,-1],[-4,4],[1,4],[4,5],[3,0],[0,-7],[-2,-5]],[[9322,8111],[-3,-1],[-1,1],[-1,5],[3,1],[2,-1],[0,-5]],[[8964,8316],[6,-14],[0,-7],[-2,-8],[5,-23],[4,-11],[2,-9],[1,-10],[0,-20],[-2,-8],[-2,-2],[0,-5],[-1,-16],[1,-8],[2,-5],[1,-6],[0,-7],[3,-6],[2,-7],[0,-7],[2,-2],[5,-43],[2,-13],[7,-22],[3,-13],[3,-20],[2,-8],[3,-7],[4,-7],[3,-4],[-2,-3],[-3,4],[-3,6],[-4,5],[-4,8],[-4,4],[-7,2],[-14,-3],[-3,-4],[-2,-5],[-2,-11],[-9,-39],[-2,-10],[-1,-11],[1,-8],[0,-3],[3,-9],[3,-7],[2,-1],[2,-4],[2,-6],[2,-13],[3,-9],[1,-2],[5,0],[2,-3],[2,-10],[1,-12],[-3,-11],[-2,3],[-1,7],[0,7],[-2,5],[-7,2],[-6,1],[-4,6],[-3,-1],[-3,-3],[-2,-5],[-1,-6],[-2,-6],[-2,-15],[-4,-10],[-2,3],[-2,7],[0,5],[-3,16],[1,14],[4,19],[1,7],[0,6],[-1,5],[-1,12],[1,9],[4,11],[1,7],[-1,16],[-3,10],[-4,11],[-1,5],[3,13],[2,6],[1,14],[2,14],[0,43],[-2,12],[0,7],[2,14],[2,7],[0,13],[-3,12],[-3,5],[-3,6],[-5,6],[3,3],[-3,4],[-1,5],[0,24],[4,11],[2,28],[-1,6],[-1,12],[4,6],[5,3],[5,-6],[6,3],[1,5],[-2,3],[1,4],[4,1],[-1,3],[2,10],[-1,4],[-6,10],[-4,8],[6,0],[2,1],[4,5]],[[9666,8326],[1,-3],[-16,16],[-1,4],[2,0],[2,-3],[3,-2],[5,-5],[4,-7]],[[8809,8357],[-3,-10],[-3,0],[-2,2],[-3,-1],[-2,1],[2,3],[6,5],[2,-1],[3,1]],[[8830,8357],[3,-3],[4,1],[1,-2],[-3,-2],[-3,-6],[0,-4],[-1,-2],[-3,-2],[-5,-6],[-4,10],[-2,3],[-5,-5],[-1,0],[1,6],[4,7],[4,11],[9,-5],[1,-1]],[[5544,8320],[4,5],[3,5],[2,7],[0,4],[1,6],[3,2],[9,-1],[3,3],[9,14],[1,3]],[[5581,8367],[-10,-17],[5,-2],[3,-2],[9,1],[0,10],[1,9]],[[9628,8342],[0,-8],[-4,4],[-1,3],[-4,2],[-6,10],[-2,6],[-2,3],[-6,6],[5,3],[8,-1],[1,-1],[-1,-4],[1,-4],[6,-13],[3,-2],[2,-4]],[[9182,8583],[-3,-1],[-1,3],[4,2],[3,0],[-3,-4]],[[9544,8559],[-5,-6],[-1,4],[4,4],[5,9],[1,8],[-1,4],[13,5],[8,8],[2,-1],[2,-6],[0,-8],[-1,-5],[-9,-3],[-9,-5],[-9,-8]],[[5994,8938],[1,-6],[-1,-3],[1,-2],[-2,-1],[-3,5],[-2,0],[-2,5],[2,0],[3,3],[3,-1]],[[6944,9014],[-5,-1],[-5,4],[-5,9],[0,2],[4,-1],[5,0],[7,-2],[0,-6],[1,-1],[-2,-4]],[[6185,9025],[-1,-1],[-5,3],[-1,2],[3,2],[4,-4],[0,-2]],[[6395,9168],[1,-5],[-2,-3],[-2,0],[0,3],[-2,2],[-4,-4],[-3,-5],[-6,-6],[-12,-5],[-14,-3],[-7,4],[-4,11],[0,11],[1,5],[3,4],[6,6],[9,4],[7,0],[22,-12],[4,-3],[3,-4]],[[6870,9188],[-3,-5],[-4,0],[-2,2],[5,6],[3,0],[1,-3]],[[9484,9152],[0,5],[-3,3],[-5,2],[-2,7],[1,8],[-2,4],[1,4],[6,4],[5,5],[3,-2],[0,-6],[-2,-3],[-5,-2],[0,-12],[1,-5],[3,-5],[0,-6],[-1,-1]],[[9699,9191],[-8,-1],[-16,6],[-6,3],[-10,7],[1,2],[7,6],[4,2],[4,0],[28,-8],[2,-1],[0,-5],[-3,0],[-1,-2],[-1,-8],[-1,-1]],[[6678,9211],[1,-2],[0,-6],[-1,-4],[-3,0],[-4,-2],[-5,2],[-8,-1],[-4,2],[0,3],[-2,4],[-4,2],[-3,0],[-3,2],[-4,-3],[-2,1],[-7,9],[-6,13],[1,3],[5,2],[3,4],[7,2],[1,-2],[10,-7],[5,-6],[21,-14],[2,-2]],[[9463,9263],[-6,-1],[-2,2],[0,5],[4,-1],[4,-5]],[[6468,9294],[5,-8],[2,1],[2,-5],[-5,-7],[2,-3],[-2,-1],[-2,5],[-5,3],[-1,4],[-6,4],[-7,1],[-1,4],[8,3],[7,1],[3,-2]],[[8831,9302],[-7,-5],[-7,4],[-5,-2],[-6,3],[0,2],[6,2],[15,1],[4,-5]],[[0,9304],[8,2],[8,-1],[8,2],[7,-1],[12,-2],[8,-4],[9,-8],[7,-3],[2,-4],[-1,-3],[-8,-5],[-7,-2],[-13,-1],[-17,-5],[-10,-1],[-6,3],[-7,1],[9995,-1],[-6,-4],[-14,-1],[-8,-3],[-2,0],[-5,13],[8,10],[9,5],[9,8],[5,1],[4,3],[-9995,1]],[[7155,9347],[-13,0],[-7,1],[0,3],[10,7],[3,5],[6,4],[4,0],[15,-5],[3,-4],[-6,-4],[-4,-1],[-7,-5],[-4,-1]],[[7207,9372],[-2,-1],[-15,3],[-7,5],[1,3],[14,11],[5,-3],[5,-7],[0,-8],[-1,-3]],[[7073,9381],[-7,2],[-9,6],[3,5],[11,1],[10,-3],[-6,-2],[-3,-4],[2,-3],[-1,-2]],[[8339,9393],[-7,-2],[-6,0],[-4,4],[3,2],[6,1],[8,-4],[0,-1]],[[6536,9406],[12,-3],[10,0],[8,-3],[-1,-4],[-5,-6],[-1,-3],[1,-4],[-3,-7],[-8,0],[-5,-11],[-5,-1],[-2,-7],[1,-9],[3,-5],[-3,-6],[-1,-6],[-2,-4],[5,-4],[4,-10],[5,-11],[18,-23],[12,-10],[5,-3],[12,-5],[4,-4],[-5,-4],[-6,-1],[0,-2],[-3,-1],[-14,3],[-3,5],[-7,-1],[8,-7],[-4,-1],[-8,5],[-1,-2],[-4,2],[-1,-2],[-6,1],[0,3],[-13,-1],[-10,0],[-6,4],[-1,-4],[-8,4],[-17,4],[-9,3],[2,2],[4,1],[-1,8],[3,2],[5,-1],[-1,3],[3,1],[4,-2],[2,1],[-7,4],[-9,6],[1,2],[-3,1],[-3,-1],[-2,4],[0,4],[3,3],[-2,1],[-12,-3],[-7,1],[-7,2],[-7,-3],[-6,-1],[-4,1],[-6,5],[-2,4],[-3,10],[1,7],[4,7],[6,5],[7,-1],[8,1],[3,6],[4,2],[2,3],[1,6],[4,6],[-1,2],[3,5],[-7,1],[-4,3],[1,3],[7,5],[6,2],[6,-1],[3,1],[-3,3],[-2,8],[2,5],[3,2],[8,2],[3,2],[9,-1],[7,1],[13,5],[9,-1],[6,-3]],[[6962,9393],[-8,-2],[-7,0],[-3,-1],[-3,3],[3,8],[-1,8],[4,5],[22,4],[6,-2],[6,-7],[2,-1],[6,-7],[-1,-3],[-20,-3],[-6,-2]],[[7131,9414],[-3,-1],[-12,2],[-4,3],[5,2],[14,-6]],[[7096,9414],[-3,1],[5,4],[10,2],[3,-1],[-6,-6],[-9,0]],[[8948,9440],[13,-6],[19,-13],[4,-7],[0,-12],[-1,-1],[-7,0],[-17,2],[-6,0],[-21,3],[-24,8],[-10,-1],[-13,-5],[-3,0],[-3,5],[6,1],[7,0],[6,2],[6,4],[3,4],[5,9],[6,5],[6,0],[17,3],[7,-1]],[[8458,9437],[-5,1],[-1,3],[6,1],[3,-3],[-3,-2]],[[7320,9450],[-4,-2],[-7,2],[-10,1],[3,2],[6,1],[11,-1],[1,-3]],[[7296,9451],[-2,-2],[-7,2],[-1,2],[5,2],[3,-1],[2,-3]],[[8782,9441],[-2,-2],[-12,10],[-2,4],[-5,3],[-2,4],[7,-2],[11,-7],[7,-6],[-2,-4]],[[8916,9446],[-14,-5],[-3,0],[-6,5],[-3,10],[3,3],[6,2],[15,0],[2,-1],[2,-5],[-2,-9]],[[7353,9472],[-1,-3],[-8,1],[-1,2],[8,3],[5,0],[-3,-3]],[[8148,9469],[-3,-8],[-2,-2],[-6,-2],[-5,-6],[-17,3],[-15,7],[-4,5],[2,1],[8,0],[2,1],[4,9],[34,-6],[2,-2]],[[7406,9502],[2,-1],[7,2],[4,-3],[-3,-5],[-3,-2],[-15,2],[-3,2],[2,3],[9,2]],[[7281,9527],[2,-4],[-5,0],[-10,-4],[-5,5],[6,5],[6,-2],[-1,5],[7,1],[0,-6]],[[9076,9525],[8,-1],[12,5],[26,-2],[2,-2],[-1,-6],[3,-2],[8,-1],[6,2],[28,-2],[12,-7],[6,4],[2,-1],[-5,-12],[-9,-4],[-13,-5],[-7,-1],[-15,0],[-21,2],[-6,1],[-13,8],[-13,2],[-12,7],[-16,5],[3,11],[5,9],[3,2],[6,-4],[1,-8]],[[8775,9527],[-6,-2],[-8,1],[4,10],[-1,4],[4,12],[3,-3],[1,-4],[9,-7],[-6,-7],[2,-3],[-2,-1]],[[9245,9568],[-2,-2],[-7,3],[7,3],[2,-4]],[[8889,9551],[6,0],[3,-2],[3,-6],[3,-3],[6,0],[4,4],[-1,5],[1,8],[2,3],[8,4],[5,5],[7,-2],[20,-12],[13,-4],[7,-1],[10,3],[4,0],[43,-16],[3,-3],[-9,-3],[-6,-4],[-2,-3],[4,-5],[-13,-10],[-11,-3],[-11,2],[-6,0],[-6,2],[-7,6],[-6,7],[-1,6],[1,6],[4,1],[4,5],[-2,3],[-11,1],[-13,-4],[2,-11],[3,-7],[12,-14],[7,-2],[5,-6],[-9,-5],[-11,-3],[-6,4],[-5,6],[-7,-1],[-6,-2],[-35,-6],[-7,3],[-7,4],[-6,-3],[-3,-9],[-3,-4],[-7,-2],[-6,3],[-24,7],[-9,11],[-6,2],[-7,4],[-7,9],[1,5],[8,-1],[-2,12],[2,11],[2,2],[10,-1],[-6,9],[4,4],[4,2],[5,0],[7,5],[6,1],[11,4],[2,0],[9,-7],[8,-3],[15,-11]],[[7680,9577],[2,-3],[-7,-1],[-1,-5],[-6,2],[-7,0],[-5,2],[-10,1],[2,4],[6,-2],[5,3],[11,-2],[3,2],[7,-1]],[[7689,9572],[-3,0],[0,4],[3,5],[4,0],[2,-3],[-6,-6]],[[8123,9597],[5,-7],[-3,-3],[-7,5],[-4,0],[-5,5],[9,-1],[5,1]],[[7710,9595],[-5,0],[-3,5],[2,1],[6,-6]],[[9142,9599],[-21,-1],[1,2],[8,4],[15,0],[-3,-5]],[[6881,9574],[-24,-9],[-35,-10],[-25,-6],[-13,-4],[-14,-3],[-3,0],[-9,-4],[-8,-2],[-27,-8],[-13,-6],[-7,-1],[-6,-5],[-6,-3],[-7,-7],[-4,1],[-7,-3],[-1,-3],[6,-1],[0,-4],[-4,-2],[-2,-3],[-7,-3],[-7,1],[1,-7],[-5,-1],[-10,4],[-2,-4],[-1,-6],[-5,-3],[-11,2],[3,-10],[-1,-5],[-5,-6],[-19,-7],[3,-6],[0,-6],[-6,-2],[-5,4],[-5,-1],[5,-4],[2,-5],[-2,-3],[-9,-6],[-5,-8],[-9,-3],[-6,-1],[-11,3],[-13,1],[-8,2],[-7,3],[-7,0],[-13,-6],[-4,8],[2,3],[-11,9],[-2,4],[18,10],[7,1],[2,5],[8,8],[9,14],[2,1],[19,2],[1,1],[-5,3],[-8,1],[-2,4],[2,1],[7,8],[8,6],[8,4],[-4,3],[-10,-1],[-5,7],[6,4],[7,-1],[6,-4],[2,0],[9,8],[-2,5],[5,3],[9,0],[8,-2],[5,9],[9,5],[-1,4],[10,4],[12,7],[33,8],[2,5],[4,1],[13,1],[2,-2],[4,0],[3,3],[-1,6],[4,3],[17,1],[19,-4],[9,1],[5,-1],[15,5],[26,4],[7,2],[7,4],[7,1],[18,6],[6,8],[21,10],[12,2],[8,3],[13,-1],[13,-3],[6,-4],[6,-6],[1,-3],[-2,-3],[1,-5],[-10,-7],[-11,-10],[-11,-3]],[[7673,9620],[-12,-3],[-4,3],[-12,-1],[4,3],[12,2],[19,6],[1,-4],[-8,-6]],[[7485,9629],[-6,0],[-4,2],[4,5],[9,0],[2,-1],[-5,-6]],[[7982,9632],[-3,0],[-1,3],[3,3],[7,-1],[2,-3],[-8,-2]],[[6366,7852],[1,-2],[-4,-1],[0,-3],[-1,-2],[-7,-5],[-4,-1],[0,-4],[2,-6],[-2,-2],[-2,3],[-3,0],[-7,-9],[-2,-2],[-3,-1],[-7,-4],[-3,2],[-2,-2],[0,-4],[-4,6],[-1,-1],[2,-4],[0,-7],[-3,-4],[-1,-7],[-4,-15],[-3,-7],[-1,-5],[-2,3],[-2,-5],[-3,-4],[-2,-4],[-2,-8],[2,-5],[4,-2],[3,-3],[6,-8],[2,-5],[3,-19],[1,-13],[3,16],[2,3],[0,-5],[-2,-7],[-1,-10],[-1,-7],[1,-6],[0,-3],[-2,-11],[2,-4],[3,-4],[2,-5],[1,-7],[9,-19],[5,-10],[4,-13],[1,-2],[4,-5]],[[6109,7684],[-3,3],[-15,25],[-17,22],[-2,2],[-9,3],[-4,3],[-9,16],[-4,-2],[-3,0],[-3,2],[-4,5],[-1,7],[-3,4],[-7,5],[-8,4],[-1,3],[7,4],[2,2],[-6,5],[4,3],[7,-7],[3,-2],[1,2],[11,4],[0,6],[-1,0],[0,5],[1,5],[5,8],[3,12],[2,3],[3,-3],[2,5],[3,0],[3,-1],[2,1],[-5,9],[-6,9],[-3,-1],[-2,1],[-3,7],[-1,6],[3,0],[3,-1],[5,5],[2,0],[7,-2],[0,4],[-1,5],[5,3],[5,2],[9,7],[4,1],[0,4],[-2,9],[-5,0],[-3,-5],[-7,-2],[-3,0],[2,4],[-2,1],[-2,-3],[-8,-5]],[[6060,7896],[0,5],[2,3],[0,2],[-2,2],[0,2],[2,4],[0,9],[3,3],[4,0],[3,3],[2,3],[3,7],[2,1],[5,-1],[3,0],[6,-1],[10,1],[1,3],[0,4],[3,12],[2,4],[0,2],[-3,1],[1,4],[0,3],[-2,7],[-2,2],[-3,1],[2,9],[2,4],[3,-1],[3,1],[0,2],[-7,4],[-2,5],[2,2],[4,1],[2,4],[3,4],[2,6],[0,4],[-2,3],[0,4],[1,3],[-2,3],[-2,0],[-2,-2],[-3,1],[-9,9],[-4,0],[-4,7],[-4,-2],[-3,0],[-8,8],[-5,0],[-5,5],[-3,-1],[0,-5],[-3,-1],[-3,2],[-7,8],[-3,7],[0,4],[-5,7],[-2,0],[-6,-4],[-4,0],[-6,-3],[-4,-5],[-3,4],[-4,1],[-2,-1],[-5,8],[-3,0],[-3,1],[-3,-1],[-3,-4],[-2,1],[-2,5],[-3,5],[-1,4],[1,2],[0,7],[-1,2],[-1,6],[-1,3],[0,5],[-1,1],[-2,-1],[-3,5],[0,3],[-1,2],[-2,-1],[-4,0],[-4,-1],[-6,3],[-7,1],[-1,1],[2,3],[-2,6],[0,8],[-2,3],[0,4],[7,2],[1,2],[-1,2],[-8,11],[-2,10],[-3,6],[-3,4],[-2,1],[-8,0],[-4,1],[-4,-1],[-7,-5],[-7,1],[-4,2],[-2,0],[-2,-2],[-2,-9],[-5,-4],[-4,0],[-6,3]],[[5777,8609],[1,5],[0,5],[-1,4],[1,4],[2,0],[3,-4],[3,-2],[2,3],[1,5],[2,2],[2,-2],[4,-1],[4,0],[2,1],[2,5],[4,5],[14,-2],[13,-5],[1,5],[-5,4],[-3,5],[-4,4],[-5,1],[-5,-2],[-9,1],[-7,8],[-4,3],[-4,6],[3,1],[1,6],[-2,3],[-2,1],[-9,-6],[-11,-2]],[[5856,9203],[5,-1],[12,-5],[6,2],[3,6],[2,1],[4,-2],[1,2],[-2,4],[0,3],[12,-5],[5,-4],[10,-3],[2,-2],[0,-3],[-3,-4],[-4,0],[-16,4],[-3,-2],[2,-2],[5,-2],[1,-5],[7,1],[7,-2],[4,1],[-2,-5],[1,-1],[11,4],[2,-1],[-1,-9],[-2,-7],[3,-1],[5,9],[2,1],[15,1],[21,-6],[5,1],[3,2],[16,-4],[21,-11],[31,-18],[17,-16],[2,-4],[7,-1],[5,0],[20,-15],[7,-1],[-2,6],[2,0],[6,-8],[5,-4],[5,-7],[10,-5],[6,-2],[2,-15],[2,-3],[0,-7],[4,-3],[3,-1],[0,-5],[-3,-12],[-2,-5],[-19,-21],[-11,-9],[-23,-10],[-17,-3],[-8,0],[-13,1],[-8,2],[-9,6],[-9,2],[-6,2],[-11,0],[-28,7],[-15,11],[-9,-4],[-3,4],[2,2],[-9,3],[-7,0],[-3,3],[-5,2],[-3,-1],[-9,4],[-4,4],[-5,7],[3,3],[-15,4],[-14,1],[2,-2],[6,-1],[9,-6],[-1,-5],[11,-10],[2,-3],[7,-1],[1,-4],[-1,-2],[1,-3],[12,-5],[-2,-3],[-1,-4],[15,-5],[8,-6],[9,-10],[2,-5],[0,-6],[-5,-14],[-2,-4],[-3,-3],[3,-7],[4,-6],[4,-11],[0,-10],[4,-3],[-3,-3],[1,-8],[4,-7],[7,-5],[10,1],[4,-2],[10,-9],[4,-8],[2,-2],[10,-4],[7,-2],[11,-5],[2,0],[5,4],[10,4],[2,4],[0,4],[-2,7],[-1,6],[-3,3],[-3,1],[-12,-1],[-3,2],[-4,5],[-8,11],[-4,4],[-2,5],[0,6],[3,-1],[4,3],[2,11],[8,1],[10,-5],[14,-13],[3,-1],[8,0],[3,-4],[2,0],[13,-4],[14,-9],[5,1],[3,6],[6,5],[4,1],[5,-2],[1,1],[-4,13],[-4,4],[-10,16],[-1,6],[2,9],[14,8],[5,6],[5,7],[11,3],[11,6],[8,8],[9,12],[3,3],[7,-2],[4,-4],[6,-1],[5,1],[7,0],[9,-6],[2,-4],[-3,-7],[6,2],[3,-1],[5,-5],[3,1],[-1,9],[3,10],[3,5],[5,10],[-2,8],[0,8],[-1,4],[-3,5],[-6,4],[-6,1],[-2,4],[0,4],[2,7],[5,13],[6,23],[-1,2],[0,9],[-1,4],[-21,16],[-2,4],[3,0],[16,-7],[4,-1],[25,2],[12,-2],[11,-3],[7,-11],[15,-19],[0,-7],[-7,-1],[-8,0],[-17,-4],[-5,-4],[-12,-12],[-1,-4],[1,-3],[6,-4],[11,-6],[9,-17],[6,-3],[6,0],[5,-2],[6,1],[22,6],[5,3],[1,4],[2,13],[4,11],[-1,7],[11,4],[10,2],[5,0],[2,3],[-4,5],[3,2],[8,1],[22,11],[8,6],[13,8],[4,2],[7,1],[7,2],[8,4],[10,4],[4,0],[4,-5],[-3,-4],[2,-2],[4,0],[2,2],[6,3],[1,3],[-2,1],[-2,5],[-6,1],[9,7],[21,11],[10,4],[11,1],[5,-2],[-14,-3],[-2,-2],[5,-2],[-2,-3],[-4,-9],[5,-6],[0,-6],[-3,-3],[-4,1],[-3,-2],[-6,-1],[-3,-5],[7,0],[11,-2],[6,2],[3,0],[7,2],[7,-6],[4,1],[1,10],[7,6],[7,5],[7,0],[7,4],[10,-1],[10,0],[8,-3],[6,-1],[9,5],[20,14],[2,-3],[3,5],[15,5],[4,0],[2,-6],[3,-3],[4,-6],[-4,-3],[-3,-5],[-1,-9],[6,-3],[9,-3],[3,0],[5,4],[1,5],[-2,6],[1,6],[7,-1],[9,2],[4,3],[8,12],[-2,9],[-5,-2],[-9,20],[-5,8],[3,3],[8,2],[7,8],[6,2],[21,-5],[24,-2],[20,-4],[23,-8],[11,-5],[9,-7],[-1,-4],[4,1],[8,-4],[6,-1],[6,-3],[2,-3],[8,-2],[7,-5],[2,0],[9,-4],[7,-1],[4,-7],[14,-10],[2,-3],[12,-7],[6,-5],[4,2],[9,13],[8,22],[-6,0],[-4,-2],[-3,0],[-8,8],[-7,10],[-1,11],[-2,3],[-7,3],[-4,3],[-15,7],[-3,-3],[-5,1],[1,10],[3,10],[6,1],[3,4],[-3,7],[0,4],[3,12],[1,14],[-4,5],[-9,-2],[-3,1],[-1,5],[5,9],[-5,-1],[-1,2],[8,12],[10,4],[19,11],[8,8],[6,10],[4,9],[6,22],[6,16],[9,16],[9,2],[-2,-5],[7,-1],[8,1],[13,0],[24,1],[12,-5],[5,0],[9,-2],[10,-6],[0,-12],[-1,-8],[-5,-19],[-6,-11],[-2,-7],[-5,-5],[-6,-4],[-1,-5],[6,-9],[14,-9],[3,-10],[1,-8],[-1,-21],[-1,-4],[-3,-3],[-2,-4],[2,-6],[1,-22],[1,-18],[-2,-6],[-1,-17],[2,-6],[3,-6],[3,-3],[11,-6],[10,-8],[1,-5],[-4,-3],[-9,-15],[1,-12],[0,-6],[-6,-10],[-10,-6],[-20,-33],[-5,-4],[-9,1],[5,-11],[0,-5],[-5,0],[-8,-4],[-4,-4],[-6,-1],[-4,1],[-5,3],[1,3],[7,6],[-3,0],[-3,-3],[-5,-1],[-5,4],[-4,5],[-6,-1],[-14,1],[-4,-1],[-1,-3],[2,-7],[2,-4],[6,-4],[8,-1],[8,-5],[10,-3],[22,1],[12,-2],[9,-5],[5,0],[7,5],[1,10],[1,3],[26,14],[5,3],[8,8],[2,5],[3,14],[2,5],[17,16],[3,5],[0,12],[-1,5],[-3,9],[-3,4],[-4,7],[3,14],[2,5],[16,7],[12,2],[15,4],[6,1],[4,-1],[4,-4],[3,-7],[11,-11],[3,-7],[1,-9],[0,-21],[-2,-10],[4,-2],[7,-6],[2,-3],[3,-1],[6,0],[17,1],[9,0],[-2,3],[-8,0],[-11,2],[-16,5],[-2,9],[4,16],[3,2],[6,2],[-2,13],[-4,8],[-3,16],[-5,0],[-4,3],[-19,9],[-18,7],[-12,1],[-4,-1],[-10,-7],[-7,-1],[-13,3],[-10,-2],[-4,2],[-2,3],[3,13],[-1,5],[-5,6],[-3,5],[1,6],[7,21],[3,6],[7,10],[4,8],[-1,4],[-16,24],[-6,11],[-10,7],[-2,3],[16,23],[8,4],[15,5],[9,5],[5,4],[3,7],[0,9],[-1,7],[-8,15],[5,3],[5,-1],[6,-3],[7,-12],[0,-7],[1,-5],[3,-5],[-6,-7],[-4,-11],[-3,-1],[-1,-8],[7,-10],[-2,-9],[-4,-3],[1,-6],[22,-7],[18,-1],[5,-4],[2,3],[16,-1],[13,-10],[7,-3],[6,-1],[12,1],[4,4],[-6,0],[-2,-2],[-6,1],[-3,2],[-3,4],[-5,10],[-8,3],[-6,-1],[-6,1],[-17,8],[-12,6],[-3,2],[-3,5],[-5,13],[11,6],[12,1],[5,-1],[14,-10],[6,0],[12,4],[1,3],[-6,8],[-7,1],[-8,-2],[-2,2],[2,4],[4,1],[10,7],[7,3],[7,1],[26,-1],[15,-9],[14,-4],[10,-5],[1,-5],[18,-13],[4,-2],[12,-1],[19,4],[6,-1],[7,-5],[-7,-12],[-2,-2],[-16,-9],[-3,-15],[3,-11],[-2,-6],[-3,-6],[1,-5],[2,1],[5,9],[4,11],[4,3],[4,1],[4,-3],[1,-5],[0,-7],[-1,-6],[-3,-10],[-5,-7],[-1,-4],[4,-7],[3,-1],[4,1],[1,3],[-2,7],[6,3],[6,1],[5,4],[2,8],[-11,25],[-5,7],[3,10],[5,11],[3,4],[0,6],[-6,10],[-4,3],[-16,3],[-10,10],[-2,8],[-3,2],[-14,5],[-8,0],[-5,2],[-9,7],[-2,8],[-2,3],[5,14],[-2,4],[-7,4],[-2,8],[-1,8],[6,6],[-1,6],[25,4],[9,1],[48,0],[4,2],[21,2],[9,2],[9,-3],[3,1],[7,0],[5,5],[10,2],[17,2],[8,0],[4,-4],[-9,-6],[-9,-5],[-8,-3],[-7,-5],[-1,-7],[1,-2],[7,-3],[6,-5],[10,-5],[2,1],[-23,15],[1,4],[4,4],[8,3],[21,2],[7,9],[5,3],[-10,4],[-14,18],[-3,3],[-11,2],[-5,2],[5,6],[6,2],[4,-1],[10,-7],[9,3],[-10,4],[-5,5],[-16,6],[-9,1],[2,5],[7,1],[2,4],[13,-8],[6,2],[5,3],[10,10],[1,4],[-9,3],[-5,0],[-1,3],[3,3],[4,1],[14,-3],[23,9],[7,4],[16,6],[8,0],[16,7],[23,4],[13,0],[10,4],[16,1],[5,2],[26,4],[4,4],[-3,2],[-5,-3],[-8,3],[-3,-3],[-3,1],[-1,4],[3,5],[4,-3],[4,4],[3,1],[8,-3],[5,3],[8,1],[11,-1],[2,3],[13,-3],[9,2],[6,0],[9,-2],[4,-2],[-2,-4],[-9,-6],[2,-2],[6,4],[16,4],[2,-1],[-3,-5],[11,2],[9,5],[4,1],[4,-3],[4,2],[1,3],[7,1],[7,4],[13,5],[9,-2],[18,-7],[6,3],[-6,6],[-15,8],[-3,3],[-5,2],[2,2],[20,-2],[10,1],[10,-1],[15,3],[6,-3],[7,0],[8,-2],[2,3],[-13,3],[-6,-1],[-2,2],[5,8],[-2,5],[-3,2],[0,5],[2,5],[5,2],[3,4],[7,6],[30,18],[14,6],[12,1],[13,5],[5,0],[17,-4],[4,-3],[10,-3],[11,-1],[5,-2],[5,-6],[-9,-2],[-10,-7],[-13,-4],[-16,-2],[-4,-2],[40,0],[2,-6],[3,0],[9,3],[6,0],[10,-2],[6,1],[10,-2],[4,-4],[-14,-11],[-8,-9],[-7,1],[1,-5],[7,0],[4,-2],[9,3],[13,-1],[8,4],[3,8],[5,1],[12,-1],[21,2],[17,-2],[13,2],[18,-2],[8,-2],[6,-3],[5,-1],[8,-8],[-2,-3],[8,1],[3,-2],[6,-1],[2,-10],[3,-5],[-2,-3],[3,-1],[6,3],[3,4],[-5,4],[3,1],[5,-1],[3,-4],[5,-16],[8,1],[1,-4],[-7,-15],[-4,4],[-10,2],[-14,8],[-5,0],[8,-5],[6,-10],[6,3],[5,-5],[6,-2],[5,-3],[-3,-9],[-20,-16],[-20,-9],[-9,-7],[-16,-4],[-11,-7],[-14,-5],[-4,-5],[-11,-3],[2,-3],[-3,-6],[-8,-4],[-12,-4],[-25,-19],[-12,-4],[-14,0],[-16,-17],[-14,-1],[-14,-20],[-8,-7],[1,-3],[8,3],[10,6],[4,6],[7,5],[18,2],[7,-1],[11,1],[7,4],[8,1],[1,3],[7,0],[14,4],[7,6],[8,-2],[6,1],[16,9],[10,4],[2,2],[-4,3],[-9,-3],[-8,-1],[-10,1],[-2,4],[6,8],[11,5],[22,-5],[2,7],[11,-2],[-9,-3],[2,-5],[3,-3],[11,-5],[10,-2],[7,0],[11,2],[4,5],[-3,7],[5,-2],[5,-5],[6,-11],[-1,-3],[-6,-8],[3,-3],[6,-3],[0,-17],[-3,-6],[-4,-3],[-3,-4],[2,-6],[3,-4],[10,-1],[1,1],[-9,3],[-4,6],[5,7],[4,7],[1,5],[-1,5],[2,3],[7,4],[-5,2],[-4,3],[-1,4],[9,2],[6,3],[21,1],[15,5],[32,-1],[22,-5],[32,0],[12,-3],[1,-3],[-5,-1],[-8,0],[-2,-6],[1,-7],[15,-7],[13,-3],[9,-5],[5,-1],[19,1],[11,-3],[10,2],[14,0],[4,-4],[7,-1],[7,0],[5,1],[1,2],[-7,2],[1,3],[3,1],[10,-4],[5,-1],[4,3],[4,8],[5,3],[-4,4],[-5,10],[0,6],[3,6],[2,1],[8,-2],[4,4],[13,3],[4,0],[7,-2],[23,-11],[-1,-4],[6,1],[3,2],[6,1],[4,2],[2,-3],[-2,-5],[8,-5],[8,6],[5,7],[20,-4],[6,-2],[2,-4],[7,-3],[-1,-4],[10,0],[8,-4],[-1,-3],[2,-2],[5,0],[-7,-8],[-7,-4],[2,-1],[9,0],[6,-6],[1,-4],[-12,-7],[-5,-2],[-6,-1],[3,-2],[16,-1],[5,-2],[3,-7],[0,-9],[-3,-4],[-10,-1],[-13,10],[-7,3],[-11,7],[-2,-1],[3,-6],[5,-3],[9,-10],[16,-19],[5,4],[5,2],[5,-7],[-7,1],[-7,-2],[-3,-3],[2,-4],[6,0],[2,-5],[5,-6],[10,-16],[7,-3],[8,-7],[10,-4],[3,5],[2,-2],[2,-8],[3,-3],[7,1],[5,4],[3,4],[6,12],[7,8],[-1,6],[9,22],[9,11],[5,-9],[9,-9],[8,-7],[7,-3],[12,-3],[16,0],[3,4],[6,3],[10,2],[5,4],[9,1],[15,-3],[19,-9],[19,-15],[4,-2],[2,1],[-4,5],[4,2],[3,5],[-5,2],[0,3],[2,1],[1,4],[5,4],[3,1],[6,-3],[4,4],[3,0],[6,-4],[6,-7],[3,0],[8,3],[10,0],[-1,4],[-7,8],[1,11],[-10,4],[8,2],[5,9],[8,3],[-14,1],[-5,-3],[-7,0],[-1,9],[12,10],[24,0],[7,1],[10,4],[-2,3],[0,5],[-9,7],[1,3],[17,-2],[6,-4],[15,-4],[40,-1],[5,-2],[17,-2],[25,-4],[8,-1],[6,-3],[10,-1],[5,-2],[0,-5],[-22,0],[-7,2],[-8,0],[-4,-1],[-5,-4],[-12,-3],[4,-4],[5,-1],[15,5],[44,3],[6,-1],[0,-3],[-6,-7],[-6,-5],[-8,-5],[-3,0],[7,11],[-5,1],[-7,4],[-3,-2],[-1,-7],[2,-2],[0,-5],[-9,-3],[-4,0],[-6,2],[1,-4],[-3,-6],[2,-2],[4,-1],[17,3],[7,3],[8,7],[15,16],[6,5],[9,3],[27,-2],[15,-3],[15,-5],[8,-4],[5,-6],[2,-6],[-4,-3],[-17,-1],[-6,-1],[-4,-5],[2,-1],[14,-2],[12,-5],[4,-4],[15,1],[2,-4],[-12,-11],[16,6],[4,1],[5,-1],[12,-5],[5,-4],[9,-11],[-9,-2],[21,-9],[8,0],[18,3],[10,0],[17,5],[17,4],[16,0],[8,3],[22,0],[21,-1],[16,-2],[19,-6],[18,-8],[13,-11],[3,-6],[2,-11],[0,-5],[-5,-8],[1,-5],[-4,-7],[3,-5],[8,-3],[18,-5],[4,-2],[1,-9],[3,-21],[7,-6],[1,-5],[-6,-14],[-7,-7],[7,1],[7,15],[4,2],[1,3],[0,9],[-2,8],[0,6],[2,4],[11,10],[6,4],[6,2],[16,2],[7,2],[8,-1],[6,0],[7,2],[6,-1],[9,-6],[35,-2],[6,-2],[23,-3],[2,0],[5,4],[16,10],[6,0],[3,-2],[5,-7],[3,-8],[2,-10],[3,-2],[5,0],[20,-9],[2,-9],[6,-8],[13,1],[13,2],[12,12],[0,5],[-3,8],[-4,7],[-4,11],[-12,3],[1,3],[5,4],[4,6],[-1,14],[11,0],[10,-1],[20,-5],[17,-2],[8,-2],[6,-4],[6,-2],[2,6],[2,1],[8,-3],[6,-1],[11,0],[13,-1],[14,0],[12,3],[10,-3],[9,-5],[14,-7],[13,-2],[15,-7],[14,-2],[12,-4],[2,-5],[9,-2],[17,-15],[-9995,-1],[5,-3],[6,-2],[3,1],[3,-4],[14,-6],[5,-4],[-2,-1],[2,-7],[12,-4],[6,-5],[1,-3],[-2,-4],[4,1],[4,3],[-2,3],[-12,8],[1,1],[16,-10],[4,-4],[-3,-3],[7,0],[3,-1],[3,-3],[7,-3],[44,-26],[3,-9],[0,-4],[-4,-5],[6,0],[4,5],[3,-2],[2,-4],[-3,-8],[0,-6],[4,-10],[1,-8],[-3,-3],[-2,-6],[2,-1],[5,0],[5,-4],[3,-11],[1,0],[4,6],[4,1],[2,-5],[-2,-9],[2,1],[5,7],[1,4],[-1,3],[-3,2],[-5,1],[-3,5],[4,4],[2,5],[-2,9],[-2,2],[-4,1],[-1,3],[-5,0],[-1,3],[18,1],[6,2],[5,-3],[10,-2],[-5,-6],[-1,-6],[3,-1],[2,2],[-1,6],[2,1],[5,-3],[11,-1],[0,3],[-12,3],[0,2],[10,-2],[10,-4],[7,1],[6,-3],[7,-6],[5,-8],[6,-5],[7,-4],[12,-12],[0,-2],[5,1],[3,-6],[11,-3],[2,-5],[-3,-3],[-5,2],[-11,-6],[-4,-4],[0,-12],[-3,-2],[-7,1],[-6,3],[-8,7],[0,-4],[8,-7],[2,-4],[-1,-2],[-4,-1],[-4,2],[-11,-1],[-5,-1],[0,2],[-5,2],[-3,0],[-5,6],[-8,1],[-2,-1],[6,-4],[6,-6],[-2,-3],[5,0],[1,-1],[-3,-9],[-10,-1],[3,-2],[5,0],[3,-1],[2,-9],[-5,-5],[-11,-5],[-3,1],[-3,-1],[0,-2],[5,-3],[0,-2],[-3,-3],[2,-5],[7,-2],[5,-4],[1,-6],[-10,0],[-1,5],[-3,2],[-2,-1],[1,-8],[-2,-4],[-8,-1],[-3,4],[0,3],[2,2],[-2,2],[-2,-3],[-6,-4],[-9,5],[-6,8],[-3,3],[-7,5],[-13,5],[-6,-1],[-4,1],[-3,4],[-6,4],[-3,4],[0,13],[-2,6],[-5,7],[-13,5],[-14,4],[-3,-1],[-9,-6],[-6,-1],[-17,0],[-5,3],[-1,3],[1,9],[-5,3],[-3,4],[-4,10],[5,-1],[2,6],[3,4],[1,7],[-2,2],[-4,-7],[-4,-3],[-6,3],[-2,5],[-4,-2],[0,-7],[-8,-2],[-2,3],[-2,-9],[-1,-7],[2,-6],[8,-6],[2,-3],[1,-4],[-5,-11],[-3,-8],[-2,-3],[-8,-7],[9994,-2],[-5,-6],[-6,-6],[-8,-2],[-13,-9],[-5,-2],[-6,4],[-15,3],[-5,3],[-6,9],[-3,2],[-2,3],[-8,4],[-7,-3],[0,-1],[9,0],[5,-4],[2,-5],[-4,-4],[-7,4],[-7,-1],[-4,1],[-10,6],[-8,-7],[-10,-3],[-9,-1],[0,-1],[7,0],[9,2],[5,2],[6,5],[3,-1],[4,-6],[1,-5],[4,-1],[7,-3],[3,0],[6,5],[9,3],[2,-2],[-1,-9],[0,-8],[7,-8],[8,-5],[5,1],[2,8],[5,-6],[2,-8],[-1,-7],[3,-2],[3,0],[2,-18],[-8,-3],[1,-2],[5,-1],[2,-2],[-1,-7],[3,2],[-1,4],[1,2],[4,-11],[3,-4],[8,-5],[2,-3],[0,-4],[-4,-4],[3,-7],[4,-1],[2,-5],[0,-5],[-8,-10],[-3,-3],[-2,-4],[0,-4],[-4,2],[-27,11],[-9,2],[-9,0],[-2,1],[0,3],[2,5],[-5,1],[-2,2],[-2,-1],[-2,-5],[1,-4],[5,-2],[0,-1],[-7,-2],[-6,-1],[-7,-6],[-3,-4],[-20,-9],[-5,-3],[-5,-2],[-2,-4],[-11,-5],[-2,0],[-6,-7],[-6,0],[-4,-1],[-9,-7],[-6,2],[-6,-9],[-7,-9],[-2,0],[-6,4],[-1,-2],[1,-4],[2,-3],[-2,-1],[-3,1],[-2,-1],[1,-3],[-3,-3],[-3,0],[-3,-2],[-1,-2],[1,-4],[-5,-3],[-4,-5],[-2,-1],[-4,-4],[-3,1],[-7,-7],[-15,-12],[-4,-1],[-5,-4],[-1,-5],[-2,-5],[-2,-12],[-3,-5],[-5,1],[-5,5],[-2,5],[0,4],[-2,2],[-6,10],[-9,7],[-2,3],[-12,-2],[-9,1],[-9,-1],[-11,-3],[-3,-3],[-11,-3],[-8,-6],[-14,-21],[-3,-4],[-4,-1],[-2,7],[1,6],[2,5],[2,10],[0,4],[1,4],[-4,0],[-7,-7],[-10,-7],[-5,-2],[-3,-4],[-6,-2],[0,-9],[-2,-5],[-4,-1],[-2,2],[-3,7],[-4,4],[-4,0],[-7,-5],[-3,2],[-7,2],[-6,-8],[-2,-1],[-4,-6],[-1,-5],[-1,-10],[0,-13],[-5,-10],[-2,1],[-2,-2],[1,-5],[-1,-3],[-3,-2],[-6,-8],[-5,-5],[-9,-15],[-2,-10],[-3,-12],[4,-11],[3,-3],[6,-3],[2,0],[1,7],[4,3],[2,0],[11,-6],[3,-3],[-1,-9],[-7,-9],[-5,-7],[0,-7],[1,-8],[0,-16],[1,-4],[2,-2],[4,2],[3,-1],[2,-3],[0,-7],[3,-19],[-4,-5],[-4,-6],[-2,0],[-4,2],[-6,9],[2,6],[8,7],[-9,2],[-5,-5],[1,-8],[-2,-2],[-8,-6],[-2,-2],[-9,-25],[-1,-9],[0,-8],[3,-13],[7,-14],[0,-8],[-10,-13],[-3,-1],[-9,1],[-5,4],[-5,-1],[-5,-2],[-7,-7],[-6,-8],[-6,-5],[-2,-4],[-2,-7],[-2,-13],[0,-6],[2,-3],[1,-4],[-2,-6],[0,-4],[3,-6],[1,-9],[-2,0],[-5,6],[-6,1],[-12,-7],[-5,-4],[-6,-8],[-2,1],[-1,5],[-2,2],[-2,-1],[-2,-4],[4,-2],[1,-3],[-2,-11],[-1,-3],[0,-15],[-4,-16],[-7,-17],[-7,-11],[-6,-4],[-3,-4],[-1,-4],[-8,-11],[-10,-12],[-2,-2],[-1,5],[0,4],[-1,6],[-4,5],[-1,4],[0,30],[-4,27],[0,8],[-4,6],[-2,7],[-1,7],[0,8],[-4,43],[-2,10],[-5,35],[-3,19],[-1,20],[0,8],[2,26],[2,16],[7,36],[3,5],[13,14],[5,7],[7,18],[0,6],[-2,6],[-3,4],[2,4],[3,1],[7,-3],[6,1],[6,13],[9,-2],[6,2],[2,0],[1,4],[11,11],[9,8],[5,6],[3,5],[4,5],[4,6],[7,19],[14,15],[5,9],[9,5],[10,12],[6,11],[9,7],[2,5],[5,10],[1,3],[6,4],[12,7],[8,7],[10,1],[3,3],[7,4],[-4,6],[1,4],[8,9],[3,6],[-1,4],[-4,2],[2,11],[4,4],[1,9],[0,10],[4,14],[2,3],[9,8],[2,0],[6,-3],[6,-1],[3,-2],[0,4],[2,1],[3,-1],[0,3],[-10,1],[-7,3],[-6,6],[-4,2],[-5,0],[-25,-9],[-3,-5],[2,-5],[-2,-2],[-2,-5],[-1,-6],[0,-6],[-3,-9],[0,-6],[5,-3],[1,-2],[-1,-3],[-4,-5],[-2,-1],[-2,3],[-2,6],[-3,1],[-1,-4],[-9,1],[-5,-7],[-32,-33],[-4,-4],[-4,-8],[-8,-1],[-8,-6],[1,5],[0,6],[5,11],[-6,2],[-5,-3],[-3,-3],[-3,0],[1,4],[4,6],[-2,10],[1,1],[7,13],[2,6],[2,8],[0,6],[-4,1],[-13,-9],[-4,-2],[-2,4],[-2,1],[-4,6],[-6,1],[-7,-4],[-7,-2],[-6,0],[-5,-3],[-3,-1],[-7,3],[-9,0],[-3,-3],[-8,-4],[-5,-7],[-6,-5],[-2,-12],[-8,-6],[-8,-9],[-5,-13],[-4,-5],[-8,-8],[-13,-10],[-11,-16],[-3,-12],[-5,-3],[0,-10],[-2,-4],[-1,-4],[1,-3],[4,0],[7,4],[10,-6],[6,-5],[-1,-5],[1,-4],[-4,0],[-6,-1],[-3,-2],[-7,4],[-6,-6],[-6,-2],[-4,2],[-5,7],[-9,-1],[-3,-7],[-5,-1],[-7,-9],[-7,2],[-5,4],[-2,0],[-5,-2],[-2,-5],[-10,-2],[-11,0],[-6,12],[11,5],[6,-1],[8,1],[7,3],[-2,4],[-7,0],[-4,2],[-8,12],[-4,2],[-5,1],[-5,0],[-5,-7],[-8,4],[4,2],[-6,2],[-23,10],[-9,-2],[-7,-6],[4,-8],[-2,-1],[-6,0],[-3,3],[-3,-5],[1,-4],[4,2],[2,-2],[-1,-5],[-5,-2],[-7,1],[-6,8],[-11,-1],[-5,-6],[-5,-1],[-13,6],[-7,0],[-7,5],[-3,-2],[-4,-12],[-6,-3],[-4,2],[-3,8],[-2,2],[-5,2],[-30,-2],[-10,2],[-7,0],[-10,-4],[-9,2],[-17,-8],[-7,-5],[-8,-8],[-8,-15],[-4,-6],[-7,-7],[-10,-6],[-6,-7],[-2,-5],[-7,-23],[-12,-7],[-4,-8],[-2,-2],[-5,-3],[-3,-6],[-2,-2],[-7,-4],[-6,-10],[-9,-7],[-12,-19],[-2,-7],[-2,-4],[-11,-17],[-3,-2],[-5,-8],[-6,-4],[-4,-6],[-7,-6],[-9,-7],[-3,-3],[-5,-10],[-12,-11],[-5,-2],[-8,-10],[-1,-2],[0,-4],[1,-6],[2,-2],[3,-1],[11,-6],[11,2],[10,0],[3,1],[3,-1],[0,-9],[-1,-6],[-1,-17],[-2,-7],[1,-8],[3,-1],[2,3],[4,1],[3,-2],[3,12],[-2,2],[-2,4],[1,3],[7,6],[8,0],[-6,-9],[-2,0],[-1,-2],[3,-4],[4,-3],[6,-1],[-1,-3],[-4,-2],[-3,-9],[-9,-8],[1,-2],[14,1],[6,3],[8,7],[3,10],[4,3],[2,0],[0,-8],[-8,-13],[-1,-4],[5,1],[2,2],[4,10],[2,17],[0,10],[-2,5],[1,1],[12,-6],[6,-1],[10,5],[3,-2],[2,-3],[8,-8],[2,-3],[3,-11],[10,-13],[8,-6],[6,-9],[5,-2],[0,-6],[-2,-5],[-4,-5],[-8,4],[0,-3],[6,-8],[4,-3],[1,-11],[-1,-6],[-3,-6],[1,-4],[4,-6],[3,-2],[2,-3],[-3,-7],[-1,-8],[-3,-4],[-3,-7],[-6,-6],[-2,-12],[-4,-11],[-1,-10],[-4,-15],[-1,-14],[1,-24],[1,-2],[2,-1],[-1,-3],[-4,-7],[0,-5],[2,-4],[0,-9],[-3,-15],[0,-3],[-2,-7],[-1,-6],[1,-4],[1,-1],[-4,-11],[-2,-15],[-1,-6],[-4,-5],[-6,-9],[-2,-5],[-9,-11],[-6,-15],[-4,-15],[-12,-18],[-2,-10],[-3,-8],[-2,-12],[-3,-5],[-3,-12],[-9,-18],[-3,-7],[-7,-10],[-8,-14],[-9,-13],[-2,-5],[-4,-6],[-4,-9],[-6,-9],[-1,-6],[-2,-4],[-4,-3],[-3,-4],[-10,-23],[-1,-4],[0,-4],[-6,-9],[-4,-9],[-6,-5],[-6,-8],[-15,-15],[-4,-5],[-8,-7],[-4,0],[-7,-4],[-4,-3],[-3,1],[-2,5],[-4,-1],[-4,5],[-4,0],[-2,2],[-5,-2],[1,21],[-1,4],[-2,-4],[-6,-7],[-4,-1],[0,4],[4,6],[-2,1],[-4,-2],[-2,-3],[-6,-12],[-4,-10],[-2,-3],[-4,-9],[-4,2],[-2,-1],[-5,2],[-2,-1],[4,-7],[-3,-12],[-1,-1]],[[7990,9684],[-6,-5],[-4,3],[-9,-1],[-16,3],[4,2],[28,1],[3,-3]],[[7951,9688],[-4,-1],[-2,4],[8,1],[3,4],[5,-1],[2,-4],[-6,0],[-6,-3]],[[7857,9748],[-4,-8],[-9,-14],[4,0],[10,11],[4,0],[10,4],[10,1],[4,-1],[4,-7],[9,-2],[1,-5],[5,-3],[11,1],[5,-4],[4,-11],[-1,-5],[-13,-9],[-9,0],[-22,-5],[-20,0],[-6,-4],[-5,2],[-25,-2],[-14,0],[-5,-3],[-13,-5],[-20,-6],[-9,2],[-6,3],[4,3],[3,5],[13,9],[5,12],[2,2],[0,6],[4,4],[6,3],[7,1],[-1,5],[5,7],[1,6],[7,6],[6,1],[2,6],[6,1],[5,-6],[7,-1],[-2,4],[1,5],[5,2],[11,-3],[9,-5],[-6,-3]],[[7117,9771],[6,0],[25,-5],[6,-4],[-26,0],[0,3],[-14,2],[-3,4],[6,0]],[[7780,9769],[-6,-1],[1,5],[3,1],[7,-2],[-5,-3]],[[7573,9773],[-6,-1],[-8,1],[-13,6],[-9,3],[-7,4],[-2,4],[10,4],[21,0],[12,-3],[24,-3],[9,-2],[-5,-5],[-19,-7],[-7,-1]],[[6427,9788],[1,-1],[-28,0],[-10,3],[17,4],[7,3],[9,-3],[-1,-3],[5,-3]],[[6657,9789],[-10,-2],[-12,3],[3,4],[15,4],[7,-2],[3,-5],[-6,-2]],[[7712,9800],[6,-3],[3,-5],[-3,-1],[-4,-6],[3,-2],[6,2],[6,-1],[6,4],[1,6],[9,0],[12,-2],[2,-2],[10,-3],[9,-9],[-4,-2],[-4,-6],[0,-7],[-2,-3],[0,-8],[-4,-3],[-11,2],[-3,-1],[8,-3],[5,-6],[7,-1],[5,-9],[-14,-7],[-17,-1],[-12,-2],[-3,1],[-20,2],[-9,2],[-9,4],[-3,3],[-11,1],[-20,0],[-5,5],[-11,-3],[-9,3],[-5,3],[0,3],[-4,1],[-7,11],[-13,3],[-13,0],[-6,2],[9,8],[13,4],[11,7],[2,7],[11,4],[7,5],[8,-4],[6,4],[10,1],[16,-1],[20,3],[12,1],[3,-1]],[[6389,9795],[-14,5],[10,4],[10,0],[2,-3],[-8,-6]],[[6540,9807],[-8,-3],[-6,2],[7,4],[7,-3]],[[6584,9811],[2,-2],[-2,-12],[-2,-2],[-33,1],[-2,1],[8,6],[0,8],[18,-1],[1,2],[10,-1]],[[6486,9802],[-25,-1],[-2,2],[-6,0],[-4,3],[10,2],[8,6],[9,1],[9,-5],[10,-3],[-2,-3],[-7,-2]],[[6609,9798],[-5,-1],[-11,2],[-3,3],[-3,12],[-5,4],[2,2],[13,-1],[26,-1],[18,-4],[4,-3],[-24,-1],[-3,-2],[-1,-5],[-8,-5]],[[6510,9818],[-3,-3],[-13,4],[2,2],[-1,5],[15,-4],[0,-4]],[[6317,9840],[12,-2],[10,1],[6,-1],[6,-5],[-1,-6],[-17,3],[-7,5],[-5,-1],[-5,-4],[-11,-6],[-10,-1],[-8,-6],[-6,0],[-5,7],[-9,-2],[-7,1],[-7,3],[-1,3],[34,5],[13,1],[6,3],[12,2]],[[6726,9839],[0,-6],[-3,-6],[-11,-2],[-2,-3],[-9,-2],[-6,-5],[-9,1],[-13,4],[-17,-4],[-10,5],[0,6],[2,5],[6,6],[14,2],[5,-3],[6,0],[23,4],[8,2],[14,-2],[2,-2]],[[6395,9845],[15,-1],[18,-10],[4,0],[3,-3],[-15,-5],[-6,-4],[-18,0],[-13,-2],[-1,-4],[-6,-3],[-21,-1],[-4,-4],[7,-1],[1,-6],[-5,-1],[-6,2],[-5,-5],[-6,2],[-6,-3],[-6,0],[-3,2],[10,5],[-3,2],[-12,-1],[-3,-2],[-10,0],[-9,6],[28,12],[6,2],[9,0],[5,2],[7,-4],[12,1],[3,2],[-1,9],[3,6],[7,3],[21,4]],[[7222,9840],[-26,-2],[-3,1],[6,7],[17,1],[17,-2],[-2,-4],[-9,-1]],[[6697,9846],[-9,-1],[-14,1],[-7,2],[15,6],[24,1],[3,-3],[-3,-3],[-9,-3]],[[6519,9855],[21,-5],[19,0],[9,-1],[12,-5],[21,-7],[-3,-2],[-21,-6],[-26,-2],[-5,1],[-4,4],[-12,2],[-13,0],[-16,4],[-1,3],[9,2],[1,5],[6,7],[3,0]],[[6627,9851],[8,-8],[-1,-7],[-16,-1],[-10,2],[-5,5],[-10,2],[-5,6],[12,1],[11,5],[4,-2],[12,-3]],[[6409,9851],[-7,0],[-4,4],[6,4],[4,0],[6,-4],[-5,-4]],[[6759,9831],[-10,1],[-13,7],[16,8],[21,1],[6,1],[6,10],[14,1],[6,-1],[10,-7],[-1,-3],[3,-4],[-13,-7],[-12,-3],[-33,-4]],[[7542,9857],[-9,-5],[-35,3],[-2,4],[5,2],[29,-1],[10,-1],[2,-2]],[[7680,9853],[6,-7],[19,-6],[8,-1],[4,-4],[0,-4],[-18,-2],[-5,-7],[6,-10],[5,-2],[-7,-5],[-37,-4],[-24,-1],[-11,-2],[-20,-6],[-6,0],[-18,5],[-22,4],[-3,3],[-13,3],[-3,5],[10,7],[19,3],[7,5],[12,10],[-13,-2],[-5,1],[5,7],[4,1],[4,4],[8,3],[15,1],[13,3],[7,0],[12,5],[3,4],[18,1],[5,-4],[6,-2],[9,-6]],[[6646,9866],[-16,1],[-2,3],[12,2],[6,-2],[0,-4]],[[6605,9880],[5,-3],[12,-1],[4,-3],[-6,-2],[-14,-1],[4,-7],[-2,-3],[-13,-3],[-18,5],[-12,-3],[-5,3],[-13,-2],[-4,2],[-3,5],[8,1],[11,-2],[7,5],[8,2],[11,7],[20,0]],[[6767,9884],[-3,-1],[-27,2],[-8,4],[14,1],[26,-2],[-2,-4]],[[6618,9890],[-11,0],[3,5],[4,1],[31,2],[4,-2],[-1,-4],[-30,-2]],[[5820,5103],[1,0],[6,3],[1,-1],[1,-6],[3,1],[3,4],[1,3],[4,8],[1,4],[1,2],[2,1],[2,0]],[[5846,5122],[-1,-4],[1,-4],[4,-9],[2,-2],[1,-4],[2,-6],[0,-23],[1,-4],[1,-6],[-1,-7],[-1,-4],[-1,-2],[-4,0],[-1,-2],[-1,0]],[[4525,6382],[-1,3],[3,30],[0,2]],[[6165,6146],[2,5],[3,-5],[0,-8],[-1,1],[-1,3],[0,2],[-3,-1],[-2,1],[-3,6],[-1,4],[1,0],[2,2],[0,7],[1,-1],[1,-3],[0,-8],[1,-1],[-1,-2],[1,-2]],[[6024,6645],[-1,0],[-4,9],[-5,4],[0,2],[6,-5],[5,-7],[-1,-3]],[[6344,6827],[2,-5],[1,-6],[3,-12],[4,-10],[1,-4],[0,-7],[-1,-3],[3,-5],[5,-5],[5,-3],[-2,-3],[3,-8],[3,-7],[4,-2],[5,-11],[7,-7],[5,-10],[-4,2],[0,-5],[1,-5],[4,-7],[1,-5],[-2,-12],[-3,1],[2,-16],[2,-5],[1,-8],[2,-3],[4,-8],[2,-7],[1,-13],[7,-17]],[[6423,6601],[2,-3],[2,1],[0,-3],[-3,-11],[7,-3]],[[6443,6277],[-7,-1],[-6,-2],[-7,-2],[-9,-3],[-7,-1],[-18,-6],[-8,-2],[-9,-2],[-7,-2],[-4,-2],[-5,-5],[-7,-8],[-12,-12],[-4,-10],[-2,-6],[-7,-16],[-3,-9],[-2,-7],[-2,-12],[-2,-3],[-7,-7],[-4,1],[-3,7],[-4,11],[-12,-2],[-6,1],[-8,2],[-7,1],[-4,1],[-6,6],[-12,0],[-6,-1],[-5,0],[-6,-1],[-2,-1],[-2,0],[-2,-3],[-2,2],[-1,-1],[-3,2],[-2,3],[-1,3],[-4,2],[-1,0],[-3,-3],[-3,-6],[0,-2],[1,-3],[-2,-4],[-1,-5],[0,-15],[2,-5],[-1,-4],[-2,-2],[-1,-4],[-2,-5],[-5,-8]],[[6188,6126],[-1,5],[-1,7],[0,5],[-2,8],[-3,4],[0,5],[-2,5],[-3,5],[-1,7],[-1,11],[-7,13],[-8,12],[-3,8],[-4,14],[-2,11],[-6,13],[0,5],[-2,13],[-1,5],[-7,28],[-2,5],[0,4],[-1,2],[-4,4],[-4,10],[-11,16],[-5,1],[-5,6],[-3,7],[-3,13],[-6,13],[-5,20],[1,7],[0,5],[-1,8],[-2,7],[-1,6],[1,8],[0,10],[2,11],[-1,12],[-2,6],[0,4],[-3,6],[2,0],[-3,6],[-3,12],[-1,7],[-4,14],[-3,9],[-5,12],[-5,8],[-5,7],[-3,0],[-3,5],[-4,1],[-3,10],[-7,21],[2,8],[-1,6],[0,5],[-2,8],[-8,23],[-3,4],[-2,8],[0,8],[-5,4],[-7,28],[-4,10],[-2,7],[-5,11],[-3,10],[-5,10],[-4,18],[-7,17],[-3,3],[-7,1],[-3,2],[-2,-4],[-1,5],[2,6],[3,14],[1,13],[4,36]],[[5946,5728],[-6,0],[0,15],[2,7],[0,13],[-1,7],[-1,1],[-12,20],[-2,5],[0,1],[-7,5],[0,2],[1,2],[0,2],[-2,43],[0,3],[1,1],[0,16],[2,11],[0,5],[-13,0],[0,-12],[-18,0],[7,-17],[0,-2],[1,-6],[-1,-9],[0,-6],[3,-12],[-1,-1],[0,-2],[-13,-23],[0,-1],[-2,-9],[-2,-6],[-1,-1],[-3,-8],[-12,-24],[-2,-2],[-6,-1],[-4,0],[-1,-1],[-8,14],[-13,17],[-8,-9],[-3,-3],[0,-8],[-1,-4],[-2,-5],[-7,-3],[-3,-2],[-4,-4],[-1,-4],[-3,-5],[0,-8],[-22,1],[-1,2],[-3,13],[-3,0],[-20,1],[-3,-1],[-6,-6],[-3,0],[-3,2],[-10,25],[-2,3],[-3,6],[-3,5],[0,8],[-1,4],[-1,0],[-15,-5],[-2,0],[-3,-1],[-1,-1],[-1,-3],[0,-7],[-2,-7],[-4,-9],[-1,-4],[1,-9],[-1,-5],[0,-2],[-3,-6],[0,-12],[-3,-7],[0,-8],[-1,-2],[-6,-4],[-2,-3],[-2,-4],[0,-2]],[[5634,5812],[1,7],[1,9],[0,9],[-2,3],[-2,0],[-6,10],[0,26],[-3,2],[0,4],[-2,19],[1,5],[-2,7],[-3,2],[-7,-2],[-2,1],[-2,3],[-1,3],[1,4],[1,8],[3,7],[4,5],[2,4],[0,3],[1,4],[-1,4],[0,4],[-2,5],[-1,6],[0,4],[2,7],[3,4],[1,2],[2,2],[3,4],[1,2],[0,2],[-1,2],[-2,6],[0,6],[-1,4],[0,2],[2,5],[2,2],[3,1],[1,2],[0,8],[1,2],[1,6],[1,3],[2,3],[2,4],[1,4],[0,4],[-1,13],[2,5],[3,5],[4,-1],[6,1],[4,2],[2,0],[7,-2],[1,0],[0,38],[0,26],[0,26],[0,26],[0,25],[0,26],[0,26],[0,25]],[[6023,6450],[0,-13],[2,-10],[4,-15],[4,-8],[1,-5],[-1,-2],[-2,2],[0,-22],[2,-10],[-1,-9],[0,-16],[2,-19],[0,-12],[3,-28],[3,-16],[1,-4],[2,-2],[4,-1],[10,-16],[1,-5],[2,-5],[2,3],[2,-4],[6,-9],[1,-4]],[[5943,5426],[-7,-13],[-5,-10],[0,-2],[-2,-1],[-4,0],[-5,1],[-5,6],[-4,-5],[-3,-1],[-1,-1],[-4,-1],[-6,-2],[-4,-6],[-1,-4],[-3,1],[-3,3],[-1,6],[-3,5],[-5,-6],[-2,-1],[-2,0],[-3,4],[-4,2],[-2,0],[-3,-3],[-3,-5],[-2,-6],[0,-3]],[[4535,5895],[-1,2],[-1,5],[0,3],[6,4],[3,-1],[0,2],[-3,3],[-1,3],[-1,-2],[-1,-4],[-2,-2],[-1,3],[0,2],[1,2],[-1,10],[1,6],[-1,5]],[[4539,5966],[-1,6],[-1,4],[-3,4],[-1,4],[1,3],[3,3],[0,2],[-1,0],[-2,-2],[-1,0],[-1,5],[-2,7],[-2,11],[-3,4],[-3,10],[-2,3],[-3,2],[-2,-1],[-1,-4],[-2,6],[3,2],[8,8],[8,21],[8,26],[1,6]],[[7887,5260],[-4,-4],[-5,4],[1,5],[4,2],[4,-4],[0,-3]],[[4270,1818],[0,-4],[-5,3],[-1,2],[2,2],[2,0],[2,-3]],[[3968,2069],[3,-3],[2,2],[7,-1],[2,-5],[-1,-4],[3,1],[3,-4],[3,4],[3,-7],[3,-5],[1,-6],[1,-1],[4,1],[-1,-5],[1,-4],[3,-3],[-4,-4],[-4,-2],[-5,5],[-5,12],[-2,4],[-3,0],[-3,2],[-5,7],[-3,0],[-4,4],[-9,7],[-4,-1],[-2,2],[0,4],[4,4],[5,1],[0,-2],[4,-3],[3,0]],[[4841,4262],[-3,-1],[2,6],[2,0],[0,-4],[-1,-1]],[[4600,4724],[-1,0],[0,5],[2,-1],[1,-2],[-2,-2]],[[9635,4511],[-2,-1],[-1,1],[-2,5],[2,1],[1,-1],[2,-5]],[[9459,4504],[-2,-2],[-3,2],[-1,5],[-2,2],[-4,2],[-1,2],[-3,1],[-1,3],[1,2],[0,2],[2,-2],[10,-11],[3,-4],[1,-2]],[[9613,4564],[-3,-1],[-1,-1],[-2,-4],[-2,1],[-1,3],[1,1],[1,4],[1,1],[3,1],[3,-1],[1,-1],[-1,-3]],[[9491,4585],[3,-3],[2,0],[3,-2],[2,1],[2,-3],[4,-12],[0,-3],[2,-3],[-2,-1],[-3,2],[-2,-1],[-2,2],[-4,1],[-3,3],[-7,9],[0,4],[-1,2],[-1,5],[-2,2],[-3,1],[0,7],[5,-2],[5,-7],[2,-2]],[[9486,4629],[0,-8],[-2,4],[-1,-2],[-1,3],[0,18],[4,-15]],[[9436,4649],[6,-9],[3,1],[8,0],[7,-10],[2,-6],[2,-1],[1,-3],[1,-6],[-3,-3],[-2,-1],[-5,2],[-4,5],[-9,0],[-4,1],[-1,2],[-2,2],[-2,5],[-2,6],[0,11],[2,4],[2,0]],[[9448,4665],[2,-1],[2,-3],[2,-4],[-1,-3],[-2,2],[-1,0],[0,2],[-2,2],[-2,0],[0,3],[2,2]],[[9420,4658],[-3,1],[-1,2],[1,2],[2,2],[3,-2],[0,-3],[-2,-2]],[[9378,4679],[0,-2],[-2,0],[-4,3],[0,2],[4,0],[2,-3]],[[9393,4675],[-1,0],[0,2],[1,6],[1,-5],[-1,-3]],[[9390,4683],[-2,-4],[-2,1],[-2,4],[1,6],[2,1],[0,2],[3,-1],[1,-2],[-1,-3],[0,-4]],[[9370,4681],[-1,1],[-3,8],[0,3],[3,5],[1,0],[1,-3],[-1,-4],[-1,-2],[0,-4],[1,-4]],[[9434,4693],[-1,-1],[-3,5],[1,3],[1,1],[1,-2],[0,-2],[1,-4]],[[9464,4704],[7,-17],[-1,-3],[0,-2],[-1,-6],[1,-2],[2,-1],[3,-6],[1,-7],[2,-6],[0,-7],[3,-10],[0,-7],[-1,1],[-4,11],[-4,5],[-5,9],[-3,11],[-3,20],[2,4],[-4,10],[1,3],[2,-1],[2,1]],[[9381,4709],[2,-5],[2,-11],[-1,-3],[-1,0],[-1,-3],[-2,5],[-2,2],[-2,3],[-1,6],[0,4],[-1,1],[-5,-1],[-1,-4],[-2,1],[0,6],[3,3],[0,4],[3,6],[1,1],[3,-2],[1,-9],[1,-3],[3,-1]],[[9349,4713],[-1,-2],[-1,7],[0,6],[1,1],[1,-8],[0,-4]],[[9364,4716],[0,-1],[-3,1],[-2,6],[0,4],[1,4],[3,1],[2,-5],[0,-8],[-1,-2]],[[9351,4727],[-2,3],[0,4],[-3,5],[0,4],[1,4],[3,-2],[2,-5],[2,-2],[0,-3],[-3,-8]],[[9440,4692],[0,-2],[-4,5],[-3,6],[-8,7],[-2,3],[-1,0],[-4,6],[-4,3],[-3,5],[0,2],[-2,1],[-2,5],[-3,3],[-1,7],[-3,6],[8,-4],[3,-7],[3,-3],[2,-3],[2,-4],[3,0],[2,-4],[2,-1],[2,-2],[12,-17],[-2,-5],[2,-3],[1,-4]],[[9327,4775],[-2,-2],[-2,2],[2,7],[3,-4],[-1,-3]],[[9373,4761],[1,-2],[-2,-3],[-3,1],[-1,3],[-2,0],[-4,1],[-5,9],[-6,15],[-5,9],[-2,7],[1,2],[4,-2],[4,-7],[8,-8],[2,-3],[1,-9],[1,-3],[4,-7],[2,-2],[2,-1]],[[4651,5612],[-2,2],[-10,5],[3,3],[7,1],[2,-2],[1,-4],[-1,-5]],[[4679,5581],[-6,11],[-5,5],[-16,12],[0,3],[2,6],[-2,7],[0,5],[-2,-3],[-4,1],[-2,4],[-2,2],[-1,2],[-1,11],[-1,5],[-2,4],[-3,0],[-2,7],[-2,6],[1,3],[1,0],[2,-2],[2,-1],[2,5],[3,6],[0,2],[-2,-2],[-4,0],[0,-2],[-2,-1],[-1,7],[0,9],[4,0],[0,2],[-2,1],[-4,5],[0,4]],[[2560,5955],[-1,-1],[1,-6],[-2,-3],[-1,-3],[-7,0],[-7,2],[-2,-1],[-10,5],[-12,12],[-7,1],[-7,3],[-5,7],[-3,3]],[[6200,5846],[6,-9],[5,-18],[6,-15],[8,-13],[4,-5],[3,-2],[15,0],[11,13],[10,9],[4,1],[5,-2],[7,-1],[5,-2],[3,0],[12,11],[7,10],[5,4],[2,0],[6,-4],[9,2],[11,9],[4,1],[3,0],[6,-3],[1,0]],[[6358,5832],[0,-32],[0,-42],[0,-30],[-4,-13],[-5,-15],[-5,-17],[-12,-39]],[[6358,5832],[4,0],[9,5],[7,6],[13,4],[10,12],[1,5],[3,7],[5,3],[11,-9],[2,0],[-1,-5],[0,-5],[-3,-9],[-1,-10],[1,-15],[0,-27],[-1,-4],[0,-3],[3,0],[0,4],[3,-3],[2,-1],[0,-5],[-3,0],[-2,2],[-7,-5],[-1,-5],[-1,-19],[-1,-12],[0,-17],[-4,-10],[-2,-8],[-5,-15],[-3,-13],[-1,-7],[-5,-17],[-7,-14],[-3,-18],[-2,-10],[-3,-10],[-6,-18],[-3,-12],[-4,-22],[-2,-13],[-11,-39],[-11,-31],[-7,-27],[-13,-30],[-18,-39],[-23,-47],[-6,-10],[-25,-28],[-17,-25],[-8,-16],[-9,-14],[-7,-14],[-21,-46],[-4,-8],[-4,-11],[-5,-13],[-3,-7],[-4,-7],[-1,-5],[-3,-8],[-3,-13],[-5,-15]],[[3436,7881],[-2,-2],[-1,1],[1,6],[-1,10],[3,-1],[0,-3],[-1,-4],[2,-6],[-1,-1]],[[5184,5190],[-3,-4],[-1,1],[-1,3],[0,9],[1,4],[3,3],[2,1],[1,-5],[0,-5],[-2,-7]],[[5205,5274],[-1,-2],[-1,1],[0,3],[1,4],[1,1],[1,-1],[0,-3],[-1,-3]],[[3410,5503],[1,-1],[1,6],[0,6],[2,11],[3,3],[14,-3],[6,-3],[8,-5],[1,-5],[1,5],[-1,6],[2,4],[5,1],[8,-2],[6,3],[9,-1],[13,-4],[6,-3],[3,-3],[0,-12],[-1,-6],[-2,-8]],[[5625,8010],[0,-3],[-2,-2],[-5,-17],[-4,-7],[0,-10]],[[5376,7805],[2,1],[2,3]],[[5458,8426],[-1,-3],[-2,0],[0,4],[-1,10],[1,5],[6,17],[3,2],[4,15],[3,9],[2,-2],[0,-5],[-5,-12],[-1,-9],[-2,-2],[-7,-29]],[[5529,8515],[-2,-2],[-2,-4],[-3,-2],[-1,-13],[3,-5],[-2,0],[-4,-9],[-4,-2],[-2,-2],[-4,-11],[-2,-3],[-3,0],[4,9],[-2,3],[-1,5],[-2,3],[1,4],[0,12],[2,4],[2,2],[3,6],[4,4],[5,2],[2,-2],[1,4],[2,1],[5,-4]],[[5531,8520],[0,-4],[-2,0],[-1,3],[2,4],[5,0],[1,-1],[-5,-2]],[[5511,8583],[-2,0],[0,3],[3,2],[-1,-5]],[[5515,8609],[-1,1],[2,3],[2,-1],[-3,-3]],[[5670,8974],[-7,-2],[-6,3],[-3,-1],[-5,0],[-8,-4],[-5,2],[-5,5],[-6,-4],[-2,3],[-3,0],[-2,-6],[-1,-8],[-5,0],[2,-3],[-6,-1],[-1,-2],[2,-2],[-1,-2],[-7,-2],[-3,1],[-1,-5],[-2,0],[-1,-3],[2,-2],[2,-7],[-4,-6],[-4,-4],[-4,-8],[4,-5],[1,-5],[2,-5],[4,-5],[-2,-5],[-6,-4],[-6,-7],[-7,-18],[-9,-5],[-2,-3],[-5,-4],[-8,-3],[-4,-4],[-1,-4],[-2,-1],[-4,3],[-1,-2],[-3,0],[-2,-2],[-2,-5],[-5,-6],[-6,1],[0,-4],[-6,-1],[-2,-6],[-6,-4],[4,-2],[0,-4],[-6,-3],[-2,-3],[-3,0],[1,3],[-6,-1],[2,-6],[-2,-4],[4,-3],[-3,-1],[-3,-5],[-3,0],[-2,-3],[-2,0],[-4,4],[-1,-5],[1,-5],[3,-4],[1,-3],[-2,-3],[-1,-8],[-2,-9],[0,-5],[2,-6],[-4,1],[-3,2],[0,-4],[-2,-5],[0,-4],[1,-3],[-1,-4],[2,-4],[-1,-2],[0,-8],[1,-11],[2,-8],[-1,-6],[3,-4],[6,0],[3,-6],[2,0],[3,3],[3,0],[1,-4],[4,-6],[3,-3],[4,-1],[4,-5],[0,-6],[2,-2],[5,-2],[2,-3],[2,-5],[1,-7],[0,-4],[-2,-1],[-5,-5],[-4,-5],[-8,-7],[-4,-1],[-5,-4],[0,-1],[5,-1],[3,3],[4,0],[3,2],[2,-1],[1,-4],[-3,-2],[-3,0],[-1,-6],[-2,-4],[-5,-3],[-8,-6],[-2,1],[-2,-3],[-6,-4],[-3,-4],[-7,-4],[-3,-3],[-19,0],[2,-3],[8,0],[3,-1],[4,-6],[-3,-2],[-4,-1],[1,-8],[2,-5],[-2,-3],[0,-14],[-3,0],[-1,-6],[1,-3],[0,-11],[2,-4],[-1,-4],[-4,-9],[0,-7],[1,-5],[-2,-8],[-1,-7],[-2,-5],[-4,-7],[-1,-5],[-5,-16],[-2,-4],[-2,-2],[-6,3],[-3,0],[-5,-2],[-8,2],[-7,-1],[-2,-1],[1,-6],[-3,-1],[-3,2],[-8,-10],[-2,-9],[3,-5],[1,-6],[-4,-8],[-3,0],[-8,2],[-13,-5],[-12,4],[2,11],[0,8],[-1,4],[-3,4],[-6,15],[-3,9],[6,-4],[3,2],[-2,5],[-2,2],[0,3],[5,1],[2,4],[-1,5],[-5,3],[-4,9],[-4,5],[-7,18],[-3,13],[-3,-1],[-2,11],[0,4],[-4,2],[-1,14],[-4,2],[-3,7],[0,13],[-3,2],[-3,-1],[1,6],[-2,23],[-1,3],[0,7],[1,2],[3,1],[2,-3]],[[5891,3637],[-3,2],[-1,-9],[-1,-12],[1,-7],[-6,-1],[-8,1],[-5,3],[-6,8],[-4,11],[-1,7],[-3,2],[0,18],[1,2],[4,11],[2,7],[1,7],[4,8],[3,5],[2,1],[7,-8],[6,-6],[2,1]],[[3249,6224],[0,-3],[-2,1],[-1,2]],[[6542,4913],[0,-5],[-2,1],[0,4],[-2,2],[-1,3],[2,3],[3,-8]],[[5998,7178],[-2,13],[0,12],[1,9],[0,7],[-1,4],[-4,9],[2,16],[2,4]],[[5996,7252],[2,0],[4,-5],[1,0],[3,8],[3,2],[0,10],[3,3],[5,0],[0,2],[-3,11],[0,3],[1,11],[1,5],[1,1],[8,-2],[1,-4],[3,-3],[3,1],[4,-1],[3,0],[2,2],[11,7],[8,6],[5,-2],[2,0],[7,-9],[2,-1],[4,0],[5,-1],[7,0],[4,1],[5,2],[9,5],[13,11],[7,5],[3,1],[4,0],[4,-2],[4,-1],[2,1],[5,1],[10,3],[5,3],[4,6],[3,-4],[2,-7]],[[2990,6442],[4,-4],[0,-1],[-3,-1],[-1,1],[0,5]],[[3003,6441],[2,1],[3,-1],[1,-4],[-1,-1],[-1,2],[-3,0],[-1,3]],[[3003,6441],[-3,2],[-1,5],[2,0],[1,-5],[1,-2]],[[5044,5541],[-9,-4],[-3,-3]],[[7767,5559],[-1,4],[1,7],[1,-8],[-1,-3]],[[7751,5621],[1,-7],[-1,1],[-1,3],[1,3]],[[7737,5640],[-1,10],[2,-3],[-1,-7]],[[7732,5638],[0,-4],[-1,0],[-2,-3],[-1,9],[1,12],[1,2],[1,-4],[2,-1],[-1,-7],[0,-4]],[[7729,5705],[-1,2],[1,2],[1,-3],[-1,-1]],[[7778,5735],[1,-3],[-1,-4],[-3,-2],[0,9],[3,0]],[[7779,5742],[-1,-1],[-2,4],[0,2],[2,0],[1,-2],[0,-3]],[[7849,5856],[-1,-6],[-1,2],[0,3],[1,2],[1,-1]],[[7844,5874],[-1,-1],[-3,0],[0,10],[1,0],[2,-4],[0,-3],[1,-2]],[[7858,5858],[-1,-1],[0,4],[-3,7],[-1,7],[-4,11],[-2,-5],[-3,4],[-5,10],[-1,-1],[-2,6],[-3,5],[-9,9],[-7,-4],[-10,3],[-4,-3],[-2,2],[-1,4],[1,6],[1,12],[1,9],[-1,7],[1,3],[0,4],[-1,2],[-7,3],[-2,3],[-2,-3],[-8,-2],[-3,-3],[-3,-5],[-1,-6],[2,-4],[1,-7],[-4,-21],[2,-19],[-1,-11],[-1,-7],[-3,-6],[-1,-11],[-2,-5],[-3,-11],[-2,-15],[-1,-6],[-1,-12],[-5,-19],[-2,-10],[-2,-4],[1,-3],[0,-6],[-1,-14],[0,-11],[1,-6],[3,-12],[-1,-4],[0,-5],[2,-2],[2,-1],[9,6],[3,-2],[2,-10],[1,-25],[1,-5],[2,-4],[2,-5],[1,1],[2,-1],[1,-9],[5,-48],[1,-6],[-1,-3],[-1,10],[-1,5],[-3,0],[0,2],[2,4],[-2,7],[-3,-3],[0,-7],[1,-6],[5,-12],[1,-6],[2,-1],[3,1],[3,-6],[3,-5],[6,-8],[4,1],[4,2],[2,0],[3,-2],[3,-7],[5,-16],[9,-13]],[[7780,5554],[-7,18],[-5,7],[1,14],[-2,2],[-2,0],[-1,4],[1,8],[-2,-2],[-2,1],[-2,2],[-2,11],[-3,9],[-3,0],[-1,3],[0,7],[-2,4],[-3,3],[-2,3],[-3,11],[-1,3],[-2,2],[-2,-2],[-2,-8],[-2,1],[-2,2],[-1,11],[-1,7],[1,13],[2,12],[1,18],[2,12],[2,4],[2,16],[3,20]],[[6961,7541],[-2,3],[1,1],[1,-4]],[[6881,7324],[1,5],[1,13],[1,5],[4,9],[2,7],[3,5],[3,6],[2,8],[-1,4],[-5,8],[-2,5],[-1,7],[0,5],[3,12],[-1,4],[-2,2],[-10,0],[-1,7],[-1,2],[-6,3],[-1,3],[2,12],[1,1],[2,5],[5,3],[5,-1],[5,-2],[9,-2],[3,2],[2,4],[1,6],[0,6],[3,0],[1,1],[0,3],[2,-1],[1,1],[-2,6],[0,2],[4,1],[1,3],[-2,1],[-8,0],[1,3],[8,2],[8,-2],[1,1],[-1,5],[2,0],[0,2],[-3,14],[2,1],[1,3],[0,5],[3,4],[6,-7],[2,-1],[8,7],[4,2],[5,6],[2,6],[2,0],[3,-6],[3,-4],[-1,-4],[3,-2],[-1,-5],[-5,-5],[-4,-7],[0,-5],[4,-2],[2,-6],[1,-1],[7,2],[2,0]],[[6474,7418],[-2,6],[0,9],[1,-1],[1,-14]],[[6496,7334],[0,4],[-2,30],[0,7],[1,13],[0,7],[-1,7],[1,6],[0,7],[1,7],[-2,9],[-3,5],[0,6],[-3,0],[-4,5],[-4,2],[-2,0],[-3,-4],[0,10],[3,10],[2,-3],[5,-2],[3,1],[-2,6],[-2,1],[0,10],[1,4],[-1,2],[-2,1],[-3,0],[-8,2],[-1,-6],[-2,1],[-2,8],[-2,10],[0,10],[1,9],[2,8],[1,10],[2,10],[1,-4],[2,-5],[3,-4],[4,-2],[3,1],[3,2],[2,-1],[4,-8],[3,-1],[6,3],[3,1],[3,-2],[2,0],[-1,4],[0,4],[1,2],[5,-2],[5,4],[0,7],[-1,3],[0,3],[-14,18],[-3,5],[-3,20],[-3,13],[-3,2],[-4,0],[-9,-3],[-3,1],[-6,-7],[-2,-5],[-2,-10],[2,-4],[0,-2],[-2,-15],[-2,1],[-4,9],[-3,15]],[[6554,7563],[7,0],[22,-3],[2,4],[-2,7],[-2,23],[2,4],[2,2],[4,7],[1,3],[3,1],[8,1],[4,1],[3,9],[0,5],[3,4],[7,-4],[3,-8],[2,0],[0,3],[-1,4],[-6,10],[-2,1],[0,2],[3,3],[3,-1],[3,0],[2,1],[1,5],[8,-12],[5,-2],[2,0],[2,-3],[2,-7],[5,-3],[9,0],[3,-1],[4,-6],[-1,-3],[0,-6],[-1,-4],[4,-3],[3,-4],[0,-2],[-3,-2],[0,-4],[1,-3],[0,-3],[-2,-7],[0,-3],[11,-11],[2,-1],[6,2],[4,0],[1,-1],[6,-1],[1,-1],[4,0],[4,5],[5,-2],[7,-9],[2,-3],[2,-8],[2,-12],[2,-9],[3,-4],[2,-8],[2,-17],[1,-3],[2,-2],[3,-5],[7,-8],[4,-5],[13,-15],[6,-11],[6,-7],[6,-6],[4,1],[6,-9],[3,-3],[1,-2],[4,-3],[8,-8],[8,-11],[6,-6],[4,-1],[3,3],[7,-4],[2,-2],[4,-6],[7,-3],[2,-3],[0,-2],[-3,-8],[-1,-11],[0,-8],[1,-6]],[[8444,4645],[5,5],[6,4]],[[8469,4668],[3,5],[2,9],[2,3],[5,4],[12,5],[10,0],[10,1],[3,1],[3,2],[6,6],[3,-2],[4,-1],[2,-1],[1,-2],[-5,-9],[-6,-8],[-3,-2],[-4,-2],[-3,-2],[-2,-5],[-3,-3],[-6,-2],[-2,-3],[-5,-5],[-2,0],[-3,-1],[-9,-7],[-5,-7],[-4,-7]],[[8489,4714],[-2,-9],[-2,2],[3,7],[1,0]],[[141,3956],[0,-8],[-2,4],[0,2],[2,2]],[[134,3964],[1,2],[1,-2],[-2,-5],[-1,2],[-4,4],[1,2],[2,0],[2,-3]],[[167,4110],[-1,-4],[-2,4],[2,4],[2,-1],[0,-2],[-1,-1]],[[3304,5767],[-4,-3],[-12,-1],[-5,1],[3,6],[1,3],[3,1],[1,1],[1,15],[-1,4],[0,2],[-1,2],[-3,2],[1,2],[4,1],[2,2],[6,1],[7,2],[-3,-10],[0,-16],[2,-4],[-1,-4],[0,-5],[-1,-2]],[[3311,5827],[-1,0],[0,2],[3,4],[4,3],[1,0],[-1,-4],[-6,-5]],[[5303,7126],[-2,-2],[-3,1],[-1,2],[0,8],[5,0],[4,-6],[-3,-3]],[[5312,7185],[-4,-4],[1,4],[3,4],[0,-4]],[[5237,7311],[7,3],[7,9],[2,3],[15,8],[4,-2],[0,-3],[-1,-2],[1,-5],[2,3],[-1,4],[6,0],[3,-3],[0,-10],[4,-9],[-1,-5],[3,-3],[3,3],[2,5],[5,3],[5,8],[3,1],[2,-12],[-2,-2],[-2,-5],[-5,-15],[-4,-4],[-4,-6],[-1,-3],[0,-5],[1,-8],[2,-9],[3,-5],[3,-1],[6,-8],[0,-11],[1,-6],[2,-6],[-5,-12],[-2,-8],[-5,-12],[-4,-8],[-10,-11],[-2,-4],[-2,-8],[0,-5],[3,-12],[4,-7],[4,-4],[8,2],[-1,-5],[1,-5],[3,0],[2,1],[1,5],[4,-4],[2,-11],[3,-3],[-2,-4],[4,-2],[2,1],[3,-2]],[[5720,7495],[-6,-2],[-2,2],[2,4],[5,2],[2,-4],[-1,-2]],[[5996,7252],[2,5],[-4,18],[2,5],[4,7],[4,8],[0,8],[-1,3],[-3,3],[-4,-3],[-3,-4],[-4,-3],[0,-5],[-3,-3],[-4,-1],[-6,3],[-10,10],[-3,1],[-3,-2],[-8,-10],[-8,-16],[-9,-9],[-5,-2],[-2,1],[-14,-4],[-4,-3],[-7,4],[-5,4],[-2,5],[-5,11],[-3,5],[-6,4],[-12,11],[-11,3],[-9,1],[-2,-4],[0,-16],[-2,-4],[0,-8],[-1,-3],[-2,-1],[-3,2],[-1,2],[-4,-4],[-11,-5],[-10,6],[-6,8],[0,7],[-2,4],[0,6],[-2,1],[-2,-2],[-3,0],[-2,1],[-7,6],[-5,1],[-3,-8],[-2,-2],[-3,-1],[0,2],[2,5],[-8,-1],[-4,-3],[-3,0],[-2,2],[0,2],[4,2],[9,1],[2,2],[2,5],[4,4],[0,2],[-3,0],[-13,-1],[-8,1],[-1,-3],[-2,0],[0,6],[1,3],[2,-1],[5,3],[-1,5],[-3,3],[-1,2],[-4,3],[0,6],[-2,6],[-2,3],[0,2],[4,2],[1,9],[-1,6],[-2,0],[-6,5],[-1,-1],[-2,5],[-4,3],[-4,-2],[-3,3],[-3,2],[-1,2],[2,5],[2,0],[0,4],[-2,7],[1,4],[1,1],[2,-1],[2,-4],[1,-4],[0,-4],[1,-4],[2,4],[2,-2],[2,0],[7,2],[1,2],[-5,0],[-2,2],[-2,4],[-2,9],[4,4],[3,6],[-2,3],[-2,-1],[-1,2],[0,3],[1,3],[0,3],[-4,9],[-1,1],[1,3],[3,5],[2,5],[0,2],[-2,1],[-9,-2],[-4,-2],[-7,-1],[0,5],[1,5],[0,13],[1,7],[4,2],[4,10],[8,11],[7,0],[3,3],[5,0],[1,-4],[4,-3],[7,0],[2,1],[1,2],[-3,6],[1,2],[3,0],[4,-3],[-2,-5],[10,1],[9,-1],[3,1],[8,0],[1,2],[-2,2],[-4,2],[-1,2],[4,6],[3,1],[22,5],[-1,1],[-12,3],[-3,2],[-4,5],[-2,4],[0,6],[1,4],[2,3],[4,0],[17,-4],[12,2],[13,-6],[12,1],[3,3],[3,9],[17,16],[6,8],[7,4],[11,5],[9,7],[3,0],[23,-3],[15,0],[7,6],[4,-2],[-1,-4],[1,-4],[4,-9],[8,-6],[10,5],[3,-2],[4,-15],[3,-5],[3,-3],[3,-1],[2,4],[6,2],[5,-5],[3,-6],[10,-4],[9,-2],[4,-4],[13,-5],[5,1],[8,5],[16,5],[11,-7],[3,-1],[2,1],[4,-2],[3,1],[12,8],[4,5],[4,1],[12,12],[3,6]],[[5777,7601],[-1,-7],[2,-7],[4,-10],[4,-5],[17,-13],[3,-1],[-2,-10],[-1,-3],[-5,-2],[-13,6],[-4,0],[-2,-1],[-4,-4],[-5,2],[-7,-3],[-2,-7],[-5,-9],[-8,-7],[-5,-4],[-9,-14],[-4,-8],[-3,-2],[0,3],[1,4],[0,6],[3,5],[3,3],[7,6],[2,4],[-6,0],[-6,-1],[-4,1],[-3,-1],[-1,5],[-1,2]],[[8288,6596],[1,-4],[-1,-2],[-3,1],[3,5]],[[8360,6486],[-2,-7],[-2,-13],[0,-14],[-1,-6],[-2,2],[-2,4],[0,8],[-3,11],[-3,5],[-2,2],[-2,4],[-1,5],[-2,5],[-2,15],[-2,6],[0,7],[2,11],[-1,7],[1,8],[0,3],[13,44],[4,10],[2,4],[6,18],[1,2],[8,5],[2,6],[4,1],[2,-2],[2,-5],[5,-5],[1,-5],[-2,-5],[-2,-8],[1,-6],[0,-7],[-3,-14],[-3,-13],[-1,-11],[-2,-11],[-1,-15],[-3,-20],[-2,-6],[-4,-11],[-4,-9]],[[6102,4724],[-2,-1],[-1,3],[2,2],[1,4],[4,6],[1,0],[-2,-10],[-2,0],[-1,-4]],[[6096,4828],[2,-13],[0,-2],[-2,-1],[-1,2],[-1,4],[-1,-1],[-2,5],[-2,0],[-2,6],[1,5],[0,9],[2,4],[1,8],[1,-5],[0,-8],[2,-10],[2,-3]],[[6106,4901],[0,-20],[-2,-8],[-1,-3],[-2,2],[-1,2],[2,15],[-1,11],[3,-2],[2,3]],[[6088,4913],[0,-5],[-2,-12],[0,-4],[-1,-6],[-1,-4],[-2,-17],[-2,-6],[-3,-14],[0,-11],[2,-15],[3,-8],[2,-2],[2,-3],[3,-8],[1,-7],[5,-4],[2,-8],[0,-6],[-3,-5],[-2,-8],[-2,-10],[0,-15],[1,2],[3,-4],[0,-11],[-3,-20],[0,-5],[2,-16],[3,-8],[0,-3],[-1,-2],[5,-14],[0,-13],[2,-9],[0,-9],[2,-6],[0,-5],[-2,-5],[4,-1],[4,-8],[2,0],[2,-2],[2,-3],[5,-6],[2,-5],[0,-1]],[[5913,4641],[-1,2],[-3,3],[-4,3],[-4,4],[-1,3],[-6,2],[-3,3],[-2,0],[-3,1],[0,6],[-3,3],[-2,-1],[-2,0],[-4,6],[0,5],[-2,4],[-3,3],[-8,-1],[-3,4],[-2,4],[-2,5],[-1,7],[-1,4]],[[5846,5122],[3,0],[2,1],[2,2],[2,1],[18,0],[10,0],[15,0],[10,0],[15,0],[18,0]],[[5888,7845],[0,-3],[-9,3],[-3,3],[0,2],[12,-5]],[[6060,7896],[-1,-1],[-9,1],[-8,-1],[-6,-9],[-3,0],[-5,-3],[-3,-3],[-4,-6],[-3,3],[-4,0],[-3,-2],[-4,-4],[-3,-1],[-4,1],[-6,-2],[-12,-14],[-4,-10],[-3,-5],[-3,-1],[7,10],[0,5],[-1,4],[-5,-10],[-3,-1],[-3,-3],[0,-12],[5,-16],[6,-15],[6,-8],[3,0],[5,5],[7,-1],[2,3],[6,2],[8,-4],[-4,-9],[0,-5],[-1,-5],[-5,-2],[-5,0],[-5,-1],[-5,5],[-3,1],[-3,-1],[-3,-7],[-6,-5],[-1,-5],[-6,1],[-5,-1],[-7,-5],[-5,-10],[-6,-7],[-4,-2],[-4,1],[-3,2],[-6,7],[1,3],[4,17],[-1,4],[-1,7],[-5,5],[-3,-1],[-2,1],[-8,9],[-4,1],[-4,-2],[-2,1],[-1,3],[9,11],[9,9],[3,1],[6,4],[5,7],[-2,8],[-4,-2],[-5,4],[-2,3],[-7,-3],[-4,0],[-9,-2],[-4,2],[-8,8],[-3,1],[-3,0],[-1,3],[6,2],[0,4],[-8,2],[-3,2],[-2,3],[5,0],[4,-2],[7,-1],[7,-2],[1,3],[-1,2],[-7,2],[-4,7],[-1,4],[1,4],[-2,4],[0,-12],[-1,-4],[-2,-1],[-7,2],[-1,4],[-3,-6],[-2,-1],[-5,1],[-10,-4],[0,-5],[-3,-10],[-5,-11],[0,-1],[-8,-13],[-6,-4],[-5,-4],[-3,2],[-3,-4],[0,-5],[2,-4],[2,-11],[-1,-5]],[[3517,3240],[-2,-2],[-3,-14],[-6,-13],[-1,-8],[-6,-8],[-5,-9],[-2,1],[-3,-4],[-15,-12],[-5,2],[-4,0],[-4,5],[-8,2],[-6,-2],[-7,-5],[-3,0],[-4,2],[-2,5],[-11,6],[-9,13],[-10,0],[-8,-2],[-4,10],[-7,12],[-5,11],[-1,11],[1,12],[1,15],[0,4],[2,3],[2,0],[2,4],[2,10],[-2,8],[0,11],[-2,5]],[[678,6278],[-2,-2],[-1,0],[-6,6],[0,18],[-2,12],[-2,9],[1,5],[3,3],[2,7],[-2,9],[1,5],[1,1],[6,-6],[11,-10],[3,-7],[1,-7],[2,-1],[1,-5],[4,-7],[-1,-4],[-6,-8],[-7,-3],[-6,-9],[-1,-6]],[[643,6380],[-2,-2],[-2,1],[0,4],[-2,5],[3,1],[3,-3],[1,-3],[-1,-3]],[[653,6389],[0,-1],[5,2],[4,-4],[1,-2],[3,-3],[0,-5],[-3,-4],[-6,-2],[-3,1],[0,5],[-1,5],[-2,0],[-2,2],[-2,4],[0,3],[1,4],[2,1],[1,-3],[2,-3]],[[632,6405],[6,-1],[3,-1],[5,-1],[-1,-3],[-3,-3],[-4,2],[-8,1],[1,3],[0,4],[1,-1]],[[616,6419],[2,0],[2,-7],[-1,-3],[-3,-1],[-3,4],[-2,-1],[-4,0],[0,4],[-3,6],[0,3],[-1,3],[4,0],[3,6],[2,0],[3,-8],[0,-5],[1,-1]],[[550,6441],[-2,-2],[1,6],[3,6],[2,0],[-1,-3],[0,-3],[-3,-4]],[[572,6447],[-2,-4],[-1,2],[-3,0],[-1,3],[-3,2],[-1,3],[2,6],[4,4],[6,0],[1,-4],[0,-6],[-2,-6]],[[2766,6631],[-5,-10],[0,2],[3,6],[0,3],[2,2],[1,3],[0,3],[2,3],[1,0],[-4,-12]],[[2300,6690],[-3,10],[-3,28],[1,-1],[4,-29],[1,-8]],[[2295,6756],[-1,1],[3,12],[1,1],[-3,-14]],[[2304,6790],[1,7],[3,6],[1,-2],[-5,-11]],[[2359,6862],[5,8],[1,3],[2,0],[-3,-5],[-5,-6]],[[2449,6882],[-1,0],[-4,5],[0,2],[3,2],[2,-3],[1,-3],[-1,-3]],[[2521,6916],[-3,-1],[1,3],[2,1],[0,-3]],[[1712,7074],[-4,1],[-1,5],[-2,5],[1,1],[1,-4],[4,-7],[1,-1]],[[1682,7097],[-2,-1],[-2,4],[2,0],[1,-3],[1,0]],[[1712,7106],[1,-4],[-2,1],[-2,-1],[0,3],[-1,3],[-2,1],[0,3],[5,-4],[1,-2]],[[1665,7137],[-2,-1],[-2,1],[-2,5],[5,1],[2,-2],[-1,-4]],[[1669,7146],[6,-3],[3,2],[1,-2],[-1,-1],[-7,-2],[-2,1],[0,5]],[[2901,7213],[-4,-2],[0,1],[4,3],[1,12],[1,5],[-1,10],[1,-1],[0,-16],[-1,-10],[-1,-2]],[[2938,7517],[-1,0],[1,6],[4,2],[0,-2],[-2,-5],[-2,-1]],[[2985,7544],[-2,-4],[2,0],[6,6],[4,2],[1,-2],[-6,-7],[-3,-1],[-3,-3],[-6,-3],[-12,-7],[-2,0],[-10,-3],[-5,1],[0,2],[-2,0],[-1,-3],[-3,-1],[0,3],[1,3],[3,6],[5,4],[1,-1],[2,4],[3,0],[3,2],[3,-2],[6,3],[6,0],[6,1],[2,2],[1,-2]],[[3055,7560],[-2,-1],[-5,2],[4,2],[2,3],[1,-6]],[[3041,7567],[-8,-3],[3,7],[2,0],[3,-4]],[[3017,7573],[-1,-1],[0,6],[1,0],[0,-5]],[[3020,7573],[-1,-1],[-1,2],[0,3],[1,4],[2,2],[-1,-10]],[[3093,7729],[-2,-1],[0,4],[1,0],[1,-3]],[[3105,7737],[-3,-1],[0,-4],[-3,3],[0,4],[3,5],[2,-1],[1,-6]],[[1600,7913],[-3,0],[-1,2],[2,1],[2,-3]],[[1597,7925],[-1,-1],[-2,2],[2,4],[1,-5]],[[1595,7957],[1,-4],[4,-6],[0,-3],[-2,0],[0,2],[-3,2],[-1,2],[0,5],[-1,2],[-2,1],[-1,3],[0,3],[3,6],[1,0],[2,-3],[-1,-2],[-4,-3],[0,-1],[3,-1],[1,-3]],[[1588,7973],[-1,-1],[-2,2],[0,5],[1,1],[2,-7]],[[1582,7977],[-2,-1],[-2,2],[0,5],[2,0],[2,-4],[0,-2]],[[1589,7987],[-1,-3],[-2,-2],[-3,2],[0,3],[2,2],[4,-2]],[[3135,7785],[-1,-2],[2,-8],[-1,-3],[0,-3],[3,-1],[0,-3],[-5,-8],[-5,1],[-3,-3],[-2,0],[-2,-4],[-3,-1],[-3,1],[-2,-7],[-2,0],[0,-2],[-2,-2],[-2,6],[-1,1],[-3,0],[-3,-4],[-2,4],[-2,-7],[0,-7],[-2,0],[-1,3],[-5,1],[0,3],[1,3],[-1,1],[1,3],[-1,2],[-1,-3],[-3,-3],[0,-5],[-3,-10],[0,-5],[-2,-3],[-3,-3],[-3,1],[-3,-3],[-1,-3],[-4,-1],[0,4],[-1,2],[-1,-2],[-1,-6],[-2,-4],[-2,2],[-3,-2],[0,2],[-2,1],[-3,-4],[-3,-5],[2,-3],[-4,-8],[-5,-8],[-3,-12],[-3,-4],[-2,-14],[1,-3],[0,-3],[1,-3],[3,0],[1,-3],[-2,0],[-2,-3],[-2,-1],[-1,-3],[-5,-10],[1,-1],[5,-2],[2,-2],[4,-11],[-1,-3],[3,-3],[0,-8],[3,-3],[4,-1],[4,2],[4,3],[0,3],[-3,6],[0,3],[-2,2],[-1,-2],[-1,4],[4,-1],[3,-7],[1,-9],[1,-5],[-1,-2],[-3,0],[-9,-3],[-3,-3],[-5,-2],[1,4],[-1,6],[-1,0],[-7,-10],[-3,0],[-3,-3],[-1,9],[2,6],[-1,0],[-3,-4],[-1,2],[0,3],[-2,2],[1,-6],[-2,-4],[0,-10],[-3,-4],[-6,-3],[-9,0],[-5,-2],[-3,1],[-3,-2],[-10,-1],[-2,1],[-3,-4],[-5,-2],[-11,-9],[-7,-11],[-2,-1],[-1,2],[-3,-7],[-4,-4],[-2,-7],[1,-4],[5,-2],[2,1],[0,-3],[1,-4],[-1,-4],[0,-5],[-2,-10],[-2,-3],[-1,-13],[-2,-6],[-5,-9],[0,-4],[-2,-3],[-1,1],[-2,-4],[-1,-4],[-4,-12],[-4,-4],[-1,1],[2,11],[-5,4],[-2,0],[-3,4],[-3,3],[-5,9],[0,6],[3,11],[2,2],[6,3],[-1,1],[-6,-3],[-2,-3],[-1,-4],[-2,-4],[0,-10],[1,-4],[3,-7],[1,-11],[2,-7],[4,-9],[2,-2],[1,-3],[-2,-6],[2,-3],[1,-4],[0,-4],[-3,-3],[0,-5],[-2,-3],[-2,-7],[-2,-3],[-7,-25],[1,-4],[-4,-3],[-3,-5],[-1,-7],[-2,-9],[-2,7],[3,20],[3,8],[2,4],[2,7],[-3,2],[-3,-1],[2,7],[-4,5],[2,5],[0,6],[-1,0],[-1,-3],[-3,-2],[-5,5],[-2,8],[1,6],[2,1],[2,-1],[2,1],[-4,5],[-1,3],[-2,1],[3,4],[0,4],[-2,1],[-2,-2],[0,6],[4,-1],[1,5],[-2,-1],[0,8],[2,7],[4,5],[1,3],[0,3],[-1,3],[-2,0],[0,-5],[-2,-4],[-2,-1],[-2,-4],[-1,3],[-2,-4],[0,-3],[-1,-1],[-4,2],[0,-1],[4,-7],[0,-3],[-2,-4],[0,-13],[-1,-2],[1,-12],[1,-4],[2,-3],[0,-3],[-1,0],[1,-6],[2,-7],[0,-3],[-4,5],[-3,3],[-5,2],[-3,4],[-1,-2],[-3,9],[-4,-3],[-2,1],[0,7],[5,10],[1,4],[-1,0],[-1,-4],[-5,-6],[-1,-4],[0,-8],[1,-3],[6,1],[4,-10],[7,-3],[3,-3],[2,-4],[3,-3],[3,-4],[0,-3],[-1,-3],[0,-4],[-1,-3],[-3,0],[-2,1],[-8,14],[-4,10],[-4,4],[-1,0],[8,-13],[3,-8],[3,-3],[2,-5],[7,-6],[-2,-2],[3,-2],[0,-8],[-4,2],[0,-5],[-2,-2],[-2,2],[-6,12],[0,-2],[4,-9],[3,-4],[3,-2],[3,-6],[0,-4],[-1,-2],[-2,-1],[-2,2],[-1,3],[-3,4],[0,4],[-2,0],[-9,6],[0,-3],[2,-3],[7,-3],[1,-7],[4,-5],[1,-3],[2,-1],[4,4],[3,-2],[4,-1],[2,-8],[5,-31],[-2,2],[-2,17],[-1,4],[-1,-3],[-1,-6],[1,-2],[3,-10],[-1,-5],[-4,3],[-3,3],[0,-8],[-2,1],[0,-2],[-5,1],[-2,-7],[-2,0],[-4,3],[-1,-7],[10,0],[4,2],[4,-1],[0,-16],[2,2],[1,10],[3,4],[1,-1],[2,-6],[0,-5],[-1,-6],[-5,-8],[-4,-8],[-2,-1],[-3,0],[-4,3],[-1,-1],[-1,2],[-1,5],[-2,1],[-1,-5],[-2,-1],[6,-9],[-2,-3],[-1,-4],[0,-5],[-5,-4],[-2,1],[-1,-2],[4,-2],[8,3],[3,-3],[-2,-6],[-2,-4],[-3,0],[-3,-1],[0,-3],[-11,0],[-5,-6],[-2,1],[0,5],[-1,2],[0,-10],[1,-2],[-4,-4],[-7,-10],[-3,-8],[0,-5],[-1,-7],[-1,3],[-1,0],[-1,-4],[-11,0],[-4,-3],[-8,-8],[-2,-4],[-6,-15],[-2,-9],[-1,4],[-1,0],[1,-7],[-1,-3],[-4,-6],[-2,0],[-3,-2],[0,-5],[-6,-7],[-3,1],[1,-5],[-1,-3],[-5,-5],[-2,1],[-2,-4],[-3,-2],[-6,2],[1,-3],[2,-3],[0,-4],[-1,-2],[-3,-2],[-1,6],[-3,-5],[2,-3],[0,-2],[-2,-4],[-3,-2],[0,-5],[-2,-5],[-3,-3],[-2,-1],[1,-2],[0,-3],[-2,-2],[-1,-5],[1,-3],[-3,-2],[0,-2],[2,-1],[-2,-5],[-1,-4],[-2,-1],[2,-5],[-2,-5],[-2,1],[-1,-4],[1,-2],[-2,-10],[0,-11],[2,-5],[2,-21],[1,-8],[2,-20],[4,-19],[6,-23],[9,-29],[1,-4],[-1,-3],[0,-15],[-1,0],[0,20],[-1,0],[0,-8],[-1,-2],[-1,7],[0,3],[1,5],[-2,1],[-1,3],[1,3],[-2,2],[0,-7],[1,-5],[1,-10],[2,-6],[1,-6],[12,-56],[3,-7],[1,-5],[1,-11],[0,-13],[-2,-26],[-1,-14],[-4,-15],[-1,-11],[-1,-6],[-3,-6],[-2,1],[-5,-5],[-4,1],[-4,-2],[-3,0],[-1,5],[0,5],[2,1],[3,-6],[1,2],[-1,3],[-4,3],[-3,13],[-3,8],[-1,6],[-6,4],[-4,5],[-2,9],[-2,17],[-2,2],[1,7],[-3,-3],[-1,1],[-1,8],[1,11],[1,4],[-5,-1],[1,-4],[-1,-2],[-3,2],[-1,4],[-3,7],[-5,20],[-2,6],[2,1],[3,9],[2,5],[1,4],[-1,3],[-1,-2],[-1,1],[-2,5],[-2,0],[1,-4],[1,-1],[-1,-8],[-2,0],[-1,-2],[-2,4],[-1,4],[3,23],[2,14],[0,16],[1,3],[-4,14],[-14,23],[-12,27],[-9,10],[-8,-2],[-2,-5],[1,-3],[-1,-1],[-4,-1],[-7,-7],[-3,0],[-4,-3],[-8,-2],[-1,1],[2,6],[-2,4],[-9,14],[2,0],[-1,4],[0,3],[-1,2],[-3,-6],[-2,3],[-9,6],[-7,4],[6,2],[3,-1],[0,2],[-4,3],[-3,-1],[-2,1],[-4,-4],[-3,-2],[-8,-1],[0,3],[1,4],[-1,4],[-2,-4],[-3,2],[-1,-5],[-2,-6],[-6,-3],[1,6],[-2,-2],[-3,-6],[-4,2],[-2,7],[-2,2],[0,7],[-1,3],[-2,3],[-1,-6],[-1,-9],[-1,-3],[-3,0],[-3,1],[-9,-1],[-4,3],[-2,0],[-4,-3],[-5,-2],[-3,1],[-3,-7],[-4,-3],[-10,6],[-5,6],[-3,0],[-3,-6],[-2,-8],[3,-4],[3,-2],[5,2],[3,3],[4,1],[1,2],[2,-3],[-4,-4],[-1,-2],[2,-5],[5,-1],[0,5],[2,4],[3,-1],[0,-4],[1,-3],[0,-6],[-5,-3],[-2,-6],[-2,1],[-1,-4],[1,-4],[3,-3],[2,-4],[7,-5],[2,0],[3,-7],[2,-1],[-1,-3],[-2,-3],[-1,-3],[-3,2],[-3,-5],[0,5],[-1,2],[-1,5],[-2,3],[-2,1],[-1,2],[-5,2],[0,3],[-2,4],[-8,5],[0,-4],[3,-3],[0,-5],[-1,-2],[0,-4],[-2,-6],[-2,-1],[-1,1],[-1,7],[-2,3],[-4,0],[-2,-2],[-3,-7],[-2,-1],[-7,4],[-8,5],[2,3],[2,-1],[0,2],[-3,9],[0,3],[-2,-3],[-5,3],[-4,11],[-4,0],[-2,5],[-4,-2],[-2,-3],[-1,-3],[2,-5],[-1,-1],[-5,-2],[-11,2],[-3,2],[-5,5],[-6,4],[-3,0],[-3,-1],[-8,0],[-4,-3],[-2,5],[2,3],[2,5],[-2,2],[-3,-9],[1,-8],[-6,-1],[-13,-10],[-5,-6],[0,2],[7,7],[-3,1],[-3,-2],[-1,1],[1,6],[0,6],[-3,0],[-2,-4],[-2,2],[-1,-1],[1,-10],[2,-9],[-6,-12],[-1,-5],[-3,-6],[-3,-4],[-8,-9],[-5,-6],[-5,-3],[0,2],[-3,0],[-4,2],[-3,0],[0,-2],[-2,-2],[-3,5],[0,2],[-2,0],[3,-13],[3,-2],[-4,-5],[-3,-1],[-3,4],[0,-5],[-1,-6],[-2,-4],[-1,2],[-3,-2],[-4,-1],[1,-4],[3,1],[-1,-6],[-3,-6],[-2,-1],[-4,1],[-1,-2],[4,-10],[-3,-14],[-1,-6],[-3,0],[-4,4],[0,-6],[5,-3],[1,-4],[0,-3],[-2,-3],[-1,-5],[1,-4],[1,-8],[1,-4],[1,-12],[1,-5],[5,-19],[2,0],[0,-6]],[[1746,7057],[0,7],[-2,2],[-1,-1],[-1,8],[0,8],[-2,9],[-4,11],[-9,14],[-4,5],[-4,6],[-5,2],[-1,-3],[-3,2],[1,6],[-4,10],[-2,1],[-7,-1],[-8,5],[-3,3],[-1,5],[-4,5],[-5,5],[-3,-1],[-4,0],[-5,4],[-4,0],[-6,-1],[-2,1],[-5,6],[1,5],[-1,5],[1,3],[-1,8],[0,10],[-6,5],[-1,4],[1,5],[-1,4],[-3,3],[-4,7],[-4,4],[-1,7],[-3,4],[-1,4],[-5,13],[-6,10],[-1,6],[0,8],[2,5],[1,4],[0,7],[-2,5],[-8,3],[-7,12],[0,10],[-2,10],[0,6],[-1,7],[4,1],[0,-8],[4,-5],[2,-4],[2,-1],[-2,9],[-2,6],[-2,3],[-1,6],[-1,1],[0,3],[4,4],[4,1],[10,-1],[1,2],[-2,1],[-3,-1],[-4,3],[-4,-3],[-1,0],[-4,4],[-4,-2],[0,-15],[-1,-1],[-2,3],[-2,1],[-3,3],[-4,6],[-1,3],[-1,7],[0,3],[-2,2],[-2,8],[-4,5],[-4,8],[-8,13],[0,12],[-3,15],[1,8],[0,6],[-1,9],[-8,19],[-6,9],[-1,7],[0,7],[2,12],[2,-1],[0,8],[2,8],[0,11],[2,13],[0,4],[-1,10],[-4,9],[1,6],[0,6],[-4,8],[-1,10],[-1,4],[1,12],[-1,5],[-3,8],[5,31],[2,1],[2,3],[-1,1],[0,6],[2,7],[1,2],[0,21],[1,16],[2,5],[-1,6],[1,7],[-1,7],[3,36],[0,5],[1,5],[-1,16],[0,19],[-1,2],[1,1],[1,-3],[7,0],[4,3],[2,-1],[2,-3],[2,1],[-3,3],[-1,2],[-5,0],[-1,2],[-6,-2],[-2,2],[-3,-1],[1,5],[2,4],[2,13],[-2,3],[-3,2],[-1,7],[7,5],[-4,2],[-1,2],[-4,-1],[0,4],[-1,7],[-3,12],[-2,14],[-2,8],[-4,6],[-2,5],[-1,10],[1,7],[-1,6],[2,0],[6,-5],[7,-3],[2,-2],[4,-2],[18,-3],[2,0],[3,2],[4,-5],[4,1],[2,-1],[3,-8],[0,-3],[-3,-8],[-1,0],[0,3],[-7,-14],[-2,-6],[0,-5],[1,-1],[2,1],[-1,2],[0,5],[2,5],[5,5],[1,3],[5,8],[0,5],[2,-1],[0,-8],[-3,-4],[0,-6],[2,-8],[0,-3],[-1,-8],[-2,1],[-1,2],[-1,-1],[-3,2],[-3,-5],[-1,-5],[2,-2],[3,1],[3,-2],[3,3],[1,6],[4,2],[2,4],[-1,9],[0,6],[-1,1],[1,4],[-1,4],[2,6],[3,7],[-1,1],[-3,8],[-1,0],[1,-5],[-1,0],[-3,4],[0,4],[1,2],[2,1],[-2,6],[-3,3],[-2,1],[1,3],[2,-1],[2,1],[-1,3],[0,7],[-1,5],[-3,0],[-2,5],[-1,8]],[[9983,8142],[-5,0],[-9,10],[-5,3],[-3,3],[1,1],[6,-3],[11,-11],[3,-1],[1,-2]],[[103,8166],[-2,-3],[-2,6],[1,1],[3,-4]],[[110,8168],[-2,-2],[-3,3],[0,3],[5,-4]],[[58,8158],[-1,-2],[-4,4],[3,3],[-2,4],[-3,3],[-1,3],[2,1],[4,0],[3,-4],[2,-1],[-1,-9],[-2,-2]],[[79,8162],[-1,-1],[-11,0],[-2,-1],[-1,2],[12,5],[2,6],[3,0],[0,-2],[-2,-2],[0,-7]],[[94,8171],[0,-2],[4,-1],[0,-5],[-2,1],[-1,-2],[-6,-5],[-2,3],[-1,6],[4,3],[1,9],[3,-1],[1,-3],[-1,-3]],[[9959,8174],[-2,-1],[-1,2],[1,3],[3,-2],[-1,-2]],[[9991,8173],[-5,-1],[-1,5],[3,3],[4,-3],[-1,-4]],[[110,8179],[-1,-2],[-4,5],[1,2],[4,-1],[1,-3],[-1,-1]],[[9927,8172],[-3,-3],[-2,4],[4,4],[4,2],[1,6],[3,-1],[-2,-6],[0,-3],[-5,-3]],[[179,8186],[5,-2],[9,0],[0,-1],[-9,-2],[-9,1],[-4,-1],[-5,3],[0,2],[6,-1],[4,2],[3,-1]],[[209,8194],[-2,-1],[-3,1],[3,5],[2,2],[2,-1],[2,-3],[-4,-3]],[[147,8180],[-15,-2],[0,3],[3,0],[6,3],[7,2],[5,3],[5,2],[1,3],[-4,1],[-1,2],[2,1],[5,5],[4,-3],[1,-2],[-1,-5],[-4,-3],[2,-4],[-6,-3],[-10,-3]],[[9824,8199],[-2,0],[-1,2],[-6,1],[1,2],[2,0],[4,3],[4,0],[-2,-8]],[[257,8212],[-2,-1],[-1,2],[4,6],[3,-2],[0,-2],[-4,-3]],[[286,8227],[-1,-3],[-7,1],[0,2],[4,2],[2,0],[2,-2]],[[9799,8237],[5,-2],[3,1],[4,-3],[5,-6],[-1,-1],[-9,-1],[-4,-3],[-4,2],[-2,5],[-6,3],[5,4],[4,1]],[[334,8256],[-9,-6],[-2,-5],[-3,-4],[-1,-3],[-3,-1],[-4,-3],[-9,-8],[0,2],[5,5],[3,6],[0,6],[4,6],[6,0],[2,2],[-1,2],[0,5],[3,5],[2,2],[6,1],[5,-3],[-1,-7],[-3,-2]],[[383,8278],[-2,1],[2,4],[1,-2],[-1,-3]],[[371,8288],[1,-3],[3,2],[3,7],[1,-2],[3,-2],[-9,-12],[0,-2],[5,2],[2,-2],[-4,-2],[-2,-3],[-5,-4],[-2,-4],[-5,-1],[-6,-2],[-4,-4],[-2,0],[-4,-4],[-4,-1],[-3,2],[-1,2],[5,3],[3,1],[11,7],[1,7],[2,3],[4,0],[1,-3],[3,4],[-4,3],[-4,0],[-3,5],[1,3],[3,3],[4,1],[3,2],[3,-1],[0,-5]],[[393,8298],[-2,-2],[-1,1],[-3,-1],[-2,4],[0,2],[2,3],[4,1],[4,-4],[2,-1],[-1,-3],[-3,0]],[[401,8301],[-2,0],[-1,7],[2,2],[3,-4],[0,-2],[-2,-3]],[[484,8317],[-2,-2],[-5,4],[0,3],[5,-2],[2,-3]],[[491,8342],[-4,5],[4,3],[2,-1],[0,-2],[-2,-5]],[[458,8350],[4,-11],[4,-2],[2,-2],[1,-3],[-7,4],[-5,-6],[-15,-1],[-5,-2],[-4,-8],[-6,-2],[-4,0],[-3,3],[-1,5],[0,4],[5,4],[5,11],[2,2],[5,-1],[4,4],[8,4],[1,1],[6,0],[3,-4]],[[573,8350],[-2,0],[-1,5],[2,-1],[1,-4]],[[1351,8356],[3,-8],[0,-2],[-3,-1],[-3,1],[0,5],[-4,5],[1,3],[-1,7],[2,0],[3,-3],[2,-7]],[[559,8359],[-5,-5],[-4,-6],[0,4],[1,1],[-1,5],[2,1],[2,3],[2,1],[1,4],[2,-1],[-1,-2],[1,-5]],[[1309,8345],[2,2],[2,0],[3,-2],[-1,-3],[0,-5],[-2,-4],[-3,1],[-5,9],[-6,13],[-1,5],[-5,2],[-1,3],[1,3],[4,1],[5,-6],[3,-6],[0,-5],[4,-8]],[[546,8371],[-1,-5],[-4,4],[0,2],[4,0],[1,-1]],[[536,8369],[3,4],[1,-1],[-1,-3],[1,-4],[2,-2],[-4,-3],[-6,1],[-1,8],[2,4],[2,2],[1,-1],[0,-5]],[[1296,8383],[1,-3],[-4,-4],[-3,-7],[-3,-2],[0,8],[-3,5],[3,2],[5,-1],[4,2]],[[678,8399],[-1,-2],[-3,0],[-1,2],[4,5],[1,0],[0,-5]],[[1361,8379],[-1,-6],[-2,-6],[-3,-4],[-2,1],[-1,3],[-3,0],[-1,2],[1,3],[-1,3],[-2,-4],[-6,-7],[-2,0],[-1,11],[2,5],[3,5],[1,14],[10,7],[1,0],[3,-5],[4,-8],[0,-14]],[[1289,8428],[5,-1],[5,0],[2,-2],[2,-5],[0,-4],[-1,-2],[10,-5],[6,-9],[3,-9],[4,-8],[2,-2],[0,-2],[-3,1],[-6,5],[-2,-7],[5,1],[4,-5],[2,-1],[1,-5],[-1,-4],[6,0],[0,-24],[-1,-5],[-5,1],[-2,4],[-2,6],[-3,2],[-3,0],[-1,6],[-2,6],[-1,-1],[1,-4],[-1,-2],[-2,1],[-4,8],[-4,7],[-1,3],[4,1],[-3,7],[1,5],[-2,1],[-5,0],[-2,3],[0,2],[-5,0],[-3,3],[-1,4],[4,1],[3,-2],[3,3],[0,2],[2,2],[-1,6],[-2,1],[-5,-2],[-4,-3],[-2,1],[0,2],[6,8],[0,2],[-2,2],[0,6],[1,1]],[[1311,8423],[-3,1],[-4,4],[0,3],[4,4],[5,0],[2,-1],[0,-7],[-1,-2],[-3,-2]],[[1330,8415],[-1,-9],[-4,-1],[-4,1],[0,4],[-1,2],[-6,1],[-1,3],[0,4],[3,3],[3,5],[3,10],[2,-1],[7,-14],[-1,-8]],[[703,8434],[-3,-1],[1,5],[6,5],[2,-1],[-6,-8]],[[716,8438],[-2,0],[-2,2],[1,2],[3,2],[3,0],[0,-3],[-3,-3]],[[284,8445],[4,-1],[2,1],[2,-2],[-3,-3],[-2,0],[-3,5]],[[1312,8439],[0,-1],[-4,0],[-2,3],[3,8],[0,6],[7,-10],[1,-3],[-5,-3]],[[1277,8457],[2,-4],[3,1],[2,-8],[0,-3],[-2,1],[-2,-7],[1,-6],[-2,-11],[0,-4],[-2,-1],[-2,1],[-1,-3],[-2,0],[-2,8],[2,12],[3,2],[-2,3],[-4,4],[0,2],[-3,7],[1,6],[3,5],[3,1],[3,-2],[1,-4]],[[1295,8467],[2,-2],[1,2],[5,-2],[3,-5],[0,-14],[-2,-1],[-3,3],[-3,7],[-2,-1],[3,-5],[2,-5],[0,-7],[-1,-1],[-6,0],[-3,-1],[-4,2],[0,6],[-1,7],[0,5],[-4,7],[-3,3],[-1,4],[3,1],[4,0],[10,-3]],[[749,8474],[-4,-2],[-2,-4],[-2,-2],[-2,3],[1,5],[2,3],[9,-1],[-2,-2]],[[273,8477],[-3,-3],[-3,1],[0,3],[7,2],[-1,-3]],[[1250,8487],[3,-7],[1,-5],[2,-5],[2,-13],[2,-4],[0,-11],[-1,-3],[1,-5],[0,-8],[-2,-5],[-2,2],[-2,4],[-3,8],[-1,4],[0,4],[3,4],[-4,0],[-4,4],[0,5],[-4,-1],[-1,1],[0,4],[4,8],[-4,3],[-1,6],[-2,4],[-2,-1],[-4,-12],[-4,-1],[1,3],[-1,10],[1,5],[4,2],[4,9],[4,1],[6,-6],[2,-1],[2,-3]],[[743,8515],[-2,-1],[-1,2],[-5,5],[1,1],[4,-2],[3,-5]],[[752,8514],[0,-3],[2,0],[6,4],[3,0],[3,-2],[0,-2],[-2,-2],[0,-2],[2,-3],[5,-2],[0,-2],[-3,-6],[-2,-1],[-12,2],[-2,1],[-3,-3],[6,0],[3,-5],[-1,-3],[-4,0],[-3,-2],[-2,-3],[-6,-1],[-5,-3],[-2,-2],[0,-2],[-6,-3],[3,-2],[0,-3],[-4,-6],[-6,-5],[-2,1],[0,2],[7,10],[-5,3],[-3,-1],[0,2],[2,3],[-3,2],[-3,0],[-1,-3],[2,-2],[1,-3],[-3,-6],[-2,1],[-4,7],[-2,9],[-4,8],[1,6],[4,7],[4,1],[3,3],[4,1],[3,-1],[1,-3],[-1,-2],[2,-1],[4,-10],[1,1],[-1,4],[0,12],[3,-1],[0,2],[-5,5],[-1,4],[3,3],[3,0],[4,-7],[3,-1],[3,4],[3,-1],[2,5],[0,5],[6,-2],[3,-2],[-2,-4]],[[1229,8538],[4,-6],[-1,-5],[1,-3],[6,7],[6,-1],[6,-5],[0,-4],[-1,-8],[-3,-1],[-4,1],[-3,-2],[2,-2],[8,-1],[2,-4],[1,-4],[-2,-6],[-4,2],[-11,9],[-4,-1],[0,-10],[-2,-3],[-6,1],[-5,13],[-8,10],[-2,2],[-3,5],[1,8],[2,0],[2,2],[2,5],[2,-4],[3,0],[1,2],[3,0],[3,3],[3,1],[1,-1]],[[1268,8537],[0,-1],[-4,0],[-3,2],[-2,4],[4,1],[3,-2],[2,-4]],[[1258,8533],[7,-1],[5,0],[5,-8],[5,-12],[2,-9],[-3,2],[-3,9],[-2,3],[-2,6],[0,2],[-3,2],[0,-5],[1,-5],[5,-10],[4,-7],[0,-5],[-1,-3],[2,-4],[-1,-2],[-5,-2],[-4,-9],[-5,-5],[-2,-1],[-3,5],[0,4],[1,2],[3,11],[0,3],[-5,9],[-3,21],[-5,19],[1,1],[2,-2],[3,-5],[1,-4]],[[766,8545],[2,3],[4,-3],[2,1],[1,-4],[3,0],[0,-4],[-4,-5],[-4,5],[-2,-2],[1,-4],[-7,-2],[-1,3],[-3,-5],[-3,-3],[-5,-1],[-11,5],[7,9],[4,3],[6,-1],[0,4],[-2,4],[4,2],[4,-1],[4,-4]],[[764,8552],[-3,1],[-1,4],[4,3],[3,-1],[0,-2],[-3,-5]],[[529,8557],[-2,-1],[-2,1],[-1,5],[4,4],[6,3],[-5,-12]],[[984,8629],[0,3],[6,7],[2,-1],[-4,-3],[-4,-6]],[[888,8643],[-2,-2],[-5,1],[1,4],[4,2],[5,-3],[-3,-2]],[[896,8628],[-4,1],[1,5],[6,7],[4,4],[4,5],[4,10],[2,0],[3,-2],[1,-2],[-1,-2],[-9,-10],[-1,-5],[-2,-2],[-2,-4],[-4,-2],[0,-2],[-2,-1]],[[385,8661],[2,-3],[7,1],[3,-4],[-1,-6],[0,-6],[3,-2],[1,-7],[-5,-1],[-5,0],[-4,-2],[-1,-5],[-2,0],[-2,3],[-2,1],[-8,1],[-10,7],[-4,2],[-5,5],[-4,6],[6,2],[11,-1],[2,4],[8,5],[3,-1],[3,2],[4,-1]],[[968,8659],[-1,-2],[-3,2],[4,3],[0,-3]],[[933,8665],[1,-1],[6,0],[1,-1],[-3,-3],[-6,-2],[-5,-3],[-1,4],[-2,4],[4,4],[5,-2]],[[898,8665],[-1,-3],[1,-2],[-2,-5],[0,-3],[-2,-3],[-2,3],[-1,4],[2,3],[1,7],[4,-1]],[[777,8660],[1,8],[2,-2],[-3,-6]],[[201,8666],[6,-4],[4,0],[3,-3],[-3,-1],[-7,0],[-9,8],[-3,2],[1,4],[3,2],[2,-6],[3,-2]],[[890,8687],[-3,-1],[-2,1],[2,5],[3,-2],[0,-3]],[[237,8849],[12,-3],[4,0],[6,5],[3,1],[7,-1],[5,-3],[3,-8],[11,-3],[2,-3],[3,-2],[4,1],[2,-1],[6,0],[8,-2],[-1,-6],[-3,-2],[-7,1],[-7,-1],[-6,-7],[-1,-5],[-2,-1],[-4,10],[-4,3],[-6,1],[-2,2],[0,3],[-7,6],[-9,4],[-6,0],[-7,-5],[-6,-2],[-3,1],[-4,4],[-1,3],[0,6],[2,7],[3,2],[5,-5]],[[1388,8402],[-2,-3],[-2,-6],[0,-8],[3,-10],[0,-7],[-4,-9],[-1,-6]],[[1372,8338],[-1,1],[-6,1],[-3,8],[-1,7],[-2,5],[0,2],[2,3],[6,3],[0,2],[-2,0],[-1,2],[0,14],[-1,8],[-6,13],[0,2],[3,5],[-8,-4],[-9,-5],[-4,-3],[-1,-2],[0,-5],[-1,-1],[-1,-6],[-3,-6],[-4,2],[-3,9],[7,12],[4,13],[3,0],[5,3],[-8,1],[-1,1],[-4,8],[-4,2],[-2,4],[-3,4],[0,4],[-4,1],[0,7],[-6,3],[-3,4],[-1,4],[1,6],[-3,-1],[-15,7],[1,10],[-3,12],[-3,5],[1,3],[2,0],[5,-3],[6,-5],[1,1],[-9,9],[-3,6],[1,3],[8,-1],[1,1],[-9,3],[-2,0],[-1,-4],[-3,-1],[-1,1],[-4,8],[-4,4],[-1,8],[1,5],[-5,-4],[-3,4],[-4,4],[-5,1],[-3,4],[-5,11],[-1,7],[-3,2],[-1,3],[-3,13],[-3,9],[-1,5],[-3,-1],[2,-3],[0,-2],[-3,-1],[4,-6],[1,-11],[4,-13],[0,-5],[4,-14],[0,-4],[-3,-3],[-4,2],[-2,2],[-2,5],[-4,2],[-9,-1],[0,4],[1,9],[-5,9],[1,5],[-1,1],[-1,7],[-2,-3],[1,-4],[0,-6],[-3,-1],[-2,1],[-2,3],[-3,2],[-2,4],[-7,3],[-5,3],[1,-4],[0,-5],[2,0],[8,-4],[1,-4],[4,-3],[-2,-4],[5,0],[2,-1],[4,-6],[1,-3],[0,-4],[-2,-2],[-9,-1],[-4,-5],[-3,1],[-4,4],[-6,4],[-13,10],[-1,3],[-3,2],[-5,7],[-5,9],[-9,9],[-5,1],[1,3],[-6,1],[-5,3],[-12,8],[-11,8],[-2,2],[4,2],[4,7],[-2,8],[0,4],[2,3],[2,0],[4,-7],[-1,-6],[1,-7],[1,0],[0,10],[2,3],[4,-1],[2,1],[-7,3],[-6,7],[-2,0],[-3,-2],[-6,-9],[-11,-6],[-12,0],[-5,2],[-13,7],[-3,2],[4,4],[-1,6],[-3,2],[0,-4],[-1,-2],[-6,-3],[-12,4],[-12,3],[-11,1],[-16,-3],[-8,-2],[-10,0],[0,2],[2,2],[-3,4],[-4,2],[-8,2],[-1,2],[-5,2],[-2,3],[1,7],[2,4],[2,7],[-4,-3],[-6,-9],[-4,-4],[-4,1],[-5,3],[-4,1],[-4,0],[-1,1],[4,5],[2,5],[-13,0],[-1,5],[-5,0],[-4,-2],[-2,1],[5,5],[-6,3],[-1,2],[0,5],[1,4],[9,3],[-3,2],[-5,-1],[-4,-3],[-4,-4],[-3,-1],[-2,1],[-4,0],[-2,-1],[-3,-4],[-2,2],[-4,2],[-2,-4],[-4,-2],[-3,0],[-3,5],[1,8],[-5,-2],[-3,1],[-3,-3],[5,0],[-3,-6],[-1,-5],[-2,-1],[-4,0],[0,-2],[4,-4],[4,-1],[-1,-10],[5,2],[2,0],[2,-3],[0,-4],[-6,-3],[-1,-7],[1,-6],[-3,-1],[-4,-9],[-2,0],[-2,-2],[-7,-1],[-5,2],[-3,3],[-4,-2],[-3,6],[-1,0],[0,-6],[-4,-6],[-3,0],[-1,2],[-3,-4],[1,-6],[-1,-1],[-4,3],[-2,-1],[2,-3],[0,-2],[-7,-7],[-4,1],[-4,-3],[-3,2],[-2,-8],[-5,-5],[-2,-5],[-7,3],[-1,-1],[1,-3],[-5,1],[-3,-1],[-4,-3],[-4,0],[-4,5],[-2,1],[2,6],[6,4],[5,1],[3,2],[4,4],[2,3],[4,8],[-2,1],[-8,-7],[-3,-1],[-9,4],[-1,4],[2,8],[5,10],[4,6],[2,4],[2,11],[0,5],[-1,6],[0,4],[1,1],[10,6],[5,4],[9,6],[3,0],[4,-4],[6,-1],[4,2],[6,-1],[13,-4],[3,0],[-2,3],[-13,3],[-10,8],[-3,3],[5,3],[1,5],[7,6],[7,4],[-3,1],[-7,-2],[-3,-3],[-4,-7],[-4,-2],[-10,0],[-2,2],[-2,0],[-10,-6],[-5,-6],[-4,-3],[-5,-1],[-4,-2],[-5,-7],[1,-6],[-7,-5],[-7,-8],[-1,-5],[1,-2],[-1,-2],[-7,-7],[-3,-1],[-4,0],[-3,3],[-3,0],[10,-10],[1,-4],[-1,-3],[-3,-4],[-3,-2],[-7,-1],[-2,-2],[5,-3],[-2,-5],[-4,-2],[-4,0],[0,4],[-3,-1],[-5,-4],[1,-3],[-3,-5],[-2,-2],[-8,-6],[1,-2],[-3,-10],[1,-2],[6,-3],[4,0],[10,-7],[2,-3],[0,-3],[-3,-6],[-7,-7],[-5,-2],[-4,-6],[-2,-7],[-5,-3],[2,-1],[-1,-3],[0,-5],[-1,-1],[-4,0],[-5,-2],[0,-3],[-11,-2],[-4,-8],[-8,-6],[-5,-2],[-1,-4],[-4,-6],[-6,-1],[-1,-1],[0,-5],[-3,1],[-3,-1],[-5,-5],[-1,-3],[2,-4],[0,-2],[-2,-6],[-3,-2],[-1,-3],[-5,0],[-2,-4],[-2,0],[-1,-2],[-5,-5],[-3,-1],[-2,1],[-4,-3],[-1,-5],[-2,-3],[-8,1],[-6,-5],[3,-1],[0,-2],[-4,0],[-2,-2],[-6,-2],[-3,-6],[4,-2],[3,-6],[-4,-5],[-3,-2],[-1,6],[-2,-1],[-2,-7],[-2,-3],[-18,-8],[-3,-2],[0,-4],[-2,-5],[-2,-2],[0,12],[-3,1],[-3,-3],[-2,0],[-8,-8],[-3,-1],[-3,-5],[-2,-1],[-2,1],[-2,-1],[-2,-3],[-4,2],[-3,-4],[-5,-3],[-8,-1],[0,5],[1,3],[2,2],[4,0],[-1,2],[-7,2],[-4,-3],[-1,-2],[-1,-8],[-7,-11],[-3,-4],[-2,0],[-3,-4],[-3,-1],[-2,2],[1,4],[-4,5],[-2,0],[0,-12],[-1,-2],[-4,-3],[-2,1],[-3,5],[-4,1],[1,-5],[-1,-4],[-2,-3],[-4,-1],[0,2],[2,8],[-1,5],[5,5],[6,0],[2,4],[5,5],[4,6],[10,16],[6,6],[20,11],[1,-4],[9,1],[-1,-2],[-3,-1],[0,-2],[4,-6],[3,-1],[0,5],[4,2],[3,-3],[4,-2],[2,1],[-1,3],[-6,6],[2,10],[5,10],[4,5],[3,2],[7,7],[14,7],[3,5],[7,7],[1,-4],[5,-2],[1,1],[0,14],[5,9],[7,8],[5,4],[4,6],[5,2],[2,-3],[3,-1],[2,2],[-3,2],[-1,3],[-2,2],[0,6],[2,9],[0,9],[2,5],[3,2],[7,1],[-4,3],[-4,1],[-1,5],[0,4],[2,5],[6,8],[7,5],[-2,3],[3,11],[-1,1],[-5,-6],[-24,-14],[-5,-2],[-3,2],[-2,6],[-2,2],[-1,4],[0,5],[2,4],[3,0],[2,2],[-5,3],[-3,-1],[-2,-5],[-2,-3],[-3,1],[0,-3],[-2,-6],[0,-5],[2,-11],[0,-5],[-5,-2],[-4,4],[-7,15],[-3,4],[-6,6],[-2,0],[-2,-4],[-3,-1],[-6,5],[-6,9],[-8,-6],[-5,-5],[-3,0],[-8,-4],[-3,-3],[-1,-4],[-11,-4],[-11,2],[8,4],[4,5],[-2,9],[0,4],[4,5],[-4,0],[-3,-2],[-2,4],[-1,8],[3,5],[2,8],[0,5],[-2,7],[-6,15],[-3,11],[-5,7],[3,10],[5,9],[5,4],[-5,0],[-4,-6],[-9,-17],[2,-5],[1,-5],[-2,-7],[-5,0],[-4,-4],[-9,-5],[-13,-2],[-7,0],[-6,5],[0,6],[-9,9],[-5,9],[-4,0],[-4,2],[-4,4],[1,5],[-2,2],[-3,-1],[-4,1],[10,12],[3,7],[3,2],[8,-5],[4,-1],[3,-4],[-3,-8],[10,10],[3,-1],[4,-9],[6,4],[3,6],[-6,4],[-8,1],[2,2],[5,0],[2,1],[-4,4],[-7,-6],[-12,0],[-9,4],[-9,-1],[-3,3],[9,7],[0,1],[-6,-1],[-4,4],[-4,1],[0,-4],[-3,-1],[-3,1],[-3,11],[-5,2],[-1,4],[3,5],[-1,3],[-4,1],[-3,-3],[-2,2],[0,6],[2,0],[7,2],[1,1],[-6,3],[-2,3],[3,2],[4,0],[6,2],[-2,3],[-2,5],[1,5],[15,22],[5,3],[6,-1],[-2,4],[2,2],[-1,3],[-1,8],[3,9],[2,3],[8,1],[-4,5],[2,4],[10,4],[4,-1],[6,-3],[4,-4],[3,-1],[4,-3],[8,2],[3,2],[4,5],[5,3],[7,11],[3,4],[4,1],[2,-4],[2,-1],[13,1],[7,2],[4,3],[8,10],[1,5],[-1,7],[-2,5],[-2,13],[-7,8],[-4,3],[-3,0],[2,5],[6,-1],[4,1],[3,3],[3,6],[-2,6],[-6,8],[-2,0],[-8,-8],[-4,0],[-4,2],[-3,-5],[-8,-3],[-5,-4],[-8,-9],[-2,-5],[-3,0],[-2,8],[-9,8],[-3,-3],[4,-4],[3,0],[-2,-6],[-10,7],[-6,2],[-17,0],[-10,-4],[-4,0],[-2,-3],[-7,0],[-8,3],[-20,4],[-5,3],[-4,6],[0,4],[2,1],[0,6],[-4,1],[-8,9],[2,2],[7,1],[2,5],[5,2],[2,2],[-12,3],[-1,-1],[-21,5],[-16,8],[-3,5],[3,4],[2,-3],[9,5],[5,6],[10,1],[5,4],[4,6],[9,5],[5,2],[5,-3],[9,-1],[5,3],[-8,5],[2,4],[9,5],[7,2],[3,0],[11,7],[6,2],[11,1],[5,-2],[3,-3],[0,-2],[-3,-6],[0,-6],[-4,-4],[9,-7],[15,-1],[8,2],[4,-3],[14,1],[8,-2],[4,1],[7,11],[3,2],[7,-4],[3,5],[-1,2],[-12,4],[-8,-2],[-2,3],[1,4],[-9,12],[-3,2],[-5,0],[-2,4],[-1,5],[6,3],[3,-1],[4,-7],[3,-1],[-1,-7],[4,-6],[9,-6],[7,2],[5,0],[3,-1],[7,-5],[4,-1],[12,3],[0,5],[-1,4],[-3,2],[-8,0],[-6,3],[-5,-1],[-10,-5],[-5,2],[-3,3],[-5,3],[0,6],[4,7],[3,3],[-3,3],[-7,1],[-11,-1],[-1,4],[-5,-5],[-5,1],[-6,0],[-15,4],[-8,10],[-4,12],[-5,7],[-35,26],[-16,6],[-7,7],[-5,2],[-5,0],[-5,3],[3,1],[3,-1],[5,3],[5,22],[0,5],[19,-1],[13,1],[4,1],[17,2],[4,1],[8,5],[9,7],[10,13],[2,13],[4,8],[17,20],[7,7],[3,4],[3,2],[6,-5],[18,4],[10,6],[0,2],[15,8],[4,-1],[-4,-6],[3,-1],[-3,-7],[6,0],[2,10],[2,2],[-6,6],[-3,0],[11,9],[10,5],[2,0],[2,-3],[-5,-3],[3,-2],[7,3],[10,0],[4,3],[14,0],[11,5],[11,9],[6,8],[5,5],[6,1],[3,-2],[18,-6],[5,-1],[2,-3],[-2,-4],[-4,-3],[-10,-4],[5,-5],[3,-1],[8,4],[7,7],[2,4],[8,0],[4,-2],[4,-4],[-3,-5],[5,-3],[6,-1],[5,-2],[8,5],[6,1],[6,0],[7,2],[12,-3],[9,0],[5,-2],[2,-2],[-6,-5],[-1,-4],[2,-2],[4,0],[0,-3],[2,-1],[12,0],[-5,-6],[20,-2],[2,2],[5,1],[8,3],[11,-5],[4,1],[7,4],[9,0],[4,-2],[4,1],[16,-5],[6,-6],[3,0],[3,3],[3,0],[3,-3],[5,0],[2,-4],[2,-1],[18,-3],[9,1],[13,0],[6,-2],[7,0],[10,-6],[7,-2],[16,-2],[6,3],[10,1],[8,3],[11,-1],[4,2],[14,-5],[8,-5],[4,-4],[16,-6],[5,-3],[3,-4],[9,1],[3,-1]],[[3300,5941],[-1,-1],[-2,4],[0,5],[2,2],[1,2],[1,0],[0,-9],[-1,-3]],[[3305,5694],[-2,-1],[0,7],[3,5],[1,1],[2,-5],[0,-2],[-2,-3],[-2,-2]],[[3310,5710],[-4,-2],[1,4],[4,2],[0,-2],[-1,-2]],[[3188,5811],[-2,-1],[-3,1],[-1,2],[1,2],[2,0],[2,-2],[1,-2]],[[3226,5824],[0,-9],[-2,-5],[-4,0],[-1,1],[-2,4],[-2,-1],[-4,1],[-1,1],[2,4],[2,2],[1,0],[1,-3],[2,-2],[3,0],[0,4],[3,6],[2,-3]],[[3018,5867],[-1,-3],[-2,-4],[-2,-2],[-10,-5],[-3,-3],[0,-5],[4,-17],[1,-3],[4,-7],[-2,-1],[1,-10],[2,-6],[0,-4],[-1,-12],[-4,-8],[-3,-8],[-2,-3],[-4,-17],[3,-10],[1,-5],[3,-8],[2,-2],[1,-3],[-1,-5],[1,-7],[2,-3],[2,-2],[2,0],[7,5],[2,5],[4,8],[0,9],[1,11],[-1,8],[-4,10],[-1,8],[-4,6],[-2,12],[-1,4],[0,5],[-1,9],[2,3],[0,8],[6,2],[12,12],[8,3],[8,6],[2,4],[2,5],[1,0],[5,-5],[2,2],[1,4],[-1,8],[-3,0],[-8,-3],[0,6],[-2,9],[1,7],[1,5],[2,2],[4,3],[2,-4],[2,-3],[0,-4],[2,-18],[2,-7],[2,-4],[2,0],[1,1],[8,1],[5,-4],[6,-1],[6,-7],[6,-9],[2,-6],[0,-6],[2,-4],[-2,-4],[1,-7],[2,-7],[2,-4],[8,-2],[8,3],[12,3],[4,2],[21,2],[4,-4],[0,-5],[7,-13],[5,-2],[5,-4],[5,-2],[5,-3],[5,2],[3,0],[18,21],[10,-1],[2,1],[1,2],[-4,3],[-8,2],[-2,-2],[-2,5],[3,0],[9,2],[10,-2],[9,4],[4,1],[3,-1],[6,2],[13,-2],[10,2],[-1,-3],[-3,-3],[-6,0],[-4,-5],[-8,1],[-6,-2],[2,-2],[0,-6],[1,0],[3,-6],[1,-5],[-1,-6],[1,-2],[1,3],[0,6],[2,-1],[1,-2],[3,-14],[2,-8],[1,0],[1,2],[1,4],[1,-1],[1,6],[2,0],[1,-1],[3,-5],[3,-8],[0,-2],[2,-1],[0,4],[-1,4],[4,0],[1,4],[2,-3],[6,-12],[2,-2],[6,-2],[4,-6],[2,-6],[-1,-5],[-3,-3],[-2,-3],[-1,-4],[0,-3],[-1,-4],[0,-2],[-1,-5],[-1,-7],[-2,-7],[-10,-1],[2,-2],[2,-3],[4,-5],[3,4],[5,0],[4,5],[2,1],[9,-2],[2,3],[2,1],[5,0],[4,-4]],[[3205,6243],[-2,0],[-1,1],[1,2],[3,0],[-1,-3]],[[3200,6208],[2,-2],[0,-3],[-5,0],[0,4],[3,1]],[[3203,6240],[-2,-1],[0,2],[2,-1]],[[3198,6239],[-2,0],[-1,3],[2,0],[1,-3]],[[7960,5683],[-1,1],[2,4],[0,-4],[-1,-1]],[[7889,5782],[1,-3],[0,-7],[-1,-6],[0,-3],[-1,-2],[-2,12],[-2,6],[3,5],[1,0],[1,-2]],[[7976,5782],[-3,-3],[0,3],[2,1],[1,-1]],[[7972,6378],[-1,0],[-3,5],[2,2],[3,-3],[-1,-4]],[[7967,6382],[-2,2],[0,5],[2,-4],[0,-3]],[[7985,6389],[-1,1],[1,4],[1,-2],[-1,-3]],[[7988,6405],[-4,-7],[-2,0],[1,8],[1,2],[4,-3]],[[7998,6422],[-5,-1],[-2,-5],[-2,-2],[-7,-5],[-1,-5],[0,-8],[-5,-6],[-2,1],[-1,2],[-5,-3],[-2,0],[-3,3],[-1,-2],[2,-9],[0,-4],[-6,-12],[1,-8],[-1,-6],[-4,-5],[-6,-12],[-3,0],[-2,-3],[-5,-20],[0,-7],[-1,-6],[0,-4],[-2,-10],[-2,-4],[0,-5],[3,-11],[0,-2],[2,-6],[2,-8],[5,-11],[2,-3],[3,-2],[5,-10],[2,-6],[-1,-4],[0,-9],[-3,3],[0,-2],[5,-4],[6,-17],[10,-18],[2,-9],[5,-6],[5,-9],[0,-2],[1,-2],[4,-5],[2,-5],[1,-5],[3,1],[3,0],[1,-5],[2,-5],[2,-4],[1,0],[0,-3],[1,-3],[3,-6],[1,-7],[4,-10],[2,-6],[2,-3],[3,-3],[2,-11],[1,-11],[2,-11],[2,-5],[0,-9],[1,-10],[2,-7],[0,-6],[1,-4],[0,-2],[2,-12],[-1,-5],[-1,-10],[1,-8],[0,-10],[1,-3],[2,-11],[1,-4],[0,-14],[-1,-3],[-1,5],[-2,-3],[-1,-3],[2,-15],[-3,1],[0,-19],[2,-5],[0,-2],[-2,1],[-1,-4],[0,-4],[1,-4],[0,-2],[-2,-8],[-2,0],[-2,-15],[-5,-1],[-3,-7],[-4,-2],[-4,-7],[-4,-6],[-5,-2],[-2,-10],[-5,-1],[-10,-13],[-2,-1],[-4,-4],[-1,1],[-1,3],[-3,2],[-1,3],[0,5],[-1,1],[-1,-2],[0,-10],[-1,-3],[-1,-1],[-2,3],[-3,6],[-3,-4],[3,0],[1,-1],[1,-4],[0,-2],[-1,-3],[-3,0],[-4,1],[-1,-1],[4,-3],[5,-5],[0,-2],[-2,-3],[-2,-4],[0,-5],[-1,-3],[-4,5],[-9,16],[1,-5],[9,-18],[2,-6],[0,-4],[-2,-5],[-3,0],[-5,7],[-8,16],[-3,2],[8,-19],[2,-4],[1,-5],[-1,-4],[0,-2],[-19,-18],[-5,-17],[-3,-5],[-2,-5],[-7,-2],[-3,1],[3,8],[-2,3],[0,22],[1,25],[2,12],[2,3],[3,2],[0,5],[-2,4],[-2,2],[-2,1],[-2,5],[-2,0],[-2,-2],[-1,2],[-1,4],[-2,4],[-3,4]],[[9718,4021],[-1,-4],[-2,0],[-2,3],[1,2],[3,1],[1,-2]],[[9707,4058],[-2,-6],[-2,1],[-3,5],[-1,3],[1,8],[2,1],[1,-7],[4,-5]],[[9702,4092],[-1,-2],[-1,0],[-7,6],[0,13],[2,2],[2,-1],[1,-5],[2,-2],[-1,-2],[2,-4],[1,-5]],[[9678,4173],[2,-8],[1,-1],[-1,-6],[-4,0],[-4,6],[-2,-1],[1,4],[2,5],[1,1],[1,-1],[3,1]],[[9678,4217],[0,-3],[-4,2],[-4,-1],[-1,3],[0,7],[2,3],[2,-5],[0,-1],[2,-4],[3,-1]],[[9673,4242],[-3,0],[-4,2],[-2,2],[-1,3],[4,2],[3,6],[1,-2],[1,-7],[1,-2],[0,-4]],[[9649,4256],[2,-1],[0,-3],[4,-5],[1,0],[1,-3],[2,-2],[0,-3],[2,-3],[-2,-4],[-5,1],[-2,-4],[-2,1],[0,3],[-1,6],[-1,9],[-1,5],[-1,2],[-2,-2],[-1,0],[-1,4],[1,9],[0,2],[1,1],[3,-2],[2,-11]],[[9644,4278],[-1,-2],[-3,4],[1,3],[3,-1],[0,-4]],[[9671,4263],[-1,3],[-1,14],[1,10],[3,-22],[-1,-4],[-1,-1]],[[9663,4294],[-2,-2],[-4,0],[-1,1],[4,8],[5,2],[-2,-9]],[[9670,4300],[-1,1],[-1,17],[0,2],[1,0],[1,-12],[0,-8]],[[9630,4329],[2,-19],[2,0],[1,1],[2,5],[0,7],[1,1],[2,-1],[-1,-2],[0,-6],[1,-3],[1,0],[1,-15],[1,-3],[0,-3],[-3,-5],[-4,0],[-3,-3],[-2,0],[0,4],[-2,3],[-2,6],[1,11],[-4,21],[0,5],[1,7],[2,0],[1,-5],[2,-6]],[[9654,4362],[-1,-3],[-4,1],[0,6],[2,3],[3,-3],[0,-4]],[[9651,4382],[-1,0],[-2,7],[3,5],[2,-4],[0,-6],[-2,0],[0,-2]],[[54,4359],[-2,-1],[-1,1],[1,2],[2,-2]],[[106,4415],[-1,2],[1,4],[1,-2],[-1,-4]],[[237,4374],[-8,0],[-4,3],[-1,0],[-3,5],[-1,3],[2,2],[4,1],[7,-4],[1,-4],[1,0],[2,-2],[0,-4]],[[212,4408],[4,-6],[1,-7],[-2,-7],[-2,2],[-5,-2],[-1,1],[-6,12],[-1,4],[3,-1],[5,3],[4,1]],[[6492,5911],[2,-1],[3,2],[7,1],[9,-7],[-2,-1],[-1,-3],[-4,-2],[-4,-5],[-11,-2],[-3,1],[-3,5],[-5,6],[2,4],[0,2],[1,2],[3,3],[3,-1],[3,-4]],[[6187,5988],[-2,2],[2,4],[1,-4],[-1,-2]],[[6182,6065],[-1,-2],[0,8],[1,1],[1,-4],[0,-2],[-1,-1]],[[6473,6142],[-14,-10],[-3,-5],[-4,-5],[-2,-7],[-2,-13],[1,-11],[0,-6],[-3,-4],[-4,-3],[-3,-4],[-3,-1],[-2,-4],[-2,-2],[-8,-7],[-8,-5],[-14,-6],[-5,-6],[-5,-4],[-7,-2],[-10,-6],[-5,-5],[-7,-8],[-2,-2],[-1,-6],[-2,-5],[-4,-8],[-3,-4],[-6,-3],[-5,0],[-8,2],[-2,-2],[-2,-3],[-6,-5],[-6,-12],[-5,-3],[-7,-3],[-5,-5],[-4,-2],[-4,-1],[-9,0],[-8,-1],[-7,-3],[-3,-6],[-4,-10],[-7,-4],[-1,-3],[-2,-8],[-4,-1],[-4,-2],[-4,4],[-7,-9],[-7,-2],[-3,-2],[-2,1],[-2,3],[-6,4],[-4,-2],[0,8],[-7,24],[1,22],[0,3],[-1,10],[-4,8],[0,11],[-1,8],[-2,8],[1,3],[0,2],[-2,12],[-1,3],[0,2],[1,2],[0,3],[-2,4],[-1,7],[-5,6],[1,5],[2,-3],[1,3],[0,3],[-3,16],[4,22],[-1,19]],[[6050,2479],[-1,-1],[-5,1],[-1,2],[3,5],[3,0],[2,-3],[-1,-4]],[[5912,3637],[-1,-13],[-4,-21],[-1,-10],[-3,-34],[-7,-24],[-7,-13],[-4,-4],[-3,-1],[-13,-26],[-4,-12],[-4,-18],[-4,-10],[-6,-21],[-6,-16],[-5,-15],[-9,-20],[-3,-6],[-3,-2],[-7,-12],[-10,-19],[-8,-17],[-11,-19],[-6,-8],[-10,-17],[-3,-2],[-11,-15],[-8,-9],[-13,-11],[-5,-3],[-12,3],[-5,-2],[-5,-6],[0,-10],[-4,-1],[-9,4],[-5,-1],[-2,-4],[-2,-7],[-7,0],[-11,6],[-17,5],[-6,-5],[-3,-1],[-9,1],[-6,3],[-5,0],[-3,-2],[-5,-1],[-13,-18],[-6,0],[-6,-2],[-8,3],[-5,-1],[-3,-3],[-7,-2],[-2,-2],[-12,-16],[-3,0],[-2,1],[-6,1],[-6,8],[-2,2],[0,5],[-2,4],[-3,0],[-2,4],[-4,0],[-3,-1],[0,10],[-1,5],[-2,2],[-5,-1],[-1,-1],[-1,-4],[0,-10],[-2,3],[-2,13],[1,7],[3,3],[0,6],[-4,16],[-2,5],[-3,4],[-2,9],[-2,3],[-1,6],[-2,5],[-1,7],[1,5],[2,2],[2,-3],[2,1],[4,6],[2,8],[0,22],[-3,22],[-8,21],[-7,21],[-9,33],[-5,20],[-6,40],[-6,22],[-7,22],[-1,1]],[[5815,3905],[8,3],[7,-2],[8,-7],[7,-2],[7,2],[6,0],[4,-1],[4,-2],[2,-3]],[[5776,3520],[-4,-2],[-3,-2]],[[5843,4282],[-18,0],[-7,-3],[-6,-4],[-6,-8],[-2,-2],[-3,-5],[-1,-6],[0,-17],[-2,-6],[-10,-7],[-7,-7],[-6,-7],[-5,-9],[-3,-12],[-6,-14],[-6,-13],[-5,-13],[-7,-5],[-6,1],[-7,6],[-5,1],[-4,-4],[-4,1],[-3,6],[-3,2],[-2,-2],[-3,0],[-5,3]],[[4750,9264],[-4,0],[4,4],[12,7],[5,6],[10,2],[0,-8],[-18,-6],[-9,-5]],[[5533,9468],[-4,-2],[-5,3],[-3,5],[2,1],[9,0],[2,-2],[-1,-5]],[[5599,9710],[12,-1],[5,-10],[2,-10],[5,-1],[7,2],[11,0],[9,-5],[-8,-4],[-1,-6],[6,-1],[10,-5],[5,-1],[10,2],[19,-8],[-22,-6],[-2,-1],[-6,-8],[-9,-6],[-4,-1],[-7,1],[-9,-7],[-7,0],[-3,9],[7,4],[1,2],[-9,2],[-9,-4],[-6,0],[-22,-3],[-4,1],[-1,6],[9,3],[1,5],[11,13],[-12,4],[-5,3],[-7,11],[-7,5],[1,5],[-5,0],[-4,3],[4,3],[34,4]],[[5745,9713],[-4,0],[-7,4],[-2,4],[5,2],[6,-5],[6,-2],[-4,-3]],[[5311,9711],[1,-4],[4,1],[6,-5],[7,-3],[5,-6],[2,-5],[-5,0],[-5,6],[-11,6],[-5,0],[-10,12],[-1,3],[-5,3],[-2,9],[11,-3],[6,-7],[-2,-3],[4,-4]],[[5806,9729],[8,-1],[8,1],[2,-1],[-11,-3],[-12,2],[-11,0],[-12,-3],[-4,1],[6,3],[7,1],[4,3],[9,0],[6,-3]],[[5465,9786],[5,3],[7,-1],[10,-3],[7,-5],[4,-6],[-8,-10],[5,-5],[13,10],[7,-3],[5,-4],[2,-9],[-2,-4],[9,-6],[11,1],[8,-2],[4,-5],[6,1],[1,4],[12,-2],[5,-3],[-8,-5],[7,-4],[10,-3],[6,-3],[2,-3],[-8,-4],[-10,0],[-10,-2],[-17,-1],[-4,-4],[-7,-4],[-9,-10],[-2,-5],[1,-8],[-5,-3],[-7,1],[-4,-2],[-2,-19],[-4,-10],[-10,-1],[-7,-6],[-7,-14],[-6,-6],[3,-4],[-7,-9],[2,-9],[-4,-3],[-6,-2],[-7,2],[-12,9],[-13,7],[-12,11],[-11,5],[-7,2],[-9,8],[-4,6],[2,7],[8,1],[6,-3],[3,0],[6,9],[36,5],[12,1],[11,0],[-5,7],[-22,-4],[-20,1],[-14,-5],[-21,0],[-8,5],[-2,3],[-1,7],[4,3],[12,-1],[20,5],[10,4],[10,0],[-1,4],[6,3],[25,0],[6,1],[0,2],[-7,0],[-6,3],[-2,3],[9,9],[-7,0],[-10,-7],[-6,-3],[-15,-1],[-4,5],[0,3],[-12,3],[-1,3],[-6,0],[-3,-2],[1,-6],[-2,-5],[6,-4],[-8,-3],[-7,-5],[-13,-2],[-14,0],[-6,3],[-14,11],[-5,6],[-8,3],[-5,4],[-1,3],[3,4],[-7,3],[-6,4],[5,2],[20,-5],[3,4],[-8,0],[-5,6],[-1,4],[6,7],[-3,1],[-11,0],[1,-5],[-8,-5],[-4,1],[-2,6],[-6,7],[-5,10],[2,6],[-3,6],[3,4],[11,-5],[1,4],[13,2],[11,-5],[5,5],[9,-3],[4,0],[10,3],[16,2],[6,-2],[1,-4],[-4,-2],[-21,-2],[-13,-7],[21,1],[2,-6],[6,-1],[6,-5],[6,-2],[-1,8],[1,6],[4,2],[11,11],[7,-2],[12,-13],[11,-18],[16,-7],[-6,13],[-4,10],[-2,10],[4,9],[4,3],[0,7],[4,2],[8,-2],[7,-6]],[[5902,9798],[-26,-2],[-3,1],[43,7],[10,1],[5,-2],[-29,-5]],[[5520,9809],[-6,-4],[-11,3],[4,4],[13,-3]],[[5579,9806],[3,-1],[16,0],[4,-5],[5,-1],[11,-5],[3,2],[1,16],[3,3],[4,0],[6,3],[12,-2],[-6,-14],[7,-1],[9,2],[7,6],[6,-1],[4,4],[3,0],[4,-4],[5,1],[5,-2],[15,-2],[11,-4],[16,0],[12,-1],[8,-5],[1,-9],[-3,-3],[-24,-10],[-9,-7],[-4,-7],[-3,-2],[-11,-4],[-14,2],[-10,-4],[-7,-5],[-10,-1],[-24,2],[-6,6],[5,4],[-26,-1],[-30,0],[-2,3],[-10,1],[-14,4],[-7,4],[5,2],[18,0],[8,7],[-18,1],[-6,-2],[-14,-1],[-19,2],[-11,6],[-2,4],[9,2],[8,4],[-14,2],[-12,4],[4,2],[20,1],[15,-4],[6,3],[-5,1],[-5,4],[2,5],[14,-7],[1,6],[-5,8],[3,1],[21,-6],[6,-5],[5,-2]],[[3105,5883],[-2,-7],[-1,3],[0,7],[-2,3],[0,3],[4,-4],[1,-5]],[[3251,6191],[-1,-1],[-1,1],[0,2],[2,-2]],[[3243,6198],[-1,0],[0,2],[1,0],[0,-2]],[[null,null,[45.05776636713733,-12.965686400215588],[45.05776636713733,-12.791192985990051],[45.02288856056384,-12.70474670738291],[45.05776636713733,-12.653519283023115],[45.13042846416545,-12.722356134506583],[45.20309056119359,-12.75757498875393],[45.20309056119359,-12.86163069448476],[45.16530627073897,-12.930467545968227],[45.16530627073897,-12.983295827339262]],[null,null],[null,null],[null,null],[null,null],[null,null]],[[null,null,[-60.9010100031487,14.46499848744078],[-61.08121200377843,14.46499848744078],[-61.11608981035194,14.517826768811815],[-61.04342771332382,14.586663620295283],[-61.11608981035194,14.604273047418957],[-61.15096761692543,14.639491901666318],[-61.22362971395356,14.796375888768168],[-61.22362971395356,14.847603313127962],[-61.15096761692543,14.86521274025165],[-61.04342771332382,14.812384458880615],[-60.970765616295694,14.743547607397147],[-60.9358878097222,14.743547607397147],[-60.9358878097222,14.67471075591368],[-60.9010100031487,14.639491901666318],[-60.9010100031487,14.604273047418957],[-60.828347906120584,14.482607914564454]],[null,null],[null,null],[null,null],[null,null],[null,null]],[[6549,3954],[-4,-2],[-3,1],[-5,5],[-2,3],[-2,9],[2,9],[4,2],[4,0],[2,-2],[2,-7],[3,-6],[-1,-8],[0,-4]],[[5345,7597],[0,1],[1,0],[0,-1],[-1,0]],[[226,4659],[2,1],[0,-3],[1,-4],[-1,-1],[-1,1],[-1,2],[0,4]],[[244,4647],[1,-2],[-1,-5],[-2,4],[2,3]],[[208,4692],[1,-1],[0,-1],[-1,-1],[0,3]],[[9952,4721],[2,6],[2,-2],[-2,-7],[-2,3]],[[9962,4754],[1,-1],[-1,-1],[0,2]],[[9975,4699],[1,-1],[1,-5],[-3,-4],[0,-2],[-1,-1],[0,3],[-1,4],[2,5],[1,1]],[[9995,4645],[0,-1],[1,-1],[-1,-3],[0,1],[-1,3],[0,1],[1,0]],[[9915,4466],[5,-1],[0,-3],[-4,1],[-1,3]],[[9920,4766],[-1,4],[1,-1],[0,-3]],[[9925,4832],[1,0],[-1,0],[0,0]],[[9897,4823],[0,-1],[0,-1],[0,1],[0,1]],[[9890,4859],[1,-1],[1,-3],[-1,2],[-2,2],[1,0]],[[5091,2051],[2,0],[2,-1],[0,-2],[-4,-1],[-1,1],[1,3]],[[4850,7265],[0,1],[1,0],[0,-2],[-1,1]],[[3298,6099],[-1,-1],[-1,1],[0,3],[1,3],[1,0],[1,-2],[0,-3],[-1,-1]],[[3288,6105],[-2,-2],[-1,0],[-1,5],[-1,14],[0,2],[1,1],[3,-1],[2,-4],[0,-12],[-1,-3]],[[3296,6118],[-6,0],[0,4],[1,4],[-1,4],[2,4],[1,-2],[2,-6],[5,-6],[-4,-2]],[[9627,6297],[1,-1],[0,-2],[-1,0],[0,1],[0,2]]],
transform:{scale:[.036003600360036005,.01736158967459246],translate:[-180,-89.99892578124998]},bbox:[-180,-89.99892578124998,180,83.59960937500004]},m.prototype.abwTopo="__ABW__",m.prototype.afgTopo="__AFG__",m.prototype.agoTopo="__AGO__",m.prototype.aiaTopo="__AIA__",m.prototype.albTopo="__ALB__",m.prototype.aldTopo="__ALD__",m.prototype.andTopo="__AND__",m.prototype.areTopo="__ARE__",m.prototype.argTopo="__ARG__",m.prototype.armTopo="__ARM__",m.prototype.asmTopo="__ASM__",m.prototype.ataTopo="__ATA__",m.prototype.atcTopo="__ATC__",m.prototype.atfTopo="__ATF__",m.prototype.atgTopo="__ATG__",m.prototype.ausTopo="__AUS__",m.prototype.autTopo="__AUT__",m.prototype.azeTopo="__AZE__",m.prototype.bdiTopo="__BDI__",m.prototype.belTopo="__BEL__",m.prototype.benTopo="__BEN__",m.prototype.bfaTopo="__BFA__",m.prototype.bgdTopo="__BGD__",m.prototype.bgrTopo="__BGR__",m.prototype.bhrTopo="__BHR__",m.prototype.bhsTopo="__BHS__",m.prototype.bihTopo="__BIH__",m.prototype.bjnTopo="__BJN__",m.prototype.blmTopo="__BLM__",m.prototype.blrTopo="__BLR__",m.prototype.blzTopo="__BLZ__",m.prototype.bmuTopo="__BMU__",m.prototype.bolTopo="__BOL__",m.prototype.braTopo="__BRA__",m.prototype.brbTopo="__BRB__",m.prototype.brnTopo="__BRN__",m.prototype.btnTopo="__BTN__",m.prototype.norTopo="__NOR__",m.prototype.bwaTopo="__BWA__",m.prototype.cafTopo="__CAF__",m.prototype.canTopo="__CAN__",m.prototype.cheTopo="__CHE__",m.prototype.chlTopo="__CHL__",m.prototype.chnTopo="__CHN__",m.prototype.civTopo="__CIV__",m.prototype.clpTopo="__CLP__",m.prototype.cmrTopo="__CMR__",m.prototype.codTopo="__COD__",m.prototype.cogTopo="__COG__",m.prototype.cokTopo="__COK__",m.prototype.colTopo="__COL__",m.prototype.comTopo="__COM__",m.prototype.cpvTopo="__CPV__",m.prototype.criTopo="__CRI__",m.prototype.csiTopo="__CSI__",m.prototype.cubTopo="__CUB__",m.prototype.cuwTopo="__CUW__",m.prototype.cymTopo="__CYM__",m.prototype.cynTopo="__CYN__",m.prototype.cypTopo="__CYP__",m.prototype.czeTopo="__CZE__",m.prototype.deuTopo="__DEU__",m.prototype.djiTopo="__DJI__",m.prototype.dmaTopo="__DMA__",m.prototype.dnkTopo="__DNK__",m.prototype.domTopo="__DOM__",m.prototype.dzaTopo="__DZA__",m.prototype.ecuTopo="__ECU__",m.prototype.egyTopo="__EGY__",m.prototype.eriTopo="__ERI__",m.prototype.esbTopo="__ESB__",m.prototype.espTopo="__ESP__",m.prototype.estTopo="__EST__",m.prototype.ethTopo="__ETH__",m.prototype.finTopo="__FIN__",m.prototype.fjiTopo="__FJI__",m.prototype.flkTopo="__FLK__",m.prototype.fraTopo="__FRA__",m.prototype.froTopo="__FRO__",m.prototype.fsmTopo="__FSM__",m.prototype.gabTopo="__GAB__",m.prototype.psxTopo="__PSX__",m.prototype.gbrTopo="__GBR__",m.prototype.geoTopo="__GEO__",m.prototype.ggyTopo="__GGY__",m.prototype.ghaTopo="__GHA__",m.prototype.gibTopo="__GIB__",m.prototype.ginTopo="__GIN__",m.prototype.gmbTopo="__GMB__",m.prototype.gnbTopo="__GNB__",m.prototype.gnqTopo="__GNQ__",m.prototype.grcTopo="__GRC__",m.prototype.grdTopo="__GRD__",m.prototype.grlTopo="__GRL__",m.prototype.gtmTopo="__GTM__",m.prototype.gumTopo="__GUM__",m.prototype.guyTopo="__GUY__",m.prototype.hkgTopo="__HKG__",m.prototype.hmdTopo="__HMD__",m.prototype.hndTopo="__HND__",m.prototype.hrvTopo="__HRV__",m.prototype.htiTopo="__HTI__",m.prototype.hunTopo="__HUN__",m.prototype.idnTopo="__IDN__",m.prototype.imnTopo="__IMN__",m.prototype.indTopo="__IND__",m.prototype.ioaTopo="__IOA__",m.prototype.iotTopo="__IOT__",m.prototype.irlTopo="__IRL__",m.prototype.irnTopo="__IRN__",m.prototype.irqTopo="__IRQ__",m.prototype.islTopo="__ISL__",m.prototype.isrTopo="__ISR__",m.prototype.itaTopo="__ITA__",m.prototype.jamTopo="__JAM__",m.prototype.jeyTopo="__JEY__",m.prototype.jorTopo="__JOR__",m.prototype.jpnTopo="__JPN__",m.prototype.kabTopo="__KAB__",m.prototype.kasTopo="__KAS__",m.prototype.kazTopo="__KAZ__",m.prototype.kenTopo="__KEN__",m.prototype.kgzTopo="__KGZ__",m.prototype.khmTopo="__KHM__",m.prototype.kirTopo="__KIR__",m.prototype.knaTopo="__KNA__",m.prototype.korTopo="__KOR__",m.prototype.kosTopo="__KOS__",m.prototype.kwtTopo="__KWT__",m.prototype.laoTopo="__LAO__",m.prototype.lbnTopo="__LBN__",m.prototype.lbrTopo="__LBR__",m.prototype.lbyTopo="__LBY__",m.prototype.lcaTopo="__LCA__",m.prototype.lieTopo="__LIE__",m.prototype.lkaTopo="__LKA__",m.prototype.lsoTopo="__LSO__",m.prototype.ltuTopo="__LTU__",m.prototype.luxTopo="__LUX__",m.prototype.lvaTopo="__LVA__",m.prototype.macTopo="__MAC__",m.prototype.mafTopo="__MAF__",m.prototype.marTopo="__MAR__",m.prototype.mcoTopo="__MCO__",m.prototype.mdaTopo="__MDA__",m.prototype.mdgTopo="__MDG__",m.prototype.mdvTopo="__MDV__",m.prototype.mexTopo="__MEX__",m.prototype.mhlTopo="__MHL__",m.prototype.mkdTopo="__MKD__",m.prototype.mliTopo="__MLI__",m.prototype.mltTopo="__MLT__",m.prototype.mmrTopo="__MMR__",m.prototype.mneTopo="__MNE__",m.prototype.mngTopo="__MNG__",m.prototype.mnpTopo="__MNP__",m.prototype.mozTopo="__MOZ__",m.prototype.mrtTopo="__MRT__",m.prototype.msrTopo="__MSR__",m.prototype.musTopo="__MUS__",m.prototype.mwiTopo="__MWI__",m.prototype.mysTopo="__MYS__",m.prototype.namTopo="__NAM__",m.prototype.nclTopo="__NCL__",m.prototype.nerTopo="__NER__",m.prototype.nfkTopo="__NFK__",m.prototype.ngaTopo="__NGA__",m.prototype.nicTopo="__NIC__",m.prototype.niuTopo="__NIU__",m.prototype.nldTopo="__NLD__",m.prototype.nplTopo="__NPL__",m.prototype.nruTopo="__NRU__",m.prototype.nulTopo="__NUL__",m.prototype.nzlTopo="__NZL__",m.prototype.omnTopo="__OMN__",m.prototype.pakTopo="__PAK__",m.prototype.panTopo="__PAN__",m.prototype.pcnTopo="__PCN__",m.prototype.perTopo="__PER__",m.prototype.pgaTopo="__PGA__",m.prototype.phlTopo="__PHL__",m.prototype.plwTopo="__PLW__",m.prototype.pngTopo="__PNG__",m.prototype.polTopo="__POL__",m.prototype.priTopo="__PRI__",m.prototype.prkTopo="__PRK__",m.prototype.prtTopo="__PRT__",m.prototype.pryTopo="__PRY__",m.prototype.pyfTopo="__PYF__",m.prototype.qatTopo="__QAT__",m.prototype.rouTopo="__ROU__",m.prototype.rusTopo="__RUS__",m.prototype.rwaTopo="__RWA__",m.prototype.sahTopo="__SAH__",m.prototype.sauTopo="__SAU__",m.prototype.scrTopo="__SCR__",m.prototype.sdnTopo="__SDN__";m.prototype.sdsTopo="__SDS__";m.prototype.senTopo="__SEN__",m.prototype.serTopo="__SER__",m.prototype.sgpTopo="__SGP__",m.prototype.sgsTopo="__SGS__",m.prototype.shnTopo="__SHN__",m.prototype.slbTopo="__SLB__",m.prototype.sleTopo="__SLE__",m.prototype.slvTopo="__SLV__",m.prototype.smrTopo="__SMR__",m.prototype.solTopo="__SOL__",m.prototype.somTopo="__SOM__",m.prototype.spmTopo="__SPM__",m.prototype.srbTopo="__SRB__",m.prototype.stpTopo="__STP__",m.prototype.surTopo="__SUR__",m.prototype.svkTopo="__SVK__",m.prototype.svnTopo="__SVN__",m.prototype.sweTopo="__SWE__",m.prototype.swzTopo="__SWZ__",m.prototype.sxmTopo="__SXM__",m.prototype.sycTopo="__SYC__",m.prototype.syrTopo="__SYR__",m.prototype.tcaTopo="__TCA__",m.prototype.tcdTopo="__TCD__",m.prototype.tgoTopo="__TGO__",m.prototype.thaTopo="__THA__",m.prototype.tjkTopo="__TJK__",m.prototype.tkmTopo="__TKM__",m.prototype.tlsTopo="__TLS__",m.prototype.tonTopo="__TON__",m.prototype.ttoTopo="__TTO__",m.prototype.tunTopo="__TUN__",m.prototype.turTopo="__TUR__",m.prototype.tuvTopo="__TUV__",m.prototype.twnTopo="__TWN__",m.prototype.tzaTopo="__TZA__",m.prototype.ugaTopo="__UGA__",m.prototype.ukrTopo="__UKR__",m.prototype.umiTopo="__UMI__",m.prototype.uryTopo="__URY__",m.prototype.usaTopo="__USA__",m.prototype.usgTopo="__USG__",m.prototype.uzbTopo="__UZB__",m.prototype.vatTopo="__VAT__",m.prototype.vctTopo="__VCT__",m.prototype.venTopo="__VEN__",m.prototype.vgbTopo="__VGB__",m.prototype.virTopo="__VIR__",m.prototype.vnmTopo="__VNM__",m.prototype.vutTopo="__VUT__",m.prototype.wlfTopo="__WLF__",m.prototype.wsbTopo="__WSB__",m.prototype.wsmTopo="__WSM__",m.prototype.yemTopo="__YEM__",m.prototype.zafTopo="__ZAF__",m.prototype.zmbTopo="__ZMB__",m.prototype.zweTopo="__ZWE__",m.prototype.latLngToXY=function(a,b){return this.projection([b,a])},m.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),d.attr("id",b||"").attr("class",a||"")},m.prototype.updateChoropleth=function(a,b){var c=this.svg;b&&b.reset===!0&&c.selectAll(".datamaps-subunit").attr("data-info",function(){return"{}"}).transition().style("fill",this.options.fills.defaultFill);for(var d in a)if(a.hasOwnProperty(d)){var e,f=a[d];if(!d)continue;if(e="string"==typeof f?f:"string"==typeof f.color?f.color:"string"==typeof f.fillColor?f.fillColor:this.options.fills[f.fillKey],f===Object(f)){this.options.data[d]=l(f,this.options.data[d]||{});this.svg.select("."+d).attr("data-info",JSON.stringify(this.options.data[d]))}c.selectAll("."+d).transition().style("fill",e)}},m.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=n.mouse(d.options.element);n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));try{return c.popupTemplate(b,d)}catch(a){return""}}).style("left",e[0]+"px")}),n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},m.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof m.prototype[a]&&(m.prototype[a]=function(d,e,f,g){var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=l(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})}, true?(n=__webpack_require__(2),o=__webpack_require__(3),module.exports=m):"function"==typeof define&&define.amd?define("datamaps",["require","d3","topojson"],function(a){return n=a("d3"),o=a("topojson"),m}):window.Datamap=window.Datamaps=m,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){a=a||{},a.element=this[0];var c=new m(a);return"function"==typeof b&&b(c,a),this})}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;!function() {
  var d3 = {
    version: "3.5.17"
  };
  var d3_arraySlice = [].slice, d3_array = function(list) {
    return d3_arraySlice.call(list);
  };
  var d3_document = this.document;
  function d3_documentElement(node) {
    return node && (node.ownerDocument || node.document || node).documentElement;
  }
  function d3_window(node) {
    return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
  }
  if (d3_document) {
    try {
      d3_array(d3_document.documentElement.childNodes)[0].nodeType;
    } catch (e) {
      d3_array = function(list) {
        var i = list.length, array = new Array(i);
        while (i--) array[i] = list[i];
        return array;
      };
    }
  }
  if (!Date.now) Date.now = function() {
    return +new Date();
  };
  if (d3_document) {
    try {
      d3_document.createElement("DIV").style.setProperty("opacity", 0, "");
    } catch (error) {
      var d3_element_prototype = this.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = this.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
      d3_element_prototype.setAttribute = function(name, value) {
        d3_element_setAttribute.call(this, name, value + "");
      };
      d3_element_prototype.setAttributeNS = function(space, local, value) {
        d3_element_setAttributeNS.call(this, space, local, value + "");
      };
      d3_style_prototype.setProperty = function(name, value, priority) {
        d3_style_setProperty.call(this, name, value + "", priority);
      };
    }
  }
  d3.ascending = d3_ascending;
  function d3_ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }
  d3.descending = function(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  };
  d3.min = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = b;
        break;
      }
      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = b;
        break;
      }
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
    }
    return a;
  };
  d3.max = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = b;
        break;
      }
      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = b;
        break;
      }
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
    }
    return a;
  };
  d3.extent = function(array, f) {
    var i = -1, n = array.length, a, b, c;
    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = c = b;
        break;
      }
      while (++i < n) if ((b = array[i]) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = c = b;
        break;
      }
      while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }
    return [ a, c ];
  };
  function d3_number(x) {
    return x === null ? NaN : +x;
  }
  function d3_numeric(x) {
    return !isNaN(x);
  }
  d3.sum = function(array, f) {
    var s = 0, n = array.length, a, i = -1;
    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = +array[i])) s += a;
    } else {
      while (++i < n) if (d3_numeric(a = +f.call(array, array[i], i))) s += a;
    }
    return s;
  };
  d3.mean = function(array, f) {
    var s = 0, n = array.length, a, i = -1, j = n;
    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = d3_number(array[i]))) s += a; else --j;
    } else {
      while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) s += a; else --j;
    }
    if (j) return s / j;
  };
  d3.quantile = function(values, p) {
    var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
    return e ? v + e * (values[h] - v) : v;
  };
  d3.median = function(array, f) {
    var numbers = [], n = array.length, a, i = -1;
    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = d3_number(array[i]))) numbers.push(a);
    } else {
      while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) numbers.push(a);
    }
    if (numbers.length) return d3.quantile(numbers.sort(d3_ascending), .5);
  };
  d3.variance = function(array, f) {
    var n = array.length, m = 0, a, d, s = 0, i = -1, j = 0;
    if (arguments.length === 1) {
      while (++i < n) {
        if (d3_numeric(a = d3_number(array[i]))) {
          d = a - m;
          m += d / ++j;
          s += d * (a - m);
        }
      }
    } else {
      while (++i < n) {
        if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) {
          d = a - m;
          m += d / ++j;
          s += d * (a - m);
        }
      }
    }
    if (j > 1) return s / (j - 1);
  };
  d3.deviation = function() {
    var v = d3.variance.apply(this, arguments);
    return v ? Math.sqrt(v) : v;
  };
  function d3_bisector(compare) {
    return {
      left: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1; else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid; else lo = mid + 1;
        }
        return lo;
      }
    };
  }
  var d3_bisect = d3_bisector(d3_ascending);
  d3.bisectLeft = d3_bisect.left;
  d3.bisect = d3.bisectRight = d3_bisect.right;
  d3.bisector = function(f) {
    return d3_bisector(f.length === 1 ? function(d, x) {
      return d3_ascending(f(d), x);
    } : f);
  };
  d3.shuffle = function(array, i0, i1) {
    if ((m = arguments.length) < 3) {
      i1 = array.length;
      if (m < 2) i0 = 0;
    }
    var m = i1 - i0, t, i;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
    }
    return array;
  };
  d3.permute = function(array, indexes) {
    var i = indexes.length, permutes = new Array(i);
    while (i--) permutes[i] = array[indexes[i]];
    return permutes;
  };
  d3.pairs = function(array) {
    var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
    while (i < n) pairs[i] = [ p0 = p1, p1 = array[++i] ];
    return pairs;
  };
  d3.transpose = function(matrix) {
    if (!(n = matrix.length)) return [];
    for (var i = -1, m = d3.min(matrix, d3_transposeLength), transpose = new Array(m); ++i < m; ) {
      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n; ) {
        row[j] = matrix[j][i];
      }
    }
    return transpose;
  };
  function d3_transposeLength(d) {
    return d.length;
  }
  d3.zip = function() {
    return d3.transpose(arguments);
  };
  d3.keys = function(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  };
  d3.values = function(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
  };
  d3.entries = function(map) {
    var entries = [];
    for (var key in map) entries.push({
      key: key,
      value: map[key]
    });
    return entries;
  };
  d3.merge = function(arrays) {
    var n = arrays.length, m, i = -1, j = 0, merged, array;
    while (++i < n) j += arrays[i].length;
    merged = new Array(j);
    while (--n >= 0) {
      array = arrays[n];
      m = array.length;
      while (--m >= 0) {
        merged[--j] = array[m];
      }
    }
    return merged;
  };
  var abs = Math.abs;
  d3.range = function(start, stop, step) {
    if (arguments.length < 3) {
      step = 1;
      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }
    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [], k = d3_range_integerScale(abs(step)), i = -1, j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };
  function d3_range_integerScale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }
  function d3_class(ctor, properties) {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  }
  d3.map = function(object, f) {
    var map = new d3_Map();
    if (object instanceof d3_Map) {
      object.forEach(function(key, value) {
        map.set(key, value);
      });
    } else if (Array.isArray(object)) {
      var i = -1, n = object.length, o;
      if (arguments.length === 1) while (++i < n) map.set(i, object[i]); else while (++i < n) map.set(f.call(object, o = object[i], i), o);
    } else {
      for (var key in object) map.set(key, object[key]);
    }
    return map;
  };
  function d3_Map() {
    this._ = Object.create(null);
  }
  var d3_map_proto = "__proto__", d3_map_zero = "\x00";
  d3_class(d3_Map, {
    has: d3_map_has,
    get: function(key) {
      return this._[d3_map_escape(key)];
    },
    set: function(key, value) {
      return this._[d3_map_escape(key)] = value;
    },
    remove: d3_map_remove,
    keys: d3_map_keys,
    values: function() {
      var values = [];
      for (var key in this._) values.push(this._[key]);
      return values;
    },
    entries: function() {
      var entries = [];
      for (var key in this._) entries.push({
        key: d3_map_unescape(key),
        value: this._[key]
      });
      return entries;
    },
    size: d3_map_size,
    empty: d3_map_empty,
    forEach: function(f) {
      for (var key in this._) f.call(this, d3_map_unescape(key), this._[key]);
    }
  });
  function d3_map_escape(key) {
    return (key += "") === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key;
  }
  function d3_map_unescape(key) {
    return (key += "")[0] === d3_map_zero ? key.slice(1) : key;
  }
  function d3_map_has(key) {
    return d3_map_escape(key) in this._;
  }
  function d3_map_remove(key) {
    return (key = d3_map_escape(key)) in this._ && delete this._[key];
  }
  function d3_map_keys() {
    var keys = [];
    for (var key in this._) keys.push(d3_map_unescape(key));
    return keys;
  }
  function d3_map_size() {
    var size = 0;
    for (var key in this._) ++size;
    return size;
  }
  function d3_map_empty() {
    for (var key in this._) return false;
    return true;
  }
  d3.nest = function() {
    var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
    function map(mapType, array, depth) {
      if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
      var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
          values.push(object);
        } else {
          valuesByKey.set(keyValue, [ object ]);
        }
      }
      if (mapType) {
        object = mapType();
        setter = function(keyValue, values) {
          object.set(keyValue, map(mapType, values, depth));
        };
      } else {
        object = {};
        setter = function(keyValue, values) {
          object[keyValue] = map(mapType, values, depth);
        };
      }
      valuesByKey.forEach(setter);
      return object;
    }
    function entries(map, depth) {
      if (depth >= keys.length) return map;
      var array = [], sortKey = sortKeys[depth++];
      map.forEach(function(key, keyMap) {
        array.push({
          key: key,
          values: entries(keyMap, depth)
        });
      });
      return sortKey ? array.sort(function(a, b) {
        return sortKey(a.key, b.key);
      }) : array;
    }
    nest.map = function(array, mapType) {
      return map(mapType, array, 0);
    };
    nest.entries = function(array) {
      return entries(map(d3.map, array, 0), 0);
    };
    nest.key = function(d) {
      keys.push(d);
      return nest;
    };
    nest.sortKeys = function(order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    };
    nest.sortValues = function(order) {
      sortValues = order;
      return nest;
    };
    nest.rollup = function(f) {
      rollup = f;
      return nest;
    };
    return nest;
  };
  d3.set = function(array) {
    var set = new d3_Set();
    if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
    return set;
  };
  function d3_Set() {
    this._ = Object.create(null);
  }
  d3_class(d3_Set, {
    has: d3_map_has,
    add: function(key) {
      this._[d3_map_escape(key += "")] = true;
      return key;
    },
    remove: d3_map_remove,
    values: d3_map_keys,
    size: d3_map_size,
    empty: d3_map_empty,
    forEach: function(f) {
      for (var key in this._) f.call(this, d3_map_unescape(key));
    }
  });
  d3.behavior = {};
  function d3_identity(d) {
    return d;
  }
  d3.rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }
  function d3_vendorSymbol(object, name) {
    if (name in object) return name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
      var prefixName = d3_vendorPrefixes[i] + name;
      if (prefixName in object) return prefixName;
    }
  }
  var d3_vendorPrefixes = [ "webkit", "ms", "moz", "Moz", "o", "O" ];
  function d3_noop() {}
  d3.dispatch = function() {
    var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    return dispatch;
  };
  function d3_dispatch() {}
  d3_dispatch.prototype.on = function(type, listener) {
    var i = type.indexOf("."), name = "";
    if (i >= 0) {
      name = type.slice(i + 1);
      type = type.slice(0, i);
    }
    if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
    if (arguments.length === 2) {
      if (listener == null) for (type in this) {
        if (this.hasOwnProperty(type)) this[type].on(name, null);
      }
      return this;
    }
  };
  function d3_dispatch_event(dispatch) {
    var listeners = [], listenerByName = new d3_Map();
    function event() {
      var z = listeners, i = -1, n = z.length, l;
      while (++i < n) if (l = z[i].on) l.apply(this, arguments);
      return dispatch;
    }
    event.on = function(name, listener) {
      var l = listenerByName.get(name), i;
      if (arguments.length < 2) return l && l.on;
      if (l) {
        l.on = null;
        listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
        listenerByName.remove(name);
      }
      if (listener) listeners.push(listenerByName.set(name, {
        on: listener
      }));
      return dispatch;
    };
    return event;
  }
  d3.event = null;
  function d3_eventPreventDefault() {
    d3.event.preventDefault();
  }
  function d3_eventSource() {
    var e = d3.event, s;
    while (s = e.sourceEvent) e = s;
    return e;
  }
  function d3_eventDispatch(target) {
    var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    dispatch.of = function(thiz, argumentz) {
      return function(e1) {
        try {
          var e0 = e1.sourceEvent = d3.event;
          e1.target = target;
          d3.event = e1;
          dispatch[e1.type].apply(thiz, argumentz);
        } finally {
          d3.event = e0;
        }
      };
    };
    return dispatch;
  }
  d3.requote = function(s) {
    return s.replace(d3_requote_re, "\\$&");
  };
  var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  var d3_subclass = {}.__proto__ ? function(object, prototype) {
    object.__proto__ = prototype;
  } : function(object, prototype) {
    for (var property in prototype) object[property] = prototype[property];
  };
  function d3_selection(groups) {
    d3_subclass(groups, d3_selectionPrototype);
    return groups;
  }
  var d3_select = function(s, n) {
    return n.querySelector(s);
  }, d3_selectAll = function(s, n) {
    return n.querySelectorAll(s);
  }, d3_selectMatches = function(n, s) {
    var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, "matchesSelector")];
    d3_selectMatches = function(n, s) {
      return d3_selectMatcher.call(n, s);
    };
    return d3_selectMatches(n, s);
  };
  if (typeof Sizzle === "function") {
    d3_select = function(s, n) {
      return Sizzle(s, n)[0] || null;
    };
    d3_selectAll = Sizzle;
    d3_selectMatches = Sizzle.matchesSelector;
  }
  d3.selection = function() {
    return d3.select(d3_document.documentElement);
  };
  var d3_selectionPrototype = d3.selection.prototype = [];
  d3_selectionPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, group, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(subnode = selector.call(node, node.__data__, i, j));
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selector(selector) {
    return typeof selector === "function" ? selector : function() {
      return d3_select(selector, this);
    };
  }
  d3_selectionPrototype.selectAll = function(selector) {
    var subgroups = [], subgroup, node;
    selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
          subgroup.parentNode = node;
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selectorAll(selector) {
    return typeof selector === "function" ? selector : function() {
      return d3_selectAll(selector, this);
    };
  }
  var d3_nsXhtml = "http://www.w3.org/1999/xhtml";
  var d3_nsPrefix = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: d3_nsXhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  d3.ns = {
    prefix: d3_nsPrefix,
    qualify: function(name) {
      var i = name.indexOf(":"), prefix = name;
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return d3_nsPrefix.hasOwnProperty(prefix) ? {
        space: d3_nsPrefix[prefix],
        local: name
      } : name;
    }
  };
  d3_selectionPrototype.attr = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node();
        name = d3.ns.qualify(name);
        return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
      }
      for (value in name) this.each(d3_selection_attr(value, name[value]));
      return this;
    }
    return this.each(d3_selection_attr(name, value));
  };
  function d3_selection_attr(name, value) {
    name = d3.ns.qualify(name);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrConstant() {
      this.setAttribute(name, value);
    }
    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }
    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
    }
    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
    }
    return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
  }
  function d3_collapse(s) {
    return s.trim().replace(/\s+/g, " ");
  }
  d3_selectionPrototype.classed = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node(), n = (name = d3_selection_classes(name)).length, i = -1;
        if (value = node.classList) {
          while (++i < n) if (!value.contains(name[i])) return false;
        } else {
          value = node.getAttribute("class");
          while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
        }
        return true;
      }
      for (value in name) this.each(d3_selection_classed(value, name[value]));
      return this;
    }
    return this.each(d3_selection_classed(name, value));
  };
  function d3_selection_classedRe(name) {
    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
  }
  function d3_selection_classes(name) {
    return (name + "").trim().split(/^|\s+/);
  }
  function d3_selection_classed(name, value) {
    name = d3_selection_classes(name).map(d3_selection_classedName);
    var n = name.length;
    function classedConstant() {
      var i = -1;
      while (++i < n) name[i](this, value);
    }
    function classedFunction() {
      var i = -1, x = value.apply(this, arguments);
      while (++i < n) name[i](this, x);
    }
    return typeof value === "function" ? classedFunction : classedConstant;
  }
  function d3_selection_classedName(name) {
    var re = d3_selection_classedRe(name);
    return function(node, value) {
      if (c = node.classList) return value ? c.add(name) : c.remove(name);
      var c = node.getAttribute("class") || "";
      if (value) {
        re.lastIndex = 0;
        if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
      } else {
        node.setAttribute("class", d3_collapse(c.replace(re, " ")));
      }
    };
  }
  d3_selectionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
        return this;
      }
      if (n < 2) {
        var node = this.node();
        return d3_window(node).getComputedStyle(node, null).getPropertyValue(name);
      }
      priority = "";
    }
    return this.each(d3_selection_style(name, value, priority));
  };
  function d3_selection_style(name, value, priority) {
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }
    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
    }
    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
  }
  d3_selectionPrototype.property = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") return this.node()[name];
      for (value in name) this.each(d3_selection_property(value, name[value]));
      return this;
    }
    return this.each(d3_selection_property(name, value));
  };
  function d3_selection_property(name, value) {
    function propertyNull() {
      delete this[name];
    }
    function propertyConstant() {
      this[name] = value;
    }
    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name]; else this[name] = x;
    }
    return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
  }
  d3_selectionPrototype.text = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    } : value == null ? function() {
      this.textContent = "";
    } : function() {
      this.textContent = value;
    }) : this.node().textContent;
  };
  d3_selectionPrototype.html = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    } : value == null ? function() {
      this.innerHTML = "";
    } : function() {
      this.innerHTML = value;
    }) : this.node().innerHTML;
  };
  d3_selectionPrototype.append = function(name) {
    name = d3_selection_creator(name);
    return this.select(function() {
      return this.appendChild(name.apply(this, arguments));
    });
  };
  function d3_selection_creator(name) {
    function create() {
      var document = this.ownerDocument, namespace = this.namespaceURI;
      return namespace === d3_nsXhtml && document.documentElement.namespaceURI === d3_nsXhtml ? document.createElement(name) : document.createElementNS(namespace, name);
    }
    function createNS() {
      return this.ownerDocument.createElementNS(name.space, name.local);
    }
    return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? createNS : create;
  }
  d3_selectionPrototype.insert = function(name, before) {
    name = d3_selection_creator(name);
    before = d3_selection_selector(before);
    return this.select(function() {
      return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
    });
  };
  d3_selectionPrototype.remove = function() {
    return this.each(d3_selectionRemove);
  };
  function d3_selectionRemove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }
  d3_selectionPrototype.data = function(value, key) {
    var i = -1, n = this.length, group, node;
    if (!arguments.length) {
      value = new Array(n = (group = this[0]).length);
      while (++i < n) {
        if (node = group[i]) {
          value[i] = node.__data__;
        }
      }
      return value;
    }
    function bind(group, groupData) {
      var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
      if (key) {
        var nodeByKeyValue = new d3_Map(), keyValues = new Array(n), keyValue;
        for (i = -1; ++i < n; ) {
          if (node = group[i]) {
            if (nodeByKeyValue.has(keyValue = key.call(node, node.__data__, i))) {
              exitNodes[i] = node;
            } else {
              nodeByKeyValue.set(keyValue, node);
            }
            keyValues[i] = keyValue;
          }
        }
        for (i = -1; ++i < m; ) {
          if (!(node = nodeByKeyValue.get(keyValue = key.call(groupData, nodeData = groupData[i], i)))) {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          } else if (node !== true) {
            updateNodes[i] = node;
            node.__data__ = nodeData;
          }
          nodeByKeyValue.set(keyValue, true);
        }
        for (i = -1; ++i < n; ) {
          if (i in keyValues && nodeByKeyValue.get(keyValues[i]) !== true) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (i = -1; ++i < n0; ) {
          node = group[i];
          nodeData = groupData[i];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
          } else {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
        }
        for (;i < m; ++i) {
          enterNodes[i] = d3_selection_dataNode(groupData[i]);
        }
        for (;i < n; ++i) {
          exitNodes[i] = group[i];
        }
      }
      enterNodes.update = updateNodes;
      enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }
    var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
    if (typeof value === "function") {
      while (++i < n) {
        bind(group = this[i], value.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = this[i], value);
      }
    }
    update.enter = function() {
      return enter;
    };
    update.exit = function() {
      return exit;
    };
    return update;
  };
  function d3_selection_dataNode(data) {
    return {
      __data__: data
    };
  }
  d3_selectionPrototype.datum = function(value) {
    return arguments.length ? this.property("__data__", value) : this.property("__data__");
  };
  d3_selectionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_filter(selector) {
    return function() {
      return d3_selectMatches(this, selector);
    };
  }
  d3_selectionPrototype.order = function() {
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  };
  d3_selectionPrototype.sort = function(comparator) {
    comparator = d3_selection_sortComparator.apply(this, arguments);
    for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
    return this.order();
  };
  function d3_selection_sortComparator(comparator) {
    if (!arguments.length) comparator = d3_ascending;
    return function(a, b) {
      return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
    };
  }
  d3_selectionPrototype.each = function(callback) {
    return d3_selection_each(this, function(node, i, j) {
      callback.call(node, node.__data__, i, j);
    });
  };
  function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
        if (node = group[i]) callback(node, i, j);
      }
    }
    return groups;
  }
  d3_selectionPrototype.call = function(callback) {
    var args = d3_array(arguments);
    callback.apply(args[0] = this, args);
    return this;
  };
  d3_selectionPrototype.empty = function() {
    return !this.node();
  };
  d3_selectionPrototype.node = function() {
    for (var j = 0, m = this.length; j < m; j++) {
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return node;
      }
    }
    return null;
  };
  d3_selectionPrototype.size = function() {
    var n = 0;
    d3_selection_each(this, function() {
      ++n;
    });
    return n;
  };
  function d3_selection_enter(selection) {
    d3_subclass(selection, d3_selection_enterPrototype);
    return selection;
  }
  var d3_selection_enterPrototype = [];
  d3.selection.enter = d3_selection_enter;
  d3.selection.enter.prototype = d3_selection_enterPrototype;
  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
  d3_selection_enterPrototype.call = d3_selectionPrototype.call;
  d3_selection_enterPrototype.size = d3_selectionPrototype.size;
  d3_selection_enterPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, upgroup, group, node;
    for (var j = -1, m = this.length; ++j < m; ) {
      upgroup = (group = this[j]).update;
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  d3_selection_enterPrototype.insert = function(name, before) {
    if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
    return d3_selectionPrototype.insert.call(this, name, before);
  };
  function d3_selection_enterInsertBefore(enter) {
    var i0, j0;
    return function(d, i, j) {
      var group = enter[j].update, n = group.length, node;
      if (j != j0) j0 = j, i0 = 0;
      if (i >= i0) i0 = i + 1;
      while (!(node = group[i0]) && ++i0 < n) ;
      return node;
    };
  }
  d3.select = function(node) {
    var group;
    if (typeof node === "string") {
      group = [ d3_select(node, d3_document) ];
      group.parentNode = d3_document.documentElement;
    } else {
      group = [ node ];
      group.parentNode = d3_documentElement(node);
    }
    return d3_selection([ group ]);
  };
  d3.selectAll = function(nodes) {
    var group;
    if (typeof nodes === "string") {
      group = d3_array(d3_selectAll(nodes, d3_document));
      group.parentNode = d3_document.documentElement;
    } else {
      group = d3_array(nodes);
      group.parentNode = null;
    }
    return d3_selection([ group ]);
  };
  d3_selectionPrototype.on = function(type, listener, capture) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof type !== "string") {
        if (n < 2) listener = false;
        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
        return this;
      }
      if (n < 2) return (n = this.node()["__on" + type]) && n._;
      capture = false;
    }
    return this.each(d3_selection_on(type, listener, capture));
  };
  function d3_selection_on(type, listener, capture) {
    var name = "__on" + type, i = type.indexOf("."), wrap = d3_selection_onListener;
    if (i > 0) type = type.slice(0, i);
    var filter = d3_selection_onFilters.get(type);
    if (filter) type = filter, wrap = d3_selection_onFilter;
    function onRemove() {
      var l = this[name];
      if (l) {
        this.removeEventListener(type, l, l.$);
        delete this[name];
      }
    }
    function onAdd() {
      var l = wrap(listener, d3_array(arguments));
      onRemove.call(this);
      this.addEventListener(type, this[name] = l, l.$ = capture);
      l._ = listener;
    }
    function removeAll() {
      var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"), match;
      for (var name in this) {
        if (match = name.match(re)) {
          var l = this[name];
          this.removeEventListener(match[1], l, l.$);
          delete this[name];
        }
      }
    }
    return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
  }
  var d3_selection_onFilters = d3.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  });
  if (d3_document) {
    d3_selection_onFilters.forEach(function(k) {
      if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
    });
  }
  function d3_selection_onListener(listener, argumentz) {
    return function(e) {
      var o = d3.event;
      d3.event = e;
      argumentz[0] = this.__data__;
      try {
        listener.apply(this, argumentz);
      } finally {
        d3.event = o;
      }
    };
  }
  function d3_selection_onFilter(listener, argumentz) {
    var l = d3_selection_onListener(listener, argumentz);
    return function(e) {
      var target = this, related = e.relatedTarget;
      if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
        l.call(target, e);
      }
    };
  }
  var d3_event_dragSelect, d3_event_dragId = 0;
  function d3_event_dragSuppress(node) {
    var name = ".dragsuppress-" + ++d3_event_dragId, click = "click" + name, w = d3.select(d3_window(node)).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);
    if (d3_event_dragSelect == null) {
      d3_event_dragSelect = "onselectstart" in node ? false : d3_vendorSymbol(node.style, "userSelect");
    }
    if (d3_event_dragSelect) {
      var style = d3_documentElement(node).style, select = style[d3_event_dragSelect];
      style[d3_event_dragSelect] = "none";
    }
    return function(suppressClick) {
      w.on(name, null);
      if (d3_event_dragSelect) style[d3_event_dragSelect] = select;
      if (suppressClick) {
        var off = function() {
          w.on(click, null);
        };
        w.on(click, function() {
          d3_eventPreventDefault();
          off();
        }, true);
        setTimeout(off, 0);
      }
    };
  }
  d3.mouse = function(container) {
    return d3_mousePoint(container, d3_eventSource());
  };
  var d3_mouse_bug44083 = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
  function d3_mousePoint(container, e) {
    if (e.changedTouches) e = e.changedTouches[0];
    var svg = container.ownerSVGElement || container;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      if (d3_mouse_bug44083 < 0) {
        var window = d3_window(container);
        if (window.scrollX || window.scrollY) {
          svg = d3.select("body").append("svg").style({
            position: "absolute",
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            border: "none"
          }, "important");
          var ctm = svg[0][0].getScreenCTM();
          d3_mouse_bug44083 = !(ctm.f || ctm.e);
          svg.remove();
        }
      }
      if (d3_mouse_bug44083) point.x = e.pageX, point.y = e.pageY; else point.x = e.clientX, 
      point.y = e.clientY;
      point = point.matrixTransform(container.getScreenCTM().inverse());
      return [ point.x, point.y ];
    }
    var rect = container.getBoundingClientRect();
    return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
  }
  d3.touch = function(container, touches, identifier) {
    if (arguments.length < 3) identifier = touches, touches = d3_eventSource().changedTouches;
    if (touches) for (var i = 0, n = touches.length, touch; i < n; ++i) {
      if ((touch = touches[i]).identifier === identifier) {
        return d3_mousePoint(container, touch);
      }
    }
  };
  d3.behavior.drag = function() {
    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null, mousedown = dragstart(d3_noop, d3.mouse, d3_window, "mousemove", "mouseup"), touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_identity, "touchmove", "touchend");
    function drag() {
      this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
    }
    function dragstart(id, position, subject, move, end) {
      return function() {
        var that = this, target = d3.event.target.correspondingElement || d3.event.target, parent = that.parentNode, dispatch = event.of(that, arguments), dragged = 0, dragId = id(), dragName = ".drag" + (dragId == null ? "" : "-" + dragId), dragOffset, dragSubject = d3.select(subject(target)).on(move + dragName, moved).on(end + dragName, ended), dragRestore = d3_event_dragSuppress(target), position0 = position(parent, dragId);
        if (origin) {
          dragOffset = origin.apply(that, arguments);
          dragOffset = [ dragOffset.x - position0[0], dragOffset.y - position0[1] ];
        } else {
          dragOffset = [ 0, 0 ];
        }
        dispatch({
          type: "dragstart"
        });
        function moved() {
          var position1 = position(parent, dragId), dx, dy;
          if (!position1) return;
          dx = position1[0] - position0[0];
          dy = position1[1] - position0[1];
          dragged |= dx | dy;
          position0 = position1;
          dispatch({
            type: "drag",
            x: position1[0] + dragOffset[0],
            y: position1[1] + dragOffset[1],
            dx: dx,
            dy: dy
          });
        }
        function ended() {
          if (!position(parent, dragId)) return;
          dragSubject.on(move + dragName, null).on(end + dragName, null);
          dragRestore(dragged);
          dispatch({
            type: "dragend"
          });
        }
      };
    }
    drag.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return drag;
    };
    return d3.rebind(drag, event, "on");
  };
  function d3_behavior_dragTouchId() {
    return d3.event.changedTouches[0].identifier;
  }
  d3.touches = function(container, touches) {
    if (arguments.length < 2) touches = d3_eventSource().touches;
    return touches ? d3_array(touches).map(function(touch) {
      var point = d3_mousePoint(container, touch);
      point.identifier = touch.identifier;
      return point;
    }) : [];
  };
  var ε = 1e-6, ε2 = ε * ε, π = Math.PI, τ = 2 * π, τε = τ - ε, halfπ = π / 2, d3_radians = π / 180, d3_degrees = 180 / π;
  function d3_sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }
  function d3_cross2d(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  }
  function d3_acos(x) {
    return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
  }
  function d3_asin(x) {
    return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
  }
  function d3_sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }
  function d3_cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }
  function d3_tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }
  function d3_haversin(x) {
    return (x = Math.sin(x / 2)) * x;
  }
  var ρ = Math.SQRT2, ρ2 = 2, ρ4 = 4;
  d3.interpolateZoom = function(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < ε2) {
      S = Math.log(w1 / w0) / ρ;
      i = function(t) {
        return [ ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(ρ * t * S) ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + ρ4 * d2) / (2 * w0 * ρ2 * d1), b1 = (w1 * w1 - w0 * w0 - ρ4 * d2) / (2 * w1 * ρ2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / ρ;
      i = function(t) {
        var s = t * S, coshr0 = d3_cosh(r0), u = w0 / (ρ2 * d1) * (coshr0 * d3_tanh(ρ * s + r0) - d3_sinh(r0));
        return [ ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(ρ * s + r0) ];
      };
    }
    i.duration = S * 1e3;
    return i;
  };
  d3.behavior.zoom = function() {
    var view = {
      x: 0,
      y: 0,
      k: 1
    }, translate0, center0, center, size = [ 960, 500 ], scaleExtent = d3_behavior_zoomInfinity, duration = 250, zooming = 0, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", mousewheelTimer, touchstart = "touchstart.zoom", touchtime, event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"), x0, x1, y0, y1;
    if (!d3_behavior_zoomWheel) {
      d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
        return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
      }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
        return d3.event.wheelDelta;
      }, "mousewheel") : (d3_behavior_zoomDelta = function() {
        return -d3.event.detail;
      }, "MozMousePixelScroll");
    }
    function zoom(g) {
      g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted);
    }
    zoom.event = function(g) {
      g.each(function() {
        var dispatch = event.of(this, arguments), view1 = view;
        if (d3_transitionInheritId) {
          d3.select(this).transition().each("start.zoom", function() {
            view = this.__chart__ || {
              x: 0,
              y: 0,
              k: 1
            };
            zoomstarted(dispatch);
          }).tween("zoom:zoom", function() {
            var dx = size[0], dy = size[1], cx = center0 ? center0[0] : dx / 2, cy = center0 ? center0[1] : dy / 2, i = d3.interpolateZoom([ (cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k ], [ (cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k ]);
            return function(t) {
              var l = i(t), k = dx / l[2];
              this.__chart__ = view = {
                x: cx - l[0] * k,
                y: cy - l[1] * k,
                k: k
              };
              zoomed(dispatch);
            };
          }).each("interrupt.zoom", function() {
            zoomended(dispatch);
          }).each("end.zoom", function() {
            zoomended(dispatch);
          });
        } else {
          this.__chart__ = view;
          zoomstarted(dispatch);
          zoomed(dispatch);
          zoomended(dispatch);
        }
      });
    };
    zoom.translate = function(_) {
      if (!arguments.length) return [ view.x, view.y ];
      view = {
        x: +_[0],
        y: +_[1],
        k: view.k
      };
      rescale();
      return zoom;
    };
    zoom.scale = function(_) {
      if (!arguments.length) return view.k;
      view = {
        x: view.x,
        y: view.y,
        k: null
      };
      scaleTo(+_);
      rescale();
      return zoom;
    };
    zoom.scaleExtent = function(_) {
      if (!arguments.length) return scaleExtent;
      scaleExtent = _ == null ? d3_behavior_zoomInfinity : [ +_[0], +_[1] ];
      return zoom;
    };
    zoom.center = function(_) {
      if (!arguments.length) return center;
      center = _ && [ +_[0], +_[1] ];
      return zoom;
    };
    zoom.size = function(_) {
      if (!arguments.length) return size;
      size = _ && [ +_[0], +_[1] ];
      return zoom;
    };
    zoom.duration = function(_) {
      if (!arguments.length) return duration;
      duration = +_;
      return zoom;
    };
    zoom.x = function(z) {
      if (!arguments.length) return x1;
      x1 = z;
      x0 = z.copy();
      view = {
        x: 0,
        y: 0,
        k: 1
      };
      return zoom;
    };
    zoom.y = function(z) {
      if (!arguments.length) return y1;
      y1 = z;
      y0 = z.copy();
      view = {
        x: 0,
        y: 0,
        k: 1
      };
      return zoom;
    };
    function location(p) {
      return [ (p[0] - view.x) / view.k, (p[1] - view.y) / view.k ];
    }
    function point(l) {
      return [ l[0] * view.k + view.x, l[1] * view.k + view.y ];
    }
    function scaleTo(s) {
      view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
    }
    function translateTo(p, l) {
      l = point(l);
      view.x += p[0] - l[0];
      view.y += p[1] - l[1];
    }
    function zoomTo(that, p, l, k) {
      that.__chart__ = {
        x: view.x,
        y: view.y,
        k: view.k
      };
      scaleTo(Math.pow(2, k));
      translateTo(center0 = p, l);
      that = d3.select(that);
      if (duration > 0) that = that.transition().duration(duration);
      that.call(zoom.event);
    }
    function rescale() {
      if (x1) x1.domain(x0.range().map(function(x) {
        return (x - view.x) / view.k;
      }).map(x0.invert));
      if (y1) y1.domain(y0.range().map(function(y) {
        return (y - view.y) / view.k;
      }).map(y0.invert));
    }
    function zoomstarted(dispatch) {
      if (!zooming++) dispatch({
        type: "zoomstart"
      });
    }
    function zoomed(dispatch) {
      rescale();
      dispatch({
        type: "zoom",
        scale: view.k,
        translate: [ view.x, view.y ]
      });
    }
    function zoomended(dispatch) {
      if (!--zooming) dispatch({
        type: "zoomend"
      }), center0 = null;
    }
    function mousedowned() {
      var that = this, dispatch = event.of(that, arguments), dragged = 0, subject = d3.select(d3_window(that)).on(mousemove, moved).on(mouseup, ended), location0 = location(d3.mouse(that)), dragRestore = d3_event_dragSuppress(that);
      d3_selection_interrupt.call(that);
      zoomstarted(dispatch);
      function moved() {
        dragged = 1;
        translateTo(d3.mouse(that), location0);
        zoomed(dispatch);
      }
      function ended() {
        subject.on(mousemove, null).on(mouseup, null);
        dragRestore(dragged);
        zoomended(dispatch);
      }
    }
    function touchstarted() {
      var that = this, dispatch = event.of(that, arguments), locations0 = {}, distance0 = 0, scale0, zoomName = ".zoom-" + d3.event.changedTouches[0].identifier, touchmove = "touchmove" + zoomName, touchend = "touchend" + zoomName, targets = [], subject = d3.select(that), dragRestore = d3_event_dragSuppress(that);
      started();
      zoomstarted(dispatch);
      subject.on(mousedown, null).on(touchstart, started);
      function relocate() {
        var touches = d3.touches(that);
        scale0 = view.k;
        touches.forEach(function(t) {
          if (t.identifier in locations0) locations0[t.identifier] = location(t);
        });
        return touches;
      }
      function started() {
        var target = d3.event.target;
        d3.select(target).on(touchmove, moved).on(touchend, ended);
        targets.push(target);
        var changed = d3.event.changedTouches;
        for (var i = 0, n = changed.length; i < n; ++i) {
          locations0[changed[i].identifier] = null;
        }
        var touches = relocate(), now = Date.now();
        if (touches.length === 1) {
          if (now - touchtime < 500) {
            var p = touches[0];
            zoomTo(that, p, locations0[p.identifier], Math.floor(Math.log(view.k) / Math.LN2) + 1);
            d3_eventPreventDefault();
          }
          touchtime = now;
        } else if (touches.length > 1) {
          var p = touches[0], q = touches[1], dx = p[0] - q[0], dy = p[1] - q[1];
          distance0 = dx * dx + dy * dy;
        }
      }
      function moved() {
        var touches = d3.touches(that), p0, l0, p1, l1;
        d3_selection_interrupt.call(that);
        for (var i = 0, n = touches.length; i < n; ++i, l1 = null) {
          p1 = touches[i];
          if (l1 = locations0[p1.identifier]) {
            if (l0) break;
            p0 = p1, l0 = l1;
          }
        }
        if (l1) {
          var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1, scale1 = distance0 && Math.sqrt(distance1 / distance0);
          p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
          l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
          scaleTo(scale1 * scale0);
        }
        touchtime = null;
        translateTo(p0, l0);
        zoomed(dispatch);
      }
      function ended() {
        if (d3.event.touches.length) {
          var changed = d3.event.changedTouches;
          for (var i = 0, n = changed.length; i < n; ++i) {
            delete locations0[changed[i].identifier];
          }
          for (var identifier in locations0) {
            return void relocate();
          }
        }
        d3.selectAll(targets).on(zoomName, null);
        subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
        dragRestore();
        zoomended(dispatch);
      }
    }
    function mousewheeled() {
      var dispatch = event.of(this, arguments);
      if (mousewheelTimer) clearTimeout(mousewheelTimer); else d3_selection_interrupt.call(this), 
      translate0 = location(center0 = center || d3.mouse(this)), zoomstarted(dispatch);
      mousewheelTimer = setTimeout(function() {
        mousewheelTimer = null;
        zoomended(dispatch);
      }, 50);
      d3_eventPreventDefault();
      scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * view.k);
      translateTo(center0, translate0);
      zoomed(dispatch);
    }
    function dblclicked() {
      var p = d3.mouse(this), k = Math.log(view.k) / Math.LN2;
      zoomTo(this, p, location(p), d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1);
    }
    return d3.rebind(zoom, event, "on");
  };
  var d3_behavior_zoomInfinity = [ 0, Infinity ], d3_behavior_zoomDelta, d3_behavior_zoomWheel;
  d3.color = d3_color;
  function d3_color() {}
  d3_color.prototype.toString = function() {
    return this.rgb() + "";
  };
  d3.hsl = d3_hsl;
  function d3_hsl(h, s, l) {
    return this instanceof d3_hsl ? void (this.h = +h, this.s = +s, this.l = +l) : arguments.length < 2 ? h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : new d3_hsl(h, s, l);
  }
  var d3_hslPrototype = d3_hsl.prototype = new d3_color();
  d3_hslPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_hsl(this.h, this.s, this.l / k);
  };
  d3_hslPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_hsl(this.h, this.s, k * this.l);
  };
  d3_hslPrototype.rgb = function() {
    return d3_hsl_rgb(this.h, this.s, this.l);
  };
  function d3_hsl_rgb(h, s, l) {
    var m1, m2;
    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    function v(h) {
      if (h > 360) h -= 360; else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }
    function vv(h) {
      return Math.round(v(h) * 255);
    }
    return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
  }
  d3.hcl = d3_hcl;
  function d3_hcl(h, c, l) {
    return this instanceof d3_hcl ? void (this.h = +h, this.c = +c, this.l = +l) : arguments.length < 2 ? h instanceof d3_hcl ? new d3_hcl(h.h, h.c, h.l) : h instanceof d3_lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : new d3_hcl(h, c, l);
  }
  var d3_hclPrototype = d3_hcl.prototype = new d3_color();
  d3_hclPrototype.brighter = function(k) {
    return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.darker = function(k) {
    return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.rgb = function() {
    return d3_hcl_lab(this.h, this.c, this.l).rgb();
  };
  function d3_hcl_lab(h, c, l) {
    if (isNaN(h)) h = 0;
    if (isNaN(c)) c = 0;
    return new d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
  }
  d3.lab = d3_lab;
  function d3_lab(l, a, b) {
    return this instanceof d3_lab ? void (this.l = +l, this.a = +a, this.b = +b) : arguments.length < 2 ? l instanceof d3_lab ? new d3_lab(l.l, l.a, l.b) : l instanceof d3_hcl ? d3_hcl_lab(l.h, l.c, l.l) : d3_rgb_lab((l = d3_rgb(l)).r, l.g, l.b) : new d3_lab(l, a, b);
  }
  var d3_lab_K = 18;
  var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
  var d3_labPrototype = d3_lab.prototype = new d3_color();
  d3_labPrototype.brighter = function(k) {
    return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.darker = function(k) {
    return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.rgb = function() {
    return d3_lab_rgb(this.l, this.a, this.b);
  };
  function d3_lab_rgb(l, a, b) {
    var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
    x = d3_lab_xyz(x) * d3_lab_X;
    y = d3_lab_xyz(y) * d3_lab_Y;
    z = d3_lab_xyz(z) * d3_lab_Z;
    return new d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
  }
  function d3_lab_hcl(l, a, b) {
    return l > 0 ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : new d3_hcl(NaN, NaN, l);
  }
  function d3_lab_xyz(x) {
    return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
  }
  function d3_xyz_lab(x) {
    return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
  }
  function d3_xyz_rgb(r) {
    return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
  }
  d3.rgb = d3_rgb;
  function d3_rgb(r, g, b) {
    return this instanceof d3_rgb ? void (this.r = ~~r, this.g = ~~g, this.b = ~~b) : arguments.length < 2 ? r instanceof d3_rgb ? new d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b);
  }
  function d3_rgbNumber(value) {
    return new d3_rgb(value >> 16, value >> 8 & 255, value & 255);
  }
  function d3_rgbString(value) {
    return d3_rgbNumber(value) + "";
  }
  var d3_rgbPrototype = d3_rgb.prototype = new d3_color();
  d3_rgbPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    var r = this.r, g = this.g, b = this.b, i = 30;
    if (!r && !g && !b) return new d3_rgb(i, i, i);
    if (r && r < i) r = i;
    if (g && g < i) g = i;
    if (b && b < i) b = i;
    return new d3_rgb(Math.min(255, r / k), Math.min(255, g / k), Math.min(255, b / k));
  };
  d3_rgbPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_rgb(k * this.r, k * this.g, k * this.b);
  };
  d3_rgbPrototype.hsl = function() {
    return d3_rgb_hsl(this.r, this.g, this.b);
  };
  d3_rgbPrototype.toString = function() {
    return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
  };
  function d3_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }
  function d3_rgb_parse(format, rgb, hsl) {
    var r = 0, g = 0, b = 0, m1, m2, color;
    m1 = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase());
    if (m1) {
      m2 = m1[2].split(",");
      switch (m1[1]) {
       case "hsl":
        {
          return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
        }

       case "rgb":
        {
          return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
        }
      }
    }
    if (color = d3_rgb_names.get(format)) {
      return rgb(color.r, color.g, color.b);
    }
    if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.slice(1), 16))) {
      if (format.length === 4) {
        r = (color & 3840) >> 4;
        r = r >> 4 | r;
        g = color & 240;
        g = g >> 4 | g;
        b = color & 15;
        b = b << 4 | b;
      } else if (format.length === 7) {
        r = (color & 16711680) >> 16;
        g = (color & 65280) >> 8;
        b = color & 255;
      }
    }
    return rgb(r, g, b);
  }
  function d3_rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
    if (d) {
      s = l < .5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
      h *= 60;
    } else {
      h = NaN;
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new d3_hsl(h, s, l);
  }
  function d3_rgb_lab(r, g, b) {
    r = d3_rgb_xyz(r);
    g = d3_rgb_xyz(g);
    b = d3_rgb_xyz(b);
    var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
    return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
  }
  function d3_rgb_xyz(r) {
    return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
  }
  function d3_rgb_parseNumber(c) {
    var f = parseFloat(c);
    return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
  }
  var d3_rgb_names = d3.map({
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  });
  d3_rgb_names.forEach(function(key, value) {
    d3_rgb_names.set(key, d3_rgbNumber(value));
  });
  function d3_functor(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  }
  d3.functor = d3_functor;
  d3.xhr = d3_xhrType(d3_identity);
  function d3_xhrType(response) {
    return function(url, mimeType, callback) {
      if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, 
      mimeType = null;
      return d3_xhr(url, mimeType, response, callback);
    };
  }
  function d3_xhr(url, mimeType, response, callback) {
    var xhr = {}, dispatch = d3.dispatch("beforesend", "progress", "load", "error"), headers = {}, request = new XMLHttpRequest(), responseType = null;
    if (this.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();
    "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
      request.readyState > 3 && respond();
    };
    function respond() {
      var status = request.status, result;
      if (!status && d3_xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
        try {
          result = response.call(xhr, request);
        } catch (e) {
          dispatch.error.call(xhr, e);
          return;
        }
        dispatch.load.call(xhr, result);
      } else {
        dispatch.error.call(xhr, request);
      }
    }
    request.onprogress = function(event) {
      var o = d3.event;
      d3.event = event;
      try {
        dispatch.progress.call(xhr, request);
      } finally {
        d3.event = o;
      }
    };
    xhr.header = function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers[name];
      if (value == null) delete headers[name]; else headers[name] = value + "";
      return xhr;
    };
    xhr.mimeType = function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return xhr;
    };
    xhr.responseType = function(value) {
      if (!arguments.length) return responseType;
      responseType = value;
      return xhr;
    };
    xhr.response = function(value) {
      response = value;
      return xhr;
    };
    [ "get", "post" ].forEach(function(method) {
      xhr[method] = function() {
        return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
      };
    });
    xhr.send = function(method, data, callback) {
      if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
      request.open(method, url, true);
      if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
      if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
      if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
      if (responseType != null) request.responseType = responseType;
      if (callback != null) xhr.on("error", callback).on("load", function(request) {
        callback(null, request);
      });
      dispatch.beforesend.call(xhr, request);
      request.send(data == null ? null : data);
      return xhr;
    };
    xhr.abort = function() {
      request.abort();
      return xhr;
    };
    d3.rebind(xhr, dispatch, "on");
    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
  }
  function d3_xhr_fixCallback(callback) {
    return callback.length === 1 ? function(error, request) {
      callback(error == null ? request : null);
    } : callback;
  }
  function d3_xhrHasResponse(request) {
    var type = request.responseType;
    return type && type !== "text" ? request.response : request.responseText;
  }
  d3.dsv = function(delimiter, mimeType) {
    var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
    function dsv(url, row, callback) {
      if (arguments.length < 3) callback = row, row = null;
      var xhr = d3_xhr(url, mimeType, row == null ? response : typedResponse(row), callback);
      xhr.row = function(_) {
        return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
      };
      return xhr;
    }
    function response(request) {
      return dsv.parse(request.responseText);
    }
    function typedResponse(f) {
      return function(request) {
        return dsv.parse(request.responseText, f);
      };
    }
    dsv.parse = function(text, f) {
      var o;
      return dsv.parseRows(text, function(row, i) {
        if (o) return o(row, i - 1);
        var a = new Function("d", "return {" + row.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        }).join(",") + "}");
        o = f ? function(row, i) {
          return f(a(row), i);
        } : a;
      });
    };
    dsv.parseRows = function(text, f) {
      var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
      function token() {
        if (I >= N) return EOF;
        if (eol) return eol = false, EOL;
        var j = I;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.slice(j + 1, i).replace(/""/g, '"');
        }
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; else if (c === 13) {
            eol = true;
            if (text.charCodeAt(I) === 10) ++I, ++k;
          } else if (c !== delimiterCode) continue;
          return text.slice(j, I - k);
        }
        return text.slice(j);
      }
      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && (a = f(a, n++)) == null) continue;
        rows.push(a);
      }
      return rows;
    };
    dsv.format = function(rows) {
      if (Array.isArray(rows[0])) return dsv.formatRows(rows);
      var fieldSet = new d3_Set(), fields = [];
      rows.forEach(function(row) {
        for (var field in row) {
          if (!fieldSet.has(field)) {
            fields.push(fieldSet.add(field));
          }
        }
      });
      return [ fields.map(formatValue).join(delimiter) ].concat(rows.map(function(row) {
        return fields.map(function(field) {
          return formatValue(row[field]);
        }).join(delimiter);
      })).join("\n");
    };
    dsv.formatRows = function(rows) {
      return rows.map(formatRow).join("\n");
    };
    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }
    function formatValue(text) {
      return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
    }
    return dsv;
  };
  d3.csv = d3.dsv(",", "text/csv");
  d3.tsv = d3.dsv("	", "text/tab-separated-values");
  var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_frame = this[d3_vendorSymbol(this, "requestAnimationFrame")] || function(callback) {
    setTimeout(callback, 17);
  };
  d3.timer = function() {
    d3_timer.apply(this, arguments);
  };
  function d3_timer(callback, delay, then) {
    var n = arguments.length;
    if (n < 2) delay = 0;
    if (n < 3) then = Date.now();
    var time = then + delay, timer = {
      c: callback,
      t: time,
      n: null
    };
    if (d3_timer_queueTail) d3_timer_queueTail.n = timer; else d3_timer_queueHead = timer;
    d3_timer_queueTail = timer;
    if (!d3_timer_interval) {
      d3_timer_timeout = clearTimeout(d3_timer_timeout);
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
    return timer;
  }
  function d3_timer_step() {
    var now = d3_timer_mark(), delay = d3_timer_sweep() - now;
    if (delay > 24) {
      if (isFinite(delay)) {
        clearTimeout(d3_timer_timeout);
        d3_timer_timeout = setTimeout(d3_timer_step, delay);
      }
      d3_timer_interval = 0;
    } else {
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  }
  d3.timer.flush = function() {
    d3_timer_mark();
    d3_timer_sweep();
  };
  function d3_timer_mark() {
    var now = Date.now(), timer = d3_timer_queueHead;
    while (timer) {
      if (now >= timer.t && timer.c(now - timer.t)) timer.c = null;
      timer = timer.n;
    }
    return now;
  }
  function d3_timer_sweep() {
    var t0, t1 = d3_timer_queueHead, time = Infinity;
    while (t1) {
      if (t1.c) {
        if (t1.t < time) time = t1.t;
        t1 = (t0 = t1).n;
      } else {
        t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
      }
    }
    d3_timer_queueTail = t0;
    return time;
  }
  function d3_format_precision(x, p) {
    return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
  }
  d3.round = function(x, n) {
    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
  };
  var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
  d3.formatPrefix = function(value, precision) {
    var i = 0;
    if (value = +value) {
      if (value < 0) value *= -1;
      if (precision) value = d3.round(value, d3_format_precision(value, precision));
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
    }
    return d3_formatPrefixes[8 + i / 3];
  };
  function d3_formatPrefix(d, i) {
    var k = Math.pow(10, abs(8 - i) * 3);
    return {
      scale: i > 8 ? function(d) {
        return d / k;
      } : function(d) {
        return d * k;
      },
      symbol: d
    };
  }
  function d3_locale_numberFormat(locale) {
    var locale_decimal = locale.decimal, locale_thousands = locale.thousands, locale_grouping = locale.grouping, locale_currency = locale.currency, formatGroup = locale_grouping && locale_thousands ? function(value, width) {
      var i = value.length, t = [], j = 0, g = locale_grouping[0], length = 0;
      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = locale_grouping[j = (j + 1) % locale_grouping.length];
      }
      return t.reverse().join(locale_thousands);
    } : d3_identity;
    return function(specifier) {
      var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "-", symbol = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, prefix = "", suffix = "", integer = false, exponent = true;
      if (precision) precision = +precision.substring(1);
      if (zfill || fill === "0" && align === "=") {
        zfill = fill = "0";
        align = "=";
      }
      switch (type) {
       case "n":
        comma = true;
        type = "g";
        break;

       case "%":
        scale = 100;
        suffix = "%";
        type = "f";
        break;

       case "p":
        scale = 100;
        suffix = "%";
        type = "r";
        break;

       case "b":
       case "o":
       case "x":
       case "X":
        if (symbol === "#") prefix = "0" + type.toLowerCase();

       case "c":
        exponent = false;

       case "d":
        integer = true;
        precision = 0;
        break;

       case "s":
        scale = -1;
        type = "r";
        break;
      }
      if (symbol === "$") prefix = locale_currency[0], suffix = locale_currency[1];
      if (type == "r" && !precision) type = "g";
      if (precision != null) {
        if (type == "g") precision = Math.max(1, Math.min(21, precision)); else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
      }
      type = d3_format_types.get(type) || d3_format_typeDefault;
      var zcomma = zfill && comma;
      return function(value) {
        var fullSuffix = suffix;
        if (integer && value % 1) return "";
        var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign === "-" ? "" : sign;
        if (scale < 0) {
          var unit = d3.formatPrefix(value, precision);
          value = unit.scale(value);
          fullSuffix = unit.symbol + suffix;
        } else {
          value *= scale;
        }
        value = type(value, precision);
        var i = value.lastIndexOf("."), before, after;
        if (i < 0) {
          var j = exponent ? value.lastIndexOf("e") : -1;
          if (j < 0) before = value, after = ""; else before = value.substring(0, j), after = value.substring(j);
        } else {
          before = value.substring(0, i);
          after = locale_decimal + value.substring(i + 1);
        }
        if (!zfill && comma) before = formatGroup(before, Infinity);
        var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
        if (zcomma) before = formatGroup(padding + before, padding.length ? width - after.length : Infinity);
        negative += prefix;
        value = before + after;
        return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix;
      };
    };
  }
  var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
  var d3_format_types = d3.map({
    b: function(x) {
      return x.toString(2);
    },
    c: function(x) {
      return String.fromCharCode(x);
    },
    o: function(x) {
      return x.toString(8);
    },
    x: function(x) {
      return x.toString(16);
    },
    X: function(x) {
      return x.toString(16).toUpperCase();
    },
    g: function(x, p) {
      return x.toPrecision(p);
    },
    e: function(x, p) {
      return x.toExponential(p);
    },
    f: function(x, p) {
      return x.toFixed(p);
    },
    r: function(x, p) {
      return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
    }
  });
  function d3_format_typeDefault(x) {
    return x + "";
  }
  var d3_time = d3.time = {}, d3_date = Date;
  function d3_date_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }
  d3_date_utc.prototype = {
    getDate: function() {
      return this._.getUTCDate();
    },
    getDay: function() {
      return this._.getUTCDay();
    },
    getFullYear: function() {
      return this._.getUTCFullYear();
    },
    getHours: function() {
      return this._.getUTCHours();
    },
    getMilliseconds: function() {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function() {
      return this._.getUTCMinutes();
    },
    getMonth: function() {
      return this._.getUTCMonth();
    },
    getSeconds: function() {
      return this._.getUTCSeconds();
    },
    getTime: function() {
      return this._.getTime();
    },
    getTimezoneOffset: function() {
      return 0;
    },
    valueOf: function() {
      return this._.valueOf();
    },
    setDate: function() {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function() {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function() {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function() {
      d3_time_prototype.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function() {
      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function() {
      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function() {
      d3_time_prototype.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function() {
      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function() {
      d3_time_prototype.setTime.apply(this._, arguments);
    }
  };
  var d3_time_prototype = Date.prototype;
  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date), d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }
    function ceil(date) {
      step(date = local(new d3_date(date - 1)), 1);
      return date;
    }
    function offset(date, k) {
      step(date = new d3_date(+date), k);
      return date;
    }
    function range(t0, t1, dt) {
      var time = ceil(t0), times = [];
      if (dt > 1) {
        while (time < t1) {
          if (!(number(time) % dt)) times.push(new Date(+time));
          step(time, 1);
        }
      } else {
        while (time < t1) times.push(new Date(+time)), step(time, 1);
      }
      return times;
    }
    function range_utc(t0, t1, dt) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = t0;
        return range(utc, t1, dt);
      } finally {
        d3_date = Date;
      }
    }
    local.floor = local;
    local.round = round;
    local.ceil = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }
  function d3_time_interval_utc(method) {
    return function(date, k) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = date;
        return method(utc, k)._;
      } finally {
        d3_date = Date;
      }
    };
  }
  d3_time.year = d3_time_interval(function(date) {
    date = d3_time.day(date);
    date.setMonth(0, 1);
    return date;
  }, function(date, offset) {
    date.setFullYear(date.getFullYear() + offset);
  }, function(date) {
    return date.getFullYear();
  });
  d3_time.years = d3_time.year.range;
  d3_time.years.utc = d3_time.year.utc.range;
  d3_time.day = d3_time_interval(function(date) {
    var day = new d3_date(2e3, 0);
    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return day;
  }, function(date, offset) {
    date.setDate(date.getDate() + offset);
  }, function(date) {
    return date.getDate() - 1;
  });
  d3_time.days = d3_time.day.range;
  d3_time.days.utc = d3_time.day.utc.range;
  d3_time.dayOfYear = function(date) {
    var year = d3_time.year(date);
    return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
  };
  [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ].forEach(function(day, i) {
    i = 7 - i;
    var interval = d3_time[day] = d3_time_interval(function(date) {
      (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
      return date;
    }, function(date, offset) {
      date.setDate(date.getDate() + Math.floor(offset) * 7);
    }, function(date) {
      var day = d3_time.year(date).getDay();
      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
    });
    d3_time[day + "s"] = interval.range;
    d3_time[day + "s"].utc = interval.utc.range;
    d3_time[day + "OfYear"] = function(date) {
      var day = d3_time.year(date).getDay();
      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7);
    };
  });
  d3_time.week = d3_time.sunday;
  d3_time.weeks = d3_time.sunday.range;
  d3_time.weeks.utc = d3_time.sunday.utc.range;
  d3_time.weekOfYear = d3_time.sundayOfYear;
  function d3_locale_timeFormat(locale) {
    var locale_dateTime = locale.dateTime, locale_date = locale.date, locale_time = locale.time, locale_periods = locale.periods, locale_days = locale.days, locale_shortDays = locale.shortDays, locale_months = locale.months, locale_shortMonths = locale.shortMonths;
    function d3_time_format(template) {
      var n = template.length;
      function format(date) {
        var string = [], i = -1, j = 0, c, p, f;
        while (++i < n) {
          if (template.charCodeAt(i) === 37) {
            string.push(template.slice(j, i));
            if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
            if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
            string.push(c);
            j = i + 1;
          }
        }
        string.push(template.slice(j, i));
        return string.join("");
      }
      format.parse = function(string) {
        var d = {
          y: 1900,
          m: 0,
          d: 1,
          H: 0,
          M: 0,
          S: 0,
          L: 0,
          Z: null
        }, i = d3_time_parse(d, template, string, 0);
        if (i != string.length) return null;
        if ("p" in d) d.H = d.H % 12 + d.p * 12;
        var localZ = d.Z != null && d3_date !== d3_date_utc, date = new (localZ ? d3_date_utc : d3_date)();
        if ("j" in d) date.setFullYear(d.y, 0, d.j); else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
          date.setFullYear(d.y, 0, 1);
          date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
        } else date.setFullYear(d.y, d.m, d.d);
        date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
        return localZ ? date._ : date;
      };
      format.toString = function() {
        return template;
      };
      return format;
    }
    function d3_time_parse(date, template, string, j) {
      var c, p, t, i = 0, n = template.length, m = string.length;
      while (i < n) {
        if (j >= m) return -1;
        c = template.charCodeAt(i++);
        if (c === 37) {
          t = template.charAt(i++);
          p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t];
          if (!p || (j = p(date, string, j)) < 0) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }
      return j;
    }
    d3_time_format.utc = function(template) {
      var local = d3_time_format(template);
      function format(date) {
        try {
          d3_date = d3_date_utc;
          var utc = new d3_date();
          utc._ = date;
          return local(utc);
        } finally {
          d3_date = Date;
        }
      }
      format.parse = function(string) {
        try {
          d3_date = d3_date_utc;
          var date = local.parse(string);
          return date && date._;
        } finally {
          d3_date = Date;
        }
      };
      format.toString = local.toString;
      return format;
    };
    d3_time_format.multi = d3_time_format.utc.multi = d3_time_formatMulti;
    var d3_time_periodLookup = d3.map(), d3_time_dayRe = d3_time_formatRe(locale_days), d3_time_dayLookup = d3_time_formatLookup(locale_days), d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays), d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays), d3_time_monthRe = d3_time_formatRe(locale_months), d3_time_monthLookup = d3_time_formatLookup(locale_months), d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths), d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
    locale_periods.forEach(function(p, i) {
      d3_time_periodLookup.set(p.toLowerCase(), i);
    });
    var d3_time_formats = {
      a: function(d) {
        return locale_shortDays[d.getDay()];
      },
      A: function(d) {
        return locale_days[d.getDay()];
      },
      b: function(d) {
        return locale_shortMonths[d.getMonth()];
      },
      B: function(d) {
        return locale_months[d.getMonth()];
      },
      c: d3_time_format(locale_dateTime),
      d: function(d, p) {
        return d3_time_formatPad(d.getDate(), p, 2);
      },
      e: function(d, p) {
        return d3_time_formatPad(d.getDate(), p, 2);
      },
      H: function(d, p) {
        return d3_time_formatPad(d.getHours(), p, 2);
      },
      I: function(d, p) {
        return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
      },
      j: function(d, p) {
        return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3);
      },
      L: function(d, p) {
        return d3_time_formatPad(d.getMilliseconds(), p, 3);
      },
      m: function(d, p) {
        return d3_time_formatPad(d.getMonth() + 1, p, 2);
      },
      M: function(d, p) {
        return d3_time_formatPad(d.getMinutes(), p, 2);
      },
      p: function(d) {
        return locale_periods[+(d.getHours() >= 12)];
      },
      S: function(d, p) {
        return d3_time_formatPad(d.getSeconds(), p, 2);
      },
      U: function(d, p) {
        return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2);
      },
      w: function(d) {
        return d.getDay();
      },
      W: function(d, p) {
        return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2);
      },
      x: d3_time_format(locale_date),
      X: d3_time_format(locale_time),
      y: function(d, p) {
        return d3_time_formatPad(d.getFullYear() % 100, p, 2);
      },
      Y: function(d, p) {
        return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
      },
      Z: d3_time_zone,
      "%": function() {
        return "%";
      }
    };
    var d3_time_parsers = {
      a: d3_time_parseWeekdayAbbrev,
      A: d3_time_parseWeekday,
      b: d3_time_parseMonthAbbrev,
      B: d3_time_parseMonth,
      c: d3_time_parseLocaleFull,
      d: d3_time_parseDay,
      e: d3_time_parseDay,
      H: d3_time_parseHour24,
      I: d3_time_parseHour24,
      j: d3_time_parseDayOfYear,
      L: d3_time_parseMilliseconds,
      m: d3_time_parseMonthNumber,
      M: d3_time_parseMinutes,
      p: d3_time_parseAmPm,
      S: d3_time_parseSeconds,
      U: d3_time_parseWeekNumberSunday,
      w: d3_time_parseWeekdayNumber,
      W: d3_time_parseWeekNumberMonday,
      x: d3_time_parseLocaleDate,
      X: d3_time_parseLocaleTime,
      y: d3_time_parseYear,
      Y: d3_time_parseFullYear,
      Z: d3_time_parseZone,
      "%": d3_time_parseLiteralPercent
    };
    function d3_time_parseWeekdayAbbrev(date, string, i) {
      d3_time_dayAbbrevRe.lastIndex = 0;
      var n = d3_time_dayAbbrevRe.exec(string.slice(i));
      return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function d3_time_parseWeekday(date, string, i) {
      d3_time_dayRe.lastIndex = 0;
      var n = d3_time_dayRe.exec(string.slice(i));
      return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function d3_time_parseMonthAbbrev(date, string, i) {
      d3_time_monthAbbrevRe.lastIndex = 0;
      var n = d3_time_monthAbbrevRe.exec(string.slice(i));
      return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function d3_time_parseMonth(date, string, i) {
      d3_time_monthRe.lastIndex = 0;
      var n = d3_time_monthRe.exec(string.slice(i));
      return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function d3_time_parseLocaleFull(date, string, i) {
      return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
    }
    function d3_time_parseLocaleDate(date, string, i) {
      return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
    }
    function d3_time_parseLocaleTime(date, string, i) {
      return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
    }
    function d3_time_parseAmPm(date, string, i) {
      var n = d3_time_periodLookup.get(string.slice(i, i += 2).toLowerCase());
      return n == null ? -1 : (date.p = n, i);
    }
    return d3_time_format;
  }
  var d3_time_formatPads = {
    "-": "",
    _: " ",
    "0": "0"
  }, d3_time_numberRe = /^\s*\d+/, d3_time_percentRe = /^%/;
  function d3_time_formatPad(value, fill, width) {
    var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }
  function d3_time_formatRe(names) {
    return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
  }
  function d3_time_formatLookup(names) {
    var map = new d3_Map(), i = -1, n = names.length;
    while (++i < n) map.set(names[i].toLowerCase(), i);
    return map;
  }
  function d3_time_parseWeekdayNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 1));
    return n ? (date.w = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberSunday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i));
    return n ? (date.U = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberMonday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i));
    return n ? (date.W = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseFullYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 4));
    return n ? (date.y = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
  }
  function d3_time_parseZone(date, string, i) {
    return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, 
    i + 5) : -1;
  }
  function d3_time_expandYear(d) {
    return d + (d > 68 ? 1900 : 2e3);
  }
  function d3_time_parseMonthNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
  }
  function d3_time_parseDay(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.d = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseDayOfYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 3));
    return n ? (date.j = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseHour24(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.H = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMinutes(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.M = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseSeconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.S = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMilliseconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 3));
    return n ? (date.L = +n[0], i + n[0].length) : -1;
  }
  function d3_time_zone(d) {
    var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = abs(z) / 60 | 0, zm = abs(z) % 60;
    return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
  }
  function d3_time_parseLiteralPercent(date, string, i) {
    d3_time_percentRe.lastIndex = 0;
    var n = d3_time_percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }
  function d3_time_formatMulti(formats) {
    var n = formats.length, i = -1;
    while (++i < n) formats[i][0] = this(formats[i][0]);
    return function(date) {
      var i = 0, f = formats[i];
      while (!f[1](date)) f = formats[++i];
      return f[0](date);
    };
  }
  d3.locale = function(locale) {
    return {
      numberFormat: d3_locale_numberFormat(locale),
      timeFormat: d3_locale_timeFormat(locale)
    };
  };
  var d3_locale_enUS = d3.locale({
    decimal: ".",
    thousands: ",",
    grouping: [ 3 ],
    currency: [ "$", "" ],
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: [ "AM", "PM" ],
    days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
    shortDays: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
    months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    shortMonths: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
  });
  d3.format = d3_locale_enUS.numberFormat;
  d3.geo = {};
  function d3_adder() {}
  d3_adder.prototype = {
    s: 0,
    t: 0,
    add: function(y) {
      d3_adderSum(y, this.t, d3_adderTemp);
      d3_adderSum(d3_adderTemp.s, this.s, this);
      if (this.s) this.t += d3_adderTemp.t; else this.s = d3_adderTemp.t;
    },
    reset: function() {
      this.s = this.t = 0;
    },
    valueOf: function() {
      return this.s;
    }
  };
  var d3_adderTemp = new d3_adder();
  function d3_adderSum(a, b, o) {
    var x = o.s = a + b, bv = x - a, av = x - bv;
    o.t = a - av + (b - bv);
  }
  d3.geo.stream = function(object, listener) {
    if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
      d3_geo_streamObjectType[object.type](object, listener);
    } else {
      d3_geo_streamGeometry(object, listener);
    }
  };
  function d3_geo_streamGeometry(geometry, listener) {
    if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
      d3_geo_streamGeometryType[geometry.type](geometry, listener);
    }
  }
  var d3_geo_streamObjectType = {
    Feature: function(feature, listener) {
      d3_geo_streamGeometry(feature.geometry, listener);
    },
    FeatureCollection: function(object, listener) {
      var features = object.features, i = -1, n = features.length;
      while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
    }
  };
  var d3_geo_streamGeometryType = {
    Sphere: function(object, listener) {
      listener.sphere();
    },
    Point: function(object, listener) {
      object = object.coordinates;
      listener.point(object[0], object[1], object[2]);
    },
    MultiPoint: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) object = coordinates[i], listener.point(object[0], object[1], object[2]);
    },
    LineString: function(object, listener) {
      d3_geo_streamLine(object.coordinates, listener, 0);
    },
    MultiLineString: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
    },
    Polygon: function(object, listener) {
      d3_geo_streamPolygon(object.coordinates, listener);
    },
    MultiPolygon: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
    },
    GeometryCollection: function(object, listener) {
      var geometries = object.geometries, i = -1, n = geometries.length;
      while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
    }
  };
  function d3_geo_streamLine(coordinates, listener, closed) {
    var i = -1, n = coordinates.length - closed, coordinate;
    listener.lineStart();
    while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
    listener.lineEnd();
  }
  function d3_geo_streamPolygon(coordinates, listener) {
    var i = -1, n = coordinates.length;
    listener.polygonStart();
    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
    listener.polygonEnd();
  }
  d3.geo.area = function(object) {
    d3_geo_areaSum = 0;
    d3.geo.stream(object, d3_geo_area);
    return d3_geo_areaSum;
  };
  var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder();
  var d3_geo_area = {
    sphere: function() {
      d3_geo_areaSum += 4 * π;
    },
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_areaRingSum.reset();
      d3_geo_area.lineStart = d3_geo_areaRingStart;
    },
    polygonEnd: function() {
      var area = 2 * d3_geo_areaRingSum;
      d3_geo_areaSum += area < 0 ? 4 * π + area : area;
      d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
    }
  };
  function d3_geo_areaRingStart() {
    var λ00, φ00, λ0, cosφ0, sinφ0;
    d3_geo_area.point = function(λ, φ) {
      d3_geo_area.point = nextPoint;
      λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), 
      sinφ0 = Math.sin(φ);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      φ = φ * d3_radians / 2 + π / 4;
      var dλ = λ - λ0, sdλ = dλ >= 0 ? 1 : -1, adλ = sdλ * dλ, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u = cosφ0 * cosφ + k * Math.cos(adλ), v = k * sdλ * Math.sin(adλ);
      d3_geo_areaRingSum.add(Math.atan2(v, u));
      λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
    }
    d3_geo_area.lineEnd = function() {
      nextPoint(λ00, φ00);
    };
  }
  function d3_geo_cartesian(spherical) {
    var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
    return [ cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ) ];
  }
  function d3_geo_cartesianDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function d3_geo_cartesianCross(a, b) {
    return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
  }
  function d3_geo_cartesianAdd(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
  }
  function d3_geo_cartesianScale(vector, k) {
    return [ vector[0] * k, vector[1] * k, vector[2] * k ];
  }
  function d3_geo_cartesianNormalize(d) {
    var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }
  function d3_geo_spherical(cartesian) {
    return [ Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2]) ];
  }
  function d3_geo_sphericalEqual(a, b) {
    return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε;
  }
  d3.geo.bounds = function() {
    var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range;
    var bound = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        bound.point = ringPoint;
        bound.lineStart = ringStart;
        bound.lineEnd = ringEnd;
        dλSum = 0;
        d3_geo_area.polygonStart();
      },
      polygonEnd: function() {
        d3_geo_area.polygonEnd();
        bound.point = point;
        bound.lineStart = lineStart;
        bound.lineEnd = lineEnd;
        if (d3_geo_areaRingSum < 0) λ0 = -(λ1 = 180), φ0 = -(φ1 = 90); else if (dλSum > ε) φ1 = 90; else if (dλSum < -ε) φ0 = -90;
        range[0] = λ0, range[1] = λ1;
      }
    };
    function point(λ, φ) {
      ranges.push(range = [ λ0 = λ, λ1 = λ ]);
      if (φ < φ0) φ0 = φ;
      if (φ > φ1) φ1 = φ;
    }
    function linePoint(λ, φ) {
      var p = d3_geo_cartesian([ λ * d3_radians, φ * d3_radians ]);
      if (p0) {
        var normal = d3_geo_cartesianCross(p0, p), equatorial = [ normal[1], -normal[0], 0 ], inflection = d3_geo_cartesianCross(equatorial, normal);
        d3_geo_cartesianNormalize(inflection);
        inflection = d3_geo_spherical(inflection);
        var dλ = λ - λ_, s = dλ > 0 ? 1 : -1, λi = inflection[0] * d3_degrees * s, antimeridian = abs(dλ) > 180;
        if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = inflection[1] * d3_degrees;
          if (φi > φ1) φ1 = φi;
        } else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = -inflection[1] * d3_degrees;
          if (φi < φ0) φ0 = φi;
        } else {
          if (φ < φ0) φ0 = φ;
          if (φ > φ1) φ1 = φ;
        }
        if (antimeridian) {
          if (λ < λ_) {
            if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
          } else {
            if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
          }
        } else {
          if (λ1 >= λ0) {
            if (λ < λ0) λ0 = λ;
            if (λ > λ1) λ1 = λ;
          } else {
            if (λ > λ_) {
              if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
            } else {
              if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
            }
          }
        }
      } else {
        point(λ, φ);
      }
      p0 = p, λ_ = λ;
    }
    function lineStart() {
      bound.point = linePoint;
    }
    function lineEnd() {
      range[0] = λ0, range[1] = λ1;
      bound.point = point;
      p0 = null;
    }
    function ringPoint(λ, φ) {
      if (p0) {
        var dλ = λ - λ_;
        dλSum += abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ;
      } else λ__ = λ, φ__ = φ;
      d3_geo_area.point(λ, φ);
      linePoint(λ, φ);
    }
    function ringStart() {
      d3_geo_area.lineStart();
    }
    function ringEnd() {
      ringPoint(λ__, φ__);
      d3_geo_area.lineEnd();
      if (abs(dλSum) > ε) λ0 = -(λ1 = 180);
      range[0] = λ0, range[1] = λ1;
      p0 = null;
    }
    function angle(λ0, λ1) {
      return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1;
    }
    function compareRanges(a, b) {
      return a[0] - b[0];
    }
    function withinRange(x, range) {
      return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
    }
    return function(feature) {
      φ1 = λ1 = -(λ0 = φ0 = Infinity);
      ranges = [];
      d3.geo.stream(feature, bound);
      var n = ranges.length;
      if (n) {
        ranges.sort(compareRanges);
        for (var i = 1, a = ranges[0], b, merged = [ a ]; i < n; ++i) {
          b = ranges[i];
          if (withinRange(b[0], a) || withinRange(b[1], a)) {
            if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
            if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
          } else {
            merged.push(a = b);
          }
        }
        var best = -Infinity, dλ;
        for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
          b = merged[i];
          if ((dλ = angle(a[1], b[0])) > best) best = dλ, λ0 = b[0], λ1 = a[1];
        }
      }
      ranges = range = null;
      return λ0 === Infinity || φ0 === Infinity ? [ [ NaN, NaN ], [ NaN, NaN ] ] : [ [ λ0, φ0 ], [ λ1, φ1 ] ];
    };
  }();
  d3.geo.centroid = function(object) {
    d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
    d3.geo.stream(object, d3_geo_centroid);
    var x = d3_geo_centroidX2, y = d3_geo_centroidY2, z = d3_geo_centroidZ2, m = x * x + y * y + z * z;
    if (m < ε2) {
      x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
      if (d3_geo_centroidW1 < ε) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
      m = x * x + y * y + z * z;
      if (m < ε2) return [ NaN, NaN ];
    }
    return [ Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees ];
  };
  var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
  var d3_geo_centroid = {
    sphere: d3_noop,
    point: d3_geo_centroidPoint,
    lineStart: d3_geo_centroidLineStart,
    lineEnd: d3_geo_centroidLineEnd,
    polygonStart: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
    }
  };
  function d3_geo_centroidPoint(λ, φ) {
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ));
  }
  function d3_geo_centroidPointXYZ(x, y, z) {
    ++d3_geo_centroidW0;
    d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
    d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
    d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
  }
  function d3_geo_centroidLineStart() {
    var x0, y0, z0;
    d3_geo_centroid.point = function(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroid.point = nextPoint;
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }
  function d3_geo_centroidLineEnd() {
    d3_geo_centroid.point = d3_geo_centroidPoint;
  }
  function d3_geo_centroidRingStart() {
    var λ00, φ00, x0, y0, z0;
    d3_geo_centroid.point = function(λ, φ) {
      λ00 = λ, φ00 = φ;
      d3_geo_centroid.point = nextPoint;
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };
    d3_geo_centroid.lineEnd = function() {
      nextPoint(λ00, φ00);
      d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
      d3_geo_centroid.point = d3_geo_centroidPoint;
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = Math.sqrt(cx * cx + cy * cy + cz * cz), u = x0 * x + y0 * y + z0 * z, v = m && -d3_acos(u) / m, w = Math.atan2(m, u);
      d3_geo_centroidX2 += v * cx;
      d3_geo_centroidY2 += v * cy;
      d3_geo_centroidZ2 += v * cz;
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }
  function d3_geo_compose(a, b) {
    function compose(x, y) {
      return x = a(x, y), b(x[0], x[1]);
    }
    if (a.invert && b.invert) compose.invert = function(x, y) {
      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
    };
    return compose;
  }
  function d3_true() {
    return true;
  }
  function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
    var subject = [], clip = [];
    segments.forEach(function(segment) {
      if ((n = segment.length - 1) <= 0) return;
      var n, p0 = segment[0], p1 = segment[n];
      if (d3_geo_sphericalEqual(p0, p1)) {
        listener.lineStart();
        for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);
        listener.lineEnd();
        return;
      }
      var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true), b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
      a.o = b;
      subject.push(a);
      clip.push(b);
      a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
      b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
      a.o = b;
      subject.push(a);
      clip.push(b);
    });
    clip.sort(compare);
    d3_geo_clipPolygonLinkCircular(subject);
    d3_geo_clipPolygonLinkCircular(clip);
    if (!subject.length) return;
    for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) {
      clip[i].e = entry = !entry;
    }
    var start = subject[0], points, point;
    while (1) {
      var current = start, isSubject = true;
      while (current.v) if ((current = current.n) === start) return;
      points = current.z;
      listener.lineStart();
      do {
        current.v = current.o.v = true;
        if (current.e) {
          if (isSubject) {
            for (var i = 0, n = points.length; i < n; ++i) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.x, current.n.x, 1, listener);
          }
          current = current.n;
        } else {
          if (isSubject) {
            points = current.p.z;
            for (var i = points.length - 1; i >= 0; --i) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.x, current.p.x, -1, listener);
          }
          current = current.p;
        }
        current = current.o;
        points = current.z;
        isSubject = !isSubject;
      } while (!current.v);
      listener.lineEnd();
    }
  }
  function d3_geo_clipPolygonLinkCircular(array) {
    if (!(n = array.length)) return;
    var n, i = 0, a = array[0], b;
    while (++i < n) {
      a.n = b = array[i];
      b.p = a;
      a = b;
    }
    a.n = b = array[0];
    b.p = a;
  }
  function d3_geo_clipPolygonIntersection(point, points, other, entry) {
    this.x = point;
    this.z = points;
    this.o = other;
    this.e = entry;
    this.v = false;
    this.n = this.p = null;
  }
  function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
    return function(rotate, listener) {
      var line = clipLine(listener), rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]);
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          clip.point = pointRing;
          clip.lineStart = ringStart;
          clip.lineEnd = ringEnd;
          segments = [];
          polygon = [];
        },
        polygonEnd: function() {
          clip.point = point;
          clip.lineStart = lineStart;
          clip.lineEnd = lineEnd;
          segments = d3.merge(segments);
          var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
          if (segments.length) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener);
          } else if (clipStartInside) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
          }
          if (polygonStarted) listener.polygonEnd(), polygonStarted = false;
          segments = polygon = null;
        },
        sphere: function() {
          listener.polygonStart();
          listener.lineStart();
          interpolate(null, null, 1, listener);
          listener.lineEnd();
          listener.polygonEnd();
        }
      };
      function point(λ, φ) {
        var point = rotate(λ, φ);
        if (pointVisible(λ = point[0], φ = point[1])) listener.point(λ, φ);
      }
      function pointLine(λ, φ) {
        var point = rotate(λ, φ);
        line.point(point[0], point[1]);
      }
      function lineStart() {
        clip.point = pointLine;
        line.lineStart();
      }
      function lineEnd() {
        clip.point = point;
        line.lineEnd();
      }
      var segments;
      var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), polygonStarted = false, polygon, ring;
      function pointRing(λ, φ) {
        ring.push([ λ, φ ]);
        var point = rotate(λ, φ);
        ringListener.point(point[0], point[1]);
      }
      function ringStart() {
        ringListener.lineStart();
        ring = [];
      }
      function ringEnd() {
        pointRing(ring[0][0], ring[0][1]);
        ringListener.lineEnd();
        var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
        ring.pop();
        polygon.push(ring);
        ring = null;
        if (!n) return;
        if (clean & 1) {
          segment = ringSegments[0];
          var n = segment.length - 1, i = -1, point;
          if (n > 0) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            listener.lineStart();
            while (++i < n) listener.point((point = segment[i])[0], point[1]);
            listener.lineEnd();
          }
          return;
        }
        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
        segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
      }
      return clip;
    };
  }
  function d3_geo_clipSegmentLength1(segment) {
    return segment.length > 1;
  }
  function d3_geo_clipBufferListener() {
    var lines = [], line;
    return {
      lineStart: function() {
        lines.push(line = []);
      },
      point: function(λ, φ) {
        line.push([ λ, φ ]);
      },
      lineEnd: d3_noop,
      buffer: function() {
        var buffer = lines;
        lines = [];
        line = null;
        return buffer;
      },
      rejoin: function() {
        if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
      }
    };
  }
  function d3_geo_clipSort(a, b) {
    return ((a = a.x)[0] < 0 ? a[1] - halfπ - ε : halfπ - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfπ - ε : halfπ - b[1]);
  }
  var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [ -π, -π / 2 ]);
  function d3_geo_clipAntimeridianLine(listener) {
    var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
    return {
      lineStart: function() {
        listener.lineStart();
        clean = 1;
      },
      point: function(λ1, φ1) {
        var sλ1 = λ1 > 0 ? π : -π, dλ = abs(λ1 - λ0);
        if (abs(dλ - π) < ε) {
          listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? halfπ : -halfπ);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          listener.point(λ1, φ0);
          clean = 0;
        } else if (sλ0 !== sλ1 && dλ >= π) {
          if (abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
          if (abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
          φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          clean = 0;
        }
        listener.point(λ0 = λ1, φ0 = φ1);
        sλ0 = sλ1;
      },
      lineEnd: function() {
        listener.lineEnd();
        λ0 = φ0 = NaN;
      },
      clean: function() {
        return 2 - clean;
      }
    };
  }
  function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
    var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
    return abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
  }
  function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
    var φ;
    if (from == null) {
      φ = direction * halfπ;
      listener.point(-π, φ);
      listener.point(0, φ);
      listener.point(π, φ);
      listener.point(π, 0);
      listener.point(π, -φ);
      listener.point(0, -φ);
      listener.point(-π, -φ);
      listener.point(-π, 0);
      listener.point(-π, φ);
    } else if (abs(from[0] - to[0]) > ε) {
      var s = from[0] < to[0] ? π : -π;
      φ = direction * s / 2;
      listener.point(-s, φ);
      listener.point(0, φ);
      listener.point(s, φ);
    } else {
      listener.point(to[0], to[1]);
    }
  }
  function d3_geo_pointInPolygon(point, polygon) {
    var meridian = point[0], parallel = point[1], meridianNormal = [ Math.sin(meridian), -Math.cos(meridian), 0 ], polarAngle = 0, winding = 0;
    d3_geo_areaRingSum.reset();
    for (var i = 0, n = polygon.length; i < n; ++i) {
      var ring = polygon[i], m = ring.length;
      if (!m) continue;
      var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), j = 1;
      while (true) {
        if (j === m) j = 0;
        point = ring[j];
        var λ = point[0], φ = point[1] / 2 + π / 4, sinφ = Math.sin(φ), cosφ = Math.cos(φ), dλ = λ - λ0, sdλ = dλ >= 0 ? 1 : -1, adλ = sdλ * dλ, antimeridian = adλ > π, k = sinφ0 * sinφ;
        d3_geo_areaRingSum.add(Math.atan2(k * sdλ * Math.sin(adλ), cosφ0 * cosφ + k * Math.cos(adλ)));
        polarAngle += antimeridian ? dλ + sdλ * τ : dλ;
        if (antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
          var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
          d3_geo_cartesianNormalize(arc);
          var intersection = d3_geo_cartesianCross(meridianNormal, arc);
          d3_geo_cartesianNormalize(intersection);
          var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
          if (parallel > φarc || parallel === φarc && (arc[0] || arc[1])) {
            winding += antimeridian ^ dλ >= 0 ? 1 : -1;
          }
        }
        if (!j++) break;
        λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ, point0 = point;
      }
    }
    return (polarAngle < -ε || polarAngle < ε && d3_geo_areaRingSum < -ε) ^ winding & 1;
  }
  function d3_geo_clipCircle(radius) {
    var cr = Math.cos(radius), smallRadius = cr > 0, notHemisphere = abs(cr) > ε, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
    return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [ 0, -radius ] : [ -π, radius - π ]);
    function visible(λ, φ) {
      return Math.cos(λ) * Math.cos(φ) > cr;
    }
    function clipLine(listener) {
      var point0, c0, v0, v00, clean;
      return {
        lineStart: function() {
          v00 = v0 = false;
          clean = 1;
        },
        point: function(λ, φ) {
          var point1 = [ λ, φ ], point2, v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
          if (!point0 && (v00 = v0 = v)) listener.lineStart();
          if (v !== v0) {
            point2 = intersect(point0, point1);
            if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
              point1[0] += ε;
              point1[1] += ε;
              v = visible(point1[0], point1[1]);
            }
          }
          if (v !== v0) {
            clean = 0;
            if (v) {
              listener.lineStart();
              point2 = intersect(point1, point0);
              listener.point(point2[0], point2[1]);
            } else {
              point2 = intersect(point0, point1);
              listener.point(point2[0], point2[1]);
              listener.lineEnd();
            }
            point0 = point2;
          } else if (notHemisphere && point0 && smallRadius ^ v) {
            var t;
            if (!(c & c0) && (t = intersect(point1, point0, true))) {
              clean = 0;
              if (smallRadius) {
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
              } else {
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
              }
            }
          }
          if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
            listener.point(point1[0], point1[1]);
          }
          point0 = point1, v0 = v, c0 = c;
        },
        lineEnd: function() {
          if (v0) listener.lineEnd();
          point0 = null;
        },
        clean: function() {
          return clean | (v00 && v0) << 1;
        }
      };
    }
    function intersect(a, b, two) {
      var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
      var n1 = [ 1, 0, 0 ], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
      if (!determinant) return !two && a;
      var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
      d3_geo_cartesianAdd(A, B);
      var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
      if (t2 < 0) return;
      var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
      d3_geo_cartesianAdd(q, A);
      q = d3_geo_spherical(q);
      if (!two) return q;
      var λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1], z;
      if (λ1 < λ0) z = λ0, λ0 = λ1, λ1 = z;
      var δλ = λ1 - λ0, polar = abs(δλ - π) < ε, meridian = polar || δλ < ε;
      if (!polar && φ1 < φ0) z = φ0, φ0 = φ1, φ1 = z;
      if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
        var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
        d3_geo_cartesianAdd(q1, A);
        return [ q, d3_geo_spherical(q1) ];
      }
    }
    function code(λ, φ) {
      var r = smallRadius ? radius : π - radius, code = 0;
      if (λ < -r) code |= 1; else if (λ > r) code |= 2;
      if (φ < -r) code |= 4; else if (φ > r) code |= 8;
      return code;
    }
  }
  function d3_geom_clipLine(x0, y0, x1, y1) {
    return function(line) {
      var a = line.a, b = line.b, ax = a.x, ay = a.y, bx = b.x, by = b.y, t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
      r = x0 - ax;
      if (!dx && r > 0) return;
      r /= dx;
      if (dx < 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      } else if (dx > 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      }
      r = x1 - ax;
      if (!dx && r < 0) return;
      r /= dx;
      if (dx < 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      } else if (dx > 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      }
      r = y0 - ay;
      if (!dy && r > 0) return;
      r /= dy;
      if (dy < 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      } else if (dy > 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      }
      r = y1 - ay;
      if (!dy && r < 0) return;
      r /= dy;
      if (dy < 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      } else if (dy > 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      }
      if (t0 > 0) line.a = {
        x: ax + t0 * dx,
        y: ay + t0 * dy
      };
      if (t1 < 1) line.b = {
        x: ax + t1 * dx,
        y: ay + t1 * dy
      };
      return line;
    };
  }
  var d3_geo_clipExtentMAX = 1e9;
  d3.geo.clipExtent = function() {
    var x0, y0, x1, y1, stream, clip, clipExtent = {
      stream: function(output) {
        if (stream) stream.valid = false;
        stream = clip(output);
        stream.valid = true;
        return stream;
      },
      extent: function(_) {
        if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
        clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
        if (stream) stream.valid = false, stream = null;
        return clipExtent;
      }
    };
    return clipExtent.extent([ [ 0, 0 ], [ 960, 500 ] ]);
  };
  function d3_geo_clipExtent(x0, y0, x1, y1) {
    return function(listener) {
      var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), clipLine = d3_geom_clipLine(x0, y0, x1, y1), segments, polygon, ring;
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          listener = bufferListener;
          segments = [];
          polygon = [];
          clean = true;
        },
        polygonEnd: function() {
          listener = listener_;
          segments = d3.merge(segments);
          var clipStartInside = insidePolygon([ x0, y1 ]), inside = clean && clipStartInside, visible = segments.length;
          if (inside || visible) {
            listener.polygonStart();
            if (inside) {
              listener.lineStart();
              interpolate(null, null, 1, listener);
              listener.lineEnd();
            }
            if (visible) {
              d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener);
            }
            listener.polygonEnd();
          }
          segments = polygon = ring = null;
        }
      };
      function insidePolygon(p) {
        var wn = 0, n = polygon.length, y = p[1];
        for (var i = 0; i < n; ++i) {
          for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
            b = v[j];
            if (a[1] <= y) {
              if (b[1] > y && d3_cross2d(a, b, p) > 0) ++wn;
            } else {
              if (b[1] <= y && d3_cross2d(a, b, p) < 0) --wn;
            }
            a = b;
          }
        }
        return wn !== 0;
      }
      function interpolate(from, to, direction, listener) {
        var a = 0, a1 = 0;
        if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
          do {
            listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
          } while ((a = (a + direction + 4) % 4) !== a1);
        } else {
          listener.point(to[0], to[1]);
        }
      }
      function pointVisible(x, y) {
        return x0 <= x && x <= x1 && y0 <= y && y <= y1;
      }
      function point(x, y) {
        if (pointVisible(x, y)) listener.point(x, y);
      }
      var x__, y__, v__, x_, y_, v_, first, clean;
      function lineStart() {
        clip.point = linePoint;
        if (polygon) polygon.push(ring = []);
        first = true;
        v_ = false;
        x_ = y_ = NaN;
      }
      function lineEnd() {
        if (segments) {
          linePoint(x__, y__);
          if (v__ && v_) bufferListener.rejoin();
          segments.push(bufferListener.buffer());
        }
        clip.point = point;
        if (v_) listener.lineEnd();
      }
      function linePoint(x, y) {
        x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
        y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
        var v = pointVisible(x, y);
        if (polygon) ring.push([ x, y ]);
        if (first) {
          x__ = x, y__ = y, v__ = v;
          first = false;
          if (v) {
            listener.lineStart();
            listener.point(x, y);
          }
        } else {
          if (v && v_) listener.point(x, y); else {
            var l = {
              a: {
                x: x_,
                y: y_
              },
              b: {
                x: x,
                y: y
              }
            };
            if (clipLine(l)) {
              if (!v_) {
                listener.lineStart();
                listener.point(l.a.x, l.a.y);
              }
              listener.point(l.b.x, l.b.y);
              if (!v) listener.lineEnd();
              clean = false;
            } else if (v) {
              listener.lineStart();
              listener.point(x, y);
              clean = false;
            }
          }
        }
        x_ = x, y_ = y, v_ = v;
      }
      return clip;
    };
    function corner(p, direction) {
      return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
    }
    function compare(a, b) {
      return comparePoints(a.x, b.x);
    }
    function comparePoints(a, b) {
      var ca = corner(a, 1), cb = corner(b, 1);
      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
    }
  }
  function d3_geo_conic(projectAt) {
    var φ0 = 0, φ1 = π / 3, m = d3_geo_projectionMutator(projectAt), p = m(φ0, φ1);
    p.parallels = function(_) {
      if (!arguments.length) return [ φ0 / π * 180, φ1 / π * 180 ];
      return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
    };
    return p;
  }
  function d3_geo_conicEqualArea(φ0, φ1) {
    var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
    function forward(λ, φ) {
      var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
      return [ ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = ρ0 - y;
      return [ Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
    };
    return forward;
  }
  (d3.geo.conicEqualArea = function() {
    return d3_geo_conic(d3_geo_conicEqualArea);
  }).raw = d3_geo_conicEqualArea;
  d3.geo.albers = function() {
    return d3.geo.conicEqualArea().rotate([ 96, 0 ]).center([ -.6, 38.7 ]).parallels([ 29.5, 45.5 ]).scale(1070);
  };
  d3.geo.albersUsa = function() {
    var lower48 = d3.geo.albers();
    var alaska = d3.geo.conicEqualArea().rotate([ 154, 0 ]).center([ -2, 58.5 ]).parallels([ 55, 65 ]);
    var hawaii = d3.geo.conicEqualArea().rotate([ 157, 0 ]).center([ -3, 19.9 ]).parallels([ 8, 18 ]);
    var point, pointStream = {
      point: function(x, y) {
        point = [ x, y ];
      }
    }, lower48Point, alaskaPoint, hawaiiPoint;
    function albersUsa(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      point = null;
      (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
      return point;
    }
    albersUsa.invert = function(coordinates) {
      var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
      return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates);
    };
    albersUsa.stream = function(stream) {
      var lower48Stream = lower48.stream(stream), alaskaStream = alaska.stream(stream), hawaiiStream = hawaii.stream(stream);
      return {
        point: function(x, y) {
          lower48Stream.point(x, y);
          alaskaStream.point(x, y);
          hawaiiStream.point(x, y);
        },
        sphere: function() {
          lower48Stream.sphere();
          alaskaStream.sphere();
          hawaiiStream.sphere();
        },
        lineStart: function() {
          lower48Stream.lineStart();
          alaskaStream.lineStart();
          hawaiiStream.lineStart();
        },
        lineEnd: function() {
          lower48Stream.lineEnd();
          alaskaStream.lineEnd();
          hawaiiStream.lineEnd();
        },
        polygonStart: function() {
          lower48Stream.polygonStart();
          alaskaStream.polygonStart();
          hawaiiStream.polygonStart();
        },
        polygonEnd: function() {
          lower48Stream.polygonEnd();
          alaskaStream.polygonEnd();
          hawaiiStream.polygonEnd();
        }
      };
    };
    albersUsa.precision = function(_) {
      if (!arguments.length) return lower48.precision();
      lower48.precision(_);
      alaska.precision(_);
      hawaii.precision(_);
      return albersUsa;
    };
    albersUsa.scale = function(_) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(_);
      alaska.scale(_ * .35);
      hawaii.scale(_);
      return albersUsa.translate(lower48.translate());
    };
    albersUsa.translate = function(_) {
      if (!arguments.length) return lower48.translate();
      var k = lower48.scale(), x = +_[0], y = +_[1];
      lower48Point = lower48.translate(_).clipExtent([ [ x - .455 * k, y - .238 * k ], [ x + .455 * k, y + .238 * k ] ]).stream(pointStream).point;
      alaskaPoint = alaska.translate([ x - .307 * k, y + .201 * k ]).clipExtent([ [ x - .425 * k + ε, y + .12 * k + ε ], [ x - .214 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
      hawaiiPoint = hawaii.translate([ x - .205 * k, y + .212 * k ]).clipExtent([ [ x - .214 * k + ε, y + .166 * k + ε ], [ x - .115 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
      return albersUsa;
    };
    return albersUsa.scale(1070);
  };
  var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_pathAreaPolygon = 0;
      d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
      d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2);
    }
  };
  function d3_geo_pathAreaRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathArea.point = function(x, y) {
      d3_geo_pathArea.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };
    function nextPoint(x, y) {
      d3_geo_pathAreaPolygon += y0 * x - x0 * y;
      x0 = x, y0 = y;
    }
    d3_geo_pathArea.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
  var d3_geo_pathBounds = {
    point: d3_geo_pathBoundsPoint,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_pathBoundsPoint(x, y) {
    if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
    if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
    if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
    if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y;
  }
  function d3_geo_pathBuffer() {
    var pointCircle = d3_geo_pathBufferCircle(4.5), buffer = [];
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointCircle = d3_geo_pathBufferCircle(_);
        return stream;
      },
      result: function() {
        if (buffer.length) {
          var result = buffer.join("");
          buffer = [];
          return result;
        }
      }
    };
    function point(x, y) {
      buffer.push("M", x, ",", y, pointCircle);
    }
    function pointLineStart(x, y) {
      buffer.push("M", x, ",", y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      buffer.push("L", x, ",", y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      buffer.push("Z");
    }
    return stream;
  }
  function d3_geo_pathBufferCircle(radius) {
    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
  }
  var d3_geo_pathCentroid = {
    point: d3_geo_pathCentroidPoint,
    lineStart: d3_geo_pathCentroidLineStart,
    lineEnd: d3_geo_pathCentroidLineEnd,
    polygonStart: function() {
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
      d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
    }
  };
  function d3_geo_pathCentroidPoint(x, y) {
    d3_geo_centroidX0 += x;
    d3_geo_centroidY0 += y;
    ++d3_geo_centroidZ0;
  }
  function d3_geo_pathCentroidLineStart() {
    var x0, y0;
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
  }
  function d3_geo_pathCentroidLineEnd() {
    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
  }
  function d3_geo_pathCentroidRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      z = y0 * x - x0 * y;
      d3_geo_centroidX2 += z * (x0 + x);
      d3_geo_centroidY2 += z * (y0 + y);
      d3_geo_centroidZ2 += z * 3;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
    d3_geo_pathCentroid.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  function d3_geo_pathContext(context) {
    var pointRadius = 4.5;
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointRadius = _;
        return stream;
      },
      result: d3_noop
    };
    function point(x, y) {
      context.moveTo(x + pointRadius, y);
      context.arc(x, y, pointRadius, 0, τ);
    }
    function pointLineStart(x, y) {
      context.moveTo(x, y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      context.lineTo(x, y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      context.closePath();
    }
    return stream;
  }
  function d3_geo_resample(project) {
    var δ2 = .5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
    function resample(stream) {
      return (maxDepth ? resampleRecursive : resampleNone)(stream);
    }
    function resampleNone(stream) {
      return d3_geo_transformPoint(stream, function(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      });
    }
    function resampleRecursive(stream) {
      var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
      var resample = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          stream.polygonStart();
          resample.lineStart = ringStart;
        },
        polygonEnd: function() {
          stream.polygonEnd();
          resample.lineStart = lineStart;
        }
      };
      function point(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      }
      function lineStart() {
        x0 = NaN;
        resample.point = linePoint;
        stream.lineStart();
      }
      function linePoint(λ, φ) {
        var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
        stream.point(x0, y0);
      }
      function lineEnd() {
        resample.point = point;
        stream.lineEnd();
      }
      function ringStart() {
        lineStart();
        resample.point = ringPoint;
        resample.lineEnd = ringEnd;
      }
      function ringPoint(λ, φ) {
        linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
        resample.point = linePoint;
      }
      function ringEnd() {
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
        resample.lineEnd = lineEnd;
        lineEnd();
      }
      return resample;
    }
    function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
      var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
      if (d2 > 4 * δ2 && depth--) {
        var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
        if (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
          stream.point(x2, y2);
          resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
        }
      }
    }
    resample.precision = function(_) {
      if (!arguments.length) return Math.sqrt(δ2);
      maxDepth = (δ2 = _ * _) > 0 && 16;
      return resample;
    };
    return resample;
  }
  d3.geo.path = function() {
    var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
    function path(object) {
      if (object) {
        if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
        if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
        d3.geo.stream(object, cacheStream);
      }
      return contextStream.result();
    }
    path.area = function(object) {
      d3_geo_pathAreaSum = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathArea));
      return d3_geo_pathAreaSum;
    };
    path.centroid = function(object) {
      d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
      return d3_geo_centroidZ2 ? [ d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2 ] : d3_geo_centroidZ1 ? [ d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1 ] : d3_geo_centroidZ0 ? [ d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0 ] : [ NaN, NaN ];
    };
    path.bounds = function(object) {
      d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
      d3.geo.stream(object, projectStream(d3_geo_pathBounds));
      return [ [ d3_geo_pathBoundsX0, d3_geo_pathBoundsY0 ], [ d3_geo_pathBoundsX1, d3_geo_pathBoundsY1 ] ];
    };
    path.projection = function(_) {
      if (!arguments.length) return projection;
      projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
      return reset();
    };
    path.context = function(_) {
      if (!arguments.length) return context;
      contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
      if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
      return reset();
    };
    path.pointRadius = function(_) {
      if (!arguments.length) return pointRadius;
      pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
      return path;
    };
    function reset() {
      cacheStream = null;
      return path;
    }
    return path.projection(d3.geo.albersUsa()).context(null);
  };
  function d3_geo_pathProjectStream(project) {
    var resample = d3_geo_resample(function(x, y) {
      return project([ x * d3_degrees, y * d3_degrees ]);
    });
    return function(stream) {
      return d3_geo_projectionRadians(resample(stream));
    };
  }
  d3.geo.transform = function(methods) {
    return {
      stream: function(stream) {
        var transform = new d3_geo_transform(stream);
        for (var k in methods) transform[k] = methods[k];
        return transform;
      }
    };
  };
  function d3_geo_transform(stream) {
    this.stream = stream;
  }
  d3_geo_transform.prototype = {
    point: function(x, y) {
      this.stream.point(x, y);
    },
    sphere: function() {
      this.stream.sphere();
    },
    lineStart: function() {
      this.stream.lineStart();
    },
    lineEnd: function() {
      this.stream.lineEnd();
    },
    polygonStart: function() {
      this.stream.polygonStart();
    },
    polygonEnd: function() {
      this.stream.polygonEnd();
    }
  };
  function d3_geo_transformPoint(stream, point) {
    return {
      point: point,
      sphere: function() {
        stream.sphere();
      },
      lineStart: function() {
        stream.lineStart();
      },
      lineEnd: function() {
        stream.lineEnd();
      },
      polygonStart: function() {
        stream.polygonStart();
      },
      polygonEnd: function() {
        stream.polygonEnd();
      }
    };
  }
  d3.geo.projection = d3_geo_projection;
  d3.geo.projectionMutator = d3_geo_projectionMutator;
  function d3_geo_projection(project) {
    return d3_geo_projectionMutator(function() {
      return project;
    })();
  }
  function d3_geo_projectionMutator(projectAt) {
    var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
      x = project(x, y);
      return [ x[0] * k + δx, δy - x[1] * k ];
    }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null, stream;
    function projection(point) {
      point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
      return [ point[0] * k + δx, δy - point[1] * k ];
    }
    function invert(point) {
      point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
      return point && [ point[0] * d3_degrees, point[1] * d3_degrees ];
    }
    projection.stream = function(output) {
      if (stream) stream.valid = false;
      stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output))));
      stream.valid = true;
      return stream;
    };
    projection.clipAngle = function(_) {
      if (!arguments.length) return clipAngle;
      preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
      return invalidate();
    };
    projection.clipExtent = function(_) {
      if (!arguments.length) return clipExtent;
      clipExtent = _;
      postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
      return invalidate();
    };
    projection.scale = function(_) {
      if (!arguments.length) return k;
      k = +_;
      return reset();
    };
    projection.translate = function(_) {
      if (!arguments.length) return [ x, y ];
      x = +_[0];
      y = +_[1];
      return reset();
    };
    projection.center = function(_) {
      if (!arguments.length) return [ λ * d3_degrees, φ * d3_degrees ];
      λ = _[0] % 360 * d3_radians;
      φ = _[1] % 360 * d3_radians;
      return reset();
    };
    projection.rotate = function(_) {
      if (!arguments.length) return [ δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees ];
      δλ = _[0] % 360 * d3_radians;
      δφ = _[1] % 360 * d3_radians;
      δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
      return reset();
    };
    d3.rebind(projection, projectResample, "precision");
    function reset() {
      projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
      var center = project(λ, φ);
      δx = x - center[0] * k;
      δy = y + center[1] * k;
      return invalidate();
    }
    function invalidate() {
      if (stream) stream.valid = false, stream = null;
      return projection;
    }
    return function() {
      project = projectAt.apply(this, arguments);
      projection.invert = project.invert && invert;
      return reset();
    };
  }
  function d3_geo_projectionRadians(stream) {
    return d3_geo_transformPoint(stream, function(x, y) {
      stream.point(x * d3_radians, y * d3_radians);
    });
  }
  function d3_geo_equirectangular(λ, φ) {
    return [ λ, φ ];
  }
  (d3.geo.equirectangular = function() {
    return d3_geo_projection(d3_geo_equirectangular);
  }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
  d3.geo.rotation = function(rotate) {
    rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
    function forward(coordinates) {
      coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    }
    forward.invert = function(coordinates) {
      coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    };
    return forward;
  };
  function d3_geo_identityRotation(λ, φ) {
    return [ λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ ];
  }
  d3_geo_identityRotation.invert = d3_geo_equirectangular;
  function d3_geo_rotation(δλ, δφ, δγ) {
    return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_identityRotation;
  }
  function d3_geo_forwardRotationλ(δλ) {
    return function(λ, φ) {
      return λ += δλ, [ λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ ];
    };
  }
  function d3_geo_rotationλ(δλ) {
    var rotation = d3_geo_forwardRotationλ(δλ);
    rotation.invert = d3_geo_forwardRotationλ(-δλ);
    return rotation;
  }
  function d3_geo_rotationφγ(δφ, δγ) {
    var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
    function rotation(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
      return [ Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ) ];
    }
    rotation.invert = function(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
      return [ Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), d3_asin(k * cosδφ - x * sinδφ) ];
    };
    return rotation;
  }
  d3.geo.circle = function() {
    var origin = [ 0, 0 ], angle, precision = 6, interpolate;
    function circle() {
      var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
      interpolate(null, null, 1, {
        point: function(x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= d3_degrees, x[1] *= d3_degrees;
        }
      });
      return {
        type: "Polygon",
        coordinates: [ ring ]
      };
    }
    circle.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return circle;
    };
    circle.angle = function(x) {
      if (!arguments.length) return angle;
      interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
      return circle;
    };
    circle.precision = function(_) {
      if (!arguments.length) return precision;
      interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
      return circle;
    };
    return circle.angle(90);
  };
  function d3_geo_circleInterpolate(radius, precision) {
    var cr = Math.cos(radius), sr = Math.sin(radius);
    return function(from, to, direction, listener) {
      var step = direction * precision;
      if (from != null) {
        from = d3_geo_circleAngle(cr, from);
        to = d3_geo_circleAngle(cr, to);
        if (direction > 0 ? from < to : from > to) from += direction * τ;
      } else {
        from = radius + direction * τ;
        to = radius - .5 * step;
      }
      for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) {
        listener.point((point = d3_geo_spherical([ cr, -sr * Math.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
      }
    };
  }
  function d3_geo_circleAngle(cr, point) {
    var a = d3_geo_cartesian(point);
    a[0] -= cr;
    d3_geo_cartesianNormalize(a);
    var angle = d3_acos(-a[1]);
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
  }
  d3.geo.distance = function(a, b) {
    var Δλ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ), sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1), t;
    return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
  };
  d3.geo.graticule = function() {
    var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
    function graticule() {
      return {
        type: "MultiLineString",
        coordinates: lines()
      };
    }
    function lines() {
      return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
        return abs(x % DX) > ε;
      }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
        return abs(y % DY) > ε;
      }).map(y));
    }
    graticule.lines = function() {
      return lines().map(function(coordinates) {
        return {
          type: "LineString",
          coordinates: coordinates
        };
      });
    };
    graticule.outline = function() {
      return {
        type: "Polygon",
        coordinates: [ X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1)) ]
      };
    };
    graticule.extent = function(_) {
      if (!arguments.length) return graticule.minorExtent();
      return graticule.majorExtent(_).minorExtent(_);
    };
    graticule.majorExtent = function(_) {
      if (!arguments.length) return [ [ X0, Y0 ], [ X1, Y1 ] ];
      X0 = +_[0][0], X1 = +_[1][0];
      Y0 = +_[0][1], Y1 = +_[1][1];
      if (X0 > X1) _ = X0, X0 = X1, X1 = _;
      if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
      return graticule.precision(precision);
    };
    graticule.minorExtent = function(_) {
      if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
      x0 = +_[0][0], x1 = +_[1][0];
      y0 = +_[0][1], y1 = +_[1][1];
      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
      return graticule.precision(precision);
    };
    graticule.step = function(_) {
      if (!arguments.length) return graticule.minorStep();
      return graticule.majorStep(_).minorStep(_);
    };
    graticule.majorStep = function(_) {
      if (!arguments.length) return [ DX, DY ];
      DX = +_[0], DY = +_[1];
      return graticule;
    };
    graticule.minorStep = function(_) {
      if (!arguments.length) return [ dx, dy ];
      dx = +_[0], dy = +_[1];
      return graticule;
    };
    graticule.precision = function(_) {
      if (!arguments.length) return precision;
      precision = +_;
      x = d3_geo_graticuleX(y0, y1, 90);
      y = d3_geo_graticuleY(x0, x1, precision);
      X = d3_geo_graticuleX(Y0, Y1, 90);
      Y = d3_geo_graticuleY(X0, X1, precision);
      return graticule;
    };
    return graticule.majorExtent([ [ -180, -90 + ε ], [ 180, 90 - ε ] ]).minorExtent([ [ -180, -80 - ε ], [ 180, 80 + ε ] ]);
  };
  function d3_geo_graticuleX(y0, y1, dy) {
    var y = d3.range(y0, y1 - ε, dy).concat(y1);
    return function(x) {
      return y.map(function(y) {
        return [ x, y ];
      });
    };
  }
  function d3_geo_graticuleY(x0, x1, dx) {
    var x = d3.range(x0, x1 - ε, dx).concat(x1);
    return function(y) {
      return x.map(function(x) {
        return [ x, y ];
      });
    };
  }
  function d3_source(d) {
    return d.source;
  }
  function d3_target(d) {
    return d.target;
  }
  d3.geo.greatArc = function() {
    var source = d3_source, source_, target = d3_target, target_;
    function greatArc() {
      return {
        type: "LineString",
        coordinates: [ source_ || source.apply(this, arguments), target_ || target.apply(this, arguments) ]
      };
    }
    greatArc.distance = function() {
      return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
    };
    greatArc.source = function(_) {
      if (!arguments.length) return source;
      source = _, source_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.target = function(_) {
      if (!arguments.length) return target;
      target = _, target_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.precision = function() {
      return arguments.length ? greatArc : 0;
    };
    return greatArc;
  };
  d3.geo.interpolate = function(source, target) {
    return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
  };
  function d3_geo_interpolate(x0, y0, x1, y1) {
    var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
    var interpolate = d ? function(t) {
      var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
      return [ Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees ];
    } : function() {
      return [ x0 * d3_degrees, y0 * d3_degrees ];
    };
    interpolate.distance = d;
    return interpolate;
  }
  d3.geo.length = function(object) {
    d3_geo_lengthSum = 0;
    d3.geo.stream(object, d3_geo_length);
    return d3_geo_lengthSum;
  };
  var d3_geo_lengthSum;
  var d3_geo_length = {
    sphere: d3_noop,
    point: d3_noop,
    lineStart: d3_geo_lengthLineStart,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_lengthLineStart() {
    var λ0, sinφ0, cosφ0;
    d3_geo_length.point = function(λ, φ) {
      λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
      d3_geo_length.point = nextPoint;
    };
    d3_geo_length.lineEnd = function() {
      d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
    };
    function nextPoint(λ, φ) {
      var sinφ = Math.sin(φ *= d3_radians), cosφ = Math.cos(φ), t = abs((λ *= d3_radians) - λ0), cosΔλ = Math.cos(t);
      d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
      λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
    }
  }
  function d3_geo_azimuthal(scale, angle) {
    function azimuthal(λ, φ) {
      var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
      return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
    }
    azimuthal.invert = function(x, y) {
      var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
      return [ Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ) ];
    };
    return azimuthal;
  }
  var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
    return Math.sqrt(2 / (1 + cosλcosφ));
  }, function(ρ) {
    return 2 * Math.asin(ρ / 2);
  });
  (d3.geo.azimuthalEqualArea = function() {
    return d3_geo_projection(d3_geo_azimuthalEqualArea);
  }).raw = d3_geo_azimuthalEqualArea;
  var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
    var c = Math.acos(cosλcosφ);
    return c && c / Math.sin(c);
  }, d3_identity);
  (d3.geo.azimuthalEquidistant = function() {
    return d3_geo_projection(d3_geo_azimuthalEquidistant);
  }).raw = d3_geo_azimuthalEquidistant;
  function d3_geo_conicConformal(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), t = function(φ) {
      return Math.tan(π / 4 + φ / 2);
    }, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
    if (!n) return d3_geo_mercator;
    function forward(λ, φ) {
      if (F > 0) {
        if (φ < -halfπ + ε) φ = -halfπ + ε;
      } else {
        if (φ > halfπ - ε) φ = halfπ - ε;
      }
      var ρ = F / Math.pow(t(φ), n);
      return [ ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = F - y, ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
      return [ Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - halfπ ];
    };
    return forward;
  }
  (d3.geo.conicConformal = function() {
    return d3_geo_conic(d3_geo_conicConformal);
  }).raw = d3_geo_conicConformal;
  function d3_geo_conicEquidistant(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0), G = cosφ0 / n + φ0;
    if (abs(n) < ε) return d3_geo_equirectangular;
    function forward(λ, φ) {
      var ρ = G - φ;
      return [ ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = G - y;
      return [ Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y) ];
    };
    return forward;
  }
  (d3.geo.conicEquidistant = function() {
    return d3_geo_conic(d3_geo_conicEquidistant);
  }).raw = d3_geo_conicEquidistant;
  var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / cosλcosφ;
  }, Math.atan);
  (d3.geo.gnomonic = function() {
    return d3_geo_projection(d3_geo_gnomonic);
  }).raw = d3_geo_gnomonic;
  function d3_geo_mercator(λ, φ) {
    return [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ];
  }
  d3_geo_mercator.invert = function(x, y) {
    return [ x, 2 * Math.atan(Math.exp(y)) - halfπ ];
  };
  function d3_geo_mercatorProjection(project) {
    var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
    m.scale = function() {
      var v = scale.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.translate = function() {
      var v = translate.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.clipExtent = function(_) {
      var v = clipExtent.apply(m, arguments);
      if (v === m) {
        if (clipAuto = _ == null) {
          var k = π * scale(), t = translate();
          clipExtent([ [ t[0] - k, t[1] - k ], [ t[0] + k, t[1] + k ] ]);
        }
      } else if (clipAuto) {
        v = null;
      }
      return v;
    };
    return m.clipExtent(null);
  }
  (d3.geo.mercator = function() {
    return d3_geo_mercatorProjection(d3_geo_mercator);
  }).raw = d3_geo_mercator;
  var d3_geo_orthographic = d3_geo_azimuthal(function() {
    return 1;
  }, Math.asin);
  (d3.geo.orthographic = function() {
    return d3_geo_projection(d3_geo_orthographic);
  }).raw = d3_geo_orthographic;
  var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / (1 + cosλcosφ);
  }, function(ρ) {
    return 2 * Math.atan(ρ);
  });
  (d3.geo.stereographic = function() {
    return d3_geo_projection(d3_geo_stereographic);
  }).raw = d3_geo_stereographic;
  function d3_geo_transverseMercator(λ, φ) {
    return [ Math.log(Math.tan(π / 4 + φ / 2)), -λ ];
  }
  d3_geo_transverseMercator.invert = function(x, y) {
    return [ -y, 2 * Math.atan(Math.exp(x)) - halfπ ];
  };
  (d3.geo.transverseMercator = function() {
    var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator), center = projection.center, rotate = projection.rotate;
    projection.center = function(_) {
      return _ ? center([ -_[1], _[0] ]) : (_ = center(), [ _[1], -_[0] ]);
    };
    projection.rotate = function(_) {
      return _ ? rotate([ _[0], _[1], _.length > 2 ? _[2] + 90 : 90 ]) : (_ = rotate(), 
      [ _[0], _[1], _[2] - 90 ]);
    };
    return rotate([ 0, 0, 90 ]);
  }).raw = d3_geo_transverseMercator;
  d3.geom = {};
  function d3_geom_pointX(d) {
    return d[0];
  }
  function d3_geom_pointY(d) {
    return d[1];
  }
  d3.geom.hull = function(vertices) {
    var x = d3_geom_pointX, y = d3_geom_pointY;
    if (arguments.length) return hull(vertices);
    function hull(data) {
      if (data.length < 3) return [];
      var fx = d3_functor(x), fy = d3_functor(y), i, n = data.length, points = [], flippedPoints = [];
      for (i = 0; i < n; i++) {
        points.push([ +fx.call(this, data[i], i), +fy.call(this, data[i], i), i ]);
      }
      points.sort(d3_geom_hullOrder);
      for (i = 0; i < n; i++) flippedPoints.push([ points[i][0], -points[i][1] ]);
      var upper = d3_geom_hullUpper(points), lower = d3_geom_hullUpper(flippedPoints);
      var skipLeft = lower[0] === upper[0], skipRight = lower[lower.length - 1] === upper[upper.length - 1], polygon = [];
      for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);
      for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);
      return polygon;
    }
    hull.x = function(_) {
      return arguments.length ? (x = _, hull) : x;
    };
    hull.y = function(_) {
      return arguments.length ? (y = _, hull) : y;
    };
    return hull;
  };
  function d3_geom_hullUpper(points) {
    var n = points.length, hull = [ 0, 1 ], hs = 2;
    for (var i = 2; i < n; i++) {
      while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0) --hs;
      hull[hs++] = i;
    }
    return hull.slice(0, hs);
  }
  function d3_geom_hullOrder(a, b) {
    return a[0] - b[0] || a[1] - b[1];
  }
  d3.geom.polygon = function(coordinates) {
    d3_subclass(coordinates, d3_geom_polygonPrototype);
    return coordinates;
  };
  var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
  d3_geom_polygonPrototype.area = function() {
    var i = -1, n = this.length, a, b = this[n - 1], area = 0;
    while (++i < n) {
      a = b;
      b = this[i];
      area += a[1] * b[0] - a[0] * b[1];
    }
    return area * .5;
  };
  d3_geom_polygonPrototype.centroid = function(k) {
    var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
    if (!arguments.length) k = -1 / (6 * this.area());
    while (++i < n) {
      a = b;
      b = this[i];
      c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }
    return [ x * k, y * k ];
  };
  d3_geom_polygonPrototype.clip = function(subject) {
    var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
    while (++i < n) {
      input = subject.slice();
      subject.length = 0;
      b = this[i];
      c = input[(m = input.length - closed) - 1];
      j = -1;
      while (++j < m) {
        d = input[j];
        if (d3_geom_polygonInside(d, a, b)) {
          if (!d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          subject.push(d);
        } else if (d3_geom_polygonInside(c, a, b)) {
          subject.push(d3_geom_polygonIntersect(c, d, a, b));
        }
        c = d;
      }
      if (closed) subject.push(subject[0]);
      a = b;
    }
    return subject;
  };
  function d3_geom_polygonInside(p, a, b) {
    return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
  }
  function d3_geom_polygonIntersect(c, d, a, b) {
    var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
    return [ x1 + ua * x21, y1 + ua * y21 ];
  }
  function d3_geom_polygonClosed(coordinates) {
    var a = coordinates[0], b = coordinates[coordinates.length - 1];
    return !(a[0] - b[0] || a[1] - b[1]);
  }
  var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiBeachPool = [], d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiCirclePool = [];
  function d3_geom_voronoiBeach() {
    d3_geom_voronoiRedBlackNode(this);
    this.edge = this.site = this.circle = null;
  }
  function d3_geom_voronoiCreateBeach(site) {
    var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach();
    beach.site = site;
    return beach;
  }
  function d3_geom_voronoiDetachBeach(beach) {
    d3_geom_voronoiDetachCircle(beach);
    d3_geom_voronoiBeaches.remove(beach);
    d3_geom_voronoiBeachPool.push(beach);
    d3_geom_voronoiRedBlackNode(beach);
  }
  function d3_geom_voronoiRemoveBeach(beach) {
    var circle = beach.circle, x = circle.x, y = circle.cy, vertex = {
      x: x,
      y: y
    }, previous = beach.P, next = beach.N, disappearing = [ beach ];
    d3_geom_voronoiDetachBeach(beach);
    var lArc = previous;
    while (lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε) {
      previous = lArc.P;
      disappearing.unshift(lArc);
      d3_geom_voronoiDetachBeach(lArc);
      lArc = previous;
    }
    disappearing.unshift(lArc);
    d3_geom_voronoiDetachCircle(lArc);
    var rArc = next;
    while (rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε) {
      next = rArc.N;
      disappearing.push(rArc);
      d3_geom_voronoiDetachBeach(rArc);
      rArc = next;
    }
    disappearing.push(rArc);
    d3_geom_voronoiDetachCircle(rArc);
    var nArcs = disappearing.length, iArc;
    for (iArc = 1; iArc < nArcs; ++iArc) {
      rArc = disappearing[iArc];
      lArc = disappearing[iArc - 1];
      d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
    }
    lArc = disappearing[0];
    rArc = disappearing[nArcs - 1];
    rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
    d3_geom_voronoiAttachCircle(lArc);
    d3_geom_voronoiAttachCircle(rArc);
  }
  function d3_geom_voronoiAddBeach(site) {
    var x = site.x, directrix = site.y, lArc, rArc, dxl, dxr, node = d3_geom_voronoiBeaches._;
    while (node) {
      dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
      if (dxl > ε) node = node.L; else {
        dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
        if (dxr > ε) {
          if (!node.R) {
            lArc = node;
            break;
          }
          node = node.R;
        } else {
          if (dxl > -ε) {
            lArc = node.P;
            rArc = node;
          } else if (dxr > -ε) {
            lArc = node;
            rArc = node.N;
          } else {
            lArc = rArc = node;
          }
          break;
        }
      }
    }
    var newArc = d3_geom_voronoiCreateBeach(site);
    d3_geom_voronoiBeaches.insert(lArc, newArc);
    if (!lArc && !rArc) return;
    if (lArc === rArc) {
      d3_geom_voronoiDetachCircle(lArc);
      rArc = d3_geom_voronoiCreateBeach(lArc.site);
      d3_geom_voronoiBeaches.insert(newArc, rArc);
      newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
      d3_geom_voronoiAttachCircle(lArc);
      d3_geom_voronoiAttachCircle(rArc);
      return;
    }
    if (!rArc) {
      newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
      return;
    }
    d3_geom_voronoiDetachCircle(lArc);
    d3_geom_voronoiDetachCircle(rArc);
    var lSite = lArc.site, ax = lSite.x, ay = lSite.y, bx = site.x - ax, by = site.y - ay, rSite = rArc.site, cx = rSite.x - ax, cy = rSite.y - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = {
      x: (cy * hb - by * hc) / d + ax,
      y: (bx * hc - cx * hb) / d + ay
    };
    d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
    newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
    rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
    d3_geom_voronoiAttachCircle(lArc);
    d3_geom_voronoiAttachCircle(rArc);
  }
  function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
    var site = arc.site, rfocx = site.x, rfocy = site.y, pby2 = rfocy - directrix;
    if (!pby2) return rfocx;
    var lArc = arc.P;
    if (!lArc) return -Infinity;
    site = lArc.site;
    var lfocx = site.x, lfocy = site.y, plby2 = lfocy - directrix;
    if (!plby2) return lfocx;
    var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
    if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
    return (rfocx + lfocx) / 2;
  }
  function d3_geom_voronoiRightBreakPoint(arc, directrix) {
    var rArc = arc.N;
    if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
    var site = arc.site;
    return site.y === directrix ? site.x : Infinity;
  }
  function d3_geom_voronoiCell(site) {
    this.site = site;
    this.edges = [];
  }
  d3_geom_voronoiCell.prototype.prepare = function() {
    var halfEdges = this.edges, iHalfEdge = halfEdges.length, edge;
    while (iHalfEdge--) {
      edge = halfEdges[iHalfEdge].edge;
      if (!edge.b || !edge.a) halfEdges.splice(iHalfEdge, 1);
    }
    halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
    return halfEdges.length;
  };
  function d3_geom_voronoiCloseCells(extent) {
    var x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], x2, y2, x3, y3, cells = d3_geom_voronoiCells, iCell = cells.length, cell, iHalfEdge, halfEdges, nHalfEdges, start, end;
    while (iCell--) {
      cell = cells[iCell];
      if (!cell || !cell.prepare()) continue;
      halfEdges = cell.edges;
      nHalfEdges = halfEdges.length;
      iHalfEdge = 0;
      while (iHalfEdge < nHalfEdges) {
        end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
        start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
        if (abs(x3 - x2) > ε || abs(y3 - y2) > ε) {
          halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < ε && y1 - y3 > ε ? {
            x: x0,
            y: abs(x2 - x0) < ε ? y2 : y1
          } : abs(y3 - y1) < ε && x1 - x3 > ε ? {
            x: abs(y2 - y1) < ε ? x2 : x1,
            y: y1
          } : abs(x3 - x1) < ε && y3 - y0 > ε ? {
            x: x1,
            y: abs(x2 - x1) < ε ? y2 : y0
          } : abs(y3 - y0) < ε && x3 - x0 > ε ? {
            x: abs(y2 - y0) < ε ? x2 : x0,
            y: y0
          } : null), cell.site, null));
          ++nHalfEdges;
        }
      }
    }
  }
  function d3_geom_voronoiHalfEdgeOrder(a, b) {
    return b.angle - a.angle;
  }
  function d3_geom_voronoiCircle() {
    d3_geom_voronoiRedBlackNode(this);
    this.x = this.y = this.arc = this.site = this.cy = null;
  }
  function d3_geom_voronoiAttachCircle(arc) {
    var lArc = arc.P, rArc = arc.N;
    if (!lArc || !rArc) return;
    var lSite = lArc.site, cSite = arc.site, rSite = rArc.site;
    if (lSite === rSite) return;
    var bx = cSite.x, by = cSite.y, ax = lSite.x - bx, ay = lSite.y - by, cx = rSite.x - bx, cy = rSite.y - by;
    var d = 2 * (ax * cy - ay * cx);
    if (d >= -ε2) return;
    var ha = ax * ax + ay * ay, hc = cx * cx + cy * cy, x = (cy * ha - ay * hc) / d, y = (ax * hc - cx * ha) / d, cy = y + by;
    var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle();
    circle.arc = arc;
    circle.site = cSite;
    circle.x = x + bx;
    circle.y = cy + Math.sqrt(x * x + y * y);
    circle.cy = cy;
    arc.circle = circle;
    var before = null, node = d3_geom_voronoiCircles._;
    while (node) {
      if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
        if (node.L) node = node.L; else {
          before = node.P;
          break;
        }
      } else {
        if (node.R) node = node.R; else {
          before = node;
          break;
        }
      }
    }
    d3_geom_voronoiCircles.insert(before, circle);
    if (!before) d3_geom_voronoiFirstCircle = circle;
  }
  function d3_geom_voronoiDetachCircle(arc) {
    var circle = arc.circle;
    if (circle) {
      if (!circle.P) d3_geom_voronoiFirstCircle = circle.N;
      d3_geom_voronoiCircles.remove(circle);
      d3_geom_voronoiCirclePool.push(circle);
      d3_geom_voronoiRedBlackNode(circle);
      arc.circle = null;
    }
  }
  function d3_geom_voronoiClipEdges(extent) {
    var edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length, e;
    while (i--) {
      e = edges[i];
      if (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε) {
        e.a = e.b = null;
        edges.splice(i, 1);
      }
    }
  }
  function d3_geom_voronoiConnectEdge(edge, extent) {
    var vb = edge.b;
    if (vb) return true;
    var va = edge.a, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], lSite = edge.l, rSite = edge.r, lx = lSite.x, ly = lSite.y, rx = rSite.x, ry = rSite.y, fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb;
    if (ry === ly) {
      if (fx < x0 || fx >= x1) return;
      if (lx > rx) {
        if (!va) va = {
          x: fx,
          y: y0
        }; else if (va.y >= y1) return;
        vb = {
          x: fx,
          y: y1
        };
      } else {
        if (!va) va = {
          x: fx,
          y: y1
        }; else if (va.y < y0) return;
        vb = {
          x: fx,
          y: y0
        };
      }
    } else {
      fm = (lx - rx) / (ry - ly);
      fb = fy - fm * fx;
      if (fm < -1 || fm > 1) {
        if (lx > rx) {
          if (!va) va = {
            x: (y0 - fb) / fm,
            y: y0
          }; else if (va.y >= y1) return;
          vb = {
            x: (y1 - fb) / fm,
            y: y1
          };
        } else {
          if (!va) va = {
            x: (y1 - fb) / fm,
            y: y1
          }; else if (va.y < y0) return;
          vb = {
            x: (y0 - fb) / fm,
            y: y0
          };
        }
      } else {
        if (ly < ry) {
          if (!va) va = {
            x: x0,
            y: fm * x0 + fb
          }; else if (va.x >= x1) return;
          vb = {
            x: x1,
            y: fm * x1 + fb
          };
        } else {
          if (!va) va = {
            x: x1,
            y: fm * x1 + fb
          }; else if (va.x < x0) return;
          vb = {
            x: x0,
            y: fm * x0 + fb
          };
        }
      }
    }
    edge.a = va;
    edge.b = vb;
    return true;
  }
  function d3_geom_voronoiEdge(lSite, rSite) {
    this.l = lSite;
    this.r = rSite;
    this.a = this.b = null;
  }
  function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
    var edge = new d3_geom_voronoiEdge(lSite, rSite);
    d3_geom_voronoiEdges.push(edge);
    if (va) d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
    if (vb) d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
    d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
    d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
    return edge;
  }
  function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
    var edge = new d3_geom_voronoiEdge(lSite, null);
    edge.a = va;
    edge.b = vb;
    d3_geom_voronoiEdges.push(edge);
    return edge;
  }
  function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
    if (!edge.a && !edge.b) {
      edge.a = vertex;
      edge.l = lSite;
      edge.r = rSite;
    } else if (edge.l === rSite) {
      edge.b = vertex;
    } else {
      edge.a = vertex;
    }
  }
  function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
    var va = edge.a, vb = edge.b;
    this.edge = edge;
    this.site = lSite;
    this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y);
  }
  d3_geom_voronoiHalfEdge.prototype = {
    start: function() {
      return this.edge.l === this.site ? this.edge.a : this.edge.b;
    },
    end: function() {
      return this.edge.l === this.site ? this.edge.b : this.edge.a;
    }
  };
  function d3_geom_voronoiRedBlackTree() {
    this._ = null;
  }
  function d3_geom_voronoiRedBlackNode(node) {
    node.U = node.C = node.L = node.R = node.P = node.N = null;
  }
  d3_geom_voronoiRedBlackTree.prototype = {
    insert: function(after, node) {
      var parent, grandpa, uncle;
      if (after) {
        node.P = after;
        node.N = after.N;
        if (after.N) after.N.P = node;
        after.N = node;
        if (after.R) {
          after = after.R;
          while (after.L) after = after.L;
          after.L = node;
        } else {
          after.R = node;
        }
        parent = after;
      } else if (this._) {
        after = d3_geom_voronoiRedBlackFirst(this._);
        node.P = null;
        node.N = after;
        after.P = after.L = node;
        parent = after;
      } else {
        node.P = node.N = null;
        this._ = node;
        parent = null;
      }
      node.L = node.R = null;
      node.U = parent;
      node.C = true;
      after = node;
      while (parent && parent.C) {
        grandpa = parent.U;
        if (parent === grandpa.L) {
          uncle = grandpa.R;
          if (uncle && uncle.C) {
            parent.C = uncle.C = false;
            grandpa.C = true;
            after = grandpa;
          } else {
            if (after === parent.R) {
              d3_geom_voronoiRedBlackRotateLeft(this, parent);
              after = parent;
              parent = after.U;
            }
            parent.C = false;
            grandpa.C = true;
            d3_geom_voronoiRedBlackRotateRight(this, grandpa);
          }
        } else {
          uncle = grandpa.L;
          if (uncle && uncle.C) {
            parent.C = uncle.C = false;
            grandpa.C = true;
            after = grandpa;
          } else {
            if (after === parent.L) {
              d3_geom_voronoiRedBlackRotateRight(this, parent);
              after = parent;
              parent = after.U;
            }
            parent.C = false;
            grandpa.C = true;
            d3_geom_voronoiRedBlackRotateLeft(this, grandpa);
          }
        }
        parent = after.U;
      }
      this._.C = false;
    },
    remove: function(node) {
      if (node.N) node.N.P = node.P;
      if (node.P) node.P.N = node.N;
      node.N = node.P = null;
      var parent = node.U, sibling, left = node.L, right = node.R, next, red;
      if (!left) next = right; else if (!right) next = left; else next = d3_geom_voronoiRedBlackFirst(right);
      if (parent) {
        if (parent.L === node) parent.L = next; else parent.R = next;
      } else {
        this._ = next;
      }
      if (left && right) {
        red = next.C;
        next.C = node.C;
        next.L = left;
        left.U = next;
        if (next !== right) {
          parent = next.U;
          next.U = node.U;
          node = next.R;
          parent.L = node;
          next.R = right;
          right.U = next;
        } else {
          next.U = parent;
          parent = next;
          node = next.R;
        }
      } else {
        red = node.C;
        node = next;
      }
      if (node) node.U = parent;
      if (red) return;
      if (node && node.C) {
        node.C = false;
        return;
      }
      do {
        if (node === this._) break;
        if (node === parent.L) {
          sibling = parent.R;
          if (sibling.C) {
            sibling.C = false;
            parent.C = true;
            d3_geom_voronoiRedBlackRotateLeft(this, parent);
            sibling = parent.R;
          }
          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
            if (!sibling.R || !sibling.R.C) {
              sibling.L.C = false;
              sibling.C = true;
              d3_geom_voronoiRedBlackRotateRight(this, sibling);
              sibling = parent.R;
            }
            sibling.C = parent.C;
            parent.C = sibling.R.C = false;
            d3_geom_voronoiRedBlackRotateLeft(this, parent);
            node = this._;
            break;
          }
        } else {
          sibling = parent.L;
          if (sibling.C) {
            sibling.C = false;
            parent.C = true;
            d3_geom_voronoiRedBlackRotateRight(this, parent);
            sibling = parent.L;
          }
          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
            if (!sibling.L || !sibling.L.C) {
              sibling.R.C = false;
              sibling.C = true;
              d3_geom_voronoiRedBlackRotateLeft(this, sibling);
              sibling = parent.L;
            }
            sibling.C = parent.C;
            parent.C = sibling.L.C = false;
            d3_geom_voronoiRedBlackRotateRight(this, parent);
            node = this._;
            break;
          }
        }
        sibling.C = true;
        node = parent;
        parent = parent.U;
      } while (!node.C);
      if (node) node.C = false;
    }
  };
  function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
    var p = node, q = node.R, parent = p.U;
    if (parent) {
      if (parent.L === p) parent.L = q; else parent.R = q;
    } else {
      tree._ = q;
    }
    q.U = parent;
    p.U = q;
    p.R = q.L;
    if (p.R) p.R.U = p;
    q.L = p;
  }
  function d3_geom_voronoiRedBlackRotateRight(tree, node) {
    var p = node, q = node.L, parent = p.U;
    if (parent) {
      if (parent.L === p) parent.L = q; else parent.R = q;
    } else {
      tree._ = q;
    }
    q.U = parent;
    p.U = q;
    p.L = q.R;
    if (p.L) p.L.U = p;
    q.R = p;
  }
  function d3_geom_voronoiRedBlackFirst(node) {
    while (node.L) node = node.L;
    return node;
  }
  function d3_geom_voronoi(sites, bbox) {
    var site = sites.sort(d3_geom_voronoiVertexOrder).pop(), x0, y0, circle;
    d3_geom_voronoiEdges = [];
    d3_geom_voronoiCells = new Array(sites.length);
    d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree();
    d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree();
    while (true) {
      circle = d3_geom_voronoiFirstCircle;
      if (site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) {
        if (site.x !== x0 || site.y !== y0) {
          d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
          d3_geom_voronoiAddBeach(site);
          x0 = site.x, y0 = site.y;
        }
        site = sites.pop();
      } else if (circle) {
        d3_geom_voronoiRemoveBeach(circle.arc);
      } else {
        break;
      }
    }
    if (bbox) d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
    var diagram = {
      cells: d3_geom_voronoiCells,
      edges: d3_geom_voronoiEdges
    };
    d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null;
    return diagram;
  }
  function d3_geom_voronoiVertexOrder(a, b) {
    return b.y - a.y || b.x - a.x;
  }
  d3.geom.voronoi = function(points) {
    var x = d3_geom_pointX, y = d3_geom_pointY, fx = x, fy = y, clipExtent = d3_geom_voronoiClipExtent;
    if (points) return voronoi(points);
    function voronoi(data) {
      var polygons = new Array(data.length), x0 = clipExtent[0][0], y0 = clipExtent[0][1], x1 = clipExtent[1][0], y1 = clipExtent[1][1];
      d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function(cell, i) {
        var edges = cell.edges, site = cell.site, polygon = polygons[i] = edges.length ? edges.map(function(e) {
          var s = e.start();
          return [ s.x, s.y ];
        }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [ [ x0, y1 ], [ x1, y1 ], [ x1, y0 ], [ x0, y0 ] ] : [];
        polygon.point = data[i];
      });
      return polygons;
    }
    function sites(data) {
      return data.map(function(d, i) {
        return {
          x: Math.round(fx(d, i) / ε) * ε,
          y: Math.round(fy(d, i) / ε) * ε,
          i: i
        };
      });
    }
    voronoi.links = function(data) {
      return d3_geom_voronoi(sites(data)).edges.filter(function(edge) {
        return edge.l && edge.r;
      }).map(function(edge) {
        return {
          source: data[edge.l.i],
          target: data[edge.r.i]
        };
      });
    };
    voronoi.triangles = function(data) {
      var triangles = [];
      d3_geom_voronoi(sites(data)).cells.forEach(function(cell, i) {
        var site = cell.site, edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder), j = -1, m = edges.length, e0, s0, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l;
        while (++j < m) {
          e0 = e1;
          s0 = s1;
          e1 = edges[j].edge;
          s1 = e1.l === site ? e1.r : e1.l;
          if (i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0) {
            triangles.push([ data[i], data[s0.i], data[s1.i] ]);
          }
        }
      });
      return triangles;
    };
    voronoi.x = function(_) {
      return arguments.length ? (fx = d3_functor(x = _), voronoi) : x;
    };
    voronoi.y = function(_) {
      return arguments.length ? (fy = d3_functor(y = _), voronoi) : y;
    };
    voronoi.clipExtent = function(_) {
      if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent;
      clipExtent = _ == null ? d3_geom_voronoiClipExtent : _;
      return voronoi;
    };
    voronoi.size = function(_) {
      if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1];
      return voronoi.clipExtent(_ && [ [ 0, 0 ], _ ]);
    };
    return voronoi;
  };
  var d3_geom_voronoiClipExtent = [ [ -1e6, -1e6 ], [ 1e6, 1e6 ] ];
  function d3_geom_voronoiTriangleArea(a, b, c) {
    return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y);
  }
  d3.geom.delaunay = function(vertices) {
    return d3.geom.voronoi().triangles(vertices);
  };
  d3.geom.quadtree = function(points, x1, y1, x2, y2) {
    var x = d3_geom_pointX, y = d3_geom_pointY, compat;
    if (compat = arguments.length) {
      x = d3_geom_quadtreeCompatX;
      y = d3_geom_quadtreeCompatY;
      if (compat === 3) {
        y2 = y1;
        x2 = x1;
        y1 = x1 = 0;
      }
      return quadtree(points);
    }
    function quadtree(data) {
      var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
      if (x1 != null) {
        x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
      } else {
        x2_ = y2_ = -(x1_ = y1_ = Infinity);
        xs = [], ys = [];
        n = data.length;
        if (compat) for (i = 0; i < n; ++i) {
          d = data[i];
          if (d.x < x1_) x1_ = d.x;
          if (d.y < y1_) y1_ = d.y;
          if (d.x > x2_) x2_ = d.x;
          if (d.y > y2_) y2_ = d.y;
          xs.push(d.x);
          ys.push(d.y);
        } else for (i = 0; i < n; ++i) {
          var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
          if (x_ < x1_) x1_ = x_;
          if (y_ < y1_) y1_ = y_;
          if (x_ > x2_) x2_ = x_;
          if (y_ > y2_) y2_ = y_;
          xs.push(x_);
          ys.push(y_);
        }
      }
      var dx = x2_ - x1_, dy = y2_ - y1_;
      if (dx > dy) y2_ = y1_ + dx; else x2_ = x1_ + dy;
      function insert(n, d, x, y, x1, y1, x2, y2) {
        if (isNaN(x) || isNaN(y)) return;
        if (n.leaf) {
          var nx = n.x, ny = n.y;
          if (nx != null) {
            if (abs(nx - x) + abs(ny - y) < .01) {
              insertChild(n, d, x, y, x1, y1, x2, y2);
            } else {
              var nPoint = n.point;
              n.x = n.y = n.point = null;
              insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
              insertChild(n, d, x, y, x1, y1, x2, y2);
            }
          } else {
            n.x = x, n.y = y, n.point = d;
          }
        } else {
          insertChild(n, d, x, y, x1, y1, x2, y2);
        }
      }
      function insertChild(n, d, x, y, x1, y1, x2, y2) {
        var xm = (x1 + x2) * .5, ym = (y1 + y2) * .5, right = x >= xm, below = y >= ym, i = below << 1 | right;
        n.leaf = false;
        n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
        if (right) x1 = xm; else x2 = xm;
        if (below) y1 = ym; else y2 = ym;
        insert(n, d, x, y, x1, y1, x2, y2);
      }
      var root = d3_geom_quadtreeNode();
      root.add = function(d) {
        insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_);
      };
      root.visit = function(f) {
        d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
      };
      root.find = function(point) {
        return d3_geom_quadtreeFind(root, point[0], point[1], x1_, y1_, x2_, y2_);
      };
      i = -1;
      if (x1 == null) {
        while (++i < n) {
          insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
        }
        --i;
      } else data.forEach(root.add);
      xs = ys = data = d = null;
      return root;
    }
    quadtree.x = function(_) {
      return arguments.length ? (x = _, quadtree) : x;
    };
    quadtree.y = function(_) {
      return arguments.length ? (y = _, quadtree) : y;
    };
    quadtree.extent = function(_) {
      if (!arguments.length) return x1 == null ? null : [ [ x1, y1 ], [ x2, y2 ] ];
      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], 
      y2 = +_[1][1];
      return quadtree;
    };
    quadtree.size = function(_) {
      if (!arguments.length) return x1 == null ? null : [ x2 - x1, y2 - y1 ];
      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
      return quadtree;
    };
    return quadtree;
  };
  function d3_geom_quadtreeCompatX(d) {
    return d.x;
  }
  function d3_geom_quadtreeCompatY(d) {
    return d.y;
  }
  function d3_geom_quadtreeNode() {
    return {
      leaf: true,
      nodes: [],
      point: null,
      x: null,
      y: null
    };
  }
  function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
    if (!f(node, x1, y1, x2, y2)) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
      if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
      if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
      if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
      if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
    }
  }
  function d3_geom_quadtreeFind(root, x, y, x0, y0, x3, y3) {
    var minDistance2 = Infinity, closestPoint;
    (function find(node, x1, y1, x2, y2) {
      if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;
      if (point = node.point) {
        var point, dx = x - node.x, dy = y - node.y, distance2 = dx * dx + dy * dy;
        if (distance2 < minDistance2) {
          var distance = Math.sqrt(minDistance2 = distance2);
          x0 = x - distance, y0 = y - distance;
          x3 = x + distance, y3 = y + distance;
          closestPoint = point;
        }
      }
      var children = node.nodes, xm = (x1 + x2) * .5, ym = (y1 + y2) * .5, right = x >= xm, below = y >= ym;
      for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
        if (node = children[i & 3]) switch (i & 3) {
         case 0:
          find(node, x1, y1, xm, ym);
          break;

         case 1:
          find(node, xm, y1, x2, ym);
          break;

         case 2:
          find(node, x1, ym, xm, y2);
          break;

         case 3:
          find(node, xm, ym, x2, y2);
          break;
        }
      }
    })(root, x0, y0, x3, y3);
    return closestPoint;
  }
  d3.interpolateRgb = d3_interpolateRgb;
  function d3_interpolateRgb(a, b) {
    a = d3.rgb(a);
    b = d3.rgb(b);
    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
    return function(t) {
      return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
    };
  }
  d3.interpolateObject = d3_interpolateObject;
  function d3_interpolateObject(a, b) {
    var i = {}, c = {}, k;
    for (k in a) {
      if (k in b) {
        i[k] = d3_interpolate(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }
    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }
  d3.interpolateNumber = d3_interpolateNumber;
  function d3_interpolateNumber(a, b) {
    a = +a, b = +b;
    return function(t) {
      return a * (1 - t) + b * t;
    };
  }
  d3.interpolateString = d3_interpolateString;
  function d3_interpolateString(a, b) {
    var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    a = a + "", b = b + "";
    while ((am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i]) s[i] += bm; else s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({
          i: i,
          x: d3_interpolateNumber(am, bm)
        });
      }
      bi = d3_interpolate_numberB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; else s[++i] = bs;
    }
    return s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
      return b(t) + "";
    }) : function() {
      return b;
    } : (b = q.length, function(t) {
      for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    });
  }
  var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
  d3.interpolate = d3_interpolate;
  function d3_interpolate(a, b) {
    var i = d3.interpolators.length, f;
    while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
    return f;
  }
  d3.interpolators = [ function(a, b) {
    var t = typeof b;
    return (t === "string" ? d3_rgb_names.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === "object" && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b);
  } ];
  d3.interpolateArray = d3_interpolateArray;
  function d3_interpolateArray(a, b) {
    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
    for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
    for (;i < na; ++i) c[i] = a[i];
    for (;i < nb; ++i) c[i] = b[i];
    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  }
  var d3_ease_default = function() {
    return d3_identity;
  };
  var d3_ease = d3.map({
    linear: d3_ease_default,
    poly: d3_ease_poly,
    quad: function() {
      return d3_ease_quad;
    },
    cubic: function() {
      return d3_ease_cubic;
    },
    sin: function() {
      return d3_ease_sin;
    },
    exp: function() {
      return d3_ease_exp;
    },
    circle: function() {
      return d3_ease_circle;
    },
    elastic: d3_ease_elastic,
    back: d3_ease_back,
    bounce: function() {
      return d3_ease_bounce;
    }
  });
  var d3_ease_mode = d3.map({
    "in": d3_identity,
    out: d3_ease_reverse,
    "in-out": d3_ease_reflect,
    "out-in": function(f) {
      return d3_ease_reflect(d3_ease_reverse(f));
    }
  });
  d3.ease = function(name) {
    var i = name.indexOf("-"), t = i >= 0 ? name.slice(0, i) : name, m = i >= 0 ? name.slice(i + 1) : "in";
    t = d3_ease.get(t) || d3_ease_default;
    m = d3_ease_mode.get(m) || d3_identity;
    return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
  };
  function d3_ease_clamp(f) {
    return function(t) {
      return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
    };
  }
  function d3_ease_reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }
  function d3_ease_reflect(f) {
    return function(t) {
      return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
    };
  }
  function d3_ease_quad(t) {
    return t * t;
  }
  function d3_ease_cubic(t) {
    return t * t * t;
  }
  function d3_ease_cubicInOut(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var t2 = t * t, t3 = t2 * t;
    return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
  }
  function d3_ease_poly(e) {
    return function(t) {
      return Math.pow(t, e);
    };
  }
  function d3_ease_sin(t) {
    return 1 - Math.cos(t * halfπ);
  }
  function d3_ease_exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  function d3_ease_circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  function d3_ease_elastic(a, p) {
    var s;
    if (arguments.length < 2) p = .45;
    if (arguments.length) s = p / τ * Math.asin(1 / a); else a = 1, s = p / 4;
    return function(t) {
      return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p);
    };
  }
  function d3_ease_back(s) {
    if (!s) s = 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }
  function d3_ease_bounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }
  d3.interpolateHcl = d3_interpolateHcl;
  function d3_interpolateHcl(a, b) {
    a = d3.hcl(a);
    b = d3.hcl(b);
    var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
    if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
    };
  }
  d3.interpolateHsl = d3_interpolateHsl;
  function d3_interpolateHsl(a, b) {
    a = d3.hsl(a);
    b = d3.hsl(b);
    var ah = a.h, as = a.s, al = a.l, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
    if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
    };
  }
  d3.interpolateLab = d3_interpolateLab;
  function d3_interpolateLab(a, b) {
    a = d3.lab(a);
    b = d3.lab(b);
    var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
    return function(t) {
      return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
    };
  }
  d3.interpolateRound = d3_interpolateRound;
  function d3_interpolateRound(a, b) {
    b -= a;
    return function(t) {
      return Math.round(a + b * t);
    };
  }
  d3.transform = function(string) {
    var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
    return (d3.transform = function(string) {
      if (string != null) {
        g.setAttribute("transform", string);
        var t = g.transform.baseVal.consolidate();
      }
      return new d3_transform(t ? t.matrix : d3_transformIdentity);
    })(string);
  };
  function d3_transform(m) {
    var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
    if (r0[0] * r1[1] < r1[0] * r0[1]) {
      r0[0] *= -1;
      r0[1] *= -1;
      kx *= -1;
      kz *= -1;
    }
    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
    this.translate = [ m.e, m.f ];
    this.scale = [ kx, ky ];
    this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
  }
  d3_transform.prototype.toString = function() {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };
  function d3_transformDot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function d3_transformNormalize(a) {
    var k = Math.sqrt(d3_transformDot(a, a));
    if (k) {
      a[0] /= k;
      a[1] /= k;
    }
    return k;
  }
  function d3_transformCombine(a, b, k) {
    a[0] += k * b[0];
    a[1] += k * b[1];
    return a;
  }
  var d3_transformIdentity = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  d3.interpolateTransform = d3_interpolateTransform;
  function d3_interpolateTransformPop(s) {
    return s.length ? s.pop() + "," : "";
  }
  function d3_interpolateTranslate(ta, tb, s, q) {
    if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
      var i = s.push("translate(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: d3_interpolateNumber(ta[0], tb[0])
      }, {
        i: i - 2,
        x: d3_interpolateNumber(ta[1], tb[1])
      });
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb + ")");
    }
  }
  function d3_interpolateRotate(ra, rb, s, q) {
    if (ra !== rb) {
      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
      q.push({
        i: s.push(d3_interpolateTransformPop(s) + "rotate(", null, ")") - 2,
        x: d3_interpolateNumber(ra, rb)
      });
    } else if (rb) {
      s.push(d3_interpolateTransformPop(s) + "rotate(" + rb + ")");
    }
  }
  function d3_interpolateSkew(wa, wb, s, q) {
    if (wa !== wb) {
      q.push({
        i: s.push(d3_interpolateTransformPop(s) + "skewX(", null, ")") - 2,
        x: d3_interpolateNumber(wa, wb)
      });
    } else if (wb) {
      s.push(d3_interpolateTransformPop(s) + "skewX(" + wb + ")");
    }
  }
  function d3_interpolateScale(ka, kb, s, q) {
    if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
      var i = s.push(d3_interpolateTransformPop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: d3_interpolateNumber(ka[0], kb[0])
      }, {
        i: i - 2,
        x: d3_interpolateNumber(ka[1], kb[1])
      });
    } else if (kb[0] !== 1 || kb[1] !== 1) {
      s.push(d3_interpolateTransformPop(s) + "scale(" + kb + ")");
    }
  }
  function d3_interpolateTransform(a, b) {
    var s = [], q = [];
    a = d3.transform(a), b = d3.transform(b);
    d3_interpolateTranslate(a.translate, b.translate, s, q);
    d3_interpolateRotate(a.rotate, b.rotate, s, q);
    d3_interpolateSkew(a.skew, b.skew, s, q);
    d3_interpolateScale(a.scale, b.scale, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  }
  function d3_uninterpolateNumber(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(x) {
      return (x - a) / b;
    };
  }
  function d3_uninterpolateClamp(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(x) {
      return Math.max(0, Math.min(1, (x - a) / b));
    };
  }
  d3.layout = {};
  d3.layout.bundle = function() {
    return function(links) {
      var paths = [], i = -1, n = links.length;
      while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
      return paths;
    };
  };
  function d3_layout_bundlePath(link) {
    var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
    while (start !== lca) {
      start = start.parent;
      points.push(start);
    }
    var k = points.length;
    while (end !== lca) {
      points.splice(k, 0, end);
      end = end.parent;
    }
    return points;
  }
  function d3_layout_bundleAncestors(node) {
    var ancestors = [], parent = node.parent;
    while (parent != null) {
      ancestors.push(node);
      node = parent;
      parent = parent.parent;
    }
    ancestors.push(node);
    return ancestors;
  }
  function d3_layout_bundleLeastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
    while (aNode === bNode) {
      sharedNode = aNode;
      aNode = aNodes.pop();
      bNode = bNodes.pop();
    }
    return sharedNode;
  }
  d3.layout.chord = function() {
    var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
    function relayout() {
      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
      chords = [];
      groups = [];
      k = 0, i = -1;
      while (++i < n) {
        x = 0, j = -1;
        while (++j < n) {
          x += matrix[i][j];
        }
        groupSums.push(x);
        subgroupIndex.push(d3.range(n));
        k += x;
      }
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.sort(function(a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }
      k = (τ - padding * n) / k;
      x = 0, i = -1;
      while (++i < n) {
        x0 = x, j = -1;
        while (++j < n) {
          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: groupSums[di]
        };
        x += padding;
      }
      i = -1;
      while (++i < n) {
        j = i - 1;
        while (++j < n) {
          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }
      if (sortChords) resort();
    }
    function resort() {
      chords.sort(function(a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }
    chord.matrix = function(x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord;
    };
    chord.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };
    chord.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };
    chord.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };
    chord.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };
    chord.chords = function() {
      if (!chords) relayout();
      return chords;
    };
    chord.groups = function() {
      if (!groups) relayout();
      return groups;
    };
    return chord;
  };
  d3.layout.force = function() {
    var force = {}, event = d3.dispatch("start", "tick", "end"), timer, size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, chargeDistance2 = d3_layout_forceChargeDistance2, gravity = .1, theta2 = .64, nodes = [], links = [], distances, strengths, charges;
    function repulse(node) {
      return function(quad, x1, _, x2) {
        if (quad.point !== node) {
          var dx = quad.cx - node.x, dy = quad.cy - node.y, dw = x2 - x1, dn = dx * dx + dy * dy;
          if (dw * dw / theta2 < dn) {
            if (dn < chargeDistance2) {
              var k = quad.charge / dn;
              node.px -= dx * k;
              node.py -= dy * k;
            }
            return true;
          }
          if (quad.point && dn && dn < chargeDistance2) {
            var k = quad.pointCharge / dn;
            node.px -= dx * k;
            node.py -= dy * k;
          }
        }
        return !quad.charge;
      };
    }
    force.tick = function() {
      if ((alpha *= .99) < .005) {
        timer = null;
        event.end({
          type: "end",
          alpha: alpha = 0
        });
        return true;
      }
      var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
      for (i = 0; i < m; ++i) {
        o = links[i];
        s = o.source;
        t = o.target;
        x = t.x - s.x;
        y = t.y - s.y;
        if (l = x * x + y * y) {
          l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
          x *= l;
          y *= l;
          t.x -= x * (k = s.weight + t.weight ? s.weight / (s.weight + t.weight) : .5);
          t.y -= y * k;
          s.x += x * (k = 1 - k);
          s.y += y * k;
        }
      }
      if (k = alpha * gravity) {
        x = size[0] / 2;
        y = size[1] / 2;
        i = -1;
        if (k) while (++i < n) {
          o = nodes[i];
          o.x += (x - o.x) * k;
          o.y += (y - o.y) * k;
        }
      }
      if (charge) {
        d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
        i = -1;
        while (++i < n) {
          if (!(o = nodes[i]).fixed) {
            q.visit(repulse(o));
          }
        }
      }
      i = -1;
      while (++i < n) {
        o = nodes[i];
        if (o.fixed) {
          o.x = o.px;
          o.y = o.py;
        } else {
          o.x -= (o.px - (o.px = o.x)) * friction;
          o.y -= (o.py - (o.py = o.y)) * friction;
        }
      }
      event.tick({
        type: "tick",
        alpha: alpha
      });
    };
    force.nodes = function(x) {
      if (!arguments.length) return nodes;
      nodes = x;
      return force;
    };
    force.links = function(x) {
      if (!arguments.length) return links;
      links = x;
      return force;
    };
    force.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return force;
    };
    force.linkDistance = function(x) {
      if (!arguments.length) return linkDistance;
      linkDistance = typeof x === "function" ? x : +x;
      return force;
    };
    force.distance = force.linkDistance;
    force.linkStrength = function(x) {
      if (!arguments.length) return linkStrength;
      linkStrength = typeof x === "function" ? x : +x;
      return force;
    };
    force.friction = function(x) {
      if (!arguments.length) return friction;
      friction = +x;
      return force;
    };
    force.charge = function(x) {
      if (!arguments.length) return charge;
      charge = typeof x === "function" ? x : +x;
      return force;
    };
    force.chargeDistance = function(x) {
      if (!arguments.length) return Math.sqrt(chargeDistance2);
      chargeDistance2 = x * x;
      return force;
    };
    force.gravity = function(x) {
      if (!arguments.length) return gravity;
      gravity = +x;
      return force;
    };
    force.theta = function(x) {
      if (!arguments.length) return Math.sqrt(theta2);
      theta2 = x * x;
      return force;
    };
    force.alpha = function(x) {
      if (!arguments.length) return alpha;
      x = +x;
      if (alpha) {
        if (x > 0) {
          alpha = x;
        } else {
          timer.c = null, timer.t = NaN, timer = null;
          event.end({
            type: "end",
            alpha: alpha = 0
          });
        }
      } else if (x > 0) {
        event.start({
          type: "start",
          alpha: alpha = x
        });
        timer = d3_timer(force.tick);
      }
      return force;
    };
    force.start = function() {
      var i, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
      for (i = 0; i < n; ++i) {
        (o = nodes[i]).index = i;
        o.weight = 0;
      }
      for (i = 0; i < m; ++i) {
        o = links[i];
        if (typeof o.source == "number") o.source = nodes[o.source];
        if (typeof o.target == "number") o.target = nodes[o.target];
        ++o.source.weight;
        ++o.target.weight;
      }
      for (i = 0; i < n; ++i) {
        o = nodes[i];
        if (isNaN(o.x)) o.x = position("x", w);
        if (isNaN(o.y)) o.y = position("y", h);
        if (isNaN(o.px)) o.px = o.x;
        if (isNaN(o.py)) o.py = o.y;
      }
      distances = [];
      if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
      strengths = [];
      if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
      charges = [];
      if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
      function position(dimension, size) {
        if (!neighbors) {
          neighbors = new Array(n);
          for (j = 0; j < n; ++j) {
            neighbors[j] = [];
          }
          for (j = 0; j < m; ++j) {
            var o = links[j];
            neighbors[o.source.index].push(o.target);
            neighbors[o.target.index].push(o.source);
          }
        }
        var candidates = neighbors[i], j = -1, l = candidates.length, x;
        while (++j < l) if (!isNaN(x = candidates[j][dimension])) return x;
        return Math.random() * size;
      }
      return force.resume();
    };
    force.resume = function() {
      return force.alpha(.1);
    };
    force.stop = function() {
      return force.alpha(0);
    };
    force.drag = function() {
      if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
      if (!arguments.length) return drag;
      this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
    };
    function dragmove(d) {
      d.px = d3.event.x, d.py = d3.event.y;
      force.resume();
    }
    return d3.rebind(force, event, "on");
  };
  function d3_layout_forceDragstart(d) {
    d.fixed |= 2;
  }
  function d3_layout_forceDragend(d) {
    d.fixed &= ~6;
  }
  function d3_layout_forceMouseover(d) {
    d.fixed |= 4;
    d.px = d.x, d.py = d.y;
  }
  function d3_layout_forceMouseout(d) {
    d.fixed &= ~4;
  }
  function d3_layout_forceAccumulate(quad, alpha, charges) {
    var cx = 0, cy = 0;
    quad.charge = 0;
    if (!quad.leaf) {
      var nodes = quad.nodes, n = nodes.length, i = -1, c;
      while (++i < n) {
        c = nodes[i];
        if (c == null) continue;
        d3_layout_forceAccumulate(c, alpha, charges);
        quad.charge += c.charge;
        cx += c.charge * c.cx;
        cy += c.charge * c.cy;
      }
    }
    if (quad.point) {
      if (!quad.leaf) {
        quad.point.x += Math.random() - .5;
        quad.point.y += Math.random() - .5;
      }
      var k = alpha * charges[quad.point.index];
      quad.charge += quad.pointCharge = k;
      cx += k * quad.point.x;
      cy += k * quad.point.y;
    }
    quad.cx = cx / quad.charge;
    quad.cy = cy / quad.charge;
  }
  var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1, d3_layout_forceChargeDistance2 = Infinity;
  d3.layout.hierarchy = function() {
    var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
    function hierarchy(root) {
      var stack = [ root ], nodes = [], node;
      root.depth = 0;
      while ((node = stack.pop()) != null) {
        nodes.push(node);
        if ((childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
          var n, childs, child;
          while (--n >= 0) {
            stack.push(child = childs[n]);
            child.parent = node;
            child.depth = node.depth + 1;
          }
          if (value) node.value = 0;
          node.children = childs;
        } else {
          if (value) node.value = +value.call(hierarchy, node, node.depth) || 0;
          delete node.children;
        }
      }
      d3_layout_hierarchyVisitAfter(root, function(node) {
        var childs, parent;
        if (sort && (childs = node.children)) childs.sort(sort);
        if (value && (parent = node.parent)) parent.value += node.value;
      });
      return nodes;
    }
    hierarchy.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return hierarchy;
    };
    hierarchy.children = function(x) {
      if (!arguments.length) return children;
      children = x;
      return hierarchy;
    };
    hierarchy.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return hierarchy;
    };
    hierarchy.revalue = function(root) {
      if (value) {
        d3_layout_hierarchyVisitBefore(root, function(node) {
          if (node.children) node.value = 0;
        });
        d3_layout_hierarchyVisitAfter(root, function(node) {
          var parent;
          if (!node.children) node.value = +value.call(hierarchy, node, node.depth) || 0;
          if (parent = node.parent) parent.value += node.value;
        });
      }
      return root;
    };
    return hierarchy;
  };
  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;
    return object;
  }
  function d3_layout_hierarchyVisitBefore(node, callback) {
    var nodes = [ node ];
    while ((node = nodes.pop()) != null) {
      callback(node);
      if ((children = node.children) && (n = children.length)) {
        var n, children;
        while (--n >= 0) nodes.push(children[n]);
      }
    }
  }
  function d3_layout_hierarchyVisitAfter(node, callback) {
    var nodes = [ node ], nodes2 = [];
    while ((node = nodes.pop()) != null) {
      nodes2.push(node);
      if ((children = node.children) && (n = children.length)) {
        var i = -1, n, children;
        while (++i < n) nodes.push(children[i]);
      }
    }
    while ((node = nodes2.pop()) != null) {
      callback(node);
    }
  }
  function d3_layout_hierarchyChildren(d) {
    return d.children;
  }
  function d3_layout_hierarchyValue(d) {
    return d.value;
  }
  function d3_layout_hierarchySort(a, b) {
    return b.value - a.value;
  }
  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function(parent) {
      return (parent.children || []).map(function(child) {
        return {
          source: parent,
          target: child
        };
      });
    }));
  }
  d3.layout.partition = function() {
    var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
    function position(node, x, dx, dy) {
      var children = node.children;
      node.x = x;
      node.y = node.depth * dy;
      node.dx = dx;
      node.dy = dy;
      if (children && (n = children.length)) {
        var i = -1, n, c, d;
        dx = node.value ? dx / node.value : 0;
        while (++i < n) {
          position(c = children[i], x, d = c.value * dx, dy);
          x += d;
        }
      }
    }
    function depth(node) {
      var children = node.children, d = 0;
      if (children && (n = children.length)) {
        var i = -1, n;
        while (++i < n) d = Math.max(d, depth(children[i]));
      }
      return 1 + d;
    }
    function partition(d, i) {
      var nodes = hierarchy.call(this, d, i);
      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
      return nodes;
    }
    partition.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return partition;
    };
    return d3_layout_hierarchyRebind(partition, hierarchy);
  };
  d3.layout.pie = function() {
    var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = τ, padAngle = 0;
    function pie(data) {
      var n = data.length, values = data.map(function(d, i) {
        return +value.call(pie, d, i);
      }), a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle), da = (typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a, p = Math.min(Math.abs(da) / n, +(typeof padAngle === "function" ? padAngle.apply(this, arguments) : padAngle)), pa = p * (da < 0 ? -1 : 1), sum = d3.sum(values), k = sum ? (da - n * pa) / sum : 0, index = d3.range(n), arcs = [], v;
      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
        return values[j] - values[i];
      } : function(i, j) {
        return sort(data[i], data[j]);
      });
      index.forEach(function(i) {
        arcs[i] = {
          data: data[i],
          value: v = values[i],
          startAngle: a,
          endAngle: a += v * k + pa,
          padAngle: p
        };
      });
      return arcs;
    }
    pie.value = function(_) {
      if (!arguments.length) return value;
      value = _;
      return pie;
    };
    pie.sort = function(_) {
      if (!arguments.length) return sort;
      sort = _;
      return pie;
    };
    pie.startAngle = function(_) {
      if (!arguments.length) return startAngle;
      startAngle = _;
      return pie;
    };
    pie.endAngle = function(_) {
      if (!arguments.length) return endAngle;
      endAngle = _;
      return pie;
    };
    pie.padAngle = function(_) {
      if (!arguments.length) return padAngle;
      padAngle = _;
      return pie;
    };
    return pie;
  };
  var d3_layout_pieSortByValue = {};
  d3.layout.stack = function() {
    var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
    function stack(data, index) {
      if (!(n = data.length)) return data;
      var series = data.map(function(d, i) {
        return values.call(stack, d, i);
      });
      var points = series.map(function(d) {
        return d.map(function(v, i) {
          return [ x.call(stack, v, i), y.call(stack, v, i) ];
        });
      });
      var orders = order.call(stack, points, index);
      series = d3.permute(series, orders);
      points = d3.permute(points, orders);
      var offsets = offset.call(stack, points, index);
      var m = series[0].length, n, i, j, o;
      for (j = 0; j < m; ++j) {
        out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
        for (i = 1; i < n; ++i) {
          out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
        }
      }
      return data;
    }
    stack.values = function(x) {
      if (!arguments.length) return values;
      values = x;
      return stack;
    };
    stack.order = function(x) {
      if (!arguments.length) return order;
      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
      return stack;
    };
    stack.offset = function(x) {
      if (!arguments.length) return offset;
      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
      return stack;
    };
    stack.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      return stack;
    };
    stack.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      return stack;
    };
    stack.out = function(z) {
      if (!arguments.length) return out;
      out = z;
      return stack;
    };
    return stack;
  };
  function d3_layout_stackX(d) {
    return d.x;
  }
  function d3_layout_stackY(d) {
    return d.y;
  }
  function d3_layout_stackOut(d, y0, y) {
    d.y0 = y0;
    d.y = y;
  }
  var d3_layout_stackOrders = d3.map({
    "inside-out": function(data) {
      var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
        return max[a] - max[b];
      }), top = 0, bottom = 0, tops = [], bottoms = [];
      for (i = 0; i < n; ++i) {
        j = index[i];
        if (top < bottom) {
          top += sums[j];
          tops.push(j);
        } else {
          bottom += sums[j];
          bottoms.push(j);
        }
      }
      return bottoms.reverse().concat(tops);
    },
    reverse: function(data) {
      return d3.range(data.length).reverse();
    },
    "default": d3_layout_stackOrderDefault
  });
  var d3_layout_stackOffsets = d3.map({
    silhouette: function(data) {
      var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o > max) max = o;
        sums.push(o);
      }
      for (j = 0; j < m; ++j) {
        y0[j] = (max - sums[j]) / 2;
      }
      return y0;
    },
    wiggle: function(data) {
      var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
      y0[0] = o = o0 = 0;
      for (j = 1; j < m; ++j) {
        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
          }
          s2 += s3 * data[i][j][1];
        }
        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
        if (o < o0) o0 = o;
      }
      for (j = 0; j < m; ++j) y0[j] -= o0;
      return y0;
    },
    expand: function(data) {
      var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
      }
      for (j = 0; j < m; ++j) y0[j] = 0;
      return y0;
    },
    zero: d3_layout_stackOffsetZero
  });
  function d3_layout_stackOrderDefault(data) {
    return d3.range(data.length);
  }
  function d3_layout_stackOffsetZero(data) {
    var j = -1, m = data[0].length, y0 = [];
    while (++j < m) y0[j] = 0;
    return y0;
  }
  function d3_layout_stackMaxIndex(array) {
    var i = 1, j = 0, v = array[0][1], k, n = array.length;
    for (;i < n; ++i) {
      if ((k = array[i][1]) > v) {
        j = i;
        v = k;
      }
    }
    return j;
  }
  function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }
  function d3_layout_stackSum(p, d) {
    return p + d[1];
  }
  d3.layout.histogram = function() {
    var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
    function histogram(data, i) {
      var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }
      if (m > 0) {
        i = -1;
        while (++i < n) {
          x = values[i];
          if (x >= range[0] && x <= range[1]) {
            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }
      return bins;
    }
    histogram.value = function(x) {
      if (!arguments.length) return valuer;
      valuer = x;
      return histogram;
    };
    histogram.range = function(x) {
      if (!arguments.length) return ranger;
      ranger = d3_functor(x);
      return histogram;
    };
    histogram.bins = function(x) {
      if (!arguments.length) return binner;
      binner = typeof x === "number" ? function(range) {
        return d3_layout_histogramBinFixed(range, x);
      } : d3_functor(x);
      return histogram;
    };
    histogram.frequency = function(x) {
      if (!arguments.length) return frequency;
      frequency = !!x;
      return histogram;
    };
    return histogram;
  };
  function d3_layout_histogramBinSturges(range, values) {
    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }
  function d3_layout_histogramBinFixed(range, n) {
    var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
    while (++x <= n) f[x] = m * x + b;
    return f;
  }
  function d3_layout_histogramRange(values) {
    return [ d3.min(values), d3.max(values) ];
  }
  d3.layout.pack = function() {
    var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ], radius;
    function pack(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
        return radius;
      };
      root.x = root.y = 0;
      d3_layout_hierarchyVisitAfter(root, function(d) {
        d.r = +r(d.value);
      });
      d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
      if (padding) {
        var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
        d3_layout_hierarchyVisitAfter(root, function(d) {
          d.r += dr;
        });
        d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
        d3_layout_hierarchyVisitAfter(root, function(d) {
          d.r -= dr;
        });
      }
      d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
      return nodes;
    }
    pack.size = function(_) {
      if (!arguments.length) return size;
      size = _;
      return pack;
    };
    pack.radius = function(_) {
      if (!arguments.length) return radius;
      radius = _ == null || typeof _ === "function" ? _ : +_;
      return pack;
    };
    pack.padding = function(_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };
    return d3_layout_hierarchyRebind(pack, hierarchy);
  };
  function d3_layout_packSort(a, b) {
    return a.value - b.value;
  }
  function d3_layout_packInsert(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b;
  }
  function d3_layout_packSplice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }
  function d3_layout_packIntersects(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
    return .999 * dr * dr > dx * dx + dy * dy;
  }
  function d3_layout_packSiblings(node) {
    if (!(nodes = node.children) || !(n = nodes.length)) return;
    var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
    function bound(node) {
      xMin = Math.min(node.x - node.r, xMin);
      xMax = Math.max(node.x + node.r, xMax);
      yMin = Math.min(node.y - node.r, yMin);
      yMax = Math.max(node.y + node.r, yMax);
    }
    nodes.forEach(d3_layout_packLink);
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;
    bound(a);
    if (n > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;
      bound(b);
      if (n > 2) {
        c = nodes[2];
        d3_layout_packPlace(a, b, c);
        bound(c);
        d3_layout_packInsert(a, c);
        a._pack_prev = c;
        d3_layout_packInsert(c, b);
        b = a._pack_next;
        for (i = 3; i < n; i++) {
          d3_layout_packPlace(a, b, c = nodes[i]);
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
            if (d3_layout_packIntersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
              if (d3_layout_packIntersects(k, c)) {
                break;
              }
            }
          }
          if (isect) {
            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
            i--;
          } else {
            d3_layout_packInsert(a, c);
            b = c;
            bound(c);
          }
        }
      }
    }
    var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
    for (i = 0; i < n; i++) {
      c = nodes[i];
      c.x -= cx;
      c.y -= cy;
      cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
    }
    node.r = cr;
    nodes.forEach(d3_layout_packUnlink);
  }
  function d3_layout_packLink(node) {
    node._pack_next = node._pack_prev = node;
  }
  function d3_layout_packUnlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }
  function d3_layout_packTransform(node, x, y, k) {
    var children = node.children;
    node.x = x += k * node.x;
    node.y = y += k * node.y;
    node.r *= k;
    if (children) {
      var i = -1, n = children.length;
      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
    }
  }
  function d3_layout_packPlace(a, b, c) {
    var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
    if (db && (dx || dy)) {
      var da = b.r + c.r, dc = dx * dx + dy * dy;
      da *= da;
      db *= db;
      var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
      c.x = a.x + x * dx + y * dy;
      c.y = a.y + x * dy - y * dx;
    } else {
      c.x = a.x + db;
      c.y = a.y;
    }
  }
  d3.layout.tree = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = null;
    function tree(d, i) {
      var nodes = hierarchy.call(this, d, i), root0 = nodes[0], root1 = wrapTree(root0);
      d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z;
      d3_layout_hierarchyVisitBefore(root1, secondWalk);
      if (nodeSize) d3_layout_hierarchyVisitBefore(root0, sizeNode); else {
        var left = root0, right = root0, bottom = root0;
        d3_layout_hierarchyVisitBefore(root0, function(node) {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
          if (node.depth > bottom.depth) bottom = node;
        });
        var tx = separation(left, right) / 2 - left.x, kx = size[0] / (right.x + separation(right, left) / 2 + tx), ky = size[1] / (bottom.depth || 1);
        d3_layout_hierarchyVisitBefore(root0, function(node) {
          node.x = (node.x + tx) * kx;
          node.y = node.depth * ky;
        });
      }
      return nodes;
    }
    function wrapTree(root0) {
      var root1 = {
        A: null,
        children: [ root0 ]
      }, queue = [ root1 ], node1;
      while ((node1 = queue.pop()) != null) {
        for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
          queue.push((children[i] = child = {
            _: children[i],
            parent: node1,
            children: (child = children[i].children) && child.slice() || [],
            A: null,
            a: null,
            z: 0,
            m: 0,
            c: 0,
            s: 0,
            t: null,
            i: i
          }).a = child);
        }
      }
      return root1.children[0];
    }
    function firstWalk(v) {
      var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
      if (children.length) {
        d3_layout_treeShift(v);
        var midpoint = (children[0].z + children[children.length - 1].z) / 2;
        if (w) {
          v.z = w.z + separation(v._, w._);
          v.m = v.z - midpoint;
        } else {
          v.z = midpoint;
        }
      } else if (w) {
        v.z = w.z + separation(v._, w._);
      }
      v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
    }
    function secondWalk(v) {
      v._.x = v.z + v.parent.m;
      v.m += v.parent.m;
    }
    function apportion(v, w, ancestor) {
      if (w) {
        var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(vom);
          vop = d3_layout_treeRight(vop);
          vop.a = v;
          shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim.m;
          sip += vip.m;
          som += vom.m;
          sop += vop.m;
        }
        if (vim && !d3_layout_treeRight(vop)) {
          vop.t = vim;
          vop.m += sim - sop;
        }
        if (vip && !d3_layout_treeLeft(vom)) {
          vom.t = vip;
          vom.m += sip - som;
          ancestor = v;
        }
      }
      return ancestor;
    }
    function sizeNode(node) {
      node.x *= size[0];
      node.y = node.depth * size[1];
    }
    tree.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };
    tree.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null ? sizeNode : null;
      return tree;
    };
    tree.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) == null ? null : sizeNode;
      return tree;
    };
    return d3_layout_hierarchyRebind(tree, hierarchy);
  };
  function d3_layout_treeSeparation(a, b) {
    return a.parent == b.parent ? 1 : 2;
  }
  function d3_layout_treeLeft(v) {
    var children = v.children;
    return children.length ? children[0] : v.t;
  }
  function d3_layout_treeRight(v) {
    var children = v.children, n;
    return (n = children.length) ? children[n - 1] : v.t;
  }
  function d3_layout_treeMove(wm, wp, shift) {
    var change = shift / (wp.i - wm.i);
    wp.c -= change;
    wp.s += shift;
    wm.c += change;
    wp.z += shift;
    wp.m += shift;
  }
  function d3_layout_treeShift(v) {
    var shift = 0, change = 0, children = v.children, i = children.length, w;
    while (--i >= 0) {
      w = children[i];
      w.z += shift;
      w.m += shift;
      shift += w.s + (change += w.c);
    }
  }
  function d3_layout_treeAncestor(vim, v, ancestor) {
    return vim.a.parent === v.parent ? vim.a : ancestor;
  }
  d3.layout.cluster = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = false;
    function cluster(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
      d3_layout_hierarchyVisitAfter(root, function(node) {
        var children = node.children;
        if (children && children.length) {
          node.x = d3_layout_clusterX(children);
          node.y = d3_layout_clusterY(children);
        } else {
          node.x = previousNode ? x += separation(node, previousNode) : 0;
          node.y = 0;
          previousNode = node;
        }
      });
      var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
      d3_layout_hierarchyVisitAfter(root, nodeSize ? function(node) {
        node.x = (node.x - root.x) * size[0];
        node.y = (root.y - node.y) * size[1];
      } : function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
      });
      return nodes;
    }
    cluster.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return cluster;
    };
    cluster.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null;
      return cluster;
    };
    cluster.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return cluster;
    };
    return d3_layout_hierarchyRebind(cluster, hierarchy);
  };
  function d3_layout_clusterY(children) {
    return 1 + d3.max(children, function(child) {
      return child.y;
    });
  }
  function d3_layout_clusterX(children) {
    return children.reduce(function(x, child) {
      return x + child.x;
    }, 0) / children.length;
  }
  function d3_layout_clusterLeft(node) {
    var children = node.children;
    return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
  }
  function d3_layout_clusterRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
  }
  d3.layout.treemap = function() {
    var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
    function scale(children, k) {
      var i = -1, n = children.length, child, area;
      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }
    function squarify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while ((n = remaining.length) > 0) {
          row.push(child = remaining[n - 1]);
          row.area += child.area;
          if (mode !== "squarify" || (score = worst(row, u)) <= best) {
            remaining.pop();
            best = score;
          } else {
            row.area -= row.pop().area;
            position(row, u, rect, false);
            u = Math.min(rect.dx, rect.dy);
            row.length = row.area = 0;
            best = Infinity;
          }
        }
        if (row.length) {
          position(row, u, rect, true);
          row.length = row.area = 0;
        }
        children.forEach(squarify);
      }
    }
    function stickify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), remaining = children.slice(), child, row = [];
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while (child = remaining.pop()) {
          row.push(child);
          row.area += child.area;
          if (child.z != null) {
            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
            row.length = row.area = 0;
          }
        }
        children.forEach(stickify);
      }
    }
    function worst(row, u) {
      var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
      while (++i < n) {
        if (!(r = row[i].area)) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }
      s *= s;
      u *= u;
      return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
    }
    function position(row, u, rect, flush) {
      var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
      if (u == rect.dx) {
        if (flush || v > rect.dy) v = rect.dy;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dy = v;
          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
        }
        o.z = true;
        o.dx += rect.x + rect.dx - x;
        rect.y += v;
        rect.dy -= v;
      } else {
        if (flush || v > rect.dx) v = rect.dx;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dx = v;
          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
        }
        o.z = false;
        o.dy += rect.y + rect.dy - y;
        rect.x += v;
        rect.dx -= v;
      }
    }
    function treemap(d) {
      var nodes = stickies || hierarchy(d), root = nodes[0];
      root.x = root.y = 0;
      if (root.value) root.dx = size[0], root.dy = size[1]; else root.dx = root.dy = 0;
      if (stickies) hierarchy.revalue(root);
      scale([ root ], root.dx * root.dy / root.value);
      (stickies ? stickify : squarify)(root);
      if (sticky) stickies = nodes;
      return nodes;
    }
    treemap.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return treemap;
    };
    treemap.padding = function(x) {
      if (!arguments.length) return padding;
      function padFunction(node) {
        var p = x.call(treemap, node, node.depth);
        return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
      }
      function padConstant(node) {
        return d3_layout_treemapPad(node, x);
      }
      var type;
      pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
      padConstant) : padConstant;
      return treemap;
    };
    treemap.round = function(x) {
      if (!arguments.length) return round != Number;
      round = x ? Math.round : Number;
      return treemap;
    };
    treemap.sticky = function(x) {
      if (!arguments.length) return sticky;
      sticky = x;
      stickies = null;
      return treemap;
    };
    treemap.ratio = function(x) {
      if (!arguments.length) return ratio;
      ratio = x;
      return treemap;
    };
    treemap.mode = function(x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return treemap;
    };
    return d3_layout_hierarchyRebind(treemap, hierarchy);
  };
  function d3_layout_treemapPadNull(node) {
    return {
      x: node.x,
      y: node.y,
      dx: node.dx,
      dy: node.dy
    };
  }
  function d3_layout_treemapPad(node, padding) {
    var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
    if (dx < 0) {
      x += dx / 2;
      dx = 0;
    }
    if (dy < 0) {
      y += dy / 2;
      dy = 0;
    }
    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    };
  }
  d3.random = {
    normal: function(µ, σ) {
      var n = arguments.length;
      if (n < 2) σ = 1;
      if (n < 1) µ = 0;
      return function() {
        var x, y, r;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);
        return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
      };
    },
    logNormal: function() {
      var random = d3.random.normal.apply(d3, arguments);
      return function() {
        return Math.exp(random());
      };
    },
    bates: function(m) {
      var random = d3.random.irwinHall(m);
      return function() {
        return random() / m;
      };
    },
    irwinHall: function(m) {
      return function() {
        for (var s = 0, j = 0; j < m; j++) s += Math.random();
        return s;
      };
    }
  };
  d3.scale = {};
  function d3_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [ start, stop ] : [ stop, start ];
  }
  function d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
  }
  function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
    var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
    return function(x) {
      return i(u(x));
    };
  }
  function d3_scale_nice(domain, nice) {
    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
    if (x1 < x0) {
      dx = i0, i0 = i1, i1 = dx;
      dx = x0, x0 = x1, x1 = dx;
    }
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
    return domain;
  }
  function d3_scale_niceStep(step) {
    return step ? {
      floor: function(x) {
        return Math.floor(x / step) * step;
      },
      ceil: function(x) {
        return Math.ceil(x / step) * step;
      }
    } : d3_scale_niceIdentity;
  }
  var d3_scale_niceIdentity = {
    floor: d3_identity,
    ceil: d3_identity
  };
  function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
    var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
    if (domain[k] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }
    while (++j <= k) {
      u.push(uninterpolate(domain[j - 1], domain[j]));
      i.push(interpolate(range[j - 1], range[j]));
    }
    return function(x) {
      var j = d3.bisect(domain, x, 1, k) - 1;
      return i[j](u[j](x));
    };
  }
  d3.scale.linear = function() {
    return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3_interpolate, false);
  };
  function d3_scale_linear(domain, range, interpolate, clamp) {
    var output, input;
    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, d3_interpolate);
      return scale;
    }
    function scale(x) {
      return output(x);
    }
    scale.invert = function(y) {
      return input(y);
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(Number);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.rangeRound = function(x) {
      return scale.range(x).interpolate(d3_interpolateRound);
    };
    scale.clamp = function(x) {
      if (!arguments.length) return clamp;
      clamp = x;
      return rescale();
    };
    scale.interpolate = function(x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      d3_scale_linearNice(domain, m);
      return rescale();
    };
    scale.copy = function() {
      return d3_scale_linear(domain, range, interpolate, clamp);
    };
    return rescale();
  }
  function d3_scale_linearRebind(scale, linear) {
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }
  function d3_scale_linearNice(domain, m) {
    d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
    d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
    return domain;
  }
  function d3_scale_linearTickRange(domain, m) {
    if (m == null) m = 10;
    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
    if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
    extent[0] = Math.ceil(extent[0] / step) * step;
    extent[1] = Math.floor(extent[1] / step) * step + step * .5;
    extent[2] = step;
    return extent;
  }
  function d3_scale_linearTicks(domain, m) {
    return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
  }
  function d3_scale_linearTickFormat(domain, m, format) {
    var range = d3_scale_linearTickRange(domain, m);
    if (format) {
      var match = d3_format_re.exec(format);
      match.shift();
      if (match[8] === "s") {
        var prefix = d3.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
        if (!match[7]) match[7] = "." + d3_scale_linearPrecision(prefix.scale(range[2]));
        match[8] = "f";
        format = d3.format(match.join(""));
        return function(d) {
          return format(prefix.scale(d)) + prefix.symbol;
        };
      }
      if (!match[7]) match[7] = "." + d3_scale_linearFormatPrecision(match[8], range);
      format = match.join("");
    } else {
      format = ",." + d3_scale_linearPrecision(range[2]) + "f";
    }
    return d3.format(format);
  }
  var d3_scale_linearFormatSignificant = {
    s: 1,
    g: 1,
    p: 1,
    r: 1,
    e: 1
  };
  function d3_scale_linearPrecision(value) {
    return -Math.floor(Math.log(value) / Math.LN10 + .01);
  }
  function d3_scale_linearFormatPrecision(type, range) {
    var p = d3_scale_linearPrecision(range[2]);
    return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +(type !== "e") : p - (type === "%") * 2;
  }
  d3.scale.log = function() {
    return d3_scale_log(d3.scale.linear().domain([ 0, 1 ]), 10, true, [ 1, 10 ]);
  };
  function d3_scale_log(linear, base, positive, domain) {
    function log(x) {
      return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
    }
    function pow(x) {
      return positive ? Math.pow(base, x) : -Math.pow(base, -x);
    }
    function scale(x) {
      return linear(log(x));
    }
    scale.invert = function(x) {
      return pow(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      positive = x[0] >= 0;
      linear.domain((domain = x.map(Number)).map(log));
      return scale;
    };
    scale.base = function(_) {
      if (!arguments.length) return base;
      base = +_;
      linear.domain(domain.map(log));
      return scale;
    };
    scale.nice = function() {
      var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
      linear.domain(niced);
      domain = niced.map(pow);
      return scale;
    };
    scale.ticks = function() {
      var extent = d3_scaleExtent(domain), ticks = [], u = extent[0], v = extent[1], i = Math.floor(log(u)), j = Math.ceil(log(v)), n = base % 1 ? 2 : base;
      if (isFinite(j - i)) {
        if (positive) {
          for (;i < j; i++) for (var k = 1; k < n; k++) ticks.push(pow(i) * k);
          ticks.push(pow(i));
        } else {
          ticks.push(pow(i));
          for (;i++ < j; ) for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
        }
        for (i = 0; ticks[i] < u; i++) {}
        for (j = ticks.length; ticks[j - 1] > v; j--) {}
        ticks = ticks.slice(i, j);
      }
      return ticks;
    };
    scale.tickFormat = function(n, format) {
      if (!arguments.length) return d3_scale_logFormat;
      if (arguments.length < 2) format = d3_scale_logFormat; else if (typeof format !== "function") format = d3.format(format);
      var k = Math.max(1, base * n / scale.ticks().length);
      return function(d) {
        var i = d / pow(Math.round(log(d)));
        if (i * base < base - .5) i *= base;
        return i <= k ? format(d) : "";
      };
    };
    scale.copy = function() {
      return d3_scale_log(linear.copy(), base, positive, domain);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  var d3_scale_logFormat = d3.format(".0e"), d3_scale_logNiceNegative = {
    floor: function(x) {
      return -Math.ceil(-x);
    },
    ceil: function(x) {
      return -Math.floor(-x);
    }
  };
  d3.scale.pow = function() {
    return d3_scale_pow(d3.scale.linear(), 1, [ 0, 1 ]);
  };
  function d3_scale_pow(linear, exponent, domain) {
    var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
    function scale(x) {
      return linear(powp(x));
    }
    scale.invert = function(x) {
      return powb(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      linear.domain((domain = x.map(Number)).map(powp));
      return scale;
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      return scale.domain(d3_scale_linearNice(domain, m));
    };
    scale.exponent = function(x) {
      if (!arguments.length) return exponent;
      powp = d3_scale_powPow(exponent = x);
      powb = d3_scale_powPow(1 / exponent);
      linear.domain(domain.map(powp));
      return scale;
    };
    scale.copy = function() {
      return d3_scale_pow(linear.copy(), exponent, domain);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_scale_powPow(e) {
    return function(x) {
      return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
    };
  }
  d3.scale.sqrt = function() {
    return d3.scale.pow().exponent(.5);
  };
  d3.scale.ordinal = function() {
    return d3_scale_ordinal([], {
      t: "range",
      a: [ [] ]
    });
  };
  function d3_scale_ordinal(domain, ranger) {
    var index, range, rangeBand;
    function scale(x) {
      return range[((index.get(x) || (ranger.t === "range" ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length];
    }
    function steps(start, step) {
      return d3.range(domain.length).map(function(i) {
        return start + step * i;
      });
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = [];
      index = new d3_Map();
      var i = -1, n = x.length, xi;
      while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
      return scale[ranger.t].apply(scale, ranger.a);
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      rangeBand = 0;
      ranger = {
        t: "range",
        a: arguments
      };
      return scale;
    };
    scale.rangePoints = function(x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0], stop = x[1], step = domain.length < 2 ? (start = (start + stop) / 2, 
      0) : (stop - start) / (domain.length - 1 + padding);
      range = steps(start + step * padding / 2, step);
      rangeBand = 0;
      ranger = {
        t: "rangePoints",
        a: arguments
      };
      return scale;
    };
    scale.rangeRoundPoints = function(x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0], stop = x[1], step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 
      0) : (stop - start) / (domain.length - 1 + padding) | 0;
      range = steps(start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
      rangeBand = 0;
      ranger = {
        t: "rangeRoundPoints",
        a: arguments
      };
      return scale;
    };
    scale.rangeBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
      range = steps(start + step * outerPadding, step);
      if (reverse) range.reverse();
      rangeBand = step * (1 - padding);
      ranger = {
        t: "rangeBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeRoundBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
      range = steps(start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
      if (reverse) range.reverse();
      rangeBand = Math.round(step * (1 - padding));
      ranger = {
        t: "rangeRoundBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeBand = function() {
      return rangeBand;
    };
    scale.rangeExtent = function() {
      return d3_scaleExtent(ranger.a[0]);
    };
    scale.copy = function() {
      return d3_scale_ordinal(domain, ranger);
    };
    return scale.domain(domain);
  }
  d3.scale.category10 = function() {
    return d3.scale.ordinal().range(d3_category10);
  };
  d3.scale.category20 = function() {
    return d3.scale.ordinal().range(d3_category20);
  };
  d3.scale.category20b = function() {
    return d3.scale.ordinal().range(d3_category20b);
  };
  d3.scale.category20c = function() {
    return d3.scale.ordinal().range(d3_category20c);
  };
  var d3_category10 = [ 2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175 ].map(d3_rgbString);
  var d3_category20 = [ 2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725 ].map(d3_rgbString);
  var d3_category20b = [ 3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654 ].map(d3_rgbString);
  var d3_category20c = [ 3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081 ].map(d3_rgbString);
  d3.scale.quantile = function() {
    return d3_scale_quantile([], []);
  };
  function d3_scale_quantile(domain, range) {
    var thresholds;
    function rescale() {
      var k = 0, q = range.length;
      thresholds = [];
      while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
      return scale;
    }
    function scale(x) {
      if (!isNaN(x = +x)) return range[d3.bisect(thresholds, x)];
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.quantiles = function() {
      return thresholds;
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return y < 0 ? [ NaN, NaN ] : [ y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1] ];
    };
    scale.copy = function() {
      return d3_scale_quantile(domain, range);
    };
    return rescale();
  }
  d3.scale.quantize = function() {
    return d3_scale_quantize(0, 1, [ 0, 1 ]);
  };
  function d3_scale_quantize(x0, x1, range) {
    var kx, i;
    function scale(x) {
      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
    }
    function rescale() {
      kx = range.length / (x1 - x0);
      i = range.length - 1;
      return scale;
    }
    scale.domain = function(x) {
      if (!arguments.length) return [ x0, x1 ];
      x0 = +x[0];
      x1 = +x[x.length - 1];
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      y = y < 0 ? NaN : y / kx + x0;
      return [ y, y + 1 / kx ];
    };
    scale.copy = function() {
      return d3_scale_quantize(x0, x1, range);
    };
    return rescale();
  }
  d3.scale.threshold = function() {
    return d3_scale_threshold([ .5 ], [ 0, 1 ]);
  };
  function d3_scale_threshold(domain, range) {
    function scale(x) {
      if (x <= x) return range[d3.bisect(domain, x)];
    }
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return scale;
    };
    scale.range = function(_) {
      if (!arguments.length) return range;
      range = _;
      return scale;
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return [ domain[y - 1], domain[y] ];
    };
    scale.copy = function() {
      return d3_scale_threshold(domain, range);
    };
    return scale;
  }
  d3.scale.identity = function() {
    return d3_scale_identity([ 0, 1 ]);
  };
  function d3_scale_identity(domain) {
    function identity(x) {
      return +x;
    }
    identity.invert = identity;
    identity.domain = identity.range = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(identity);
      return identity;
    };
    identity.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    identity.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    identity.copy = function() {
      return d3_scale_identity(domain);
    };
    return identity;
  }
  d3.svg = {};
  function d3_zero() {
    return 0;
  }
  d3.svg.arc = function() {
    var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, cornerRadius = d3_zero, padRadius = d3_svg_arcAuto, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle, padAngle = d3_svg_arcPadAngle;
    function arc() {
      var r0 = Math.max(0, +innerRadius.apply(this, arguments)), r1 = Math.max(0, +outerRadius.apply(this, arguments)), a0 = startAngle.apply(this, arguments) - halfπ, a1 = endAngle.apply(this, arguments) - halfπ, da = Math.abs(a1 - a0), cw = a0 > a1 ? 0 : 1;
      if (r1 < r0) rc = r1, r1 = r0, r0 = rc;
      if (da >= τε) return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : "") + "Z";
      var rc, cr, rp, ap, p0 = 0, p1 = 0, x0, y0, x1, y1, x2, y2, x3, y3, path = [];
      if (ap = (+padAngle.apply(this, arguments) || 0) / 2) {
        rp = padRadius === d3_svg_arcAuto ? Math.sqrt(r0 * r0 + r1 * r1) : +padRadius.apply(this, arguments);
        if (!cw) p1 *= -1;
        if (r1) p1 = d3_asin(rp / r1 * Math.sin(ap));
        if (r0) p0 = d3_asin(rp / r0 * Math.sin(ap));
      }
      if (r1) {
        x0 = r1 * Math.cos(a0 + p1);
        y0 = r1 * Math.sin(a0 + p1);
        x1 = r1 * Math.cos(a1 - p1);
        y1 = r1 * Math.sin(a1 - p1);
        var l1 = Math.abs(a1 - a0 - 2 * p1) <= π ? 0 : 1;
        if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
          var h1 = (a0 + a1) / 2;
          x0 = r1 * Math.cos(h1);
          y0 = r1 * Math.sin(h1);
          x1 = y1 = null;
        }
      } else {
        x0 = y0 = 0;
      }
      if (r0) {
        x2 = r0 * Math.cos(a1 - p0);
        y2 = r0 * Math.sin(a1 - p0);
        x3 = r0 * Math.cos(a0 + p0);
        y3 = r0 * Math.sin(a0 + p0);
        var l0 = Math.abs(a0 - a1 + 2 * p0) <= π ? 0 : 1;
        if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === 1 - cw ^ l0) {
          var h0 = (a0 + a1) / 2;
          x2 = r0 * Math.cos(h0);
          y2 = r0 * Math.sin(h0);
          x3 = y3 = null;
        }
      } else {
        x2 = y2 = 0;
      }
      if (da > ε && (rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments))) > .001) {
        cr = r0 < r1 ^ cw ? 0 : 1;
        var rc1 = rc, rc0 = rc;
        if (da < π) {
          var oc = x3 == null ? [ x2, y2 ] : x1 == null ? [ x0, y0 ] : d3_geom_polygonIntersect([ x0, y0 ], [ x3, y3 ], [ x1, y1 ], [ x2, y2 ]), ax = x0 - oc[0], ay = y0 - oc[1], bx = x1 - oc[0], by = y1 - oc[1], kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2), lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
        }
        if (x1 != null) {
          var t30 = d3_svg_arcCornerTangents(x3 == null ? [ x2, y2 ] : [ x3, y3 ], [ x0, y0 ], r1, rc1, cw), t12 = d3_svg_arcCornerTangents([ x1, y1 ], [ x2, y2 ], r1, rc1, cw);
          if (rc === rc1) {
            path.push("M", t30[0], "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1], "A", r1, ",", r1, " 0 ", 1 - cw ^ d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1], "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]);
          } else {
            path.push("M", t30[0], "A", rc1, ",", rc1, " 0 1,", cr, " ", t12[0]);
          }
        } else {
          path.push("M", x0, ",", y0);
        }
        if (x3 != null) {
          var t03 = d3_svg_arcCornerTangents([ x0, y0 ], [ x3, y3 ], r0, -rc0, cw), t21 = d3_svg_arcCornerTangents([ x2, y2 ], x1 == null ? [ x0, y0 ] : [ x1, y1 ], r0, -rc0, cw);
          if (rc === rc0) {
            path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1], "A", r0, ",", r0, " 0 ", cw ^ d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
          } else {
            path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
          }
        } else {
          path.push("L", x2, ",", y2);
        }
      } else {
        path.push("M", x0, ",", y0);
        if (x1 != null) path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
        path.push("L", x2, ",", y2);
        if (x3 != null) path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
      }
      path.push("Z");
      return path.join("");
    }
    function circleSegment(r1, cw) {
      return "M0," + r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1;
    }
    arc.innerRadius = function(v) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3_functor(v);
      return arc;
    };
    arc.outerRadius = function(v) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3_functor(v);
      return arc;
    };
    arc.cornerRadius = function(v) {
      if (!arguments.length) return cornerRadius;
      cornerRadius = d3_functor(v);
      return arc;
    };
    arc.padRadius = function(v) {
      if (!arguments.length) return padRadius;
      padRadius = v == d3_svg_arcAuto ? d3_svg_arcAuto : d3_functor(v);
      return arc;
    };
    arc.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return arc;
    };
    arc.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return arc;
    };
    arc.padAngle = function(v) {
      if (!arguments.length) return padAngle;
      padAngle = d3_functor(v);
      return arc;
    };
    arc.centroid = function() {
      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - halfπ;
      return [ Math.cos(a) * r, Math.sin(a) * r ];
    };
    return arc;
  };
  var d3_svg_arcAuto = "auto";
  function d3_svg_arcInnerRadius(d) {
    return d.innerRadius;
  }
  function d3_svg_arcOuterRadius(d) {
    return d.outerRadius;
  }
  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }
  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }
  function d3_svg_arcPadAngle(d) {
    return d && d.padAngle;
  }
  function d3_svg_arcSweep(x0, y0, x1, y1) {
    return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
  }
  function d3_svg_arcCornerTangents(p0, p1, r1, rc, cw) {
    var x01 = p0[0] - p1[0], y01 = p0[1] - p1[1], lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x1 = p0[0] + ox, y1 = p0[1] + oy, x2 = p1[0] + ox, y2 = p1[1] + oy, x3 = (x1 + x2) / 2, y3 = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, d2 = dx * dx + dy * dy, r = r1 - rc, D = x1 * y2 - x2 * y1, d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x3, dy0 = cy0 - y3, dx1 = cx1 - x3, dy1 = cy1 - y3;
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
    return [ [ cx0 - ox, cy0 - oy ], [ cx0 * r1 / r, cy0 * r1 / r ] ];
  }
  function d3_svg_line(projection) {
    var x = d3_geom_pointX, y = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
    function line(data) {
      var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
      function segment() {
        segments.push("M", interpolate(projection(points), tension));
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
        } else if (points.length) {
          segment();
          points = [];
        }
      }
      if (points.length) segment();
      return segments.length ? segments.join("") : null;
    }
    line.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return line;
    };
    line.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return line;
    };
    line.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return line;
    };
    line.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      return line;
    };
    line.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return line;
    };
    return line;
  }
  d3.svg.line = function() {
    return d3_svg_line(d3_identity);
  };
  var d3_svg_lineInterpolators = d3.map({
    linear: d3_svg_lineLinear,
    "linear-closed": d3_svg_lineLinearClosed,
    step: d3_svg_lineStep,
    "step-before": d3_svg_lineStepBefore,
    "step-after": d3_svg_lineStepAfter,
    basis: d3_svg_lineBasis,
    "basis-open": d3_svg_lineBasisOpen,
    "basis-closed": d3_svg_lineBasisClosed,
    bundle: d3_svg_lineBundle,
    cardinal: d3_svg_lineCardinal,
    "cardinal-open": d3_svg_lineCardinalOpen,
    "cardinal-closed": d3_svg_lineCardinalClosed,
    monotone: d3_svg_lineMonotone
  });
  d3_svg_lineInterpolators.forEach(function(key, value) {
    value.key = key;
    value.closed = /-closed$/.test(key);
  });
  function d3_svg_lineLinear(points) {
    return points.length > 1 ? points.join("L") : points + "Z";
  }
  function d3_svg_lineLinearClosed(points) {
    return points.join("L") + "Z";
  }
  function d3_svg_lineStep(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
    if (n > 1) path.push("H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepBefore(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepAfter(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
    return path.join("");
  }
  function d3_svg_lineCardinalOpen(points, tension) {
    return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, -1), d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineCardinalClosed(points, tension) {
    return points.length < 3 ? d3_svg_lineLinearClosed(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), 
    points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
  }
  function d3_svg_lineCardinal(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineHermite(points, tangents) {
    if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
      return d3_svg_lineLinear(points);
    }
    var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
    if (quad) {
      path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
      p0 = points[1];
      pi = 2;
    }
    if (tangents.length > 1) {
      t = tangents[1];
      p = points[pi];
      pi++;
      path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      for (var i = 2; i < tangents.length; i++, pi++) {
        p = points[pi];
        t = tangents[i];
        path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      }
    }
    if (quad) {
      var lp = points[pi];
      path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
    }
    return path;
  }
  function d3_svg_lineCardinalTangents(points, tension) {
    var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
    while (++i < n) {
      p0 = p1;
      p1 = p2;
      p2 = points[i];
      tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
    }
    return tangents;
  }
  function d3_svg_lineBasis(points) {
    if (points.length < 3) return d3_svg_lineLinear(points);
    var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    points.push(points[n - 1]);
    while (++i <= n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    points.pop();
    path.push("L", pi);
    return path.join("");
  }
  function d3_svg_lineBasisOpen(points) {
    if (points.length < 4) return d3_svg_lineLinear(points);
    var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
    while (++i < 3) {
      pi = points[i];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
    --i;
    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBasisClosed(points) {
    var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
    while (++i < 4) {
      pi = points[i % n];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    --i;
    while (++i < m) {
      pi = points[i % n];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBundle(points, tension) {
    var n = points.length - 1;
    if (n) {
      var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
      while (++i <= n) {
        p = points[i];
        t = i / n;
        p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
        p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
      }
    }
    return d3_svg_lineBasis(points);
  }
  function d3_svg_lineDot4(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
  function d3_svg_lineBasisBezier(path, x, y) {
    path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
  }
  function d3_svg_lineSlope(p0, p1) {
    return (p1[1] - p0[1]) / (p1[0] - p0[0]);
  }
  function d3_svg_lineFiniteDifferences(points) {
    var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
    while (++i < j) {
      m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
    }
    m[i] = d;
    return m;
  }
  function d3_svg_lineMonotoneTangents(points) {
    var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
    while (++i < j) {
      d = d3_svg_lineSlope(points[i], points[i + 1]);
      if (abs(d) < ε) {
        m[i] = m[i + 1] = 0;
      } else {
        a = m[i] / d;
        b = m[i + 1] / d;
        s = a * a + b * b;
        if (s > 9) {
          s = d * 3 / Math.sqrt(s);
          m[i] = s * a;
          m[i + 1] = s * b;
        }
      }
    }
    i = -1;
    while (++i <= j) {
      s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
      tangents.push([ s || 0, m[i] * s || 0 ]);
    }
    return tangents;
  }
  function d3_svg_lineMonotone(points) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
  }
  d3.svg.line.radial = function() {
    var line = d3_svg_line(d3_svg_lineRadial);
    line.radius = line.x, delete line.x;
    line.angle = line.y, delete line.y;
    return line;
  };
  function d3_svg_lineRadial(points) {
    var point, i = -1, n = points.length, r, a;
    while (++i < n) {
      point = points[i];
      r = point[0];
      a = point[1] - halfπ;
      point[0] = r * Math.cos(a);
      point[1] = r * Math.sin(a);
    }
    return points;
  }
  function d3_svg_area(projection) {
    var x0 = d3_geom_pointX, x1 = d3_geom_pointX, y0 = 0, y1 = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
    function area(data) {
      var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
        return x;
      } : d3_functor(x1), fy1 = y0 === y1 ? function() {
        return y;
      } : d3_functor(y1), x, y;
      function segment() {
        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
          points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
        } else if (points0.length) {
          segment();
          points0 = [];
          points1 = [];
        }
      }
      if (points0.length) segment();
      return segments.length ? segments.join("") : null;
    }
    area.x = function(_) {
      if (!arguments.length) return x1;
      x0 = x1 = _;
      return area;
    };
    area.x0 = function(_) {
      if (!arguments.length) return x0;
      x0 = _;
      return area;
    };
    area.x1 = function(_) {
      if (!arguments.length) return x1;
      x1 = _;
      return area;
    };
    area.y = function(_) {
      if (!arguments.length) return y1;
      y0 = y1 = _;
      return area;
    };
    area.y0 = function(_) {
      if (!arguments.length) return y0;
      y0 = _;
      return area;
    };
    area.y1 = function(_) {
      if (!arguments.length) return y1;
      y1 = _;
      return area;
    };
    area.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return area;
    };
    area.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      interpolateReverse = interpolate.reverse || interpolate;
      L = interpolate.closed ? "M" : "L";
      return area;
    };
    area.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return area;
    };
    return area;
  }
  d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
  d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
  d3.svg.area = function() {
    return d3_svg_area(d3_identity);
  };
  d3.svg.area.radial = function() {
    var area = d3_svg_area(d3_svg_lineRadial);
    area.radius = area.x, delete area.x;
    area.innerRadius = area.x0, delete area.x0;
    area.outerRadius = area.x1, delete area.x1;
    area.angle = area.y, delete area.y;
    area.startAngle = area.y0, delete area.y0;
    area.endAngle = area.y1, delete area.y1;
    return area;
  };
  d3.svg.chord = function() {
    var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function chord(d, i) {
      var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
      return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
    }
    function subgroup(self, f, d, i) {
      var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) - halfπ, a1 = endAngle.call(self, subgroup, i) - halfπ;
      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [ r * Math.cos(a0), r * Math.sin(a0) ],
        p1: [ r * Math.cos(a1), r * Math.sin(a1) ]
      };
    }
    function equals(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1;
    }
    function arc(r, p, a) {
      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }
    function curve(r0, p0, r1, p1) {
      return "Q 0,0 " + p1;
    }
    chord.radius = function(v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };
    chord.source = function(v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };
    chord.target = function(v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };
    chord.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };
    chord.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };
    return chord;
  };
  function d3_svg_chordRadius(d) {
    return d.radius;
  }
  d3.svg.diagonal = function() {
    var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
    function diagonal(d, i) {
      var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
        x: p0.x,
        y: m
      }, {
        x: p3.x,
        y: m
      }, p3 ];
      p = p.map(projection);
      return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
    }
    diagonal.source = function(x) {
      if (!arguments.length) return source;
      source = d3_functor(x);
      return diagonal;
    };
    diagonal.target = function(x) {
      if (!arguments.length) return target;
      target = d3_functor(x);
      return diagonal;
    };
    diagonal.projection = function(x) {
      if (!arguments.length) return projection;
      projection = x;
      return diagonal;
    };
    return diagonal;
  };
  function d3_svg_diagonalProjection(d) {
    return [ d.x, d.y ];
  }
  d3.svg.diagonal.radial = function() {
    var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
    diagonal.projection = function(x) {
      return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
    };
    return diagonal;
  };
  function d3_svg_diagonalRadialProjection(projection) {
    return function() {
      var d = projection.apply(this, arguments), r = d[0], a = d[1] - halfπ;
      return [ r * Math.cos(a), r * Math.sin(a) ];
    };
  }
  d3.svg.symbol = function() {
    var type = d3_svg_symbolType, size = d3_svg_symbolSize;
    function symbol(d, i) {
      return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
    }
    symbol.type = function(x) {
      if (!arguments.length) return type;
      type = d3_functor(x);
      return symbol;
    };
    symbol.size = function(x) {
      if (!arguments.length) return size;
      size = d3_functor(x);
      return symbol;
    };
    return symbol;
  };
  function d3_svg_symbolSize() {
    return 64;
  }
  function d3_svg_symbolType() {
    return "circle";
  }
  function d3_svg_symbolCircle(size) {
    var r = Math.sqrt(size / π);
    return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
  }
  var d3_svg_symbols = d3.map({
    circle: d3_svg_symbolCircle,
    cross: function(size) {
      var r = Math.sqrt(size / 5) / 2;
      return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
    },
    diamond: function(size) {
      var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
      return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
    },
    square: function(size) {
      var r = Math.sqrt(size) / 2;
      return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
    },
    "triangle-down": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
    },
    "triangle-up": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
    }
  });
  d3.svg.symbolTypes = d3_svg_symbols.keys();
  var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
  d3_selectionPrototype.transition = function(name) {
    var id = d3_transitionInheritId || ++d3_transitionId, ns = d3_transitionNamespace(name), subgroups = [], subgroup, node, transition = d3_transitionInherit || {
      time: Date.now(),
      ease: d3_ease_cubicInOut,
      delay: 0,
      duration: 250
    };
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) d3_transitionNode(node, i, ns, id, transition);
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, ns, id);
  };
  d3_selectionPrototype.interrupt = function(name) {
    return this.each(name == null ? d3_selection_interrupt : d3_selection_interruptNS(d3_transitionNamespace(name)));
  };
  var d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace());
  function d3_selection_interruptNS(ns) {
    return function() {
      var lock, activeId, active;
      if ((lock = this[ns]) && (active = lock[activeId = lock.active])) {
        active.timer.c = null;
        active.timer.t = NaN;
        if (--lock.count) delete lock[activeId]; else delete this[ns];
        lock.active += .5;
        active.event && active.event.interrupt.call(this, this.__data__, active.index);
      }
    };
  }
  function d3_transition(groups, ns, id) {
    d3_subclass(groups, d3_transitionPrototype);
    groups.namespace = ns;
    groups.id = id;
    return groups;
  }
  var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
  d3_transitionPrototype.call = d3_selectionPrototype.call;
  d3_transitionPrototype.empty = d3_selectionPrototype.empty;
  d3_transitionPrototype.node = d3_selectionPrototype.node;
  d3_transitionPrototype.size = d3_selectionPrototype.size;
  d3.transition = function(selection, name) {
    return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d3.selection().transition(selection);
  };
  d3.transition.prototype = d3_transitionPrototype;
  d3_transitionPrototype.select = function(selector) {
    var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnode, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          d3_transitionNode(subnode, i, ns, id, node[ns][id]);
          subgroup.push(subnode);
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_transition(subgroups, ns, id);
  };
  d3_transitionPrototype.selectAll = function(selector) {
    var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnodes, node, subnode, transition;
    selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          transition = node[ns][id];
          subnodes = selector.call(node, node.__data__, i, j);
          subgroups.push(subgroup = []);
          for (var k = -1, o = subnodes.length; ++k < o; ) {
            if (subnode = subnodes[k]) d3_transitionNode(subnode, k, ns, id, transition);
            subgroup.push(subnode);
          }
        }
      }
    }
    return d3_transition(subgroups, ns, id);
  };
  d3_transitionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
          subgroup.push(node);
        }
      }
    }
    return d3_transition(subgroups, this.namespace, this.id);
  };
  d3_transitionPrototype.tween = function(name, tween) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 2) return this.node()[ns][id].tween.get(name);
    return d3_selection_each(this, tween == null ? function(node) {
      node[ns][id].tween.remove(name);
    } : function(node) {
      node[ns][id].tween.set(name, tween);
    });
  };
  function d3_transition_tween(groups, name, value, tween) {
    var id = groups.id, ns = groups.namespace;
    return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
      node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
    } : (value = tween(value), function(node) {
      node[ns][id].tween.set(name, value);
    }));
  }
  d3_transitionPrototype.attr = function(nameNS, value) {
    if (arguments.length < 2) {
      for (value in nameNS) this.attr(value, nameNS[value]);
      return this;
    }
    var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate, name = d3.ns.qualify(nameNS);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrTween(b) {
      return b == null ? attrNull : (b += "", function() {
        var a = this.getAttribute(name), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttribute(name, i(t));
        });
      });
    }
    function attrTweenNS(b) {
      return b == null ? attrNullNS : (b += "", function() {
        var a = this.getAttributeNS(name.space, name.local), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttributeNS(name.space, name.local, i(t));
        });
      });
    }
    return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.attrTween = function(nameNS, tween) {
    var name = d3.ns.qualify(nameNS);
    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return f && function(t) {
        this.setAttribute(name, f(t));
      };
    }
    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return f && function(t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }
    return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.style(priority, name[priority], value);
        return this;
      }
      priority = "";
    }
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleString(b) {
      return b == null ? styleNull : (b += "", function() {
        var a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name), i;
        return a !== b && (i = d3_interpolate(a, b), function(t) {
          this.style.setProperty(name, i(t), priority);
        });
      });
    }
    return d3_transition_tween(this, "style." + name, value, styleString);
  };
  d3_transitionPrototype.styleTween = function(name, tween, priority) {
    if (arguments.length < 3) priority = "";
    function styleTween(d, i) {
      var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
      return f && function(t) {
        this.style.setProperty(name, f(t), priority);
      };
    }
    return this.tween("style." + name, styleTween);
  };
  d3_transitionPrototype.text = function(value) {
    return d3_transition_tween(this, "text", value, d3_transition_text);
  };
  function d3_transition_text(b) {
    if (b == null) b = "";
    return function() {
      this.textContent = b;
    };
  }
  d3_transitionPrototype.remove = function() {
    var ns = this.namespace;
    return this.each("end.transition", function() {
      var p;
      if (this[ns].count < 2 && (p = this.parentNode)) p.removeChild(this);
    });
  };
  d3_transitionPrototype.ease = function(value) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].ease;
    if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
    return d3_selection_each(this, function(node) {
      node[ns][id].ease = value;
    });
  };
  d3_transitionPrototype.delay = function(value) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].delay;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node[ns][id].delay = +value.call(node, node.__data__, i, j);
    } : (value = +value, function(node) {
      node[ns][id].delay = value;
    }));
  };
  d3_transitionPrototype.duration = function(value) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].duration;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
    } : (value = Math.max(1, value), function(node) {
      node[ns][id].duration = value;
    }));
  };
  d3_transitionPrototype.each = function(type, listener) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 2) {
      var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
      try {
        d3_transitionInheritId = id;
        d3_selection_each(this, function(node, i, j) {
          d3_transitionInherit = node[ns][id];
          type.call(node, node.__data__, i, j);
        });
      } finally {
        d3_transitionInherit = inherit;
        d3_transitionInheritId = inheritId;
      }
    } else {
      d3_selection_each(this, function(node) {
        var transition = node[ns][id];
        (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener);
      });
    }
    return this;
  };
  d3_transitionPrototype.transition = function() {
    var id0 = this.id, id1 = ++d3_transitionId, ns = this.namespace, subgroups = [], subgroup, group, node, transition;
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          transition = node[ns][id0];
          d3_transitionNode(node, i, ns, id1, {
            time: transition.time,
            ease: transition.ease,
            delay: transition.delay + transition.duration,
            duration: transition.duration
          });
        }
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, ns, id1);
  };
  function d3_transitionNamespace(name) {
    return name == null ? "__transition__" : "__transition_" + name + "__";
  }
  function d3_transitionNode(node, i, ns, id, inherit) {
    var lock = node[ns] || (node[ns] = {
      active: 0,
      count: 0
    }), transition = lock[id], time, timer, duration, ease, tweens;
    function schedule(elapsed) {
      var delay = transition.delay;
      timer.t = delay + time;
      if (delay <= elapsed) return start(elapsed - delay);
      timer.c = start;
    }
    function start(elapsed) {
      var activeId = lock.active, active = lock[activeId];
      if (active) {
        active.timer.c = null;
        active.timer.t = NaN;
        --lock.count;
        delete lock[activeId];
        active.event && active.event.interrupt.call(node, node.__data__, active.index);
      }
      for (var cancelId in lock) {
        if (+cancelId < id) {
          var cancel = lock[cancelId];
          cancel.timer.c = null;
          cancel.timer.t = NaN;
          --lock.count;
          delete lock[cancelId];
        }
      }
      timer.c = tick;
      d3_timer(function() {
        if (timer.c && tick(elapsed || 1)) {
          timer.c = null;
          timer.t = NaN;
        }
        return 1;
      }, 0, time);
      lock.active = id;
      transition.event && transition.event.start.call(node, node.__data__, i);
      tweens = [];
      transition.tween.forEach(function(key, value) {
        if (value = value.call(node, node.__data__, i)) {
          tweens.push(value);
        }
      });
      ease = transition.ease;
      duration = transition.duration;
    }
    function tick(elapsed) {
      var t = elapsed / duration, e = ease(t), n = tweens.length;
      while (n > 0) {
        tweens[--n].call(node, e);
      }
      if (t >= 1) {
        transition.event && transition.event.end.call(node, node.__data__, i);
        if (--lock.count) delete lock[id]; else delete node[ns];
        return 1;
      }
    }
    if (!transition) {
      time = inherit.time;
      timer = d3_timer(schedule, 0, time);
      transition = lock[id] = {
        tween: new d3_Map(),
        time: time,
        timer: timer,
        delay: inherit.delay,
        duration: inherit.duration,
        ease: inherit.ease,
        index: i
      };
      inherit = null;
      ++lock.count;
    }
  }
  d3.svg.axis = function() {
    var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_;
    function axis(g) {
      g.each(function() {
        var g = d3.select(this);
        var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = scale.copy();
        var ticks = tickValues == null ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues, tickFormat = tickFormat_ == null ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_, tick = g.selectAll(".tick").data(ticks, scale1), tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ε), tickExit = d3.transition(tick.exit()).style("opacity", ε).remove(), tickUpdate = d3.transition(tick.order()).style("opacity", 1), tickSpacing = Math.max(innerTickSize, 0) + tickPadding, tickTransform;
        var range = d3_scaleRange(scale1), path = g.selectAll(".domain").data([ 0 ]), pathUpdate = (path.enter().append("path").attr("class", "domain"), 
        d3.transition(path));
        tickEnter.append("line");
        tickEnter.append("text");
        var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text"), sign = orient === "top" || orient === "left" ? -1 : 1, x1, x2, y1, y2;
        if (orient === "bottom" || orient === "top") {
          tickTransform = d3_svg_axisX, x1 = "x", y1 = "y", x2 = "x2", y2 = "y2";
          text.attr("dy", sign < 0 ? "0em" : ".71em").style("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize);
        } else {
          tickTransform = d3_svg_axisY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2";
          text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start");
          pathUpdate.attr("d", "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize);
        }
        lineEnter.attr(y2, sign * innerTickSize);
        textEnter.attr(y1, sign * tickSpacing);
        lineUpdate.attr(x2, 0).attr(y2, sign * innerTickSize);
        textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);
        if (scale1.rangeBand) {
          var x = scale1, dx = x.rangeBand() / 2;
          scale0 = scale1 = function(d) {
            return x(d) + dx;
          };
        } else if (scale0.rangeBand) {
          scale0 = scale1;
        } else {
          tickExit.call(tickTransform, scale1, scale0);
        }
        tickEnter.call(tickTransform, scale0, scale1);
        tickUpdate.call(tickTransform, scale1, scale1);
      });
    }
    axis.scale = function(x) {
      if (!arguments.length) return scale;
      scale = x;
      return axis;
    };
    axis.orient = function(x) {
      if (!arguments.length) return orient;
      orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
      return axis;
    };
    axis.ticks = function() {
      if (!arguments.length) return tickArguments_;
      tickArguments_ = d3_array(arguments);
      return axis;
    };
    axis.tickValues = function(x) {
      if (!arguments.length) return tickValues;
      tickValues = x;
      return axis;
    };
    axis.tickFormat = function(x) {
      if (!arguments.length) return tickFormat_;
      tickFormat_ = x;
      return axis;
    };
    axis.tickSize = function(x) {
      var n = arguments.length;
      if (!n) return innerTickSize;
      innerTickSize = +x;
      outerTickSize = +arguments[n - 1];
      return axis;
    };
    axis.innerTickSize = function(x) {
      if (!arguments.length) return innerTickSize;
      innerTickSize = +x;
      return axis;
    };
    axis.outerTickSize = function(x) {
      if (!arguments.length) return outerTickSize;
      outerTickSize = +x;
      return axis;
    };
    axis.tickPadding = function(x) {
      if (!arguments.length) return tickPadding;
      tickPadding = +x;
      return axis;
    };
    axis.tickSubdivide = function() {
      return arguments.length && axis;
    };
    return axis;
  };
  var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  };
  function d3_svg_axisX(selection, x0, x1) {
    selection.attr("transform", function(d) {
      var v0 = x0(d);
      return "translate(" + (isFinite(v0) ? v0 : x1(d)) + ",0)";
    });
  }
  function d3_svg_axisY(selection, y0, y1) {
    selection.attr("transform", function(d) {
      var v0 = y0(d);
      return "translate(0," + (isFinite(v0) ? v0 : y1(d)) + ")";
    });
  }
  d3.svg.brush = function() {
    var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, xExtent = [ 0, 0 ], yExtent = [ 0, 0 ], xExtentDomain, yExtentDomain, xClamp = true, yClamp = true, resizes = d3_svg_brushResizes[0];
    function brush(g) {
      g.each(function() {
        var g = d3.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
        var background = g.selectAll(".background").data([ 0 ]);
        background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
        g.selectAll(".extent").data([ 0 ]).enter().append("rect").attr("class", "extent").style("cursor", "move");
        var resize = g.selectAll(".resize").data(resizes, d3_identity);
        resize.exit().remove();
        resize.enter().append("g").attr("class", function(d) {
          return "resize " + d;
        }).style("cursor", function(d) {
          return d3_svg_brushCursor[d];
        }).append("rect").attr("x", function(d) {
          return /[ew]$/.test(d) ? -3 : null;
        }).attr("y", function(d) {
          return /^[ns]/.test(d) ? -3 : null;
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
        resize.style("display", brush.empty() ? "none" : null);
        var gUpdate = d3.transition(g), backgroundUpdate = d3.transition(background), range;
        if (x) {
          range = d3_scaleRange(x);
          backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]);
          redrawX(gUpdate);
        }
        if (y) {
          range = d3_scaleRange(y);
          backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]);
          redrawY(gUpdate);
        }
        redraw(gUpdate);
      });
    }
    brush.event = function(g) {
      g.each(function() {
        var event_ = event.of(this, arguments), extent1 = {
          x: xExtent,
          y: yExtent,
          i: xExtentDomain,
          j: yExtentDomain
        }, extent0 = this.__chart__ || extent1;
        this.__chart__ = extent1;
        if (d3_transitionInheritId) {
          d3.select(this).transition().each("start.brush", function() {
            xExtentDomain = extent0.i;
            yExtentDomain = extent0.j;
            xExtent = extent0.x;
            yExtent = extent0.y;
            event_({
              type: "brushstart"
            });
          }).tween("brush:brush", function() {
            var xi = d3_interpolateArray(xExtent, extent1.x), yi = d3_interpolateArray(yExtent, extent1.y);
            xExtentDomain = yExtentDomain = null;
            return function(t) {
              xExtent = extent1.x = xi(t);
              yExtent = extent1.y = yi(t);
              event_({
                type: "brush",
                mode: "resize"
              });
            };
          }).each("end.brush", function() {
            xExtentDomain = extent1.i;
            yExtentDomain = extent1.j;
            event_({
              type: "brush",
              mode: "resize"
            });
            event_({
              type: "brushend"
            });
          });
        } else {
          event_({
            type: "brushstart"
          });
          event_({
            type: "brush",
            mode: "resize"
          });
          event_({
            type: "brushend"
          });
        }
      });
    };
    function redraw(g) {
      g.selectAll(".resize").attr("transform", function(d) {
        return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")";
      });
    }
    function redrawX(g) {
      g.select(".extent").attr("x", xExtent[0]);
      g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0]);
    }
    function redrawY(g) {
      g.select(".extent").attr("y", yExtent[0]);
      g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0]);
    }
    function brushstart() {
      var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(target), center, origin = d3.mouse(target), offset;
      var w = d3.select(d3_window(target)).on("keydown.brush", keydown).on("keyup.brush", keyup);
      if (d3.event.changedTouches) {
        w.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
      } else {
        w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
      }
      g.interrupt().selectAll("*").interrupt();
      if (dragging) {
        origin[0] = xExtent[0] - origin[0];
        origin[1] = yExtent[0] - origin[1];
      } else if (resizing) {
        var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
        offset = [ xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1] ];
        origin[0] = xExtent[ex];
        origin[1] = yExtent[ey];
      } else if (d3.event.altKey) center = origin.slice();
      g.style("pointer-events", "none").selectAll(".resize").style("display", null);
      d3.select("body").style("cursor", eventTarget.style("cursor"));
      event_({
        type: "brushstart"
      });
      brushmove();
      function keydown() {
        if (d3.event.keyCode == 32) {
          if (!dragging) {
            center = null;
            origin[0] -= xExtent[1];
            origin[1] -= yExtent[1];
            dragging = 2;
          }
          d3_eventPreventDefault();
        }
      }
      function keyup() {
        if (d3.event.keyCode == 32 && dragging == 2) {
          origin[0] += xExtent[1];
          origin[1] += yExtent[1];
          dragging = 0;
          d3_eventPreventDefault();
        }
      }
      function brushmove() {
        var point = d3.mouse(target), moved = false;
        if (offset) {
          point[0] += offset[0];
          point[1] += offset[1];
        }
        if (!dragging) {
          if (d3.event.altKey) {
            if (!center) center = [ (xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2 ];
            origin[0] = xExtent[+(point[0] < center[0])];
            origin[1] = yExtent[+(point[1] < center[1])];
          } else center = null;
        }
        if (resizingX && move1(point, x, 0)) {
          redrawX(g);
          moved = true;
        }
        if (resizingY && move1(point, y, 1)) {
          redrawY(g);
          moved = true;
        }
        if (moved) {
          redraw(g);
          event_({
            type: "brush",
            mode: dragging ? "move" : "resize"
          });
        }
      }
      function move1(point, scale, i) {
        var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], extent = i ? yExtent : xExtent, size = extent[1] - extent[0], min, max;
        if (dragging) {
          r0 -= position;
          r1 -= size + position;
        }
        min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i];
        if (dragging) {
          max = (min += position) + size;
        } else {
          if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
          if (position < min) {
            max = min;
            min = position;
          } else {
            max = position;
          }
        }
        if (extent[0] != min || extent[1] != max) {
          if (i) yExtentDomain = null; else xExtentDomain = null;
          extent[0] = min;
          extent[1] = max;
          return true;
        }
      }
      function brushend() {
        brushmove();
        g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
        d3.select("body").style("cursor", null);
        w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
        dragRestore();
        event_({
          type: "brushend"
        });
      }
    }
    brush.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.clamp = function(z) {
      if (!arguments.length) return x && y ? [ xClamp, yClamp ] : x ? xClamp : y ? yClamp : null;
      if (x && y) xClamp = !!z[0], yClamp = !!z[1]; else if (x) xClamp = !!z; else if (y) yClamp = !!z;
      return brush;
    };
    brush.extent = function(z) {
      var x0, x1, y0, y1, t;
      if (!arguments.length) {
        if (x) {
          if (xExtentDomain) {
            x0 = xExtentDomain[0], x1 = xExtentDomain[1];
          } else {
            x0 = xExtent[0], x1 = xExtent[1];
            if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
            if (x1 < x0) t = x0, x0 = x1, x1 = t;
          }
        }
        if (y) {
          if (yExtentDomain) {
            y0 = yExtentDomain[0], y1 = yExtentDomain[1];
          } else {
            y0 = yExtent[0], y1 = yExtent[1];
            if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
            if (y1 < y0) t = y0, y0 = y1, y1 = t;
          }
        }
        return x && y ? [ [ x0, y0 ], [ x1, y1 ] ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
      }
      if (x) {
        x0 = z[0], x1 = z[1];
        if (y) x0 = x0[0], x1 = x1[0];
        xExtentDomain = [ x0, x1 ];
        if (x.invert) x0 = x(x0), x1 = x(x1);
        if (x1 < x0) t = x0, x0 = x1, x1 = t;
        if (x0 != xExtent[0] || x1 != xExtent[1]) xExtent = [ x0, x1 ];
      }
      if (y) {
        y0 = z[0], y1 = z[1];
        if (x) y0 = y0[1], y1 = y1[1];
        yExtentDomain = [ y0, y1 ];
        if (y.invert) y0 = y(y0), y1 = y(y1);
        if (y1 < y0) t = y0, y0 = y1, y1 = t;
        if (y0 != yExtent[0] || y1 != yExtent[1]) yExtent = [ y0, y1 ];
      }
      return brush;
    };
    brush.clear = function() {
      if (!brush.empty()) {
        xExtent = [ 0, 0 ], yExtent = [ 0, 0 ];
        xExtentDomain = yExtentDomain = null;
      }
      return brush;
    };
    brush.empty = function() {
      return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1];
    };
    return d3.rebind(brush, event, "on");
  };
  var d3_svg_brushCursor = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  };
  var d3_svg_brushResizes = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ];
  var d3_time_format = d3_time.format = d3_locale_enUS.timeFormat;
  var d3_time_formatUtc = d3_time_format.utc;
  var d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
  d3_time_format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;
  function d3_time_formatIsoNative(date) {
    return date.toISOString();
  }
  d3_time_formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };
  d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
  d3_time.second = d3_time_interval(function(date) {
    return new d3_date(Math.floor(date / 1e3) * 1e3);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 1e3);
  }, function(date) {
    return date.getSeconds();
  });
  d3_time.seconds = d3_time.second.range;
  d3_time.seconds.utc = d3_time.second.utc.range;
  d3_time.minute = d3_time_interval(function(date) {
    return new d3_date(Math.floor(date / 6e4) * 6e4);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 6e4);
  }, function(date) {
    return date.getMinutes();
  });
  d3_time.minutes = d3_time.minute.range;
  d3_time.minutes.utc = d3_time.minute.utc.range;
  d3_time.hour = d3_time_interval(function(date) {
    var timezone = date.getTimezoneOffset() / 60;
    return new d3_date((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 36e5);
  }, function(date) {
    return date.getHours();
  });
  d3_time.hours = d3_time.hour.range;
  d3_time.hours.utc = d3_time.hour.utc.range;
  d3_time.month = d3_time_interval(function(date) {
    date = d3_time.day(date);
    date.setDate(1);
    return date;
  }, function(date, offset) {
    date.setMonth(date.getMonth() + offset);
  }, function(date) {
    return date.getMonth();
  });
  d3_time.months = d3_time.month.range;
  d3_time.months.utc = d3_time.month.utc.range;
  function d3_time_scale(linear, methods, format) {
    function scale(x) {
      return linear(x);
    }
    scale.invert = function(x) {
      return d3_time_scaleDate(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
      linear.domain(x);
      return scale;
    };
    function tickMethod(extent, count) {
      var span = extent[1] - extent[0], target = span / count, i = d3.bisect(d3_time_scaleSteps, target);
      return i == d3_time_scaleSteps.length ? [ methods.year, d3_scale_linearTickRange(extent.map(function(d) {
        return d / 31536e6;
      }), count)[2] ] : !i ? [ d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2] ] : methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i];
    }
    scale.nice = function(interval, skip) {
      var domain = scale.domain(), extent = d3_scaleExtent(domain), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" && tickMethod(extent, interval);
      if (method) interval = method[0], skip = method[1];
      function skipped(date) {
        return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length;
      }
      return scale.domain(d3_scale_nice(domain, skip > 1 ? {
        floor: function(date) {
          while (skipped(date = interval.floor(date))) date = d3_time_scaleDate(date - 1);
          return date;
        },
        ceil: function(date) {
          while (skipped(date = interval.ceil(date))) date = d3_time_scaleDate(+date + 1);
          return date;
        }
      } : interval));
    };
    scale.ticks = function(interval, skip) {
      var extent = d3_scaleExtent(scale.domain()), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" ? tickMethod(extent, interval) : !interval.range && [ {
        range: interval
      }, skip ];
      if (method) interval = method[0], skip = method[1];
      return interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip);
    };
    scale.tickFormat = function() {
      return format;
    };
    scale.copy = function() {
      return d3_time_scale(linear.copy(), methods, format);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_time_scaleDate(t) {
    return new Date(t);
  }
  var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
  var d3_time_scaleLocalMethods = [ [ d3_time.second, 1 ], [ d3_time.second, 5 ], [ d3_time.second, 15 ], [ d3_time.second, 30 ], [ d3_time.minute, 1 ], [ d3_time.minute, 5 ], [ d3_time.minute, 15 ], [ d3_time.minute, 30 ], [ d3_time.hour, 1 ], [ d3_time.hour, 3 ], [ d3_time.hour, 6 ], [ d3_time.hour, 12 ], [ d3_time.day, 1 ], [ d3_time.day, 2 ], [ d3_time.week, 1 ], [ d3_time.month, 1 ], [ d3_time.month, 3 ], [ d3_time.year, 1 ] ];
  var d3_time_scaleLocalFormat = d3_time_format.multi([ [ ".%L", function(d) {
    return d.getMilliseconds();
  } ], [ ":%S", function(d) {
    return d.getSeconds();
  } ], [ "%I:%M", function(d) {
    return d.getMinutes();
  } ], [ "%I %p", function(d) {
    return d.getHours();
  } ], [ "%a %d", function(d) {
    return d.getDay() && d.getDate() != 1;
  } ], [ "%b %d", function(d) {
    return d.getDate() != 1;
  } ], [ "%B", function(d) {
    return d.getMonth();
  } ], [ "%Y", d3_true ] ]);
  var d3_time_scaleMilliseconds = {
    range: function(start, stop, step) {
      return d3.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate);
    },
    floor: d3_identity,
    ceil: d3_identity
  };
  d3_time_scaleLocalMethods.year = d3_time.year;
  d3_time.scale = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
  };
  var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function(m) {
    return [ m[0].utc, m[1] ];
  });
  var d3_time_scaleUtcFormat = d3_time_formatUtc.multi([ [ ".%L", function(d) {
    return d.getUTCMilliseconds();
  } ], [ ":%S", function(d) {
    return d.getUTCSeconds();
  } ], [ "%I:%M", function(d) {
    return d.getUTCMinutes();
  } ], [ "%I %p", function(d) {
    return d.getUTCHours();
  } ], [ "%a %d", function(d) {
    return d.getUTCDay() && d.getUTCDate() != 1;
  } ], [ "%b %d", function(d) {
    return d.getUTCDate() != 1;
  } ], [ "%B", function(d) {
    return d.getUTCMonth();
  } ], [ "%Y", d3_true ] ]);
  d3_time_scaleUtcMethods.year = d3_time.year.utc;
  d3_time.scale.utc = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat);
  };
  d3.text = d3_xhrType(function(request) {
    return request.responseText;
  });
  d3.json = function(url, callback) {
    return d3_xhr(url, "application/json", d3_json, callback);
  };
  function d3_json(request) {
    return JSON.parse(request.responseText);
  }
  d3.html = function(url, callback) {
    return d3_xhr(url, "text/html", d3_html, callback);
  };
  function d3_html(request) {
    var range = d3_document.createRange();
    range.selectNode(d3_document.body);
    return range.createContextualFragment(request.responseText);
  }
  d3.xml = d3_xhrType(function(request) {
    return request.responseXML;
  });
  if (true) this.d3 = d3, !(__WEBPACK_AMD_DEFINE_FACTORY__ = (d3),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); else if (typeof module === "object" && module.exports) module.exports = d3; else this.d3 = d3;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.topojson = global.topojson || {})));
}(this, (function (exports) { 'use strict';

function noop() {}

function transformAbsolute(transform) {
  if (!transform) return noop;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(point, i) {
    if (!i) x0 = y0 = 0;
    point[0] = (x0 += point[0]) * kx + dx;
    point[1] = (y0 += point[1]) * ky + dy;
  };
}

function transformRelative(transform) {
  if (!transform) return noop;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(point, i) {
    if (!i) x0 = y0 = 0;
    var x1 = Math.round((point[0] - dx) / kx),
        y1 = Math.round((point[1] - dy) / ky);
    point[0] = x1 - x0;
    point[1] = y1 - y0;
    x0 = x1;
    y0 = y1;
  };
}

function reverse(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
}

function bisect(a, x) {
  var lo = 0, hi = a.length;
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function feature(topology, o) {
  return o.type === "GeometryCollection" ? {
    type: "FeatureCollection",
    features: o.geometries.map(function(o) { return feature$1(topology, o); })
  } : feature$1(topology, o);
}

function feature$1(topology, o) {
  var f = {
    type: "Feature",
    id: o.id,
    properties: o.properties || {},
    geometry: object(topology, o)
  };
  if (o.id == null) delete f.id;
  return f;
}

function object(topology, o) {
  var absolute = transformAbsolute(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();
    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length, p; k < n; ++k) {
      points.push(p = a[k].slice());
      absolute(p, k);
    }
    if (i < 0) reverse(points, n);
  }

  function point(p) {
    p = p.slice();
    absolute(p, 0);
    return p;
  }

  function line(arcs) {
    var points = [];
    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
    if (points.length < 2) points.push(points[0].slice());
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) points.push(points[0].slice());
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var t = o.type;
    return t === "GeometryCollection" ? {type: t, geometries: o.geometries.map(geometry)}
        : t in geometryType ? {type: t, coordinates: geometryType[t](o)}
        : null;
  }

  var geometryType = {
    Point: function(o) { return point(o.coordinates); },
    MultiPoint: function(o) { return o.coordinates.map(point); },
    LineString: function(o) { return line(o.arcs); },
    MultiLineString: function(o) { return o.arcs.map(line); },
    Polygon: function(o) { return polygon(o.arcs); },
    MultiPolygon: function(o) { return o.arcs.map(polygon); }
  };

  return geometry(o);
}

function stitchArcs(topology, arcs) {
  var stitchedArcs = {},
      fragmentByStart = {},
      fragmentByEnd = {},
      fragments = [],
      emptyIndex = -1;

  // Stitch empty arcs first, since they may be subsumed by other arcs.
  arcs.forEach(function(i, j) {
    var arc = topology.arcs[i < 0 ? ~i : i], t;
    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
    }
  });

  arcs.forEach(function(i) {
    var e = ends(i),
        start = e[0],
        end = e[1],
        f, g;

    if (f = fragmentByEnd[start]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;
      if (g = fragmentByStart[end]) {
        delete fragmentByStart[g.start];
        var fg = g === f ? f : f.concat(g);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start;
      if (g = fragmentByEnd[start]) {
        delete fragmentByEnd[g.end];
        var gf = g === f ? f : g.concat(f);
        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
    }
  });

  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
    else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p0] : [p0, p1];
  }

  function flush(fragmentByEnd, fragmentByStart) {
    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete fragmentByStart[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
      fragments.push(f);
    }
  }

  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

  return fragments;
}

function mesh(topology) {
  return object(topology, meshArcs.apply(this, arguments));
}

function meshArcs(topology, o, filter) {
  var arcs = [];

  function arc(i) {
    var j = i < 0 ? ~i : i;
    (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
  }

  function line(arcs) {
    arcs.forEach(arc);
  }

  function polygon(arcs) {
    arcs.forEach(line);
  }

  function geometry(o) {
    if (o.type === "GeometryCollection") o.geometries.forEach(geometry);
    else if (o.type in geometryType) geom = o, geometryType[o.type](o.arcs);
  }

  if (arguments.length > 1) {
    var geomsByArc = [],
        geom;

    var geometryType = {
      LineString: line,
      MultiLineString: polygon,
      Polygon: polygon,
      MultiPolygon: function(arcs) { arcs.forEach(polygon); }
    };

    geometry(o);

    geomsByArc.forEach(arguments.length < 3
        ? function(geoms) { arcs.push(geoms[0].i); }
        : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });
  } else {
    for (var i = 0, n = topology.arcs.length; i < n; ++i) arcs.push(i);
  }

  return {type: "MultiLineString", arcs: stitchArcs(topology, arcs)};
}

function cartesianTriangleArea(triangle) {
  var a = triangle[0], b = triangle[1], c = triangle[2];
  return Math.abs((a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]));
}

function ring(ring) {
  var i = -1,
      n = ring.length,
      a,
      b = ring[n - 1],
      area = 0;

  while (++i < n) {
    a = b;
    b = ring[i];
    area += a[0] * b[1] - a[1] * b[0];
  }

  return area / 2;
}

function merge(topology) {
  return object(topology, mergeArcs.apply(this, arguments));
}

function mergeArcs(topology, objects) {
  var polygonsByArc = {},
      polygons = [],
      components = [];

  objects.forEach(function(o) {
    if (o.type === "Polygon") register(o.arcs);
    else if (o.type === "MultiPolygon") o.arcs.forEach(register);
  });

  function register(polygon) {
    polygon.forEach(function(ring$$) {
      ring$$.forEach(function(arc) {
        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
      });
    });
    polygons.push(polygon);
  }

  function area(ring$$) {
    return Math.abs(ring(object(topology, {type: "Polygon", arcs: [ring$$]}).coordinates[0]));
  }

  polygons.forEach(function(polygon) {
    if (!polygon._) {
      var component = [],
          neighbors = [polygon];
      polygon._ = 1;
      components.push(component);
      while (polygon = neighbors.pop()) {
        component.push(polygon);
        polygon.forEach(function(ring$$) {
          ring$$.forEach(function(arc) {
            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
              if (!polygon._) {
                polygon._ = 1;
                neighbors.push(polygon);
              }
            });
          });
        });
      }
    }
  });

  polygons.forEach(function(polygon) {
    delete polygon._;
  });

  return {
    type: "MultiPolygon",
    arcs: components.map(function(polygons) {
      var arcs = [], n;

      // Extract the exterior (unique) arcs.
      polygons.forEach(function(polygon) {
        polygon.forEach(function(ring$$) {
          ring$$.forEach(function(arc) {
            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
              arcs.push(arc);
            }
          });
        });
      });

      // Stitch the arcs into one or more rings.
      arcs = stitchArcs(topology, arcs);

      // If more than one ring is returned,
      // at most one of these rings can be the exterior;
      // choose the one with the greatest absolute area.
      if ((n = arcs.length) > 1) {
        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
          if ((ki = area(arcs[i])) > k) {
            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
          }
        }
      }

      return arcs;
    })
  };
}

function neighbors(objects) {
  var indexesByArc = {}, // arc index -> array of object indexes
      neighbors = objects.map(function() { return []; });

  function line(arcs, i) {
    arcs.forEach(function(a) {
      if (a < 0) a = ~a;
      var o = indexesByArc[a];
      if (o) o.push(i);
      else indexesByArc[a] = [i];
    });
  }

  function polygon(arcs, i) {
    arcs.forEach(function(arc) { line(arc, i); });
  }

  function geometry(o, i) {
    if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
    else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
  }

  var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
  };

  objects.forEach(geometry);

  for (var i in indexesByArc) {
    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
      for (var k = j + 1; k < m; ++k) {
        var ij = indexes[j], ik = indexes[k], n;
        if ((n = neighbors[ij])[i = bisect(n, ik)] !== ik) n.splice(i, 0, ik);
        if ((n = neighbors[ik])[i = bisect(n, ij)] !== ij) n.splice(i, 0, ij);
      }
    }
  }

  return neighbors;
}

function compareArea(a, b) {
  return a[1][2] - b[1][2];
}

function minAreaHeap() {
  var heap = {},
      array = [],
      size = 0;

  heap.push = function(object) {
    up(array[object._ = size] = object, size++);
    return size;
  };

  heap.pop = function() {
    if (size <= 0) return;
    var removed = array[0], object;
    if (--size > 0) object = array[size], down(array[object._ = 0] = object, 0);
    return removed;
  };

  heap.remove = function(removed) {
    var i = removed._, object;
    if (array[i] !== removed) return; // invalid request
    if (i !== --size) object = array[size], (compareArea(object, removed) < 0 ? up : down)(array[object._ = i] = object, i);
    return i;
  };

  function up(object, i) {
    while (i > 0) {
      var j = ((i + 1) >> 1) - 1,
          parent = array[j];
      if (compareArea(object, parent) >= 0) break;
      array[parent._ = i] = parent;
      array[object._ = i = j] = object;
    }
  }

  function down(object, i) {
    while (true) {
      var r = (i + 1) << 1,
          l = r - 1,
          j = i,
          child = array[j];
      if (l < size && compareArea(array[l], child) < 0) child = array[j = l];
      if (r < size && compareArea(array[r], child) < 0) child = array[j = r];
      if (j === i) break;
      array[child._ = i] = child;
      array[object._ = i = j] = object;
    }
  }

  return heap;
}

function presimplify(topology, triangleArea) {
  var absolute = transformAbsolute(topology.transform),
      relative = transformRelative(topology.transform),
      heap = minAreaHeap();

  if (!triangleArea) triangleArea = cartesianTriangleArea;

  topology.arcs.forEach(function(arc) {
    var triangles = [],
        maxArea = 0,
        triangle,
        i,
        n,
        p;

    // To store each point’s effective area, we create a new array rather than
    // extending the passed-in point to workaround a Chrome/V8 bug (getting
    // stuck in smi mode). For midpoints, the initial effective area of
    // Infinity will be computed in the next step.
    for (i = 0, n = arc.length; i < n; ++i) {
      p = arc[i];
      absolute(arc[i] = [p[0], p[1], Infinity], i);
    }

    for (i = 1, n = arc.length - 1; i < n; ++i) {
      triangle = arc.slice(i - 1, i + 2);
      triangle[1][2] = triangleArea(triangle);
      triangles.push(triangle);
      heap.push(triangle);
    }

    for (i = 0, n = triangles.length; i < n; ++i) {
      triangle = triangles[i];
      triangle.previous = triangles[i - 1];
      triangle.next = triangles[i + 1];
    }

    while (triangle = heap.pop()) {
      var previous = triangle.previous,
          next = triangle.next;

      // If the area of the current point is less than that of the previous point
      // to be eliminated, use the latter's area instead. This ensures that the
      // current point cannot be eliminated without eliminating previously-
      // eliminated points.
      if (triangle[1][2] < maxArea) triangle[1][2] = maxArea;
      else maxArea = triangle[1][2];

      if (previous) {
        previous.next = next;
        previous[2] = triangle[2];
        update(previous);
      }

      if (next) {
        next.previous = previous;
        next[0] = triangle[0];
        update(next);
      }
    }

    arc.forEach(relative);
  });

  function update(triangle) {
    heap.remove(triangle);
    triangle[1][2] = triangleArea(triangle);
    heap.push(triangle);
  }

  return topology;
}

var version = "1.6.27";

exports.version = version;
exports.mesh = mesh;
exports.meshArcs = meshArcs;
exports.merge = merge;
exports.mergeArcs = mergeArcs;
exports.feature = feature;
exports.neighbors = neighbors;
exports.presimplify = presimplify;

Object.defineProperty(exports, '__esModule', { value: true });

})));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.2.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=Array.isArray(d)))?(e?(e=!1,f=c&&Array.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext;function B(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()}var C=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,D=/^.[^:#\[\.,]*$/;function E(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):D.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(E(this,a||[],!1))},not:function(a){return this.pushStack(E(this,a||[],!0))},is:function(a){return!!E(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var F,G=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,H=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||F,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:G.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),C.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};H.prototype=r.fn,F=r(d);var I=/^(?:parents|prev(?:Until|All))/,J={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function K(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return K(a,"nextSibling")},prev:function(a){return K(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return B(a,"iframe")?a.contentDocument:(B(a,"template")&&(a=a.content||a),r.merge([],a.childNodes))}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(J[a]||r.uniqueSort(e),I.test(a)&&e.reverse()),this.pushStack(e)}});var L=/[^\x20\t\r\n\f]+/g;function M(a){var b={};return r.each(a.match(L)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?M(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=e||a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function N(a){return a}function O(a){throw a}function P(a,b,c,d){var e;try{a&&r.isFunction(e=a.promise)?e.call(a).done(b).fail(c):a&&r.isFunction(e=a.then)?e.call(a,b,c):b.apply(void 0,[a].slice(d))}catch(a){c.apply(void 0,[a])}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,N,e),g(f,c,O,e)):(f++,j.call(a,g(f,c,N,e),g(f,c,O,e),g(f,c,N,c.notifyWith))):(d!==N&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==O&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:N,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:N)),c[2][3].add(g(0,a,r.isFunction(d)?d:O))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(P(a,g.done(h(c)).resolve,g.reject,!b),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)P(e[c],h(c),g.reject);return g.promise()}});var Q=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&Q.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var R=r.Deferred();r.fn.ready=function(a){return R.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||R.resolveWith(d,[r]))}}),r.ready.then=R.then;function S(){d.removeEventListener("DOMContentLoaded",S),
a.removeEventListener("load",S),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",S),a.addEventListener("load",S));var T=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)T(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},U=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function V(){this.expando=r.expando+V.uid++}V.uid=1,V.prototype={cache:function(a){var b=a[this.expando];return b||(b={},U(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){Array.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(L)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var W=new V,X=new V,Y=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function $(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:Y.test(a)?JSON.parse(a):a)}function _(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Z,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=$(c)}catch(e){}X.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return X.hasData(a)||W.hasData(a)},data:function(a,b,c){return X.access(a,b,c)},removeData:function(a,b){X.remove(a,b)},_data:function(a,b,c){return W.access(a,b,c)},_removeData:function(a,b){W.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=X.get(f),1===f.nodeType&&!W.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),_(f,d,e[d])));W.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){X.set(this,a)}):T(this,function(b){var c;if(f&&void 0===b){if(c=X.get(f,a),void 0!==c)return c;if(c=_(f,a),void 0!==c)return c}else this.each(function(){X.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){X.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=W.get(a,b),c&&(!d||Array.isArray(c)?d=W.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return W.get(a,c)||W.access(a,c,{empty:r.Callbacks("once memory").add(function(){W.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=W.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var aa=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ba=new RegExp("^(?:([+-])=|)("+aa+")([a-z%]*)$","i"),ca=["Top","Right","Bottom","Left"],da=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ea=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function fa(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&ba.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ga={};function ha(a){var b,c=a.ownerDocument,d=a.nodeName,e=ga[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ga[d]=e,e)}function ia(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=W.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&da(d)&&(e[f]=ha(d))):"none"!==c&&(e[f]="none",W.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ia(this,!0)},hide:function(){return ia(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){da(this)?r(this).show():r(this).hide()})}});var ja=/^(?:checkbox|radio)$/i,ka=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,la=/^$|\/(?:java|ecma)script/i,ma={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ma.optgroup=ma.option,ma.tbody=ma.tfoot=ma.colgroup=ma.caption=ma.thead,ma.th=ma.td;function na(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&B(a,b)?r.merge([a],c):c}function oa(a,b){for(var c=0,d=a.length;c<d;c++)W.set(a[c],"globalEval",!b||W.get(b[c],"globalEval"))}var pa=/<|&#?\w+;/;function qa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(pa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ka.exec(f)||["",""])[1].toLowerCase(),i=ma[h]||ma._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=na(l.appendChild(f),"script"),j&&oa(g),c){k=0;while(f=g[k++])la.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var ra=d.documentElement,sa=/^key/,ta=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ua=/^([^.]*)(?:\.(.+)|)/;function va(){return!0}function wa(){return!1}function xa(){try{return d.activeElement}catch(a){}}function ya(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ya(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=wa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(ra,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(L)||[""],j=b.length;while(j--)h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=W.hasData(a)&&W.get(a);if(q&&(i=q.events)){b=(b||"").match(L)||[""],j=b.length;while(j--)if(h=ua.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&W.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(W.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==xa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===xa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&B(this,"input"))return this.click(),!1},_default:function(a){return B(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?va:wa,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:wa,isPropagationStopped:wa,isImmediatePropagationStopped:wa,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=va,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=va,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=va,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&sa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ta.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return ya(this,a,b,c,d)},one:function(a,b,c,d){return ya(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=wa),this.each(function(){r.event.remove(this,a,c,b)})}});var za=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Aa=/<script|<style|<link/i,Ba=/checked\s*(?:[^=]|=\s*.checked.)/i,Ca=/^true\/(.*)/,Da=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a,b){return B(a,"table")&&B(11!==b.nodeType?b:b.firstChild,"tr")?r(">tbody",a)[0]||a:a}function Fa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ga(a){var b=Ca.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ha(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(W.hasData(a)&&(f=W.access(a),g=W.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}X.hasData(a)&&(h=X.access(a),i=r.extend({},h),X.set(b,i))}}function Ia(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ja.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ja(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Ba.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ja(f,b,c,d)});if(m&&(e=qa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(na(e,"script"),Fa),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,na(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ga),l=0;l<i;l++)j=h[l],la.test(j.type||"")&&!W.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Da,""),k))}return a}function Ka(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(na(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&oa(na(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(za,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=na(h),f=na(a),d=0,e=f.length;d<e;d++)Ia(f[d],g[d]);if(b)if(c)for(f=f||na(a),g=g||na(h),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);else Ha(a,h);return g=na(h,"script"),g.length>0&&oa(g,!i&&na(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(U(c)){if(b=c[W.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[W.expando]=void 0}c[X.expando]&&(c[X.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ka(this,a,!0)},remove:function(a){return Ka(this,a)},text:function(a){return T(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.appendChild(a)}})},prepend:function(){return Ja(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ea(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ja(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(na(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return T(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!Aa.test(a)&&!ma[(ka.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(na(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ja(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(na(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var La=/^margin/,Ma=new RegExp("^("+aa+")(?!px)[a-z%]+$","i"),Na=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",ra.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,ra.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Oa(a,b,c){var d,e,f,g,h=a.style;return c=c||Na(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ma.test(g)&&La.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Pa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Qa=/^(none|table(?!-c[ea]).+)/,Ra=/^--/,Sa={position:"absolute",visibility:"hidden",display:"block"},Ta={letterSpacing:"0",fontWeight:"400"},Ua=["Webkit","Moz","ms"],Va=d.createElement("div").style;function Wa(a){if(a in Va)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ua.length;while(c--)if(a=Ua[c]+b,a in Va)return a}function Xa(a){var b=r.cssProps[a];return b||(b=r.cssProps[a]=Wa(a)||a),b}function Ya(a,b,c){var d=ba.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Za(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ca[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ca[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ca[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ca[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ca[f]+"Width",!0,e)));return g}function $a(a,b,c){var d,e=Na(a),f=Oa(a,b,e),g="border-box"===r.css(a,"boxSizing",!1,e);return Ma.test(f)?f:(d=g&&(o.boxSizingReliable()||f===a.style[b]),"auto"===f&&(f=a["offset"+b[0].toUpperCase()+b.slice(1)]),f=parseFloat(f)||0,f+Za(a,b,c||(g?"border":"content"),d,e)+"px")}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Oa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=Ra.test(b),j=a.style;return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:j[b]:(f=typeof c,"string"===f&&(e=ba.exec(c))&&e[1]&&(c=fa(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(j[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i?j.setProperty(b,c):j[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b),i=Ra.test(b);return i||(b=Xa(h)),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Oa(a,b,d)),"normal"===e&&b in Ta&&(e=Ta[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Qa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?$a(a,b,d):ea(a,Sa,function(){return $a(a,b,d)})},set:function(a,c,d){var e,f=d&&Na(a),g=d&&Za(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=ba.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ya(a,c,g)}}}),r.cssHooks.marginLeft=Pa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Oa(a,"marginLeft"))||a.getBoundingClientRect().left-ea(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ca[d]+b]=f[d]||f[d-2]||f[0];return e}},La.test(a)||(r.cssHooks[a+b].set=Ya)}),r.fn.extend({css:function(a,b){return T(this,function(a,b,c){var d,e,f={},g=0;if(Array.isArray(b)){for(d=Na(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function _a(a,b,c,d,e){return new _a.prototype.init(a,b,c,d,e)}r.Tween=_a,_a.prototype={constructor:_a,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=_a.propHooks[this.prop];return a&&a.get?a.get(this):_a.propHooks._default.get(this)},run:function(a){var b,c=_a.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):_a.propHooks._default.set(this),this}},_a.prototype.init.prototype=_a.prototype,_a.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},_a.propHooks.scrollTop=_a.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=_a.prototype.init,r.fx.step={};var ab,bb,cb=/^(?:toggle|show|hide)$/,db=/queueHooks$/;function eb(){bb&&(d.hidden===!1&&a.requestAnimationFrame?a.requestAnimationFrame(eb):a.setTimeout(eb,r.fx.interval),r.fx.tick())}function fb(){return a.setTimeout(function(){ab=void 0}),ab=r.now()}function gb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ca[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function hb(a,b,c){for(var d,e=(kb.tweeners[b]||[]).concat(kb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&da(a),q=W.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],cb.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=W.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ia([a],!0),j=a.style.display||j,k=r.css(a,"display"),ia([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=W.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ia([a],!0),m.done(function(){p||ia([a]),W.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=hb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],Array.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=kb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=ab||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(i||h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:ab||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);f<g;f++)if(d=kb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,hb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j}r.Animation=r.extend(kb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return fa(c.elem,a,ba.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(L);for(var c,d=0,e=a.length;d<e;d++)c=a[d],kb.tweeners[c]=kb.tweeners[c]||[],kb.tweeners[c].unshift(b)},prefilters:[ib],prefilter:function(a,b){b?kb.prefilters.unshift(a):kb.prefilters.push(a)}}),r.speed=function(a,b,c){var d=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off?d.duration=0:"number"!=typeof d.duration&&(d.duration in r.fx.speeds?d.duration=r.fx.speeds[d.duration]:d.duration=r.fx.speeds._default),null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){r.isFunction(d.old)&&d.old.call(this),d.queue&&r.dequeue(this,d.queue)},d},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(da).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=kb(this,r.extend({},a),f);(e||W.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=W.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&db.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=W.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),r.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(ab=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),ab=void 0},r.fx.timer=function(a){r.timers.push(a),r.fx.start()},r.fx.interval=13,r.fx.start=function(){bb||(bb=!0,eb())},r.fx.stop=function(){bb=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var lb,mb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return T(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?lb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),
null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&B(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(L);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),lb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=mb[b]||r.find.attr;mb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=mb[g],mb[g]=e,e=null!=c(a,b,d)?g:null,mb[g]=f),e}});var nb=/^(?:input|select|textarea|button)$/i,ob=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return T(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):nb.test(a.nodeName)||ob.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function pb(a){var b=a.match(L)||[];return b.join(" ")}function qb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,qb(this)))});if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,qb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(L)||[];while(c=this[i++])if(e=qb(c),d=1===c.nodeType&&" "+pb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=pb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,qb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(L)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=qb(this),b&&W.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":W.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+pb(qb(c))+" ").indexOf(b)>-1)return!0;return!1}});var rb=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":Array.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:pb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!B(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(Array.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var sb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!sb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,sb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(W.get(h,"events")||{})[b.type]&&W.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&U(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!U(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=W.access(d,b);e||d.addEventListener(a,c,!0),W.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=W.access(d,b)-1;e?W.access(d,b,e):(d.removeEventListener(a,c,!0),W.remove(d,b))}}});var tb=a.location,ub=r.now(),vb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(Array.isArray(b))r.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(Array.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!ja.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:Array.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}});var Bb=/%20/g,Cb=/#.*$/,Db=/([?&])_=[^&]*/,Eb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Fb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Gb=/^(?:GET|HEAD)$/,Hb=/^\/\//,Ib={},Jb={},Kb="*/".concat("*"),Lb=d.createElement("a");Lb.href=tb.href;function Mb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(L)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Nb(a,b,c,d){var e={},f=a===Jb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Ob(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Pb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Qb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:tb.href,type:"GET",isLocal:Fb.test(tb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Kb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Ob(Ob(a,r.ajaxSettings),b):Ob(r.ajaxSettings,a)},ajaxPrefilter:Mb(Ib),ajaxTransport:Mb(Jb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Eb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||tb.href)+"").replace(Hb,tb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(L)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Lb.protocol+"//"+Lb.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Nb(Ib,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Gb.test(o.type),f=o.url.replace(Cb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(Bb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(vb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Db,"$1"),n=(vb.test(f)?"&":"?")+"_="+ub++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Kb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Nb(Jb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Pb(o,y,d)),v=Qb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Rb={0:200,1223:204},Sb=r.ajaxSettings.xhr();o.cors=!!Sb&&"withCredentials"in Sb,o.ajax=Sb=!!Sb,r.ajaxTransport(function(b){var c,d;if(o.cors||Sb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Rb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Tb=[],Ub=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Tb.pop()||r.expando+"_"+ub++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Ub.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ub.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Ub,"$1"+e):b.jsonp!==!1&&(b.url+=(vb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Tb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=C.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=qa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=pb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length},r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),b=f.ownerDocument,c=b.documentElement,e=b.defaultView,{top:d.top+e.pageYOffset-c.clientTop,left:d.left+e.pageXOffset-c.clientLeft}):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),B(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||ra})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return T(this,function(a,d,e){var f;return r.isWindow(a)?f=a:9===a.nodeType&&(f=a.defaultView),void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Pa(o.pixelPosition,function(a,c){if(c)return c=Oa(a,b),Ma.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return T(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.holdReady=function(a){a?r.readyWait++:r.ready(!0)},r.isArray=Array.isArray,r.parseJSON=JSON.parse,r.nodeName=B,"function"=="function"&&__webpack_require__(5)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return r}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Vb=a.jQuery,Wb=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Wb),b&&a.jQuery===r&&(a.jQuery=Vb),r},b||(a.jQuery=a.$=r),r});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map