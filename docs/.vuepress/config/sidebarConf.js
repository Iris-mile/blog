module.exports =  {
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
}