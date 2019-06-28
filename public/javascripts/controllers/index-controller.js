"use strict";

;$(function () {

    setCSS();

    let filterBy = "open";
    let sortBy = null;
    let noteData = getNoteData(filterBy, sortBy);


    //----------------
    // Style Switcher
    //----------------
    $("#styleSelect").change(function () {
        const selectedStyle = $("#styleSelect").val();
        setLinkToFile(selectedStyle);
        localStorage.setItem("style", selectedStyle);
    });


    //---------------------------------
    // Sort Buttons and Filter Buttons
    //---------------------------------
    $("#sortByDueDate").click(function () {
        if ($("#numberOfNotes").text() > 1) {
            sortBy = "dueDate";
            doQuery();
        }
    });

    $("#sortByImportance").click(function () {
        if ($("#numberOfNotes").text() > 1) {
            sortBy = "importance";
            doQuery();
        }
    });

    $("#showOpenButton").click(function () {
        filterBy = "open";
        doQuery();
        refreshFooter();
    });

    $("#showAllButton").click(function () {
        filterBy = "all";
        doQuery();
        refreshFooter();
    });


    //------------
    // Handlebars
    //------------
    const source = $("#note-template").html();
    const template = Handlebars.compile(source);
    const notesContainer = $(".notesContainer");
    noteData.done(function (data) {
        $(".notesContainer").html(template(data));
    });

    function doQuery() {
        noteData = getNoteData(filterBy, sortBy);
        noteData.done(function (data) {
            $(".notesContainer").html(template(data));
        });
    }

    notesContainer.on("change", ".js-change", function (event) {
        window.services.restClient.getNote($(event.currentTarget).data("id")).done(function (note) {
            if ($(event.currentTarget).prop("checked")) {
                note.state = "done";
            } else {
                note.state = "open";
            }
            window.services.restClient.updateNote(note._id, note);
        });
    });

    notesContainer.on("click", ".js-edit", function (event) {
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
        getNumberOfNotes(noteData).done(function (numberOfNotes) {
            $("#numberOfNotes").html(numberOfNotes);
            deleteAllButton.prop("disabled", numberOfNotes === 0);
        });
    }

    refreshFooter();

});


function getNoteData(filterBy, sortBy) {
    return window.services.restClient.getNotes(filterBy, sortBy);
}

function getNumberOfNotes(noteData) {
    return noteData.then(function (data) {
        return jQuery.isEmptyObject(data.notes) ? 0 : data.notes.length;
    });
}


