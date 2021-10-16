<template>
  <v-app>
    <v-app-bar app flat color="rgb(94, 154, 156)">
      <v-btn color="#fff" to="/dashboard" :ripple="false" plain>Dashboard</v-btn>
      <v-btn color="#fff" to="/about" :ripple="false" plain>About</v-btn> 
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>

