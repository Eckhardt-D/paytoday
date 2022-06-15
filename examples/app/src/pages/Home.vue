<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div style="display: flex; justify-content: center">
      <div ref="buttonContainer" />
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <router-link to="/about">Go To About</router-link>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import { initializePaytoday } from "paytoday";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  async mounted() {
    const paytoday = await initializePaytoday({ debug: true });
    const element = this.$refs.buttonContainer;
     paytoday.createButton(element, 1000, "test");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
