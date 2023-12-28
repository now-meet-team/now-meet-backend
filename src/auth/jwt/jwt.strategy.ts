import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, Param, Req, UnauthorizedException } from "@nestjs/common";
import { ApplePayload, GooglePayload } from "./jwt.payload";
import { UsersRepository } from "src/users/users.repository";
import { User } from "src/users/entity/users.entity";
import * as jwksRsa from "jwks-rsa";

//Google Jwt Validate
@Injectable()
export class GooleJwtStrategy extends PassportStrategy(Strategy, "google-jwt") {
  constructor(private readonly userRepository: UsersRepository) {
    //* Local Use
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   secretOrKey: process.env.JWT_KEY,
    //   ignoreExpiration: false,
    // });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
      }),
      ignoreExpiration: false,
      issuer: "https://accounts.google.com",
      audience: process.env.GOOGLE_WEB_CLIENTID,
      algorithms: ["RS256"],
    });
  }

  async validate(payload: GooglePayload): Promise<User> {
    //* Local Use
    // const user = await this.userRepository.findById(payload.sub);

    const user = await this.userRepository.findOneGetByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException("접근 오류");
    }

    return user;
  }
}

//Apple Jwt Validate
@Injectable()
export class AppleJwtStrategy extends PassportStrategy(Strategy, "apple-jwt") {
  private readonly logger = new Logger(AppleJwtStrategy.name);

  constructor(private readonly userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: "https://appleid.apple.com/auth/oauth2/v2/keys",
      }),
      ignoreExpiration: false,
      issuer: "https://appleid.apple.com",
      audience: process.env.APPLE_APP_ID,
      algorithms: ["RS256"],
    });
  }

  async validate(payload: ApplePayload): Promise<User> {
    const startTime = Date.now();
    this.logger.log("유저 검증 시작");
    const user = await this.userRepository.findAppleSub(payload.sub);

    if (!user) {
      throw new UnauthorizedException("접근 오류");
    }
    const endTime = Date.now();
    this.logger.log("유저 검증 끝");
    this.logger.log(`decoding jwt ${endTime - startTime}ms`);
    return user;
  }
}
