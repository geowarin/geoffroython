import React from "react";
import {Component} from "shasta";
import {FormGroup, InputGroup, Glyphicon, FormControl, ControlLabel} from "react-bootstrap";
import Firebase from "firebase";
import Button from "./Button";
import axios from "axios";

export default class TestimonialForm extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      donation: 0,
      testimonialProposition: ''
    }
  }

  componentDidMount () {
    this.testimonialsRef = new Firebase("https://geoffroython.firebaseio.com/testimonials");
    this.fetchJoke();
  }

  fetchJoke () {
    axios.get('http://api.icndb.com/jokes/random?firstName=Geoffroy&lastName=Warin&limitTo=[nerdy]')
      .then(rep => this.setState({testimonialProposition: rep.data.value.joke}))
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
      donation: parseInt(this.state.donation),
      date: new Date().getTime()
    });
    this.setState({
      donation: 0,
      email: '',
      comment: ''
    });
    this.fetchJoke();
  }

  openSecretUrl() {
    window.location = 'http://rickrolled.fr/';
  }

  render () {
    return (
      <div>
        <h1>Votre témoignage</h1>

        <p>
          Travailler avec Geoffroy a dû être un moment fort dans votre carrière.
          Il est temps de l'avouer à la face du monde et de passer à la caisse.
        </p>

        <p>
          Si vous avez l'intention de laisser un gentil commentaire mais ne désirez pas participer financièrement au
          GeoffroyThon, rendez-vous <a href="#" onClick={this.openSecretUrl}>ici</a>.
        </p>

        <hr/>

        <form onSubmit={this.onSubmit}>

          <FormGroup controlId="email">
            <ControlLabel>E-mail (pour le gravatar)</ControlLabel>
            <FormControl type="email" required onChange={this.handleChange} value={this.state.email}/>
          </FormGroup>

          <FormGroup controlId="comment">
            <ControlLabel>Commentaire</ControlLabel>
            <FormControl componentClass="textarea" value={this.state.comment} required
                         placeholder={this.state.testimonialProposition} onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup controlId="donation" validationState={this.getValidationState()}>
            <ControlLabel>Promesse de don</ControlLabel>
            <InputGroup>
              <FormControl type="number" value={this.state.donation} placeholder="Enter text"
                           onChange={this.handleChange}/>
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
