import './index.less';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';

import React from 'react';
import beautify from 'js-beautify';
import Head from 'next/head';

import { FormatPug2Html, FormatHtml2Pug } from '../../reqs';

let CodeMirror = null;

export default class Home extends React.Component {
  componentDidMount () {
    import('../../libs/codemirror').then((res) => {
      CodeMirror = res.default;
      this.initEditor();
    })
  }
  initEditor () {
const PUG_DEFAULT = `doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
  body
    h1 Pug - node template engine
    #container.col
      p You are amazing
      p Get on it!
      p.desc
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
`;
    this.editorPug = CodeMirror.fromTextArea(document.getElementById("pug"), {
      mode: 'pug',
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      value: '',
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true
    });
    this.editorPug.setValue(PUG_DEFAULT);
    this.toHtml()
    this.editorHtml = CodeMirror.fromTextArea(document.getElementById("html"), {
      mode: 'text/html',
      extraKeys: { 'Ctrl-Space': 'autocomplete' },
      value: '',
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      collapsed: true,
    });
  }
  toHtml () {
    if (!CodeMirror) return;

    const text = this.editorPug.getValue();
    FormatPug2Html({ text }).then(res => {
      const { code, data } = res.data;
      if (code === 0) {
        const html = beautify.html(data.html, { indent_size: 2 });
        this.editorHtml.setValue(html);
      } else {
        alert('请检查代码格式是否有误!');
      }
    }).catch(err => {
      console.log(err)
    });
  }
  toPug () {
    if (!CodeMirror) return;

    const text = this.editorHtml.getValue();
    FormatHtml2Pug({ text }).then(res => {
      const { code, data } = res.data;
      if (code === 0) {
        this.editorPug.setValue(data.pug);
      } else {
        alert('请检查代码格式是否有误!');
      }
    }).catch(err => {
      console.log(err)
    });
  }
  render () {
    return (
      <div className="container">
        <Head>
          <title>pug & html</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main>
          <div className="p-PugAndHtml">
            <div className="m-Container">
              <div className="m-Block">
                <textarea id="pug" className="m-Code"></textarea>
              </div>
              <div className="m-Block">
                <textarea id="html" className="m-Code"></textarea>
              </div>
            </div>
          </div>
          <div className="m-Footer">
            <div className="m-FooterItem"><br/>pug</div>
            <div className="m-FooterItem">
              <div className="m-FormatBtn" onClick={ () => this.toHtml() }>{'->'}</div>
              <div className="m-FormatBtn" onClick={ () => this.toPug() }>{'<-'}</div>
            </div>
            <div className="m-FooterItem"><br/>html</div>
          </div>
        </main>
  
        <footer>
        </footer>
      </div>
    )
  }
}
