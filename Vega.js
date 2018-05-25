import React, { Component } from "react";
import PropTypes from "prop-types";
import vegaEmbed from 'vega-embed';

class Vega extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spec: props.spec,
      parsedSpec: JSON.parse(props.spec),
    };
  }

  componentDidMount() {
    this.rerender();
  }

  componentDidUpdate() {
    this.rerender();
  }

  componentWillReceiveProps({ spec }) {
    if (this.state.spec !== spec) {
      this.setState({
        spec,
        parsedSpec: JSON.parse(spec),
      });
    }
  }

  rerender = () => {
    vegaEmbed(this.node, JSON.parse(this.state.spec), {
      actions: false,
      padding: 0,
    }).catch(console.error);
  }

  render() {
    return (
      <div
        ref={node => this.node = node}
      />
    );
  }
}

Vega.propTypes = {
  spec: PropTypes.string.isRequired,
};

export const KEY = "vega";

export default Vega;
