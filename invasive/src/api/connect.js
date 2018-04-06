import axios from 'axios'

// Base server address for the backend.
const BASE_URL = 'http://localhost:1492'

export default {

    // Get the next image to be classified.
    get_next_image() {
        return axios.get(BASE_URL + '/images')
    },

    // Classify an image in the database.
    post_classification(data) {
        return axios.post(BASE_URL + '/images', data)
    }
}
