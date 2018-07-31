<template>
  <div>
    <v-container xs12 fluid>
      <v-layout row wrap>
        <v-flex xs2></v-flex>
        <v-flex xs8>
          <v-card class='wrapper' color='white'>
            <v-card-media :src='image' height='720'>
            </v-card-media>
            <svg id='svg-overlay' height='720' width='1098.66'></svg>
              <v-flex xs12>
                <v-card-text class='black--text'>
                    Choose a species to classify this image as:
                </v-card-text>
                <v-btn flat large color='red' class='mb-3'
                    @click.native='set_current_species("Glossy Buckthorn")'>
                    Glossy Buckthorn
                </v-btn>
                <v-btn flat large color='purple'
                    @click.native='set_current_species("Purple Loosestrife")'>
                    Purple Loosestrife
                </v-btn>
                <v-btn flat large color='blue'
                    @click.native='set_current_species("Phragmite")'>
                    Phragmites
                </v-btn>
                <v-btn flat large color='orange'
                    @click.native='set_current_species("Autumn Olive")'>
                    Autumn Olive
                </v-btn>
              </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs2>
          <v-card-text style='margin-top: 100%;' class='white--text'>
            When you are done classifying this image, click here to save these tags and get the next image.
          </v-card-text>
          <v-btn flat large icon color='white'
            @click.native='get_next_image()'>
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>

    export default {

      data () {
        return {
          current_species: ''
        }
      },

      computed: {

        // Grab the image filename from the store.
        image() {
            console.log('Computed Image:')
            console.log(this.$store.state.current_image)
            return '/static/images/' + this.$store.state.current_image['filename']
        }
      },

      methods: {

        // Get the next image from the database.
        find_next_image() {
            this.$store.dispatch('get_image')
        },

        // Update the species that is being classified.
        set_current_species(new_species) {
          this.current_species = new_species
          console.log('Current classification species set to: ', this.current_species)
        },

        // Classify the image currently in the data store.
        classify_current_square() {

            console.log('Classified square as:')
            console.log(name)

            square_data = {
              'label': name,
              'coords': this.current_square
            }

            this.$store.dispatch('add_tag', square_data)
        },

        get_next_image() {

          let svg = d3.select('svg')
          svg.selectAll('rect').remove()
          this.$store.dispatch('classify_image')
        },

      },

      // Load an image as soon as the page loads.
      mounted() {
        this.find_next_image()

        var get_square_color = function(species) {
          if (species === 'Autumn Olive')
            return '#E5943E' // Orange
          else if (species === 'Purple Loosestrife')
            return '#AC3F97' // Purple
          else if (species === 'Glossy Buckthorn')
            return '#E15141' // Red
          else if (species === 'Phragmite')
            return '#4895EC' // Blue
          else if (species === '')
            return '#000000' // Black
          else
            console.log('Error! No species to classify of the name ', species)
        }

        // D3.js stuff for the squares.

        let that = this
        var svg = d3.select('svg')

        svg.on('mousemove', function() {
          svg.select('rect[id="mouseRect"]').remove()

          var mouse = d3.mouse(this)
          svg.append('rect')
            .attr('width', 30)
            .attr('height', 30)
            .attr('x', mouse[0] - 15)
            .attr('y', mouse[1] - 15)
            .attr('fill', get_square_color(that.current_species))
            .attr('fill-opacity', '0.5')
            .attr('id', 'mouseRect')
        });

        svg.on('click', function() {
          var mouse = d3.mouse(this)
          that.$store.dispatch('add_tag', [
            mouse[0] - 15,
            mouse[1] - 15,
            String(that.current_species)
          ])

          svg.selectAll('rect')
            .data(that.$store.state.classifications)
            .enter()
            .append('rect')
            .attr('width', 30)
            .attr('height', 30)
            .attr('x', function(d) { return d[0]; })
            .attr('y', function(d) { return d[1]; })
            .attr('fill', function(d) { return get_square_color(d[2]); })
            .attr('fill-opacity', '0.5')
        })
      }
    }


</script>
<style>

  html {
    background-color: #333;
  }

  .wrapper {
    position: relative;
    transition: transform 150ms ease-in-out;
  }

  .wrapper svg {
    position: absolute;
    top: 0;
    left: 0;
  }

</style>
