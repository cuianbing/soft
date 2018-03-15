/**
 * 构建定位与导航系统
 * 
 * 
 * 思路：1、建立一个key-value(就像javaEE中的Map)的集合，"地点名称(key)"-"经伟度坐标(value)"；通过输入key的值获取相应的经伟度，再把获取到的经伟度赋值到上        面的代码中
        2、弄一个选择菜单，菜单内容是三种导航方式，根据导航方式显示输入框和按钮
		3、做一个校园地点一览表，表中地点可点击选中，被选中的地点在地图中显示地点信息	4、给每个地点建一个详细信息按钮，点击后弹出详细信息的盒子，盒子中包括该地点的图片，该地点是用来做什么的，该地点在校园中的方位（周围有什么建筑物，在xxx的右边等等）。别忘了设置关闭盒子的按钮
		5、弄一个校园功能一览表，内容是想要去做的事，选中事件后地图中显示能做这件事的地点的信息
		6、地点信息框中加入设为起点或终点的按钮
*/


//map.setMapStyle("fresh");//设置地图的背景样式

//给地图添加工具
//window.onload = function() {
//	map.plugin(["AMap.ToolBar"], function() {
//		map.addControl(new AMap.ToolBar());
//	});
//	if(location.href.indexOf('&guide=1')!==-1){
//		map.setStatus({scrollWheel:false})
//	}
//}

//定位当前位置
var geolocation;     
map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		showMarker:true,
		showCircle:false,
		useNative:true
        //buttonPosition:'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
//解析定位结果
var current_addres = [];           //以当前位置为起点的坐标
function onComplete(dat) {
    var str=['定位成功'];
    str.push('经度：' + dat.position.getLng());
    str.push('纬度：' + dat.position.getLat());
    current_addres = [dat.position.getLng(),dat.position.getLat()];//将当前位置的坐标赋值给current_addres
    if(dat.accuracy){
         str.push('精度：' + dat.accuracy + ' 米');
    }//如为IP精确定位结果则没有精度信息
//    str.push('是否经过偏移：' + (dat.isConverted ? '是' : '否'));
    document.getElementById('tip').innerHTML = str.join('<br>');
    
}
//解析定位错误信息
function onError(dat) {
    document.getElementById('tip').innerHTML = '定位失败';
}

//添加天气预报
 AMap.service('AMap.Weather', function() {
        var weather = new AMap.Weather();
        //查询实时天气信息, 查询的城市到行政级别的城市
        weather.getLive('长清区', function(err, data) {
            if (!err) {
                var str = [];
                //str.push('<div style="color: #3366FF;">实时天气' + '</div>');
                str.push('<div>' + data.city + '&nbsp&nbsp&nbsp' + data.weather + '&nbsp&nbsp&nbsp' + data.temperature + '℃</div>');
                str.push('<div>' + data.windDirection + '风' + data.windPower + '级&nbsp&nbsp&nbsp湿度：' + data.humidity + '</div>');
                str.push('<div>' + data.reportTime + '</div>');
                document.getElementById('weather').innerHTML=str.join('');
            }
        });
		})
/*var marker = new AMap.Marker({ //添加自定义点标记
    map: map,
    position: [116.796535,36.540617], //基点位置116.796535,36.540617
    offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
    draggable: true,  //是否可拖动
    content: "<img style='width:19px;height:32px' src='./images/starts.png'/>"   //自定义点标记覆盖物内容
});
marker.setTitle('我是marker的title');    // 设置鼠标划过点标记显示的文字提示
//设置label标签
marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
    offset: new AMap.Pixel(-10, -20),//修改label相对于maker的位置
    content: "我是marker的label标签"
});*/


		
	
/*实现步行路线导航*/

//构造路线导航类
var walking = new AMap.Walking({
        map: map,
        panel: "panel"
    });
