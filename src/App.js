import M from "materialize-css/dist/js/materialize.min.js";
import React from "react";
import { connect } from "react-redux";
import { getBooks } from "./Actions";
import "./App.css";
import Book from "./components/Card";
import Header from "./components/Header";

function BookList({ books }) {
  return books.map((i, idx) => <Book book={i} key={idx} />);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null,
      price: 800
    };
  }

  componentDidMount() {
    this.props.getBooks().then(() => {
      M.AutoInit();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.books != prevProps.books) {
      this.setState({ list: this.props.books });
      // this.props.getBooks();
    }
  }

  handleSelect = () => {
    let elem = document.getElementById("category");
    let instance = M.FormSelect.getInstance(elem);
    let values = instance.getSelectedValues();
    let filtered_books = this.props.books.filter(i => values.includes(i.category));
    console.log(filtered_books);
    this.setState({ list: filtered_books });
  };

  handlePriceChange = e => {
    this.setState({ price: e.target.value });

    let filtered_books = this.props.books.filter(i => i.price < e.target.value - 50 && i.price < e.target.value + 50);
    console.log(filtered_books);
    this.setState({ list: filtered_books });
  };

  render() {
    return (
      <div>
        <Header />
        <div className='row'>
          <div className='col s12 m2 l2'>
            <h6>Filter Products</h6>
            {this.props.options ? (
              <div>
                <label>Categories</label>
                <select id='category' multiple onChange={this.handleSelect}>
                  <option disabled selected>
                    choose your category
                  </option>
                  {this.props.options.map((i, idx) => (
                    <option value={String(i)} key={idx}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <form action='#'>
              <label>Price</label>

              <p class='range-field'>
                <input value={this.state.price} type='range' id='test5' min='800' max='1200' onChange={this.handlePriceChange} />
              </p>
            </form>
          </div>
          {this.state.list ? (
            <div className='col s12 s10 l10'>
              <h5>{String(this.state.list.length)} book found</h5>
              <BookList books={this.state.list} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ books }) {
  return {
    books: books.books,
    options: books.options
  };
}

export default connect(mapStateToProps, { getBooks: getBooks })(App);
