import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Microservice Exam";
  }

  getMe(): string {
    return "I am Reginald Osano. Backend Developer using NodeJS.";
  }
}
