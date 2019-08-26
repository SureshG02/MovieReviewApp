import React from 'react'
import { shallow, mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ConnectedSearch,{Search} from '../components/Search';
import {Provider} from 'react-redux';
import { testStore } from '../utils/testUtils';
import testData from './movietestdata.json';
import { movies } from '../actions';

configure({ adapter: new Adapter() });


//*******************************************************************************************************
describe('>>>Search --- REACT-REDUX (Mount + wrapping in <Provider>',()=>{
    let wrapper;
    const state = { movies: testData.movies };
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

    it('Expects 3 button rendering on search page(2 hidden and 1 visible)', () => {
        expect(wrapper.find('Button')).toHaveLength(3);
    });

    it("Expects to run onClick function when submit button is pressed in the DOM", () => {
        wrapper.find('Button').at(0).simulate('click')
        expect(wrapper.contains('Loading...')).toEqual(true)
    });

    it('+++ check action on dispatching ', () => {
        let action;
        action = store.dispatch(movies(testData.movies))
        expect(action.type).toBe("MOVIES")
    });
});
