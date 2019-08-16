import React, { Component } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import fallback from '../fallback-image.png';


export class MovieItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewOrCloseMoreInformation: false,
			imageLoadError: true
		};
	}

	handleViewOrCloseMoreInformationLink() {
		this.setState({ viewOrCloseMoreInformation: !this.state.viewOrCloseMoreInformation });
	}

	render() {
		return (
			<div className="thumbnail">
				<Card style={{ width: '18rem'}}>
				  <Card.Img variant="top" src={this.props.movie.poster} onError={e => {
						if (this.state.imageLoadError) {
							this.setState({
								imageLoadError: false
							});
							e.target.src = fallback;
						}
					}} />
					<Card.Body>
						<Card.Title> {this.props.movie.title} </Card.Title>
					</Card.Body>
					<Card.Footer>
						<Button variant="link" onClick={() => this.handleViewOrCloseMoreInformationLink()}> View more information </Button>
					</Card.Footer>
				</Card>
				<Modal show={this.state.viewOrCloseMoreInformation} onHide={() => this.handleViewOrCloseMoreInformationLink()}>
					<Modal.Header closeButton>
						<Modal.Title>{this.props.movie.title}</Modal.Title>
					</Modal.Header>
					<Modal.Title> Year: </Modal.Title>
					<Modal.Body>{this.props.movie.year}</Modal.Body>
					<Modal.Title> Plot: </Modal.Title>
					<Modal.Body>{this.props.movie.plot}</Modal.Body>
					<Modal.Title> Imdb Rating: </Modal.Title>
					<Modal.Body>{this.props.movie.imdbRating}</Modal.Body>
					<Modal.Title> ImdbVotes Votes: </Modal.Title>
					<Modal.Body>{this.props.movie.imdbVotes}</Modal.Body>
					<Modal.Title> Summary short: </Modal.Title>
					<Modal.Body>{this.props.movie.summary_short}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.handleViewOrCloseMoreInformationLink()}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default MovieItem;
