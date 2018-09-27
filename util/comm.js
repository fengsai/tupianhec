if (!window.G$)
    G$ = function (e) {
        var v = document.querySelectorAll(e);
        if (v.length == 0)
            return null;
        if (v.length == 1)
            return v[0];
        return v;
    };
G$.sweetHttp = "http://test.sweetmartcn.com/";//192.168.31.14/
//G$.sweetHttp="https://qrcrm.masterkong.com.cn/";//正式

if (navigator.userAgent.indexOf("Mobile") != -1)
    G$.isMobile = true;
if (navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Android") != -1)
    G$.isPad = true;
if (navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("iPhone") != -1)
    G$.isIos = true;
if (navigator.userAgent.toLowerCase().indexOf("android") != -1)
    G$.isAndroid = true;
if (navigator.userAgent.toLowerCase().slice(navigator.userAgent.toLowerCase().indexOf("android"), 34) === "android 4.3") {

    G$.a4 = true;
}
G$.isIE = !!document.all;
G$.isFF = !document.all;
G$.isWebkit = (navigator.userAgent.indexOf("KHTML") != -1);
G$.isOpera = (navigator.userAgent.indexOf('Opera') != -1);
if (G$.isOpera)
    G$.pre = '-o-';
if (G$.isFF)
    G$.pre = '-Moz-';
if (G$.isWebkit)
    G$.pre = '-webkit-';
if (G$.isIE)
    G$.pre = '-ms-';

(function (G$) {
    var touch = (G$.isMobile || G$.isPad || window.ontouchstart);

    G$.down = touch ? "touchstart" : "mousedown";
    G$.up = touch ? "touchend" : "mouseup";
    G$.move = touch ? "touchmove" : "mousemove";
    G$.cancel = touch ? "touchcancel" : "";
    G$.resize = touch ? "orientationchange" : "resize";
    G$.ondown = touch ? "ontouchstart" : "onmousedown";
    G$.onup = touch ? "ontouchend" : "onmouseup";
    G$.onmove = touch ? "ontouchmove" : "onmousemove";
    G$.oncancel = touch ? "ontouchcancel" : "onmousemove";
    G$.onresize = touch ? "onorientationchange" : "onresize";
})(G$);

G$.nullgl=function(e){

    if(e=="null"||e==null){
        return 0;
    }else{
        return e;
    }
}

G$.getPageX = function (e) {
    return e.touches ? e.touches[0].pageX : e.clientX;
};
G$.getPageY = function (e) {
    return e.touches ? e.touches[0].pageY : e.clientY;
};
G$.isObj = function (obj) {
    if (!obj)
        return false;
    return (obj instanceof Object);
};

G$.changeColor = function (e, src, st) {
    if (st) {
        if (e && src)
            e.style[st] = src;
        return
    }
    if (e && src) {

        e.style.background = src;
    }
    e.webkitTransition = "all ease-in 0.5s";
};
G$.isString = function (obj) {
    if (!obj)
        return false;
    return (typeof obj == "string");
};
G$.CreatBody = function (obj1) {
    var obj = obj1 || {};
    var _default = {
        id: "",
        class: "G_body"
    };

    this.id = G$.isString(obj.id) ? obj.id : _default.id;
    this.class = G$.isString(obj.class) ? obj.class : _default.class;
};

G$.CreatBody.prototype = {
    getHtml: function (s) {
        var _html = "<div class='" + this.class + "'>";
        _html += s ? s : "";
        _html += "</div>";
        return _html;
    }
};
var param_sign_key="CRltJmIwUJjk0wMm7h1tY2lQg6iSv1dg";
G$.html = function (obj1) {


    var obj = G$.isObj(obj1) ? obj1 : {};

    //
    var div = document.createElement(obj.ele ? obj.ele : "div");

    div.id = obj.id ? obj.id : null;
    div.className = obj.class ? obj.class : null;
    div.innerHTML = obj.html ? obj.html : "";
    if (G$.isObj(obj.style))
        for (var v in obj.style) {
            div.style[v] = obj.style[v];
        }

    return div;
};

G$.body = function (e) {
    if (typeof e == "string") {
        if (G$.body[e])
            return G$.body[e];
        return null;
    }
    if (e instanceof Object) {

        if (!(typeof e.id == "string") || G$.body[e.id] || e.id == "") {
            console.log("创建body失败，" + e.id + "无效");
            return null;
        }
        G$.body[e.id] = new G$.CreatBody(e);
        return G$.body[e.id];
    }
    return null;

};
//变色
G$.changeBg = function (e, s) {
    if (s) {

        e.style.backgroundColor = s;
    } else {
        e.style.backgroundColor = "";
    }
    e.webkitTransition = "all ease-in 0.5s";

}

G$.ajax = function (data, sucessBack, errorBack) {
    var _data = data || "";

    var _dataJson = _data ? data["reqData"] : "";

    var _type = _data ? data["type"] : "";

    var _http = _data ? data["httpType"] : "";
    $.ajax({
        type: _type,
        url: _http,
        data: _dataJson,
        dataType: 'json',
        timeout: 15000,
        success: function (data) {
            sucessBack(data);
        },
        error: function (xhr, type) {
            errorBack(type);
        }
    });


};

//data数据
G$.data = function (e, s) {
    return e["dataset"][s];
}

G$.localSet = function (s, s1) {
    window.localStorage.setItem(s,s1);

}

G$.localGet = function (s) {
    return window.localStorage.getItem(s);
}

function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function Mparams(obj) {

    var keys=Object.keys(obj.reqData);
    var i=0,len=keys.length;

    var strs="";

    keys.sort(function (a,b) {
        return a.localeCompare(b);
    });

    //console.log(keys)
    for (;i<len;i++)
    {
        if(typeof obj.reqData[keys[i]]!="undefined"&&obj.reqData[keys[i]]!=="")
        {
             console.log(keys[i]+":"+obj.reqData[keys[i]])
            if(i!=len-1)
            {
                strs+=keys[i]+"="+obj.reqData[keys[i]]+"&";

            }else {
                strs+=keys[i]+"="+obj.reqData[keys[i]];
            }
        }else{

        }
    }
    console.log(strs);
    // console.log(strs+param_sign_key);
    obj.reqData.sign=faultylabs.MD5(strs+param_sign_key);

}


G$.getStorage=function (id,ob) {
    if(ob)
    {
        return JSON.parse(window.sessionStorage.getItem(id));

    }else {
        return window.sessionStorage.getItem(id);

    }

}

G$.setStorage=function (id,value) {
    if(typeof value=="object")
    {
        window.sessionStorage.setItem(id,JSON.stringify(value));
    }else {
        window.sessionStorage.setItem(id,value);
    }

}