const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token, bookId;

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

    describe('/POST book', () => {
        it('it should POST a book', (done) => {
            const book = {
                title: 'Hayatın Kaynağı',
                author_id: '5ba60b4b645a021a3334a22b',
                category: 'Roman',
                year: 1990,
                lang: 'tr'

            };
            chai.request(server)
                .post('/api/book')
                .send(book)
                .set('x-access-token', token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('author_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('year');
                    res.body.should.have.property('lang');
                    bookId = res.body._id;
                    done();
                })
        });
    });

    describe('/GET/:book_id book', () => {
        it('it should GET a book by the given id', (done) => {
            chai.request(server)
                .get('/api/book/'+bookId)
                .set('x-access-token', token)
                .end((err,res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('author_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('year');
                    res.body.should.have.property('lang');
                    res.body.should.have.property('_id').eql(bookId);
                    done();
                });
        });
    });

    describe('/PUT/:book_id book', () => {
        it('it should UPDATE a book given by id', (done) => {
            const book = {
                title: 'Beyaz Zambaklar Ülkesinde',
                author_id: '5ba60b4b645a021a3334a22b',
                category: 'Eğitim',
                year: 1950,
                lang: 'tr'
            };
            chai.request(server)
                .put('/api/book/'+bookId)
                .send(book)
                .set('x-access-token', token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(book.title);
                    res.body.should.have.property('author_id').eql(book.author_id);
                    res.body.should.have.property('category').eql(book.category);
                    res.body.should.have.property('year').eql(book.year);
                    res.body.should.have.property('lang').eql(book.lang);
                    done();
                })
        });
    });

    describe('/DELETE/:book_id book', () => {
        it('it should DELETE a book given by id', (done) => {
            chai.request(server)
                .delete('/api/book/'+bookId)
                .set('x-access-token', token)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(true);
                    done();
                });
        });
    });
});