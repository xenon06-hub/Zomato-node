#!/bin/bash

# Stop running container if exists
docker stop zomato || true

# Remove container if exists
docker rm zomato || true

# Pull latest image from ECR
docker pull 374331245951.dkr.ecr.eu-north-1.amazonaws.com/zomato-node:latest

# Run container again
docker run -d -p 3000:3000 --name zomato 374331245951.dkr.ecr.eu-north-1.amazonaws.com/zomato-node:latest
