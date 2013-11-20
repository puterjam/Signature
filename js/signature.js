/*!
* signature.js by @puterjam
* Copyright 2013 Tencent, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/

/**
 * 签名档库
 * @class Signature
 */
(function Signature() {
	/**
	 * 列表模板
	 * @type {Array}
	 */
	var ITEM_HTML = [
		'<div style="text-align: center">',
		'	<p>',
		'		<img id="%sign_img%" style="width:%width%;height:%height%;max-width:100%" class="img-polaroid"/>',
		'		<canvas id="%sign_canvas%" width="%width%" height="%height%" style="display:none"></canvas>',
		'	</p>',
		'	<p>',
		'		<a class="btn btn-small btn-success" canvas_id="%sign_canvas%" download="%id%.png" target="_blank">保存 [%name%]</a>',
		'	</p>',
		'</div>'].join("");

	/**
	 * 字体列表
	 * @type {Array}
	 */
	var FONTS = [
			"default",
			"-",
			"Arial",
			"Arial Black",
			"微软雅黑",
			"宋体",
			"-",
			"kaiti SC",
			"Songti SC",
			"Hiragino Sans GB W3",
			"-",
			"ABeeZee",
			"Carrois Gothic SC",
			"Numans",
			"Ubuntu"
		];

	/**
	 * 字体合法的规则
	 * @type {Array}
	 */
	var _FONTS_RULES={};

	["style","weight","size","family"].forEach(function(v,k){
		_FONTS_RULES[v] = k+1;
	});

	var _CUSTOM_FONT = {"name":"default","group":"default","phone":"default","mobile":"default"};


	//TODO 暂时放这里先吧，其实不太好
	//获取当前的主题配置
	var currentThemes = window.THEME_CONFIG;

	/**
	 * 绘制主题列表页面
	 */
	var drawPage = function() {
		var html = [];
		for (var k in currentThemes) {
			var _item = ITEM_HTML.replace(/%id%/g, k)
				.replace(/%sign_img%/g, k + "_img")
				.replace(/%sign_canvas%/g, k + "_canvas")
				.replace(/%name%/g, currentThemes[k].name)
				.replace(/%width%/g, currentThemes[k].width)
				.replace(/%height%/g, currentThemes[k].height);

			html.push(_item);
		}

		$("#theme_list").html(html);

		//渲染所有页面上的签名档
		renderAllSign();
	}

	/** 渲染所有的签名档 */
	var renderAllSign = function() {
		for (var k in currentThemes) {
			renderSign(k);
		}
	}

	/**
	 * 渲染签名档
	 * @param {String} themeId 主题id
	 */
	var renderSign = function renderSign(themeId) {
		// console.log("render:" + themeId);
		var canvas = document.getElementById(themeId + "_canvas");
		var context = canvas.getContext("2d");

		var img = new Image();

		//背景图片加载完成，开始填充canvas
		img.onload = function() {
			(_drawSign.bind(this))(context, currentThemes[themeId]);

			//显示预览图
			var _preview = document.getElementById(themeId + "_img");
			_preview.src = canvas.toDataURL("image/png");
			_preview.title = "size:" + canvas.width + "x" + canvas.height;
		}

		//初始化背景图片
		img.src = currentThemes[themeId].bg;
	}

	/**
	 * 绘制签名档
	 * @param  {context} ctx   画布的内容区
	 * @param  {Object} theme 主题配置
	 */
	var _drawSign = function drawSign(ctx, theme) {
		theme._text = theme._text || {};

		//绘制背景图片
		ctx.drawImage(this, 0, 0, this.width, this.height);

		//绘制名称
		theme.textStyle.name && _fillText(ctx, $("#rtx_input").val(), theme, "name");

		//绘制团队名称
		//var w = ctx.measureText(name).width;
		theme.textStyle.group && _fillText(ctx, $("#group_input").val(), theme, "group");

		//绘制电话号码
		theme.textStyle.phone && _fillText(ctx, $("#phone_input").val(), theme, "phone");

		//绘制手机号码
		theme.textStyle.mobile && _fillText(ctx, $("#mobile_input").val(), theme, "mobile");

		theme.textStyle.address && _fillText(ctx, $("#address_input").val(), theme, "address");
	}

	/**
	 * 填充文字
	 * @param  {context} ctx    canvas context 2d 内容
	 * @param  {string} text   填充文字
	 * @param  {Object} theme  主题
	 * @param  {string} textId 文本id
	 */
	var _fillText = function fillText(ctx, text, theme, textId) {
		var format = theme.textStyle[textId];
		var x = _fixPosition(ctx, theme, format.x, "x"),
			y = _fixPosition(ctx, theme, format.y, "y");

		format.filter = format.filter || "%value%";

		//setup font style
		var font = new Array(3);
		for (var k in format.font){
			//检测可用的规则，以及调整字体的组合顺序
			if (_FONTS_RULES[k]) {
				if (k == "family") {
					font[_FONTS_RULES[k]-1] = _CUSTOM_FONT[textId]=="default"?format.font[k]:_CUSTOM_FONT[textId];//
				}else{
					font[_FONTS_RULES[k]-1] = format.font[k];
				}
			}
		}

		ctx.font = font.join(" ").replace(/\x20+/g,"\x20");

		//fill color
		ctx.fillStyle = format.color;

		//fill text
		ctx.fillText(format.filter.replace(/%value%/,text), x, y);

		theme._text[textId] = text;
	}

	var _fixPosition = function(ctx, theme, value, pos) {
		if (typeof value == "number") {
			return value;
		} else {
			var _v = value.replace(/\%([^%]+)\%/g, function() {
				var textId = arguments[1];

				//setup font style
				ctx.font = theme.textStyle[textId].font;
				var _m = ctx.measureText(theme._text[textId]);

				return (pos == "x" ? _m.width : _m.height);
			});
			return eval(_v);
		}
	}

	/**
	 * DataURI转换成Blob格式
	 * @param  {string} dataURI  base64 的 data uri
	 * @param  {string} mimetype 需要输出的blob的mimetype格式
	 * @return {Blob}   大二进制数据块
	 */
	var convertDataURIToBlob = function convertDataURIToBlob(dataURI, mimetype) {
		//分割DataURI成 base64格式;
		var BASE64_HEADER = ';base64,';
		var base64Index = dataURI.indexOf(BASE64_HEADER) + BASE64_HEADER.length;
		var base64 = dataURI.substring(base64Index);

		//将已经被base64编码过的数据进行解码
		var raw = window.atob(base64); // more https://developer.mozilla.org/zh-CN/docs/DOM/window.atob
		var rawLength = raw.length;

		//编码成 8 位无符号整数值的类型化数组
		var uInt8Array = new Uint8Array(rawLength);
		for (var i = 0; i < rawLength; ++i) {
			uInt8Array[i] = raw.charCodeAt(i);
		}

		//返回blob对象
		return new Blob([uInt8Array], {
			type: mimetype
		}); // more https://developer.mozilla.org/zh-CN/docs/DOM/Blob
	}

	//初始化文本列表
	var initFontList = function(){
		var html = [];
		FONTS && FONTS.forEach(function(value){
			if (value == "-") {
				html.push('<li class="divider"></li>');
			}else{
				var _start = '<li class="'+(value=="default"?'active':'')+'"><a href="#'+value+'" font-family="'+value+'" style="font-family:'+(value=="default"?'':value)+';">'+(value=="default"?'使用主题自带':value)+'</a>';
				
				//TODO 暂时保留以后增加字体样式
				//_size = '<ul class="dropdown-menu"><li><a href="">12px</a></ul>';

				html.push(_start + '</li>');
			}
		});

		$('.font-list').html(html.join("")).on("click", function(e){
			var target = e.target;
			var family = target.getAttribute("font-family");
			if (family) {
				var _ct = e.currentTarget;
				var textId = _ct.getAttribute("for-field");
				_CUSTOM_FONT[textId] = family;
				renderAllSign();

				//异步去更新下拉列表
				setTimeout(function(){
					//去掉所有高亮标示
					$(_ct).children().removeClass("active");
					$(target).parent().addClass("active")
				},0);
			}
			e.preventDefault();
		});
	}

	//代码初始化入口
	$(document).ready(function init() {
		//初始化字体选择框
		initFontList();

		//绑定输入框的键盘事件
		$("#theme_config input").on("keyup", renderAllSign);

		//绑定主题列表的全局单击事件
		$("#theme_list").on("click", function(e) {
			var target = e.target;
			var canvasId = target.getAttribute("canvas_id");

			//判断对象是否是按钮
			if (canvasId) {
				var canvas = document.getElementById(canvasId);

				//把base64转换成blob
				var blob = convertDataURIToBlob(canvas.toDataURL("image/png"), "image/png");
				target.href = URL.createObjectURL(blob); // more http://updates.html5rocks.com/2011/08/Downloading-resources-in-HTML5-a-download

				//5秒后释放 URL 以节约内存
				setTimeout(function() {
					URL.revokeObjectURL(blob);
				}, 5000);
			}
		});

		drawPage();
	});
})();