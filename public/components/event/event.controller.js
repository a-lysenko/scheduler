(function () {
    angular
        .module('schedulerApp')
        .controller('EventController', EventController);

    function EventController(HOUR_BLOCK_HEIGHT_PX, eventService) {
        var vm = this;

        angular.extend(vm, {
            blockHeight: 0,

            showEditEventModal: showEditEventModal
        });

        vm.blockHeight = HOUR_BLOCK_HEIGHT_PX * eventService.getEventDurationHrs(vm.event);
        vm.blockTopMargin = HOUR_BLOCK_HEIGHT_PX * eventService.getEventStartHrs(vm.event);

        function showEditEventModal() {
            vm.showEventModal({event: vm.event});
        }
    }
})();