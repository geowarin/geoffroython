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
    const items = this.state.lastComments.map(comment => {
      return <Col key={comment.key} xs={4}>
        <Gravatar email={comment.data.email}/>
        <blockquote>
          {comment.data.comment}
          <footer>{comment.data.email}</footer>
        </blockquote>
      </Col>
    });

    return (
      <div>
        <Row><h2>Latest testimonials</h2></Row>
        <Row> {items} </Row>
      </div>
    )
  }
}
