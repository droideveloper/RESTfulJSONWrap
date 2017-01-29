## RESTful Express Response Wrap-JSON

Wraps JSON with as follows;

`Array<T> or []`:
```json
{
  "code": 200,
  "message": "success",
  "href": "$current",
  "offset": 0,
  "limit": 25,
  "count": 0,
  "data": []
}
```

`T or {}` :
```json 
{
  "code": 200,
  "message": "success",
  "href": "$current",
  "data": {}
}
```

### How to install

using npm;

`npm install --save restful-express-response-wrap`

### How to use

in server.js;

```javascript
var express = require("express");
var wrap = require("restful-express-response-wrap");

var server = express();

server.get("/", function(req, res, next) {
  var success = ...;
  if(success) {
    // use array or object as res.data param
    res.data = [ { name: "node", lang: "javascript" } ] || { name: "node", lang: "javascript" };
  } else {
    res.error = { status: 401, message: "Unauthroized", name: "Unauthroized" };
  }
  next(); // call to wrap
});

// for offset and limit to be used in Array response.
// { offset: 0, limit: 10 } this part is optional default is 0, 25 as respectively
server.use(wrap());
// also wrap register for 404 and 500 errors
// always returns json but server status code served inside json with message.
```
