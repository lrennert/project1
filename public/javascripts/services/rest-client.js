;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function getNotes(filterBy, sortBy) {
        return ajaxUtil.ajax("GET", `/notes?filterBy=${filterBy}&sortBy=${sortBy}`, undefined);
    }

    function getNoteById(id) {
        return ajaxUtil.ajax("GET", `/notes/${id}`, undefined);
    }

    function addNote(note) {
        return ajaxUtil.ajax("POST", "/notes/", note);
    }

    function updateNote(id, note) {
        return ajaxUtil.ajax("PUT", `/notes/${id}`, note);
    }

    services.restClient = {
        getNotes: getNotes,
        getNote: getNoteById,
        addNote: addNote,
        updateNote: updateNote
    };
}(window.services = window.services || { }, jQuery));
