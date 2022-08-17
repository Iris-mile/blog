const dayjs = require('dayjs');
const secret = require('./confidential');

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
      clientId: secret.clientId,
      clientSecret:secret.clientSecret,
      autoCreateIssue:true
    },
    '@vuepress/back-to-top':true
}