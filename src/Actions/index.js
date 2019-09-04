export function getBooks() {
  return async function(dispatch) {
    /// start the fetching
    dispatch({ type: "FETCHING_STARTED" });
    /// fetch data

    try {
      let result = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=AACqffUrFfGMheWw2RSYfAEEiOyemNPU"
      );
      let data = await result.json();
      console.log(data);

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      // get Error
      dispatch({ type: "FETCH_ERROR", error: error });
    }
  };
}

export function AddItemToCart(item) {
  console.log(item);
  return async function(dispatch) {
    dispatch({ type: "ADD_ITEM", payload: item });
  };
}

export function removeFromCart(item) {
  console.log(item);
  return async function(dispatch) {
    dispatch({ type: "ITEM_REMOVE", payload: item });
  };
}
