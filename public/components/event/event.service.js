(function () {
    angular
        .module('schedulerApp')
        .factory('eventService', eventService);

    function eventService(localStorageService, btfModal, $q) {
        var eventsKey = 'events';
        // event:
        // {
        //      start,
        //      end,
        //      name
        //      desc,
        //      id
        // }

        return {
            getAllEvents: getAllEvents,
            getEventsIn: getEventsIn,
            setEvent: setEvent,
            removeEvent: removeEvent,
            excludeEventFromSet: excludeEventFromSet,
            getEventDurationHrs: getEventDurationHrs,
            getEventStartHrs: getEventStartHrs,

            showEventModal: showEventModal
        };

        function getAllEvents() {
            var events = localStorageService.get(eventsKey) || [];
            events.forEach(function (event) {
                event.start = new Date(event.start);
                event.end = new Date(event.end);
            });

            return events;
        }

        function getEventsIn(interval) {
            var events = getAllEvents();

            return events.filter(function (event) {
                return event.start >= interval.start &&
                    event.end <= interval.end;
            });
        }

        function setEvent(event) {
            var events = getAllEvents();
            if (event.id) {
                events = excludeEventFromSet(events, event.id);
            } else {
                event.id = 'event_' + Date.now() + '_' + getRandom();
            }
            events.push(event);
            return localStorageService.set(eventsKey, events);
        }

        function removeEvent(id) {
            var updatedEventSet = excludeEventFromSet(getAllEvents(), id);
            return localStorageService.set(eventsKey, updatedEventSet);
        }

        function excludeEventFromSet(eventSet, idToExclude) {
            return eventSet
                .filter(function (event) {
                    return event.id !== idToExclude;
                });
        }

        function getEventDurationHrs(event) {
            var MINUTES_IN_HOUR = 60;
            return event.end.getHours() - event.start.getHours() +
                (event.end.getMinutes() - event.start.getMinutes()) / MINUTES_IN_HOUR;
        }

        function getEventStartHrs(event) {
            var MINUTES_IN_HOUR = 60;
            return event.start.getHours() + event.start.getMinutes() / MINUTES_IN_HOUR;
        }

        function showEventModal(options) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            options.confirm = function (result) {
                deferred.resolve(result);
            };

            options.decline = function (result) {
                deferred.reject(result);
            };

            var eventModal = btfModal({
                templateUrl: 'components/event/eventModal.html',
                controller: 'EventModalController',
                controllerAs: 'vm'
            });

            eventModal.activate({
                options: options
            });

            promise.finally(eventModal.deactivate);

            return promise;
        }

        function getRandom() {
            var min = 0,
                max = 1000;
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        }
    }
})();