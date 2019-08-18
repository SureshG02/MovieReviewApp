import React, { Component } from 'react';

import { Form, Button, Spinner, Modal, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { movies } from '../actions';
import { connect } from 'react-redux';


export class Search extends Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			error: '',
			loading: false,
			show: false,
			totalPageNumber: '',
			pageCounter: 1,
			pageRange: 5,
			isFirstLoad: true,
			activePage: 1
		};
	}

	search(event) {
		const url = `http://localhost:1035/movie/review?title=${this.state.query}&page=${event.target.id}`;
		this.setState({ loading: true });
		this.setState({ activePage: Number(event.target.id) });
		fetch(url, {
			method: 'GET'
		}).then(response => response.json())
			.then(jsonObj => {
				if (jsonObj.error === null || jsonObj.error === '') {
					this.props.movies(jsonObj.movieSummaryList);
					this.setState({ totalPageNumber: jsonObj.pageNumber });
					this.setState({ loading: false });
					this.setState({ isFirstLoad: false });
				} else {
					this.setState({ error: jsonObj.error });
					this.setState({ loading: false });
					this.setState({ show: true });
					this.setState({ isFirstLoad: false });
					this.setState({ pageCounter: 1 });
				}
			}).catch(error => {
				console.log(error)
				this.setState({ error: 'Error while fetching data from backend.' });
				this.setState({ loading: false });
				this.setState({ show: true });
				this.setState({ isFirstLoad: false });
				this.setState({ pageCounter: 1 });
			})
	}

	handleClose(event) {
		let movieSummaryList = [];
		this.setState({ show: false });
		this.props.movies(movieSummaryList);
		this.setState({ isFirstLoad: true });
	}

	nextClick(event) {
		const { pageCounter } = this.state;
		this.setState({ pageCounter: pageCounter + 1 });
	}

	prevClick(event) {
		console.log(event.target.id)
		const { pageCounter } = this.state;
		this.setState({ pageCounter: pageCounter - 1 })
	}

	render() {
		const { pageRange, pageCounter, isFirstLoad, totalPageNumber, activePage, query } = this.state

		/* Show loading icon when till data is fetched.*/
		if (this.state.loading) {
			return (
				<Spinner animation="border" role="status" >
					<span className="sr-only">Loading...</span>
				</Spinner>
			)
		}

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

		for (let i = start; i <= end; i++) {
			pageNumbers.push(i);
		}

		const renderPagination = pageNumbers.map(number => {
			return (
				<Button variant="success" type="button" key={number} id={number} hidden={isFirstLoad} active={number === activePage} onClick={(event) => this.search(event)}>
					{number}
				</Button>
			);
		});
		return (
			<div>
				<Form inline className="col-md-12 col-md-offset-4">
					<Form.Group controlId="formBasicSearch">
						<Form.Label>Search</Form.Label>
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<Form.Control type="text" placeholder={query}
							onChange={(event) => this.setState({ query: event.target.value })} />
						<span>&nbsp;&nbsp;</span>
					</Form.Group>
					<Button variant="success" type="button" id={1} onClick={(event) => this.search(event)}>
						Submit
					</Button>
				</Form>
				<Modal show={this.state.show} onHide={() => this.handleClose()}>
					<Modal.Header closeButton>
						<Modal.Title>Something went wrong!!!!</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.state.error}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.handleClose()}>
							Close
  						</Button>
					</Modal.Footer>
				</Modal>
				<br />
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
					<ButtonToolbar aria-label="Toolbar with button groups"  >
						<ButtonGroup className="mr-2" aria-label="First group">
							<Button variant="success" type="button" key={start} id={start} disabled={prevDisable} hidden={hideNav || isFirstLoad} onClick={(event) => this.prevClick(event)}>
								{"prev"}
							</Button>
							{renderPagination}
							<Button variant="success" type="button" key={end} id={end} disabled={nextDisable} hidden={hideNav || isFirstLoad} onClick={(event) => this.nextClick(event)}>
								{"next"}
							</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</div>
			</div>
		)
	}
}

export default connect(null, { movies })(Search);
