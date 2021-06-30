<template>
  <div :class="['menu', isCollapse ? 'collapse' : '']">
    <logo></logo>
    <tree-menu
      :is-collapse="isCollapse"
      :menus="menus"
    ></tree-menu>
  </div>
</template>
<script>
import logo from "./logo.vue";
import treeMenu from "./tree-menu.vue";
export default {
  props: ["isCollapse"],
  data() {
    return {
       menus: [
        {
          icon: "fa fa-cog",
          // path: "sys",
          path: "#",
          name: "系统管理",
          children: [
            {
              icon: "fa fa-users",
              // path: "sys/user",
              path: "user",
              name: "用户管理",
              children: undefined,
            },
            {
              icon: "fa fa-cubes",
              path: "dept",
              name: "部门管理",
              children: undefined,
            },
            {
              icon: "fa fa-vcard",
              path: "role",
              name: "角色管理",
              children: undefined,
            },
            {
              icon: "fa fa-user-secret",
              path: "auth",
              name: "权限管理",
              children: undefined,
            },
            {
              icon: "fa fa-file-o",
              path: "log",
              name: "日志管理",
              children: undefined,
            },
          ],
        },
        {
          icon: "fa fa-bar-chart-o",
          path: "",
          name: "数据统计",
          children: [],
        },
      ],
    };
  },
  methods: {
  },
  components: {
    logo,
    treeMenu,
  },
};
</script>