import { FINDMOVIESPENDING, FINDMOVIESSUCCESS, FINDMOVIESERROR, HANDLECLOSE, NEXTPAGECLICK, PREVPAGECLICK, MOVIESEARCHPARAM } from '../actions';

const initialState = {
    query: '',
    movies: [],
    loading: false,
    isFirstLoad: true,
    error: null,
    show: false,
    pageCounter: 1,
    pageRange: 5,
    totalPageNumber: '',
    activePage: 1
}
export default function findMovies(state = initialState, action) {
    switch (action.type) {
        case MOVIESEARCHPARAM:
            return {
                ...state,
                query: action.searchParam
            }
        case FINDMOVIESPENDING:
            return {
                ...state,
                loading: true
            }
        case FINDMOVIESSUCCESS:
            return {
                ...state,
                movies: action.resObj.movieSummaryList,
                loading: false,
                isFirstLoad: false,
                totalPageNumber: action.resObj.pageNumber,
                activePage: action.page
            }
        case FINDMOVIESERROR:
            return {
                ...state,
                movies: [],
                error: action.error,
                loading: false,
                show: true,
                isFirstLoad: false,
                pageCounter:1
            }
        case HANDLECLOSE:
            return {
                ...state,
                movies: [],
                show: false,
                isFirstLoad: true
            }
        case NEXTPAGECLICK:
            return {
                ...state,
                pageCounter: state.pageCounter + 1
            }
        case PREVPAGECLICK:
            return {
                ...state,
                pageCounter: state.pageCounter - 1
            }

        default:
            return state;
    }
}