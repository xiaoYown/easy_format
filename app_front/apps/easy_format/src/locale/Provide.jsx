import React from 'react';
import { Radio, Affix } from 'antd';
import { onChange, lang } from '../i18n';

const lng = lang.get();

function Provide() {
  return <div>
    <Affix offsetTop={30} style={{ paddingLeft: '30px' }}>
      <Radio.Group onChange={onChange} defaultValue={ lng }>
        <Radio.Button value="en">English</Radio.Button>
        <Radio.Button value="zh">中文</Radio.Button>
      </Radio.Group>
    </Affix>
  </div>
}

export default Provide;