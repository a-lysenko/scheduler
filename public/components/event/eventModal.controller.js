(function () {
    angular
        .module('schedulerApp')
        .controller('EventModalController', EventModalController);

    function EventModalController($q, eventService, btfModal, options) {
        var vm = this;
        var HOUR_IN_MS = 3600 * 1000;

        angular.extend(vm, options, {
            cancel: cancel,
            save: save,
            remove: remove
        });

        var currentDate = new Date();
        currentDate.setSeconds(0, 0);
        vm.event = vm.event || {
                start: currentDate,
                end: new Date(+currentDate + HOUR_IN_MS)
            };

        function cancel() {
            vm.decline();
        }

        function save() {
            if (vm.event.start) {
                vm.event.start.setFullYear(vm.date.getFullYear(), vm.date.getMonth(), vm.date.getDate());
            }

            if (vm.event.end) {
                vm.event.end.setFullYear(vm.date.getFullYear(), vm.date.getMonth(), vm.date.getDate());
            }

            eventService.setEvent(vm.event);

            vm.confirm(vm.event);
        }

        function remove() {
            var confirmModal = btfModal({
                templateUrl: 'components/event/eventConfirmModal.html',
                controller: function (options) {
                    var vm = this;
                    angular.extend(vm, options);
                },
                controllerAs: 'vm'
            });

            var deferred = $q.defer();
            confirmModal.activate({
                options: {
                    confirm: function (result) {
                        deferred.resolve(result);
                    },
                    decline: function (result) {
                        deferred.reject(result);
                    }
                }
            });

            deferred.promise
                .then(function () {
                    eventService.removeEvent(vm.event.id);
                })
                .then(vm.confirm)
                .finally(confirmModal.deactivate);
        }
    }
})();