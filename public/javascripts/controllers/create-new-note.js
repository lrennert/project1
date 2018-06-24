"use strict";

;$(function () {

    //------------
    // Initialize
    //------------
    $("#dueDate").val(new Date().toDateInputValue());

    const cssFileExtension = ".css";
    const storedStyle = localStorage.getItem("style");

    if (storedStyle !== null) {
        $("#currentCss").attr("href", 'stylesheets/' + storedStyle + cssFileExtension);
        $("#styleSelect").val(storedStyle);
    }

    //--------
    // submit
    //--------
    $("#submitButton").click(function () {

        if ($("form")[0].checkValidity()) {

            /*
            const noteData = localStorage.getItem("notes");
            const noteArray = jQuery.isEmptyObject(JSON.parse(noteData)) ? [] :
                JSON.parse(noteData).notes;
            */

            const newNote = {
                "title": $("#title").val(),
                "description": $("#description").val(),
                "importance": $("#importance").val(),
                "dueDate": $("#dueDate").val()
            };

            // localStorage.setItem("notes", JSON.stringify({notes: noteArray}));
            // window.location.href = "notesOverview.html";

            window.services.restClient.addNote(newNote);
            window.location.href = "notesOverview.html";
            return false;

        }
    });

    //--------
    // cancel
    //--------
    $("#cancelButton").click(function () {
        window.location.href = "notesOverview.html";
    });

});

Date.prototype.toDateInputValue = (function () {
    const local = new Date(this);
    local.setDate(local.getDate() + 10);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
