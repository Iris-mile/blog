

module.exports = [
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