#!/bin/bash
# Usage: ./delete-app-kube.sh default
set -e

namespace=$1
config_name="msvc-config"

echo "Deleting configmaps"
kubectl -n $namespace delete cm $config_name

echo "Deleting hpa"
kubectl -n $namespace delete hpa express-api-hpa

echo "Deleting pdb"
kubectl -n $namespace delete pdb express-api-pdb

echo "Deleting service"
kubectl -n $namespace delete svc express-api

echo "Deleting deployment"
kubectl -n $namespace delete deployment express-api

echo "Delete tasks concluded"
echo "Current status of pods"
kubectl -n $namespace get po