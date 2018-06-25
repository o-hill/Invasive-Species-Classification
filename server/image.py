'''

    Python function that accepts images and splits them into
    equal parts.

'''


import skimage
import numpy as np
from skimage.io import *


class ImageSplitter:

    def image_split(self, image, num_splits):
        '''

            Accepts an image as a numpy array and
            splits it into equal parts.

        '''

        # Grab the shape of the current image.
        height, width, channels = image.shape
        largest_factor = 0

        # Find the largest pair of factors for our number
        # of splits so we can break our image up evenly.
        for i in range(np.int(np.sqrt(num_splits)), 0, -1):
            if num_splits % i == 0:
                largest_factor = i
                break

        # Get the new width and height dimensions for each of the new
        # segmented images.
        new_width = int(width / (num_splits / largest_factor))
        new_height = int(height / largest_factor)

        # Segment the image, creating a list of the cropped images,
        # represented as numpy arrays.
        new_images = []
        for row in range(0, height, new_height):
            for col in range(0, width, new_width):
                new_images.append(np.array([x[col:col + new_width] \
                                            for x in image[row:row + new_height]]))


        return new_images


