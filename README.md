jsClass
=======

javascript 类体系
借鉴了prototype的思路，进行了简化。

使用方法如下：
//定义ClsA
var ClsA  = new Class({
  initialize:function(){
		alert('ClsA.initialize');
	},
	show:function(){
		alert(this.name);
	}
});
//定义ClsB
var ClsB  = new Class(ClsA,{
	//成员定义区
	__propertys__:function(){
		
	},
	initialize:function($super){
		//调用父类的构造器
		$super();
		alert('ClsB.initialize');
	}
});
//定义ClsC
var ClsC  = new Class(ClsB,{
	//成员定义区
	__propertys__:function(){
		this.name = "ouxingzhi";
	},
	initialize:function($super){
		//调用父类的构造器
		$super();
	}
});
//实例化ClsC
var c = new ClsC();
//调用ClsA的show方法
c.show();
//判断对象c是不是ClsA的实例
alert(c instanceof ClsA); //true
