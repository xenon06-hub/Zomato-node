pipeline {
    agent any

    environment {
        // ---- CHANGE THESE ----
        AWS_ACCOUNT_ID = "YOUR_AWS_ACCOUNT_ID"
        AWS_REGION = "ap-south-1"      // change if needed
        REPOSITORY = "zomato-node"     // ECR repo name

        IMAGE_TAG = "latest"

        IMAGE_NAME = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPOSITORY}:${IMAGE_TAG}"
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
                  trivy image --exit-code 1 \
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
                echo "Build, scan and ECR push completed successfully!"
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed — check logs (build error or vulnerabilities)."
        }
    }
}
