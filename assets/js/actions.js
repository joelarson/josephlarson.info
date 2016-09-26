import * as moment from 'moment';


export function toggleFiltersVisibility() {
    return { type: 'TOGGLE_FILTERS_VISIBILITY' };
}

export function setCategory(category) {
    return { type: 'SET_CATEGORY', category };
}


// //////////////////////////
// pure actions

export function requestMonth() {
    return { type: 'REQUEST_MONTH' };
}

export function receiveMonth(monthKey, days, exceptions) {
    return { type: 'RECEIVE_MONTH', monthKey, days, exceptions };
}

export function showMonth(monthKey) {
    return { type: 'SHOW_MONTH', monthKey };
}

export function refreshCalendar() {
    return { type: 'REFRESH' };
}

export function beginTimeSelection(day) {
    return { type: 'BEGIN_TIME_SELECTION', day };
}

export function dragTimeSelection(day) {
    return { type: 'DRAG_TIME_SELECTION', day };
}

export function endTimeSelection(day) {
    return { type: 'END_TIME_SELECTION', day };
}

export function cancelTimeSelection() {
    return { type: 'CANCEL_TIME_SELECTION' };
}


// //////////////////////////
// impure actions

export function fetchMonth(month, opts = { refresh: false }) {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.months[month] || opts.refresh) {
            // let ui know we're requesting data to show loader
            dispatch(requestMonth());
            // asyncronously fetch both days and exceptions
            const daysRequest = fetch(`/api/hours/?month=${month}`)
                .then(response => response.json());
            const exceptionsRequest = fetch(`/api/exceptions/?month=${month}`)
                .then(response => response.json());
            // merge requests into single promise
            return Promise.all([daysRequest, exceptionsRequest])
                .then(([daysResponse, exceptionsResponse]) => {
                    dispatch(receiveMonth(month, daysResponse, exceptionsResponse.results));
                    if (opts.refresh) return dispatch(refreshCalendar());
                    return dispatch(showMonth(month));
                });
        }
        // month allready loaded, show it
        return dispatch(showMonth(month));
    };
}

export function initCalendar() {
    return (dispatch, getState) => {
        if (getState().selected) return Promise.resolve();
        return dispatch(fetchMonth(moment().format('YYYY-MM')));
    };
}

export function fetchPrevMonth() {
    return (dispatch, getState) => dispatch(fetchMonth(
        moment(getState().selected).subtract(1, 'M').format('YYYY-MM')
    ));
}

export function fetchNextMonth() {
    return (dispatch, getState) => dispatch(fetchMonth(
        moment(getState().selected).add(1, 'M').format('YYYY-MM')
    ));
}

export function fetchRefresh() {
    return (dispatch, getState) => dispatch(fetchMonth(getState().selected, { refresh: true }));
}
