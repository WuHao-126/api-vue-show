# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 维护者信息
MAINTAINER wuhao <1345498749@qq.com>

# 删除默认的 Nginx 网站文件
RUN rm -rf /usr/share/nginx/html/*

# 将构建的静态文件复制到 Nginx 网站目录
COPY dist/ /usr/share/nginx/html/

# 复制自定义的 Nginx 配置文件（如果有）
COPY nginx.conf /etc/nginx/nginx.conf


# 暴露 Nginx 运行的端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
