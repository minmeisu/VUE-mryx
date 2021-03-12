<template>
    <div class="slide-wrapper" ref="wrapp">
        <div v-for="(item, i) in sideList" 
            :key = "i"
            @click="scrollTo(i,$event)"
            :class="{'active' : index === i}"
            >
            {{ i === 0 ?  '全部' : item }}
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import tools from  '../tools/MoveTo'
// 这里先拿到获取回来的数据

export default {
    data () {
        return {
            move : false,
            index : 0,
        }
    },
    // 在计算属性中直接拿到Store里边的数据...mapState会自动引入store里边的文件
    computed : {
        ...mapState({
            // 这个是个大对象，里边的数据是以函数的方式拿到
            sideList : (state) => state.sideList,
            
        })
    },
    // 当你鼠标点击的时候进行移动距离的计算
    methods : {
       ...mapActions(['getGoodList']),
       ...mapMutations(['ResetGoodList']),
       scrollTo (i,e) {
           if (this.move) {
               return;
           }
           this.index = i;
        // 这会进行滚动移动的动画
        // 定义父容器的自身高度
        const { wrapp } = this.$refs;
        const wrapHeight = wrapp.offsetHeight /2;
        // 定义父容器距离浏览器的高度
        const wrapTop = wrapp.getBoundingClientRect().top;
        // 定义移动的目标元素的自身高度
        const itemHeight = e.target.offsetHeight / 2;
        // 定义目标元素距离浏览器的高度
        const itemTop = e.target.getBoundingClientRect().top;
        // 计算每一次移动的距离
        const moveDis = itemTop + itemHeight - wrapHeight - wrapTop;
        // console.log(moveDis)
        tools.moveTo (wrapp.scrollTop , moveDis, wrapp, "scrollTop");
        // 这里获取中间的页面数据
        this.getGoodList({type : this.sideList[i], page : 1 });
        // 这里当你点击不同type的时候，当前的清空数组
        this.ResetGoodList()
       },
        
    //    这里进行移动距离的动画
        // moveTo (start, end ) {
        //     // 定义一开始的移动的距离
        //     let dis = 0;
        //     let speed = 5;
        //     // 因为移动会有两个方向，所以要进行两种情况的处理
        //     if (end < 0) {
        //         speed *= -1;
        //     }
        //     // 动画定义在一个定时器里边
        //     const t= setInterval ( () => {
        //         dis += speed;
        //         this.$refs.wrapp.scrollTop = start + dis;
        //         if (Math.abs(dis) > Math.abs(end)) {
        //             this.$refs.wrapp.scrollTop = start + end;
        //            clearInterval(t);
        //         }
        //         // console.log(1)
        //     },2)
            

        // }
    },
    mounted () {
        this.ResetGoodList();
          this.getGoodList({type : this.sideList[0], page : 1, sort : 'all'});
        // 这里当你点击不同type的时候，当前的清空数组
        
    }
}
</script>
<style lang='less'>
    .slide-wrapper{
        position: fixed;
        left: 0px;
        bottom: 50px;
        top: 150px;
        width: 79px;
        overflow: scroll;
        background: #f8f8f8;

        div{
            height: 40px;
            width: 79px;
            text-align: center;
            line-height: 40px;
            
        }
        .active {
                color: #ff1a90;
                font-weight: bold;
                font-size: 12px;
                position: relative;
        }
        .active::before{
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
           content: '';
           width: 6px;
           height: 18px;
           background: #ff1a90;

        }
        
    }
    .slide-wrapper::-webkit-scrollbar{
        background:none;
        width: 0;
    }
</style>