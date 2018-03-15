/**
 * 给地点添加信息
 */
//在指定位置打开信息窗体
    //构建信息窗体中显示的内容
    var info = [];
	for(var i = 0; i < adress.length; i++){
		info[i] = "<div style=\"padding:0px 0px 0px 4px;\"><h1><b>"+adress[i]+"</b></h1></div>";
	}
	
	var infos = [];
	for(var i = 0;i < adress.length;i++){
		infos[i] = "<div><img style=\"height:300px;width:400px;\" src=\"./images/adress_"+i+".jpg \"/></div> ";
	}
	
	var action = [];
	action[0] = "打篮球";
	action[1] = "打网球";
	action[2] = "打羽毛球";
	action[3] = "打乒乓球";
	action[4] = "打台球（位于1号教学楼西侧地下室）";
	action[5] = "运动";
	action[6] = "跑步";
	action[7] = "踢足球";
	action[8] = "拿快递";
	action[9] = "吃饭";
	action[10] = "购物（水果、饮料、日用品）";
	action[11] = "听报告、宣讲";
	action[12] = "洗澡";
	action[13] = "取钱";
	action[14] = "学车";
	action[15] = "打开水";
	action[16] = "学习";
	action[17] = "借书、阅读";
	action[18] = "观赏风景";
	action[19] = "上课";
	action[20] = "学生住宿";
	action[21] = "外籍学生住宿";
	action[22] = "做实验";
	action[23] = "看病";
	action[24] = "喝咖啡";
	action[25] = "打印照相";
	action[26] = "一卡通充值";
	action[27] = "开水卡办理";
	action[28] = "校园一卡通补办";
	action[29] = "上网";
	
	
	var messagearr = [];
	messagearr[0] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的西侧，西临足球场，南临网球场<h3>功能：</h3>"+action[5]+"&nbsp&nbsp"+action[0]+"<br/></div>";
	messagearr[1] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的中部，图书馆的西北侧，西临交院湖<h3>功能：</h3>"+action[11]+"&nbsp&nbsp<br/></div>";
	messagearr[2] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于3号学生公寓西侧，其西侧是16号学生公寓<h3>功能：</h3>"+action[12]+"&nbsp&nbsp<br/></div>";
	messagearr[3] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于2号食堂东北侧，其东侧是近邻宝<h3>功能：</h3>"+action[12]+"&nbsp&nbsp<br/></div>";
	messagearr[4] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于5号学生公寓的西侧，其东侧是9号学生公寓<h3>功能：</h3>"+action[8]+"&nbsp&nbsp<br/></div>";
	messagearr[5] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的东侧，东临1号食堂，其东北侧是1号学生公寓<h3>功能：</h3>可以供校内外的学生或商人举办活动<br/></div>";
	messagearr[6] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的东侧，东临1号食堂，在诚信广场的西侧<h3>功能：</h3>无人售货小店，可以购买文具，日用品等<br/></div>";
	messagearr[7] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的东侧<h3>功能：</h3>进出校园<br/></div>";
	messagearr[8] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的西侧，东临篮球场，西临工程中心<h3>功能：</h3>"+action[5]+"&nbsp&nbsp"+action[6]+"&nbsp&nbsp"+action[7]+"<br/></div>";
	messagearr[9] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于1号食堂的北侧，北临2号学生公寓<h3>功能：</h3>"+action[13]+"&nbsp&nbsp<br/></div>";
	messagearr[10] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的西南侧<h3>功能：</h3>"+action[14]+"&nbsp&nbsp<br/></div>";
	messagearr[11] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的北侧，西临2号食堂，南临15号学生公寓<h3>功能：</h3>"+action[8]+"&nbsp&nbsp<br/></div>";
	messagearr[12] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于1号食堂西北侧，北临17号学生公寓，东临风味餐厅<h3>功能：</h3>"+action[15]+"&nbsp&nbsp<br/></div>";
	messagearr[13] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的中东侧，东门进门直线200米处<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[17]+"<br/></div>";
	messagearr[14] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的中部，其西南侧是校友广场，南侧是一飞冲天景观<h3>功能：</h3>"+action[18]+"<br/></div>";
	messagearr[15] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的西侧，北临2号学生公寓<h3>功能：</h3>"+action[9]+"&nbsp&nbsp"+action[10]+"&nbsp&nbsp"+action[26]+"<br/></div>";
	messagearr[16] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的中北部，东临17号学生公寓，北侧是5号学生公寓<h3>功能：</h3>"+action[9]+"&nbsp&nbsp"+action[10]+"&nbsp&nbsp"+action[26]+"<br/></div>";
	messagearr[17] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的西侧，北临17号学生公寓，西临开水房<h3>功能：</h3>"+action[9]+"&nbsp&nbsp"+action[10]+"<br/></div>";
	messagearr[18] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的西南侧<h3>功能：</h3>进出校园<br/></div>";
	messagearr[19] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的东侧，西临2号学生公寓，北临4号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[20] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的东侧，东临1号学生公寓，北临3号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[21] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的东侧，西临16号学生公寓，南临2号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[22] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的东侧，南临1号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[23] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的北侧，南临2号食堂，西临菜鸟驿站<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[24] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的东侧，南临5号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[25] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的北侧，其西南是8号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[26] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的北侧，东临6号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[27] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的北侧，西临国际交流中心，东临菜鸟驿站<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[28] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的北侧，东临9号学生公寓<h3>功能：</h3>"+action[21]+"&nbsp&nbsp<br/></div>";
	messagearr[29] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的中东侧，西临2号食堂，南临16号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[30] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的中东侧，西临2号食堂，北临15号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[31] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园的中东侧，西临2号食堂，北临16号学生公寓<h3>功能：</h3>"+action[20]+"&nbsp&nbsp<br/></div>";
	messagearr[32] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于1号食堂的北侧，西北临2号学生公寓<h3>功能：</h3>"+action[10]+"&nbsp&nbsp<br/></div>";
	messagearr[33] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于3号学生公寓的西侧<h3>功能：</h3>"+action[10]+"&nbsp&nbsp<br/></div>";
	messagearr[34] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于2号食堂的地下室<h3>功能：</h3>"+action[10]+"&nbsp&nbsp"+action[25]+"<br/></div>";
	messagearr[35] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园东侧<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"<br/></div>";
	messagearr[36] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园东侧<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"&nbsp&nbsp"+action[27]+"<br/></div>";
	messagearr[37] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园东侧，其西南是图书馆<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"<br/></div>";
	messagearr[38] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园东南侧，又叫逸夫教学楼<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"&nbsp&nbsp"+action[4]+"<br/></div>";
	messagearr[39] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园东南侧<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"<br/></div>";
	messagearr[40] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园东南侧<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"<br/></div>";
	messagearr[41] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园东南侧，西临综合实验楼<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"<br/></div>";
	messagearr[42] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"<br/></div>";
	messagearr[43] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"<br/></div>";
	messagearr[44] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"<br/></div>";
	messagearr[45] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园东南侧，东临2号教学楼B座<h3>功能：</h3>"+action[16]+"&nbsp&nbsp"+action[19]+"&nbsp&nbsp"+action[22]+"&nbsp&nbsp"+action[28]+"&nbsp&nbsp"+action[29]+"<br/></div>";
	messagearr[46] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园西侧，东临足球场<h3>功能：</h3>"+action[22]+"&nbsp&nbsp<br/></div>";
	messagearr[47] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园西侧，北临篮球场<h3>功能：</h3>"+action[5]+"&nbsp&nbsp"+action[1]+"<br/></div>";
	messagearr[48] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部，东临校友广场<h3>功能：</h3>"+action[0]+"&nbsp&nbsp"+action[2]+"&nbsp&nbsp"+action[3]+"&nbsp&nbsp"+action[5]+"&nbsp&nbsp"+action[10]+"&nbsp&nbsp举办大型晚会<br/></div>";
	messagearr[49] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部，西临体育馆<h3>功能：</h3>"+action[18]+"<br/></div>";
	messagearr[50] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部<h3>功能：</h3>"+action[18]+"<br/></div>";
	messagearr[51] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部，西临校友广场<h3>功能：</h3>"+action[18]+"<br/></div>";
	messagearr[52] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园北侧，南临15号学生公寓<h3>功能：</h3>"+action[23]+"<br/></div>";
	messagearr[53] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于报告厅南侧<h3>功能：</h3>"+action[24]+"<br/></div>";
	messagearr[54] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部，北临校友广场<h3>功能：</h3>"+action[18]+"<br/></div>";
	messagearr[55] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于校园中部，北临体育馆<h3>功能：</h3>"+action[18]+"<br/></div>";
	messagearr[56] = "<div style=\"padding:0px 0px 0px 4px;\"><h3>位置：</h3>位于济南市长青区海棠路5001号<h3>功能：</h3>培养国家栋梁<br/></div>";
	
