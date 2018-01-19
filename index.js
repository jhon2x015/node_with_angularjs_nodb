var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var compression = require("compression");
var morgan      = require("morgan");
var PORT        = Number( process.env.PORT || 3000 );
var Counters    = require("./lib/Counters");

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());

function sendFile(name) {
  return function(req, res) {
    res.sendFile(__dirname + "/static/" + name);
  };
}

app.get("/", sendFile("index.html"));
app.get("/app.js", sendFile("app.js"));
app.get("/app.css", sendFile("app.css"));
app.get("/css/bootstrap.min.css", sendFile("css/bootstrap.min.css"));
app.get("/css/font-awesome/css/font-awesome.min.css", sendFile("css/font-awesome/css/font-awesome.min.css"));
app.get("/css/font-awesome/fonts/fontawesome-webfont.ttf", sendFile("css/font-awesome/fonts/fontawesome-webfont.ttf"));
app.get("/css/font-awesome/fonts/fontawesome-webfont.woff", sendFile("css/font-awesome/fonts/fontawesome-webfont.woff"));
app.get("/css/font-awesome/fonts/fontawesome-webfont.woff2", sendFile("css/font-awesome/fonts/fontawesome-webfont.woff2"));



app.get("/app.js", sendFile("app.js"));
app.get("/js/angular.min.js", sendFile("js/angular.min.js"));

// [json] GET /api/v1/counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3}
// => ]
app.get("/api/v1/counters", function(req, res) {
  res.json(Counters.all())
});

// [json] POST {title: "bob"} /api/v1/counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
app.post("/api/v1/counter", function(req, res) {
  res.json(Counters.create(req.body.title));

  // console.log('req.body.title',req.body.title);
})

// [json] DELETE {id: "asdf"} /api/v1/counter
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
app.delete("/api/v1/counter", function(req, res) {
  res.json(Counters.delete(req.query.id));
});

// [json] POST {id: "qwer"} /api/v1/counter/inc
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
app.post("/api/v1/counter/inc", function(req, res) {
  res.json(Counters.inc(req.body.id));
});

// [json] POST {id: "zxcv"} /api/v1/counter/dec
// => [
// =>   {id: "zxcv", title: "steve", count: 2},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
app.post("/api/v1/counter/dec", function(req, res) {
  res.json(Counters.dec(req.body.id));
});

app.get("*", sendFile("index.html"));
app.head("*", sendFile("index.html"));

app.listen(PORT, console.log.bind(null, "PORT: " + PORT));
