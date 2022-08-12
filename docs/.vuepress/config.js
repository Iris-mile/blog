// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/avatar.jpg',
    // navbar: false,
    sidebar: {
      '/pageA/':[
        {
          title: 'Group 1',   // 必要的
          // path: '/pageA/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            {title:'pageA1',path:'pageA1'},
            {title:'pageA2',path:'pageA2'},
            {title:'pageA3',path:'pageA3'},
          ]
        },
        {
          title: 'Group 2',
          children: [ /* ... */ ],
          initialOpenGroupIndex: -1 // 可选的, 默认值是 0
        }
      ],
      '/pageB/':[
        'pageB1',
        'pageB2',
        'pageB3',
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
  }
}