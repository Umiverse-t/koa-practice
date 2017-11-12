// app 서버가 request에 대해 대응을 잘 하고 있는지 확인하기 위해 사용
// supertest는 포트를 따로 열지 않고 앱 내부에서 client-server로 통신을 확인할 수 있게 도와줌

const app = require('./app')
const request = require('supertest').agent(app.listen())

describe('Body parsing', () => {
  describe('POST /uppercase', () => {
    describe('with JSON', () => {
      it('should work', (done) => {
        request
          .post('/uppercase')
          .send({
            name: 'tobi'
          })
          .expect(200)
          .expect({
            name: 'TOBI'
          }, done)
      })
    })

    describe('with urlencoded', () => {
      it('should work', (done) => {
        request
          .post('/uppercase')
          .send('name=tj')
          .expect(200)
          .expect({
            name: 'TJ'
          }, done)
      })
    })

    describe('when no name is sent', () => {
      it('should 400', (done) => {
        request
          .post('/json')
          .send('age=10')
          .expect(400, done)
      })
    })

    describe('when length > limit', () => {
      it('should 413', (done) => {
        request
          .post('/uppercase')
          .send({
            name: Array(5000).join('a')
          })
          .expect(413, done)
      })
    })
  })
})