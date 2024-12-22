import { Expose } from 'class-transformer';

export class ActivityLevelGeneralDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  coefficient: number;
}
