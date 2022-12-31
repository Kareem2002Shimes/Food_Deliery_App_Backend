import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/users.model';
import { createUserDto } from '../input/createUser.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UsersService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}
  @Post()
  async create(
    @Body()
    userData: createUserDto,
  ) {
    if (userData.password !== userData.retypedPassword) {
      throw new BadRequestException('Passwords are not identical');
    }
    const existingUser = await this.userModel.findOne({
      username: userData.username,
      email: userData.email,
    });
    if (existingUser) {
      throw new BadRequestException('username or email are already taken');
    }
    return this.userService.addUser(userData);
  }
}
