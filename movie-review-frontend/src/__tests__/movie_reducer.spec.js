import React from 'react'
import { shallow, mount } from 'enzyme';
import testData from './movietestdata.json';

import movies from '../reducers/movies_reducer';

describe('Movie Reducer',()=>{
    it('Expects change in state', () => {
        let state = testData.movies
        let newState = {
            "title": "Batman v Superman: Dawn of Justice",
            "poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            "year": "2016",
            "plot": "Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.",
            "imdbRating": "6.5",
            "imdbVotes": "580,423",
            "language": "English",
            "summary_short": "The film, pitting Ben Affleck against Henry Cavill, largely serves as an extended trailer for a slate of coming DC Comics movies like “Wonder Woman.”"
        };   
        state = movies(state,{type:"MOVIES",items:newState})
        expect(state).toEqual(newState)
    });
});