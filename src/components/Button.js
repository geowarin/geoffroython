import React from 'react';
import {Component, PropTypes} from 'shasta';
import BootstrapButton from 'react-bootstrap/lib/Button';
import Icon from 'react-fa';

export default class Button extends Component {
  static displayName = 'Button';
  static propTypes = {
    label: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    const {icon, label, loading, disabled, ...props} = this.props;
    const loadingLabel = `${label}ing`;
    return <BootstrapButton disabled={disabled || loading} {...props}>
      {loading
        ? <span><Icon name="spinner" spin />{loadingLabel}&hellip;</span>
        : <span>{icon && <Icon name="spinner" spin />} {label}</span>
      }
      </BootstrapButton>
  }
}
