import React from 'react'
import { shallow, mount } from 'enzyme';
import { testData } from '../testData/moviestestdata';
import findMovies from '../reducers/findMovies_reducer';

describe('Movie Reducer type MOVIESEARCHPARAM test', () => {
    let state = testData;
    let searchParam = 'Wonder Woman';

    it('Expects change in query props', () => {
        state = findMovies(state, { type: "MOVIESEARCHPARAM", searchParam })
        expect(state.query).toEqual(searchParam)
    });

});

describe('Movie Reducer type FINDMOVIESPENDING test', () => {
    let state = testData;

    it('Expects change in loading props', () => {
        state = findMovies(state, { type: "FINDMOVIESPENDING" })
        expect(state.loading).toEqual(true)
    });

});

describe('Movie Reducer type FINDMOVIESSUCCESS test', () => {
    let state = testData;
    let resObj = {
        movieSummaryList: [
            {
                title: "Batman Begins",
                poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
                year: "2005",
                plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
                imdbRating: "8.2",
                imdbVotes: "1,200,605",
                language: "English, Urdu, Mandarin",
                summary_short: "N/A"
            }
        ],
        error: null,
        pageNumber: 3,
    };

    beforeAll(() => {
        state = findMovies(state, { type: "FINDMOVIESSUCCESS", resObj })
    });

    it('Expects change in movies props', () => {
        expect(state.movies).toEqual(resObj.movieSummaryList)
    });

    it('Expects change in page number props', () => {
        expect(state.totalPageNumber).toEqual(resObj.pageNumber)
    });

    it('Expects change in isFirstLoad props', () => {
        expect(state.isFirstLoad).toEqual(false)
    });

});

describe('Movie Reducer type FINDMOVIESERROR test', () => {
    let state = testData;
    let error = 'Error occured while fetching data from backend.';

    beforeAll(() => {
        state = findMovies(state, { type: "FINDMOVIESERROR", error })
    });

    it('Expects change in error props', () => {
        expect(state.error).toEqual(error)
    });

    it('Expects change in show props', () => {
        expect(state.show).toEqual(true)
    });

});

describe('Movie Reducer type HANDLECLOSE test', () => {
    let state = testData;
    testData.show = true;

    it('Expects change in show props', () => {
        state = findMovies(state, { type: "HANDLECLOSE" })
        expect(state.show).toEqual(false)
    });

});

describe('Movie reducer type NEXTPAGECLICK and PREVPAGECLICK test', () => {
    let state = testData;
    it(('Expects increment in pagecounter by 1'), () => {
        state = findMovies(state, { type: 'NEXTPAGECLICK' })
        expect(state.pageCounter).toEqual(2)
    });

    it('Expects decrement in pagecounter by 1', () => {
        state = findMovies(state, { type: 'PREVPAGECLICK' })
        expect(state.pageCounter).toEqual(1)
    });
})