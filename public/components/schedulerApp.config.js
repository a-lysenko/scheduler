(function () {
    angular
        .module('schedulerApp')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('country-catalog', {
                    url: '/country-catalog',
                    templateUrl: 'components/country-catalog/countryCatalog.html',
                    //template: '<p>Hi! I am country catalog</p>',
                    controller: 'CountryCatalogController',
                    controllerAs: 'countryCatalogCtrl'
                })
                .state('country-catalog.country', {
                    url: '/:country',
                    templateUrl: 'components/country-catalog/cityCatalog.html',
                    controller: 'cityCatalogController'
                })
                .state('language-catalog', {
                    url: '/language-catalog',
                    //templateUrl: 'language-catalog/languageCatalog.html'
                    template: '<p>Hi! I am language catalog</p>'
                })
                .state('home', {
                    url: '/',
                    template: '<h3>Meet ui-router example!</h3><p>I\'m created to help you.</p>'
                });
        });
})();