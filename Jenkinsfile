pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = "<YOUR_ACCOUNT_ID>"
        AWS_REGION = "eu-north-1"
        REPO_NAME = "zomato-node"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/xenon06-hub/Zomato-node.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t $REPO_NAME:$IMAGE_TAG .
                """
            }
        }

        stage('Login to ECR') {
            steps {
                sh """
                aws ecr get-login-password --region $AWS_REGION \
                | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                """
            }
        }

        stage('Tag & Push Image') {
            steps {
                sh """
                docker tag $REPO_NAME:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:$IMAGE_TAG
                docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:$IMAGE_TAG
                """
            }
        }

        stage('Deploy on EC2 (Docker run)') {
            steps {
                sh """
                docker rm -f zomato-node || true
                docker pull $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:$IMAGE_TAG
                docker run -d --name zomato-node -p 3000:3000 $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:$IMAGE_TAG
                """
            }
        }
    }
}
