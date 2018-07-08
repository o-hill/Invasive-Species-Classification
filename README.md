# Invasive Species Classification

A tool to help biologists working with Michigan Aerospace annotate drone imagery
of natural areas, working towards a goal of using neural networks to classify and tag
invasive species in environments at risk. The fun parts are written in D3.js.

## To Begin:

- Clone the repository!
- Navigate to `server/`.
- Open an instance of MongoDB (`mongod`).
- Ensure any images you want in the database are in `static/images/`.
- Run `python populate_database.py ./images/`.
- Run `python server.py`. A flask server should start.
- In another process, navigate anywhere in the repo and run `npm run dev`.
- Navigate to `localhost:8080` and begin classifying!
