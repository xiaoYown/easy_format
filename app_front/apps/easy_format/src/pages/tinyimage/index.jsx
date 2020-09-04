import './index.less';

import React from 'react';

import { FileTinyImage } from '../../reqs';

export default class TinyImage extends React.Component {
  update = (e) => {
    this.file = e.target.files[0]
  }
  upload = () => {
    /* eslint-disable no-undef */
    let param = new FormData()  // 创建form对象
    param.append('file', this.file)  // 通过append向form对象添加数据
    // 添加请求头
    FileTinyImage(param)
      .then(res => {
        console.log(res.data)
      })
  }
  render () {
    return <div className="container">
      <div>
        <input
          name="file"
          type="file"
          accept="image/png,image/gif,image/jpeg"
          onChange={this.update}
        />
      </div>
      <br/>
      <div>
        <button onClick={ this.upload }>upload</button>
      </div>
    </div>;
  }
}