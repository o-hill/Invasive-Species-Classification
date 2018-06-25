# Use python 3.6 for this app.
FROM python:3.6

# Add the dependencies list.
ADD requirements.txt ./

# Get all of the software we need for this image
RUN pip install -r requirements.txt

# Add our wrapper script to the image.
ADD run_from_docker.sh ./

# Run the application!
CMD ["sh", "run_from_docker.sh"]
