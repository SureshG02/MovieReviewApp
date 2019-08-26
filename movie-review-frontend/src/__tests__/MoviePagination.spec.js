import React from 'react'
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ConnectedMoviePagination, { MoviePagination } from '../components/MoviePagination';
import { Provider } from 'react-redux';
import { testStore } from '../utils/testUtils';

import { testData } from '../testData/moviestestdata';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('>>>MoviePagination --- REACT-REDUX (Mount + wrapping in <Provider>', () => {
    let wrapper;
    const state = { findMovies: testData };
    const store = testStore(state);

    beforeEach(() => {
        wrapper = mount(<Provider store={store}>
            <ConnectedMoviePagination />
        </Provider>
        )
    })

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('Expects 7 buttons rendering (2 for Prev and Next and 5 button for number of pages)', () => {
        expect(wrapper.find('Button')).toHaveLength(7);
    });

    it("Expects to run onClick function when Next button is clicked", () => {
        wrapper.find('Button').at(6).simulate('click')
        expect(wrapper.find(MoviePagination).prop('pageCounter')).toEqual(2)
    });

});
