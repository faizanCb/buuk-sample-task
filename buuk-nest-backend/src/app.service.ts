import { Injectable } from '@nestjs/common';
import { QUESTIONS } from './data';
import { Question, Test, SubmittedTestDTO } from './models';
@Injectable()
export class AppService {
  private Questions: Question[] = QUESTIONS;
  private Tests: Test[] = [
    {
      id: 3783,
      duration: 30000,
      result: 75,
      startTime: 1620431417 * 1000,
      questions: [
        {
          id: 1,
          description: 'When did East Germany and West Germany unite?',
          options: [
            { label: 'A', value: '1986' },
            { label: 'B', value: '1990' },
            { label: 'C', value: '1994' },
          ],
          answer: { label: 'B', value: '1990' },
        },
        {
          id: 3,
          description: 'What is the Capital City of Germany? ',
          options: [
            { label: 'A', value: 'Munich' },
            { label: 'B', value: 'Berlin' },
            { label: 'C', value: 'Stuttgart' },
          ],
          answer: { label: 'B', value: 'Berlin' },
        },
        {
          id: 7,
          description: 'Where does Germany rank for exports in the World? ',
          options: [
            { label: 'A', value: '7th' },
            { label: 'B', value: '11th' },
            { label: 'C', value: '3rd' },
          ],
          answer: { label: 'C', value: '3rd' },
        },
        {
          id: 8,
          description:
            'Germany is the _________ most visited country in the world. ',
          options: [
            { label: 'A', value: '2nd' },
            { label: 'B', value: '15th' },
            { label: 'C', value: '7th' },
          ],
          answer: { label: 'C', value: '7th' },
        },
      ],
    },
    {
      id: 9778,
      duration: 50000,
      result: 25,
      startTime: 1620411828 * 1000,
      questions: [
        {
          id: 1,
          description: 'When did East Germany and West Germany unite?',
          options: [
            { label: 'A', value: '1986' },
            { label: 'B', value: '1990' },
            { label: 'C', value: '1994' },
          ],
          answer: { label: 'B', value: '1990' },
        },
        {
          id: 4,
          description: 'What does the Gold Symbolize on the German flag? ',
          options: [
            { label: 'A', value: 'Freedom' },
            { label: 'B', value: 'Comfort' },
            { label: 'C', value: 'Generosity' },
          ],
          answer: { label: 'C', value: 'Generosity' },
        },
        {
          id: 7,
          description: 'Where does Germany rank for exports in the World? ',
          options: [
            { label: 'A', value: '7th' },
            { label: 'B', value: '11th' },
            { label: 'C', value: '3rd' },
          ],
          answer: { label: 'C', value: '3rd' },
        },
        {
          id: 8,
          description:
            'Germany is the _________ most visited country in the world. ',
          options: [
            { label: 'A', value: '2nd' },
            { label: 'B', value: '15th' },
            { label: 'C', value: '7th' },
          ],
          answer: { label: 'C', value: '7th' },
        },
      ],
    },
  ];
  getHello(): string {
    return 'Hello World!';
  }

  private getRandomQuestions(): Question[] {
    let arr: Number[] = [1, 2, 3, 4, 5, 6, 7, 8];
    var shuffled = arr.sort(function () {
      return 0.5 - Math.random();
    });

    var selected = shuffled.slice(0, 4);
    let selectedQuestions: Question[] = [];
    this.Questions.forEach((q, i) => {
      if (selected.includes(q.id)) {
        selectedQuestions.push(q);
      }
    });
    return selectedQuestions;
  }

  startTest(): Test[] {
    let test: Test = {
      id: Math.floor(Math.random() * 10000),
      questions: this.getRandomQuestions(),
    };
    this.Tests.push(test);
    return [{ ...test }];
  }

  submitTest(submittedTestDTO: SubmittedTestDTO): Test[] {
    let testId = submittedTestDTO.id;
    let foundTest = this.Tests.findIndex((t, i) => t.id === testId);
    if (foundTest === -1) {
      throw new Error('Test Not Found');
    } else {
      let result: any = 0;
      let currentTest: Test = this.Tests[foundTest];
      const { questions } = currentTest;
      const { answers } = submittedTestDTO;
      questions.forEach((q, i) => {
        let aIndex = answers.findIndex((a, i) => a.questionId === q.id);
        if (aIndex > -1) {
          let answer = answers[aIndex];
          if (answer.chosenOption.label === q.answer.label) {
            result = result + 1;
          }
        }
      });
      result = (result / 4) * 100;
      this.Tests[foundTest].result = result;
      this.Tests[foundTest].duration = submittedTestDTO.duration;
      this.Tests[foundTest].startTime = submittedTestDTO.startTime;
    }
    return [
      {
        ...this.Tests[foundTest],
      },
    ];
  }

}
