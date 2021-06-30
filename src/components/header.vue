<template>
  <div class="header">
    <div class="header-left">
      <span class="header-collapse" @click="handleClick">
        <i :class="isCollapse ? 'fa fa-indent' : 'fa fa-dedent'"></i>
      </span>
    </div>
    <div class="header-right">
        <user-setting></user-setting>
    </div>
  </div>
</template>
<script>
import userSetting from "@/components/user-setting.vue"
export default {
  props: ["isCollapse"],
  created(){
  },
  methods: {
    handleClick() {
      this.$emit("toggleCollapse", !this.isCollapse);
    },
  },
  components: {
      userSetting
  }
};
</script>