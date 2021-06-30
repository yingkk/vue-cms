<template>
  <ul class="menu-block">
    <li
      :class="[
        'menu-item',
        activeMenu.name === item.name && !activeMenu.children ? 'active' : '',
      ]"
      v-for="(item, index) in menus"
      :key="`menu-${index}`"
      @click.stop="handleClick(item)"
    >
      <div class="menu-item-content">
        <span class="prefix-icon">
          <i :class="item.icon"></i>
        </span>
        <span>{{ item.name }}</span>
        <span
          class="suffix-icon"
          v-if="!isCollapse && item.children && item.children.length"
        >
          <i
            :class="[item.isExpend ? 'fa fa-angle-down' : 'fa fa-angle-up']"
          ></i>
        </span>
      </div>
      <tree-menu
        v-show="item.isExpend"
        v-if="item.children"
        :is-collapse="isCollapse"
        :menus="item.children"
      ></tree-menu>
    </li>
  </ul>
</template>
<script>
export default {
  name: "treeMenu",
  props: ["isCollapse", "menus"],
  data() {
    return {
      activeMenu: {},
    };
  },
  created() {
    this.convertListToTree(this.menus);
  },
  methods: {
    convertListToTree(menus) {
      menus.forEach((t) => {
        t.isExpend = false;
        if (t.children) {
          this.convertListToTree(t.children);
        }
      });
    },
    handleClick(item) {
      this.activeMenu = item;
      if (!item.children) {
        this.$router.push({ path: item.path });
      }
      item.isExpend = !item.isExpend;
      this.handleUpdateExpend(this.menus, item);
    },
    handleUpdateExpend(data, target) {
      data.forEach((t, index) => {
        if (t.name === target.name) {
          data.splice(index, 1, target);
          return;
        }
        if (t.children) {
          this.handleUpdateExpend(t.children, target);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-block {
  width: 240px;
  height: 100%;
  .menu-item {
    width: 100%;
    line-height: 56px;
    box-sizing: border-box;
    font-size: 14px;
    color: #a8a8a8;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    .menu-item-content {
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
      position: relative;
      padding: 0 20px;
      span:first-child {
        margin-right: 20px;
        display: block;
        min-width: 28px;
        text-align: center;
      }
      .suffix-icon {
        position: absolute;
        top: 50%;
        right: 20px;
        margin-top: -28px;
        transition: transform 0.3s;
        transform: rotate(180deg);
      }
    }
    .menu-item-content:hover {
      background-color: #95befc;
      color: #fff;
    }
  }
  .active {
    font-weight: 500;
    font-size: 15px;
    background-color: #95befc;
    color: #fff;
  }
}
</style>