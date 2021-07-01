import defaultAxios from "axios";
const isDev = process.env.NODE_ENV === "development";

const instance = defaultAxios.create({
  baseURL: isDev ? "/api" : process.env.baseURL,
  withCredentials: true,
});

defaultAxios.defaults.withCredentials = true;

instance.interceptors.request.use(
  (config) => {
    // 让每个请求携带token
    if (localStorage.getItem("TOKEN")) {
      config.headers["Authorization"] = localStorage.getItem("TOKEN");
    }
    // get请求参数key含有[]，需要转义
    let url = config.url;
    if (config.method === "get" && config.params) {
      url += "?";
      let keys = Object.keys(config.params);
      for (let key of keys) {
        url += `${encodeURIComponent(key)}=${config.params[key]}&`;
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
    }
    config.url = url;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
