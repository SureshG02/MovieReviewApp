import React from 'react'
import { shallow, mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../components/App';
import {Provider} from 'react-redux';
import { testData } from '../testData/moviestestdata';
import { testStore } from '../utils/testUtils';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({ adapter: new Adapter() });

const setUp = (initialState={}) => {
    const store = mockStore(initialState);
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    )
    return wrapper;
};

describe('>>>App --- Check all child node exists.',()=>{
    let wrapper;
    const state = { findMovies: testData };
    it('Search node exists', () => {
        wrapper = setUp(state);
        expect(wrapper.find('Search').exists()).toEqual(true)
      });

      it('MovieResults node exists', () => {
        wrapper = setUp(state);
        expect(wrapper.find('MovieResults').exists()).toEqual(true)
      });

      it('MovieItem node exists', () => {
        wrapper = setUp(state);
        expect(wrapper.find('MovieItem').exists()).toEqual(true)
      });
});

describe('>>>App --- Check <h2> <p> and <b> tags.',()=>{
    let wrapper;
    const state = { findMovies: testData };

      it('Conatins <h2> tag', () => {
        wrapper = setUp(state);
        expect(wrapper.contains(<h2>Movies App</h2>)).toEqual(true)
      });

      it('Conatins <p> tag', () => {
        wrapper = setUp(state);
        expect(wrapper.contains(<p> Any good movie is filled with secrets. </p>)).toEqual(true)
      });

      it('Conatins <b> tag', () => {
        wrapper = setUp(state);
        expect(wrapper.contains(<b> Rich Moore </b>)).toEqual(true)
      });
});