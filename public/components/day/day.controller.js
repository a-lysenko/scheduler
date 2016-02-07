(function () {
    angular
        .module('schedulerApp')
        .controller('DayController', DayController);

    function DayController(dayService, HOUR_BLOCK_HEIGHT_PX, eventService) {
        var vm = this;

        angular.extend(vm, {
            hoursGrid: [],
            blockHeight: 0,

            updateHoursGrid: updateHoursGrid,
            isCurrentDate: isCurrentDate,
            showEventModal: showEventModal
        });

        vm.updateHoursGrid();
        vm.blockHeight = HOUR_BLOCK_HEIGHT_PX * vm.hoursGrid.length;

        function updateHoursGrid() {
            vm.hoursGrid = dayService.getHoursGrid(vm.day.start);
        }

        function isCurrentDate() {
            var currentDate = new Date();
            return vm.day.start <= currentDate && currentDate <= vm.day.end;
        }

        function showEventModal(event) {
            var options = angular.extend({date: vm.day.start}, event);
            eventService.showEventModal(options)
                .then(function () {
                    vm.day.events = eventService.getEventsIn({
                        start: vm.day.start,
                        end: vm.day.end
                    });
                });
        }
    }
})();