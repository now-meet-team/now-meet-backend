import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AppleJwtStrategy, GooleJwtStrategy } from "./jwt/jwt.strategy";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./controller/auth.controller";
import { GoogleStrategy } from "./strategies/google.strategies";
import { HttpModule } from "@nestjs/axios";
import { AppleGuard, CustomJwtGuard, GoogleGuard } from "./jwt/jwt.guard";

@Module({
  imports: [
    PassportModule.register({ session: false }),
    HttpModule,

    //*Internal Use
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService, CustomJwtGuard, GoogleGuard, AppleGuard],

  controllers: [AuthController],

  providers: [AuthService, GooleJwtStrategy, AppleJwtStrategy, GoogleStrategy, CustomJwtGuard, GoogleGuard, AppleGuard],
})
export class AuthModule {}
