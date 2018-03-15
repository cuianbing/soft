/**
 * 给地图添加覆盖物
 */

//绘制大地线
/*
 var lineArr = [
        ['116.793286', '36.541673'],
        ['116.792503', '36.541665'],
		['116.79251', '36.541867'],
		['116.79325', '36.541885'],
		['116.793286', '36.541673']
    ];
    var polyline = new AMap.Polyline({
		map:map,
        path: lineArr,            // 设置线覆盖物路径
        strokeColor: '#3366FF',   // 线颜色
        strokeOpacity: 1,         // 线透明度
        strokeWeight: 2,          // 线宽
        strokeStyle: 'solid',     // 线样式
        strokeDasharray: [10, 5], // 补充线样式
        geodesic: true            // 绘制大地线
    });
    //polyline.setMap(map);
	
var polygonArr = new Array();//多边形覆盖物节点坐标数组
    polygonArr.push([116.797279,36.539872]);
    polygonArr.push([116.797306,36.539536]);
    polygonArr.push([116.796726,36.53954]);
    polygonArr.push([116.796748,36.539872]);
    var  polygon = new AMap.Polygon({
		map:map,
        path: polygonArr,//设置多边形边界路径
        strokeColor: "#FF33FF", //线颜色
        strokeOpacity: 0.2, //线透明度
        strokeWeight: 3,    //线宽
        fillColor: "#1791fc", //填充色
        fillOpacity: 0.35//填充透明度
    });
    //polygon.setMap(map);
	polygon.on("click",function(){
		//alert("您点击了多边形");
		document.getElementById("message_box").innerHTML=info.join("<br/>");
	});

    var circle = new AMap.Circle({
		map:map,
        center: new AMap.LngLat("116.796184","36.540479"),// 圆心位置
        radius: 20, //半径
        strokeColor: "#F33", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#aa2200", //填充颜色
		//fill: url("images/xiaohui.jpg")
        fillOpacity: 0.35,//填充透明度
		clickable:true
    });
    var infocircle = new AMap.InfoWindow({
    	content: "这是个圆"
    });
   // circle.setMap(map);	
   circle.on("click",function(){
	   //alert("您点击了圆");
	   infocircle.open(map,circle.getCenter());
   });
   
   //设置图片覆盖物
   var bounds = [];
   bounds[0] = new AMap.Bounds([116.797563,36.539523], [116.798056,36.540079]);
   bounds[1] = new AMap.Bounds([116.793649,36.537906], [116.794422,36.538596]);
   bounds[2] = new AMap.Bounds([116.790286,36.53804], [116.791766,36.539979]);
   var groundImageOpts = {  
	        opacity: 1,   //图片透明度  
	        clickable: true,//图片相应鼠标点击事件，默认：false  
	        map: map     //图片叠加的地图对象  
	    }
    
    //实例化一个图片覆盖物对象  
   for(var i = 1;i <= bounds.length;i++){
	   var groundImage = new AMap.GroundImage('images/fgw_'+i+'.jpg', bounds[i-1], groundImageOpts); 
   }
*/   

//添加校园平面图覆盖物
   var bound_shool = new AMap.Bounds([116.78457,36.534211], [116.800119,36.543572]);
   var groundImage_shool = {  
	        opacity: 1,   //图片透明度  
	        clickable: true,//图片相应鼠标点击事件，默认：false  
	        map: map     //图片叠加的地图对象  
	    }
	var groundImage_s = new AMap.GroundImage('images/jypmdt.jpg',bound_shool,groundImage_shool);

//为各个地点添加圆形覆盖物
//var infocircle = [];
//var circle = [];
var infocircle = new AMap.InfoWindow({//为圆形覆盖物构建信息窗口
//	closeWhenClickMap:true     //点击地图时关闭信息窗口
	autoMove:true
	});
	
var messageinfo;	
map.plugin('AMap.AdvancedInfoWindow', function () {

	messageinfo = new AMap.AdvancedInfoWindow({
		panel: "message_box"
	
	});	

});

