import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Get('/demo')
  getHelloWorld(): any {
    return {
      "labels": [
        "2023-01-01T00:00:00.000Z",
        "2023-01-02T00:00:00.000Z",
        "2023-01-03T00:00:00.000Z",
        "2023-01-04T00:00:00.000Z",
        "2023-01-05T00:00:00.000Z",
        "2023-01-06T00:00:00.000Z",
        "2023-01-07T00:00:00.000Z"
      ],
      "datasets": [
        {
          "label": "Bíll",
          "data": [20000,25000,40000,20000,25000,40000,66666]
        },{
          "label": "Bus",
          "data": [20000,25000,40000,20000,25000,40000,66666]
        },{
          "label": "Hjól", 
          "data": [20000,25000,40000,20000,25000,40000,66666]
          
        }
      ]
    }
  }
}
