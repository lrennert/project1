"use strict";

;$(function () {

    $(document).ready(function () {

        //setStyleSheet(CSS aus localStorage?);

        //------------------------------
        // enable/disable submit button
        //------------------------------
        disableSubmitButton();

        let $input = $(document.querySelectorAll("#title, #description"));

        $input.blur(function () {
            $(document.getElementById("title")).val().length === 0 && $(document.getElementById("description")).val().length === 0 ?
                disableSubmitButton() : enableSubmitButton();
        });


        //--------
        // submit
        //--------
        $(document.getElementById("submitButton")).click(function () {

            let notes = localStorage.getItem("notes");
            notes = JSON.parse(notes) || [];
            console.log("notes before push = " + notes.length);

            notes.push(
                {
                    "id": notes.length + 1,
                    "title": $(document.getElementById("title")).val(),
                    "description": $(document.getElementById("description")).val(),
                    "importance": $(document.getElementById("importance")).val(),
                    "dueDate": $(document.getElementById("dueDate")).val(),
                    "finished": false
                }
            );

            console.log("notes after push = " + notes.length);

            for (let i in notes){
                console.log("i=" + i + ", id=" + notes[i].id + ", title=" + notes[i].title);
            }

            localStorage.setItem("notes", JSON.stringify(notes));
            window.location.href = "notesOverview.html";
            return false;
        });


        //--------
        // cancel
        //--------
        $(document.getElementById("cancelButton")).click(function () {
            window.location.href = "notesOverview.html";
        });

    });

    function disableSubmitButton() {
        document.getElementById("submitButton").disabled = true;
    }

    function enableSubmitButton() {
        document.getElementById("submitButton").disabled = false;
    }


});