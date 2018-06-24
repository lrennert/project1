"use strict";


;$(function () {

    //------------------
    // Initialize style
    //------------------
    const cssFileExtension = ".css";
    const storedStyle = localStorage.getItem("style");
    if (storedStyle !== null) {
        $("#currentCss").attr("href", 'stylesheets/' + storedStyle + cssFileExtension);
        $("#styleSelect").val(storedStyle);
    }

    //----------------
    // Style Switcher
    //----------------
    $("#styleSelect").change(function () {
        const selectedStyle = $("#styleSelect").val();
        $("#currentCss").attr("href", 'stylesheets/' + selectedStyle + cssFileExtension);
        localStorage.setItem("style", selectedStyle);
    });

    //--------
    // Footer
    //--------

    const noteData = getNoteData();
    const deleteAllButton = $("#deleteAllButton");

    getNumberOfNotes(noteData).done(function(numberOfNotes) {
        $("#numberOfNotes").html(numberOfNotes);
    });

    deleteAllButton.prop("disabled", numberOfNotes === 0);

    deleteAllButton.click(function () {
        localStorage.clear();
    });

    if(numberOfNotes === 0) {
        $(".sortContainer").hide();
    }

    //------------
    // Handlebars
    //------------

    const noteTemplateText = $("#noteTemplateText").html();
    const createNotesHTML = Handlebars.compile(noteTemplateText);
    noteData.done(function(data) {
        $("main").html(createNotesHTML(data));
    });

});

function getNoteData() {
    const result = window.services.restClient.getNotes(null, null);
    console.log(result);
    console.log(result.responseText);
    return result;
}

function getNumberOfNotes(noteData) {
    return noteData.then(function(data) {
        return jQuery.isEmptyObject(data.notes) ? 0 : data.notes.length;
    });
}


