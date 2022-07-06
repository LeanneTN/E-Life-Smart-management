<template>
  <div class="hello">
    <router-link to="/">
      <el-button type="success">点击跳往‘/’对应的路由</el-button>
    </router-link>
    <router-link to="/user">
      <el-button type="primary">点击跳往‘/user’对应的路由</el-button>
    </router-link>
    <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      input:''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
