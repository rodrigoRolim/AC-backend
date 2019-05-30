import Graduation from '../models/graduation'
export default {
  isExistRelations: (req, res, next) => {
    try {
      const resp = Graduation.find({ department: req.params.id });
      console.log(resp.length);
      if (resp.length > 0) {
        res.status(403).send('o departamento tem relações com cursos');
        next('false');
      }
      else {
        next();
      }
    }
    catch (err) {
      next();
    }
  } 
}