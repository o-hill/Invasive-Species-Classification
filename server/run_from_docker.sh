#!/bin/bash

# Start MongoDB
mongod &

# Populate the database.
python populate_database.py

# Start the backend python server.
python server.py &

# Start the frontend web server.
python app_serve.py &

