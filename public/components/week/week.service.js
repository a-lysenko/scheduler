(function () {
    angular
        .module('schedulerApp')
        .factory('weekService', weekService);

    function weekService() {

        return {
            getWeekIntervalWith: getWeekIntervalWith,
            getPrevWeekInterval: getPrevWeekInterval,
            getNextWeekInterval: getNextWeekInterval,

            getDayInterval: getDayInterval,
            getDaysGrid: getDaysGrid,

            bindEventsToDays: bindEventsToDays
        };


        function getWeekIntervalWith(dateInWeek, mondayFirstMode) {
            mondayFirstMode = mondayFirstMode || true; // in this case we don't actually get interval with given data,
            // but get 7 days from the nearest past Monday

            var AMOUNT_DAYS_IN_WEEK_FROM_FIRST_TO_LAST = 6;
            var amountDaysFromWeekStartToGiven;

            if (mondayFirstMode) {
                var indexOfSunInMondayFirst = 7;
                amountDaysFromWeekStartToGiven = -(dateInWeek.getDay() || indexOfSunInMondayFirst) + 1;
            } else {
                amountDaysFromWeekStartToGiven = -dateInWeek.getDay() + 1;
            }

            var weekStartDate = getShiftedDate(dateInWeek, amountDaysFromWeekStartToGiven);
            var weekEndDate = getShiftedDate(weekStartDate, AMOUNT_DAYS_IN_WEEK_FROM_FIRST_TO_LAST);

            return {
                start: getStartOf(weekStartDate),
                end: getEndOf(weekEndDate)
            }
        }

        function getPrevWeekInterval(currentInterval) {
            return {
                start: getShiftedDate(currentInterval.start, -7),
                end: getShiftedDate(currentInterval.end, -7)
            }
        }

        function getNextWeekInterval(currentInterval) {
            return {
                start: getShiftedDate(currentInterval.start, 7),
                end: getShiftedDate(currentInterval.end, 7)
            }
        }

        function getDayInterval(date) {
            return {
                start: getStartOf(date),
                end: getEndOf(date)
            }
        }

        function getDaysGrid(interval) {
            var daysGrid = []; //{start, end}

            var date = interval.start;
            while (date < interval.end) {
                daysGrid.push({
                    start: getStartOf(date),
                    end: getEndOf(date)
                });

                date = getShiftedDate(date, 1);
            }

            return daysGrid;
        }

        function bindEventsToDays(days, eventSet) {
            days.forEach(function (day) {
                var suitedEvents = eventSet.filter(function (event) {
                    return day.start <= event.start && event.end <= day.end;
                });

                day.events = angular.copy(suitedEvents);
            });
        }

        function getShiftedDate(date, shiftDays) {
            var shiftedDate = new Date(date);
            shiftedDate.setDate(shiftedDate.getDate() + shiftDays);
            return shiftedDate;
        }

        function getStartOf(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }

        function getEndOf(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        }

    }
})();