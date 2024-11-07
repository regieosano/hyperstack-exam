import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "../auth/auth.service";
import { Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.register(createUserDto);
  }

  @Post("signin")
  async signIn(
    @Body() userCredentials: { email: string; password: string },
    @Res() response: Response,
  ): Promise<any> {
    const user = await this.authService.validateUser(userCredentials);
    if (user) {
      const authData = await this.authService.login(user);
      return response.status(HttpStatus.OK).send(authData);
    } else {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: "Invalid Credentials" });
    }
  }
}
