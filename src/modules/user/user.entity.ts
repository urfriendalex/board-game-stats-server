import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Game } from '../game/game.entity';

@Entity()
export class User {
  @Expose()
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Expose()
  @ApiProperty()
  @Column()
  email!: string;

  @ApiProperty()
  @Column()
  password!: string;

  @Expose()
  @ApiProperty()
  @Column()
  isInviteAccepted!: boolean;

  @Expose()
  @ManyToMany(() => Game, (game) => game.users)
  @JoinTable()
  games: Game[];

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
}
