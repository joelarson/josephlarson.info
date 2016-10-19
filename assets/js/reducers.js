export function site(state = {}, action) {
    switch (action.type) {
        case 'TOGGLE_NAV':
            return { ...state, navVisible: !state.navVisible };
        case 'TOGGLE_FILTERS_VISIBILITY':
            return { ...state, filtersVisible: !state.filtersVisible };
        case 'SET_CATEGORY':
            return { ...state, filtersVisible: false, category: action.category };
        case '@@router/LOCATION_CHANGE': {
            let section;
            switch (location.pathname) {
                case '/':
                    section = 'activity';
                    break;
                case '/projects/':
                    section = 'projects';
                    break;
                case '/thoughts/':
                    section = 'thoughts';
                    break;
                default:
                    section = '404';
                    break;
            }
            return { ...state, section, navVisible: false, filtersVisible: false };
        } default:
            return state;
    }
}
