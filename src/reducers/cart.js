const initialState = {
  cart: []
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      let list = [...state.cart, action.payload];

      return {
        ...state,
        cart: list
      };

    case "ITEM_REMOVE":
      let list_filter = state.cart.filter(i => i.title !== action.payload);
      console.log(list_filter);

      return {
        ...state,
        cart: list_filter
      };
    default:
      return state;
  }
}
