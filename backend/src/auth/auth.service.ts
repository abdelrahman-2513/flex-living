import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { AuthedUser } from './types/authedUser.type';
import { IUser } from '../user/interfaces';
import { ATPayload } from '../shared/types';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RegisterDTO } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userSVC: UserService,
    private JwtSVC: JwtService,
  ) { }


  public async signIn(
    email: string,
    enterdPassword: string,
  ): Promise<AuthedUser> {

      const user = await this.userSVC.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const validUser = await this.verifyHash(enterdPassword, user.password);
      if (!validUser) {
        throw new BadRequestException('wrong email or password');
      }
      const token = this.generateAccessToken(user);
      const authedUser: AuthedUser = new AuthedUser(user, token);


      return authedUser;
  
  }

  public async signUp(reqisterUser: RegisterDTO): Promise<string> {
  

      await this.userSVC.create(reqisterUser);
      return "User registered Successfully!"
    
  }

  public async getMe(request: Request): Promise<String> {

    const { user } = request as Request & { user: ATPayload };
    return `Welcome  ${user["name"]} To Easy Genertaor`;
  }

  private generateAccessToken(user: IUser): string {
    const ATPayload: ATPayload = {
      id: user._id as unknown as string,
      email: user.email as string,
      role: user.role as string,
      name:user.name as string,
    };
    const token = this.JwtSVC.sign(ATPayload, {
      secret: this.configService.get("JWT_SECRET", 'J0ZY74ZxzFGQK7p26IyoWIlBKAuolOwB'),
      expiresIn: '1d',
    });

    return token;
  }

  private async verifyHash(
    userPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(userPassword, hashedPassword);
  }
}