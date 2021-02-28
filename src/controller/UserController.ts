import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';
class UserController {

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const usersRepository = getCustomRepository(UserRepository);
    
    const userAlreadyExists = await usersRepository.findOne({ email });
    
    if (userAlreadyExists) {
      return res.status(400).json({
        error: 'User already exists!'
      })
    }

    const user = usersRepository.create({ name, email });

    await usersRepository.save(user);

    return res.status(201).json(user);
  }

  async listAll(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UserRepository);
    
    const users = await usersRepository.find();
    
    return res.status(200).json(users);
  }

}

export { UserController };
