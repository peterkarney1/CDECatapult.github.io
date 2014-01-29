var diabetes_per_head_per_ccg_per_month = function(div) {
  var map = L.map(div).setView([53.0, -1.5], 6);
  
  var color = function(d) {
    return  d == 'NA' ? '#333' :
            d == 'undefined' ? '#333' :
            d > 30 ? '#0C2C84' :
            d > 28 ? '#225EA8' :
            d > 26 ? '#1D91C0' :
            d > 24 ? '#41B6C4' :
            d > 22 ? '#7FCDBB' :
            d > 20 ? '#C7E9B4' :
            '#FFFFCC';
  };
  
  var style = function(feature) {
    return {
      fillColor: color(feature.properties.per_capita_spend),
      weight: 2,
      opacity: 0.5,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.8
    }
  };
  
  var defaultStyle = function(feature) {
    return {
      outlineColor: "#000000",
      outlineWidth: 0.5,
      weight: 1,
      opacity: 1,
      fillOpacity: 0
    };
  };
  
  L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
    key: 'BC9A493B41014CAABB98F0471D759707'
  }).addTo(map);
  
  mergedFeatureLayer(map, "data/diabetes_per_head_per_ccg_per_month.csv", "data/ccg-boundaries.json", "ccg_code", style, null, null, "ccg_boundaries");
  
  addLegend([0, 20, 22, 24, 26, 28, 30, 34], map, color);
}
