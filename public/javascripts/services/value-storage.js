;(function (services, $) {

    function setItem(name, value) {
        localStorage.setItem(name, value);
    }

    function getItem(name) {
        return localStorage.getItem(name) || null;
    }

    services.valueStorage = {
        setItem: setItem,
        getItem: getItem
    };
}(window.services = window.services || {}, jQuery));