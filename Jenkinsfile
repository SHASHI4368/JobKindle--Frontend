pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'jobkindle-frontend'
        DOCKER_TAG = "${BUILD_NUMBER}"
        DEPLOY_PATH = '/opt/jobkindle-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        # Clean up any existing containers/images
                        sudo docker stop jobkindle-frontend || true
                        sudo docker rm jobkindle-frontend || true
                        
                        # Build new image
                        sudo docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        sudo docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        # Ensure deployment directory exists
                        sudo mkdir -p ${DEPLOY_PATH}
                        
                        # Copy necessary files to deployment directory
                        sudo cp docker-compose.yml ${DEPLOY_PATH}/
                        sudo cp nginx.conf ${DEPLOY_PATH}/
                        
                        # Deploy with docker-compose
                        cd ${DEPLOY_PATH}
                        sudo docker-compose down || true
                        sudo docker-compose up -d --force-recreate
                        
                        # Wait for services to start
                        sleep 15
                        
                        # Check if containers are running
                        sudo docker ps
                    """
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sh """
                        # Wait for application to start
                        sleep 30
                        
                        # Check if the application is responding
                        curl -f http://localhost:3001/api/health || echo "Health check endpoint not available"
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                sh "sudo docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
            }
        }
        success {
            echo 'Deployment successful! Application should be available at https://jobkindle.site'
        }
        failure {
            echo 'Deployment failed! Check the logs for more details.'
            sh """
                echo "Container logs:"
                sudo docker-compose -f ${DEPLOY_PATH}/docker-compose.yml logs --tail=50 || true
            """
        }
    }
}
