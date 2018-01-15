import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.setState((state) => {
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf
        }
        return b
      })})
  }

  render() {
    const {books} = this.state

    const currentlyReading = books.filter( (book) => book.shelf === 'currentlyReading')
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
    const read = books.filter((book) => book.shelf === 'read')

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books={currentlyReading}
                       title="Currently Reading"
                       onUpdateBook={this.updateBook} />
                <Shelf books={wantToRead}
                       title="Want to Read"
                       onUpdateBook={this.updateBook}/>
                <Shelf books={read}
                       title="Read"
                       onUpdateBook={this.updateBook} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route exact path="/search" render={() => (
          <SearchBooks onUpdateBook={this.updateBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp
