pipeline {
    // Run on any available Jenkins agent (our local Windows machine)
    agent any

    // NodeJS tool configured in Jenkins → Manage Jenkins → Tools
    tools {
        nodejs 'NodeJS 22'
    }

    // Environment variables available throughout the pipeline
    environment {
        CLIENT_DIR = 'client'
        SERVER_DIR = 'server'
        APP_NAME   = 'Skill-Connect'
    }

    stages {

        // ─── Stage 1: Checkout ─────────────────────────────────────────────
        stage('Checkout') {
            steps {
                echo '========================================'
                echo "  ${APP_NAME} Pipeline — Build #${BUILD_NUMBER}"
                echo '========================================'
                checkout scm
                echo 'Code checkout complete'
            }
        }

        // ─── Stage 2: Install Client Dependencies ──────────────────────────
        stage('Install Client Deps') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('client') {
                    bat 'npm install'
                }
                echo 'Client npm install done'
            }
        }

        // ─── Stage 3: Lint Frontend ─────────────────────────────────────────
        stage('Lint Frontend') {
            steps {
                echo 'Running ESLint on client code...'
                dir('client') {
                    bat 'npm run lint'
                }
                echo 'ESLint check passed'
            }
        }

        // ─── Stage 4: Build Frontend (React + Vite) ─────────────────────────
        stage('Build Frontend') {
            steps {
                echo 'Building React + Vite production bundle...'
                dir('client') {
                    bat 'npm run build'
                }
                echo 'Frontend build complete — dist/ folder created'
            }
        }

        // ─── Stage 5: Install Server Dependencies ───────────────────────────
        stage('Install Server Deps') {
            steps {
                echo 'Installing backend dependencies...'
                dir('server') {
                    bat 'npm install'
                }
                echo 'Server npm install done'
            }
        }

        // ─── Stage 6: Verify Server Syntax ──────────────────────────────────
        stage('Verify Server') {
            steps {
                echo 'Verifying server entry point syntax...'
                dir('server') {
                    // Just check the file can be parsed — don't actually start the server
                    bat 'node --check index.js'
                }
                echo 'Server syntax OK'
            }
        }

        // ─── Stage 7: Archive Build Artifacts ───────────────────────────────
        stage('Archive Artifacts') {
            steps {
                echo 'Archiving production build...'
                archiveArtifacts artifacts: 'client/dist/**/*', allowEmptyArchive: false
                echo 'Artifacts archived successfully'
            }
        }
    }

    // ─── Post-Build Actions (always run after all stages) ──────────────────
    post {
        success {
            echo '========================================'
            echo "  BUILD SUCCEEDED — Build #${BUILD_NUMBER}"
            echo "  App: ${APP_NAME}"
            echo '========================================'
        }
        failure {
            echo '========================================'
            echo "  BUILD FAILED — Build #${BUILD_NUMBER}"
            echo "  Check the stage logs above for details"
            echo '========================================'
        }
        always {
            echo "Final Status: ${currentBuild.currentResult}"
            // Uncomment the line below to clean the workspace after each build:
            // cleanWs()
        }
    }
}
