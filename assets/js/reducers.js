export function site(state = {}, action) {
    switch (action.type) {
        case 'TOGGLE_NAV':
            return { ...state, navVisible: !state.navVisible };
        case 'TOGGLE_FILTERS_VISIBILITY':
            return { ...state, filtersVisible: !state.filtersVisible };
        case 'SET_CATEGORY':
            return { ...state, filtersVisible: false, category: action.category };
        case '@@router/LOCATION_CHANGE':
            return { ...state, navVisible: false, filtersVisible: false };
        default:
            return state;
    }
}
