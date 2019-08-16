import React from 'react'
import { shallow, mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import App from '../components/App';
import ConnectedSearch,{Search} from '../components/Search';
import ConnectedMovieItem,{MovieItem} from '../components/MovieItem';
import ConnectedMovieResults,{MovieResults} from '../components/MovieResults';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import { testStore } from '../utils/testUtils';

configure({ adapter: new Adapter() });


const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    )
    return wrapper;
};

// Snapshot for Home React Component
describe('>>>H O M E --- Snapshot',()=>{
    let wrapper;
    it('has access to `success` state', () => {
        const initialState = { 
            movies:[{   
                imdbRating: "8.2",
                imdbVotes: "1,200,605",
                language: "English, Urdu, Mandarin",
                plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
                poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
                summary_short: "N/A",
                title: "Batman Begins",
                year: "2005"
            },
            {   
                imdbRating: "8.2",
                imdbVotes: "1,200,605",
                language: "English, Urdu, Mandarin",
                plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
                poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
                summary_short: "N/A",
                title: "Batman Begins",
                year: "2005"
            }] }
        wrapper = setUp(initialState);
        //console.log(wrapper.instance().props.movies);
      });

    /*it('+++ render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
     });
 
     it('+++ check Prop matches with initialState', () => {
        expect(container.movies).toEqual(initialState.movies)
     }); */
});
