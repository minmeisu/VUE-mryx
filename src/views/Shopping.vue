<template>
    <div class="shopping">
        <!-- 上边的导航 -->
        <div class="top-nav">
            <van-nav-bar
                title="购物车"
                right-text="删除"
                @click-right="del"
            />
        </div>
        <!-- 这里是中间购物车里边显示的内容 -->
        <div class="card-list" v-if="this.list.length !== 0">
      <van-checkbox-group v-model="result"   ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <card-list :id="item.id"
                     :title="item.title"
                     :desc="item.desc"
                    :priceOff="item.priceOff"
                    :price="item.price"
                    :image="item.images[0]"
                    :num="counterMap[item.id]"
                    :tags="item.tags"
          >

          </card-list>
        </div>
      </van-checkbox-group>
    </div>
        <!-- 这是当购物车清空的时候进行显示的图片 -->
        <!-- <div class="card-none">
            <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" alt="">
        </div> -->
        <!-- 下边的进行提交订单的底部 -->
        <!-- <van-submit-bar :price="allmoney" :button-text="`去结算(${totalnum})`" @submit="onSubmit">
            <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar> -->
        <van-submit-bar :price="allmoney" :button-text="`结算（${totalnum}）`" @submit="onSubmit">
            <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
import CardList from '../components/CardList.vue';
import { mapMutations, mapState } from 'vuex'
import { Toast,Dialog  } from 'vant';
// import CardList from '../components/CardList.vue';
export default {
    components : {
        CardList,
    },
    data () {
        return {
            list : [],
            name : '',
            result : [],
            checked : false,
        }
    },
    // 拿到vuex里边的数据
    computed : {
        // 购物车里边点击了多少个的数据
        ...mapState({
            counterMap : (state) => state.counterMap,
        }),
        // 进行判断并且计算全部订单数有多少个并且渲染上去
        totalnum () {
            const resArr = this.list.filter( (item) => this.result.includes(item.id));
            console.log(resArr)
            // console.log(this.result, this.list),这里的prev是指数组中的前一项，next是指数组中的后一项,累加的结果是根据后面一项的结果进行相加的
            const res = resArr.reduce( (prev, next) => prev + (this.counterMap[next.id]), 0)
            // console.log(res)
            return res;
        },
        allmoney () {
            const resArr = this.list.filter( (item) => this.result.includes(item.id));
            const res = resArr.reduce( (prev, next) => {
                return Math.round( (this.counterMap[next.id] || 0) * next.price * 100 + prev)
            }, 0);
            // console.log(res)
            return res;
        }

    },
    methods : {
        ...mapMutations(["storageChange"]),
        // 购车里边进行删除所选产品的方法
        async del () {
            // 当你没有选中某种产品的情况下点击的情况
            if (this.result.length === 0) {
                Toast('你没有选中商品');
                // return;
            }
            try {
                await Dialog.confirm({
                message: '您是否删除已选中的商品',
                });
                // this.storageChange();
                console.log(this.result)
            //     console.log(this.result.forEach( (id,item) => {
            //         console.log(id,item)
            //     }))
            //   console.log(  this.list.filter(id));
               console.log( this.counterMap)
                this.result.forEach( (id) => {
                    console.log(1111)
                    this.storageChange({id, value : -this.counterMap[id]});
                    // console.log(this.storageChange({id}))
                    this.list = this.list.filter( (item) => !this.result.includes(item.id),);
                    console.log(this.list)
                });
            }catch (err){
                console.log(err)
                Toast('用户点击了取消')
            }
        },
        // 进行购物车里边存储到的数据进行请求
         getAllData () {
            const result = Object.keys(this.counterMap);
            this.$api.getGoodsByIds(result.join()).then ( (data) => {
                // console.log(data)
                this.list = data.list;
            })
            
        },
        checkAll () {
            // console.log(checked)
            if (this.checked) {
                 this.$refs.checkboxGroup.toggleAll(true);
            }else {
                 this.$refs.checkboxGroup.toggleAll(false);
            }
           
            console.log(this.checked)
            
        },
        onSubmit() {
    },
    },
    // 进行监听当你全选中点击了出现不是全选的情况
    watch : {
        // 当每次监听到result里边的值发生变化时，就执行函数
        result () {
            if (this.result.length === this.list.length) {
                this.checked = true;
            }else{
                this.checked = false;
            }
        },
        counterMap () {
            this.getAllData()
        }

    },
    created () {
        this.getAllData()
    }
}
</script>

<style lang = "less">
.shopping{
     background: #eee;
     min-height: 100vh;
    .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
    .van-submit-bar {
        bottom: 50px;
    }

    .card-list{
        width : 100%;
        height: 100%;
        position: absolute;
        /* overflow: scroll; */
        top : 46px;
        padding-bottom: 100px;
        /* padding: 10px 10px 100px 10px; */
        background: #fff;
        .card-box{
            display: flex;
            justify-content: center;
        }
        .check{
            margin-right : 10px;
            flex-shrink: 0;
        }
        

    }
    .card-list::-webkit-scrollbar{
            color : none;
            width: 0;
            height: 0;
    }
}

</style>