import { Module, forwardRef } from "@nestjs/common";
import { MatchController } from "./controller/match.controller";
import { MatchService } from "./service/match.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Match } from "./entity/match.entity";
import { UsersModule } from "src/users/users.module";
import { MatchRepository } from "./match.repository";
import { ChatModule } from "src/chat/chat.module";
import { DevMatch } from "./entity/devmatch.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Match, DevMatch]), forwardRef(() => UsersModule), forwardRef(() => ChatModule)],
  exports: [MatchService, MatchRepository],
  controllers: [MatchController],
  providers: [MatchService, MatchRepository],
})
export class MatchModule {}