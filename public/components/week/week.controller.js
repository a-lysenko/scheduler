(function () {
    angular
        .module('schedulerApp')
        .controller('WeekController', WeekController);

    function WeekController($scope, calendarService, weekService, eventService, HOUR_BLOCK_HEIGHT_PX) {
        var vm = this;

        angular.extend(vm, {
            weekInterval: weekService.getWeekIntervalWith(new Date()),
            formattedHoursGrid: calendarService.getFormattedHoursGrid(),
            grid: [],
            blockHeight: HOUR_BLOCK_HEIGHT_PX
        });

        updateData();

        function updateData() {
            vm.grid = weekService.getDaysGrid(vm.weekInterval);
            var weekEventSet = eventService.getEventsIn(vm.weekInterval);

            weekService.bindEventsToDays(vm.grid, weekEventSet);

            $scope.$emit('showYear', vm.weekInterval.start.getFullYear());
            calendarService.setSearch(vm.weekInterval);
        }

        $scope.$on('showPrevWeek', function () {
            vm.weekInterval = weekService.getPrevWeekInterval(vm.weekInterval);
            updateData();

        });

        $scope.$on('showNextWeek', function () {
            vm.weekInterval = weekService.getNextWeekInterval(vm.weekInterval);
            updateData();
        });
    }
})();