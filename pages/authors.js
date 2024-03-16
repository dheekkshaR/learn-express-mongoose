let Author = require('../models/author');

function get_author_list () {
  return Author.find({}, 'first_name family_name date_of_birth date_of_death')
}

exports.show_all_authors = async () => {
  try {
    let authors = await get_author_list().exec();
    return authors.map(function(a) {
      return a.first_name + ', '+ a.family_name+' : ' + a.lifespan ;
    });
  }
  catch(err) {
    console.log('Could not get authors ' + err);
  }
}