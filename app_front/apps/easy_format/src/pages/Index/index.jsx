import React from 'react';
import './index.less';

import { Link } from "react-router-dom";

export default class Index extends React.Component {
  toTiny = () => {
    this.props.history.push('/tinyimage')
  }
  render () {
    return <div className="container">
      <div className="p-FunctionList">
        <div className="p-FunctionTitle">Easy Format</div>
        <div className="p-Functions">
          <ul className="m-FunctionTypeList">
            <li className="m-FunctionTypeName" onClick={this.toTiny}>
              <Link to="/tinyimage">tiny image</Link>
            </li>
            <li className="m-FunctionTypeName">
            <Link to="/pugandhtml">pug & html</Link>
            </li>
            <li className="m-FunctionTypeName">
              <Link to="/textandbase64">text & base64</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  }
}
