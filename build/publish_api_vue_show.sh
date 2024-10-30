LOCAL_FILE="dist"
REMOTE_USER="root"
REMOTE_IP="101.126.87.57"
REMOTE_PORT="22"
PASSWORD="wuhao126..."
REMOTE_PATH="/vue/api/"
IMAGES_NAME="api_platform"


#echo "上传项目"
#scp -r -o StrictHostKeyChecking=no -P "$REMOTE_PORT"  "$LOCAL_FILE" "$REMOTE_USER@$REMOTE_IP:$REMOTE_PATH"
echo "restart server... "
ssh -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_IP -p $REMOTE_PORT "
if [[ \$(docker images -q $IMAGES_NAME) ]]; then
  echo '存在镜像，删除进行重构'
  docker stop $IMAGES_NAME
  docker rm $IMAGES_NAME
  docker rmi $IMAGES_NAME
else
  echo '镜像不存在'
fi

cd $REMOTE_PATH
docker build -t $IMAGES_NAME .
docker run -d --name $IMAGES_NAME  -p 80:80 $IMAGES_NAME
"
echo "publish success!"

sleep 5