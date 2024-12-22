import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractAdditionalEntity } from './abstractadditionalentity';
import { HealthInfo } from 'src/healthinfo/entity/healthinfo.entity';

@Entity()
export class ActivityLevel extends AbstractAdditionalEntity {
  @Column('float')
  coefficient: number;
}
