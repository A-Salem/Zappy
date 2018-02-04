var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Tweets', function() {
  it('should list ALL tweets on /tweets GET');
  // it('should list a SINGLE tweet on /blob/<id> GET');
  // it('should add a SINGLE tweet on /blobs POST');
});

it('should list ALL tweets on /tweets GET', function(done) {
  chai.request(server)
    .get('/tweets')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
