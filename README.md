### 基本环境

```
python 3.10
node.js v22（去官网下载长期支持板版即可）
```

### 安装依赖

在根目录下运行：

```
npm install
pip install fastapi uvicorn[standard]
pip install python-multipart
```

### 项目启动

在根目录下运行：

```
npm run dev
```

在server目录下运行：

```
python -m uvicorn main:app --reload
```

### 路由说明

不同的页面对应不同的.vue文件，比如选择病理类型页面，在浏览器的路由是``http://localhost:5173/type``，查看`router/index.js`，注意到：

```js
import PathologyType from '../components/PathologyType.vue'

{ path: '/type', component: PathologyType },
```

就说明这个页面对应的是`components`文件夹下的`PathologyType.vue`文件

### 服务端说明

服务端是用python写的，测试服务端的功能，在上传图片界面，选择上传一个图片，然后浏览器会弹出弹框显示文件名，然后，在`server/upload`文件夹下，会出现上传的图片
