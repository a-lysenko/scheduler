(function () {
    angular
        .module('schedulerApp')
        .directive('day', day);

    function day() {
        return {
            restrict: 'E',
            scope: {
                day: '='
            },
            replace: true,
            templateUrl: 'components/day/day.html',
            controller: 'DayController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();