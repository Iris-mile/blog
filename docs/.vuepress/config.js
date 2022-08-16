// .vuepress/config.js
const dayjs = require('dayjs');
module.exports = {
  base:'/blog/',
  plugins: {
    '@vuepress/last-updated':
      {
        transformer: (timestamp) => {
          dayjs.locale('zh-cn')
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm')
        }
      },
      '@vssue/vuepress-plugin-vssue': {
        // set `platform` rather than `api`
        platform: 'github-v4',
  
        // all other options of Vssue are allowed
        owner: 'iris-mile',
        repo: 'NAME_OF_REPO',
        clientId: '6d3bb59f83ee73fb0d84',
        clientSecret: '5102a13d042caf8969ec380020f191272bec1bc2',
        autoCreateIssue:true
      },
  },

  title:'七天博客',
  head: [
    ['meta', { name: 'keywords', content: 'vue,vue3' }],//配置网站Keywords
    ['meta', { name: 'author', content: '七天' }],//配置网站作者
    ['link', { rel: 'icon', href: '/favicon.ico' }],//配置网站Keywords
  ],
  themeConfig: {
    logo: '/assets/img/avatar.jpg',
    lastUpdated: '最近更新', // string | boolean
    // navbar: false,
    sidebar: {
      '/pageA/':[
        {
          title: 'GroupA 1',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            '/pageA/',
            'pageA1',
            'pageA2',
            'pageA3'
          ]
        },
        {
          title: 'Group 2',
          sidebarDepth: 1,    // 可选的, 默认值是 1
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            'page4',
            'page5'
          ],
          // initialOpenGroupIndex: -1 // 可选的, 默认值是 0
        }
      ],
      '/pageB/':[
        {
          title: 'GroupB',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            '/pageB/',
            'pageB1',
            'pageB2',
          ]
        },
      ]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'PageA', link: '/pageA/' },
      { text: 'PageB', link: '/pageB/' },
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [{ text: 'External', link: 'https://google.com' },{ text: 'BaiDu', link: 'https://baidu.com' }] },
          { text: 'Group2', items: [{ text: 'vuepress', link: '/about' },{ text: 'taobao', link: 'https://taobao.com' }] }
        ]
      }
      // { text: 'External', link: 'https://google.com' },
    ]
  },

}