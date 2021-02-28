import { Router } from 'express';
import { UserController } from './controller/UserController';
import { SurveyController } from './controller/SurveyController';

const router = Router();

const userController = new UserController();
router.post('/user', userController.create);
router.get('/user', userController.listAll);

const surveyController = new SurveyController();
router.post('/survey', surveyController.create);
router.get('/survey', surveyController.listAll);



export { router };