const path = require('path');
const fs = require('fs');
const schedule = require('node-schedule');
const image = require('imageinfo');

function readFileList(path, filesList) {
  const files = fs.readdirSync(path);
  files.forEach((item) => {
    const stat = fs.statSync(path + item);
    if (stat.isDirectory()) {
      readFileList(path + item + '/', filesList)
    } else {
      const obj = {};
      obj.path = path;
      obj.filename = item;
      filesList.push(obj);
    }
  })

}
const getFiles = {
  getFileList: function (path) {
    const filesList = [];
    readFileList(path, filesList);
    return filesList;
  },
  getImageFiles: function (path) {
    const imageList = [];

    this.getFileList(path).forEach((item) => {
      const ms = image(fs.readFileSync(item.path + item.filename));
      ms.mimeType && (imageList.push(item.filename))
    });
    return imageList;
  }
};

function clearImages (folder) {
  const imageList = getFiles.getImageFiles(folder);
  imageList.forEach(item => {
    fs.unlink(path.join(folder, item), (err) => {
      if (err) {
        throw err;
      }
    });
  });
}

// 每分钟的第30秒触发： '30 * * * * *'
// 每小时的1分30秒触发 ：'30 1 * * * *'
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
// 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
const scheduleCronstyle = () => {
  const time = '0 0 0 * * *';
  schedule.scheduleJob(time, () => {
    clearImages(path.join(__dirname, '../compress-images/'));
    console.log('scheduleCronstyle:' + new Date());
  });
}

module.exports = scheduleCronstyle;