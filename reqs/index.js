import fetch from '../utils/fetch';

const baseURL = process.env.BASE_URL + '/api';

export function FormatPug2Html (params) {
  return fetch.post(`${baseURL}/format/pug2html`, params);
}
export function FormatHtml2Pug (params) {
  return fetch.post(`${baseURL}/format/html2pug`, params);
}