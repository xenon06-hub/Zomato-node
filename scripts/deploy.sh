#!/bin/bash
set -e

echo "Logging into ECR..."
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 374331245951.dkr.ecr.eu-north-1.amazonaws.com

echo "Stopping old container..."
docker stop zomato || true
docker rm zomato || true

echo "Pulling latest image..."
docker pull 374331245951.dkr.ecr.eu-north-1.amazonaws.com/zomato-node:latest

echo "Starting new container..."
docker run -d -p 3000:3000 --name zomato 374331245951.dkr.ecr.eu-north-1.amazonaws.com/zomato-node:latest
