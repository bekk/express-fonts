const fs = require('fs');
const path = require('path');
const promisify = require('es6-promisify');
const url = require('url');
const express = require('express');

const Font = require('./Font');
const readdir = promisify(fs.readdir);

const DEFAULT_OPTS = {
  'fontsdir': './fonts',
  'fontspath': '/fonts',
  'csspath': '/css',
  'familyQuery': 'family'
}

module.exports = opts => {
  opts = Object.assign({}, DEFAULT_OPTS, opts);

  return (req, res, next) => {
   let u = url.parse(req.url, true);

   // Fonts serving
   req.app.use(opts.fontspath, express.static(opts.fontsdir));

   if(u.pathname !== opts.csspath) {
     next();
     return;
   }

   // Css generating
   res.type('text/css');

   let query = u.query || {};
   let dir = opts.fontsdir + '/' + query[opts.familyQuery] + '/';

   if(!query[opts.familyQuery]
     || !fs.existsSync(dir)
     || fs.realpathSync(dir).indexOf(fs.realpathSync(opts.fontsdir)) !== 0) {
     res.status(404).send('No matching font.');
     return;
   }

   // TODO: select weights and fontstyles
   // eg. family=Lato:100,100i,300,300i,400

   readdir(dir).then(files => {
     let css = [];
     files.forEach(file => {
       css.push(new Font(dir + file).generateCss());
     });
     res.send(css.join("\n\n"));
   })
   .catch(err => {
     res.status(500).send('CSS generating failed.');
   });
 }
}
