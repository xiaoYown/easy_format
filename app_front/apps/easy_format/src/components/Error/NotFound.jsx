import React from 'react';
import Error from './index';

export default function NotFound () {
  return <Error
    title="404"
    content="This page could not be found"
  />;
}