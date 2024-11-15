import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { UserRequestDto } from "src/users/dtos/request/users.request.dto";
import { MatchState } from "../database/entity/match.entity";
import * as moment from "moment";
import { MatchRepository } from "../database/repository/match.repository";
import { AwsService } from "src/aws.service";
import { RecognizeService } from "../../recognize/recognize.service";

@Injectable()
export class MatchBoxService {
  constructor(
    private readonly recognizeService: RecognizeService,
    private readonly matchRepository: MatchRepository,
    private readonly awsService: AwsService
  ) {}

  async getLikeSendBox(req: UserRequestDto) {
    const loggedId = req.user.id;
    await this.recognizeService.validateUser(loggedId);

    const matched = await this.matchRepository.getSendMatches(loggedId);

    if (!matched.length) {
      return null;
    }
    const receiverProfileImages = matched.map((data) => data.receiver.profileImages);
    const preSignedUrl = await this.awsService.createPreSignedUrl(receiverProfileImages.flat());

    const startIndices = receiverProfileImages.map((_, idx) =>
      receiverProfileImages.slice(0, idx).reduce((acc, images) => acc + images.length, 0)
    );

    const sendBox = matched
      .filter((matchData) => matchData.status !== MatchState.MATCH && matchData.status !== MatchState.EXPIRE)
      .map((matchData, idx) => ({
        matchId: matchData.id,
        matchStatus: matchData.status,
        receiverId: matchData.receiver.id,
        receiverNickname: matchData.receiver.nickname,
        expireMatch: moment(matchData.expireMatch).format("YYYY-MM-DD HH:mm:ss"),
        profileImages: {
          ProfileImages: matchData.receiver.profileImages,
          PreSignedUrl: preSignedUrl[startIndices[idx]],
        },
      }));

    console.log(sendBox);

    if (!sendBox.length) {
      return null;
    }

    return sendBox;
  }

  async getLikeReceiveBox(req: UserRequestDto) {
    const loggedId = req.user.id;
    await this.recognizeService.validateUser(loggedId);

    const matched = await this.matchRepository.getReceiveMatches(loggedId);

    if (!matched.length) {
      return null;
    }

    const senderProfileImages = matched.map((data) => data.sender.profileImages);
    const preSignedUrl = await this.awsService.createPreSignedUrl(senderProfileImages.flat());

    const startIndices = senderProfileImages.map((_, idx) =>
      senderProfileImages.slice(0, idx).reduce((acc, images) => acc + images.length, 0)
    );

    const receiveBox = matched
      .filter((matchData) => matchData.status === MatchState.PENDING)
      .map((matchData, idx) => ({
        matchId: matchData.id,
        matchStatus: matchData.status,
        senderId: matchData.sender.id,
        senderNickname: matchData.sender.nickname,
        expireMatch: moment(matchData.expireMatch).format("YYYY-MM-DD HH:mm:ss"),
        profileImages: {
          ProfileImages: matchData.sender.profileImages,
          PreSignedUrl: preSignedUrl[startIndices[idx]],
        },
      }));

    console.log(receiveBox);

    if (!receiveBox.length) {
      return null;
    }

    return receiveBox;
  }
}
