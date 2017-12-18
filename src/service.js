import _ from 'pro/lib/util';

const ORIGIN = _.$isDev() ? 'http://localhost:3000' : 'http://light-cms-server.kaola.com';
const Service = {
    // upload: `${ORIGIN}/upload`,
	upload: `https://jsonplaceholder.typicode.com/posts/`,
    getUserInfo: `${ORIGIN}/login/getUserInfo`,
    authorizeCAS: `${ORIGIN}/login/authorizeCAS`,
    signOut: `${ORIGIN}/login/signOut`,
    signIn: `${ORIGIN}/login/signIn`,
    updateContent: `${ORIGIN}/preview/updateContent`,
    previewH5: `${ORIGIN}/preview/h5`,
    previewPC: `${ORIGIN}/preview/PC`,
    getContentById: `${ORIGIN}/editor/getContentById`,
    addOrUpdateContent: `${ORIGIN}/editor/addOrUpdateContent`,
    getTplItemById: `${ORIGIN}/tpl/getTplItemById`,
    addOrUpdateTpl: `${ORIGIN}/tpl/addOrUpdateTpl`,
    getTplTotal: `${ORIGIN}/tpl/getTotal`,
    getTplList: `${ORIGIN}/tpl/getTplList`,
    getPageById: `${ORIGIN}/page/getPageById`,
    addOrUpdatePage: `${ORIGIN}/page/addOrUpdatePage`,
    addOrUpdateFile: `${ORIGIN}/page/addOrUpdateFile`,
    getPageTotal: `${ORIGIN}/page/getTotal`,
    getPageList: `${ORIGIN}/page/getPageList`,
    removePage: `${ORIGIN}/page/removePage`
};

export { ORIGIN, Service };
