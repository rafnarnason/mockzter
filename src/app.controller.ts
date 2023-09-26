import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery } from '@nestjs/swagger';

type StepType = 'hour' | 'day' | 'week' | 'month' | 'year';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }


  // private addStep(date: Date, step: string): Date {
  //   const newDate = new Date(date);
  //   switch (step) {
  //     case 'hour':
  //       newDate.setHours(date.getHours() + 1);
  //       break;
  //     case 'day':
  //       newDate.setDate(date.getDate() + 1);
  //       break;
  //     case 'week':
  //       newDate.setDate(date.getDate() + 7);
  //       break;
  //   }
  //   return newDate;
  // }

  // generateDates(begin: string, end: string, step: string): string[] {
  //   const steps = ['hour', 'day', 'week'];
  //   if (!steps.includes(step)) throw new Error('Invalid step value');

  //   const startDate = new Date(begin);
  //   const endDate = new Date(end);

  //   if (startDate.toString() === 'Invalid Date' || endDate.toString() === 'Invalid Date') {
  //     throw new Error('Invalid date format');
  //   }

  //   const dates = [];
  //   let currentDate = new Date(startDate);

  //   while (currentDate < endDate) {
  //     dates.push(currentDate.toISOString());
  //     currentDate = this.addStep(currentDate, step);
  //   }

  //   return dates;
  // }

  generateDates(begin: string, end: string, step: StepType): string[] {
    const steps: StepType[] = ['hour', 'day', 'week', 'month', 'year'];
    if (!steps.includes(step)) throw new Error('Invalid step value');

    const startDate = new Date(begin);
    const endDate = new Date(end);

    if (startDate.toString() === 'Invalid Date' || endDate.toString() === 'Invalid Date') {
      throw new Error('Invalid date format');
    }

    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate < endDate) {
      dates.push(currentDate.toISOString());
      currentDate = this.addStep(currentDate, step);
    }

    return dates;
  }

  private addStep(date: Date, step: StepType): Date {
    const newDate = new Date(date);
    switch (step) {
      case 'hour':
        newDate.setHours(date.getHours() + 1);
        break;
      case 'day':
        newDate.setDate(date.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(date.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(date.getMonth() + 1);
        break;
      case 'year':
        newDate.setFullYear(date.getFullYear() + 1);
        break;
    }
    return newDate;
  }

  generateRandomNumbers(number: number, min: number, max: number): number[] {
    if (min > max) throw new Error('Min should be less than or equal to Max');
    if (number < 0) throw new Error('Number should be greater than or equal to 0');
    
    const numbers = [];
    for (let i = 0; i < number; i++) {
      const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
      numbers.push(randomNum);
    }
    return numbers;
  }

  @Get("/traffic")
  @ApiQuery({name: 'begin', example: "2023-01-01T00:00:00.000Z", description:"Beginning of the period (ISO-8601 format: yyyy-mm-ddThh:mm:ss) included"})
  @ApiQuery({name: 'end', example: "2023-01-06T00:00:00.000Z", description: "End of the period (ISO-8601 format: yyyy-mm-ddThh:mm:ss) excluded"}) 
  @ApiQuery({name: 'step', example: "day", description: "Data step (allowed values: hour/day/week/month/year)" })
  traffic(
    @Query('begin') begin: string,
    @Query('end') end: string,
    @Query('step') step: StepType
  ): any {
    // create array of iso dates between begin and end based on step type hour day week month year
    const labels = this.generateDates(begin,end,step)
    return {
      labels,
      datasets:[
        {
          label: "CAR",
          data: this.generateRandomNumbers(labels.length, 20000, 40000)
        },
        {
          label: "BUS",
          data: this.generateRandomNumbers(labels.length, 5000, 10000)
        },
        {
          label: "BICYCLE",
          data: this.generateRandomNumbers(labels.length, 2500, 7500)
        }
      ]
    }
  }
}
