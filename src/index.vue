<template>
  <div id="app">
    <silder-menu :is-collapse="isCollapse"></silder-menu>
    <div class="main">
      <page-header
        :is-collapse="isCollapse"
        @toggleCollapse="handleToggle"
      ></page-header>
      <div class="container">
        <div class="breadcrumb">
          <el-breadcrumb class="bread" separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in $route.matched"
              :key="index"
              :to="{ path: item.path }"
              >{{ item.meta.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import silderMenu from "@/components/menu.vue";
import pageHeader from "@/components/header.vue";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapState(["loginUserInfo"]),
  },
  async created() {
    // 用户登录成功刷新，rootState用户信息丢失问题，判断后重新获取用户信息
    // is an empty object
    // console.log(Object.keys(this.loginUserInfo).length === 0)
    // console.log(JSON.stringify(this.loginUserInfo) === '{}')
    if (!Object.keys(this.loginUserInfo).length) {
      const res = await this._getLoginUserInfo();
      if (this.httpSuccess(res)) {
        this.SET_LOGIN_USER_INFO(res.data);
      }
    }
  },
  methods: {
    ...mapActions("login", ["_getLoginUserInfo"]),
    ...mapMutations(["SET_LOGIN_USER_INFO"]),
    handleToggle() {
      this.isCollapse = !this.isCollapse;
    },
  },
  components: {
    silderMenu,
    pageHeader,
  },
};
</script>