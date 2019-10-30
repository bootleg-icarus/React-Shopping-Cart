import React, { Component } from "react";
import { connect } from "react-redux";
import { addShipping, subShipping } from "./actions/cartActions";
class Shipping extends Component {
  componentWillUnmount() {
    if (this.refs.shipping.checked) this.props.substractShipping();
  }

  handleChecked = e => {
    if (e.target.checked) {
      this.props.addShipping();
    } else {
      this.props.substractShipping();
    }
  };

  render() {
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input
                type="checkbox"
                ref="shipping"
                onChange={this.handleChecked}
              />
              <span>Shipping(+ Rs. 60)</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total: Rs. {this.props.total}</b>
          </li>
        </div>
        <div className="checkout">
          <button className="waves-effect waves-light btn">Checkout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedItems: state.addedItems,
    total: state.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShipping: () => {
      dispatch(addShipping());
    },
    substractShipping: () => {
      dispatch(subShipping());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shipping);
