import React from "react";
import {Component} from "shasta";
import {Carousel} from "react-bootstrap";

export default class CommentsCarousel extends Component {

  render () {
    return <Carousel>
      <Carousel.Item>
        <img width={900} height={500} src="http://lorempixel.com/g/900/500/technics?1"/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} src="http://lorempixel.com/g/900/500/technics?2"/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} src="http://lorempixel.com/g/900/500/technics?3"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  }
}
