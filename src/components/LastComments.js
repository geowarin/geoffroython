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
    this.testimonialsRef = new Firebase("https://geoffroython.firebaseio.com/testimonials");
    this.fetchTestimonials(null, 3);
  }

  componentWillUnmount() {
    this.testimonialsRef.off('value');
  }

  fetchTestimonials (e, nbComments) {
    if (e) {
      e.preventDefault();
    }
    this.testimonialsRef.off('value');
    this.testimonialsRef.orderByChild('date').limitToLast(nbComments).on('value', this.updateComments);
  }

  updateComments (snapshot) {
    const lastComments = [];
    snapshot.forEach(data => {
      lastComments.push({key: data.key(), data: data.val()});
    });
    this.setState({lastComments})
  }

  render () {
    const items = this.state.lastComments.reverse().map(comment => {
      const status = this.getDonatorStatus(comment.data.donation);
      const statusText = ` ${status}`;

      const email = comment.data.email;
        return <Col key={comment.key} xs={4}>
        <Gravatar email={email}/> <strong>{statusText}</strong>
        <blockquote>
          {comment.data.comment}
          <footer>{email.substr(0, email.indexOf('@'))}</footer>
        </blockquote>
      </Col>
    });

    const link = this.state.lastComments.length === 3
      ? <a href="#lastTestimonials" onClick={(e) => this.fetchTestimonials(e, 1000)}>Voir plus</a>
      : <a href="#lastTestimonials" onClick={(e) => this.fetchTestimonials(e, 3)}>Voir moins</a>;

    return (
      <div>
        <Row><h2 id="lastTestimonials">Dernier témoignages</h2></Row>
        <Row> {items} </Row>

        <Row> {link} </Row>
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
