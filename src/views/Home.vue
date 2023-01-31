<template>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                  <v-list-item
                  v-for="p in productCategories"
                  :key="p"
                  :to="'/product_list?category='+p"
                  >
                  {{ p }}
                  </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            <v-carousel
              cycle
              height="300"
              hide-delimiter-background
              show-arrows-on-hover
              v-model="model"
            >
              <v-carousel-item
                v-for="(color, i) in colors"
                :key="color"
              >
                <v-sheet
                  :color="color"
                  height="100%"
                  tile
                >
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <div class="text-h2">
                      Slide {{ i + 1 }}
                    </div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>

            <h3 class="ml-4 mt-4">Categories</h3>
            <v-row class="pa-4">
              <v-col class="col-4" v-for="p in productCategories" :key="p">
                <v-card :to="'product_list/?category='+p">
                  <v-img
                    height="150"
                    :src="getThisCategoryImage(p)"
                  ></v-img>
                  <v-card-title class="d-flex justify-center">{{ p }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
  import { mapState,mapGetters } from 'vuex';
  export default {
    data: () => ({
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }),
    computed:{
      ...mapState(['productList']),
      ...mapGetters(['productCategories'])
    },
    methods:{
      getThisCategoryImage(category){
        let sample = this.productList.filter(el => el.category == category)
        return sample[0].thumbnail
      }
    }
  }
</script>