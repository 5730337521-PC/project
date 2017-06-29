const express = require('express')
const app = express()


// redirect to https if the app is not running locally
if (!!process.env.VCAP_SERVICES) {
  app.enable('trust proxy');
  app.use (function (req, res, next) {
    if (req.secure) {
      next();
    }
    else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}

// Setup static public directory
app.use(express.static(path.join(__dirname , './public')));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
