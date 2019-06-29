Handlebars.registerHelper("ifStateDone", function (condition, options) {
    return condition === "done" ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("ifDescriptionExists", function (condition, options) {
    return condition !== "" ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("select", function (selected, options) {
    return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
});