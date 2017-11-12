const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()

app.use(koaBody({
  jsonLimit: '1kb',
}))

// body = REQUEST BODY
app.use(async (ctx) => {
  const body = ctx.request.body
  if (!body.name) { ctx.throw(400, 'name required')}
  ctx.body = {
    name: body.name.toUpperCase()
  }
})

if (!module.parent) {
  app.listen(8081)
}


module.exports = app