for(var i = 0;i < adress_lnglat.length;i++){
		var circle = new AMap.Circle({
		map:map,
        center: adress_lnglat[i],// 圆心位置
        radius: 5, //半径
        strokeColor: "#F33", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#aa2200", //填充颜色
		//fill: url("images/xiaohui.jpg")
        fillOpacity: 0.35,//填充透明度
		clickable:true,
		extData:info[i]+"<button onclick=\"showmessage("+i+")\">详细信息</button>&nbsp<button onclick=\"setendad("+i+")\">到这里去</button>&nbsp<button onclick=\"setstartad("+i+")\">从这开始</button>"//extData中可以写任意内容，这里用来编辑信息窗口的内容
    });
	circle.on('click',circleclick);
	circle.on('click',circleclick);
	circle.emit('click',{target:circle});
}

function circleclick(e){
	infocircle.setContent(e.target.getExtData());
	infocircle.open(map,e.target.getCenter());
	//messageinfo.setContent(e.target.getExtData());
	map.setCenter(e.target.getCenter());
	//document.getElementById("message_box").innerHTML=info.join("<br/>");
}
infocircle.close();

//显示详细信息的方法
var hide_btn = "<img style=\"float:right;height:30px;\" onclick=\"closemessage()\" src=\"./images/btn_close.jpg \"/><br/>"; //设置关闭按钮
function showmessage(n){
	var message = document.getElementById("message_box");
	message.style.display="";
	message.innerHTML=("<div style=\"padding-bottom:5px;color:#fff;\">"+hide_btn + infos[n]+"<br\>"+info[n]+messagearr[n]+"<button onclick=\"setendad("+n+")\">到这里去</button>&nbsp<button onclick=\"setstartad("+n+")\">从这开始</button></div>");
	infocircle.close();
}
//关闭详细信息的方法
function closemessage(){
	document.getElementById("message_box").style.display="none";
}

//起点（用户位置）的marker标记
var startMarker = new AMap.Marker({
  content:"<img style='width:19px;height:32px' src='./images/starts.png'/>",
})
//目的地的marker标记
var endMarker = new AMap.Marker({
  content:"<img style='width:19px;height:32px' src='./images/ends.png'/>",
})
//将地点设置为终点的方法
function setendad(n){
	var startad = document.getElementById("start_point").value;
	document.getElementById("end_point").value=adress[n];
	infocircle.close();
	endMarker.setMap(map)
	endMarker.setPosition(adress_lnglat[n])
	if(startad != "" ){
		navigate();
		startMarker.setMap(null);
		endMarker.setMap(null);
	}
	closemessage();
}
//将地点设置为起点的方法
function setstartad(n){
	var endad = document.getElementById("end_point").value;
	document.getElementById("start_point").value=adress[n];
	infocircle.close();
	startMarker.setMap(map)
	startMarker.setPosition(adress_lnglat[n])
	if(endad != ""){
		input();
		walking.search(startpoint,endpoint);//调用步行导航类，开始导航
		//展开导航路线的信息
		panel.style.width="200px";
		panelbtn.style.width="200px";
		panelbutton.src="./images/btn_hide.jpg"
		
		startMarker.setMap(null);
		endMarker.setMap(null);
	}
	closemessage();
}
	
