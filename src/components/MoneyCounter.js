import React from "react";
import {Component} from "shasta";

export default class MoneyCounter extends Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      total: -1
    }
  }

  componentDidMount () {
    const testimonialsRef = new Firebase("https://geoffroython.firebaseio.com/testimonials");
    testimonialsRef.on('value', snapshot => {
      var total = 0;
      snapshot.forEach(data => {
        total += data.val().donation;
      });
      this.setState({total});
    })
  }

  render () {
    let money = '...';
    if (this.state.total > -1) {
      money = this.state.total;
    }
    return <div className="lead">
      <strong>{money} €</strong> collectés pour l'instant
    </div>
  }
}
