<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      icon="el-icon-thumb"
      style="margin-bottom:5px"
      @click="showAddRoleDialogue"
    >添加角色</el-button>

    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="isShowAddRoleDialogue">
      <el-form :model="addRoleForm" :label-width="'70px'" ref="addRoleForm">
        <el-form-item label="角色名称">
          <el-input v-model="addRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddRoleDialogue = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import {addRole} from '@/api/api_roles.js'
export default {
  data() {
    return {
      isShowAddRoleDialogue:false,
      addRoleForm: {
        roleName:"",
        roleDesc:""
      }
    }
  },
  methods: {
     // 显示添加角色对话框
    showAddRoleDialogue() {
      this.isShowAddRoleDialogue=true
    },

    // 添加角色
    async addRole() {
      let res = await addRole(this.addRoleForm)
      if (res.data.meta.status != 201)
        return this.$message.error(res.data.meta.msg);
        this.$message({
        message: "角色添加成功",
        type: "success"
      });
      this.isShowAddRoleDialogue = false;
      // this.init();
      console.log(this.$refs.addRoleForm.resetFields)
      this.$refs.addRoleForm.resetFields();
      console.log(this.$refs.addRoleForm.roleName)
    },
  },
};
</script>
 
<style lang='less' scoped>
</style>