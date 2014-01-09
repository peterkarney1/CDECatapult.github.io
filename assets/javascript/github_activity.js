$(function() {
  // Make request to Github:
  $.getJSON('https://api.github.com/orgs/cdecatapult/events', function(data) {
    // Get template:
    var template_src = $('#github-activity-template').html();
    var template = Handlebars.compile(template_src);
    var allowedEvents = ["CreateEvent", "WatchEvent", "ForkEvent"];
    
    // Check events to see if they ought to be displayed:
    data.forEach(function(item) {
      item[item.type] = true;
    });
    
    data = data.splice(0, 5);
    
    // Render template:
    $('#github-activity').html(template({ data: data }));
  });
});
