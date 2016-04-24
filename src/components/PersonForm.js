import React from "react";
import {Component} from "shasta";
import {FormGroup, InputGroup, Glyphicon, FormControl, ControlLabel} from "react-bootstrap";
import Firebase from "firebase";
import Button from "./Button";

export default class TestimonialForm extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      donation: 0
    }
  }

  componentDidMount () {
    this.testimonialsRef = new Firebase("https://geoffroython.firebaseio.com/testimonials");
  }

  getValidationState () {
    const length = this.state.donation;
    if (length > 10000) return 'success';
    else if (length > 1000) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange (e) {
    var value = e.target.value;
    this.setState({
      [e.target.id]: value
    });
  }

  onSubmit (e) {
    e.preventDefault();
    const newTestimonialRef = this.testimonialsRef.push();
    newTestimonialRef.set({
      email: this.state.email,
      comment: this.state.comment,
      donation: this.state.donation,
      date: new Date().getTime()
    })
  }

  render () {
    return (
      <div>
        <h1>Comments</h1>
        <form onSubmit={this.onSubmit}>

          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" required onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup controlId="comment">
            <ControlLabel>Comment</ControlLabel>
            <FormControl componentClass="textarea" required placeholder="I love Geoffroy. This guys is awesome" onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup controlId="donation" validationState={this.getValidationState()}>
            <ControlLabel>Donation</ControlLabel>
            <InputGroup>
              <FormControl type="number" value={this.state.donation} placeholder="Enter text" onChange={this.handleChange}/>
              <InputGroup.Addon>
                M <Glyphicon glyph="euro"/>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <Button loading={false} type="submit" label="Submit"/>
        </form>
      </div>
    )
  }
}
