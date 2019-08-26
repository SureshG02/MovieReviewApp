import { enterMovieSearchParam, findMovies, handleClose, nextPageClick, prevPageClick } from '../actions';
//import testData from './movietestdata.json';
import { testData } from './moviestestdata';

/*describe('movies action',()=>{
    it('+++ actionCreator movies', () => {
        expect(movies(testData.movies)).toEqual({type:"MOVIES",items:testData.movies})
    });
}); */

describe('enterMovieSearchParam action',()=>{
    it('+++ actionCreator enterMovieSearchParam', () => {
        expect(enterMovieSearchParam('Batman')).toEqual({type:'MOVIESEARCHPARAM',searchParam:'Batman'})
    });
});

describe('findMovies action',()=>{
    it('+++ actionCreator findMovies', () => {
        expect(findMovies('Batman', 1)).toEqual({type:'FINDMOVIESSUCCESS',resObj:testData, page: 1})
    });
});

describe('handleClose action',()=>{
    it('+++ actionCreator handleClose', () => {
        expect(handleClose()).toEqual({type:'HANDLECLOSE'})
    });
});

describe('nextPageClick action',()=>{
    it('+++ actionCreator nextPageClick', () => {
        expect(nextPageClick()).toEqual({type:'NEXTPAGECLICK'})
    });
});

describe('prevPageClick action',()=>{
    it('+++ actionCreator prevPageClick', () => {
        expect(prevPageClick()).toEqual({type:'PREVPAGECLICK'})
    });
});