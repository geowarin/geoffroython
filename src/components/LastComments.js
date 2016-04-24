import React from "react";
import {Component} from "shasta";
import {Col, Row} from "react-bootstrap";
import Gravatar from "./Gravatar";

export default class LastComments extends Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      lastComments: []
    };
    const testimonialsRef = new Firebase("https://geoffroython.firebaseio.com/testimonials");

    testimonialsRef.orderByChild('date').limitToLast(3).on('value', snapshot => {
      const lastComments = [];
      snapshot.forEach(data => {
        lastComments.push({key: data.key(), data: data.val()});
      });
      this.setState({lastComments})
    })
  }

  render () {
    const items = this.state.lastComments.reverse().map(comment => {
      const status = this.getDonatorStatus(comment.data.donation);
      const statusText = ` ${status}`;

      return <Col key={comment.key} xs={4}>
        <Gravatar email={comment.data.email}/> <strong>{statusText}</strong>
        <blockquote>
          {comment.data.comment}
          <footer>{comment.data.email}</footer>
        </blockquote>
      </Col>
    });

    return (
      <div>
        <Row><h2>Dernier témoignages</h2></Row>
        <Row> {items} </Row>
      </div>
    )
  }

  getDonatorStatus (donation) {
    if (donation > 10000) return 'Généreux donateur';
    else if (donation > 1000) return 'Un mec bien';
    else if (donation > 100) return 'Près de ses sous';
    else if (donation === 42) return 'Cool Boy';
    else if (donation > 50) return 'A raté sa vie';
    else if (donation > 10) return 'Gros Radin';
    else if (donation > 0) return 'Pauvre';
    return 'Personage négatif'
  }
}
