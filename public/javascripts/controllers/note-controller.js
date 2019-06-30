"use strict";

;$(function () {

    //------------
    // Initialize
    //------------
    setCSS();
    const isEditMode = Boolean(window.location.hash);


    let data = {};
    if (isEditMode) {
        const noteId = window.location.hash.substring(1);
        window.services.restClient.getNote(noteId).done(function (note) {
            data.note = note;
            data.note.isNewNote = false;
            prepareHTML(data);
        });
    } else {
        data = {
            note: {
                isNewNote: true,
                dueDate: new Date().toDateInputValue()
            }
        };
        prepareHTML(data);
    }


    function prepareHTML(data) {

        //------------
        // Handlebars
        //------------
        const source = $("#edit-note-template").html();
        const template = Handlebars.compile(source);
        const html = template(data);
        $("form").html(html);

        //--------
        // submit
        //--------
        $("#submitButton").click(function (event) {
            event.preventDefault();

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
                } else {
                    window.services.restClient.addNote(note);
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
