import React from "react";
import {Component, PropTypes} from "shasta";
import {Image} from "react-bootstrap";
import getGravatarUrl from '../gravatar/gravatar';

export default class Gravatar extends Component {

  static propTypes = {
    email: PropTypes.string.isRequired
  };

  constructor (props, context) {
    super(props, context);
    this.state = {
      url: getGravatarUrl(props.email)
    }
  }

  render () {
    return <Image src={this.state.url} circle/>
  }
}
