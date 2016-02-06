(function () {
    angular
        .module('schedulerApp')
        .directive('calendar', calendar);

    function calendar() {
        return {
            templateUrl: 'components/calendar/calendar.html'
        }

    }
})();