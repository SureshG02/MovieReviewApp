import React from 'react'
import { shallow, mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieItem from '../components/MovieItem';
import {Provider} from 'react-redux';
import { testData } from '../testData/moviestestdata';

configure({ adapter: new Adapter() });

describe('MovieItem component test',()=>{
    let wrapper;
    const movie = {
        "title": "Batman v Superman: Dawn of Justice",
        "poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        "year": "2016",
        "plot": "Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.",
        "imdbRating": "6.5",
        "imdbVotes": "580,423",
        "language": "English",
        "summary_short": "The film, pitting Ben Affleck against Henry Cavill, largely serves as an extended trailer for a slate of coming DC Comics movies like “Wonder Woman."
    }

    beforeEach(() => {        
        wrapper = mount(
            <MovieItem movie = {movie} />
        )
    })

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
     });

    it('Expects movie title after render', () => {
        expect(wrapper.contains('Batman v Superman: Dawn of Justice')).toEqual(true)
    });

    it('Expects one view more info button after render', () => {
        expect(wrapper.find('Button')).toHaveLength(1);
    })

    it("Expects to run onClick function when View More Information is pressed", () => {
        wrapper.find('Button').at(0).simulate('click')
        expect(wrapper.contains('The film, pitting Ben Affleck against Henry Cavill, largely serves as an extended trailer for a slate of coming DC Comics movies like “Wonder Woman.')).toEqual(true)
    });

    it("Check imdb votes after View More Information is pressed", () => {
        wrapper.find('Button').at(0).simulate('click')
        expect(wrapper.contains('580,423')).toEqual(true)
    });

    it("Check imdb rating after View More Information is pressed", () => {
        wrapper.find('Button').at(0).simulate('click')
        expect(wrapper.contains('6.5')).toEqual(true)
    });

    it("Check plot after View More Information is pressed", () => {
        wrapper.find('Button').at(0).simulate('click')
        expect(wrapper.contains('Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.')).toEqual(true)
    });
});
