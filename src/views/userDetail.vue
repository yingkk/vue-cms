<template>
  <div class="user-detail">
    <el-form :model="userDetailInfo">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userDetailInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="userrealname">
        <el-input v-model="userDetailInfo.userrealname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleUpdate">确定</el-button>
        <el-button @click="handleCancel">取消</el-button>
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
    };
  },
  async created() {
    if (!this.$route.params.id) {
      return;
    }
    const res = await this._getUserById(this.$route.params.id);
    if (this.httpSuccess(res)) {
      console.log(res);
      this.userDetailInfo = { ...res.data };
    }
  },
  methods: {
    ...mapActions("user", ["_getUserById", "_updateUser", "_addUser"]),
    async handleUpdate() {
      if (!this.$route.params.id) {
        const res = await this._addUser(this.userDetailInfo);
        if (this.httpSuccess(res)) {
          console.log("新增成功");
          this.$router.push("/user");
        }
        return;
      }
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