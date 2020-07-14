import './index.less'

import Head from 'next/head'

export default function Home(params) {
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
                <a target="_self" href="/pugandhtml">pug & html</a>
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
