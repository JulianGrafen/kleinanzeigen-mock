import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    console.log(name,email,password)
    const existingUser = await this.usersRepository.findOne({ where: { email } });

    if (existingUser) {
      console.log("User " + email + " already exists")

      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(name,email);

    await this.usersRepository.save(user);

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { name, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { name }, // Update to use the 'name' field for login
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}