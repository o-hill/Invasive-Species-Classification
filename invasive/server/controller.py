'''

    Image controller for keeping track of
    which images have been displayed, and
    which need to be displayed next.

'''

from image import ImageSplitter
from skimage.io import *
from bson import ObjectId


class ImageController:

    def __init__(self, db):
        '''Initialize the image controller with a database.'''
        self.db = db


    def next(self):
        '''

            Get the next image to be displayed.

            Document returned:
                '_id': the ID of the image,
                'image': the image to be classified,
                'image_index': position of the image in the full drone image.

        '''

        # Grab the next document from the database.
        return self.db.unclassified.find_one()



    def classify(self, data):
        '''

            Classifies a single segment with a single
            label (some sort of invasive plant species).

            data:
                '_id': ID of the image,
                'image': the image to be classified,
                'label': the classification for the image,
                'image_index': the position of the segment in the full image.

        '''

        print('\n\n\nClassify data:')
        print(data)
        print('\n\n\n')

        self.db.unclassified.find_one_and_delete({ '_id': data['_id'] })

        self.db.classified.insert({
            '_id': data['_id'],
            'image': data['filename'],
            'label': data['label'],
        })

        print('Database classification count:')
        print(self.db.classified.count())






