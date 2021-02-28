import { Router } from 'express';
import { UserController } from './controller/UserController';
import { SurveyController } from './controller/SurveyController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

router.post('/user', userController.create);
router.post('/survey', surveyController.create);

export { router };