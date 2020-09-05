import React from 'react';
import './index.less';

function Progress (props) {
  const { status, percent } = props;
  let style = null
  switch (status) {
    case 'wait':
      break;
    case 'uploading':
      style = { width: percent + '%' };
      break;
    case 'progress':
      break;
    case 'success':
      break;
    case 'fail':
      break;
  }
  return <div className={ `tinyimg-progress s-${status}` }>
    <div className={`progress-line-shadow`}>
      <span
        className="progress-text"
      >{ status.replace(status[0],status[0].toUpperCase()) }</span>
      <div
        className={ `progress-line` }
        style={ style }
      ></div>
    </div>
  </div>;
}

export default Progress;
