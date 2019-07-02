"use strict";

;$(function () {

    //------------
    // Initialize
    //------------
    setCSS();
    const isEditMode = Boolean(window.location.hash);
    let note = {};

    if (isEditMode) {
        const noteId = location.hash.substring(1);
        window.services.restClient.getNote(noteId).done(function (data) {
            note = data;
            note.isNewNote = false;
            prepareHTML(note);
        });
    } else {
        note.isNewNote = true;
        note.dueDate = new Date().toDateInputValue();
        prepareHTML();
    }


    function prepareHTML() {

        //------------
        // Handlebars
        //------------
        const source = $("#edit-note-template").html();
        const template = Handlebars.compile(source);
        const html = template(note);
        $("form").html(html);

        //--------
        // submit
        //--------
        $("#submitButton").click(function (event) {
            event.preventDefault();

            if ($("form")[0].checkValidity()) {

                const noteUI = {
                    title: $("#title").val(),
                    description: $("#description").val(),
                    importance: $("#importance").val(),
                    dueDate: $("#dueDate").val(),
                    state: null
                };

                if (isEditMode) {
                    window.services.restClient.updateNote(note._id, noteUI);
                } else {
                    window.services.restClient.addNote(noteUI);
                }

                window.location.href = "index.html";
            }
        });

        //--------
        // cancel
        //--------
        $("#cancelButton").click(function () {
            window.location.href = "index.html";
        });

    }

});


Date.prototype.toDateInputValue = (function () {
    const local = new Date(this);
    local.setDate(local.getDate() + 10);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
