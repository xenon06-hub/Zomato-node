pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = "374331245951"
        AWS_REGION     = "us-east-1"
        REPO_NAME      = "zomato-ecr"
        IMAGE_TAG      = "latest"
        ECR_URL        = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                  docker build -t ${REPO_NAME}:${IMAGE_TAG} .
                """
            }
        }

        stage('Login to ECR') {
            steps {
                sh """
                  aws ecr get-login-password --region ${AWS_REGION} \
                  | docker login --username AWS --password-stdin ${ECR_URL}
                """
            }
        }

        stage('Tag & Push Image') {
            steps {
                sh """
                  docker tag ${REPO_NAME}:${IMAGE_TAG} ${ECR_URL}/${REPO_NAME}:${IMAGE_TAG}
                  docker push ${ECR_URL}/${REPO_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy on EC2 (Docker run)') {
            steps {
                sh """
                  docker rm -f zomato-node || true
                  docker pull ${ECR_URL}/${REPO_NAME}:${IMAGE_TAG}
                  docker run -d --name zomato-node -p 3000:3000 ${ECR_URL}/${REPO_NAME}:${IMAGE_TAG}
                """
            }
        }
    }
}
