"use strict";

;$(function () {

    let filterBy;
    let sortBy;

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


    //--------------
    // Sort Buttons
    //--------------
    let noteData = getNoteData();
    if(getNumberOfNotes(noteData) === 0) {
        $(".sortContainer").hide();
    }


    $("#sortByDueDate").click(function () {
        sort("dueDate");
    });

    $("#sortByImportance").click(function () {
        sort("importance");
        // filterBy = null;
        // sortBy = "importance";
        // noteData = getNoteData(filterBy, sortBy);
        // noteData.done(function(data) {
        //     $("main").html(createNotesHTML(data));
        // });
    });

    function sort(sortBy) {
        noteData = getNoteData(null, sortBy);
        noteData.done(function(data) {
            $("main").html(createNotesHTML(data));
        });
    }


    //------------
    // Handlebars
    //------------
    const noteTemplateText = $("#noteTemplateText").html();
    const createNotesHTML = Handlebars.compile(noteTemplateText);
    noteData.done(function(data) {
        $("main").html(createNotesHTML(data));
    });


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

});



function getNoteData(filterBy, sortBy) {
    return window.services.restClient.getNotes(filterBy, sortBy);
}

function getNumberOfNotes(noteData) {
    return noteData.then(function(data) {
        return jQuery.isEmptyObject(data.notes) ? 0 : data.notes.length;
    });
}


