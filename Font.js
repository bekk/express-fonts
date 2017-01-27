const path = require('path');

class Font {
  constructor(file) {
    this.file = file;
  }

  getMetaData() {
    let obj = {};
    obj.format = path.extname(this.file).substr(1);
    obj.family = path.dirname(this.file).match(/([^\/]*)\/*$/)[1];
    obj.style = ['italic', 'oblique'].map(v => {
      return path.basename(this.file).toLowerCase().indexOf(v) >= 0 ? v : null;
    }).reduce((a, b) => a || b) || 'normal';
    obj.weight = parseInt((path.basename(this.file).match(/\d+/) || []).slice(-1)[0], 10) || 300;
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
