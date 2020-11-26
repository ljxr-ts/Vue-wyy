<template>
  <div id="latestMv">
    <div class="nav">
      <ul>
        <li>地区:</li>
        <li :class="{active:tagA=='全部'}" @click="tagA='全部'">全部</li>
        <li :class="{active:tagA=='内地'}" @click="tagA='内地'">内地</li>
        <li :class="{active:tagA=='港台'}" @click="tagA='港台'">港台</li>
        <li :class="{active:tagA=='欧美'}" @click="tagA='欧美'">欧美</li>
        <li :class="{active:tagA=='日本'}" @click="tagA='日本'">日本</li>
        <li :class="{active:tagA=='韩国'}" @click="tagA='韩国'">韩国</li>
      </ul>
      <ul>
        <li>类型:</li>
        <li :class="{active:tagB=='全部'}" @click="tagB='全部'">全部</li>
        <li :class="{active:tagB=='官方版'}" @click="tagB='官方版'">官方版</li>
        <li :class="{active:tagB=='原声'}" @click="tagB='原声'">原声</li>
        <li :class="{active:tagB=='现场版'}" @click="tagB='现场版'">现场版</li>
        <li :class="{active:tagB=='网易出品'}" @click="tagB='网易出品'">网易出品</li>
      </ul>
      <ul>
        <li>排序:</li>
        <li :class="{active:tagC=='上升最快'}" @click="tagC='上升最快'">上升最快</li>
        <li :class="{active:tagC=='最热'}" @click="tagC='最热'">最热</li>
        <li :class="{active:tagC=='最新'}" @click="tagC='最新'">最新</li>
      </ul>
    </div>

    <div class="Mvlist">
      <div v-for="(item,index) in Mvlist" :key="index">
        <div class="Mv-img" @click="pushMv(index)">
          <img :src="item.cover" alt="">
          <span>{{item.platCount}}</span>
        </div>
        <p>{{item.name}}</p>
      </div>
    </div>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
      :current-page="page"
    >
    </el-pagination>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  watch: {
    tagA(){
      this.page=1;
      this.getMv();
    },
    tagB(){
      this.page=1;
      this.getMv();
    },
    tagC(){
      this.page=1;
      this.getMv();
    }

  },
  name:"latestMv",
  data() {
    return {
      tagA:"全部",
      tagB:"全部",
      tagC:"上升最快",
      Mvlist:[],
      page:1,
      total:100,
    }
  },
  created() {
     this.getMv();
  },
  methods: {
    pushMv(i){
      this.$router.history.push('/newMv?id='+this.Mvlist[i].id)
    },
    currentChange(val){
      this.page = val;
      this.getMv();
    },
    getMv(){
      axios({
        url:"https://autumnfish.cn/mv/all",
        method:"get",
        params:{
          area:this.tagA,
          type:this.tagB,
          order:this.tagC,
          limit:8,
          offset:(this.page - 1) * 8,
        }
      }).then(res=>{
        this.Mvlist = res.data.data;
        if(res.data.count)
        this.total = res.data.count;
      })
    }
  },
}
</script>

<style>
  #latestMv{
    margin-top:25px;
    margin-bottom: 80px;
  }
  #latestMv .nav{
    height: 117px;
  }
  #latestMv .nav ul{
    display: flex;
    margin-top: 25px;
  }
  #latestMv .nav ul li{
    list-style: none;
    margin-right: 55px;
    color: grey;
    line-height: 26px;
    padding:0 15px;
  }
   #latestMv .nav ul li:nth-of-type(1){
     color: black;
   }
   #latestMv .active{
      background-color: #fcf6f5;
      border-radius: 20px;
      color: #dd6d60;
   }

   #latestMv .Mvlist{
     height: 450px;
     margin-top: 40px;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-around;
   }
   #latestMv .Mvlist .Mv-img{
     width: 250px;
     height: 141px;
   }
   #latestMv .Mvlist .Mv-img img{
     width: 250px;
     height: 141px;
     border-radius: 5px;
   }
   #latestMv .Mvlist p{
     display: block;
     width: 250px;
     font-size: 14px;
   }
  #latestMv .el-pagination{
    width: 500px;
    margin: 0 auto;
  }
</style>