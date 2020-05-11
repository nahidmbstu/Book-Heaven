import M from "materialize-css/dist/js/materialize.min.js";
import React, { useState } from "react";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { removeFromCart } from "../Actions";

function CheckOutView({ submitOrder }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      CheckOut
      <input name='Name' placeholder='Customer Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input name='Phone' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea name='Address' class='materialize-textarea' value={address} placeholder='address' onChange={(e) => setAddress(e.target.value)} />
      <button className='btn' onClick={() => submitOrder(name, phone, address)}>
        Submit{" "}
      </button>
    </div>
  );
}

function Header({ cart, removeFromCart }) {
  const [open, setOpen] = useState(false);
  const [CheckOut, setCheckOut] = useState(false);

  const values = cart.map((i) => i.price);

  const sum = values.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const submitOrder = async (name, phone, address) => {
    if (name && phone && address) {
      M.toast({ html: "Thanks Your Order Has Been Posted ! Our Call Center will Contact You !!" });

      let payload = {
        name,
        phone,
        address,
        cart,
        sum,
        time: Date.now(),
      };
      console.log(payload);

      try {
        let res = await fetch("url");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div class='navbar-fixed'>
      <nav>
        <div className='nav-wrapper blue-grey lighten-3'>
          <a href='#' className='' style={{ margin: "0px 10px", color: "#111" }}>
            Foreign Books BD
          </a>

          <ul id='nav-mobile' className='right'>
            <li>
              <a href='sass.html'>
                {" "}
                <i class='material-icons'>add_shopping_cart</i>
              </a>
            </li>

            <li>
              <a
                style={{ color: "#111" }}
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
        <div>
          {cart.map((item) => (
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
            <p> total: $$ {sum} </p>
          </ul>
          <ul>
            {CheckOut ? (
              <CheckOutView submitOrder={submitOrder} />
            ) : (
              <button
                className='btn'
                onClick={() => {
                  setCheckOut(true);
                }}
              >
                Proceed To CheckOut
              </button>
            )}
          </ul>
        </div>
      </SlidingPane>
    </div>
  );
}

function mapStateToProps({ cart }) {
  return {
    cart: cart.cart,
  };
}

export default connect(mapStateToProps, { removeFromCart: removeFromCart })(Header);
