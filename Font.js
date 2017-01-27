const path = require('path');

class Font {
  constructor(file) {
    this.file = file;
  }

  getMetaData() {
    let format = path.extname(this.file).substr(1);
    let family = path.dirname(this.file).match(/([^\/]*)\/*$/)[1];
    let style = ['italic', 'oblique'].map(v => {
      return path.basename(this.file).toLowerCase().indexOf(v) >= 0 ? v : null;
    }).reduce((a, b) => a || b) || 'normal';
    let weight = parseInt((path.basename(this.file).match(/\d+/) || []).slice(-1)[0], 10) || 300;
    let url = this.file;

    return {
      'family': family,
      'style': style,
      'weight': weight,
      'format': format,
      'url': url
    }
  }

  generateCss() {
    let obj = this.getMetaData();
    return `
    @font-face {
      font-family: '${obj.family}';
      font-style: ${obj.style};
      font-weight: ${obj.weight};
      src: local('☺︎'), url('${obj.url}') format('${obj.format}');
    }`
  }
}

module.exports = Font;
