(function () {
    angular
        .module('schedulerApp')
        .factory('dayService', dayService);

    function dayService(calendarService) {

        return {
            getHoursGrid: getHoursGrid
        };

        function getHoursGrid(date) {
            var hours = calendarService.getHoursGrid();

            return hours.map(function(hourValue) {
                var dateWithHour = new Date(date);

                dateWithHour.setHours(hourValue, 0, 0, 0);
                return {
                    start: dateWithHour,
                    end: getDateWithHourEnd(dateWithHour)
                };
            });
        }

        function getDateWithHourEnd(date) {
            var dateWithHourEnd = new Date(date);
            dateWithHourEnd.setMinutes(59, 59, 999);
            return dateWithHourEnd;
        }
    }
})();