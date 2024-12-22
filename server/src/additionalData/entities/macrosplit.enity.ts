import { Column, Entity } from 'typeorm';
import { AbstractAdditionalEntity } from './abstractadditionalentity';

@Entity()
export class Macrosplit extends AbstractAdditionalEntity {
  @Column({ type: 'float' })
  carbs: number;

  @Column({ type: 'float' })
  fat: number;

  @Column({ type: 'float' })
  protein: number;
}
