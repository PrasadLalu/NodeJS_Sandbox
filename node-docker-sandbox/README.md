

### Build Docker File:
```
docker build -t my-node-app
```

### Run Docker File:
```
docker run -p 3000:3000 my-node-app
```

### Push into Docker Hub:
```
docker login -u lalupm

docker tag my-node-app lalupm/my-node-app:latest

docker push lalupm/my-node-app:latest
```