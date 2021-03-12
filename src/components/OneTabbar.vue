<template>
    <div class="onenav" ref="oneTab">
        <div v-for=" (item,i) in menuList" :key="item.i" class="item-wrapper"
            @click="scrollTo(i,$event)"
          
        >
            <div class="img-wrapper" :class="{ 'active' : index === i}">
              <img :src="item.imgURL">
            </div>
            <div class="title" :class="{ 'active' : index === i}">{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
// 导入侧边栏的数据
import {  mapActions, mapMutations } from 'vuex';
import tools from '../tools/MoveTo'
export default {
    name : 'OneTabbar',
    data () {
        return {
            index : 0,
            // 当你点击导航栏里边东西的时候，滚动条进行左右的移动，通过move来判断进行哪一个函数的执行
            move : false,
            menuList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
        }
    },
    methods : {
        //在这个方法里边鼠标进行移动或者点击的时候，就进行活得相应的二级导航的数据
        ...mapActions(['getSideList']),
        // 这里进行点击，商品列表的内容是被清空的
        ...mapMutations(['ResetGoodList']),
        // 这里定义一个当你点击时滚动条进行一个移动的过程
        scrollTo (i,e) {//这里e是指正在移动的元素
            // 这里当你正在手动移动的时候就不用进行下边的移动效果动果
            if ( this.move ) {
                return;
            }
            this.index = i;
            // 假如当前你点击的内容在后边，你此时要点击到前边的情况，计算整个父容器的中心点到小容器的中心点就是要计算的滚动条滚动的距离
            // 定义元素到父容器，这里也是相对与浏览器窗口左边的距离
            const itemLeft = e.target.getBoundingClientRect().left;
            // 定义元素自己的宽度，以便求出它的中心点一半的距离
            const itemWidth = e.target.offsetWidth / 2;
            // 定义父元素的一班的距离
            const { oneTab } = this.$refs;
            console.log(this.$refs)
            const wrapperWidth = oneTab.offsetWidth / 2;
            // 计算移动的距离
            const distance = itemLeft - wrapperWidth + itemWidth;
            // 这里一开始就要调动移动的动画函数
            tools.moveTo (oneTab.scrollLeft, distance, oneTab, "scrollLeft");
            // 这里获取侧边栏的数据方法的调用
            this.getSideList(this.menuList[i].title);
            // 这里进行商品列表内容的清空
            this.ResetGoodList();
        },
        // 这里同时给移动的时候定义一个动画效果
        // 里边的参数是元素一开始的距离，和它要移动的距离
        // moveTo(start, end) {
        //     // 这里要做的是计算出元素整个的位置的变化，直接让元素到哪一个点位置，也就是一开始的位置到浏览器窗口的距离与dis之间的计算得出的
        //     // 定义移动的速度
        //     let speed = 10;
        //     // 一开始dis移动的距离为0；
        //     let dis = 0;
        //     // 按照上边的dis计算，因为有两个方向的运动，所以速度是有正负的
        //     if (end < 0) {
        //         speed *= -1;//让它怎么着都是变成正数运算
        //     }
        //     const t = setInterval ( () => {
        //         dis += speed;
        //         this.$refs.oneTab.scrollLeft = start + dis;
        //     // 如果dis比最终的end还要大，也可以理解end为你要移动方向并且是到终点的距离
        //     if (Math.abs(dis) > Math.abs(end)) {
        //         this.$refs.oneTab.scrollLeft = start + end;
        //         clearInterval(t)
        //     }
            
        //     }, 2)
        // },
        
    },
    
    // 在一开始的时候，刚挂载就要有有第一个的数据
    mounted () {
      this.getSideList(this.menuList[0].title);
    }  
}
</script>

<style lang="less">
    .onenav{
        display: flex;
        width: 375px;
        // height: 104px;
        overflow: scroll;
        .item-wrapper{
            width:50px;
            height: 70px;
            margin: 20px 10px;
            .img-wrapper{
                
                width: 50px;
                height: 50px;
                img{
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: #fff;
                    align-self: center;
                }
            }
            .title{
                font-size: 12px;
                text-align: center;
            }
           .img-wrapper.active{
                 border-color: #d13193;
                display: flex;
                justify-content: center;
                align-content: center;
                // border-width: 2px;
                border-radius: 23px;
                border-style: solid;
                
             }
              .title.active{
                   font-weight: bold;
                background: #d13193;
                color: #fff;
              }
            
        }
    }
    // 去掉滚动条的操作
     .onenav::-webkit-scrollbar{
         width: 0;
         background: none;
     }
</style>