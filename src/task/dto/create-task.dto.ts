import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  text: string;
}
