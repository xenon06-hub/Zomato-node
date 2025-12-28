pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = "374331245951"
        AWS_REGION     = "ap-south-1"
        REPOSITORY     = "zomato-node"

        IMAGE_TAG  = "latest"
        IMAGE_NAME = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPOSITORY}:${IMAGE_TAG}"

        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/xenon06-hub/Zomato-node.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                  docker build -t ${REPOSITORY}:${IMAGE_TAG} .
                """
            }
        }

        stage('Trivy Scan') {
            steps {
                sh """
                  trivy image \
                  --exit-code 1 \
                  --scanners vuln \
                  --severity HIGH,CRITICAL \
                  --no-progress \
                  ${REPOSITORY}:${IMAGE_TAG}
                """
            }
        }

        stage('Login to ECR') {
            steps {
                sh """
                  aws ecr get-login-password --region ${AWS_REGION} \
                    | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                """
            }
        }

        stage('Tag & Push Image to ECR') {
            steps {
                sh """
                  docker tag ${REPOSITORY}:${IMAGE_TAG} ${IMAGE_NAME}
                  docker push ${IMAGE_NAME}
                """
            }
        }

        stage('Done') {
            steps {
                echo "Build, scan, and ECR push completed successfully!"
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed — build error or HIGH/CRITICAL vulnerabilities found."
        }
    }
}
