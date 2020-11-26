<template>
  <div id="app">
    <top></top>
    <center></center>
    <player></player>
  </div>
</template>

<script>
import top from "./components/top";
import center from "./components/center";
import player from "./components/player";
export default {
  components: {
    top,
    center,
    player,
  },
};
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  #app{
    display: flex;
    flex-direction: column;
  }
</style>
