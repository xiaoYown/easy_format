import React from 'react';
import './index.less';

export default function ChunkLoader () {
  return (
    <div className="chunk-loader">
      <div className="chunk-loader-animate">
        <div className="chunk-loader-clock"></div>
      </div>
    </div>
  );
};