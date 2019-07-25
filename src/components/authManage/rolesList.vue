<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/rolesList'}">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 添加按钮 -->
    <el-button
      type="primary"
      icon="el-icon-thumb"
      style="margin-bottom:5px"
      @click="isShowAddRoleDialogue=true"
    >添加角色</el-button>

    <!-- 角色表格 -->
    <el-table :data="rolesForm" style="width: 100%" border stripe @expand-change="showTag">
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
                @close="handleClose(scope.row,first.id)"
                v-show="isShowTag"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row :key="second.id" v-for="second in first.children" style="margin-bottom:5px">
                <el-col :span="4">
                  <el-row>
                    <el-tag
                      closable
                      :disable-transitions="false"
                      @close="handleClose(scope.row,second.id)"
                      v-show="isShowTag"
                    >{{second.authName}}</el-tag>
                  </el-row>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    :type="'info'"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(scope.row,third.id,third)"
                    :key="third.id"
                    v-for="third in second.children"
                    style="margin:0px 5px 5px 0px"
                    v-show="isShowTag"
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
          <el-button size="mini" type="danger" plain @click="delDialog(scope.row)">删除角色</el-button>
          <el-button size="mini" type="info" plain @click="authDialogue(scope.row)">授权角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="isShowAddRoleDialogue">
      <el-form :model="addRoleForm" :label-width="'70px'" ref="addRoleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddRoleDialogue = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除角色对话框 -->
    <el-dialog title="提示" :visible.sync="delRoleVisible" width="30%" :before-close="handleClose">
      <span>真的要删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="delRole(delRoleId)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 授权角色对话框 -->
    <el-dialog title="授权角色" :visible.sync="showAuthDialogue">
      <el-tree
        ref="authTree"
        :data="authForm"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="authIdArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAuthDialogue = false">取 消</el-button>
        <el-button type="primary" @click="grantAuth">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { getAllRoles, addRole, delRole } from "@/api/api_roles.js";
import { cancelAuth, getAuthTree, grantAuth } from "@/api/api_auth.js";
export default {
  data() {
    return {
      authForm: [],
      authIdArr: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      rolesForm: [],
      isShowTag: false,
      showAuthDialogue: false,
      isShowAddRoleDialogue: false,
      delRoleVisible: false,
      addRoleForm: {
        roleName: "",
        roleDesc: ""
      },
      delRoleId: ""
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

    // 添加角色
    async addRole() {
      let res = await addRole(this.addRoleForm);
      if (res.data.meta.status != 201)
        return this.$message.error(res.data.meta.msg);
      this.$message({
        message: "角色添加成功",
        type: "success"
      });
      this.isShowAddRoleDialogue = false;
      this.init();
      this.$refs.addRoleForm.resetFields();
    },

    // 删除角色框
    delDialog(row) {
      this.delRoleVisible=true
      this.delRoleId=row.id
    },
    // 删除角色
    async delRole(id){
      let res = await delRole(id);
       if (res.data.meta.status != 200)
        return this.$message.error(res.data.meta.msg);
      this.$message({
        message: "角色删除成功",
        type: "success"
      });
      this.delRoleVisible = false;
      this.init();
    },

    // 获取所有权限树
    async getAuthTree() {
      let res = await getAuthTree();
      if (res.data.meta.status != 200)
        return this.$message.error(res.data.meta.msg);
      this.authForm = res.data.data;
    },
    handleEdit(row) {
      console.log(row);
    },

    // 打开权限树对话框
    async authDialogue(row) {
      let res = await getAuthTree();
      this.authForm = res.data.data;
      this.showAuthDialogue = true;
      this.authIdArr = [];
      row.children.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            this.authIdArr.push(third.id);
          });
        });
      });
      this.authDialogueCurrentRow = row;
    },

    // 授权请求
    async grantAuth() {
      let roleId = this.authDialogueCurrentRow.id;

      // 新方法(便捷)
      // console.log(this.$refs.authTree.getCheckedKeys())
      // console.log(this.$refs.authTree.getHalfCheckedKeys())

      let arr = this.$refs.authTree.getCheckedNodes();
      let str = "";
      arr.forEach((item, index) => {
        str += item.id + "," + item.pid + ",";
      });
      let new_str = str.slice(0, -1);
      // let new_arr = new_str.split(",")
      let new_arr = [...new Set(new_str.split(","))]; //ES6新语法数组去重
      let rids = new_arr.join(",");
      let res = await grantAuth(roleId, rids);
      if (res.data.meta.status != 200)
        return this.$message.error(res.data.meta.msg);
      this.$message({
        message: "权限更新成功",
        type: "success"
      });
      this.showAuthDialogue = false;
      this.init();
    },

    // 关闭权限标签
    async handleClose(row, rightId) {
      let res = await cancelAuth(row.id, rightId);
      // console.log(arr);
      if (res.data.meta.status != 200)
        return this.$message.error(res.data.meta.msg);
      this.$message({
        message: "取消权限成功",
        type: "success"
      });
      row.children = res.data.data;
      // let tag=this.$refs.theTag
    },

    // 显示标签
    showTag() {
      var timer = setTimeout(() => {
        this.isShowTag = !this.isShowTag;
      }, 1);
    }
  },
  mounted() {
    this.init();
    this.getAuthTree();
  }
};
</script>
 
<style lang='less' scoped>
</style>