Signature!
==========

![m](https://raw.github.com/puterjam/Signature-/master/img/apple-touch-icon-114-precomposed.png)

#### 简介

**Signature!** HTML5版本的在线签名档工具。由腾讯SNS应用部前端团队提供支持。

****

#### 版本以及作者信息
**版本:** V0.42

**作者:** FrontEnd Team from Tencent SNS department.
****

#### 使用说明
本地直接访问`index.html`即可， 当然你也可以上传到服务器。

我们不提供模板制作的支持。
****

#### 模板制作
提供图片的DataURI或者具体的图片路径（图片路径需要避免跨域问题）。

添加新模板在 `js/themes.js` 中编辑即可。模板范例如下:

	/**
	 * 主题范例
	 * @type {Object}
	 */
	var THEME2 = {
		bg: 'data:image/png;base64,iVBORw0KGgoAAA...',
		width: 680,
		height: 140,
		name: "纯白",
		textStyle: {
			name: {
				font: "bold 28px Ubuntu",
				x: 169,
				y: 48,
				color: "#4C4C4C"
			},
			group: {
				font: "16px Ubuntu",
				x: "175 + %name%",
				y: 48,
				color: "#FF6A00"
			},
			phone: {
				font: "12px Ubuntu",
				x: 188,
				y: 89,
				color: "#666666"
			},
			mobile: {
				font: "12px Ubuntu",
				x: 358,
				y: 89,
				color: "#666666"
			}
		}

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