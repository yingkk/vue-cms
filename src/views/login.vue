<template>
  <div class="login">
    <div class="login-box">
      <div class="box-tab">
        <router-link
          :to="item.path"
          v-for="(item, index) in tabs"
          :key="`tab-${index}`"
          :class="[activeTabName === item.name ? 'active' : '']"
          >{{ item.title }}</router-link
        >
      </div>
      <form ref="loginForm" novalidate="true">
        <div
          class="box-item"
          v-for="(item, index) in items"
          :key="`login-${index}`"
        >
          <span class="prefix-icon"> <i :class="item.prefixIcon"></i></span>
          <input
            :class="[item.prop === 'code' ? 'reset' : '']"
            :type="item.type"
            v-model="formData[item.prop]"
            :placeholder="item.label"
            required
            :name="item.prop"
            @input="handleChange(item)"
          />
          <a
            @click="handleSendMsg"
            v-if="item.prop === 'code'"
            :class="['suffix-icon', isSend ? 'active' : '']"
          >
            发送验证码
          </a>
        </div>
        <div class="box-ops" v-if="activeTabName === 'login'">
          <div class="remember-btn">
            <input
              type="checkbox"
              v-model="checked"
              @change="handleRememberMe"
            />
            <span>记住我</span>
          </div>
          <span class="forget-btn">忘记密码？</span>
        </div>
        <div class="box-btn" @click="handleSubmit($event)">
          <button :class="activeTabName !== 'login' ? 'reset' : ''">
            {{ activeTabName === "login" ? "登录" : "注册" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      checked: false,
      isSend: false,
      error: [],
      formData: {},
      items: [],
      activeTabName: "login",
      tabs: [
        {
          name: "login",
          path: "/login",
          title: "登录",
        },
        {
          name: "register",
          path: "/register",
          title: "注册",
        },
      ],
      signInItems: [
        {
          label: "用户名",
          prop: "username",
          prefixIcon: "fa fa-user",
          type: "text",
        },
        {
          label: "密码",
          prop: "password",
          prefixIcon: "fa fa-lock",
          type: "password",
        },
      ],
      signUpItems: [
        {
          label: "用户名",
          prop: "username",
          prefixIcon: "fa fa-user",
          type: "text",
        },
        {
          label: "手机号",
          prop: "phone",
          prefixIcon: "fa fa-mobile",
          type: "text",
        },
        {
          label: "设置密码",
          prop: "password",
          prefixIcon: "fa fa-lock",
          type: "password",
        },
      ],
    };
  },
  created() {
    this.onTabChange(this.$route.name);
  },
  watch: {
    $route(to) {
      const { name } = to;
      this.onTabChange(name);
    },
  },
  methods: {
    ...mapActions("login", ["_login", "_getLoginUserInfo"]),
    ...mapMutations(["SET_LOGIN_USER_INFO"]),
    onTabChange(name) {
      this.activeTabName = name;
      this.signUpItems.length > 3
        ? this.signUpItems.splice(2, 1)
        : this.signUpItems;
      this.items = name === "login" ? this.signInItems : this.signUpItems;
      this.handleClearForm();
    },
    handleCheck() {
      console.log(this.checked);
    },
    handleChange(item) {
      if (item.prop === "username" && !this.formData[item.prop]) {
        this.error.push("用户名不能为空");
        return;
      }
      if (item.prop === "phone") {
        if (!this.formData[item.prop]) {
          this.error.push("手机号不能为空");
          return;
        }
        this.addInputCode(item);
        const isVaildPhone = this.validPhone(this.formData[item.prop]);
        if (!isVaildPhone) {
          this.isSend = false;
          this.error.push("手机号不正确");
          return;
        }
        this.isSend = true;
      }
      if (item.prop === "password" && !this.formData[item.prop]) {
        this.error.push("密码不能为空");
        return;
      }
    },
    addInputCode() {
      if (this.activeTabName === "register" && this.signUpItems.length > 3) {
        return;
      }
      const verificationCode = {
        label: "验证码",
        prop: "code",
        prefixIcon: "fa fa-envelope",
        type: "text",
      };
      this.signUpItems.splice(2, 0, verificationCode);
    },
    async handleSubmit(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.set("username", this.formData?.username);
      formData.set("password", this.formData?.password);
      const res = await this._login(formData);
      if (this.httpSuccess(res)) {
        localStorage.setItem("TOKEN", res.data.token);
      }
      const result = await this._getLoginUserInfo();
       if (this.httpSuccess(result)) {
        localStorage.setItem("TOKEN", result.data.token);
      }
      this.SET_LOGIN_USER_INFO(result.data);
      this.$router.push("/"); // 跳转到首页
    },
    handleClearForm() {
      this.formData = {};
    },
    handleRememberMe() {
      //实现方式：
      /** 1.浏览器自动保存； */
      /** 2.登录信息存储到cookie； */
      // 用户登陆成功后，判断是否选中记住密码：
      // 1)若选中：将用户名、密码(加密)、token信息存储到cookie
      // 2)若未选中，将用户名、密码置空
      // 另：页面加载从cookie中获取登录信息，判断是否存在：
      // 若存在，需将密码解密赋值给表单，并勾选记住密码框
    },
    handleSendMsg() {},
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone(phone) {
      const re = /^1[3|4|5|7|8][0-9]{9}$/;
      return re.test(phone);
    },
    validPwd(pwd) {
      const re = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{8,18}$/;
      return re.test(pwd);
    },
  },
};
</script>