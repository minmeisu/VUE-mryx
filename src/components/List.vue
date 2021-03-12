<template>
    <div class="list-wrap">
        <div class="list-header">
            <div :class="{ active : type === 'all' }" @touchend="change('all')">综合</div>
            <div :class="{ active : type === 'sale' }" @touchend="change('sale')">销量</div>
            <div class="pri" :class="{  priUp : type === 'price-up', pridown : type === 'price-down' }" @touchend="change('price')">价格</div>
        </div>
        <!-- 商品内容显示的中间内容部分 -->
        <div class="list-content">
               <van-pull-refresh v-model="isLoading" @refresh="onRefresh" head-height="80">
                   <!-- 上拉当触碰到底部的时候就会触发加载后便新数据的方法 -->
                   <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        >
                        <card-list 
                            v-for="(item, index) in goodList"
                            :key="index"
                            :image = "item.images[0]"
                            :desc = "item.desc"
                            :title = "item.title"
                            :price = "item.price"
                            :id = "item.id"
                            :num = "counterMap[item.id]"
                        ></card-list>
                    </van-list>
                </van-pull-refresh>
        </div>
    </div>
</template>

<script>

// 利用父子组件通信传值的方式，在父组件里边引入请求回来的数据,然后在父组件里边进行获取各个数据
import { mapActions, mapMutations, mapState } from 'vuex'
// 引入中间的列表内容页面
import CardList from './CardList.vue';

export default {
    name : 'List',
    components : {
        CardList,
    },
    // 将请求回来的数据放在计算属性中
    computed : {
      
        ...mapState({
            goodList : (state) => state.goodList,
            goodtype : (state) => state.type,
            total : (state) => state.total,
            sort : (state) => state.sort,
            counterMap : (state) => state.counterMap,
        }),
    },
    data () {
        return{
            // 这里代表下拉刷新已经完成标志（flase代表下拉完成）
            isLoading : false,
            // 数据加载回来的页数
            nowPage : 1,
            // 上拉里边的一些属性数据
            loading: false,
            // 这个当上拉加载完成之后变为true
            finished: false,
            type : 'all'

        };
    },
    methods : {
        ...mapActions(['getGoodList']),
        ...mapMutations(["ResetGoodList",'setsort']),
        
       async change ( val ) {
            if (val === 'price') {
                if (this.type === 'price-up') {
                    this.type ='price-down'
                }else{
                    this.type = "price-up"
                }
            }else{
                this.type = val
            };
            
            this.setsort(this.type);
            this.ResetGoodList();
            await this.getGoodList({ type : this.goodtype, page : this.nowPage, sort : this.type})
            // this.onRefresh()
            // 当你点击的时候就刷新
            // this.ResetGoodList()
            //  await this.getGoodList ({type : this.goodtype,page: this.nowPage,sort : this.type})
            // 点击进行排序
            console.log(this.counterMap)
        },
        //    上拉加载的函数
        onLoad () {
           setTimeout ( () => {
                // 如果加载完成就直接返回
            if (this.finished) {
                return;
            };
            // 上拉的话，请求的数据是在原来的基础上+1的
            this.nowPage += 1;
            // this.loading = true;
            // 继续请求数据
            this.getGoodList ({ type : this.goodtype, page : this.nowPage}).then ( () => {
                // 这是请求成功回来之后的数据
                // this.loading = false;
                // 如果请求回来的数据长度与仓库里边数据总长度一样则表示加载完成
                if (this.goodList.length >= this.total) {
                    this.loading = false;
                    console.log(this.goodList.length)
                }else {
                    this.finished = true;
                     console.log(this.goodList.length, this.total)
                }
            })
           },1000)
        },
    //下拉刷新的函数
        onRefresh () {
            // 下拉的时候先将之前的数据清空以防叠加
            // this.ResetGoodList();
           
            // 将加载回来的数据的页数变为最初的0
            // this.nowPage = 1;
            // this.ResetGoodList ();
             // 然后加载没有完成
            this.Loading = true;
            this.finished = false;
            this.isLoading = true;
            // this.getGoodList ({ type : this.type, page : 1});
            this.onLoad();
            this.getGoodList ({ page : 1, sort : this.sort});
            this.isLoading = false;
        

        },
    
    
       
    }

}
</script>

<style lang='less'>
    .list-wrap{
        position: fixed;
        width: calc(100% - 80px);
        top: 150px;
        right: 0;
        bottom: 50px;
        border-top: 1px solid #eee;
        .list-header{
            position: absolute;
            top: 0;
            display: flex;
            justify-content: flex-end;
            width: 280px;
            height: 25px;
            line-height: 25px;
            div{
                width: 50px;
                color: #cecece;
                font-size: 12px;
                text-align: center;
                
            }
            .pri::before{
                    content: "";
                    position: absolute;
                    top : 4px;
                    right: 0;
                    border: 4px solid transparent;
                    border-bottom-color:#aaa ;
            }
            .pri::after{
                content: "";
                position: absolute;
                bottom: 4px;
                right: 0;
                border:4px solid transparent;
                border-top-color: #aaa;
            }
            .priUp::before{
                border-bottom-color: #ff1a90;
            }
            .pridown::after{
                border-top-color: #ff1a90 ;
            }
            .active, .priUp, .pridown {
                color: #ff1a90;
                font-weight: bold;
            }
        }
        .list-content{
            position: absolute;
            top: 25px;
            height: 100%;
            overflow: scroll;
        }
        .list-content::-webkit-scrollbar{
            background: none;
            width: 0;
        }
    }
</style>