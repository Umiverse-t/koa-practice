const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const koaRouter = require('koa-router')

const views = require('koa-views')

const app = new Koa()
const render = views(path.join(__dirname, './views'), {
  map: {
    html: 'swig'
  }
})

const posts = []
const router = koaRouter()


app.use(logger())
app.use(render)
app.use(koaBody())

// router의 routes가 미들웨어로 사용된다.
// 정확하진 않치만 switch문 처럼 되어있지 않을까??
// 내부적으로 ['/', '/post/new' ...] 어레이를 가지고 순차적으로 비교하는 미들웨어
app.use(router.routes())


// create middleware
const show = async (ctx) => {
  const id = ctx.params.id
  const post = posts[id]
  if (!post) {
    ctx.throw('404', 'invalid post id')
  }
  await ctx.render('show', {
    post
  })
}

const add = async (ctx) => {
  await ctx.render('new')
}

const list = async (ctx) => {
  await ctx.render('list', {
    posts
  })
}

const create = async (ctx) => {
  const post = ctx.request.body
  const id = posts.push(post) - 1
  post.create_at = new Date()
  post.id = id
  ctx.redirect('/')
}


// router에 route를 등록하다
// list, add, show, create ... = middleware
// app.use(middleware) => (ctx, next)
// koa는 배관공 = 사용되려면 반드시 app.use()를 통과한다 (=pipe 같은 느낌)
router.get('/', list)
.get('/post/new', add)
.get('/post/:id', show)
.post('/post', create)

if (!module.parent) {
  app.listen(8081)
}


module.exports = app