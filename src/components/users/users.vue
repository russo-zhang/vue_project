<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/users'}">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/users'}">用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="userList.query" class="input-with-select search_text">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" class="addBtn" @click="addDialogue=true">添加用户</el-button>
    </div>

    <!-- 用户表格 -->
    <el-table :data="users" style="width: 100%" :border="true">
      <el-table-column width="40" type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="usersState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="showEditDialogue(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="showDelDialogue(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="handleDelete(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userList.pagenum"
      :page-sizes="[3, 4, 5, 10]"
      :page-size="userList.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userList.total"
    ></el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogue">
      <el-form :model="managers" :label-width="'auto'" :rules="rules" ref="managers">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="managers.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="managers.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="managers.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="managers.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogue = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogue">
      <el-form :model="editForm" :label-width="'auto'" :rules="rules" ref="editForm">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogue=false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import {
  getUsersData,
  addUser,
  editUser,
  delUserById,
  userState
} from "@/api/api_users.js";
export default {
  data() {
    return {
      value: true,
      search_text: "",
      userList: {
        query: "",
        pagenum: 1,
        pagesize: 5,
        total: 0,
        usersArrLength: 0
      },
      users: [],
      addDialogue: false,
      editDialogue: false,
      managers: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
        // email: [
        //   { required: true, message: "邮箱不能为空", trigger: "blur" },
        //   {
        //     pattern: /^\w+@{1}\w+[.]{1}\w+$/,
        //     message: "邮箱格式不正确",
        //     trigger: "blur"
        //   }
        // ],
        // mobile: [
        //   { required: true, message: "手机号不能为空", trigger: "blur" },
        //   {
        //     pattern: /^[1]{1}[3578]{1}\d{9}$/,
        //     message: "手机号格式不正确",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  methods: {
    init() {
      getUsersData(this.userList).then(res => {
        // console.log(res)
        this.users = res.data.data.users;
        this.userList.total = res.data.data.total;
        // 获取当前用户数组长度,用于删除当前页最后一个用户时使用
        this.userList.usersArrLength = res.data.data.users.length;
      });
    },

    //添加用户
    addUser() {
      this.$refs.managers.validate(vaild => {
        if (vaild) {
          addUser(this.managers).then(res => {
            // console.log(res);
            if (res.data.meta.status == 201) {
              this.$message({
                message: "添加用户成功",
                type: "success"
              });
              this.addDialogue = false;
              this.init();

              // 重置表单
              this.$refs.managers.resetFields();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          this.$message({
            message: "数据格式不正确请检查",
            type: "error"
          });
          return false;
        }
      });
    },

    // 编辑用户弹窗
    showEditDialogue(row) {
      this.editDialogue = true;
      this.editForm.id = row.id;
      this.editForm.username = row.username;
      this.editForm.email = row.email;
      this.editForm.mobile = row.mobile;
    },
    // 编辑用户
    editUser() {
      this.$refs.editForm.validate(async vaild => {
        if (vaild) {
          var res = await editUser(this.editForm);
          if (res.data.meta.status == 200) {
            this.$message({
              message: "编辑用户成功",
              type: "success"
            });
            this.editDialogue = false;
            this.init();
            // 重置表单
            this.$refs.editForm.resetFields();
          } else {
            this.$message.error(res.data.meta.msg);
          }
        } else {
          this.$message({
            message: "数据格式不正确请检查",
            type: "error"
          });
          return false;
        }
      });
    },

    // 删除用户弹窗--确认后删除
    showDelDialogue(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          var res = await delUserById(row.id);
          if (res.data.meta.status == 200) {
            this.$message({
              message: "删除用户成功",
              type: "success"
            });
            if (this.userList.usersArrLength == 1) {
              if (this.userList.total != 1) {
                this.userList.pagenum--;
              }
            }

            this.init();
          } else {
            this.$message.error(res.data.meta.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 用户状态修改
    async usersState(data) {
      data.uId = data.id;
      data.type = data.mg_state;
      var res = await userState(data);
      if (res.data.meta.status == 200) {
        this.$message({
          message: "用户状态更改成功",
          type: "success"
        });
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },

    //分页器分页功能
    handleSizeChange(val) {
      this.userList.pagesize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.userList.pagenum = val;
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    "userList.query"() {
      this.init();
    }
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
.addBtn {
  margin-left: 20px;
  margin-bottom: 5px;
}
</style>