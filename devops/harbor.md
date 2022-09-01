# 启动和停止harbor服务

1. 启动：docker-compose up -d
2. 停止：docker-compose down -v 

# 重启daemon守护进程和docker服务

1. sudo systemctl daemon-reload
2. systemctl restart  docker

# Harbor镜像的推送

1. 进行推送之前，需要docker login + Harbor仓库IP登录成功后才能进行镜像推送
2. 镜像的tag需要符合 `IP/仓库名/镜像名:TAG版本` 的格式。
3. push命令：`docker push 175.24.166.118/react-web-midway/REPOSITORY[:TAG]`

