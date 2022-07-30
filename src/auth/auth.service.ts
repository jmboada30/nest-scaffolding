import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createProductDto: CreateUserDto) {
    try {
      const { password, ...userDate } = createProductDto;

      const user = this.userRepository.create({
        ...userDate,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      delete user?.password;

      return { ...user, jwt: this.getJsonWebToken({ uid: user.id }) };
    } catch (error) {
      this.handleError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, password: true, email: true },
    });

    if (!user) throw new UnauthorizedException('Creditentials invalid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Creditentials are not valid');

    return { ...user, jwt: this.getJsonWebToken({ uid: user.id }) };
  }

  async checkUser(user: User) {
    return { ...user, jwt: this.getJsonWebToken({ uid: user.id }) };
  }

  private getJsonWebToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Something went wrong');
  }
}
