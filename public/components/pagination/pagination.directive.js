(function () {
    angular
        .module('schedulerApp')
        .directive('pagination', pagination);

    function pagination() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/pagination/pagination.html',
            controller: 'PaginationController',
            controllerAs: 'vm'
        }

    }
})();