/*   info.push("<div><div><img style=\"float:left;width:100%;\" src=\"./images/adress_0.jpg \"/></div> ");
    info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>"+adress[0]+"</b>");
    info.push("电话 : 010-84107000   邮编 : 100102");
    info.push("地址 :山东省济南市长清区海棠路5001号</div></div>");
	info.push("<div><input type=\"button\" onclick=\"setstartp()\" value=\"设为起点\" name=\"setstart\">" +
			"<input type=\"button\" onclick=\"setendp()\" value=\"设为终点\"></div>");
*/
//    var infoWindow = new AMap.InfoWindow({
//        content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
//    });
	//构建标记
//	var marker2 = new AMap.Marker({
//	map:map,position:[116.798302,36.540143]
//});
//在信息窗口中加入“搜索周边、从这里开始、到这里去”的功能
/*	var infowindow;
	map.plugin('AMap.AdvancedInfoWindow', function () {

	  infowindow = new AMap.AdvancedInfoWindow({
	    //panel: 'panel2',
	    placeSearch: true,
	    asOrigin: true,
	    asDestination: true,
	    content: info.join("<br/>")
	  });
	  //infowindow.open(map, [116.481488, 39.990464]);

	});
 //鼠标点击marker2弹出自定义的信息窗体
AMap.event.addListener(marker2, 'click', function() {
	
	infowindow.open(map, marker2.getPosition());
	//infoWindow.open(map, marker2.getPosition());
	document.getElementById("message_box").innerHTML=info.join("<br/>");
        });
*/	








