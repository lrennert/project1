"use strict";

;$(function () {

    //------------
    // Initialize
    //------------

    const cssFileExtension = ".css";
    const storedStyle = localStorage.getItem("style");

    if (storedStyle !== null) {
        $("#currentCss").attr("href", 'stylesheets/' + storedStyle + cssFileExtension);
        $("#styleSelect").val(storedStyle);
    }

    const isEditMode = localStorage.hasOwnProperty("note");
    let data;


    //------------
    // Handlebars
    //------------
    if (isEditMode) {
        const noteString = localStorage.getItem("note");
        data = JSON.parse(noteString);
        data.note.isNewNote = false;
        console.log(data);
    } else {
        data = {};
        data.note = {};
        data.note.isNewNote = true;
        data.note.dueDate = new Date().toDateInputValue();
        console.log(data);
    }

    const source = $("#edit-note-template").html();
    const template = Handlebars.compile(source);
    const html = template(data);
    $("form").html(html);


    //--------
    // submit
    //--------
    $("#submitButton").click(function () {

        if ($("form")[0].checkValidity()) {

            const newNote = {
                "title": $("#title").val(),
                "description": $("#description").val(),
                "importance": $("#importance").val(),
                "dueDate": $("#dueDate").val()
            };

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
        if (isEditMode) {
            localStorage.removeItem("note");
        }
    });

});


Date.prototype.toDateInputValue = (function () {
    const local = new Date(this);
    local.setDate(local.getDate() + 10);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
