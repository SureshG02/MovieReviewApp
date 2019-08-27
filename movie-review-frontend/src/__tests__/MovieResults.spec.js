import React from 'react'
import { shallow, mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConnectedMovieResults,{MovieResults} from '../components/MovieResults';
import {Provider} from 'react-redux';
import { testData } from '../testData/moviestestdata';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('>>>MovieResults --- REACT-REDUX (Shallow + passing the {store} directly)',()=>{
    let wrapper;
    const state = { findMovies: testData };
    const store = mockStore(state);

    beforeEach(()=>{
        wrapper = shallow(
            <ConnectedMovieResults store={store} />
        ).dive()  
    })

    it('Render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
     });

    it('Has access to `movies` state', () => {
        expect(wrapper.props().movies).toBe(testData.movies);
    });
});

describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)',()=>{
    let wrapper;
    const state = { findMovies: testData };
    const store = mockStore(state);

    beforeEach(() => {        
        wrapper = mount(<Provider store={store}>
            <ConnectedMovieResults />
        </Provider>
        )
    })

    it('Render the connected(SMART) component', () => {
       expect(wrapper.find(ConnectedMovieResults).length).toEqual(1)
    });

    it('Check Prop matches with state', () => {
       expect(wrapper.find(MovieResults).prop('movies')).toEqual(state.findMovies.movies)
    });

    it('Check MovieItem count is same as input test data', () => {
        expect(wrapper.find('MovieItem')).toHaveLength(10);
    });
});