import { Component } from 'react';

export default class LoadComponent extends Component {
  constructor(props) {
    super(props);
    this.load(props);
  }
  componentWillReceiveProps(nextProps) {
    this.load(nextProps);
  }
  load() {
    // Do nothing
  }
}
