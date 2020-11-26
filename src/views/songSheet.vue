<template>
  <div id="songSheet">
    <div class="introduce">
      <img :src="playlist.coverImgUrl" alt="" />
      <div class="introduce-text">
        <ul>
          <li>{{ playlist.name }}</li>
          <li>
            <div>
              <img :src="playlist.creator.avatarUrl" alt="" />
              <p>
                {{ playlist.creator.nickname }}+{{ playlist.createTime }}+创建
              </p>
            </div>
          </li>
          <li>{{ "标签:" + playlist.tags[0] }}</li>
          <li>{{ "简介:" + playlist.creator.signature }}</li>
        </ul>
      </div>
    </div>

    <div class="songlist">
      <p :class="{ act: nav == '歌曲列表' }" @click="nav = '歌曲列表'">
        歌曲列表
      </p>
      <p :class="{ act: nav == '评论' }" @click="nav = '评论'">评论({{sumNew+nub}})</p>
    </div>

    <div class="lists" v-if="nav == '歌曲列表'">
      <tr>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
      <tr
        v-for="(item, index) in playlist.tracks"
        :key="index"
        class="hover-tr"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <div class="td-img" @click="play(index)">
            <img :src="item.al.picUrl" alt="" />
            <span class="iconfont iconbofang"></span>
          </div>
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.ar[0].name }}</td>
        <td>{{ item.al.name }}</td>
        <td>{{ getDt(index) }}</td>
      </tr>
    </div>

    <div class="commend" v-if="nav == '评论'">
      <h2 v-if="nub">热门评论({{ nub }})</h2>
      <div class="commend-hot">
        <ul>
          <li v-for="(item, index) in recommends" :key="index">
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
      <h2 v-if="sumNew">最新评论({{ sumNew }})</h2>
      <div class="commend-hot">
        <ul>
          <li v-for="(item, index) in recommendsNew" :key="index">
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
      <el-pagination 
      background layout="prev, pager, next" 
      :total="sumNew" 
      :current-page="page"
       @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {

  name: "songSheet",
  data() {
    return {
      playlist: {
        creator:{},
        tags:[],
      },
      nav: "歌曲列表",
      recommends: [],
      recommendsNew: [],
      sumNew: 0,
      page:1,
      nub:0,
    };
  },
  created() {
    this.getSheet();
    this.getcommend();
      this.getcommendNew();
  },
  computed: {},
  methods: {
    play(i){
      axios({
        url:"https://autumnfish.cn/song/url",
        method:"get",
        params:{
          id:this.playlist.trackIds[i].id
        }
      }).then(res=>{
        this.$parent.$parent.$children[2].musicsrc = res.data.data[0].url;
      })
    },
    currentChange(val){
      this.page = val;;
      this.getcommendNew();
    },
    getSheet() {
      axios({
        url: "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        this.playlist = res.data.playlist;
      });
    },
    getSum() {
      return this.recommends.length;
    },
    getcommend() {
      axios({
        url: "https://autumnfish.cn/comment/hot",
        method: "get",
        params: {
          id: this.$route.query.id,
          type: 2,
        },
      }).then((res) => {
        this.recommends = res.data.hotComments;
        this.nub = res.data.total;
      });
    },
    getcommendNew() {
      axios({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
          id: this.$route.query.id,
          limit:10,
          offset:(this.page - 1) * 10,
        },
      }).then((res) => {
        this.recommendsNew = res.data.comments;
        this.sumNew = res.data.total;
      });
    },
    getDt(x) {
      x = this.playlist.tracks[x].dt;
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
  },
};
</script>

<style>
#songSheet {
  margin-top: 50px;
  margin-bottom: 70px;
}
#songSheet .introduce {
  height: 234px;
  display: flex;
}
#songSheet .introduce img {
  width: 230px;
  height: 230px;
}
#songSheet .introduce .introduce-text {
  height: 234px;
  margin-left: 30px;
}
#songSheet .introduce .introduce-text ul li {
  margin-top: 10px;
  list-style: none;
}
#songSheet .introduce .introduce-text ul li:nth-of-type(2) div {
  display: flex;
}
#songSheet .introduce .introduce-text ul li img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

#songSheet .songlist {
  height: 40px;
  display: flex;
  color: black;
  border-bottom: 3px solid rgb(228, 231, 237);
}
#songSheet .songlist p {
  font-size: 16px;
  line-height: 40px;
  margin-right: 20px;
}
.act {
  color: #c3473a;
}
#songSheet .lists {
  margin-top: 20px;
}
#songSheet .lists tr th {
  color: #909399;
  font-weight: normal;
  padding-bottom: 10px;
  text-align: left;
  line-height: 50px;
}
#songSheet .lists tr td {
  color: #606266;
  line-height: 94px;
}
#songSheet .lists tr td:nth-of-type(1) {
  width: 50px;
}
#songSheet .lists tr th:nth-of-type(2) {
  width: 130px;
}
#songSheet .lists tr th:nth-of-type(2) .td-img {
  position: relative;
}
#songSheet .lists tr td:nth-of-type(2) img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  position: absolute;
  margin-top: 12px;
}
#songSheet .lists tr td:nth-of-type(2) span {
  font-size: 30px;
  color: antiquewhite;
  position: absolute;
  margin-left: 20px;
}
#songSheet .lists tr td:nth-of-type(3) {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#songSheet .lists tr td:nth-of-type(4) {
  width: 200px;
}
#songSheet .lists tr td:nth-of-type(5) {
  width: 384px;
}
#songSheet .lists tr td:nth-of-type(6) {
  width: 36px;
}
#songSheet .lists .hover-tr:hover {
  background: rgb(245, 247, 250);
}

#songSheet .commend {
  margin-top: 15px;
}
#songSheet .commend h2 {
  font-size: 20px;
  font-weight: 400;
}
#songSheet .commend .commend-hot {
  font-size: 14px;
  margin-top: 15px;
}
#songSheet .commend .commend-hot ul li {
  list-style: none;
  margin-bottom: 10px;
}
#songSheet .commend .commend-hot ul li img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
#songSheet .commend .commend-hot ul li .hot-item {
  display: flex;
}
#songSheet .commend .commend-hot ul li .hot-item .item-text {
  margin-left: 20px;
  margin-top: 5px;
  flex-grow: 1;
}
#songSheet .commend .commend-hot ul li .hot-item .item-text p {
  color: #bebebe;
}
#songSheet
  .commend
  .commend-hot
  ul
  li
  .hot-item
  .item-text
  .text-one
  p:nth-of-type(1) {
  color: #517eaf;
  white-space: nowrap;
  float: left;
}
#songSheet
  .commend
  .commend-hot
  ul
  li
  .hot-item
  .item-text
  .text-one
  p:nth-of-type(2) {
  color: black;
}
</style>