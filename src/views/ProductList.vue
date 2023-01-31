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

                <v-col cols="10">
                    <v-sheet class="mt-3" min-height="70vh" rounded="lg">
                        <v-row>
                            <v-col class="ml-4 mt-2">
                                <h3>Category : {{ category }}</h3>
                            </v-col>
                        </v-row>
                        <v-row class="pa-4 mt-0">
                            <v-col class="col-4" v-for="(p,idx) in filteredList()" :key="idx">
                                <v-card :to="'/product?id='+p.id">
                                    <v-img
                                    height="200"
                                    :src="p.thumbnail"
                                    ></v-img>
                                    <v-card-title>{{ p.title }}</v-card-title>
                                    <v-card-text>
                                        <v-row
                                            align="center"
                                            class="mx-0"
                                        >
                                            <v-rating
                                            :value="p.rating"
                                            color="amber"
                                            dense
                                            half-increments
                                            readonly
                                            size="14"
                                            ></v-rating>

                                            <div class="grey--text ms-4">
                                            {{ p.rating }} (413)
                                            </div>
                                        </v-row>

                                        <div class="my-4 text-subtitle-1">
                                            ${{ p.price }} • {{ p.brand }}
                                        </div>

                                        <div class="text-truncate">{{ p.description }}</div>
                                    </v-card-text>
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
      category: null,
    }),
    computed:{
      ...mapState(['productList']),
      ...mapGetters(['productCategories'])
    },
    methods:{
        filteredList(){
            if(this.category == null)
                return this.productList
            else
                return this.productList.filter(el => el.category == this.category)
        }
    },
    created(){
        this.category = this.$route.query.category
        window.scrollTo(0, 0)
    },
    watch: { 
        $route (to, from){
            this.category = to.query.category
            window.scrollTo(0, 0)
        }
    }
  }
</script>