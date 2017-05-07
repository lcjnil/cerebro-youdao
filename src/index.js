'use strict';

const React = require('react')
const debounce = require('p-debounce')
const { memoize } = require('cerebro-tools')

const config = require('./config')
const icon = require('./assets/icon.png')
const youdao = require('./youdao')
const Preview = require('./Preview.jsx').default

const searchDict = debounce(memoize(youdao.search), config.debounce)

const queryFromTerm = term => {
  const match = term.match(/^youdao (.+)$/)
  return match ? match[1].trim() : null
};

const fn = ({term, display, actions, update}) => {
  const query = queryFromTerm(term)

  if (!query) {
    return
  }

  display({ icon, id: 'dict-loading', title: 'Searching Youdao dict ...' });

  return searchDict(query)
    .then(r => {
      return display({
        icon, 
        id: 'dict-loading',
        title: `${query} - ${r.translation[0]}`,
        getPreview: () => <Preview {...r} />
      })
    })
};

module.exports = {
  fn,
  icon,
  keyword: config.plugin.keyword,
  name: config.plugin.name 
}
