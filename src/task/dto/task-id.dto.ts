import { IsNumberString } from 'class-validator';

export class TaskIdParam {
  @IsNumberString()
  id: number;
}
