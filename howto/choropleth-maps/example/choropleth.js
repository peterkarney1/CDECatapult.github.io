var DiabetesChoropleth = {
  init: function(div) {
    this.div = div;
    this.map = L.map(this.div).setView([53.0, -1.5], 6);
    
    L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
      key: 'BC9A493B41014CAABB98F0471D759707'
    }).addTo(this.map);
    
    mergedFeatureLayer(this.map, "data/diabetes_per_head_per_ccg_per_month.csv", "data/ccg-boundaries.json", "ccg_code", this.style, null, null, "ccg_boundaries");
    
    addLegend([0, 20, 22, 24, 26, 28, 30, 34], this.map, this.color);
  },
  
  destroy: function() {
    this.map.remove();
  },
  
  refresh: function() {
    this.destroy();
    this.init(this.div);
  },
  
  color: function(d) {
    return  d == 'NA' ? '#333333' :
            d == 'undefined' ? '#333333' :
            d > 30 ? '#0C2C84' :
            d > 28 ? '#225EA8' :
            d > 26 ? '#1D91C0' :
            d > 24 ? '#41B6C4' :
            d > 22 ? '#7FCDBB' :
            d > 20 ? '#C7E9B4' :
            '#FFFFCC';
  },
  
  style: function(feature) {
    return {
      fillColor: DiabetesChoropleth.color(feature.properties.per_capita_spend),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.8
    }
  },
  
  defaultStyle: function(feature) {
    return {
      outlineColor: "#000000",
      outlineWidth: 0.5,
      weight: 1,
      opacity: 1,
      fillOpacity: 0
    };
  }
}
