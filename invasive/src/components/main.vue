<template>
    <div>
        <v-container xs12 fluid>
            <v-layout row wrap>
                <v-flex xs4></v-flex>
                <v-flex xs4>
                    <v-card class='primary'>
                        <v-card-media v-bind:src='image' height="360" width="50">
                        </v-card-media>
                        <v-card-text class='black--text'>
                            Choose a species to classify this image as:
                        </v-card-text>
                        <v-btn flat large color='primary'
                            @click.native='classify_current_image("Glossy Buckthorn")'>
                            Glossy Buckthorn
                        </v-btn>
                        <v-btn flat large color='primary'
                            @click.native='classify_current_image("Purple Loosestrife")'>
                            Purple Loosestrife
                        </v-btn>
                        <v-btn flat large color='primary'
                            @click.native='classify_current_image("Fragmiti")'>
                            Phragmites
                        </v-btn>
                        <v-btn flat large color='primary'
                            @click.native='classify_current_image("Autumn Olive")'>
                            Autumn Olive
                        </v-btn>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>


<script>

    export default {

        computed: {

            // Return the decoded image from the database.
            image() {
                console.log('Computed Image:')
                console.log(this.$store.state.current_image)
                return '/static/images/' + this.$store.state.current_image['filename']
            }
        },

        methods: {

            // Get the next image from the database.
            find_next_image() {
                console.log('Finding image...')
                this.$store.dispatch('get_image')
            },

            // Classify the image currently in the data store.
            classify_current_image(name) {

                console.log('Classified image as:')
                console.log(name)

                this.$store.dispatch('set_label', name)

                this.$store.dispatch('classify_image')
            }
        },

        // Load an image as soon as the page loads.
        mounted() {
            this.find_next_image()
        }
    }


</script>
