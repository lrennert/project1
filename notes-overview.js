"use strict";

;$(function () {

    // localStorage.clear();

    $(document).ready(function () {

        // document.getElementById("numberOfNotes").innerHTML = getNumberOfNotes();

        $("#numberOfNotes").html(getNumberOfNotes());

        function getNumberOfNotes() {
            let notes = localStorage.getItem("notes");
            notes = JSON.parse(notes) || [];
            return notes.length;
        }

        $("#style").change(function () {
            setStyleSheet($(document.getElementById("style")).val());
        });

        function setStyleSheet(newCss) {
            const cssfileExtension = ".css";
            console.log("newCss = " + newCss);
            document.getElementById("currentCss").href = newCss + cssfileExtension;
        }

    });
});


