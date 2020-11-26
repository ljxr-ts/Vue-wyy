<template>
<!-- ElPagination -->
  <div id="search">
    <div class="micName">
      <p>{{ $route.query.value }}</p>
      <p>找到{{ count }}个结果</p>
    </div>
    <div class="search-nav">
      <p :class="{ active: tag == 1 }" @click="tag = 1">歌曲</p>
      <p :class="{ active: tag == 1000 }" @click="tag = 1000">歌单</p>
      <p :class="{ active: tag == 1004 }" @click="tag = 1004">MV</p>
    </div>
    <div v-if="tag == 1">
      <div class="miclist">
        <tr>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </tr>
        <tr v-for="(item, index) in micList" :key="index" class="hover-td" 
        @dblclick="dbPlay(index)">
          <td>{{ index + 1 }}</td>
          <td>
            <div>
              <span>{{ item.name }}</span>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ gettime(index) }}</td>
        </tr>
      </div>
    </div>

    <div v-if="tag == 1000">
      <div class="sheetList">
        <div v-for="(item, index) in sheetList" :key="index">
          <div class="img-box" @click="gosongSheet(index)">
            <img :src="item.coverImgUrl" alt="" />
            <span class="iconfont iconbofang"></span>
            <p>播放量:{{playCount(item.playCount)}}</p>
          </div>
          <p class="sheetName">{{ item.name }}</p>
        </div>
      </div>
    </div>


    <div v-if="tag == 1004">
      <div class="mvList">
        <div v-for="(item, index) in mvList" :key="index">
          <div class="img-box" @click="gonewMv(index)">
            <img :src="item.cover" alt="" />
            <span class="iconfont iconbofang"></span>
            <p>{{playCount(item.playCount)}}</p>
            <p>{{gettimes(index)}}</p>
          </div>
          <p class="sheetName">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="currentChange"
        :current-page="page"
        :page-size="pageSize"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "search",
  watch: {
    tag() {
      this.page = 1;
      this.getResult();
    },
    $route(){
      this.value = this.$route.query.value
    },
    value(){
      this.getResult();
    }
  },
  data() {
    return {
      count: 0,
      micList: [],
      sheetList: [],
      mvList: [],
      tag: 1,
      page: 1,
      pageSize:15,
      value:"",
    };
  },
  created() {
    this.getResult();
  },
  methods: {
    gonewMv(x){
      this.$router.history.push('/newMv?id='+this.mvList[x].id)
    },
    gosongSheet(x){
      this.$router.history.push('/songSheet?id='+this.sheetList[x].id)
    },
    dbPlay(i){    
      Axios({
        url:"https://autumnfish.cn/song/url",
        method:"get",
        params:{
          id:this.micList[i].id
        }
      }).then(res=>{
        this.$parent.$parent.$children[2].musicsrc = res.data.data[0].url;
      })
    },
    playCount(count){
      if(count>10000){
        return parseInt(count/10000)+"万";
      }
      else
        return count;
    },
    currentChange(val) {
      this.page = val;
      this.getResult();
    },
    gettime(x) {
      x = this.micList[x].duration;
      let min = parseInt(x / 1000 / 60);
      let sec = parseInt((x / 1000) % 60);
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    },
    gettimes(x) {
      x = this.mvList[x].duration;
      let min = parseInt(x / 1000 / 60);
      let sec = parseInt((x / 1000) % 60);
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    },
    getResult() {
      Axios({
        url: "https://autumnfish.cn/search",
        methos: "get",
        params: {
          limit: 15,
          offset: (this.page - 1) * 15,
          type: this.tag,
          keywords: this.$route.query.value,
        },
      }).then((res) => {

        if (this.tag == 1) {
          this.count = res.data.result.songCount;
          this.micList = res.data.result.songs;
        } else if (this.tag == 1000) {
          this.count = res.data.result.playlistCount;
          this.sheetList = res.data.result.playlists;
        } else {
          this.count = res.data.result.mvCount;
          this.mvList = res.data.result.mvs;
        }
      });
    },
  },
};
</script>

<style>
#search {
  margin-top: 10px;
  margin-bottom: 70px;
}
#search .micName {
  display: flex;
}
#search .micName p:nth-of-type(1) {
  margin-right: 10px;
  font-weight: bold;
  font-size: 25px;
}
#search .micName p:nth-of-type(2) {
  font-size: 15px;
  color: #bebebe;
  padding-top: 14px;
}

#search .search-nav {
  margin-top: 15px;
  color: #303133;
  height: 40px;
  display: inline-block;
  display: flex;
  border-bottom: 3px solid rgb(228, 231, 237);
}
#search .search-nav p {
  padding-right: 20px;
  font-size: 20px;
  padding-top: 5px;
}
#search .search-nav .active {
  color: #c3473a;
}

#search .miclist {
  width: 100%;
  margin-top: 20px;
}
#search .miclist tr th {
  font-weight: 400;
  text-align: left;
  color: #909399;
}
#search .miclist tr td {
  font-size: 14px;
  text-align: left;
  color: #606266;
  line-height: 43px;
}
#search .miclist .hover-td:hover{
  background: rgb(245, 247, 250);
}
#search .miclist tr td:nth-of-type(1) {
  width: 50px;
}
#search .miclist tr td:nth-of-type(2) {
  width: 300px;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
}
#search .miclist tr td:nth-of-type(3) {
  width: 200px;
}
#search .miclist tr td:nth-of-type(4) {
  width: 450px;
}
#search .miclist tr td:nth-of-type(5) {
  width: 100px;
}

#search .el-pagination{
  width: 600px;
  margin: 0 auto;
}

#search .sheetList {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 700px;
}
#search .sheetList .img-box {
  width: 200px;
  height: 200px;
  position: relative;
}
#search .sheetList .img-box span {
  font-size: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
  color: aqua;
  opacity: 0;
  transition: .5s;
}
#search .sheetList .img-box:hover span{
  opacity: 1;
  transition: .5s;
}
#search .sheetList .img-box img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}
#search .sheetList .img-box p {
  position: absolute;
  color: #fff;
  font-size: 15px;
  top: 0;
  right: 0;
}
#search .sheetList .sheetName{
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1em;
}



#search .mvList {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  margin-bottom: 30px;
}
#search .mvList .img-box {
  width: 250px;
  height: 140px;
  position: relative;
  margin: 0 10px;
}
#search .mvList .img-box img {
  width: 250px;
  height: 140px;
  border-radius: 5px;
}
#search .mvList .img-box span {
  font-size: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
  color: aqua;
  opacity: 0;
  transition: .5s;
}
#search .mvList .img-box:hover span{
  opacity: 1;
  transition: .5s;
}

#search .mvList .img-box p:nth-of-type(1){
  position: absolute;
  color: #fff;
  font-size: 15px;
  top: 0;
  right: 0;
}
#search .mvList .img-box p:nth-of-type(2){
  position: absolute;
  color: #fff;
  font-size: 15px;
  top: 120px;
  right: 0;
}
#search .mvList .sheetName{
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1em;
}
</style>