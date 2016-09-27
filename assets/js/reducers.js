export function site(state = {}, action) {
    switch (action.type) {
        case 'TOGGLE_FILTERS_VISIBILITY':
            return { ...state, filtersVisible: !state.filtersVisible };
        case 'SET_CATEGORY':
            return { ...state, filtersVisible: false, category: action.category };
        default:
            return state;
    }
}
