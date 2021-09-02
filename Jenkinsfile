pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim' 
            args '-p 3000:3000' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test-jenkins'
            }
            post {
                always {
                    step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/jest/cobertura-coverage.xml'])
                }
            }
        }
        // stage('Production') {
        //     steps {
        //         withAWS(region:'Bulgaria', credentials:'1k2sea34') {
        //             s3Delete(bucket: 'Chat app', path:'**/*')
        //             s3Upload(bucket: 'Chat app', workingDir:'build', includePathPattern:'**/*');
        //         }
        //     }
        // }
    }
}