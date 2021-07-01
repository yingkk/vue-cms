<template>
  <div class="user">
    <div class="top">
      <div class="top-query">
        <el-input
          size="small"
          type="text"
          autosize
          placeholder="请输入用户名"
          v-model="params.userName"
          @input="handleChange('userName', $event)"
        >
        </el-input>
        <el-input
          size="small"
          type="text"
          autosize
          placeholder="请输入真实姓名"
          v-model="params.userrealname"
          @input="handleChange('userrealname', $event)"
        >
        </el-input>
        <el-button
          size="small"
          type="primary"
          style="margin-left: 20px"
          @click="handleSearch"
          >查询</el-button
        >
        <el-button size="small" @click="handleClear">清空</el-button>
      </div>
      <div class="top-btns">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleAdd"
          >新增用户</el-button
        >
      </div>
    </div>
    <el-table
      border
      size="small"
      :data="pageData"
      v-loading="loading"
      element-loading-text="加载中..."
    >
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="userrealname"
        label="真实姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        width="180"
      ></el-table-column>
      <el-table-column prop="createtime" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            title="编辑"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            title="删除"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handlePageIndexChange"
      :current-page="pageIndex"
      :page-sizes="[10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
       <router-view />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

//后台分页
export default {
  data() {
    return {
      pageData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      query: {
        first: 0,
        rows: 10,
      },
      params: {},
    };
  },
  async created() {
    await this.searchPageData(this.query);
  },
  computed: {
    ...mapState("user", ["datas"]),
  },
  methods: {
    ...mapActions("user", ["_searchUser"]),

    indexMethod(index) {
      return index + 1;
    },
    handleEdit(index, row) {
      this.$router.push({ name: "edit", params: { id: row.id } });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async handlePageSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.query = { ...this.query, first: 0, rows: this.pageSize };
      const queryParams = this.convertQueryParams();
      await this.searchPageData(Object.assign(this.query, queryParams));
    },
    async handlePageIndexChange(val) {
      this.pageIndex = val;
      const startIndex = (this.pageIndex - 1) * this.pageSize;
      this.query = { ...this.query, first: startIndex, rows: this.pageSize };
      const queryParams = this.convertQueryParams();
      await this.searchPageData(Object.assign(this.query, queryParams));
    },
    async searchPageData(params) {
      this.loading = true;
      const res = await this._searchUser(params);
      if (this.httpSuccess(res)) {
        this.total = res.data?.total;
        this.pageData = res.data?.datas;
        this.loading = false;
      }
    },
    async handleSearch() {
      const queryParams = this.convertQueryParams();
      await this.searchPageData(Object.assign(this.query, queryParams));
    },
    async handleClear() {
      this.params = {};
      this.query = {};
      this.query["first"] = 0;
      this.query["rows"] = 10;
      await this.searchPageData(this.query);
    },
    handleChange(prop, val) {
      this.params[prop] = val;
    },
    convertQueryParams() {
      let result = {};
      const queryKeys = Object.keys(this.params);
      queryKeys.forEach((t) => {
        result["search[*(" + t + ")]"] = this.params[t];
      });
      return result;
    },
    handleAdd() {
      this.$router.push({ name: "add" });
    },
  },
};

/* 前台分页 */
// export default {
//   data() {
//     return {
//       pageData: [],
//       total: 0,
//       pageIndex: 1,
//       pageSize: 10,
//       loading: false,
//       query: {},
//     };
//   },
//   async created() {
//     this.loading = true;
//     const res = await this._searchUser();
//     if (this.httpSuccess(res)) {
//       this.SET_DATAS(res.data?.datas);
//       this.total = res.data?.total;
//       this.handlePageData();
//       this.loading = false;
//     }
//   },
//   computed: {
//     ...mapState("user", ["datas"]),
//   },
//   methods: {
//     ...mapActions("user", ["_searchUser"]),
//     ...mapMutations("user", ["SET_DATAS"]),
//     indexMethod(index) {
//       return index + 1;
//     },
//     handleEdit(index, row) {
//       this.$router.push({ name: "edit", params: { id: row.id } });
//     },
//     handleDelete(index, row) {
//       console.log(index, row);
//     },
//     handlePageSizeChange(val) {
//       this.pageSize = val;
//       this.handlePageData();
//     },
//     handlePageIndexChange(val) {
//       this.pageIndex = val;
//       this.handlePageData();
//     },
//     handlePageData() {
//       const startIndex = (this.pageIndex - 1) * this.pageSize;
//       const endIndex =
//         this.pageIndex * this.pageSize > this.total
//           ? this.total
//           : this.pageIndex * this.pageSize;
//       this.pageData = this.datas.slice(startIndex, endIndex);
//     },
//     async handleSearch() {
//       this.loading = true;
//       const params = this.convertQueryParams();
//       const res = await this._searchUser(params);
//       if (this.httpSuccess(res)) {
//         this.SET_DATAS(res.data?.datas);
//         this.total = res.data?.total;
//         this.handlePageData();
//         this.loading = false;
//       }
//     },
//     handleClear() {
//       this.query = {};
//       this.handleSearch();
//     },
//     handleChange(prop, val) {
//       this.query[prop] = val;
//     },
//     convertQueryParams() {
//       let params = {};
//       const queryKeys = Object.keys(this.query);
//       queryKeys.forEach((t) => {
//         params["search[*(" + t + ")]"] = this.query[t];
//       });
//       return params;
//     },
//   },
// };
</script>