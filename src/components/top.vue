<template>
  <div id="head">
    <div class="head-left">
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" @click="$router.back(); "></el-button>
        <el-button type="primary" @click="clicks()">
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>
    </div>
    <div class="head-right">
      <el-input
        size="mini"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        @keyup.enter.native="inputsearch"
        v-model="inputValue"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    clicks(){
      window.history.forward();
    },
    inputsearch() {
      if (this.inputValue == "") {
        alert("请输入内容！！！");
      } else {
        this.$router.history.push("/search?value=" + this.inputValue);
      }
    },
  },
};
</script>

<style>
#head {
  height: 60px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  background: rgb(249, 249, 249);
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
#head .head-left {
  width: 244px;
  height: 100%;
  margin-left: 20px;
  margin-top: 10px;
}
#head .head-right {
  width: 203px;
  height: 100%;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
input {
  width: 203px;
}
</style>