window.colour_0 = '#333333';
window.colour_1 = '#0C2C84';
window.colour_2 = '#225EA8';
window.colour_3 = '#1D91C0';
window.colour_4 = '#41B6C4';
window.colour_5 = '#7FCDBB';
window.colour_6 = '#C7E9B4';
window.colour_7 = '#FFFFCC';


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
    return  d == 'NA' ? window.colour_0 :
            d == 'undefined' ? window.colour_0 :
            d > 30 ? window.colour_1 :
            d > 28 ? window.colour_2 :
            d > 26 ? window.colour_3 :
            d > 24 ? window.colour_4 :
            d > 22 ? window.colour_5 :
            d > 20 ? window.colour_6 :
            window.colour_7;
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

$(function() {
  $('button.colour-scheme-change').click(function() {
    window.foo = $(this).closest('div.row');
    window.colour_1 = $(this).closest('div.row').find('div.colour_1').css('background-color');
    window.colour_2 = $(this).closest('div.row').find('div.colour_2').css('background-color');
    window.colour_3 = $(this).closest('div.row').find('div.colour_3').css('background-color');
    window.colour_4 = $(this).closest('div.row').find('div.colour_4').css('background-color');
    window.colour_5 = $(this).closest('div.row').find('div.colour_5').css('background-color');
    window.colour_6 = $(this).closest('div.row').find('div.colour_6').css('background-color');
    window.colour_7 = $(this).closest('div.row').find('div.colour_7').css('background-color');
    DiabetesChoropleth.refresh();
  });
});
