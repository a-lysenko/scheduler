(function () {
    angular
        .module('schedulerApp')
        .directive('event', event);

    function event() {
        return {
            restrict: 'E',
            scope: {
                event: '=',
                showEventModal: '='
            },
            replace: true,
            templateUrl: 'components/event/event.html',
            controller: 'EventController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();