import fetch from '../utils/fetch'

export function FormatPug2Html (params) {
  return fetch.post('/api/format/pug2html', params)
}
export function FormatHtml2Pug (params) {
  return fetch.post('/api/format/html2pug', params)
}