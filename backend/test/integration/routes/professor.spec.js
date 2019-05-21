import Professor from "../../../src/models/professor";
import jwt from 'jsonwebtoken'

describe('Routes: professor', () => {
  let request
  let token = jwt.sign({ defaultId }, 'mysecret', {
    expiresIn: 86400
  })
  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  const defaultId = '56cb91bdc3464f14678934ca'
  const defaultProfessor = {
    name: 'roger jhon',
    siape: 'a12345',
    email: 'roger@email.com',
    password: '12345',
    departament: '5ce368dd06edcb3fabd6cea3',
    admin: false
  }
  const newDefaultProfessor = {
    name: 'roger jhonn',
    siape: 'a123458',
    email: 'roger@email.com',
    password: '12345',
    departament: '5cd87c81f9aedcbd1bb3a57d',
    admin: false
  }
  const loginProfessor = {
    name: 'roger jhon',
    password: '12345'
  }
  const expectedProfessorUser = {
    _id: defaultId,
    name: 'roger jhon',
    siape: 'a123458',
    email: 'roger@email.com',
    departament: '5cd87c81f9aedcbd1bb3a57d',
    admin: false
  };
  beforeEach(() => {
    const professor = new Professor(defaultProfessor)
    professor._id = '56cb91bdc3464f14678934ca'
    return Professor.deleteMany({})
      .then(() => professor.save())
  })

  afterEach(() => Professor.deleteMany({}))

  describe('POST /professor/admin', () => {
    
    context('when posting an professor', () => {
      it('should return a new professor with status code 201', done => {
        const customId = '56cb91bdc3464f14678934ba'
        const newProfessor = Object.assign({}, {_id: customId, __v: 0}, newDefaultProfessor)
        const expectedSavedProfessor = {
          _id: '56cb91bdc3464f14678934ba',
          admin: false, 
          departament: '5cd87c81f9aedcbd1bb3a57d',
          email: 'roger@email.com',
          name: 'roger jhonn',
          siape: 'a123458',
        }

        request
          .post('/professor/admin')
          .set('authorization', token)
          .send(newProfessor)
          .end((err, res) => {
            console.log(res.body)
            expect(res.status).to.eql(201)
            // expect(res.body).to.eql(expectedSavedProfessor)
            done(err)
          })
      })
    })
    context('when reading all professors', () => {
      it('should return an list of professors with', done => {
        request
        .get('/professor/admin')
        .set('authorization', token)
        .end((err, res) => {
          // expect(res.body).to.eql([expectedProfessorUser]);
          done(err);
        });
      })
    })
  })
  describe('POST /professor/login', () => {
    context('when login professor', () => {
      it('should return a token of authorization', done => {
        request
          .post('/professor/login')
          .send(loginProfessor)
          .end((err, res) => {
            expect(res.body.access.auth).to.be.true
            done(err)
          })
      })
    })
  })
  describe('PUT /professor/admin/:id', () => {
    context('when editing a professor', () => {
      it('should update the professor and return 200 as status code', done => {
        const customProfessor = {
          name: 'Custom name'
        };
        const updatedProfessor = Object.assign({}, customProfessor, defaultProfessor)

        request
          .put(`/professor/admin/${defaultId}`)
          .set('authorization', token)
          .send(updatedProfessor)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  })
  describe('PUT /professor/admin/unset/graduation/:id', () => {
    context('when unset graduation reference into professor', () => {
      it('should unset graduation and return 200 as status code', done => {
        const idGraduation = defaultProfessor.graduation
        let updatedProfessor = defaultProfessor
        updatedProfessor.graduation = undefined
        
        request
          .put(`/professor/admin/unset/graduation/${idGraduation}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })
})
