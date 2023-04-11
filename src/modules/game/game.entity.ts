import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../user/user.entity';

@Entity()
export class Game {
  @Expose()
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Expose()
  @ApiProperty()
  @Column()
  name!: string;

  @Expose()
  @ApiProperty()
  @Column()
  description!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];
}
