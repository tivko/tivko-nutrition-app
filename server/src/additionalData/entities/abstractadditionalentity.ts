import { AbstractEntity } from 'src/entity/abstract.entity';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class AbstractAdditionalEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
