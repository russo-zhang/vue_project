<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="search_text" class="input-with-select search_text">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" class="addBtn" @click="addUser">添加用户</el-button>
    </div>

    <!-- 用户表格 -->
    <el-table :data="users" style="width: 100%" :border="true">
      <el-table-column width="40" type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="100"></el-table-column>
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="usersState(scope.$index, scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { getUsersData,addUser } from "@/api/api_users.js";
export default {
  data() {
    return {
      value: true,
      search_text: "",
      userList: {
        pagenum: 1,
        pagesize: 10
      },
      users: []
    };
  },
  methods: {
     addUser(){
         this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
     },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    usersState(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    getUsersData(this.userList).then(res => {
      this.users = res.data.data.users;
    });
  }
};
</script>
 
<style lang='less' scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.search_text {
  width: 330px;
}
.addBtn{
   margin-left:20px;
   margin-bottom:5px
}
</style>