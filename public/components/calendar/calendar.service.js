(function () {
    angular
        .module('schedulerApp')
        .factory('calendarService', calendarService);

    function calendarService($location, $filter, HOURS_INTERVAL) {
        return {
            getHoursGrid: getHoursGrid,
            getFormattedHoursGrid: getFormattedHoursGrid,
            setSearch: setSearch
        };

        function getHoursGrid() {
            var hoursGrid = [];
            for (var hour = HOURS_INTERVAL.from; hour <= HOURS_INTERVAL.to; hour++) {
                hoursGrid.push(hour);
            }

            return hoursGrid;
        }

        function getFormattedHoursGrid() {
            return getHoursGrid()
                .map(function (hour) {
                    return ('0' + hour + ':00').slice(-5);
                });
        }

        function setSearch(interval) {
            var filterDate = $filter('date');
            $location.path('/home');
            $location.search({
                from: filterDate(interval.start, 'yyyy-MMM-dd'),
                to: filterDate(interval.end, 'yyyy-MMM-dd')
            });
        }
    }
})();