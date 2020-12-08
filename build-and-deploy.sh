#!/bin/bash
# Usage: ./build-and-deploy.sh default [environment: dev/production]
set -e

namespace=$1
environment=$2
config_path="config/"
config_name="msvc-config"

echo "Building latest docker image"
docker build -t express-msvc:latest .

echo "Deleting existing configmaps"
kubectl -n $namespace delete cm $config_name

echo "Creating fresh configmaps"
kubectl -n $namespace create cm $config_name --from-file=$config_path/$environment.json

echo "Deploying in environment: $environment"
cd kube/$environment/
kubectl -n $namespace apply -f .

echo "Deployment tasks concluded"
echo "Current status of pods"
kubectl -n $namespace get po
