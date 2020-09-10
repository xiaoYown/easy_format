import './index.less';

import React from 'react';
import { Select, Row, Col, Input } from 'antd';
import CodeBlockTwo from '../../components/CodeBlockTwo';

const { Option } = Select;

const ENCODE_LIST = [
  {
    name: 'base64',
    key: 'base64',
  },
  {
    name: 'MD5',
    key: 'MD5',
  },
  // {
  //   name: 'AES',
  //   key: 'AES',
  // }
];

function encodeBase64 (CryptoJS, words) {
	const str = CryptoJS.enc.Utf8.parse(words);
  const base64 = CryptoJS.enc.Base64.stringify(str);
  return base64;
}
function decodeBase64 (CryptoJS, base64) {
	const words  = CryptoJS.enc.Base64.parse(base64);
	return words.toString(CryptoJS.enc.Utf8);
}
function encodeMD5 (CryptoJS, words) {
  return CryptoJS.MD5(words).toString();
}
function encodeAES (CryptoJS, words, key) {
  return CryptoJS.AES.encrypt(words, `${key}`).toString();
}
function decodeAES (CryptoJS, words, key) {
  const bytes = CryptoJS.AES.decrypt(words, `${key}`);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export default class PageCryptoJS extends React.Component {
  constructor (props) {
    super(props);

    const valueText = 'Hello';
    
    this.state = {
      encodeWay: 'base64',
      valueText, // 明文
      valueEncrypted: '', // 密文
      loaded: false,
      encodeKey: '', // 加密使用 key
    };
  }
  componentDidMount () {
    import(/* webpackChunkName: "crypto-js" */ 'crypto-js').then(res => {
      this.CryptoJS = res.default;
      console.log(this.CryptoJS)
      const valueEncrypted = encodeBase64(this.CryptoJS, this.state.valueText);
      this.setState({
        loaded: true,
        valueEncrypted
      });
    }).catch(err => {
      console.log(err);
      window.alert('script load fail!');
    })
  }
  changeEncodeWay = (encodeWay) => {
    this.setState({ encodeWay });
  }
  onHandleKey = (e) => {
    this.setState({
      encodeKey: e.target.value
    });
  }
  handleEncode = () => {
    const { encodeWay, encodeKey, valueText } = this.state;
    let value = '';
    switch (encodeWay) {
      case 'base64':
        value = encodeBase64(this.CryptoJS, valueText);
        break;
      case 'AES':
        value = encodeAES(this.CryptoJS, valueText, encodeKey);
        break;
      case 'MD5':
        value = encodeMD5(this.CryptoJS, valueText);
        break;
    }
    this.setState({
      valueEncrypted: value
    });
  }
  handleDecode = () => {
    const { encodeWay, encodeKey, valueEncrypted } = this.state;
    let value = '';
    switch (encodeWay) {
      case 'base64':
        value = decodeBase64(this.CryptoJS, valueEncrypted);
        break;
      case 'AES':
        value = decodeAES(this.CryptoJS, valueEncrypted, encodeKey);
        break;
    }
    this.setState({
      valueText: value
    });
  }
  render () {
    const { encodeWay, loaded, valueText, valueEncrypted, encodeKey } = this.state;
    const canDecode = !/MD5/.test(encodeWay);

    return (
      <div className="container">
        {
          !loaded ? null : <main>
            <div className="p-PageCryptoJS">
              <div className="m-main">
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
                      value={ valueEncrypted }
                      disabled={ !canDecode }
                      onChange={e => {
                        this.setState({ valueEncrypted: e.target.value })
                      }}
                      ></textarea>
                  }
                ></CodeBlockTwo>
              </div>
              <div className="m-side">
                <div className="m-side-main">
                  <div className="m-block">
                    <Select
                      sizse="small"
                      defaultValue={ encodeWay }
                      style={{ width: '100%' }}
                      onChange={this.changeEncodeWay}
                    >
                      {
                        ENCODE_LIST.map(item => {
                          return <Option
                            key={ item.name }
                            value={item.name}
                          >{ item.name }</Option>
                        })
                      }
                    </Select>
                  </div>
                  {
                    /^(AES)$/.test(encodeWay) ? <div className="m-block">
                      <Input
                        placeholder="key"
                        value={ encodeKey }
                        onChange={ this.onHandleKey }
                      />
                    </div> : null
                  }
                  <Row className="m-exec" style={{ textAlign: 'center' }}>
                    <Col span={12}>
                      <button
                        className="m-btn-encode"
                        onClick={ this.handleEncode }
                      >加密</button>
                    </Col>
                    <Col span={12}>
                      <button
                        className={`m-btn-encode${!canDecode ? ' s-disabled' : ''}`}
                        onClick={ () => canDecode && this.handleDecode() }
                      >解密</button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </main>
        }
        <footer>
        </footer>
      </div>
    )
  }
}
