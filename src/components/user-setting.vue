<template>
  <div class="user-setting">
    <div class="user-setting-left">
      <div class="user-icon">
        <img
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
      <span class="user-nickname">{{ loginUserInfo["loginName"] }}</span>
    </div>
    <div class="user-setting-right">
      <span class="user-ops" @click="handleClick($event)">
        <i :class="isShow ? 'fa fa-caret-up' : 'fa fa-caret-down'"></i>
      </span>

      <div class="ops-menu" v-show="isShow">
        <div
          class="ops-menu-item"
          v-for="(item, index) in menus"
          :key="`user-ops-${index}`"
          @click="handleOption(item)"
        >
          <span class="ops-menu-icon">
            <i :class="item.icon"></i>
          </span>
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isShow: false,
      menus: [
        {
          link: "/favorite",
          title: "我的收藏",
          icon: "fa fa-star",
        },
        {
          link: "/changePwd",
          title: "修改密码",
          icon: "fa fa-key",
        },
        {
          code: "logout",
          link: "/logout",
          title: "退出登录",
          icon: "fa fa-sign-out",
        },
      ],
    };
  },
  created() {
    this.addEventListener();
  },
  computed: {
    ...mapState(["loginUserInfo"]),
  },
  methods: {
    ...mapActions("login", ["_logout"]),
    addEventListener() {
      document.body.addEventListener("click", () => {
        this.isShow = false;
      });
    },
    handleClick(e) {
      e.stopPropagation();
      this.isShow = !this.isShow;
    },
    handleOption(item) {
      if (item.code === "logout") {
        this.handleLogout();
        return;
      }
      this.$router.push(item.path);
      this.isShow = false;
    },
    handleLogout() {
      localStorage.clear();
      this._logout().then((res) => {
        if (this.httpSuccess(res)) {
          console.log("退出登录成功");
        }
      });
      this.$router.push("/login");
    },
  },
};
</script>