//控制导航信息隐藏/显示的方法
var flag=1;
function hidepanel(){
	var panel = document.getElementById("panel");
	var panelbtn = document.getElementById("panelbtn");
	var panelbutton = document.getElementById("panelbutton");
	if(flag==1){
		panel.style.width="200px";
		panelbtn.style.width="200px";
		panelbutton.src="./images/btn_hide.jpg"
		flag=0;
	}else if(flag==0){
		panel.style.width="30px";
		panelbtn.style.width="30px";
		panelbutton.src="./images/btn_show.jpg"
		flag=1;
	}
	
	
}
	
 //根据起终点坐标规划步行路线
 
 var startpoint = [];              //以输入的地点为起点的坐标
 var endpoint = [];               //以输入的地点为终点的坐标
 
 /*学校的各个地点及其坐标*/
 var adress = [];var adress_lnglat = [];
 adress[0] = Baskeyballg = "篮球场";	adress_lnglat[0] = baskeyballg = [116.792035,36.539245];
 adress[1] = Baogaoting = "报告厅";	adress_lnglat[1] = baogaoting = [116.795495,36.537659];
 adress[2] = Bath_1 = "旧澡堂";	adress_lnglat[2] = bath_1 = [116.796944,36.540818];
 adress[3] = Bath_2 = "新澡堂";	adress_lnglat[3] = bath_2 = [116.79556,36.54134];
 adress[4] = Cainiaoyizhan = "菜鸟驿站";	adress_lnglat[4] = cainiaoyizhan = [116.794713,36.541808];
 adress[5] = Chengxinsquare = "诚信广场";	adress_lnglat[5] = chengxinsquare = [116.79782,36.539669];
 adress[6] = Chengxinyizhan = "诚信驿站";	adress_lnglat[6] = chengxinyizhan = [116.797594,36.53967];
 adress[7] = Eathdoor = "东门";	adress_lnglat[7] = eathdoor = [116.799057,36.537025];
 adress[8] = Footballg = "足球场";	adress_lnglat[8] = footballg = [116.790962,36.539137];
 adress[9] = GongshangbankATM = "工商银行取款机";	adress_lnglat[9] = gongshangbankATM = [116.797127,36.539956];
 adress[10] = Jiaxiaozhongxin = "驾校中心";	adress_lnglat[10] = jiaoxiaozhongxin = [116.789209,36.535886];
 adress[11] = Jinlingbao = "近邻宝";	adress_lnglat[11] = jinlingbao = [116.795974,36.541412];
 adress[12] = Kaishuifang  = "开水房";	adress_lnglat[12] = kaishufang = [116.796489,36.540067];
 adress[13] = Library = "图书馆";	adress_lnglat[13] = library = [116.796316,36.537224];
 adress[14] = Rimianjingguan = "日冕景观";	adress_lnglat[14] = rimainjingguan = [116.795507,36.539054];
 adress[15] = Shitang_1 = "1号食堂";	adress_lnglat[15] = shitang_1 = [116.796957,36.539513];
 adress[16] = Shitang_2 = "2号食堂";	adress_lnglat[16] = shitang_2 = [116.795093,36.540831];
 adress[17] = Shitang_3 = "风味餐厅";	adress_lnglat[17] = shitang_3 = [116.796611,36.540081];
 adress[18] = Southdoor = "南门";	adress_lnglat[18] = southdoor = [116.78945,36.534836];
 adress[19] = Studentdormitory_1 = "1号学生公寓";	adress_lnglat[19] = studentdormitory_1 = [116.798302,36.540143];
 adress[20] = Studentdormitory_2 = "2号学生公寓";	adress_lnglat[20] = studentdormitory_2 = [116.796972,36.540294];
 adress[21] = Studentdormitory_3 = "3号学生公寓";	adress_lnglat[21] = studentdormitory_3 = [116.797616,36.540897];
 adress[22] = Studentdormitory_4 = "4号学生公寓";	adress_lnglat[22] = studentdormitory_4 = [116.798426,36.541005];
 adress[23] = Studentdormitory_5 = "5号学生公寓";	adress_lnglat[23] = studentdormitory_5 = [116.795427,36.541854];
 adress[24] = Studentdormitory_6 = "6号学生公寓";	adress_lnglat[24] = studentdormitory_6 = [116.79554,36.542199];
 adress[25] = Studentdormitory_7 = "7号学生公寓";	adress_lnglat[25] = studentdormitory_7 = [116.795658,36.542789];
 adress[26] = Studentdormitory_8 = "8号学生公寓";	adress_lnglat[26] = studentdormitory_8 = [116.794757,36.54219];
 adress[27] = Studentdormitory_9 = "9号学生公寓";	adress_lnglat[27] = studentdormitory_9 = [116.794178,36.541729];
 adress[28] = Studentdormitory_10 = "国际交流中心";	adress_lnglat[28] = studentdormitory_10 = [116.793089,36.541673];
 adress[29] = Studentdormitory_15 = "15号学生公寓";	adress_lnglat[29] = studentdormitory_15 = [116.796146,36.541234];
 adress[30] = Studentdormitory_16 = "16号学生公寓";	adress_lnglat[30] = studentdormitory_16 = [116.796189,36.540902];
 adress[31] = Studentdormitory_17 = "17号学生公寓";	adress_lnglat[31] = studentdormitory_17 = [116.796184,36.540479];
 adress[32] = Supermarket_1 = "交院超市";	adress_lnglat[32] = supermarket_1 = [116.796692,36.539935];
 adress[33] = Supermarket_2 = "时代超市";	adress_lnglat[33] = supermarket_2 = [116.798451,36.540861];
 adress[34] = Supermarket_3 = "购物中心";	adress_lnglat[34] = supermarket_3 = [116.795173,36.540741];
 adress[35] = Teachingbuilding_1A = "1号教学楼A座";	adress_lnglat[35] = teachingbuilding_1A = [116.797384,36.53825];
 adress[36] = Teachingbuilding_1B = "1号教学楼B座";	adress_lnglat[36] = teachingbuilding_1B = [116.797421,36.537913];
 adress[37] = Teachingbuilding_1C = "1号教学楼C座";	adress_lnglat[37] = teachingbuilding_1C = [116.7963,36.537767];
 adress[38] = Teachingbuilding_2A = "2号教学楼A座";	adress_lnglat[38] = teachingbuilding_2A = [116.797319,36.536556];
 adress[39] = Teachingbuilding_2B = "2号教学楼B座";	adress_lnglat[39] = teachingbuilding_2B = [116.797362,36.53612];
 adress[40] = Teachingbuilding_2C = "2号教学楼C座";	adress_lnglat[40] = teachingbuilding_2C = [116.797394,36.535741];
 adress[41] = Teachingbuilding_2D = "2号教学楼D座";	adress_lnglat[41] = teachingbuilding_2D = [116.79674,36.535284];
 adress[42] = Teachingbuilding_TM_A = "土木实验楼A座";	adress_lnglat[42] = teachingbuilding_TM_A = [116.79424,36.539409];
 adress[43] = Teachingbuilding_TM_B = "土木实验楼B座";	adress_lnglat[43] = teachingbuilding_TM_B = [116.79416,36.53903];
 adress[44] = Teachingbuilding_TM_C = "土木实验楼C座";	adress_lnglat[44] = teachingbuilding_TM_C = [116.793768,36.539788];
 adress[45] = Teachingbuilding_ZHSYL = "综合实验楼";	adress_lnglat[45] = teachingbuilding_ZHSYL = [116.796225,36.535724];
 adress[46] = Teachingbuilding_GCSYZX = "工程中心";	adress_lnglat[46] = teachingbuilding_GCSYZX = [116.789793,36.537569];
 adress[47] = Tennisballg = "网球场";	adress_lnglat[47] = tennisballg = [116.791107,36.53787];
 adress[48] = Tiyuguan = "体育馆";	adress_lnglat[48] = tiyuguan = [116.793027,36.538635];
 adress[49] = Xiaoyousquare = "校友广场";	adress_lnglat[49] = xiaoyousquare = [116.793979,36.538399];
 adress[50] = Yifeichongtian = "一飞冲天景观";	adress_lnglat[50] = yifeichongtian = [116.79599,36.538938];
 adress[51] = Yiluxiangdong = "一路向东景观";	adress_lnglat[51] = yiluxiangdong = [116.795046,36.538645];
 adress[52] = Xiaoyiyuan = "校医院";	adress_lnglat[52] = xiaoyiyuan =[116.795984,36.541555];
 adress[53] = Coffee = "咖啡厅";	adress_lnglat[53] = coffee = [116.795403,36.537431];
 adress[54] = Yifanfengshun = "一帆风顺景观";	adress_lnglat[54] = yifanfengshun = [116.79374,36.537685];
 adress[55] = Yiwangzhiqian = "一往直前景观";	adress_lnglat[55] = yiwangzhiqian = [116.792785,36.537474];
 adress[56] = Sdjtxy = "山东交通学院";	adress_lnglat[56] = sdjtxy = [116.793001,36.538819];
 //var all_addres = [start_addres,end_addres];
 
 /*给起点和终点赋坐标*/
 
 //验证坐标的方法
 var adpoint = [];
 var f = false;
 function checkpoint(point){
	 for(var i = 0;i < adress.length;i++){
		 
		 
		 if(point == adress[i]){
			 adpoint = adress_lnglat[i];
			 f = true;
		 }
	 }
	 if( f == false){
		 if(point!="" ){
			//document.getElementById("alert_massage").innerHTML=piont+": 不是一个有效的地址";
				alert(point+": 不是一个有效的地址");
		 }
			walking.clear();
			adpoint = null;//初始化adpoint（输入的地点），防止之前输入的内容干扰导航
			//合上导航信息的盒子
			panel.style.width="30px";
			panelbtn.style.width="30px";
			panelbutton.src="./images/btn_show.jpg"
			flag=1;
		 }
	 /*switch(piont){
	 case Baskeyballg: adpoint = baskeyballg;break;
	 case Baogaoting: adpoint = baogaoting;break;
	 case Bath_1: adpoint = bath_1;break;
	 case Bath_2: adpoint = bath_2;break;
	 case Cainiaoyizhan: adpoint = cainiaoyizhan;break;
	 case Chengxinsquare: adpoint = chengxinsquare;break;
	 case Chengxinyizhan: adpoint = chengxinyizhan;break;
	 case Eathdoor: adpoint = eathdoor;break;
	 case Footballg: adpoint = footballg;break;
	 case GongshangbankATM: adpoint = gongshangbankATM;break;
	 case Jiaxiaozhongxin: adpoint = jiaxiaozhongxin;break;
	 case Jinlingbao: adpoint = jinlingbao;break;
	 case Kaishuifang: adpoint = kaishuifang;break;
	 case Library: adpoint = library;break;
	 case Rimianjingguan: adpoint = rimianjingguan;break;
	 case Shitang_1: adpoint = shitang_1;break;
	 case Shitang_2: adpoint = shitang_2;break;
	 case Shitang_3: adpoint = shitang_3;break;
	 case Southdoor: adpoint = southdoor;break;
	 case Studentdormitory_1: adpoint = studentdormitory_1;break;
	 case Studentdormitory_2: adpoint = studentdormitory_2;break;
	 case Studentdormitory_3: adpoint = studentdormitory_3;break;
	 case Studentdormitory_4: adpoint = studentdormitory_4;break;
	 case Studentdormitory_5: adpoint = studentdormitory_5;break;
	 case Studentdormitory_6: adpoint = studentdormitory_6;break;
	 case Studentdormitory_7: adpoint = studentdormitory_7;break;
	 case Studentdormitory_8: adpoint = studentdormitory_8;break;
	 case Studentdormitory_9: adpoint = studentdormitory_9;break;
	 case Studentdormitory_10: adpoint = studentdormitory_10;break;
	 case Studentdormitory_15: adpoint = studentdormitory_15;break;
	 case Studentdormitory_16: adpoint = studentdormitory_16;break;
	 case Studentdormitory_17: adpoint = studentdormitory_17;break;
	 case Supermarket_1: adpoint = supermarket_1;break;
	 case Supermarket_2: adpoint = supermarket_2;break;
	 case Supermarket_3: adpoint = supermarket_3;break;
	 case Teachingbuilding_1A: adpoint = teachingbuilding_1A;break;
	 case Teachingbuilding_1B: adpoint = teachingbuilding_1B;break;
	 case Teachingbuilding_1C: adpoint = teachingbuilding_1C;break;
	 case Teachingbuilding_2A: adpoint = teachingbuilding_2A;break;
	 case Teachingbuilding_2B: adpoint = teachingbuilding_2B;break;
	 case Teachingbuilding_2C: adpoint = teachingbuilding_2C;break;
	 case Teachingbuilding_2D: adpoint = teachingbuilding_2D;break;
	 case Teachingbuilding_TM_A: adpoint = teachingbuilding_TM_A;break;
	 case Teachingbuilding_TM_B: adpoint = teachingbuilding_TM_B;break;
	 case Teachingbuilding_TM_C: adpoint = teachingbuilding_TM_C;break;
	 case Teachingbuilding_ZHSYL: adpoint = teachingbuilding_ZHSYL;break;
	 case Teachingbuilding_GCSYZX: adpoint = teachingbuilding_GCSYZX;break;
	 case Tennisballg: adpoint = tennisballg;break;
	 case Tiyuguan: adpoint = tiyuguan;break;
	 case Xiaoyousquare: adpoint = xiaoyousquare;break;
	 case Yifeichongtian: adpoint = yifeichongtian;break;
	 case Yiluxiangdong: adpoint = yiluxiangdong;break;
	 default:
		 if(piont!=""){
			
			//document.getElementById("alert_massage").innerHTML=piont+": 不是一个有效的地址";
			alert(piont+": 不是一个有效的地址");
		 }
	 walking.clear();
	 adpoint = null;//初始化adpoint（输入的地点），防止之前输入的内容干扰导航
 }*/
 }
 
 //获取起点坐标的方法
 function startpf(){
	 var startp=document.getElementById("start_point").value;
	 checkpoint(startp);
	 startpoint = adpoint;
	 if(startp==""){
		 //document.getElementById("alert_massage").innerHTML="请输入起点！";
		 alert("请输入/选择起点！")
	 }
 }
 //获取终点坐标的方法
 function endpf(){
	 var endp=document.getElementById("end_point").value;
	 checkpoint(endp);
	 endpoint = adpoint;
	 if(endp==""){
		 //document.getElementById("alert_massage").innerHTML="请输入终点！";
		 f = false;
		 alert("请输入/选择终点！")
	 }
 }
 
