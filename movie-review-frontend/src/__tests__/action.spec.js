import { enterMovieSearchParam, findMovies, handleClose, nextPageClick, prevPageClick } from '../actions';
import { testData } from '../testData/moviestestdata';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchMovies dispatch test', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('+++ actionCreator fetchMovies', () => {
        fetchMock.getOnce('http://localhost:1035/movie/review?title=Batman&page=1', {
            findMovies: ['do something']
        })

        const expectedActions = [
            { type: 'FINDMOVIESPENDING' },
            { type: 'FINDMOVIESSUCCESS', resObj: { findMovies: ['do something'] }, page: 1 }
        ]
        const store = mockStore({ findMovies: [] })

        return store.dispatch(findMovies('Batman', 1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

describe('test other actions', () => {
    it('+++ actionCreator enterMovieSearchParam', () => {
        expect(enterMovieSearchParam('Batman')).toEqual({ type: 'MOVIESEARCHPARAM', searchParam: 'Batman' })
    });

    it('+++ actionCreator handleClose', () => {
        expect(handleClose()).toEqual({ type: 'HANDLECLOSE' })
    });

    it('+++ actionCreator nextPageClick', () => {
        expect(nextPageClick()).toEqual({ type: 'NEXTPAGECLICK' })
    });

    it('+++ actionCreator prevPageClick', () => {
        expect(prevPageClick()).toEqual({ type: 'PREVPAGECLICK' })
    });
});