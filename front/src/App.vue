<template>
  <v-app>
    <Book />
  </v-app>
</template>

<script>
import Book from "./components/Book";

export default {
  name: "App",

  components: {
    Book,
  },

  data: () => ({
    //
  }),
};
</script>
