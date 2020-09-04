import React from 'react';
import './index.less';

export default function CodeFormatButton (props) {
  const { onClick, textLeft, textRight } = props;
  return (
    <div className="m-Footer">
      <div className="m-FooterItem"><br />{textLeft}</div>
      <div className="m-FooterItem">
        <div className="m-FormatBtn" onClick={() => onClick(0)}>{'->'}</div>
        <div className="m-FormatBtn" onClick={() => onClick(1)}>{'<-'}</div>
      </div>
      <div className="m-FooterItem"><br />{textRight}</div>
    </div>
  )
}