//为各个地点的圆形覆盖物添加点击事件
/*
var infocircle = new AMap.InfoWindow({//为各个地点的圆形覆盖物添加信息窗口
   //	content: adress[i]+"<button onclick=\"setendad("+i+")\">去这里</button>"
   });
for(var i = 0;i < adress_lnglat.length;i++){
	var marker = new AMap.Marker({
		position:adress_lnglat[i],
		map:map
	});
		var circle = new AMap.Circle({
		map:map,
        center: adress_lnglat[i],// 圆心位置
        radius: 5, //半径
        strokeColor: "#F33", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#aa2200", //填充颜色
		//fill: url("images/xiaohui.jpg")
        fillOpacity: 0.35,//填充透明度
		clickable:true,
    });
			
    marker.content=adress[i]+"<button onclick=\"setendad("+i+")\">去这里</button>";
    marker.on('click',circleclick);
    marker.emit('click',{target:marker});
}

function circleclick(e){
	infocircle.setContent(e.target.content);
	infocircle.open(map, e.target.getPosition());
	}

function setendad(n){
	document.getElementById("end_point").value=adress[n];
	navigate();
}


	circle[0].on("click",function(){infocircle[0].open(map,circle[0].getCenter());});
	circle[1].on("click",function(){infocircle[1].open(map,circle[1].getCenter());});
	circle[2].on("click",function(){infocircle[2].open(map,circle[2].getCenter());});
	circle[3].on("click",function(){infocircle[3].open(map,circle[3].getCenter());});
	circle[4].on("click",function(){infocircle[4].open(map,circle[4].getCenter());});
	circle[5].on("click",function(){infocircle[5].open(map,circle[5].getCenter());});
	circle[6].on("click",function(){infocircle[6].open(map,circle[6].getCenter());});
	circle[7].on("click",function(){infocircle[7].open(map,circle[7].getCenter());});
	circle[8].on("click",function(){infocircle[8].open(map,circle[8].getCenter());});
	circle[9].on("click",function(){infocircle[9].open(map,circle[9].getCenter());});
	circle[10].on("click",function(){infocircle[10].open(map,circle[10].getCenter());});
	circle[11].on("click",function(){infocircle[11].open(map,circle[11].getCenter());});
	circle[12].on("click",function(){infocircle[12].open(map,circle[12].getCenter());});
	circle[13].on("click",function(){infocircle[13].open(map,circle[13].getCenter());});
	circle[14].on("click",function(){infocircle[14].open(map,circle[14].getCenter());});
	circle[15].on("click",function(){infocircle[15].open(map,circle[15].getCenter());});
	circle[16].on("click",function(){infocircle[16].open(map,circle[16].getCenter());});
	circle[17].on("click",function(){infocircle[17].open(map,circle[17].getCenter());});
	circle[18].on("click",function(){infocircle[18].open(map,circle[18].getCenter());});
	circle[19].on("click",function(){infocircle[19].open(map,circle[19].getCenter());});
	circle[20].on("click",function(){infocircle[20].open(map,circle[20].getCenter());});
	circle[21].on("click",function(){infocircle[21].open(map,circle[21].getCenter());});
	circle[22].on("click",function(){infocircle[22].open(map,circle[22].getCenter());});
	circle[23].on("click",function(){infocircle[23].open(map,circle[23].getCenter());});
	circle[24].on("click",function(){infocircle[24].open(map,circle[24].getCenter());});
	circle[25].on("click",function(){infocircle[25].open(map,circle[25].getCenter());});
	circle[26].on("click",function(){infocircle[26].open(map,circle[26].getCenter());});
	circle[27].on("click",function(){infocircle[27].open(map,circle[27].getCenter());});
	circle[28].on("click",function(){infocircle[28].open(map,circle[28].getCenter());});
	circle[29].on("click",function(){infocircle[29].open(map,circle[29].getCenter());});
	circle[30].on("click",function(){infocircle[30].open(map,circle[30].getCenter());});
	circle[31].on("click",function(){infocircle[31].open(map,circle[31].getCenter());});
	circle[32].on("click",function(){infocircle[32].open(map,circle[32].getCenter());});
	circle[33].on("click",function(){infocircle[33].open(map,circle[33].getCenter());});
	circle[34].on("click",function(){infocircle[34].open(map,circle[34].getCenter());});
	circle[35].on("click",function(){infocircle[35].open(map,circle[35].getCenter());});
	circle[36].on("click",function(){infocircle[36].open(map,circle[36].getCenter());});
	circle[37].on("click",function(){infocircle[37].open(map,circle[37].getCenter());});
	circle[38].on("click",function(){infocircle[38].open(map,circle[38].getCenter());});
	circle[39].on("click",function(){infocircle[39].open(map,circle[39].getCenter());});
	circle[40].on("click",function(){infocircle[40].open(map,circle[40].getCenter());});
	circle[41].on("click",function(){infocircle[41].open(map,circle[41].getCenter());});
	circle[42].on("click",function(){infocircle[42].open(map,circle[42].getCenter());});
	circle[43].on("click",function(){infocircle[43].open(map,circle[43].getCenter());});
	circle[44].on("click",function(){infocircle[44].open(map,circle[44].getCenter());});
	circle[45].on("click",function(){infocircle[45].open(map,circle[45].getCenter());});
	circle[46].on("click",function(){infocircle[46].open(map,circle[46].getCenter());});
	circle[47].on("click",function(){infocircle[47].open(map,circle[47].getCenter());});
	circle[48].on("click",function(){infocircle[48].open(map,circle[48].getCenter());});
	circle[49].on("click",function(){infocircle[49].open(map,circle[49].getCenter());});
	circle[50].on("click",function(){infocircle[50].open(map,circle[50].getCenter());});
	circle[51].on("click",function(){infocircle[51].open(map,circle[51].getCenter());});
*/	



   
          

