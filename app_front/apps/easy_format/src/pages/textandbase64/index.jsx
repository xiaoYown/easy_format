import './index.less';

import React from 'react';
import CodeBlockTwo from '../../components/CodeBlockTwo';
import CodeFormatButton from '../../components/CodeFormatButton';

import CryptoJS from 'crypto-js';


function encode (words) {
	const str = CryptoJS.enc.Utf8.parse(words);
  const base64 = CryptoJS.enc.Base64.stringify(str);
  return base64;
}
function decode (base64) {
	const words  = CryptoJS.enc.Base64.parse(base64);
	return words.toString(CryptoJS.enc.Utf8);
}

export default class TextAndBase64 extends React.Component {
  constructor (props) {
    super(props);

    const valueText = 'Hello';
    const valueBase64 = encode(valueText);

    this.state = {
      valueText,
      valueBase64
    };
  }
  componentDidMount () {
  }
  render () {
    const { valueText, valueBase64 } = this.state;

    return (
      <div className="container">
        <main>
          <div className="p-TextAndBase64">
            <CodeBlockTwo
              block1={
                <textarea
                  id="text"
                  className="m-Code"
                  value={ valueText }
                  onChange={e => {
                    this.setState({ valueText: e.target.value })
                  }}
                ></textarea>
              }
              block2={
                <textarea
                  id="base64"
                  className="m-Code"
                  value={ valueBase64 }
                  onChange={e => {
                    this.setState({ valueBase64: e.target.value })
                  }}
                  ></textarea>
              }
            ></CodeBlockTwo>
          </div>
          <CodeFormatButton
            textLeft="TEXT"
            textRight="BASE64"
            onClick={res => {
              switch (res) {
                case 0:
                  this.setState({
                    valueBase64: encode(this.state.valueText)
                  });
                  break;
                case 1:
                  this.setState({
                    valueText: decode(this.state.valueBase64)
                  });
                  break;
                default:
                  return;
              }
            }}
          />
        </main>
        <footer>
        </footer>
      </div>
    )
  }
}
