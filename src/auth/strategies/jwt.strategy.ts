// src/auth/strategies/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../../users/entities/user.entity";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: any): Promise<User> {
    // This will be called once the token is verified, and we could
    // use a sub field in the JWT (subject which is usually the user id)
    // to identify the user in the database.
    const { sub: userId } = payload; // "sub" is a standard JWT claim for user identifier
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error("User not found or does not exist");
    }
    // Passport will inject the returned object into the request object
    return user;
  }
}
