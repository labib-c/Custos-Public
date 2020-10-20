docker build -t server:dev .

docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 4001:4000 \
    -e CHOKIDAR_USEPOLLING=true \
    server:dev
