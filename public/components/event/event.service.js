(function () {
    angular
        .module('schedulerApp')
        .factory(function (localStorageService) {
            var eventsKey = 'events';
            // event:
            // {
            //      dateFrom,
            //      dateTo,
            //      desc
            // }

            return {
                getAllEvents: getAllEvents,
                getWeekEvents: getWeekEvents,
                getDayEvents: getDayEvents,
                setEvent: setEvent,

                getWeekIntervalWith: getWeekIntervalWith
            };

            function getAllEvents() {
                return localStorageService.get(eventsKey) || [];
            }

            function getWeekEvents(date) {
                var events = getAllEvents();
                var weekInterval = getWeekIntervalWith(date);

                return events.filter(function (event) {
                    return event.dateFrom >= weekInterval.startDate &&
                            event.dateTo <= weekInterval.endDate;
                });
            }

            function getDayEvents(date) {
                var events = getAllEvents();

                var startOfDate = getStartOf(date);
                var endOfDate = getEndOf(date);

                return events.filter(function (event) {
                    return event.dateFrom >= startOfDate &&
                        event.dateTo <= endOfDate;
                });
            }

            function setEvent(event) {
                var events = getAllEvents();
                events.push(event);
                return localStorageService.set(eventsKey, events);
            }

            function getWeekIntervalWith(dateInWeek) {
                var weekStartDate = getStartOf(dateInWeek);
                weekStartDate.setDate(weekStartDate.getDate()-weekStartDate.getDay() + 1);

                return {
                    startDate: weekStartDate,
                    endDate: new Date(+weekStartDate + 7*24*3600*1000 -1)
                }
            }

            function getStartOf(date) {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }

            function getEndOf(date) {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
            }

        })
})();