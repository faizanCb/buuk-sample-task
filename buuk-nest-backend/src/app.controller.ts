import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Test, SubmittedTestDTO, OverallStatistics } from './models';
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
  submitTest(@Body() submittedTestDTO: SubmittedTestDTO): Response<Test> {
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

  @Get('/tests')
  getTests(@Query() query): Response<Test> {
    try {
      let test: Test[] = this.appService.getTests(query.page, query.limit);
      let response: Response<Test> = {
        status: 200,
        message: 'Success',
        data: test,
        count: this.appService.getTestsCount(),
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

  @Get('/overall-stats')
  getOverallStatistics(): Response<OverallStatistics> {
    try {
      let test: OverallStatistics[] = this.appService.getOverallStatistics();
      let response: Response<OverallStatistics> = {
        status: 200,
        message: 'Success',
        data: test,
      };
      return response;
    } catch (e) {
      let response: Response<OverallStatistics> = {
        status: 400,
        message: `Error: ${e}`,
        data: [],
      };
      return response;
    }
  }

}
