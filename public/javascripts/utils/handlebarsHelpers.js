Handlebars.registerHelper("ifStateOpen", function (condition, options) {
    return condition === "open" ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("ifDescriptionExists", function (condition, options) {
    return condition !== "" ? options.fn(this) : options.inverse(this);
});