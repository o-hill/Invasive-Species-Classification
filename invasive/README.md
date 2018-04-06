# Invasive Species Classification

## To Begin:

- Clone the repository!
- Navigate to `invasive/`.
  - Create a directory `static/`.
  - Create a subdirectory `static/images/`.
- Navigate to `invasive/server/`.
- Open an instance of MongoDB.
- Run `python populate_database.py ./images/`.
  - At this point the image should be split, the database should contain documents for every picture, and all 60 of the split images should be in the `/invasive/static/images/` directory.
- Run `python server.py`. A flask server should start.
- In another process, navigate anywhere in the repo and run `npm run dev`.
