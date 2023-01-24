<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <router-link to="/"  style="text-decoration: none; color: inherit;">
          <h2 class="blue-grey lighten-5 pa-2">Simple Online Shop</h2>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn text>Products</v-btn>
        <v-btn text>
          Cart
          <v-icon
            right
            dark
          >
            mdi-cart
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          dense
          hide-details
          solo
          label="Search product..."
          append-icon="mdi-magnify"
        ></v-text-field>
       
      </v-container>
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      
    }),
  }
</script>