//构建可移动的标记
var marker_move = new AMap.Marker({
		//map:map,
		content: "<img style='width:19px;height:32px' src='./images/starts.png'/>",
		draggable:true,
		bubble:true
	});
	//点击地图可将标记移动到点击的位置
map.on('click',function(e){
//	marker_move.setMap(map);//
	            marker_move.setPosition([e.lnglat.getLng(),e.lnglat.getLat()]);
				var nav_meth = document.getElementById("navigation_method").value;
				if(nav_meth=="以点击的位置为起点导航"){
					marker_move.setMap(map);//将marker_move标记显示在地图上
					endpf();
					if(f == true){
						walking.search(marker_move.getPosition(),adpoint);//调用步行导航类，开始导航
						//展开导航路线的信息
						panel.style.width="200px";
						panelbtn.style.width="200px";
						panelbutton.src="./images/btn_hide.jpg"
					}
				}else{
					marker_move.setMap(null);
				}
				
	  })
	
 //开始导航的方法
function navigate(){
	var nav_meth = document.getElementById("navigation_method").value;
	if(nav_meth=="以当前位置为起点导航"){
//		document.getElementById("start_point").disabled="disabled";
		current();
	}else if(nav_meth=="以点击的位置为起点导航"){
		custom();
	}else{
		input();
		//alert(startp+"  "+endp)
		
	}
	walking.search(startpoint,endpoint);//调用步行导航类，开始导航
	//展开导航路线的信息
	panel.style.width="200px";
	panelbtn.style.width="200px";
	panelbutton.src="./images/btn_hide.jpg"
	flag=0;
}

