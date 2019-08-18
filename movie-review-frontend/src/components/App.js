import React, { Component } from 'react';
import MovieResults from './MovieResults';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Jumbotron, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

class App extends Component {
  render() {
    return (
      <div className="row text-center">
        <Container>
          <Jumbotron fluid>
            <h2>Movies App</h2>
            <p> Any good movie is filled with secrets. </p>
            <b> Rich Moore </b>
          </Jumbotron>
          <br />
          <Row>
            <Col>
              <Router>
                <Switch>
                  <Route exact path='/' component={MovieResults} />
                </Switch>
              </Router>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
