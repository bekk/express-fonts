# Example usage

```javascript
const app = require('express')();
const fonts = require('express-fonts');

app.use(fonts({
  'csspath': '/css',
  'fontspath': '/fonts',
  'fontsdir': './fonts'
}));
```
