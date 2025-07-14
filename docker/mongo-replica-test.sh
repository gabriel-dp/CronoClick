#!/bin/bash

echo "🔄 Waiting for MongoDB to be ready..."

# Retry until mongosh connects
until mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do
  echo "⏳ Waiting for MongoDB..."
  sleep 2
done

echo "✅ MongoDB is up!"

# Check if replica set is already initialized
is_initialized=$(mongosh --quiet --eval "try { rs.status().ok } catch(e) { 0 }")

if [ "$is_initialized" == "1" ]; then
  echo "✅ Replica set already initialized."
else
  echo "🚀 Initializing replica set..."
  mongosh --eval '
    rs.initiate({
      _id: "rs0",
      members: [{ _id: 0, host: "mongo-test:27017" }]
    })
  '
fi