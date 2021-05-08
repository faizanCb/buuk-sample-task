import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Test, SubmittedTestDTO } from './models';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/start-test')
  startTest(): Response<Test> {
    try {
      let test: Test[] = this.appService.startTest();
      let response: Response<Test> = {
        status: 200,
        message: 'Success',
        data: test,
      };
      return response;
    } catch (e) {
      let response: Response<Test> = {
        status: 400,
        message: `Error: ${e}`,
        data: [],
      };
      return response;
    }
  }

  @Post('submit-test')
  submitTest(@Body() submittedTestDTO: SubmittedTestDTO): Response<Test>{
    try {
      let test: Test[] = this.appService.submitTest(submittedTestDTO);
      let response: Response<Test> = {
        status: 200,
        message: 'Success',
        data: test,
      };
      return response;
    } catch (e) {
      let response: Response<Test> = {
        status: 400,
        message: `${e}`,
        data: [],
      };
      return response;
    }
  }
}
