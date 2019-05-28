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
    department: '5ce368dd06edcb3fabd6cea3',
    type_user: 'professor'
  }
  const newDefaultProfessor = {
    name: 'roger jhonn',
    siape: 'a123458',
    email: 'roger@email.com',
    password: '12345',
    type_user: 'professor',
    department: '5cd87c81f9aedcbd1bb3a57d'
  } 
  const expectedProfessorUser = {
    _id: defaultId,
    name: 'roger jhon',
    siape: 'a12345',
    email: 'roger@email.com',
    type_user: 'professor',
    department: '5ce368dd06edcb3fabd6cea3'
  }
  const loginProfessor = {
    name: 'roger jhon',
    password: '12345'
  }
  beforeEach(() => {
    const professor = new Professor(defaultProfessor)
    professor._id = '56cb91bdc3464f14678934ca'
    return Professor.deleteMany({})
      .then(() => professor.save())
  })

  afterEach(() => Professor.deleteMany({}))

  describe('POST /professor/add', () => {
    
    context('when posting an professor', () => {
      it('should return a new professor with status code 201', done => {
        const customId = '56cb91bdc3464f14678934ba'
        const newProfessor = Object.assign({}, {_id: customId}, newDefaultProfessor)

        const expectedSavedProfessor = {
          _id: '56cb91bdc3464f14678934ba',
          name: 'roger jhonn',
          siape: 'a123458',
          email: 'roger@email.com',
          type_user: 'professor',
          department: '5cd87c81f9aedcbd1bb3a57d'
        }

        request
          .post('/professor/add')
          .set('authorization', token)
          .send(newProfessor)
          .end((err, res) => {
            expect(res.status).to.eql(201)        
            expect(res.body).to.eql(expectedSavedProfessor)
            done(err)
          })
      })
    })
    context('when reading all professors', () => {
      it('should return an list of professors with', done => {
        request
        .get('/professor/all')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.eql([expectedProfessorUser]);
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
            expect(res.body.auth).to.be.true
            done(err)
          })
      })
    })
  })
  describe('PUT /professor/update/:id', () => {
    context('when editing a professor', () => {
      it('should update the professor and return 200 as status code', done => {
        const customProfessor = {
          name: 'Custom name'
        };
        const updatedProfessor = Object.assign({}, customProfessor, defaultProfessor)

        request
          .put(`/professor/update/${defaultId}`)
          .set('authorization', token)
          .send(updatedProfessor)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  })
})
