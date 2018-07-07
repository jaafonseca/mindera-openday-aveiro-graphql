const books = [
  { id:1, name: 'Learning GraphQL', authorId: 1 },
  { id:2, name: 'Mindera Code and Culture', authorId: 2 }
];

const authors = {
  1: {
    name: 'Roger'
  },
  2: {
    name: 'Jenny'
  }
}
module.exports = {
  getBooks: () => {
    return books
  },

  getAuthor(bookId) {
      return authors[bookId]
  }
}
