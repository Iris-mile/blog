module.exports =  {
  // '/vue3/':[
  //   {
  //     title: 'GroupA 1',   // 必要的
  //     collapsable: false, // 可选的, 默认值是 true,
  //     sidebarDepth: 1,    // 可选的, 默认值是 1
  //     children: [
  //       '/vue3/',
  //       'pageA1',
  //       'pageA2',
  //       'pageA3'
  //     ]
  //   },
  //   {
  //     title: 'Group 2',
  //     sidebarDepth: 1,    // 可选的, 默认值是 1
  //     collapsable: false, // 可选的, 默认值是 true,
  //     children: [
  //       'page4',
  //       'page5'
  //     ],
  //     // initialOpenGroupIndex: -1 // 可选的, 默认值是 0
  //   }
  // ],
  '/project/':[
    {
      title: '项目可用积累',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1,    // 可选的, 默认值是 1
      children: [
        '/project/',
        'request',
        'style',
        'picture',
        'css',
        'problems',
        // 'iframe',
        'theme',
        'vue2',
        'vuex',
        'class',
        'component'
      ]
    },
  ],
  '/vue3/course/':[
    {
      title: 'vue3课程知识',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1,    // 可选的, 默认值是 1
      children: [
        '/vue3/course/',
        'vite'
      ]
    },
  ],
  '/js/':[
    {
      title: 'js数据处理',   // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1,    // 可选的, 默认值是 1
      children: [
        '/js/',
        'arr',
        // 'pageB2',
      ]
    },
  ]
}