//以输入的位置为起点的方法
function input(){
	startpf();
	endpf();
}

//以当前位置为起点的方法
function current(){	
	endpf();
	startpoint = current_addres;
    //walking.search(current_addres,endpoint);
}

//以自定义的位置为起点的方法
function custom(){
	marker_move.setMap(map);
	endpf();
	startpoint = marker_move.getPosition();
	//walking.search(marker_move.getPosition(),endpoint);

	
}

//显示、隐藏平面图的方法
var flag = 1;
function setplan(button){
	if(flag == 1){
		groundImage_s.setMap(null);
		flag = 0;
		//alert(flag);
		button.value = "显示平面图";
	}else if(flag == 0){
		groundImage_s.setMap(map);
		flag = 1;
		button.value = "隐藏平面图";
	}
	
}
//搜索后显示地点信息的方法
function showaddress(){
	var address = document.getElementById("searchaddress").value;
	if(address != "" || address != null){
		checkpoint(address);
		for(var i =  0; i < adress.length; i++){
		if(adress[i] == address){
			map.setCenter(adress_lnglat[i]);
			infocircle.setContent(infos[i]+info[i]+"<button onclick=\"showmessage("+i+")\">详细信息</button>&nbsp<button onclick=\"setendad("+i+")\">到这里去</button>&nbsp<button onclick=\"setstartad("+i+")\">从这开始</button>");
			infocircle.open(map,adress_lnglat[i]);
		}
	}
	}
	if(address == "" || address == null){
		alert("请输入地点名称");
	}
}

//计时器，监听导航方式选择后，改变起点输入框的状态
var timerr = setInterval(function(){
	var nav_meth = document.getElementById("navigation_method").value;
	var clickEventListener;
	if(nav_meth=="以当前位置为起点导航"){
		document.getElementById("start_point").value="当前位置";
		document.getElementById("start_point").disabled="disabled";
		lickEventListener = null;
	}else if(nav_meth=="以点击的位置为起点导航"){
//		clickEventListener = map.on('click', function(m) {
//		document.getElementById("start_point").value = m.lnglat.getLng() + ',' + m.lnglat.getLat()
//		});
		document.getElementById("start_point").value="点击地图选取起点";
		document.getElementById("start_point").disabled="disabled";
	}else{
		document.getElementById("start_point").disabled="";
		lickEventListener = null;
	}
},100);
    
   
