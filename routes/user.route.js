const UserService = require('../service/user.service');
const responseCode = require('../constants/responseCode');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const result = await UserService.addUser(req.body);
    if(result.messageCode == 200){
     res.status(200).send(result);
    }else if(result.messageCode == 409){
      res.status(409).send(result);
    }else if(result.messageCode == 422){
      res.status(422).send(result);
    }
  } catch (error) {
    return next(error);
  }

});


router.get('/', async (req, res, next) => {
  try {
    const result = await UserService.getAll(req.query);
    res.status(200).send(result);
  } catch (error) {
    return next(error);
  }

});


router.get('/:id', async (req, res, next) => {
  try {
    const result = await UserService.findById(req.params.id);
    if(result.messageCode == 200){
      res.status(200).send(result);
    }else if (result.messageCode == 422){
      res.status(422).send(result);
    }
  } catch (error) {
    return next(error);
  }

});

router.delete('/:id',async (req,res,next) => {
  try{
    const result = await UserService.deleteById(req.params.id);
    if(result.messageCode == 200){
      res.status(200).send(result);
    }else if (result.messageCode == 422){
      res.status(422).send(result);
    }
  }catch (error) {
    return next(error);
  }
});

router.put('/:id',async (req,res,next) => {
  try{
    const update = req.body;
    const result = await UserService.updateById(req.params.id,update);
    if(result.messageCode == 200){
      res.status(200).send(result);
     }else if(result.messageCode == 409){
       res.status(409).send(result);
     }else if(result.messageCode == 404){
       res.status(404).send(result);
     }else if(result.messageCode == 422){
      res.status(422).send(result);
    }
  }catch (error) {
    return next(error);
  }
});

module.exports = router;
