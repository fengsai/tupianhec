var params={};

if(GetQueryString("appId")||GetQueryString("openId"))
{
    params.appId=GetQueryString("appId");
    params.openId=GetQueryString("openId");
    params.signParams=GetQueryString("sign");

    window.sessionStorage.setItem("paramsInfo",JSON.stringify(params));

}else {
    params=JSON.parse(window.sessionStorage.getItem("paramsInfo"));
}