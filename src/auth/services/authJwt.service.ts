import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}
  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user._id,
    });
  }
  public async hashPassword(password: string): Promise<any> {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, async function (err, salt) {
      return await bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          throw new BadRequestException(err.message);
        }
        // Store hash in database here
      });
    });
  }
}
