const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  next()
  ctx.body = {
    user1: 'jiseugn',
    user2: 'toshi'
  }
})

app.use((ctx) => {
  ctx.body = '<p>똥멍청~</p>'
})

app.use((ctx) => {
  ctx.body = '<p>똥멍d청~</p>'
})

app.listen(8081)


