export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async _getDepts({ rootState }, params) {
      return await rootState.axios.get(rootState.api.DEPTS, {
        params: { ...params, orderBy: "createtime desc" },
      });
    },
  },
};
