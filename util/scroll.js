(function () {
    var allCache = {},
        cacheIndex = 1,
        startTime,
        container,
        startPointY,
        cache,
        utils = {
            addEvent: function (dom, type, handler) {
                utils.each(type.split(","), function (type) {
                    dom.addEventListener(type, handler);
                });
            },
            each: function (obj, callback) {
                for (var key in obj) {
                    callback(obj[key]);
                }
            },
            setScrollY: function (dom, y) {
                dom.style.webkitTransform = dom.style.transform = "translate3d(0, " + y + "px, 0)";
            },
            springbackYAnim: function (dom, y, endY, meCache) {//回弹动画的处理程序
                var speed = (y - endY) / 8;

                _anim();

                function _anim() {
                    speed -= speed / 9;

                    y -= speed;

                    if (Math.abs(Math.abs(y) - Math.abs(endY)) < 0.8) {
                        y = endY;
                        meCache.animFrameID = undefined;
                    }

                    utils.setScrollY(dom, y);
                    meCache.scrollY = y;

                    if (y != endY)
                        meCache.animFrameID = utils.animFrame(_anim);
                    else if (endY > 0 || endY < meCache.maxScroll)
                        utils.springbackYAnim(dom, endY, endY > 0 ? 0 : meCache.maxScroll, meCache);
                }
            },
            scrollYAnim: function (dom, y, speed, meCache) {//正常滚动动画的处理程序
                _anim();

                function _anim() {
                    speed -= speed / 30;

                    y -= speed;

                    var isSpringback = false;

                    if (y > 0 || y < meCache.maxScroll) {//判断是否到顶部或底部
                        if (Math.abs(speed) > 1) {//如果速度还大于1则继续滚动并调用回弹程序
                            var endY = y - speed * 5;

                            if (speed < 0 && endY > 40)
                                endY = 40;
                            else if (speed > 0 && endY < meCache.maxScroll - 40)
                                endY = meCache.maxScroll - 40;

                            utils.springbackYAnim(dom, y, endY, meCache);
                        }

                        isSpringback = true;
                    }

                    utils.setScrollY(dom, y);
                    meCache.scrollY = y;

                    if (!isSpringback && Math.abs(speed) > 0.1)//如果没有回弹且速度还大于0.1则继续滚动。
                        meCache.animFrameID = utils.animFrame(_anim);
                }
            },
            init: function (dom, meCacheID) {//初始化cache的程序
                var meCache = allCache[meCacheID];

                if (!meCache) {//如果当前实例的cache不存在，则绑定事件并初始化cache
                    utils.addEvent(dom.parentElement, "touchstart", utils.touchHandler);
                    meCache = allCache[meCacheID] = {};
                }

                meCache.containerHeight = dom.parentNode.offsetHeight;
                meCache.height = dom.offsetHeight;
                meCache.maxScroll = meCache.containerHeight - meCache.height;
                meCache.scrollY = meCache.scrollY || 0;

                meCache.maxScroll = meCache.maxScroll > 0 ? 0 : meCache.maxScroll;

                if (meCache.scrollY < meCache.maxScroll)//当用户手动调用实例的refresh方法时重新判断滚动值是否还在范围内。
                    utils.setScrollY(dom, meCache.maxScroll);
            },
            touchHandler: function (e) {//用户手指操作处理程序。
                switch (e.type) {
                    case "touchstart":
                        startPointY = e.changedTouches[0].pageY;
                        startTime = (new Date()).getTime();
                        container = this.children[0];
                        cache = allCache[container.getAttribute("data-nt-scroll") || container.id];

                        if (cache.animFrameID) {
                            utils.cancelAnimFrame(cache.animFrameID);
                            cache.animFrameID = undefined;
                        }
                        break;
                    case "touchmove":
                        if (startPointY !== undefined) {
                            if (e.changedTouches[0].pageY <= 2)//如果移动到距离顶端屏幕2像素的地方自动释放本次滚动（有些移动端移出顶部就不触发事件了）
                                utils.touchEndHandler(e);
                            else
                                utils.scrollYHandle(e);
                        }
                        break;
                    default:
                        if (startPointY !== undefined)
                            utils.touchEndHandler(e);
                        break;
                }

                e.preventDefault();
            },
            touchEndHandler: function (e) {
                var y = endY = utils.scrollYHandle(e);

                if (y > 0 || cache.height <= cache.containerHeight) {
                    endY = 0;
                } else if (y < cache.maxScroll) {
                    endY = cache.maxScroll;
                } else {
                    var currentTime = (new Date()).getTime(),
                        speed = (cache.scrollY - y) / (currentTime - startTime) * 10;

                    if (Math.abs(speed) > 5)//如果速度大于5则开始动画滚动
                        utils.scrollYAnim(container, y, speed, cache);
                }

                cache.scrollY = y;

                if (endY != y)//如果当前的滚动值和最终想要到达的滚动值不一样，则开始回弹动画
                    utils.springbackYAnim(container, y, endY, cache);

                startPointY = startTime = container = cache = undefined;//清除一些临时变量的控空间
            },
            scrollYHandle: function (e) {//正常滚动的处理程序
                var offsetY = e.changedTouches[0].pageY - startPointY;

                if (cache.height <= cache.containerHeight) {//如果容器高度大于内容高度
                    offsetY = offsetY / 3;//则滚动值等于偏离值的三分之一，就是顶部往下滑会有点粘滞感的样子
                } else if (offsetY + cache.scrollY > 0) {//偏移值加已经滚动了的值大于0则代表滚动已经超出顶部了
                    if (offsetY > 0) {
                        if (cache.scrollY >= 0)
                            offsetY = cache.scrollY + offsetY / 3;
                        else
                            offsetY = (cache.scrollY + offsetY) / 3;
                    } else {
                        offsetY = cache.scrollY + offsetY;
                    }
                } else if (offsetY + cache.scrollY < cache.maxScroll) {//和上面的判断一样，只不过这里是判断是否到底部
                    if (offsetY < 0) {
                        if (cache.scrollY <= cache.maxScroll)
                            offsetY = cache.scrollY + offsetY / 3;
                        else
                            offsetY = cache.maxScroll + (cache.scrollY + offsetY - cache.maxScroll) / 3;
                    } else {
                        offsetY = cache.scrollY + offsetY;
                    }
                } else {
                    offsetY += cache.scrollY;
                }

                utils.setScrollY(container, offsetY);//设置好滚动高度

                return offsetY;//返回当前滚动高度
            },
            attr: function (dom, name, val) {
                if (val === undefined)
                    return dom.getAttribute(name);

                dom.setAttribute(name, val);
            },
            animFrame: function (callback) {
                var animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
                return animFrame(callback);
            },
            cancelAnimFrame: function (animFrameID) {
                var cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
                cancelAnimFrame(animFrameID);
            },
            initCacheID: function (dom) {//初始化插件的cacheID程序
                var meCacheID = utils.attr(dom, "data-nt-scroll");
                if (!meCacheID) {
                    meCacheID = "ntScroll" + cacheIndex++;
                    utils.attr(dom, "data-nt-scroll", meCacheID);
                }

                return meCacheID;
            }
        };

    window.ntScroll = function (dom) {//插件类
        var me = this,
            meCacheID;

        if (typeof dom === "string")//如果传进来的是字符串则认为该字符串是dom的id，否则直接认为就是dom对象。
            dom = document.getElementById(dom);

        meCacheID = utils.initCacheID(dom);//初始化实例的cacheID值。

        me.refresh = function () {//设置对外的刷新函数。
            utils.init(dom, meCacheID);
        };

        if (!allCache[meCacheID])//如果是第一次初始化该实例，则手动初始化一次。
            me.refresh();
    };

    utils.addEvent(window, "touchmove,touchend,touchcancel", utils.touchHandler);//自动绑定window的几个事件。
})();  