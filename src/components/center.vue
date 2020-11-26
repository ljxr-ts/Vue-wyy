<template>
  <div id="center">
    <div class="center-left">  
      <router-link to="/DiscoveringMusic">
        <span class="iconfont iconyinle"></span> 发现音乐
      </router-link>
      <router-link to="/Recommend">
        <span class="iconfont icongedan"></span> 推荐歌单
      </router-link>
      <router-link to="/LatestMusic">
        <span class="iconfont iconyinle1"></span> 最新音乐
      </router-link>
      <router-link to="/LattestMv">
        <span class="iconfont iconfont iconshipin_huabanfuben"></span> 最新Mv
      </router-link>
    </div>
    <div class="center-right">
      <div class="container">

          <router-view></router-view>



        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"center",
}

</script>

<style>
  #center{
    height: 100%;
    width: 100%;
    top: 60px;
    left: 0;
    bottom: 60px;  
    height: calc(100% - 120px);
    position: relative;
    
  }
  #center .center-left{
    width: 200px;
    height: 100%;
    background: rgb(237,237,237);
    display: flex;
    flex-direction: column;  
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 100;
  }
  #center .center-left a:hover{
    background: rgb(231,231,231);
  }
  #center .center-left a{
    text-decoration: none;
    height: 60px;
    color: black;
    font-size: 18px;
    line-height: 60px;
    text-align: center;
  }
  #center .center-left span{
    font-weight: bold;
  }
  #center .center-left .router-link-active{
    color: red;
  }
  #center .center-right{
    position: absolute;
    left: 50%; 
    margin-left: -450px;
  }
  #center .center-right .container{
    width: 1100px;
  }
</style>