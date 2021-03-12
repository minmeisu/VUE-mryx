// 这里主要是产生axios请求
// 引入axios
import Axios from 'axios';
// 同时把路径拿过来
import baseURL, { URLs } from './URLS';

const appkey = 'dd_1597654682810';
// 先创建一个请求实例
const request = Axios.create ({
    baseURL,//基本路径
    params : {
        appkey,
    },
    
})
// 这里进行请求回来的数据拦截，主要是为了拿取数据的方便
request.interceptors.response.use((value) => value.data);
// 写接口(看接口里边需要的参数是什么)
// 获取侧边栏的数据
const getSideList = (type) => request.get (
    URLs.getSide,//接着上一个的及v胡路径传进去的其他路径
    { params : {type} },//接着上一个默认参数继续传入的其他参数
);
// 获取中间列表内容的接口
const getGoodsList = (type, page, size, sort ) =>request.get(
    URLs.getGoodsList,
    { params : {type , page, size, sort}}
)
// 搜索中的数据
const Search = (type, page, size) => request.get(
    URLs.search,
    { params : { type, page, size }  }
)
// 搜索中的模糊搜索数据

const likeSearch = (likeValue) => request.get(
    URLs.likeSearch,
    { params : { likeValue }}
)
// 购物车页面显示产品的接口
const getGoodsByIds = (value) => request.get(
    URLs.getGoodsByIds,
    { params: { value } },
)

//导出接口
export default {
    getSideList,
    getGoodsList,
    Search,
    likeSearch,
    getGoodsByIds
}

// 这些接口拿到的数据是要给其他组件来使用的，所以要在store里边进行数据的获取处理
