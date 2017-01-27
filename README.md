# Example usage

server.js
```javascript
const app = require('express')();
const fonts = require('express-fonts');

app.use(fonts({
  'csspath': '/css',
  'fontspath': '/fonts',
  'fontsdir': './fonts'
}));
```

html
```html
<link rel="stylesheet" href="/css?family=Museo Sans" type="text/css" />
```
