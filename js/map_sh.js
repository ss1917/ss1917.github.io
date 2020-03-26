function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker();//向地图中添加marker
}
    
//创建地图函数：
function createMap(){
    var map = new BMap.Map('map_sh');//在百度地图容器中创建一个地图
    var point = new BMap.Point(121.492457,31.187365);//定义一个中心点坐标
    map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}
    
//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
     //向地图中添加缩放控件
     var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
     map.addControl(ctrl_nav);
     //向地图中添加缩略图控件
     var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
     map.addControl(ctrl_ove);
     //向地图中添加比例尺控件
     var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
     map.addControl(ctrl_sca);
}
    
//标注点数组
var markerArr = [{title:'上海华电大厦',content:'浦东新区国展路839号华电大厦6楼',point:'121.492457|31.187365',isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}];

//创建marker
function addMarker(){
  for(var i=0;i<markerArr.length;i++){
      var json = markerArr[i];
      var p0 = json.point.split("|")[0];
      var p1 = json.point.split("|")[1];
      var point = new BMap.Point(p0,p1);
      var iconImg = createIcon(json.icon);
      var marker = new BMap.Marker(point,{icon:iconImg});
      var iw = createInfoWindow(i);
      var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
      marker.setLabel(label);
      map.addOverlay(marker);
      label.setStyle({
          borderColor:"#808080",
          color:"#333",
          cursor:"pointer"
      });
   
   (function(){
        var index = i;
        var _iw = createInfoWindow(i);
        var _marker = marker;
        _marker.addEventListener("click",function(){
            this.openInfoWindow(_iw);
        });
        _iw.addEventListener("open",function(){
            _marker.getLabel().hide();
        })
        _iw.addEventListener("close",function(){
            _marker.getLabel().show();
        })
        label.addEventListener("click",function(){
            _marker.openInfoWindow(_iw);
        })
        if(!!json.isOpen){
         label.hide();
         _marker.openInfoWindow(_iw);
        }
   })()
   
  }
}
    
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    var icon = new BMap.Icon("https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9C%B0%E5%9B%BE%E5%AE%9A%E4%BD%8D%E5%B0%8F%E5%9B%BE%E6%A0%87&step_word=&hs=0&pn=2&spn=0&di=53590&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2181600881%2C1710204250&os=275533639%2C2549152898&simid=1917211571%2C570637881&adpicid=0&lpn=0&ln=1244&fr=&fmq=1542792718653_R&fm=rs5&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=13&oriquery=%E5%9C%B0%E5%9B%BE%E5%9B%BE%E6%A0%87&objurl=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff636afc379310a553f6188cfbc4543a982261047.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Frwtxtg_z%26e3Bv54AzdH3Fri5p5v5ry6t2ipAzdH3F8cab08caa&gsm=0&rpstart=0&rpnum=0&islist=&querylist=", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)});  
    return icon;
}
initMap();//创建和初始化地图

