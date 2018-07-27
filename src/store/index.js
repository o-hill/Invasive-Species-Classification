import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/connect'

// Use Vuex as the global data storage for the app.
Vue.use(Vuex)

var current_image = { }
var classifications = [ ]

export default new Vuex.Store({

    // -------- State variables ----------
    state: {

        current_image: current_image,
        classifications: classifications     
    },

    // -------- Mutations --------------
    mutations: {
        
        setCurrentImage(state, data) {
            state.current_image = data
        },

        getCurrentImage(state) {
            return state.current_image
        },

        addClassification(state, data) {
            state.classifications.push(data)
        },

        getClassifications(state) {
            return state.classifications
        },

        clearClassifications(state) {
          state.classifications = [ ]
        }
    },


    // -------- Actions -----------------
    actions: {

        get_image(context) {

            api.get_next_image().then(function(response) {
                console.log('Response:')
                console.log(response.data)
                context.commit('setCurrentImage', response.data)
            })
        },

        classify_image(context) {

            let post_data = {
                'image': context.state.current_image,
                'tags': context.state.classifications
            }

            console.log('Classification data:')
            console.log(post_data)

            context.commit('clearClassifications')

            api.post_classification(post_data).then(function(response) {
                console.log('Image succesfully classified!')
                context.commit('setCurrentImage', response.data)
            })
        },

        add_tag(context, data) {
            context.commit('addClassification', data)
        }

    }
})
