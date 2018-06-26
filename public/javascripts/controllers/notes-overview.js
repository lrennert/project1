"use strict";

;$(function () {

    let filterBy = "open";
    let sortBy = null;
    let noteData = getNoteData(filterBy, sortBy);


    //------------------
    // Style Switcher
    //------------------
    const storedStyle = localStorage.getItem("style");
    const styleDropdown = $("#styleSelect");
    if (storedStyle !== null) {
        setStyle(storedStyle);
        styleDropdown.val(storedStyle);
    }

    styleDropdown.change(function () {
        const selectedStyle = $("#styleSelect").val();
        setStyle(selectedStyle);
        localStorage.setItem("style", selectedStyle);
    });

    function setStyle(style) {
        $("#currentCss").attr("href", `stylesheets/${style}.css`);
    }


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
    noteData.done(function (data) {
        $(".noteContainer").html(template(data));
    });

    function doQuery() {
        noteData = getNoteData(filterBy, sortBy);
        noteData.done(function (data) {
            $(".noteContainer").html(template(data));
        });
    }

    $(".noteContainer").on("change", ".js-change", function (event) {
        window.services.restClient.getNote($(event.currentTarget).data("id")).done(function (note) {
            if ($(event.currentTarget).prop("checked")) {
                note.state = "done";
            }
            else {
                note.state = "open";
            }
            window.services.restClient.updateNote(note._id, note);
        });
    });

    $(".noteContainer").on("click", ".js-edit", function (event) {
        window.services.restClient.getNote($(event.currentTarget).data("id")).done(function (note) {
            localStorage.setItem("note", JSON.stringify({note: note}));
            window.location.href = "createNewNote.html";
            return false;
        });
    });


    //--------
    // Footer
    //--------
    getNumberOfNotes(noteData).done(function (numberOfNotes) {
        $("#numberOfNotes").html(numberOfNotes);
    });

    const deleteAllButton = $("#deleteAllButton");
    deleteAllButton.prop("disabled", getNumberOfNotes(noteData) === 0);
    deleteAllButton.click(function () {
        localStorage.clear();
    });

    function refreshFooter() {
        getNumberOfNotes(noteData).done(function (numberOfNotes) {
            $("#numberOfNotes").html(numberOfNotes);
        });
    }

});


function getNoteData(filterBy, sortBy) {
    return window.services.restClient.getNotes(filterBy, sortBy);
}

function getNumberOfNotes(noteData) {
    return noteData.then(function (data) {
        return jQuery.isEmptyObject(data.notes) ? 0 : data.notes.length;
    });
}


