import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from 'src/auth/input/createUser.dto';
import { AuthJwtService } from 'src/auth/services/authJwt.service';

import { User } from 'src/users/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @Inject(AuthJwtService) private readonly jwtService: AuthJwtService,
  ) {}

  async findOne(username: string): Promise<User> {
    const result = await this.userModel.findOne({ username });
    return result;
  }
  async addUser({ username, password, email }: createUserDto) {
    const newUser = new this.userModel();
    newUser.username = username;
    newUser.password = await this.jwtService.hashPassword(password);
    newUser.email = email;
    const result = await newUser.save();
    return {
      ...result,
      token: this.jwtService.getTokenForUser(newUser),
    };
  }
}
