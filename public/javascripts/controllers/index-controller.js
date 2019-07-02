"use strict";

;$(function () {

    setCSS();

    const promise = window.services.restClient.getNotes(null, "dueDate");
    const notesContainer = $(".notesContainer");
    let notesArrayAll = [];
    let notesArray = [];


    //----------------
    // Style Switcher
    //----------------
    $("#styleSelect").change(function () {
        const selectedStyle = $("#styleSelect").val();
        setHref(selectedStyle);
        window.services.valueStorage.setItem("style", selectedStyle);
    });


    //---------------
    // New Note Link
    //---------------
    $(".createNewNote").click(function () {
        hideBody();
    });


    //-------------------------
    // Sort and Filter Buttons
    //-------------------------
    $("#sortByDueDate").click(function () {
        notesArray.sort((n1, n2) => new Date(n1.dueDate.toString()) - new Date(n2.dueDate.toString()));
        updateHandlebars();
    });

    $("#sortByImportance").click(function () {
        notesArray.sort((n1, n2) => n2.importance - n1.importance);
        updateHandlebars();
    });

    $("#showOpenButton").click(function () {
        notesArray = notesArray.filter(n => n.state === "open");
        updateHandlebars();
        refreshFooter();
    });

    $("#showAllButton").click(function () {
        notesArray = [...notesArrayAll];
        updateHandlebars();
        refreshFooter();
    });


    //-----------------
    // Notes Container
    //-----------------
    const source = $("#note-template").html();
    const template = Handlebars.compile(source);

    promise.done(function (data) {
        notesArrayAll = data.notes;
        notesArray = [...notesArrayAll];
        updateHandlebars(notesArray);
    });

    function updateHandlebars(){
        notesContainer.html(template(notesArray));
    }

    notesContainer.on("change", ".js-change", function (event) {
        window.services.restClient.getNote($(event.currentTarget).data("id")).done(function (note) {
            if ($(event.currentTarget).prop("checked")) {
                note.state = "done";
            } else {
                note.state = "open";
            }
            window.services.restClient.updateNote(note._id, note);
            updateNotesArray(notesArray, note);
            updateNotesArray(notesArrayAll, note);
        });
    });

    function updateNotesArray(arr, note) {
        const index = arr.findIndex(n => n._id === note._id);
        arr.splice(index, 1, note);
    }

    notesContainer.on("click", ".js-edit", function (event) {
        hideBody();
        let noteId = $(event.currentTarget).data("id");
        window.location.href = `note.html#${noteId}`;
    });


    //--------
    // Footer
    //--------
    const deleteAllButton = $("#deleteAllButton");

    deleteAllButton.click(function () {
        if (confirm("Are you sure you want to delete all notes (open & finished)?")) {
            window.services.restClient.deleteNotes().done(function () {
                location.reload();
            });
        }
    });

    function refreshFooter() {
        $("#numberOfNotes").html(notesArray.length);
        deleteAllButton.prop("disabled", numberOfNotes === 0);
    }

    refreshFooter();

});