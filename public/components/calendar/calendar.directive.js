(function () {
    angular
        .module('schedulerApp')
        .directive('calendar', calendar);

    function calendar() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/calendar/calendar.html'
        }

    }
})();