import React from 'react';
import { Radio } from 'antd';
import { onChange, lang } from '../i18n';

const lng = lang.get();

function Provide() {
  return <div style={{ position: 'fixed', top: '30px', right: '30px' }}>
    <Radio.Group onChange={onChange} defaultValue={ lng }>
      <Radio.Button value="en">English</Radio.Button>
      <Radio.Button value="zh">中文</Radio.Button>
    </Radio.Group>
  </div>
}

export default Provide;