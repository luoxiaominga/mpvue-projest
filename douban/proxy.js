const Koa = require('koa')
const Router = require('koa-router')
const c2k = require('koa2-connect')
const proxy = require('http-proxy-middleware')
const URI = require('./uri').URI
const https = require('https')
const mysql = require('mysql');

const router = new Router()
router.get('/book/*',
  c2k(
    proxy({
      // target: 'https://api.douban.com/v2/movie',
      target: URI + '/v2',
      changeOrigin: true,
      headers: {
        // referer: 'https://www.douban.com',
        referer: 'https://developers.douban.com',
        'Content-Type': ''
      }
    })
  )
)

router.get('/addBook', async(ctx) => {
  const {isbn}=ctx.query
  if (isbn) {
    let url = URI + '/v2/book/isbn/' + isbn
    const bookinfo = await getBookData(url)
    let {id, title,author,publisher,summary,pubdate,image,images,isbn10,isbn13} = bookinfo
    author=JSON.stringify(author)
    images=JSON.stringify(images)
    var conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database:'myproject',
      port: 3306
    })
    conn.connect()
    let  addSql = `INSERT INTO books(Id,title,author,publisher,summary,pubdate,image,images,isbn10,isbn13) VALUES(?,?,?,?,?,?,?,?,?,?)`
    let  addData=[id,title,author,publisher,summary,pubdate,image,images,isbn10,isbn13]
    conn.query(addSql,addData, function(err, result) {
      if (err) throw err
      console.log('添加成功')
    })

    ctx.body={
      code:0,
      data:{
        bookinfo :bookinfo
      }
    }
  } else {
    console.log('没有isbn参数')
  }
})


function getBookData(url) {
  return new Promise((reslove, reject) => {
    https.get(url, function ( res) {
      var html = ''
      res.on('data', function (data) {
        html += data
      })
      res.on('end', function () {
        const bookinfo = JSON.parse(html)
        if (bookinfo) {
          reslove(bookinfo)
        }
        reject(bookinfo)
      })
    })
  })

}
const app = new Koa()
app.use(router.routes())

app.listen(3002, () => {
  console.log(`Server started on 3002`)
})
