<template>
  <div class="user-detail">
    <el-form :model="userDetailInfo">
      <el-form-item label="用户名" prop="userName" required>
        <el-input
          v-model="userDetailInfo.userName"
          size="small"
          :disabled="!!$route.params.id"
        ></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="userrealname" required>
        <el-input v-model="userDetailInfo.userrealname" size="small"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userDetailInfo.phone" size="small"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" size="small">
        <el-input v-model="userDetailInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="dept" required>
        <el-select
          v-model="userDetailInfo.dept"
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="(item, index) in depts"
            :key="`dept-${index}`"
            :label="item.deptName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色" prop="role" required>
        <el-select
          v-model="userDetailInfo.role"
          placeholder="请选择"
          multiple
          size="small"
        >
          <el-option
            v-for="(item, index) in roles"
            :key="`role-${index}`"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleUpdate"
          >确定</el-button
        >
        <el-button size="small" @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userDetailInfo: {},
      depts: [],
      roles: [],
    };
  },
  async created() {
    const values = await Promise.all([this._getDepts(), this._getRoles()]);
    this.depts = values[0].data;
    this.roles = values[1].data;
    if (!this.$route.params.id) {
      return;
    }
    const res = await this._getUserById(this.$route.params.id);
    if (this.httpSuccess(res)) {
      const { userName, userrealname, dept, role, phone, id, email } = res.data;
      this.userDetailInfo = {
        userName: userName,
        userrealname: userrealname,
        dept: dept,
        role: role,
        phone: phone,
        id: id,
        email: email,
      };
    }
  },
  methods: {
    ...mapActions("user", ["_getUserById", "_updateUser", "_addUser"]),
    ...mapActions("dept", ["_getDepts"]),
    ...mapActions("role", ["_getRoles"]),
    async handleUpdate() {
      if (!this.$route.params.id) {
        const res = await this._addUser(this.userDetailInfo);
        if (this.httpSuccess(res)) {
          console.log("新增成功");
          this.$router.push("/user");
        }
        return;
      }
      console.log(this.userDetailInfo);
      const res = await this._updateUser(this.userDetailInfo);
      if (this.httpSuccess(res)) {
        console.log("修改成功");
        this.$router.push("/user");
      }
    },
    handleCancel() {
      this.$router.go(-1);
    },
  },
};
</script>