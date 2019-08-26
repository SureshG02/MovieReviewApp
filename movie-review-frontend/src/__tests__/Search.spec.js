import React from 'react'
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ConnectedSearch, { Search } from '../components/Search';
import { Provider } from 'react-redux';
import { testStore } from '../utils/testUtils';

import { testData } from '../testData/moviestestdata';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('>>>Search --- REACT-REDUX (Mount + wrapping in <Provider>', () => {
    let wrapper;
    const state = testData;
    const store = testStore(state);

    beforeEach(() => {
        wrapper = mount(<Provider store={store}>
            <ConnectedSearch />
        </Provider>
        )
    })

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('Expects 1 button rendering on search page', () => {
        expect(wrapper.find('Button')).toHaveLength(1);
    });

    it("Expects to run onClick function when submit button is pressed in the DOM", () => {
        wrapper.find('Button').at(0).simulate('click')
        expect(wrapper.contains('Loading...')).toEqual(true)
    });

});
