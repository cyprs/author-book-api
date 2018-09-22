# author-book-api
Node.JS author book api 

# Books

| HTTP | Route | Parameters	 | Description	 |
| --- | --- | --- | --- |
| `GET`    | /api/book         | -                                      | List all books.              |
| `GET`    | /api/book/book_id | -                                      | Get a book.                  |
| `POST`   | /api/book         | author_id, title, category, year, lang | Create a new book.           |
| `PUT`    | /api/book/book_id | author_id, title, category, year, lang | Update a book with new info. |
| `DELETE` | /api/book/book_id | -                                      | Delete a book.               |

| `GET`    | /api/book/news    | -                                      | List new books. |
| `GET`    | /api/book/search/start_year/end_year | - | Books search in two dates. |