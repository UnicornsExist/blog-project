const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

function insertPost(data) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("blog_db");

  data.likes = 0

  dbo.collection("posts").insertOne(data, function(err, res) {
    if (err) throw err
    db.close();
  });
});
};

module.exports = insertPost;
