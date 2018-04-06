'''

    Given a directory, populates the invasive
    species database for further manual classification.

    Also writes the split images into '../static/images/'

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


def get_filename(filename, index):
    return '../static/images/' + filename[:-4] + '_tile_' + str(index) + filename[-4:]


def populate(dir_path):
    '''

        Insert images into the database
        given a path to a directory.

    '''


    splitter = ImageSplitter()
    db = connect_to_database()
    num_images = 0

    # REMOVE WHEN WE USE MULTIPLE IMAGES!!!!!
    db.unclassified.remove({})
    print('Database starting with ' + str(db.unclassified.count()) + ' images')

    for filename in os.listdir(dir_path):

        # If the file is a PNG or JPG image, split it and
        # put it in the database.
        if filename.endswith('.png') or filename.endswith('.jpg'):

            # Get 60 segmented images from the original image.
            segmented_images = splitter.image_split(imread(dir_path + filename), 60)

            for image, index in zip(segmented_images, range(60)):

                # Insert the image and the position of the image
                # into the database.
                db.unclassified.insert({
                    'filename': get_filename(filename, index),
                    'image_index': index,
                })

                # Save the image to the static_images subdirectory.
                imsave(get_filename(filename, index), image)

                num_images += 1

    print('Number of documents inserted to the unclassified database:')
    print(num_images)

    print('Total number of documents currently in the unclassified collection:')
    print(db.unclassified.count())


if __name__ == '__main__':

    if len(sys.argv) != 2:
        print('> Error! Usage: python populate_database.py <IMAGE DIRECTORY PATH>')

    populate(sys.argv[1])









