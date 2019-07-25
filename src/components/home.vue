<template>
  <div class="home">
    <el-aside width="auto">
      <div class="logo"></div>
      <el-col :span="12">
        <el-menu
          default-active="1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :collapse="isCollapse"
        >
          <el-submenu :index="index+''"  v-for="(fatherMenus,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{fatherMenus.authName}}</span>
            </template>
            <el-menu-item :index="'/'+sonMenus.path" v-for="(sonMenus,index) in fatherMenus.children" :key="index" >
              <template>
                  <i class="el-icon-location"></i>
                  <span>{{sonMenus.authName}}</span>
              </template>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <i class="el-icon el-icon-menu" @click="isCollapse = !isCollapse"></i>
        <span class="title_text">电商后台管理系统</span>
        <a href="javascript: ;" @click="quit">退出</a>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
 
<script>
import {getLeftMenus} from "@/api/api_auth.js";
export default {
  data() {
    return {
      isCollapse: false,
      menus:[]
    };
  },
  methods: {
    quit() {
      this.$router.push("/login");
    },
    async initMenus() {
      let res = await getLeftMenus();
      if (res.data.meta.status != 200) return this.$message.error(res.data.meta.msg);
      // console.log(res);
      res.data.data.forEach((item1, index1)=>{
        item1.children.forEach((item2, index2)=>{
          // console.log(item2.path)
        })
      })
      this.menus=res.data.data
    }
  },
  mounted() {
    this.initMenus();
  }
};
</script>
<style lang='less' scoped>
.home {
  display: flex;
  flex-direction: row;
  height: 100%;
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    height: 100%;
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
    width: 100%;
    height: 60px;
    .el-icon-menu {
      font-size: 30px;
    }
    .title_text {
      color: #fff;
      font-size: 22px;
    }
    a {
      color: #fff;
      font-size: 20px;
    }
  }
  .logo {
    width: auto;
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
}
</style>