import React, { Component } from 'react';
import Search from './Search';
import { connect } from 'react-redux';
import MovieItem from './MovieItem';
import { Row, Col, CardDeck } from 'react-bootstrap';


export class MovieResults extends Component {

	render() {
		return (
			<div>
				<Row>
					<Col>
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Search />
						</div>
					</Col>
				</Row>
				<Row>
					<br />
					<br />
				</Row>
				<Row>
					<CardDeck>
						{
							this.props.movies.map((item, index) => {
								return <Col key={index}> <MovieItem movie={item} key={index} showButton={true} /></Col>
							})
						}
					</CardDeck>
				</Row>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		movies: state.findMovies.movies
	}
}

export default connect(mapStateToProps, null)(MovieResults);