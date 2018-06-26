Handlebars.registerHelper("ifStateOpen", function (condition, options) {
    return condition === "open" ? options.fn(this) : options.inverse(this);
});