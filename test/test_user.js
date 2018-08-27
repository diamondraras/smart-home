const mongoose = require('mongoose');
const User = require('../models/user');

//Require the dev dependencies
const chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
const BASE_URL = '/v1';
let should = chai.should()

chai.use(chaiHttp);

// describe('Users', () => {
//     before((done) => {
//         User.remove({}, (err) => {
//             done()
//         })
//     })
// })
describe('Test User HTTP', () => {
    //Register a test user
    let test = {
        email: "admin@mail.com",
        password: "password"
    }
    let token;
    let user;
    before((done) => {
        User.remove({}).then(() => {
            done();
        });
    })

    it('it should register a test user', (done) => {
        chai.request(server)
        .post(BASE_URL + '/users')
        .send(test)
        .end((err, res) => {
            res.should.have.status(201)
            done()
        })
    });
    it('it should log in the user', (done) => {
        chai.request(server)
            .post(BASE_URL + '/users/login')
            .send(test)
            .end((err, res) => {
                res.body.should.have.property('token')
                token = res.body.token;
                user = res.body.user;
                done();
            })
    })
    it('it should not GET a user without authorization', (done) => {
        chai.request(server)
            .get(BASE_URL + '/users')
            .end((err, res) => {
                res.should.have.status(401)
                res.should.have.property('text').eql('Unauthorized');
                done()
            })
    })
    it('it should GET the user with authorization', (done) => {

        chai.request(server)
            .get(BASE_URL + '/users')
            .set('Authorization',token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('user')
                done()
            })
    })
    it('it should GET the user\'s profil', (done) => {

        chai.request(server)
            .get(BASE_URL + '/users/profil')
            .set('Authorization',token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('profil')
                done()
            })
    })
    it('it should GET the user\'s profil', (done) => {

        chai.request(server)
            .get(BASE_URL + '/users/profil')
            .set('Authorization',token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('profil')
                done()
            })
    })
    it('it should GET the user\'s clap list', (done) => {

        chai.request(server)
            .get(BASE_URL + '/users/profil/getClapList')
            .set('Authorization',token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('clapList')     
                done()
            })
    })
    it('it should GET the user\'s following list', (done) => {

        chai.request(server)
            .get(BASE_URL + '/users/profil/getFollowingList')
            .set('Authorization',token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('followingList')     
                done()
            })
    })
    it('it should GET the user\'s follower list', (done) => {

        chai.request(server)
            .get(BASE_URL + '/users/profil/getFollowerList')
            .set('Authorization',token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('followerList')     
                done()
            })
    })
    it('it should POST the user\'s photo', (done) => {

        chai.request(server)
            .post(BASE_URL + '/users/profil/photo')
            .set('Authorization',token)
            .set('Content-Type', 'multipart/form-data')
            .field('file', './image.png', 'image.png')
            .end((err, res) => {
                res.should.have.status(200)
                console.log(res.body);
                
                // res.body.should.have.property('profil')     
                done()
            })
    })

})
// describe('Log a test user', function () {
//     let token;
//         //Register the test user
//         chai.request(app)
//                 .post(BASE_URL + '/users')
//                 .send({
//                     email: 'test001@test.com',
//                     password: 'password'
//                 })
//                 .set('Accept', 'application/json')
//                 .then(response =>{
//                     response.body.should.have.property('token')
//                     token = response.body.token;
//                 })

//     // xit('Test', function() {
//     //     request(app)
//     //     .get(BASE_URL + '/users')
//     //     .set('Accept', 'application/json')
//     //     .expect(200)
//     //     .then(response => {
//     //         if(response == 'Unauthorized')
//     //     })
//     // })

//     it.only('Register a test user',function() {
//         return request(app)
//                 .post(BASE_URL + '/users')
//                 .send({
//                     email: 'test06@test.com',
//                     password: 'password'
//                 })
//                 .set('Accept', 'application/json')
//                 .expect(201)
//                 .then(response =>{
//                     response.body.should.have.property('token')
//                 })
//         // should(err).not.exist();
//         // console.log(response);
//     })
// })
