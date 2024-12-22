import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
