(function () {
    angular
        .module('schedulerApp')
        .directive('week', week);

    function week() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/week/week.html',
            controller: 'WeekController',
            controllerAs: 'vm'
        }

    }
})();
