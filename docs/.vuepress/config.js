// .vuepress/config.js
const headConf = require('./config/headConf');
const pluginsConf = require('./config/pluginsConf');
const navConf = require('./config/navConf');
const sidebarConf = require('./config/sidebarConf');

module.exports = {
  base:'/blog/',
  plugins: pluginsConf,
  title:'七天博客',
  head: headConf,
  themeConfig: {
    logo: '/assets/img/avatar.jpg',
    lastUpdated: '最近更新', // string | boolean
    // navbar: false,
    sidebar: sidebarConf,
    nav: navConf
  },

}