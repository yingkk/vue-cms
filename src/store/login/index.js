export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async _login({ rootState }, payload) {
      return await rootState.axios.post(rootState.api.LOGIN, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
    },
    async _logout({ rootState }) {
      return await rootState.axios.post(rootState.api.LOGIN_OUT);
    },
    async _getLoginUserInfo({ rootState }) {
      return await rootState.axios.get(rootState.api.GET_LOGIN_USER_INFO);
    },
  },
};
