import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    if (user) {
      const { password, ...result } = user;
      return result;
    } else {
      return { message: "Email already exists" };
    }
  }

  async validateUser(userData: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.usersService.findByEmail(userData.email);

    if (user && (await user.checkPassword(userData.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload: JwtPayload = { email: user.email, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
