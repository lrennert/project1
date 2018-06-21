;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function getNotes(orderBy, filterBy) {
        return ajaxUtil.ajax("GET", `/notes?state=${filterBy}&sort=${orderBy}`, undefined);
    }

    function addNote(note) {
        return ajaxUtil.ajax("POST", "/notes/", {notes: note});
    }

    function updateNote(note) {
        return ajaxUtil.ajax("PUT", `/notes/${id}`, {name: note});
    }

    function getNoteById(id) {
        return ajaxUtil.ajax("GET", `/notes/${id}`, undefined);
    }

    services.restClient = {
        getNotes: getNotes,
        addNote: addNote,
        updateNote: updateNote,
        getNoteById: getNoteById
    };
}(window.services = window.services || { }, jQuery));