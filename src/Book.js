import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    options: [
      {
        value: "none",
        enabled: false,
        title: "Move to..."
      },
      {
        value: "currentlyReading",
        enabled: true,
        title: "Currently Reading"
      },
      {
        value: "wantToRead",
        enabled: true,
        title: "Want to Read"
      },
      {
        value: "read",
        enabled: true,
        title: "Read"
      },
      {
        value: "none",
        enabled: true,
        title: "None"
      }
    ]
  }

  render() {
    const {book, onUpdateBook} = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : "none"}
                    onChange={ (e) => onUpdateBook(book, e.target.value)}>
              {
                this.state.options.map( (o, idx) => (
                  <option value={o.value}
                          key={idx}
                          disabled={!o.enabled}>{o.title}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    )}
}

export default Book