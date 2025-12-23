pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh '''
                    node -v
                    npm -v
                    npm install
                '''
            }
        }

        stage('Build / Test') {
            steps {
                echo 'No tests configured yet'
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    echo "Stopping old app (if running)..."
                    pkill -f "node" || true

                    echo "Starting application..."
                    nohup npm start > app.log 2>&1 &
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Zomato Node app deployed successfully'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}
