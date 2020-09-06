## project description

- app_front 前端
- app_back 后端

## 启动

```
打包前端文件:
cd app_front
yarn all:build

启动服务:
cd app_back
pm2 start --name easy_format npm -- run start
```

## nginx config

```
server {
  listen 84;

  location ^~ /easy_format/api/ {
    proxy_pass http://localhost:3002/api/;
    proxy_set_header Host $host:$server_port;
  }
  location ^~ /easy_format/ {
    root /Volumes/dev-1/self/projects/easy_format/app_front/dist/;
    try_files $uri $uri/ /easy_format/index.html;
    index index.html index.htm;
  }
  location ^~ /compress-images/ {
    root /Volumes/dev-1/self/projects/easy_format/app_back/;
  }
}
```