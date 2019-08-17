import { movies } from '../actions';
import testData from './movietestdata.json';

describe('movies action',()=>{
    it('+++ actionCreator movies', () => {
        expect(movies(testData.movies)).toEqual({type:"MOVIES",items:testData.movies})
    });
});