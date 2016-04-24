import React from "react";
import {Provider, Component, PropTypes} from "shasta";
import PersonForm from "./components/PersonForm";
import CommentCarousel from "./components/CommentsCarousel";
import {Grid, Col, Row, Jumbotron} from "react-bootstrap";

export default class RootView extends Component {
  static displayName = 'RootView';
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render () {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <Grid>
          <Col>
            <Jumbotron>
              <h1>Geoffroython</h1>
              <p>Le Panama c'est foutu. Investissez dans mon pot de départ.</p>
            </Jumbotron>
          </Col>
          <CommentCarousel />
          <Col>
            <Row>
              <PersonForm />
            </Row>
          </Col>
        </Grid>
      </Provider>
    )
  }
}
