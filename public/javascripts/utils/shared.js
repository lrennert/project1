//---------
// Set CSS
//---------

function setCSS() {
    const storedStyle = localStorage.getItem("style");
    const styleDropdown = $("#styleSelect");

    if (storedStyle !== null) {
        setHref(storedStyle);
        styleDropdown.val(storedStyle);
    } else {
        setHref("colorsDefault");
    }
}

function setHref(style) {
    $("#colorStyleCss").attr("href", `stylesheets/${style}.css`);
    $("body").removeAttr("hidden");
}

function hideBody() {
    $("body").attr("hidden");
}