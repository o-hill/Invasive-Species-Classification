'''

    Given a directory, populates the invasive
    species database for further manual classification.

'''

from pymongo import MongoClient
from image import ImageSplitter
from skimage.io import *
import os
import numpy as np
import sys

# Base64 encoding
import base64


def connect_to_database(database_name = 'invasive'):
    '''Establish a connection with the database.'''

    client = MongoClient()
    database = client[database_name]

    return database


def populate(dir_path):
    '''Insert images into the database given a path to a directory.'''

    db = connect_to_database()

    # REMOVE WHEN WE USE MULTIPLE IMAGES!!!!!
    db.unclassified.remove({})
    db.classified.remove({})
    print('Database starting with ' + str(db.unclassified.count()) + ' images')

    for filename in os.listdir(dir_path):

        # If the file is a PNG or JPG image, split it and
        # put it in the database.
        if filename.endswith('.png') or filename.endswith('.jpg'):

            # Insert the image and the position of the image
            # into the database.
            db.unclassified.insert({
                'filename': filename
            })

    print('Total number of documents currently in the unclassified collection:')
    print(db.unclassified.count())


if __name__ == '__main__':

    if len(sys.argv) != 2:
        print('> Error! Usage: python populate_database.py <IMAGE DIRECTORY PATH>')

    populate(sys.argv[1])









