<template>
    <div class="good-wrap">
           <div class="img">
               <img :src="image" ref="img">
           </div>
           <div class="good-right">
               <div class="title">{{ title }}</div>
               <div class="desc">{{ desc }}</div>
               <div class="post-time">24小时发货</div>
               <div class="price">￥{{ price }}</div>
           </div>
           <div class="counter">
               <div @click="counter(id, -1)" v-if =" num">
                   <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" alt="">
               </div>
               <div class="num" v-if =" num">{{ num }}</div>
               <div @click="counter(id, 1)">
                   <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png" alt="">
               </div>
           </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Animate from '../tools/Animate/animate'

export default {
    name : 'CardList',
    props: ['image', 'desc', 'title', 'price', 'id', 'num', 'thumb','priceOff'],
    computed : {
        ...mapState({
            counterMap : (state) => state.counterMap
        })
    },
    methods : {
        ...mapMutations(["storageChange"]),
        counter(id, num) {
            this.storageChange({ id, value : num}) ;
            // console.log(this.counterMap)
            // 获取图片对于浏览器窗口的位置
            const { left, top } = this.$refs.img.getBoundingClientRect();
            // 获取最终到达的元素相对于浏览器窗口的位置
            const { left : endX, top : endY } = document.getElementById('car').getBoundingClientRect();
            // 获取图片元素自身的宽高,这个是给缩放的时候使用的
            const { width, height } = getComputedStyle(this.$refs.img, null);
            // 引入动画
            Animate ({
                startX: left,
                startY: top,
                endX,
                endY,
                src: this.$refs.img.src,
                width,
                height,
            })
        }
    }
}
</script>

<style lang="less">
    .good-wrap{
        position: relative;
        height: 100px;
        width: 296px;
        display: flex;
        padding-bottom: 20px;
        // padding: 20px;
        overflow: hidden;
        .img{
            width: 90px;
            margin-right: 20px;
            img{
                width: 90px;
                height: 90px;
            }
        }
        .good-right{
            flex: 1;
            margin-left: 10px;
            margin-bottom: 5px;
            .title{
                margin-top : 5px;
                margin-bottom: 5px;
                width: 179px;
                font-size: 13px;
            }
            .desc{
                font-size: 11px;
                color: #aaa;
            }
            .post-time{
                border: 1px solid #aaa;
                border-radius: 3px;
                width: 100px;
                height: 25px;
                line-height: 25px;
                margin-top: 4px;
                margin-bottom: 4px;
                text-align: center;
                color: #aaa;
            }
            .price{
                color : #ff1a90;
                font-size: 14px;

            }
        }
        .counter{
            position: absolute;
            bottom: 12px;
            right: 15px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            > div:not(.num){
                width: 16px;
                height: 16px;
                img{
                    width: 100%;
                }
            }
            .num{
                padding: 0 5px;
                height: 22px;
                line-height: 22px;
            }
        }

    }
</style>