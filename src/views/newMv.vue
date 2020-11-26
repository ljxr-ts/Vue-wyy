<template>
<!-- sumNew -->
  <div id="newMv">
    <div class="newMv-left">
      <h3>mv详情</h3>
      <video :src="mvUrl" controls></video>
      <div class="left-img">
        <img src="" alt="" />
        <p>{{ mvDetail.artistName }}</p>
      </div>
      <p class="pName">{{ mvDetail.name }}</p>
      <div class="left-time">
        <p>发布:{{ mvDetail.publishTime }}</p>
        <p>播放:{{ mvDetail.playCount }}次</p>
      </div>

      <div class="commend">
        <h2 v-if="hotNub">热门评论({{ hotNub }})</h2>
        <div class="commend-hot">
          <ul>
            <li v-for="(item, index) in hotComments" :key="index">
              <div class="hot-item">
                <img :src="item.user.avatarUrl" alt="" />
                <div class="item-text">
                  <div class="text-one">
                    <p>{{ item.user.nickname }}：</p>
                    <p>{{ item.content }}</p>
                  </div>
                  <p>时间{{ item.time }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <h2 v-if="nub">最新评论({{ nub }})</h2>
        <div class="commend-hot">
          <ul>
            <li v-for="(item, index) in comments" :key="index">
              <div class="hot-item">
                <img :src="item.user.avatarUrl" alt="" />
                <div class="item-text">
                  <div class="text-one">
                    <p>{{ item.user.nickname }}：</p>
                    <p>{{ item.content }}</p>
                  </div>
                  <p>时间{{ item.time }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="newMv-right">
      <h3>相关推荐</h3>
      <div class="more-mv" v-for="(item,index) in moreMv" :key="index">
        <div class="mv-img" @click="goOtherMv(item.id)">
          <img :src="item.cover" alt="">
          <span class="iconfont iconbofang"></span>
          <p class="mv-time">{{item.duration}}</p>
          <p class="mv-count">{{item.playCount}}</p>
        </div>
        <div class="mv-text">
          <p>{{item.name}}</p>
          <p>{{item.artistName}}</p>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "newmv",
  // watch: {
  //   $route(){
  //     this.routeWatch = this.$route.query.value
  //   },
  //   routeWatch(){
  //     this.goOtherMv(this.$route.query.id)
  //   }
  // },
  data() {
    return {
      routeWatch:"",
      mvUrl: "",
      mvDetail: {},
      Author: {},
      nub: 0,
      hotNub:0,
      comments: [],
      hotComments:[],
      moreMv:[],
    };
  },
  created() {
    this.getMv();

    this.getMvDetails();

    this.getcommend();
    // this.getAuthor();
    this.getMoreMv();
  },
  methods: {
    goOtherMv(id){
      this.$route.query.id = id
      this.getMv();

      this.getMvDetails();

      this.getcommend();
    // this.getAuthor();
      this.getMoreMv();
    },
    getMoreMv(){
      Axios({
        url:"https://autumnfish.cn/simi/mv",
        method:"get",
        params:{
          mvid:this.$route.query.id,
        }
      }).then(res=>{
        this.moreMv = res.data.mvs;
      })
    },
    getMv() {
      Axios({
        url: "https://autumnfish.cn/mv/url",
        method: "get",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        this.mvUrl = res.data.data.url;
      });
    },
    // getAuthor(){
    //   Axios({
    //     url:"https://autumnfish.cn/artists",
    //     method:"get",
    //     params:{
    //        id:this.mvDetail.artistId,
    //     }
    //   }).then(res=>{
    //     console.log(this.mvDetail.artistId);
    //     console.log(res);
    //   })
    // },
    getcommend() {
      Axios({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.id,
          limit: 15,
        },
      }).then((res) => {
        this.nub = res.data.comments.length;
        this.comments = res.data.comments;
        if(res.data.hotComments)
          this.hotComments = res.data.hotComments;
          this.hotNub = res.data.hotComments.length
      });
    },
    getMvDetails() {
      Axios({
        url: "https://autumnfish.cn/mv/detail",
        method: "get",
        params: {
          mvid: this.$route.query.id,
        },
      }).then((res) => {
        this.mvDetail = res.data.data;
      });
    },
  },
};
</script>

<style>
#newMv h3{
  margin-bottom: 10px;
}
#newMv {
  margin-top: 10px;
  margin-bottom: 70px;
  display: flex;
}
#newMv .newMv-left {
  width: 70%;
}
#newMv .newMv-left video {
  width: 700px;
  height: 390px;
  border-radius: 3px;
}
#newMv .newMv-left .left-img p{
  font-weight: 400;
  font-size: 20px;
  color: black;
}
#newMv .newMv-left .pName{
  font-weight: 600;
  font-size: 35px;
}
#newMv .newMv-left .left-time{
  display: flex;
}
#newMv .newMv-left .left-time p{
  font-weight: 200;
  font-size: 14px;
  color: #bebebe;
}
#newMv .commend {
  margin-top: 15px;
}
#newMv .commend h2 {
  font-size: 20px;
  font-weight: 400;
}
#newMv .commend .commend-hot {
  font-size: 14px;
  margin-top: 15px;
}
#newMv .commend .commend-hot ul li {
  list-style: none;
  margin-bottom: 10px;
}
#newMv .commend .commend-hot ul li img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
#newMv .commend .commend-hot ul li .hot-item {
  display: flex;
}
#newMv .commend .commend-hot ul li .hot-item .item-text {
  margin-left: 20px;
  margin-top: 5px;
  flex-grow: 1;
}
#newMv .commend .commend-hot ul li .hot-item .item-text p {
  color: #bebebe;
}
#newMv .commend .commend-hot ul li .hot-item .item-text .text-one p:nth-of-type(1) {
  color: #517eaf;
  white-space: nowrap;
  float: left;
}
#newMv .commend .commend-hot ul li .hot-item .item-text .text-one p:nth-of-type(2) {
  color: black;
}

#newMv .newMv-right{
  margin-top: 10px;
  margin-left: 40px;
}
#newMv .newMv-right .more-mv{
  width: 365px;
  height: 125px;
  display: flex;
}
#newMv .newMv-right .more-mv .mv-img{
  width: 180px;
  height: 101px;
  position: relative;
}
#newMv .newMv-right .more-mv .mv-img img{
  width: 180px;
  height: 101px;
  border-radius: 5px;
}
#newMv .newMv-right .more-mv .mv-img span{
  position: absolute;
  font-size: 40px;
  top: 50%;
  left: 50%;
  margin-left: -20px;
  margin-top: -20px;
  color: aqua;
}
#newMv .newMv-right .more-mv .mv-img p{
  position: absolute;
  right: 0;
  color: aqua;
  font-size: 14px;
  right: 3px;
}
#newMv .newMv-right .more-mv .mv-img p:nth-of-type(1){
  top: 80px;
  
}
#newMv .newMv-right .more-mv .mv-img p:nth-of-type(2){
  top: 0;
}
#newMv .newMv-right .more-mv .mv-text p:nth-of-type(1){
  white-space: nowrap;
  display: block;
  height: 24px;
  margin-top: 10px;
}
#newMv .newMv-right .more-mv .mv-text p:nth-of-type(2){
  font-size: 14px;
  color: #c5c5c5;
  line-height: 14px;
}
</style>