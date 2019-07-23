<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/rolesList'}">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-thumb" style="margin-bottom:5px">添加角色</el-button>

    <!-- 角色表格 -->
    <el-table :data="rolesForm" style="width: 100%" border stripe>
      <el-table-column type="expand">
        <template >
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row :gutter="10">
              <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" @click="handleEdit(scope.row)">编辑角色</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.row)">删除角色</el-button>
          <el-button size="mini" type="info" plain>授权角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { getAllRoles } from "@/api/api_roles.js";
export default {
  data() {
    return {
      rolesForm: []
    };
  },
  methods: {
    async init() {
      let res = await getAllRoles();
      if (res.data.meta.status != 200)
        return this.$message.error(res.data.meta.msg);
      this.rolesForm = res.data.data;
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
 
<style lang='less' scoped>
 .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>