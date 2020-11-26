<template>
  <div id="player">
    <audio :src="musicsrc" controls autoplay></audio>
  </div>
</template>

<script>
export default {
  name:"player",
  data() {
    return {
      musicsrc:"",
    }
  },
}
</script>

<style>
  #player{
    height: 60px;
    width: 100%;
    position: fixed;
    bottom: -5px;
    left: 0;
    z-index: 100;
  }
  #player audio{
    width: 100%;
    background: rgb(241,243,244);
  }

</style>