(function () {
    angular
        .module('schedulerApp')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/home?from&to',
                    template: '<week></week>',
                    reloadOnSearch: false
                });
        });
})();