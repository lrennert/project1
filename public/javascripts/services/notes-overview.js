"use strict";


;$(function () {

    // //------------------
    // // Initialize style
    // //------------------
    // const cssFileExtension = ".css";
    // const storedStyle = localStorage.getItem("style");
    // if (storedStyle !== null) {
    //     $("#currentCss").attr("href", storedStyle + cssFileExtension);
    //     $("#styleSelect").val(storedStyle);
    // }

    //----------------
    // Style Switcher
    //----------------
    $("#styleSelect").change(function () {
        const selectedStyle = $("#styleSelect").val();
        $("#currentCss").attr("href", selectedStyle + cssFileExtension);
        localStorage.setItem("style", selectedStyle);
    });

    //--------
    // Footer
    //--------

    const numberOfNotes = getNumberOfNotes();
    const deleteAllButton = $("#deleteAllButton");

    $("#numberOfNotes").html(numberOfNotes);
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

    const noteData = getNoteData();
    const noteTemplateText = $("#noteTemplateText").html();
    const createNotesHTML = Handlebars.compile(noteTemplateText);
    $(".noteContainer").html(createNotesHTML(noteData));

});

function getNoteData() {
    const noteData = localStorage.getItem("notes");
    return JSON.parse(noteData);
}

function getNumberOfNotes() {
    return jQuery.isEmptyObject(getNoteData()) ? 0 :
        getNoteData().notes.length;
}


