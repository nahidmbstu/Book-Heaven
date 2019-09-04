import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { removeFromCart } from "../Actions";
import paypal from "../../src/paypal.png";
import bikash from "../../src/bikash.png";

function Header({ cart, removeFromCart }) {
  const [open, setOpen] = useState(false);

  const values = cart.map(i => i.price);

  const sum = values.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);

  const handleRemove = item => {
    removeFromCart(item);
  };

  return (
    <div class="navbar-fixed">
      <nav>
        <div className="nav-wrapper blue lighten-2">
          <a href="#" className="brand-logo" style={{ margin: "0px 10px" }}>
            Book Heaven
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a
                href="#"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Cart <span class="new badge blue">{String(cart.length)}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={open}
        title="Hey, it is optional pane title.  I can be React component too."
        subtitle="Optional subtitle."
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <div style={{}}>
          {console.log(cart)}
          {cart.map(item => (
            <ul class="collection">
              <li class="collection-item avatar">
                <img src={item.book_image} alt="" class="circle" />
                <span class="title">{item.title}</span>
                <p>{item.author} </p>
                <a href="#!" class="secondary-content">
                  <button
                    class="btn red"
                    onClick={() => handleRemove(item.title)}
                  >
                    -
                  </button>
                  <i class="material-icons" style={{ marginLeft: 15 }}>
                    {" "}
                    {item.price}{" "}
                  </i>
                </a>
              </li>
            </ul>
          ))}
          <br />
          <br />
          <li class="collection-item "> total: {sum} </li>
          <br />
          <br />
          <button className="btn"> Cash On Delivery </button>
          <br />
          <br />
          <br />
          <img src={paypal} width="250" height="100" /> <br />
          <br />
          <br />
          <img src={bikash} width="150" height="100" />{" "}
        </div>
      </SlidingPane>
    </div>
  );
}

function mapStateToProps({ cart }) {
  return {
    cart: cart.cart
  };
}

export default connect(
  mapStateToProps,
  { removeFromCart: removeFromCart }
)(Header);
