import React, { useState } from "react";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { removeFromCart } from "../Actions";

function CheckOut({}) {
  return <div>CheckOut</div>;
}

function Header({ cart, removeFromCart }) {
  const [open, setOpen] = useState(false);
  const [CheckOut, setCheckOut] = useState(false);

  const values = cart.map(i => i.price);

  const sum = values.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);

  const handleRemove = item => {
    removeFromCart(item);
  };

  return (
    <div class='navbar-fixed'>
      <nav>
        <div className='nav-wrapper blue lighten-2'>
          <a href='#' className='' style={{ margin: "0px 10px" }}>
            Foreign Books BD
          </a>
          <ul id='nav-mobile' className='right'>
            <li>
              <a
                href='#'
                onClick={() => {
                  setOpen(true);
                }}
              >
                Cart <span class='new badge blue'>{String(cart.length)}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <SlidingPane
        className='some-custom-class'
        overlayClassName='some-custom-overlay-class'
        isOpen={open}
        title='Hey '
        subtitle='Optional subtitle.'
        onRequestClose={() => {
          setOpen(false);
        }}
        onBlur={() => setOpen(false)}
      >
        {" "}
        {CheckOut ? (
          <CheckOut />
        ) : (
          <>
            {cart.map(item => (
              <ul class='collection'>
                <li class='collection-item avatar'>
                  <img src={item.book_image} alt='' class='circle' />
                  <span class='title'>{item.title}</span>
                  <p>{item.author} </p>
                  <p> $$ {item.price}</p>
                  <a href='#!' class=''>
                    <button class='btn red' onClick={() => handleRemove(item.title)}>
                      -
                    </button>
                  </a>
                </li>
              </ul>
            ))}
            <ul>
              <p> total: $$ {sum} </p>{" "}
            </ul>
            <ul>
              <button
                className='btn'
                onClick={() => {
                  setCheckOut(true);
                }}
              >
                {" "}
                Proceed To CheckOut{" "}
              </button>
            </ul>
          </>
        )}
      </SlidingPane>
    </div>
  );
}

function mapStateToProps({ cart }) {
  return {
    cart: cart.cart
  };
}

export default connect(mapStateToProps, { removeFromCart: removeFromCart })(Header);
