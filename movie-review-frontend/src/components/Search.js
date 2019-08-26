import React, { Component } from 'react';

import { Form, Button, Spinner, Modal } from 'react-bootstrap';
import { findMovies, handleClose, enterMovieSearchParam } from '../actions';
import { connect } from 'react-redux';
import MoviePagination from './MoviePagination';


export class Search extends Component {
	render() {
		/* Show loading icon when till data is fetched.*/
		if (this.props.loading) {
			return (
				<Spinner animation="border" role="status" >
					<span className="sr-only">Loading...</span>
				</Spinner>
			)
		}
		return (
			<div>
				<Form inline className="col-md-12 col-md-offset-4">
					<Form.Group controlId="formBasicSearch">
						<Form.Label>Search</Form.Label>
						<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<Form.Control type="text" placeholder={this.props.query}
							onChange={(event) => this.props.enterMovieSearchParam(event.target.value)} />
						<span>&nbsp;&nbsp;</span>
					</Form.Group>
					<Button variant="success" type="button" id={1} disabled={this.props.query.length === 0} onClick={(event) => this.props.findMovies(this.props.query, event.target.id)}>
						Submit
					</Button>
				</Form>
				<Modal show={this.props.show} onHide={() => this.props.handleClose()}>
					<Modal.Header closeButton>
						<Modal.Title>Something went wrong!!!!</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.props.error}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.props.handleClose()}>
							Close
  						</Button>
					</Modal.Footer>
				</Modal>
				<MoviePagination />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		query: state.findMovies.query,
		loading: state.findMovies.loading,
		isFirstLoad: state.findMovies.isFirstLoad,
		show: state.findMovies.show,
		error: state.findMovies.error
	}
}


export default connect(mapStateToProps, { findMovies, handleClose, enterMovieSearchParam })(Search);
