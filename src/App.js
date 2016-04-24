import React from "react";
import {Provider, Component, PropTypes} from "shasta";
import TestimonialForm from "./components/PersonForm";
import LastComments from "./components/LastComments";
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
          <Row>
            <Col xs={12}>
              <LastComments />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="space-top">
              <TestimonialForm />
            </Col>
          </Row>
        </Grid>
      </Provider>
    )
  }
}
