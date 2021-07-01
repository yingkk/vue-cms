export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async _getRoles({ rootState }, params) {
      return await rootState.axios.get(rootState.api.ROLES, {
        params: { ...params, orderBy: "createtime desc" },
      });
    },
  },
};
