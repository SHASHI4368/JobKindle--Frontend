pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'jobkindle-frontend'
        DOCKER_TAG = "${BUILD_NUMBER}"
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
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    docker.tag("${DOCKER_IMAGE}:${DOCKER_TAG}", "${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        cd /opt/jobkindle-frontend
                        docker-compose down
                        docker-compose up -d --force-recreate
                    """
                }
            }
        }
    }

    post {
        always {
            sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
        }
    }
}
