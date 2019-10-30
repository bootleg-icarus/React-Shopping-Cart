import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeItemMongo,
  addQuantityMongo,
  subtractQuantityMongo
} from "./actions/cartActions";
import Shipping from "./Shipping";

class Cart extends Component {
  handleRemove = id => {
    this.props.removeItem(id);
  };
  handleAddQuantity = id => {
    this.props.addQuantity(id);
  };
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };

  componentDidMount() {
    let localData;
    fetch("http://localhost:3002/get-data").then(response => {
      response
        .json()
        .then(data => (localData = data))
        .then(() => {
          if (!this.props.super.addedItems[0]) {
            localData.forEach(element => {
              let len = element.count;
              for (let i = 0; i < len; i++) {
                let id = element.id;
                this.props.addToCart(id);
              }
            });
          }
        });
    });
  }
  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.img} alt={item.img} className="" />
            </div>

            <div className="item-desc">
              <span className="title">{item.title}</span>
              <p>{item.desc}</p>
              <p>
                <b>Price: Rs.{item.price}</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.handleAddQuantity(item.id);
                    }}
                  >
                    arrow_drop_up
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      this.handleSubtractQuantity(item.id);
                    }}
                  >
                    arrow_drop_down
                  </i>
                </Link>
              </div>
              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  this.handleRemove(item.id);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
        <Shipping />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.addedItems,
    super: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id));
    },
    removeItem: id => {
      dispatch(removeItemMongo(id));
    },
    addQuantity: id => {
      dispatch(addQuantityMongo(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantityMongo(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
