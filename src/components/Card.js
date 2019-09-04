import React, { useState } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";

import { AddItemToCart } from "../Actions";

function Book({ book, cart, AddItemToCart }) {
  const [hover, setHover] = useState(false);

  const showCart = () => {
    setHover(true);
  };
  const hideCart = () => {
    setHover(false);
  };

  const addToCart = () => {
    let { author, title, book_image, price } = book;
    let item = { author, title, book_image, price };
    console.log(item);
    AddItemToCart(item);
    M.toast({ html: " item added!" });
  };

  return (
    <div
      className="col s12 m6"
      onMouseEnter={showCart}
      onMouseLeave={hideCart}
      style={{ position: "relative" }}
    >
      {console.log(cart)}
      <div className="card horizontal small">
        <div className="card-image">
          <img src={book.book_image} />{" "}
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <h5>{book.title}</h5>
            <h6>{book.author}</h6>
            <p> Price: {book.price}</p>
            <hr />
            <p> description :{book.description}</p>
          </div>
          {hover ? (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 50,
                height: 50,
                backgroundColor: "lime",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer"
              }}
              onClick={addToCart}
            >
              <span style={{ fontSize: "18px" }}>+</span>
            </div>
          ) : null}
        </div>
      </div>
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
  { AddItemToCart: AddItemToCart }
)(Book);
