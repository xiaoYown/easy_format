import './index.less';

import React from 'react';
import Upload from './Upload';
import Progress from './Progress';

const prevent = e => {
  e.preventDefault();
  e.stopPropagation();
};
const listen = (el, event, cb = prevent) => {
  el.addEventListener(event, cb, false);
}
const remove = (el, event, cb = prevent) => {
  el.removeEventListener(event, cb);
}
function formatBytes (bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default class TinyImage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      quality: 50,

      fileList: [
        // {
        //   uuid: 1,
        //   name: 'sjdfhksdfh',
        //   status: 'wait'
        // },
        // {
        //   uuid: 2,
        //   name: 'sjdfhksdfh',
        //   status: 'uploading',
        //   percent: 40
        // },
        // {
        //   uuid: 3,
        //   name: 'sjdfhksdfh',
        //   status: 'compress'
        // },
        // {
        //   uuid: 4,
        //   name: 'sjdfhksdfh',
        //   status: 'success'
        // },
        // {
        //   uuid: 5,
        //   name: 'sjdfhksdfh',
        //   status: 'fail'
        // },
      ], // 仅作为展示使用
      uploading: false,
      uploadPercent: {}
    };
  }
  componentDidMount () {
    listen(window, 'dragenter');
    listen(window, 'dragover');
    listen(window, 'dragleave');
    listen(window, 'drop', this.onDrag);
  }
  componentWillUnmount () {
    remove(window, 'dragenter');
    remove(window, 'dragover');
    remove(window, 'dragleave');
    remove(window, 'drop', this.onDrag);
  }
  onDrag = (e) => {
    e.preventDefault();
    this.update({
      target: e.dataTransfer
    });
  }
  onProgress = (file, e) => {
    const { fileList } = this.state;
    const { uuid } = file;
    const { loaded, total } = e;
    const percent = Math.floor(loaded  * 100 / total);
    const index = fileList.findIndex(item => item.uuid === uuid);
    fileList[index].percent = percent;
    if (percent === 100) {
      fileList[index].status = 'compress';
    } else {
      fileList[index].status = 'uploading';
    }
    console.log(fileList[index].status)
    this.setState([fileList]);
  }
  uploadOneEnd = ({ res, file }) => {
    const { fileList } = this.state;
    const { status, data } = res;
    const { uuid } = file;
    const index = fileList.findIndex(item => item.uuid === uuid);
    fileList[index].status = status;
    if (status === 'success') {
      const { base, filename, size } = data;
      fileList[index].url = `${base}/${filename}`;
      fileList[index].sizeAfter = formatBytes(size);
    }
    this.setState(fileList);
  }
  update = (e) => {
    const { files } = e.target;
    const { fileList, quality } = this.state;
    const time = Date.now();
    const uploadFiles = [];
    let uuid = 0;

    for (let i = 0; i < files.length; i++) {
      uuid = time + i;
      uploadFiles[i] = {
        file: files[i],
        uuid: uuid,
        quality: quality,
        progress: (...args) => this.onProgress(...args),
      };
      fileList.push({
        uuid: uuid,
        name: files[i].name,
        percent: 0,
        status: 'wait', // wait|uploading|compress|success|fail
        sizeBefore: formatBytes(files[i].size)
      });
    }
    this.setState({ fileList },() => {
      this.startUpload(uploadFiles);
    });
  }
  startUpload = (files) => {
    this.uploader = new Upload({
      files,
      doneOne: res => this.uploadOneEnd(res),
    });
    this.uploader.start();
  }
  onChangeQuality = (e) => {
    let value = parseInt(e.target.value);
    if (value <= 0) {
      value = 1;
    } else if (value > 100) {
      value = 100;
    }
    this.setState({
      quality: value
    });
  }
  render () {
    const { quality , uploading, fileList } = this.state;

    return <div className="container">
      <div>
        {/* 上传点击区域 */}
        <div className="tinyimg-uploader">
          <label>
            <input
              name="file"
              type="file"
              accept="image/png,image/jpeg"
              multiple="multiple"
              onChange={ this.update }
            />
          </label>
        </div>
        {/* 文件列表 */}
        {
          !fileList.length ? null : <ul className="tinyimg-files">
            {
              fileList.map(item => {
                return <li
                  key={ item.uuid }
                  className="tinyimg-files-item"
                >
                  <div className="item-msg tinyimg-files-item-1">
                    { item.name }
                    <span className="m-size">{ item.sizeBefore}</span>
                  </div>
                  <div className="item-msg tinyimg-files-item-2">
                    <Progress {...item} />
                  </div>
                  <div className="item-msg tinyimg-files-item-3">
                    {
                      !item.sizeAfter ? null : <span className="m-size">{ item.sizeAfter }</span>
                    }
                    {
                      !item.url ? null : <a
                        href={ item.url }
                        download={ item.name }
                      >download</a>
                    }
                  </div>
                </li>
              })
            }
          </ul>
        }
      </div>
      {/* 压缩质量 */}
      <div className="tinyimg-quality">
        <span>质量: </span>
        <span className="tinyimg-quality-val">
          <input
            disabled={ uploading }
            type="number"
            value={ quality }
            onChange={ this.onChangeQuality }
          />
        </span>
      </div>
    </div>;
  }
}