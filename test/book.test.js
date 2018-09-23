const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token;

describe('/api/book tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'deneme', password: '123456'})
            .end((err, res) => {
               token = res.body.token;
               done();
            });
    });

    describe('/GET books', () => {
       it('it should GET all the books', (done) => {
           chai.request(server)
               .get('/api/book')
               .set('x-access-token', token)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('array');
                   done();
               });
        })
    });
});