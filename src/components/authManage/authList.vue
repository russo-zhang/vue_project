<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/authList'}">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table :data="authForm" stripe border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span>{{scope.row.level|level}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { getAuthList } from "@/api/api_auth.js";
export default {
  data() {
    return {
      authForm: []
    };
  },
  methods: {
    async init() {
      let res = await getAuthList();
      if (res.data.meta.status != 200)
        return this.$message.error(res.data.meta.msg);
      this.authForm = res.data.data;
    }
  },
  mounted() {
    this.init();
  },
  filters:{
    level:(level)=>{
      if(level==0){
        return level="一级"
      }else if(level==1){
        return "二级"
      }else if (level==2){
        return "三级"
      }else{
        return ""
      }
    }
  }
};
</script>
 
<style lang='less' scoped>
</style>