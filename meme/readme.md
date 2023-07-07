# koishi-plugin-meme

[![npm](https://img.shields.io/npm/v/koishi-plugin-meme?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-meme)

关于群399899914成员logier(785189653)的表情包思路插件探索方向

这是一个有关于表情包图片的插件

使用了来自`https://raw.githubusercontent.com/zhaoolee/ChineseBQB/master/chinesebqb_github.json`的表情包地址

也可以使用其他地方的链接

## 使用

只要符合以下json格式就行
```json
{
  "status": 1000,
  "info": "ChineseBQB的Github数据源",
  "data": [
    {
      "category": "分类1",
      "url": "图片地址1"
    },
    {
      "category": "分类2",
      "url": "图片地址2"
    }
  ]
}
```

其中，分类1可以使用英文或中文，默认会去除bqb、数字和其他无关字符，如果有中文，会优先使用中文的

例如
```js
const test1 = "funny快乐" // 原category
// 替换后变为 "快乐"

const test1 = "happy" // 原category
// 替换后变为 "happy"
```

## 开发

欢迎有趣的想法进行实践，自行pr
