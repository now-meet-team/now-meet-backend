import { Module, forwardRef } from "@nestjs/common";
import { ChatRoom } from "./entity/chats.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatGateway } from "./chat.gateway";
import { ChatMessage } from "./entity/chatmessage.entity";
import { UsersModule } from "src/users/users.module";
import { DevChatRoom } from "./entity/devchats.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, DevChatRoom, ChatMessage]), forwardRef(() => UsersModule)],
  exports: [ChatGateway],
  controllers: [],
  providers: [ChatGateway],
})
export class ChatModule {}
