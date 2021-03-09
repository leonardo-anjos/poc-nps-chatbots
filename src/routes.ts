import { Router } from 'express';
import { UserController } from './controller/UserController';
import { SurveyController } from './controller/SurveyController';
import { AnswerController } from './controller/AnswerController';
import { NotificationController } from './controller/NotificationController';
import { NpsController } from './controller/NpsController';

const router = Router();

const userController = new UserController();
router.post('/user', userController.create);
router.get('/user', userController.listAll);

const surveyController = new SurveyController();
router.post('/survey', surveyController.create);
router.get('/survey', surveyController.listAll);

const answerController = new AnswerController();
router.get('/answers:/value', answerController.execute);

const notificationController = new NotificationController();
router.post("/notification/send", notificationController.execute);

const npsController = new NpsController();
router.get("/nps/:survey_id", npsController.execute);

export { router };