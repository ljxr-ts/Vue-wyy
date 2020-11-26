<template>
  <div id="discoveringMusic">
    <div>
      <el-carousel type="card" height="200px">
      <el-carousel-item v-for="(item,index) in pic" :key="index">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
    </div>

    <p>推荐歌单</p>
    <div class="recomendBox">
      <div class="recommend" v-for="(item,index) in recomendmics" :key="index">
        <div class="recommend-item" @click="putrecommend(index)">
          <img :src="item.picUrl" alt="">
          <p>{{item.name}}</p>
          <!-- id:item.id -->
          <span>{{item.copywriter}}</span>
          <span class="iconfont iconbofang"></span>
        </div>
      </div>
    </div>

    <p>最新音乐</p>
    <div class="latestmic">
      <div class="latesmics" v-for="(item,index) in latesmics" :key="index">
        <div class="latesmic-item">    
          <div class="lateimg" @click="play(index)">
            <img :src="item.picUrl" alt="">
            <span class="iconfont iconbofang"></span>
          </div>
          <div>
            <p>{{item.name}}</p>
            <p>{{item.song.artists[0].name}}</p>
          </div>    
        </div>
      </div>
    </div>

    <p>推荐MV</p>
    <div class="recommendMvbox">
      <div class="recommendMv" v-for="(item,index) in recommendMvs" :key="index">
        <div class="recommendMv-item">
          <div class="imgs" @click="gonewMv(item.id)">
            <img :src="item.picUrl" alt="">
            <span class="iconfont iconbofang"></span>
          </div>  
          <p>{{item.copywriter}}</p>
          <p>{{item.artists[0].name}}</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "discoveringMusic", //发现音乐
  data() {
    return {
      pic:[],
      recomendmics:[],
      latesmics:[],
      recommendMvs:[],
    }
  },
  methods: {
    gonewMv(id){
      this.$router.history.push('newMv?id='+id)
    },
    putrecommend(x){
      this.$router.history.push('/songSheet?id='+this.recomendmics[x].id)
    },
    play(i){
      axios({
        url:"https://autumnfish.cn/song/url",
        method:"get",
        params:{
          id:this.latesmics[i].song.id
        }
      }).then(res=>{
        this.$parent.$parent.$children[2].musicsrc = res.data.data[0].url;
      })
    },
    getLitesmic(){
      axios({
     url:"https://autumnfish.cn/personalized/newsong",
     method:"get",
     dataType: 'jsonp',  
 crossDomain: true,
    }).then(res=>{
     this.latesmics = res.data.result;
    })
    }
  },
  created() {
    axios({
     url:"https://autumnfish.cn/banner" ,
     method:"get",
    }).then(res=>{
      this.pic= res.data.banners;
    }),
    this.getLitesmic(),
    axios({
     url:"https://autumnfish.cn/personalized" ,
     method:"get",
     params:{
       limit:10,
     }
    }).then(res=>{
     this.recomendmics = res.data.result;
    }),
    axios({
     url:"https://autumnfish.cn/personalized/mv",
     method:"get",
    }).then(res=>{
     this.recommendMvs = res.data.result;
    })
  },
};
</script>

<style>
#discoveringMusic{
  margin-top: 10px;
  margin-bottom: 70px;
}
#discoveringMusic .el-carousel .el-carousel__item img{
  border-radius: 10px; 
}
#discoveringMusic .el-carousel .el-carousel__item{
  border-radius: 10px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
p{
  font-weight: 400;
  font-size: 24px;
  margin-left: 8px;
  margin-bottom: 20px;
}

.recomendBox{
  width: 100%;
  height: 486px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.recomendBox .recommend{
  width: 200px;
  position: relative;
  overflow: hidden;
}
.recomendBox .recommend .recommend-item span:nth-of-type(1){ 
  position: absolute;
  top:  0px;
  left: 0;
  color:azure;
  line-height: 26px;
  padding: 0 5px;
  transform: translate(0,-100px);
  transition: .5s;
}
.recomendBox .recommend .recommend-item:hover span:nth-of-type(1){
  transform: translate(0,0);
  transition: .5s;
  background: rgba(0,0,0,.5);
  width: 100%; 
}
.recomendBox .recommend .recommend-item span:nth-of-type(2){
  position: absolute;
  width: 40px;
  height: 40px;
  right: 10px;
  bottom: 50px;
  font-size: 40px;
  color: aqua;
  opacity: 0;
  transition: .7s;
}
.recomendBox .recommend .recommend-item:hover span:nth-of-type(2){
  opacity: 1;
  transition: .7s;
}
.recomendBox .recommend .recommend-item p{
  width: 200px;
  height: 20px;
  font-size: 14px;
  margin-left: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

}
.recomendBox .recommend .recommend-item img{
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.latestmic{
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 10px;
}
.latestmic .latesmics {
  width: 50%;
  height: 100px;
}
.latestmic .latesmics .latesmic-item{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
}
.latestmic .latesmics .latesmic-item:hover{
  background: rgb(245,245,245);
}
.latestmic .latesmics .latesmic-item span{
  position: absolute;
  font-size: 40px;
  color: white;
  top: 30px;
  left: 20px;
  opacity: 0;
  transition: .5s;
}
.latestmic .latesmics .latesmic-item img{
  width: 80px;
  height: 80px;
}
.latestmic .latesmics .latesmic-item .lateimg:hover span{
  opacity: 1;
  transition: .5s;
}
.latestmic .latesmics .latesmic-item div p{
  margin-top: 10px;
  line-height: 20px;
  font-size: 16px;
}
.latestmic .latesmics .latesmic-item div p:nth-of-type(2){
  color: rgb(128,143,177);
  font-size: 14px;
}

.recommendMvbox{
  width: 1100px;
  height: 208px;
  display: flex;
  justify-content: space-around;
}
.recommendMvbox .recommendMv{
  width: 250px;
  height: 208px;
  overflow: hidden;
  position: relative;
}
.recommendMvbox .recommendMv img{
  width: 100%;
  height: 140px;
}
.recommendMvbox .recommendMv p{
  font-size: 14px;
  margin-bottom: 5px;
}
.recommendMvbox .recommendMv p:nth-of-type(2){
  font-size: 14px;
  color: #c5c5c5;
}
.recommendMvbox .recommendMv .imgs span{
  color: aqua;
  font-size: 40px;
  position: absolute;
  top: 50px;
  left: 105px;
  opacity: 0;
  transition: .5s;
}
.recommendMvbox .recommendMv .imgs:hover span{
  opacity: 1;
  transition: .5s;
}
</style>