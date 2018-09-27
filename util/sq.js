
$.ajax({
    type:"post",
    url:G$.sweetHttp+'imasterkong/wx/getWxJsAPISignature.do',
    dataType:"json",
    data:{
        "appId":params.appId,
        "url":window.location.href
        // "type":"jsapi"
    },
    success:function(json){
        //微信权限验证
        wx.config({
            debug: false,
            appId: params.appId,
            timestamp:json.timestamp,
            nonceStr:json.noncestr,
            signature:json.signature,
            jsApiList: [
                "showMenuItems",
                'hideMenuItems',
                'showOptionMenu',
                "hideOptionMenu",
                "closeWindow",
                "chooseImage",
                "previewImage",
                "uploadImage",
                "downloadImage",
                "getLocalImgData",
                "scanQRCode",
                "chooseCard",
                "addCard",
                "openCard",
                "onMenuShareTimeline",
                "onMenuShareAppMessage"
               //  "showMenuItems",
               //  'hideOptionMenu',
               //  'showOptionMenu',
               // // 'hideMenuItems',
               //  "closeWindow",
               //  "chooseImage",
               //  "previewImage",
               //  "uploadImage",
               //  "downloadImage",
               //  "getLocalImgData",
               //  "scanQRCode"
            ]
        });
        wx.ready(function(){
            wx.hideOptionMenu();
            wx.showMenuItems({
                menuList:[
                    'menuItem:favorite'
                ]
            });
            wx.checkJsApi({
                jsApiList: [
                    "showMenuItems",
                    'hideMenuItems',
                    'showOptionMenu',
                    "hideOptionMenu",
                    "closeWindow",
                    "chooseImage",
                    "previewImage",
                    "uploadImage",
                    "downloadImage",
                    "getLocalImgData",
                    "scanQRCode",
                    "chooseCard",
                    "addCard",
                    "openCard",
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage"
                   //  "showMenuItems",
                   // // 'hideOptionMenu',
                   //  'showOptionMenu',
                   //  'hideMenuItems',
                   //  "closeWindow",
                   //  "chooseImage",
                   //  "previewImage",
                   //  "uploadImage",
                   //  "downloadImage",
                   //  "getLocalImgData",
                   //  "scanQRCode"
                ],
                success: function(res) {}
            });
        });
    }
});

function doUpload(s){
    var data={
        type: 'post',
        httpType: G$.sweetHttp + "rest/saveUploadPic.do",
        reqData: {
            // "appid":GetQueryString("appId")?GetQueryString("appId"):G$.getStorage('chris').appid,
            "open_id":GetQueryString("openId")?GetQueryString("openId"):G$.getStorage('chris',true).openid,
            "mediaId":s,
            "pictureId":G$.getStorage("tpid"),
            "timestamp" : (new Date()).getTime()
        }
    };

    Mparams(data);
    function ssudd(result){
        if(result.code=="200"){

            if(G$.getStorage("zjtype")!="NO7")
            {
                location.href="hbljemage.html";
            }else {
                location.href="xinxitj.html";
            }
        }
        if(result.code == '499'){

        }
    }
    function error(e){

    }
    G$.ajax(data,ssudd,error);
}


$('.scxpp').on('click',function(){
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            if(res.localIds[0]){
                wx.uploadImage({
                    localId:res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        if(res.serverId){
                            var serverId = res.serverId;
                            doUpload(serverId);
                        }
                        // 返回图片的服务器端ID
                    },
                    fail: function (res) {

                    }
                });
            }
        }
    });
});

$(function () {
    // var isPageHide = false;
    window.localStorage.setItem("hideshow","0");
    window.addEventListener('pageshow', function (event) {
        // if (isPageHide) {
        //     if(G$.isIos){
        //         window.location.reload();
        //     }
        // }
       // console.log("page show"+event.persisted)

        if(window.localStorage.getItem("hideshow")==1)
        {
            if(G$.isIos){
                window.location.reload();
            }
            window.localStorage.setItem("hideshow","0");
        }

    });
    window.addEventListener('pagehide', function (event) {
        window.localStorage.setItem("hideshow","1");
       // console.log("page hide"+event.persisted)
    });
})