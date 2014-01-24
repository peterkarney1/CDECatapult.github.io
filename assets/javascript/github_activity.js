Handlebars.registerHelper('replace', function(text, str_to_replace, str_to_replace_with) {
  return text.replace(str_to_replace, str_to_replace_with);
});

Handlebars.registerHelper('truncate', function(text, num_chars) {
  return text.slice(0, num_chars);
});


$(function() {
  if ($('#github-activity')[0]) {
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
      
      data = data.splice(0, 15);
      
      // Render template:
      $('#github-activity').html(template({ data: data }));
    });
  }
});
