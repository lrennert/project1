"use strict";

;$(function () {

    //------------------
    // Style Switcher
    //------------------
    const storedStyle = localStorage.getItem("style");
    const styleDropdown =  $("#styleSelect");
    if (storedStyle !== null) {
        setStyle(storedStyle);
        styleDropdown.val(storedStyle);
    }

    styleDropdown.change(function () {
        const selectedStyle = $("#styleSelect").val();
        setStyle(selectedStyle);
        localStorage.setItem("style", selectedStyle);
    });

    function setStyle(style){
        $("#currentCss").attr("href", `stylesheets/${style}.css`);
    }


    //---------------------------------
    // Sort Buttons and Filter Buttons
    //---------------------------------
    let filterBy = null;
    let sortBy = null;
    let noteData = getNoteData(filterBy, sortBy);

    if(getNumberOfNotes(noteData) === 0) {
        $(".sortContainer").hide();
    }


    $("#sortByDueDate").click(function () {
        sortBy = "dueDate";
        doQuery();
    });

    $("#sortByImportance").click(function () {
        sortBy = "importance";
        doQuery();
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
    const noteTemplateText = $("#noteTemplateText").html();
    const createNotesHTML = Handlebars.compile(noteTemplateText);
    noteData.done(function(data) {
        $("main").html(createNotesHTML(data));
    });

    function doQuery() {
        noteData = getNoteData(filterBy, sortBy);
        noteData.done(function(data) {
            $("main").html(createNotesHTML(data));
        });
    }

    //--------
    // Footer
    //--------
    getNumberOfNotes(noteData).done(function(numberOfNotes) {
        $("#numberOfNotes").html(numberOfNotes);
    });

    const deleteAllButton = $("#deleteAllButton");
    deleteAllButton.prop("disabled", getNumberOfNotes(noteData) === 0);
    deleteAllButton.click(function () {
        localStorage.clear();
    });

    function refreshFooter() {
        getNumberOfNotes(noteData).done(function(numberOfNotes) {
            $("#numberOfNotes").html(numberOfNotes);
        });
    }


});



function getNoteData(filterBy, sortBy) {
    return window.services.restClient.getNotes(filterBy, sortBy);
}

function getNumberOfNotes(noteData) {
    return noteData.then(function(data) {
        return jQuery.isEmptyObject(data.notes) ? 0 : data.notes.length;
    });
}


