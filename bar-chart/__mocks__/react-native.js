const React = require('react');

const Button = ({ title, onPress }) => React.createElement('button', { onClick: onPress }, title);

module.exports = {
  Button,
  View: ({ children }) => children,
  Text: ({ children }) => children,
  StyleSheet: {
    create: (styles) => styles
  }
};