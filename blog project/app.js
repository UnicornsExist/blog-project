const app = require('./server').app;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const insertPost = require('./insert_post');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("blog_db");

    dbo.collection("posts").find({}).toArray(function(err, posts) {
      if (err) throw err;

      res.render('main_page', {dataArray: posts.reverse()})

      db.close();
    });
  });
})

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css')
})

app.get('/index.js', (req, res) => {
  res.sendFile(__dirname + '/index.js')
})


app.post('/submit', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400)

  insertPost(req.body)

  res.writeHead(200, {'Content-Type': 'application/json'})
  res.write(JSON.stringify('Succes'));
  res.end()
})
