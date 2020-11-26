<template>
  <div id="latestMusic">
    <ul class="nav">
      <li :class="{ active: tag == 0 }" @click="tag = 0">全国</li>
      <li :class="{ active: tag == 7 }" @click="tag = 7">华语</li>
      <li :class="{ active: tag == 96 }" @click="tag = 96">欧美</li>
      <li :class="{ active: tag == 8 }" @click="tag = 9">日本</li>
      <li :class="{ active: tag == 16 }" @click="tag = 16">韩国</li>
    </ul>
    <div class="list">
      <tr>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>        
      </tr>
      <tr v-for="(item,index) in micLists" :key="index" class="hover-tr">
        <td>{{index+1}}</td>
        <td>
          <div class="td-img" @click="play(index)">
            <img :src="item.album.picUrl" alt="">
            <span class="iconfont iconbofang"></span>
          </div>
        </td>
        <td>{{item.name}}</td>
        <td>{{item.album.artists[0].name}}</td>
        <td>{{item.album.name}}</td>
        <td>{{getDuration(index)}}</td>
      </tr>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "latestMusic",
  watch:{
    tag(){
      this.getmuclist()
    }
    
  },
  data() {
    return {
      tag: 0,
      micLists:[],
    };
  },
  created() {
    this.getmuclist()
  },
  methods: {
    play(i){
      axios({
        url:"https://autumnfish.cn/song/url",
        method:"get",
        params:{
          id:this.micLists[i].id
        }
      }).then(res=>{
        this.$parent.$parent.$children[2].musicsrc = res.data.data[0].url;
      })
    },
    getmuclist(){
      axios({
        url:"https://autumnfish.cn/top/song",
        method:"get",
        params:{
          type:this.tag
        }
      }).then(res=>{
        this.micLists = res.data.data;
      })
    },
    getDuration(x){
      x= this.micLists[x].duration;
      let min = parseInt(x/1000/60);
      let sec = parseInt(x/1000%60);
      if(min<10){
        min = "0" + min
      }
      if(sec<10){
        sec = "0" +sec
      }
      return min +":"+ sec;
    }

  }, 
};
</script>

<style>
ul li {
  list-style: none;
}
#latestMusic {
  margin-top: 10px;
  margin-bottom: 70px;
}
#latestMusic .nav {
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
}
#latestMusic .nav li {
  margin-right: 20px;
}
.active {
  color: pink;
}

#latestMusic .list{
  font-size: 14px;
  font-weight: 400;
  margin-top: 20px;
}
#latestMusic .list tr th{
  color: #909399;
  font-weight: normal;
  padding-bottom: 10px;
  text-align: left;
}
#latestMusic .list tr td{
  color: #606266;
  line-height: 94px;
  height: 94px;
}
#latestMusic .list tr td:nth-of-type(1){
  width: 50px;
}
#latestMusic .list tr th:nth-of-type(2){
  width: 130px;
}
#latestMusic .list tr th:nth-of-type(2) .td-img{
  position: relative;
}
#latestMusic .list tr td:nth-of-type(2) img{
  width: 70px;
  height: 70px;
  border-radius: 5px;
  position: absolute;
  margin-top: 12px;
}
#latestMusic .list tr td:nth-of-type(2) span{
  font-size: 30px;
  color: antiquewhite;
  position: absolute;
  margin-left: 20px;
}
#latestMusic .list tr td:nth-of-type(3){
  width: 300px;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
}
#latestMusic .list tr td:nth-of-type(4){
  width: 200px;
  
}
#latestMusic .list tr td:nth-of-type(5){
  width: 384px;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
}
#latestMusic .list tr td:nth-of-type(6){
  width: 36px;

}
#latestMusic .list .hover-tr:hover{
  background: rgb(245,247,250);
}

</style>