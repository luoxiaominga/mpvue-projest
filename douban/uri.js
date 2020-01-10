const URIS = [
  // 'https://douban.uieee.com',
  // 'https://douban-api.uieee.com',
  'https://douban-api.now.sh',
  'https://douban-api.zce.now.sh',
  'https://douban-api-git-master.zce.now.sh'
]

module.exports.URI = URIS[Math.floor(Math.random() * URIS.length)]
