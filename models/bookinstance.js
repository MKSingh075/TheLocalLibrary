const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/bookinstance/' + this._id;
});

// Virtual for bookinstance's due_back_formatted
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});   

// Note: Luxon can import strings in many formats and export to both predefined and free-form formats. In this case we use fromJSDate() to import a JavaScript date string and toLocaleString() to output the date in DATE_MED format in English: Oct 6th, 2020. For information about other formats and date string internationalization see the Luxon documentation on formatting.


//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
