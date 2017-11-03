# light-cms-front

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# TODO_LIST
1. add login Verification (material-system authoriza.js and getUserInfo before load /index, use koa-session key from ./config.js)[completed]
2. change nos upload API to nos-node-sdk and add server side nos API[completed]
3. tplList pagination [completed]
4. markdown upload image, image's path to url [completed]
5. use hash to be tplId or pageId? [completed]
6. login UI: http://2.zhangjinxin.sinaapp.com/[completed]
7. when getUserInfo, Decrypt user cookie . when toggle login, layout is Confused, check isLogin field[completed]
8. add openId to login
9. encapsulate service API to make api cleaner [completed]
10.add interceptor to charge isLogin (optional)
11.add 404 page