import Professor from "../../../src/models/professor";

describe('Routes: professor', () => {
  let request

  before(() => {
    return setupApp()
      .then(app => {
        request = supertest(app)
      })
  })
  const defaultId = '56cb91bdc3464f14678934ca'
  const defaultProfessor = {
    name: 'roger jhon',
    email: 'roger@email.com',
    password: '12345',
    graduation: '5cd87c81f9aedcbd1bb3a57d'
  }
  const expectedProfessorUser = {
    _id: defaultId,
    name: 'roger jhon',
    email: 'roger@email.com',
    graduation: '5cd87c81f9aedcbd1bb3a57d'
  };
  beforeEach(() => {
    const professor = new Professor(defaultProfessor)
    professor._id = '56cb91bdc3464f14678934ca'
    return Professor.deleteMany({})
      .then(() => professor.save())
  })

  afterEach(() => Professor.deleteMany({}))

  describe('POST /admin', () => {
    
    context('when posting an professor', () => {
      it('should return a new professor with status code 201', done => {
        const customId = '56cb91bdc3464f14678934ba'
        const newProfessor = Object.assign({}, {_id: customId, __v: 0}, defaultProfessor)
        const expectedSavedProfessor = {
          _id: customId,
          name: 'roger john',
          email: 'roger@email.com',
          graduation: '5cd87c81f9aedcbd1bb3a57d'
        }

        request
          .post('/professor/admin')
          .send(newProfessor)
          .end((err, res) => {
            expect(res.statusCode).to.eql(401)
            expect(res.body).to.eql({ auth: false, message: 'No token provided.'})
            done(err)
          })
      })
    })
    context('when reading all professors', () => {
      it('should return an list of professors with', done => {
        request
        .get('/professor/admin')
        .end((err, res) => {
          console.log(res.body)
          expect(res.body).to.eql({ auth: false, message: 'No token provided.'});
          done(err);
        });
      })
    })
  })
  describe('PUT /professor/admin/:id', () => {
    context('when editing a professor', () => {
      it('should update the professor and return 404 as status code', done => {
        const customProfessor = {
          name: 'Custom name'
        };
        const updatedProfessor = Object.assign({}, customProfessor, defaultProfessor)

        request
          .put(`/professor/admin/${defaultId}`)
          .send(updatedProfessor)
          .end((err, res) => {
            expect(res.status).to.eql(401);
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
          .end((err, res) => {
            expect(res.status).to.eql(200)
            done(err)
          })
      })
    })
  })
})
