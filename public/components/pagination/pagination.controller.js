(function () {
    angular
        .module('schedulerApp')
        .controller('PaginationController', PaginationController);

    function PaginationController($rootScope) {
        var vm = this;
        angular.extend(vm, {
            interval: {},

            notifyToShowPrevWeek: notifyToShowPrevWeek,
            notifyToShowNextWeek: notifyToShowNextWeek
        });

        function notifyToShowPrevWeek() {
            $rootScope.$broadcast('showPrevWeek');
        }

        function notifyToShowNextWeek() {
            $rootScope.$broadcast('showNextWeek');
        }

        $rootScope.$on('showYear', function (e, data) {
            vm.year = data;
        });
    }
})();