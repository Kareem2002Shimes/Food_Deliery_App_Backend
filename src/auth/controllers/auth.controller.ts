import { Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthJwtService } from 'src/auth/services/authJwt.service';
import { User } from 'src/users/users.model';
import { CurrentUser } from '../current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authJwtService: AuthJwtService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@CurrentUser() user: User) {
    const currUser = user._doc;
    return {
      userId: currUser._id,
      token: this.authJwtService.getTokenForUser(user),
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
