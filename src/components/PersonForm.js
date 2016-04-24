import React from "react";
import {Component} from "shasta";
import {FormGroup, InputGroup, Glyphicon, FormControl, ControlLabel, HelpBlock} from "react-bootstrap";
import Firebase from "firebase";
import Button from "./Button";

export default class PersonForm extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      value: ''
    }
  }

  componentDidMount () {
    this.myFirebaseRef = new Firebase("https://geoffroython.firebaseio.com");
    this.myFirebaseRef.child('form').on('value', (snapshot) => {
      const form = snapshot.val();
      console.log(form.value);
      this.setState({value: form.value});
    })
  }

  getValidationState () {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange (e) {
    var value = e.target.value;
    this.setState({value});
  }

  onSubmit (e) {
    e.preventDefault();
    this.myFirebaseRef.child('form').set({
      value: this.state.value
    })
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl type="text"/>
            <InputGroup.Addon>
              <Glyphicon glyph="euro"/>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>

        <Button loading={false} type="submit" label="Submit"/>
      </form>
    )
  }
}
