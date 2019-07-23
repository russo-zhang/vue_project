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
        <template slot-scope="scope">
          <el-row
            :key="first.id"
            v-for="first in scope.row.children"
            style="margin-bottom:5px;border-bottom:1px dashed #ccc"
          >
            <el-col :span="4">
              <el-tag
                :type="'success'"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row.children,scope.row.id,first.id)"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row :key="second.id" v-for="second in first.children" style="margin-bottom:5px">
                <el-col :span="4">
                  <el-row>
                    <el-tag
                      closable
                      :disable-transitions="false"
                      @close="handleClose(scope.row.children,scope.row.id,second.id)"
                    >{{second.authName}}</el-tag>
                  </el-row>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    :type="'info'"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(scope.row.children,scope.row.id,third.id)"
                    :key="third.id"
                    v-for="third in second.children"
                    style="margin:0px 5px 5px 0px"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
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
import { cancelAuth } from "@/api/api_auth.js";
export default {
  data() {
    return {
      rolesForm: []
    };
  },
  methods: {
    async init() {
      let res = await getAllRoles();
      // console.log(res)
      if (res.data.meta.status != 200)
        return this.$message.error(res.data.meta.msg);
      this.rolesForm = res.data.data;
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
    },

    // 关闭权限标签
    async handleClose(arr, roleId, rightId) {
      let res = await cancelAuth(roleId, rightId);
      console.log(arr);
      if (res.data.meta.status != 200)
        return this.$message.error(res.data.meta.msg);
      console.log(res.data.data);
      arr = res.data.data;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
 
<style lang='less' scoped>
</style>