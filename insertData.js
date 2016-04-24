'use strict';

const Firebase = require('firebase');

const testimonialsRef = new Firebase("https://geoffroython.firebaseio.com/testimonials");

let newTesti = testimonialsRef.push();
newTesti.set({
  email: 'geowarin@gmail.com',
  comment: 'I love working with myself',
  donation: 100000000,
  date: new Date().getTime() - (Math.random() * 20000)
});
newTesti = testimonialsRef.push();
newTesti.set({
  email: 'lol@gmail.com',
  comment: 'Hey',
  donation: 1000000,
  date: new Date().getTime() - (Math.random() * 20000)
});
newTesti = testimonialsRef.push();
newTesti.set({
  email: 'prout@gmail.com',
  comment: 'Genre le mec et tout',
  donation: 1000000,
  date: new Date().getTime() - (Math.random() * 20000)
});
