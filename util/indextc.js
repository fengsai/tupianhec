/**
 * Created by Administrator on 2017/4/24.
 */

var Indexc=function (optain,callback) {
    this.init(optain,callback);
}

Indexc.prototype={

    init:function (optain,callback,callback1) {
        var that=this;
        var html="<div class='Tcss_window bx bxc' id='tcx_con'>";
            if(optain.type==1)
            {
                html+="<div class='bx bxv' style='width:7.75rem;height:3.6875rem;background-color: #ffffff;border-radius: 0.3rem;'>";
                html+="<div class='bxf1 bxc bx bxv' style='color: #676767;font-size: 100%;'>";
                html+="<div>"+optain.text+"</div>";
                if(optain.text1){
                    html+="<div style='margin-top: 0.1rem;'>"+optain.text1+"</div>";
                }
                html+="</div>";
                html+="<div style='box-sizing:border-box;height: 1.09375rem;" +
                    "border-top:0.01rem solid #bbbbbb;text-align: center;" +
                    "line-height:1.078125rem;font-size: 125%;color:#00bbee;' id='tc_queree'>确定</div>";
            }else {
                html+="<div class='bx bxv' style='width:7.75rem;height:4.53125rem;background-color: #ffffff;border-radius: 0.3rem;'>";
                html+="<div class='bxf1 bxc bx bxv' style='color: #676767;font-size: 100%;'>";
                html+="<div style='color:#333333;font-size: 125%;'>"+optain.text+"</div>";
                html+="<div style='color:#676767;font-size: 100%;padding-top:0.2rem;'>"+optain.text1+"</div>";
                html+="</div>";
                if(optain.mode=="2")
                {
                    html+="<div class='bx bxh bxc' style='box-sizing:border-box;height: 1.09375rem;" +
                        "border-top:0.01rem solid #bbbbbb;" +
                        "line-height:1.078125rem;font-size: 125%;color:#00bbee;' >";
                    html+="<div class='bxf1' style='text-align: center;' id='qunxiaoxaio'>取消</div>";
                    html+="<div style='width:0.016rem;height: 100%;background-color: #bbbbbb;'></div>";
                    html+="<div class='bxf1' style='text-align: center;' id='tc_queree'>确定</div>";
                    html+="</div>";
                }else{

                    html+="<div style='box-sizing:border-box;height: 1.09375rem;" +
                        "border-top:0.01rem solid #bbbbbb;text-align: center;" +
                        "line-height:1.078125rem;font-size: 125%;color:#00bbee;' id='tc_queree'>确定</div>";
                }
            }
            html+="</div>";

        html+="</div>";

        $(document.body).append(html);
        this.showS();

        $("#tc_queree").on("click",function () {
            that.hides();
            if(callback)
            {
                callback();
            }
            G$("#tcx_con").remove();

        })

        if(optain.mode=="2")
        {
            $("#qunxiaoxaio").on("click",function () {
                that.hides();
                history.go(0);
                G$("#tcx_con").remove();

            })
        }
    },
    showS:function () {
        G$("#tcx_con").style.display="-webkit-box";
    },
    hides:function () {
        G$("#tcx_con").style.display="none";
    }

}


