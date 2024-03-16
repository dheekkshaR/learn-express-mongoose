let BookInstance = require('../models/bookinstance');
let Book = require('../models/book');

function get_books () {
  return BookInstance.find({}, 'book status')
    .sort({title : 1})  
    .populate('book');
}

exports.show_all_books_status = async () => {
  try {
    let booksIns = await get_books().exec();
    return booksIns.filter(function(b) {
      return b.status === "Available";
    }).map(function(filteredBook) {
      return Book(filteredBook.book).title + ' : ' + filteredBook.status;
    });
  }
  catch(err) {
    console.log('Could not get books ' + err);
  }
}