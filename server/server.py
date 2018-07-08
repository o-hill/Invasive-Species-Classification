'''

    RESTful API for a simple website that serves
    up segmented images of natural areas and asks
    the user to identify which invasive species
    exist in the photo.

'''


# Image
import numpy as np

# RESTful API
from flask import Flask, request, abort, send_from_directory
from time import time, sleep
from flask_restful import abort, Api, Resource, reqparse
from flask_cors import *

# Database
from pymongo import MongoClient
from controller import ImageController

# Communication between python and javascript
from serial import serialize, deserialize
import base64



# ----------------------------------------------------------------
#               Lightweight database functionality.
# ----------------------------------------------------------------


def connect_to_database(database_name = 'invasive'):
    '''Establish a connection to the database.'''

    client = MongoClient()
    database = client[database_name]

    return database



# ----------------------------------------------------------------
#                  Create a server.
# ----------------------------------------------------------------


app = Flask(__name__)
api = Api(app)

# Allow cross-origin requests.
valid_headers = ['Content-Type', 'Access-Control-Allow-Origin', '*']
cors = CORS(app, allow_headers = valid_headers)

# Connect to the MongoDB database.
db = connect_to_database()



# ----------------------------------------------------------------
#                 Define some routes.
# ----------------------------------------------------------------


class Image(Resource):
    '''

        Generates the next image to be displayed,
        and receives the label corresponding to
        that image.

    '''

    def get(self):
        '''Returns the next image to be displayed.'''

        controller = ImageController(db)
        data = controller.next()

        return serialize(data)


    def post(self):
        '''

            Classifies an image.

            data:
                'image': {
                    '_id': MongoDB ObjectId,
                    'filename': filename of the image
                }
                'tags': the classifications of the image. They
                look something like:
                [
                    [
                        x_cord,
                        y_cord,
                        species
                    ],
                    [
                        300,
                        518.97,
                        'Glossy Buckthorn'
                    ]
                ]

        '''

        data = request.json
        data = deserialize(data)

        controller = ImageController(db)
        controller.classify(data)
        return serialize(controller.next())





# -----------------------------------------------------------------
#                      API Routes
# -----------------------------------------------------------------


# Get an image and classify it.
api.add_resource(Image, '/images', methods = ['GET', 'POST'])


# -----------------------------------------------------------------
#                      Launch the server
# -----------------------------------------------------------------

if __name__ == '__main__':

    # Production ?
    # http_server = WSGIServer(('', 1492), app)
    # http_server.serve_forever()

    # Testing
    app.run(port = 1492, debug = True, threaded = True)



