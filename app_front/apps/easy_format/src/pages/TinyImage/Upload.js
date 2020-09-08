import { FileTinyImage } from '../../reqs';

class Task {
  constructor (options) {
    this.$options = Object.assign({
      progress: () => {}
    }, options);
  }
  upload = () => {
    return new Promise((resolve, reject) => {
      const { quality, file } = this.$options
      const param = new FormData();
      param.append('file', file);
      param.append('quality', quality);

      FileTinyImage(param, {
        onUploadProgress: (e) => {
          this.$options.progress(this.$options, e)
        }
      }).then(({ data }) => {
        const { code, msg } = data;
        if (code === 0) {
          resolve({ status: 'success', data: data.data });
        } else {
          reject({ status: 'fail', msg });
        }
      }).catch(err => {
        console.log(err)
        reject({ status: 'fail', msg: 'upload fail' });
      });
    })
  }
}

class Upload {
  constructor (options) {
    this.$options = Object.assign({
      doneOne: () => {},
      complete: () => {}
    }, options);
    const { files } = options;
    for (let i = 0; i < files.length; i++) {
      this.push(files[i]);
    }
    // this.tasks = files.map(item => new Task(item));
  }
  tasks = []
  start = () => {
    if (this.tasks[0]) {
      this.tasks[0].upload().then(res => {
        this.shift(res)
      }).catch(err => {
        this.shift(err);
      })
    }
  }
  push (param) {
    this.tasks.push(new Task(param));
  }
  shift = (res) => {
    const task = this.tasks.shift();
    this.$options.doneOne({
      file: task.$options,
      res
    });
    if (this.tasks.length) {
      this.start();
    } else {
      this.$options.complete();
    }
  }
}

export default Upload;