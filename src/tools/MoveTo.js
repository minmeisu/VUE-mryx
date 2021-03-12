function moveTo (start, end, dom ,prop ) {
    // 定义一开始的移动的距离
    let dis = 0;
    let speed = 5;
    // 因为移动会有两个方向，所以要进行两种情况的处理
    if (end < 0) {
        speed *= -1;
    }
    // 动画定义在一个定时器里边
    const t= setInterval ( () => {
        dis += speed;
        dom[prop] = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
            dom[prop] = start + end;
           clearInterval(t);
        }
    },2)
    

};

export default { moveTo }