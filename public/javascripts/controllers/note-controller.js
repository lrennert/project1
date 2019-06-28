"use strict";

;$(function () {

    //------------
    // Initialize
    //------------
    setCSS();
    const isEditMode = localStorage.hasOwnProperty("note");


    //------------
    // Handlebars
    //------------
    let data;
    if (isEditMode) {
        const noteString = localStorage.getItem("note");
        data = JSON.parse(noteString);
        data.note.isNewNote = false;
    } else {
        data = {
            note: {
                isNewNote: true,
                dueDate: new Date().toDateInputValue()
            }
        };
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

            const note = {
                title: $("#title").val(),
                description: $("#description").val(),
                importance: $("#importance").val(),
                dueDate: $("#dueDate").val(),
                state: null
            };

            if (isEditMode) {
                window.services.restClient.updateNote(data.note._id, note);
                localStorage.removeItem("note");
            } else {
                window.services.restClient.addNote(note);
            }

            window.location.href = "index.html";
            return false;
        }
    });


    //--------
    // cancel
    //--------
    $("#cancelButton").click(function () {
        window.location.href = "index.html";
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
