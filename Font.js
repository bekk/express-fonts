const path = require('path');

const EXT_TO_FORMAT = {
  'svg': 'svg',
  'otf': 'opentype',
  'ttf': 'truetype',
  'woff2': 'woff2',
  'woff': 'woff',
  'eot': 'embedded-opentype'
}

class Font {
  constructor(file) {
    this.file = file;
  }

  getMetaData() {
    let obj = {};

    // Format
    obj.format = path.extname(this.file).substr(1);
    if(EXT_TO_FORMAT.hasOwnProperty(obj.format)) obj.format = EXT_TO_FORMAT[obj.format];

    // Family name
    obj.family = path.dirname(this.file).match(/([^\/]*)\/*$/)[1];

    // Styles
    obj.style = ['italic', 'oblique'].map(v => {
      return path.basename(this.file).toLowerCase().indexOf(v) >= 0 ? v : null;
    }).reduce((a, b) => a || b) || 'normal';

    // Weight
    obj.weight = parseInt((path.basename(this.file).match(/\d+/) || []).slice(-1)[0], 10) || 300;

    // URL
    obj.url = this.file;

    return obj;
  }

  generateCss(obj) {
    obj = obj === undefined ? this.getMetaData() : obj;
    return `@font-face {
  font-family: '${obj.family}';
  font-style: ${obj.style};
  font-weight: ${obj.weight};
  src: local('☺︎'), url('${obj.url}') format('${obj.format}');
}`
  }
}

module.exports = Font;
