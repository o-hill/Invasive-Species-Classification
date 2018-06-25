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
                'filename': the filename of the image being served.

        '''

        # Grab the next document from the database.
        return self.db.unclassified.find_one()



    def classify(self, data):
        '''

            Classifies a single segment with a single
            label (some sort of invasive plant species).

            data:
                'image': the image to be classified,
                'tags': all the classifications associated with the image.
                    The tags are in the form of: [
                        [40, 25, 'Glossy Buckthorn']
                    ]

                    Where the numbers are the coordinates of the classification.

        '''

        print('\n\n\nClassify data:')
        print(data)
        print('\n\n\n')

        # self.db.unclassified.find_one_and_delete({ '_id': data['_id'] })

        self.db.classified.insert({
            '_id': data['image']['_id'],
            'image': data['image']['filename'],
            'tags': data['tags'],
        })

        print('Database classification count:')
        print(self.db.classified.count())






