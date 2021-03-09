import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { AppError } from "../error/AppEror";
import { SurveyRepository } from "../repository/SurveyRepository";
import { SurveyUserRepository } from "../repository/SurveyUserRepository";
import { UserRepository } from "../repository/UserRepository";
import NotificationService from "../service/NotificationService";

class NotificationController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;
    console.log(email);

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new AppError("User does not exists");
    }

    const survey = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      throw new AppError("Survey does not exists!");
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlreadyExists = await SurveyUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await NotificationService.execute(email, survey.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    // save data from table surveyUser
    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveyUserRepository.save(surveyUser);
    // send notification to user - email
    variables.id = surveyUser.id;

    await NotificationService.execute(email, survey.title, variables, npsPath);

    return response.json(surveyUser);
  }
}

export { NotificationController };