const dayjs = require('dayjs');
module.exports ={
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
      owner: 'Iris-mile',
      repo: 'blog',
      clientId: '6d3bb59f83ee73fb0d84',
      clientSecret: '5102a13d042caf8969ec380020f191272bec1bc2',
      autoCreateIssue:true
    },
    '@vuepress/back-to-top':true
}