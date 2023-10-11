import RatingService from '../service/rating.service.js';
import express from 'express';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
      const result = await RatingService.addRating(req.body);
     if(result.messageCode == 409){
        res.status(409).send(result);
      }else  if(result.messageCode == 422){
        res.status(422).send(result);
      } else if(result.messageCode == 404){
        res.status(404).send(result);
      }else {
        res.status(200).send(result);
      }
    } catch (error) {
      return next(error);
    }
  
  });

  router.get('/', async (req, res, next) => {
    try {
      const result = await RatingService.getAll(req.body);
      res.status(200).send(result);
    } catch (error) {
      return next(error);
    }
  
  });
  
  router.get('/average', async (req, res, next) => {
    try {
      const result = await RatingService.getAvg();
      res.status(200).send(result);
    } catch (error) {
      return next(error);
    }
  
  });
export default router;
