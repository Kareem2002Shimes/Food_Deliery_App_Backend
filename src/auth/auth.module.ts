import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtService } from './services/authJwt.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.model';
import { UserController } from './controllers/users.controllers';
import { UsersService } from 'src/users/services/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.Auth_SECRET,
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthJwtService,
    JwtStrategy,
    UsersService,
  ],
  controllers: [AuthController, UserController],
  exports: [AuthJwtService],
})
export class AuthModule {}
