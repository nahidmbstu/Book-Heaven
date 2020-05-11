import M from "materialize-css/dist/js/materialize.min.js";
import React from "react";
import { connect } from "react-redux";
import { getBooks } from "./Actions";
import "./App.css";
import Book from "./components/Card";
import Banner from "./components/Slider";

function BookList({ books }) {
  return books.map((i, idx) => <Book book={i} key={idx} />);
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null,
      price: 800,
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
    let filtered_books = this.props.books.filter((i) => values.includes(i.category));
    console.log(filtered_books);
    this.setState({ list: filtered_books });
  };

  handlePriceChange = (e) => {
    this.setState({ price: e.target.value });

    let filtered_books = this.props.books.filter((i) => i.price < e.target.value - 50 && i.price < e.target.value + 50);
    console.log(filtered_books);
    this.setState({ list: filtered_books });
  };

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col s12 m3 l3' style={{ paddingTop: "10px" }}>
            <h6>Filter Products</h6>
            {this.props.options ? (
              <div>
                <label>Choose Categories</label>
                <select id='category' multiple onChange={this.handleSelect}>
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
          <div className='col s12 m9 l9'>
            <Banner books={this.state.list} />
          </div>
        </div>
        <div className='row'>
          {this.state.list ? (
            <div className='col s12 s12 l12'>
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
    options: books.options,
  };
}

export default connect(mapStateToProps, { getBooks: getBooks })(Home);
