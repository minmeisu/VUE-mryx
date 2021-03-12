<template>
    <div class="Search-wrapper">
        <div class="search-head">
            <van-icon name="arrow-left" @click="$router.goBack()" class="arr-left"/>
            <van-search
                class="search-content"
                v-model="value"
                show-action
                :placeholder="place"
                @search="onSearch"
                @cancel="onCancel"
                @input = "input"
                @focus="focus"
            >
            <!-- 将输入框里边的取消改为搜索 -->
            <template #action v-if="showList">
                <div @click="onSearch(value)">搜索</div>
            </template>
            <template #action v-else>
                <van-icon name="shopping-cart-o" :badge="badge"/>
            </template>
            </van-search>
        </div>
        <!-- 这里是模糊搜索出来的数据 -->
        <div class="like-search" v-if="likeList.length && showList">
            <van-list>
                <van-cell v-for="item in likeList" :key="item" :title="item" >
                    <!-- 这里装的是模糊搜索出来的数据 -->
                    <template #title>
                        <!-- 这里#title是将显示的数据去掉一个相同的title标题 -->
                        <span class="custom-title" v-html="formatHTML(item)" @click = 'onSearch(item)'></span>
                    </template>
                </van-cell>
            </van-list>
        </div>
        <!-- 当点击模糊搜索里边的内容时，进行内容的展示 -->
        <div v-if="!showList" class="good-card">
            <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        >
                        <card-list 
                            v-for="(item, index) in list"
                            :key="index"
                            :image = "item.images[0]"
                            :desc = "item.desc"
                            :title = "item.title"
                            :price = "item.price"
                            :id = "item.id"
                            :num = "counterMap[item.id]"
                        ></card-list>
                </van-list>
        </div>
        <!-- 展示搜索中的历史记录 -->
        <!-- 这里当他输入框不能输入搜索出东西的时候才让它显示出来,并且这里边进行了
             父组件进行传值给子组件
        -->
        <div class="history" v-if="likeList.length <= 0 && showList" >
            <History :searchList="searchList" @search="onSearch"></History>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 引入中间内容显示的组件
import CardList from '../components/CardList.vue'; 
// 引入搜索历史的页面
import History from '../components/History.vue';

export default {
    name : 'Search',
    components : {
        CardList,
        History
    },
    computed : {
        ...mapState({
            counterMap : (state) => state.counterMap,
        }),
        badge() {
        const l = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
        if (l > 99) {
            return '99+';
        }
        return l;
    },
    },
    data () {
        return {
            place : '芒果10块2斤',
            value : '',
            page : 1,
            size : 7,
            // 这个是搜索里边请求回来的数据里边的数组
            list : [],
            // 这是模糊搜索出来的数据
            likeList : [],
            // 这是模糊搜索里边定时器的变量
            timer : null,
            // 模糊搜索展示的条件之一
            showList : true,
            // 当你点击模糊搜索的内容时进行点击进行数据请求
            page : 1,
            size : 5,
            finished : true,
            loading : false,
            // 搜索里边的数据放在数组里边
            showList : true,
            // 搜索出来的数据的数组
            searchList : []

        }
    },
    methods : {
        // 这是搜索输入框中请求回来的数据
        onSearch( val ) {
            //当你在点击模糊搜索时,输入框里边的内容为模糊搜索点击的
            if (val) {
                this.value = val;
            }
            this.finished = false;
            console.log('一次')
            // 之后下边的模糊搜索列表就清空了
            // this.likeList = [];
            this.likeList = [];
            // 当你再输入框中输入框没有内容时就是默认的
            if (this.value === "") {
                this.value = this.place;
            }
            // this.finished = false;
            this.list = [];
            this.page = 1;
            // 当你输入内容了，就进行一个搜索数据的请求
            this.$api.Search(this.value, this.page, this.size).then ( (data)=> {
                console.log(data,data.list)
                // 将数据返回给data里边的数组中
                this.list = [...this.list, ...data.list];
                this.showList = false;
                this.finished = true;
                // console.log(this.list)
                // console.log("2次")

            });
            // console.log("3次")
            this.onLoad();
            // 输入框输入内容进行搜索的历史数据的处理
            const searchResult = this.searchList.find ( (item) => item.value === this.value);
            // console.log(searchResult)
            if (searchResult) {
                // 如果有数据的话就是进行数据里边的排序
                searchResult.time = new Date().getTime();
                this.searchResult.sort( (a,b) => b.time - a.time);
            }else{
                // 历史搜索的数据进行添加数组里边的数据,并且是按照时间进行数据的存储
                this.searchList.unshift({value : this.value, time : new Date().getTime()});
                // console.log(this.searchList)
                // 当里边的数据长度超过了一定的时候酒进行删除数据
                if (this.searchList.length >= 11) {
                    this.searchList.pop();
                }
            }
            // 然后将历史数据进行本地存储
            localStorage.setItem( 'searchList', JSON.stringify(this.searchList))
            
        },
        // 这是搜索框中模糊展示数据的函数
        input () {
            // 进行判断，当输入框中没有内容时模糊请求回来的数据就为空
            if (this.value === '') {
                this.likeList = [];
                return;
            }
            // 定时器进行模糊搜索数据的请求
            this.$api.likeSearch(this.value).then ( (data) => {
                this.likeList = data.result;
                // console.log(this.likeList)
            });
            
        },
        // 这里是模糊搜索里边展示内容的一个定义
        formatHTML (value) {
             const reg = new RegExp(this.value, 'g');
             return value.replace(reg, this.value.fontcolor('red'));
        },
        // 当鼠标聚焦在搜索框中,下边不进行展示
        focus () {
            this.showList = true;
            // console.log(1)
        },
        // 当你点击模糊搜索里边的列表时进行的一个数据加载,进行判断数据是否已经全部加载完成
        onLoad () {
            this.page += 1;
            this.$api.Search(this.value, this.page, this.size).then ( (data) => {
                this.length = data.total;
                // this.loading = false;
                this.list = [...this.list,...data.list]
                console.log("4次")
                this.loading = false;
                // 数据全部加载完成之后
                if (this.list.length >= this.total) {
                    this.finished = true;
                    // this.finished = true
                    console.log('5次')
                }
            })
        },
        onCancel () {
        },
    },
    // 当页面刚进来的时候酒进行数据页面里边进行挂载渲染到页面
    created () {
        this.searchList = JSON.parse(localStorage.getItem('searchList') || []);
    }
}
</script>

<style lang="less" >
    .Search-wrapper{
        width: 100%;
        height: 100vh;
        background: #fff;
        z-index: 1000;
        .search-head{
            display: flex;
            width: 345px;
            background: #fff;
            align-items: center;
            margin: 0 auto;
            position: fixed;
            left: 0;
            top: 0;
             z-index: 100;
            .arrow-left{
                font-size: 22px;
            }
            .search-content{
                flex: 1;
            }
        }
        .like-search{
            position: fixed;
            top: 50px;
            left : 15px;
            text-align: left;
           
        }
        .good-card{
            // position: relative;
            width: 345px;
            margin: 48px auto 0;
            background: #fff;

        }
    }
</style>