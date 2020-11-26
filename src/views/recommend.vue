<template>
  <div id="recommend">
    <div class="Boutique">
      <img :src="playlist.coverImgUrl" alt="" />
      <img :src="playlist.coverImgUrl" alt="" />

      <div class="text">
        <div class="title">精品歌单</div>
        <p>{{ playlist.name }}</p>
        <p>{{ playlist.description }}</p>
      </div>
    </div>

    <div id="list">
      <ul>
        <li :class="{ active: tag == '全部' }" @click="tag = '全部'">全部</li>
        <li :class="{ active: tag == '欧美' }" @click="tag = '欧美'">欧美</li>
        <li :class="{ active: tag == '华语' }" @click="tag = '华语'">华语</li>
        <li :class="{ active: tag == '流行' }" @click="tag = '流行'">流行</li>
        <li :class="{ active: tag == '说唱' }" @click="tag = '说唱'">说唱</li>
        <li :class="{ active: tag == '摇滚' }" @click="tag = '摇滚'">摇滚</li>
        <li :class="{ active: tag == '民谣' }" @click="tag = '民谣'">民谣</li>
        <li :class="{ active: tag == '电子' }" @click="tag = '电子'">电子</li>
        <li :class="{ active: tag == '轻音乐' }" @click="tag = '轻音乐'">
          轻音乐
        </li>
        <li :class="{ active: tag == '影视原声' }" @click="tag = '影视原声'">
          影视原声
        </li>
        <li :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'">ACG</li>
        <li :class="{ active: tag == '怀旧' }" @click="tag = '怀旧'">怀旧</li>
        <li :class="{ active: tag == '治愈' }" @click="tag = '治愈'">治愈</li>
      </ul>
    </div>

    <div id="micList">
      <div v-for="(item,index) in micLists" :key="index">
        <div class="micList-item">
          <div class="item-img" @click="pushRecommend(index)">
            <img :src="item.coverImgUrl" alt="">
            <span class="iconfont iconbofang"></span>
            <p>{{getplayCount(index)}}</p>
          </div>
          <p>{{item.description}}</p>
        </div>
      </div>
    </div>

    <el-pagination 
    @current-change="pagechange"
    background
    layout="prev, pager, next" 
    :total="total"  
    :current-page="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  watch: {
    tag(){
      this.page = 1;
      this.getHeadAxios();
      this.getListAxios();
    }
  },
  name: "recommend",
  data() {
    return {
      playlist: {},
      tag: "全部",
      micLists: [],
      page:1,
      total:0,
    };
  },
  created() {
    this.getHeadAxios();
    this.getListAxios();
  },
  methods: {
    pagechange(val){
      console.log(val);
      this.page = val
      this.getListAxios()
    },
    getHeadAxios() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method:"get",
        params: {
          limit: 1,
          cat: this.tag,
        },
      }).then((res) => {
        this.playlist = res.data.playlists[0];
      });
    },
    getListAxios(){
      axios({
        url:"https://autumnfish.cn/top/playlist/",
        method:"get",
        params:{
          limit:10,
          offset:(this.page-1)*10,
          cat:this.tag,
        }
      }).then(res=>{
        this.micLists = res.data.playlists;
        this.total = res.data.total
      })
    },
    getplayCount(x){
      if(this.micLists[x].playCount >= 10000){
        return "播放量: "+parseInt(this.micLists[x].playCount/10000)+"万"
      }
    },
    pushRecommend(i){
      this.$router.history.push('/songSheet?id='+this.micLists[i].id)
    }
  },
  computed: {
    
  },
};
</script>

<style>
#recommend {
  margin-top: 10px;
  margin-bottom: 70px;
}
#recommend .Boutique {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
}
#recommend .Boutique img {
  position: absolute;
}
#recommend .Boutique img:nth-of-type(1) {
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  filter: blur(20px);
}
#recommend .Boutique img:nth-of-type(2) {
  z-index: 10;
  width: 160px;
  height: 160px;
  top: 50%;
  margin-top: -80px;
  left: 20px;
}
#recommend .Boutique .text {
  position: absolute;
  left: 200px;
  top: 20px;
}
#recommend .Boutique .text .title {
  color: #dfac67;
  border: 1px solid #dfac67;
  width: 100px;
  height: 30px;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
  cursor: pointer;
}
#recommend .Boutique .text p:nth-of-type(1) {
  color: #fff;
  padding-top: 10px;
}
#recommend .Boutique .text p:nth-of-type(2) {
  color: #888482;
  font-size: 14px;
  overflow: hidden;
  padding-right: 20px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
#list {
  font-size: 15px;
  color: grey;
}
#list ul li {
  list-style: none;
  line-height: 90px;
  margin-right: 20px;
}
#list ul .active {
  color: pink;
}
#list ul {
  display: flex;
  justify-content: flex-end;
  height: 45px;
}

#micList{
  margin-top: 40px;
  height: 524px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
#micList .micList-item{
  width: 200px;
  height: 242px;
  position: relative;
  overflow: hidden;
}
#micList .micList-item .item-img{
  width: 200px;
  height: 200px;
}
#micList .micList-item img{
  width: 200px;
  height: 200px;
  border-radius: 5px;
}
#micList .micList-item span{
  font-size: 40px;
  color: white;
  position: absolute;
  bottom: 50px;
  right: 10px;
  opacity: 0;
  transition: .5s;
}
#micList .micList-item:hover span{
  opacity: 1;
  transition: .5s;
}

#micList .micList-item p{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 14px;
}
#micList .micList-item .item-img p{
  position: absolute;
  background: rgb(15,16,32);
  color: aliceblue;
  width: 100%;
  top: -30px;
  font-size: 16px;
  line-height: 30px;
  transition: .5s;
  margin-left: 0;
}
#micList .micList-item .item-img:hover p{
  top: 0;
  transition: .5s;
}
.el-pagination{
  width: 500px;
  margin: auto;  

}
</style>