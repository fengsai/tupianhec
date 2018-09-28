/**
 * Created by qibao on 2018/9/25.
 */

;(function ($) {
    var open=$(".open")[0];
    var bgscc=$(".bgscc")[0];
    var grnghuan=$(".right")[0];
    var fdclick=$(".left")[0];
    var fd=$(".fd>img")[0];
    var nianx=$(".nianx")[0];
    var slectbq=$(".slectbq")[0];
    var dzhb=$(".dzhb")[0];
    var close=$(".close");
    var seletninx=true;
    var bqpandun=true;
    var mAlloyCrop=null;

    //合成图片的数据

    var datahec={
        tupian:'',
        eighttext:'',
        lianxisyear:'',
        qianming:'',
        biaoqian:''

    };


    var rempx=parseFloat(document.documentElement.style.fontSize);
    console.log(rempx);
    $(".bgscc")[0].addEventListener("click",function (e) {
        document.getElementById("open").click()
        $("#fsffs").photoClip({
            width: rempx*(358/64),
            height: rempx*(558/64),
            file: "#open",
            view: "#bview",
            ok: "#jqqqq",
            loadStart: function() {
                $(".Tcss_window_windows").css("display","-webkit-box")
            },
            loadComplete: function() {
                $(".Tcss_window_windows").css("display","none")
                $(".Tcss_window_windowsssss").css("display","-webkit-box")
            },
            clipFinish: function(dataURL) {
                datahec.tupian=dataURL;
                $(".Tcss_window_windowsssss").css("display","none")
                bgscc.dataset["pd"]="y";
                fd.src=dataURL;
                $("#fsffs").html("");
            }
        });
    },!1)

    // open.addEventListener("change",function (e) {
    //     var open = $(".open")[0]; //每次要动态获取
    //     var file = open.files[0];
    //     console.log(file.size);
    //
    //     //解决上传相同文件不触发onchange事件
    //     var clone = open.cloneNode(true);
    //     clone.onchange = arguments.callee; //克隆不会复制动态绑定事件
    //     clone.value = '';
    //     console.log(open.parentNode);
    //     var sss=open.parentNode.replaceChild(clone, open);
    //    // console.log(sss);
    //     openFile(e.target.files[0]);
    // })
    // function openFile(fileUrl){//打开文件
    //     $(".Tcss_window_windows").css("display","-webkit-box")
    //     var reader = new FileReader();
    //     reader.readAsDataURL(fileUrl);
    //     reader.onload = function(){
    //         $(".Tcss_window_windows").css("display","none")
    //         var pic=new Image();
    //         pic.src = this.result;
    //         pic.onload = function(){
    //
    //             var src=this.src
    //             mAlloyCrop = new AlloyCrop({
    //                 image_src: src,
    //                 width: rempx*(358/64),
    //                 height: rempx*(558/64),
    //                 output: 1,
    //                 className: 'm-clip-box',
    //                 ok_text:'确定',
    //                 cancel_text:'取消',
    //                 ok: function (base64, canvas) {
    //                     bgscc.src=base64;
    //                     bgscc.dataset["pd"]='y';
    //                     fd.src=base64;
    //                     datahec.tupian=base64;
    //                     //mAlloyCrop.destroy();
    //                 },
    //                 cancel: function () {
    //                     $(".Tcss_window_windows").css("display","none")
    //                    // mAlloyCrop.destroy();
    //                 }
    //             });
    //         };
    //     };
    //
    // }

    grnghuan.addEventListener("click",function () {
        if(bgscc.dataset["pd"]=="y")
        {
            document.getElementById("open").click()
            $("#fsffs").photoClip({
                width: rempx*(358/64),
                height: rempx*(558/64),
                file: "#open",
                view: "#bview",
                ok: "#jqqqq",
                loadStart: function() {
                    console.log("照片读取中");
                },
                loadComplete: function() {
                    $(".Tcss_window_windowsssss").css("display","-webkit-box")
                },
                clipFinish: function(dataURL) {
                    console.log(dataURL);
                    $(".Tcss_window_windowsssss").css("display","none")
                }
            });
        }

    },!1)

    fdclick.addEventListener("click",function () {
        if(bgscc.dataset["pd"]=="y")
        {
            $(".Tcss_window").css("display","-webkit-box");
        }
    })

    close.on("click",function () {
         $(".Tcss_window").css("display","none");
    })

    $("img").on("click",function (e) {
        //e.preventDefault();
    })

    nianx.addEventListener("click",function (e) {
        e.stopPropagation();
        this.ht=this.ht?this.ht:"1年";
        var self=this;
        //console.log(ht);
        if(seletninx){
            var html="";
            html+='<div class="listn bx bxv scroll" style="">';

            for(var i=0;i<9;i++)
            {
            html += "<div>"+(i+1)+"年</div>";
            }

            html+='</div>';

            this.innerHTML=this.ht+html;
            $(".listn>div").each(function (index,item) {

                item.addEventListener("click",function (e) {
                    e.stopPropagation();
                    self.ht=this.innerHTML;
                    self.innerHTML=this.innerHTML;
                    seletninx=true;
                })
            })
            seletninx=false;
        }else {
            this.innerHTML=this.ht;
            seletninx=true;
        }


    },!1);

    slectbq.addEventListener("click",function (e) {
        this.ht=this.ht?this.ht:"请选择妈妈标签";
        var self=this;
        if(bqpandun)
        {
            var html="";
            html+=' <div class="mmbqlist bx bxv">';
            html += "<div>时尚妈妈</div><div>运动妈妈</div><div>职业妈妈</div><div>专家妈妈</div>";
            html+='</div>';
            this.innerHTML=this.ht+html;
            $(".mmbqlist>div").each(function (index,item) {

                item.addEventListener("click",function (e) {
                    e.stopPropagation();
                    self.ht=this.innerHTML;
                    self.innerHTML=this.innerHTML;
                    bqpandun=true;
                })
            })
            bqpandun=false;
        }else {
            this.innerHTML=this.ht;
            bqpandun=true;
        }
    },!1);

    WebFont.load({
        custom: {
            families: ["YourWebFontName"]
        },
        loading: function() {

        },
        fontloading: function(fontFamily, fontDescription) {

        },
        fontactive: function(fontFamily, fontDescription) {

        },
        fontinactive: function(fontFamily, fontDescription) {
            //$(".dzhb").css('display',"block");
            dzhb.addEventListener("click",function (e) {
                //G$.hutu()
                if(bgscc.dataset["pd"]==="w")
                {
                    //alert("请上传图片")
                    hidstip("请上传图片");
                    return;
                }

                if($.trim(slectbq.innerHTML)=="请选择妈妈标签")
                {
                    //alert("选择标签")
                    hidstip("选择标签")
                    return;
                }

                datahec.biaoqian=$.trim(slectbq.innerHTML);

                if($(".pjbiaoq>input").val()=="")
                {
                    hidstip("请填写妈妈签名");
                    return;
                }

                datahec.qianming=$.trim($(".pjbiaoq>input").val());

                if($(".tkti").val()=="")
                {
                    hidstip("请填写期望,8个字以内");
                    return;
                }


                if($(".tkti").val().length>8)
                {
                    hidstip("期望应在8个字以内");
                    return;
                }

                datahec.eighttext=$.trim($(".tkti").val());

                datahec.lianxisyear=parseInt($.trim($(".nianx").html()));

                G$.hutu(datahec);


            },!1)

        },
        active: function() {
            $(".dzhb").css('display',"block");
            dzhb.addEventListener("click",function (e) {
                //G$.hutu()
                // $('.Tcss_window_windowimg').css("display","-webkit-box");
                if(bgscc.dataset["pd"]==="w")
                {
                    //alert("请上传图片")
                    hidstip("请上传图片");
                    return;
                }

                if($.trim(slectbq.innerHTML)=="请选择妈妈标签")
                {
                    //alert("选择标签")
                    hidstip("选择标签")
                    return;
                }

                datahec.biaoqian=$.trim(slectbq.innerHTML);

                if($(".pjbiaoq>input").val()=="")
                {
                    hidstip("请填写妈妈签名");
                    return;
                }

                datahec.qianming=$.trim($(".pjbiaoq>input").val());

                if($(".tkti").val()=="")
                {
                    hidstip("请填写期望,8个字以内");
                    return;
                }


                if($(".tkti").val().length>8)
                {
                    hidstip("期望应在8个字以内");
                    return;
                }

                datahec.eighttext=$.trim($(".tkti").val());

                datahec.lianxisyear=parseInt($.trim($(".nianx").html()));

                G$.hutu(datahec);


            },!1)

        },
        inactive: function() {
            $(".dzhb").css('display',"block");
            dzhb.addEventListener("click",function (e) {
                //G$.hutu()
                // $('.Tcss_window_windowimg').css("display","-webkit-box");
                if(bgscc.dataset["pd"]==="w")
                {
                    //alert("请上传图片")
                    hidstip("请上传图片");
                    return;
                }

                if($.trim(slectbq.innerHTML)=="请选择妈妈标签")
                {
                    //alert("选择标签")
                    hidstip("选择标签")
                    return;
                }

                datahec.biaoqian=$.trim(slectbq.innerHTML);

                if($(".pjbiaoq>input").val()=="")
                {
                    hidstip("请填写妈妈签名");
                    return;
                }

                datahec.qianming=$.trim($(".pjbiaoq>input").val());

                if($(".tkti").val()=="")
                {
                    hidstip("请填写期望,8个字以内");
                    return;
                }


                if($(".tkti").val().length>8)
                {
                    hidstip("期望应在8个字以内");
                    return;
                }

                datahec.eighttext=$.trim($(".tkti").val());

                datahec.lianxisyear=parseInt($.trim($(".nianx").html()));

                G$.hutu(datahec);


            },!1)
            // do something
           // alert(6)

        }

    })

    function hidstip(txt) {
        clearTimeout(hidstip.timer)
        hidstip.timer=null;
        $(".tip_errors>div").html(txt);
        $(".tip_errors").css("display",'-webkit-box');
        hidstip.timer=setTimeout(function () {
            $(".tip_errors").css("display",'none');
            clearTimeout(hidstip.timer)
        },1000);
    }

    var imgbggg=new Image();

    imgbggg.onload=function () {
        $(".bottom").css("display","block");
        $(".Tcss_window_windows").css('display','none');
    }

    imgbggg.src="index/indexbg.jpg";

    // $("#fsffs").photoClip({
    //     width: rempx*(358/64),
    //     height: rempx*(558/64),
    //     file: "#open",
    //     view: "#fsffs",
    //     //ok: "#clipBtn",
    //     loadStart: function() {
    //         console.log("照片读取中");
    //     },
    //     loadComplete: function() {
    //         $(".Tcss_window_windowsssss").css("display","-webkit-box")
    //     },
    //     clipFinish: function(dataURL) {
    //         console.log(dataURL);
    //     }
    // });

})($)