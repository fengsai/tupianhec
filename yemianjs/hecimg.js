/**
 * Created by qibao on 2018/9/26.
 */
;(function (k,G$) {
    var rpxs=parseFloat(document.documentElement.style.fontSize);
    var rpxb=parseFloat(window.getComputedStyle(document.body,null).fontSize);
    console.log(rpxb);

    var constai=document.getElementById("constai"),
        ww=(600/64)*rpxs,
        hh=(820/64)*rpxs;
    console.log(ww, hh);
    var stage= new k.Stage({
        container:'constai',
        width:ww,
        height:hh
    })



    var layer=new k.Layer();
    //大的背景图

    function huntus(paget) {
        $('.Tcss_window_windows').css("display","-webkit-box");
        var bgimg= new Image();

        var txt1=new k.Text({
            text:'成 为 妈 妈 后,需 要 适 应 新 的 角 色。',
            width:(565/64)*rpxs,
            y:(161/64)*rpxs,
            // x:(234/64)*rpxs,
            x:0,
            fill:'#000',
            fontSize:(19/24)*rpxb,
            fontFamily:'Source Han Sans CN',
            fontStyle:"bold",
            align:'right'
        });

        var txt2=new k.Text({
            text:'我 用 不 断 的 练 习,让 自 己 找 回'+paget.eighttext.split("").join(" "),
            x:0,
            y:(192/64)*rpxs,
            // x:(90/64)*rpxs,
            width:(565/64)*rpxs,
            fill:'#000',
            fontSize:(19/24)*rpxb,
            fontFamily:'Source Han Sans CN',
            fontStyle:"bold",
            align:'right',
        });

        var txtqm=new k.Text({
            text:paget.qianming,
            y:(660/64)*rpxs,
            x:(210/64)*rpxs,
            fill:'#fff',
            fontSize:(78/24)*rpxb,
            fontFamily:'YourWebFontName'
        });

        var imgqm=new Image();

        var txtbq=new k.Text({
            width:(358/64)*rpxs,
            text:paget.biaoqian,
            y:(740/64)*rpxs,
            x:(210/64)*rpxs,
            fill:'#fff',
            fontSize:(23/24)*rpxb,
            fontFamily:'Source Han Sans CN',
            fontStyle:"bold",
            align:'center'
        });

        bgimg.onload=function () {
            var imgbgc=new k.Image({
                width:ww,
                height:hh,
                image:this,
                x:0,
                y:0
            });
            var lxsimg=new Image();

            var tupjq=new Image();

            lxsimg.onload=function () {
                var lxs= new k.Image({
                    width:(255/64)*rpxs,
                    height:(164/64)*rpxs,
                    image:this,
                    x:(35/64)*rpxs,
                    y:(17/64)*rpxs
                });

                tupjq.onload=function () {

                    var anli= new k.Image({
                        width:(358/64)*rpxs,
                        height:(558/64)*rpxs,
                        image:this,
                        x:(200/64)*rpxs,
                        y:(223/64)*rpxs
                    });

                    layer.add(lxs)
                    layer.add(txt1)
                    layer.add(txt2)
                    layer.add(anli)
                    layer.add(txtqm)
                    layer.add(txtbq);

                    layer.draw();

                    var ysscr=stage.toDataURL({mimeType: 'image/jpeg', quality: 1});

                    $(".constais>img").attr("src",ysscr);

                   // $(".aniudown").attr("download",ysscr);
                   // $(".aniudown").attr("href",ysscr);
                    $('.Tcss_window_windows').css("display","none");

                    $(".Tcss_window_windowimgs").css("display","-webkit-box");


                }


                tupjq.src=paget.tupian;

            }
            lxsimg.src='indeximg/'+paget.lianxisyear+'.png'

            layer.add(imgbgc)

        }

        bgimg.src="indeximg/bgsc.jpeg";
    }

    G$.hutu=huntus;

    stage.add(layer)

})(Konva,G$)