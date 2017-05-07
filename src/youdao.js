const {keyfrom, key} = require('./config').youdao
const qs = require('querystring')
const url = 'http://fanyi.youdao.com/openapi.do'


module.exports = {
  search: q => {
    const query = qs.stringify({
      keyfrom,
      key,
      type: 'data',
      doctype: 'json',
      version: '1.1',
      q
    })
    return fetch(`${url}?${query}`)
      .then(r => r.json())
  }
}