import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/connect'

// Use Vuex as the global data storage for the app.
Vue.use(Vuex)

var current_image = {}
var classifications = []

export default new Vuex.Store({

    // -------- State variables ----------
    state: {

        current_image: current_image,
        classifications: classifications     
    },

    // -------- Mutations --------------
    mutations: {
        
        set_current_image(state, data) {
            state.current_image = data
        },

        get_current_image(state) {
            return state.current_image
        },

        add_classification(state, data) {
            state.classifications.push(data)
        },

        get_classifications(state) {
            return state.classifications
        }
    },


    // -------- Actions -----------------
    actions: {

        get_image(context) {

            api.get_next_image().then(function(response) {
                console.log('Response:')
                console.log(response.data)
                context.commit('set_current_image', response.data)
            })
        },

        classify_image(context) {

            let post_data = {
                'image': context.state.current_image,
                'tags': context.state.classifications
            }

            console.log('Classification data:')
            console.log(post_data)

            api.post_classification(post_data).then(function(response) {
                console.log('Image succesfully classified!')
                context.commit('set_current_image', response.data)
            })
        },

        add_tag(context, data) {
            context.commit('add_classification', data)
        }
    }
})
