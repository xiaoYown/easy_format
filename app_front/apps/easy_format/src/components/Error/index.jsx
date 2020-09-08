import './index.less';

import React from 'react';

export default function Error (props) {
  const { title, content } = props;
  return <div>
    <div className="page-error-content">
      <div>
        <h1 className="page-errot-title">{ title }</h1>
        <div className="page-error-line">
          <h2 className="page-error-message">
            { content }
          </h2>
        </div>
      </div>
    </div>
  </div>;
}