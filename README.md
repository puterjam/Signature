Signature!
==========

![m](https://raw.github.com/puterjam/Signature-/master/img/apple-touch-icon-114-precomposed.png)

#### 简介

**Signature!** HTML5版本的在线签名档工具。由腾讯SNS应用部前端团队提供支持。

****

#### 版本以及作者信息
**版本:** V0.5

**作者:** FrontEnd Team from Tencent SNS department.
****

#### 使用说明
本地直接访问`index.html`即可， 当然你也可以上传到服务器。

我们不提供模板制作的支持。
****

#### 模板制作
提供图片的DataURI或者具体的图片路径（图片路径需要避免跨域问题）。

添加新模板在 `js/themes.js` 中编辑即可。模板范例如下:

```javascript
	/**
	 * 主题范例
	 * @type {Object}
	 */
	var THEME2 = {
		bg: 'data:image/png;base64,iVBORw0KGgoAAA...',
		width: 503,
		height: 120,
		name: "亮蓝",
		textStyle: {
			name: {
				font:{
					family:"Ubuntu",
					size:"21px",
					weight:"normal", //normal bold lighter... [Optional]
					style:"normal" //normal italic oblique [Optional]
				},
				x: 149,
				y: 34,
				color: "#ffffff"
			},
			group: {
				font: {
					family:"Ubuntu",
					size:"12px"
				},
				x: "155 + %name%",
				y: 34,
				color: "#ffc73a"
			},
			phone: {
				font: {
					family:"Ubuntu",
					size:"13px"
				},
				x: 169,
				y: 73,
				color: "#ffffff"
			},
			mobile: {
				font: {
					family:"Ubuntu",
					size:"13px"
				},
				x: 352,
				y: 73,
				color: "#ffffff"
			}
		}
	};
```
****

#### 更新历史
#####0.5
1. 修改模板 `font` 字段的规则，由原来的字符串改成对象。
2. 支持更换模板字体
3. 增加GitHub的入口
4. 优化代码结构，让代码看起来更加美观

#####0.4
1. 基本功能完成
2. 可以输出主题
3. 上传到GitHub


****

#### HTML5技术支持
使用到的H5的技术细节
>1. <a href="https://developer.mozilla.org/en-US/docs/HTML/Canvas" target="_blank">Canvas</a>
2. <a href="https://developer.mozilla.org/zh-CN/docs/DOM/window.atob" target="_blank">window.atob</a>
3. <a href="https://developer.mozilla.org/zh-CN/docs/DOM/Blob" target="_blank">Blob</a>
4. <a href="https://developer.mozilla.org/zh-CN/docs/DOM/window.URL.createObjectURL" target="_blank">URL.createObjectURL</a>
5. <a href="https://developer.mozilla.org/en-US/docs/JavaScript/Typed_arrays" target="_blank">JavaScript typed arrays</a>
6. <a href="http://updates.html5rocks.com/2011/08/Downloading-resources-in-HTML5-a-download" target="_blank">a[download]</a>
7. <a href="http://www.google.com/fonts/" target="_blank">Google Fonts</a>

****

#### LICENSE
http://www.apache.org/licenses/LICENSE-2.0.txt
