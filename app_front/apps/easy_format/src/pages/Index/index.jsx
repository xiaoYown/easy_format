import './index.less';
import React from 'react';
import { Link } from "react-router-dom";

import Provide from '../../locale/Provide';

export default class Index extends React.Component {
  toTiny = () => {
    this.props.history.push('/tinyimage')
  }
  render () {
    return <div className="container">
      <Provide />
      <div className="p-FunctionList">
        <div className="p-FunctionTitle">
          <React.Translate text="home.title" />
        </div>
        <div className="p-Functions">
          <ul className="m-FunctionTypeList">
            <li className="m-FunctionTypeName" onClick={this.toTiny}>
              <Link to="/tinyimage">
                <React.Translate text="home.tinyImage" />
              </Link>
            </li>
            <li className="m-FunctionTypeName">
              <Link to="/pugandhtml">
                <React.Translate text="home.pngAndHtml" />
              </Link>
            </li>
            <li className="m-FunctionTypeName">
              <Link to="/cryptojs">
                <React.Translate text="home.crypto" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  }
}
