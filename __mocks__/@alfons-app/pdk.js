const React = require('react');

const ActionContext = React.createContext({
  getAction: () => () => {}
});

module.exports = {
  ActionContext,
  Effect: () => {}
};