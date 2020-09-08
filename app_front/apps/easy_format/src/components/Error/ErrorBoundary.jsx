import React from 'react';
import Error from './index';

function logErrorToMyService (err, info) {
  console.error(err);
  console.error(info);
}

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, info);
  }
  render () {
    if (this.state.hasError) {
      return <Error
        title="Error"
        content="Chunk load fail !"
      />;
    } else {
      return this.props.children;
    }
  }
}