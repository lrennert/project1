//---------
// Set CSS
//---------

function setCSS(){
    const storedStyle = localStorage.getItem("style");
    const styleDropdown = $("#styleSelect");

    if (storedStyle !== null) {
        setLinkToFile(storedStyle);
        styleDropdown.val(storedStyle);
    }
}

function setLinkToFile(style) {
    $("#currentCss").attr("href", `stylesheets/${style}.css`);
}


