#!/usr/bin/env node

var express = require('express');
var website = express();
var webport = process.env.PORT || 3000;

/*website.configure(function() {
  website.disable('x-powered-by');
  website.use(express.compress({
    level: 6,
    filter: function (req, res) {
      return /json|text|javascript|html|css/.test(res.getHeader('Content-Type'));
    }
  }));
});*/

website.get('*', express.static('.'));

website.listen(webport, function() {
  console.log('Express server running on port - ' + webport);
});