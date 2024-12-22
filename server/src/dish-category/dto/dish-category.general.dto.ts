import { Expose } from 'class-transformer';

export class DishCategoryGeneralDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
}
