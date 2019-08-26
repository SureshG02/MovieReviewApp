import React, { Component } from 'react';

import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { findMovies, nextPageClick, prevPageClick } from '../actions';
import { connect } from 'react-redux';


export class MoviePagination extends Component {
    render() {
        const { pageRange, pageCounter, totalPageNumber, activePage, query, isFirstLoad } = this.props;
        
		/* Custom pagination logic to show number of pages based on totalPageNumber received from backend. Note here 
		each click on pagination button makes call to backend.*/
        const pageNumbers = [];
        let start, end, prevDisable, nextDisable, hideNav;
        if (pageCounter === Math.ceil(totalPageNumber / pageRange)) {
            nextDisable = true
        }

        if (pageCounter === 1) {
            prevDisable = true
        }

        if (totalPageNumber <= pageRange) {
            start = 1
            end = totalPageNumber
            hideNav = true
        } else {
            if (pageCounter === Math.ceil(totalPageNumber / pageRange) && (totalPageNumber % pageRange !== 0)) {
                start = pageCounter * pageRange - pageRange + 1
                end = pageCounter * pageRange - pageRange + totalPageNumber % pageRange
            } else {
                start = pageCounter * pageRange - pageRange + 1
                end = pageCounter * pageRange
            }
        }

        if (totalPageNumber !== 1) {
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
        }
        const renderPagination = pageNumbers.map(number => {
            return (
                <Button variant="success" type="button" key={number} id={number} hidden={isFirstLoad} active={number === activePage} onClick={(event) => this.props.findMovies(query, event.target.id)}>
                    {number}
                </Button>
            );
        });
        return (
            <div>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <ButtonToolbar aria-label="Toolbar with button groups"  >
                        <ButtonGroup className="mr-2" aria-label="First group">
                            <Button variant="success" type="button" key={start} id={start} disabled={prevDisable} hidden={hideNav || isFirstLoad} onClick={(event) => this.props.prevPageClick()}>
                                {"prev"}
                            </Button>
                            {renderPagination}
                            <Button variant="success" type="button" key={end} id={end} disabled={nextDisable} hidden={hideNav || isFirstLoad} onClick={(event) => this.props.nextPageClick()}>
                                {"next"}
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        query: state.findMovies.query,
        pageCounter: state.findMovies.pageCounter,
        pageRange: state.findMovies.pageRange,
        totalPageNumber: state.findMovies.totalPageNumber,
        isFirstLoad: state.findMovies.isFirstLoad,
        activePage: state.findMovies.activePage
    }
}


export default connect(mapStateToProps, { findMovies, nextPageClick, prevPageClick })(MoviePagination);
