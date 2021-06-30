<template>
  <div class="x-table">
    <table style="width: 100%; height: 100%">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.userName }}</td>
        </tr>
      </tbody>
    </table>
    <pagination :total="data.length"></pagination>
  </div>
</template>
<script>
import pagination from "./pagination.vue";
export default {
  props: ["data"],
  data() {
    return {};
  },
  components: {
    pagination,
  },
};
</script>
<style lang="scss" scoped>
.x-table {
  width: 100%;
  height: 100%;
}
</style>