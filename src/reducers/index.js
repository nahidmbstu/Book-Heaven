import { combineReducers } from "redux";
import { cartReducer } from "./cart";

const initialState = {
  books: [],
  isFetching: false,
  error: null,
  options: null
};

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_STARTED":
      return {
        ...state,
        isFetching: true
      };
    case "FETCH_SUCCESS":
      let { results } = action.payload;

      let options = results.lists.map(i => i.display_name);

      let all_book = results.lists.map(i => {
        let item = {};
        item.books = i.books;
        item.category = i.display_name;
        return item;
      });
      let book_all = all_book.map(i =>
        i.books.map(j => {
          j.category = i.category;
          j.price = Math.floor(Math.random() * (1200 - 800)) + 800;
          return j;
        })
      );
      let all_in_one = book_all.flat();
      return {
        ...state,
        isFetching: false,
        books: all_in_one,
        options: options
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  books: booksReducer,
  cart: cartReducer
});

export default rootReducer;
