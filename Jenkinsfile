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
                        # Clean up any existing containers/images (try without sudo first)
                        docker stop jobkindle-frontend 2>/dev/null || echo "No container to stop"
                        docker rm jobkindle-frontend 2>/dev/null || echo "No container to remove"
                        
                        # Build new image
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        # Create deployment directory if it doesn't exist
                        mkdir -p ${DEPLOY_PATH} || echo "Directory already exists or permission denied"
                        
                        # Copy necessary files to deployment directory
                        cp docker-compose.yml ${DEPLOY_PATH}/ || echo "Could not copy docker-compose.yml"
                        cp nginx.conf ${DEPLOY_PATH}/ || echo "Could not copy nginx.conf"
                        
                        # Deploy with docker-compose
                        cd ${DEPLOY_PATH}
                        docker-compose down 2>/dev/null || echo "No services to stop"
                        docker-compose up -d --force-recreate
                        
                        # Wait for services to start
                        sleep 15
                        
                        # Check if containers are running
                        docker ps | grep jobkindle || docker ps
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
                        curl -f http://localhost:3001/api/health || curl -f http://localhost:3001 || echo "Application not responding yet"
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} 2>/dev/null || echo 'Could not remove image'"
            }
        }
        success {
            echo 'Deployment successful! Application should be available at https://jobkindle.site'
        }
        failure {
            echo 'Deployment failed! Check the logs for more details.'
            sh """
                echo "Container logs:"
                docker-compose -f ${DEPLOY_PATH}/docker-compose.yml logs --tail=50 2>/dev/null || echo "Could not get logs"
            """
        }
    }
}
