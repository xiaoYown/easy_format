import './index.less';

import Head from 'next/head';

const BASE_URL = process.env.BASE_URL || '';

export default function Index (params) {
  return (
    <div className="container">
      <Head>
        <title>Function List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="p-FunctionList">
          <div className="p-FunctionTitle">Easy Format</div>
          <div className="p-Functions">
            {/* <div className="m-FunctionType">编译</div> */}
            <ul className="m-FunctionTypeList">
              <li className="m-FunctionTypeName">
                <a target="_self" href={`${BASE_URL}/pugandhtml`}>pug & html</a>
              </li>
              <li className="m-FunctionTypeName">
                <a target="_self" href={`${BASE_URL}/textandbase64`}>text & base64</a>
              </li>
            </ul>
            {/* <div className="m-FunctionType">转码</div> */}
          </div>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}
