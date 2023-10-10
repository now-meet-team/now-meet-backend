import { Match } from "src/match/entity/match.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  sex: string;

  @Column()
  birthDate: string;

  @Column()
  tall: string;

  @Column()
  job: string;

  @Column()
  introduce: string;

  @Column("simple-array")
  preference: string[];

  @Column({ default: 0 })
  gem: number;

  @Column("decimal", { precision: 9, scale: 6 })
  latitude: number;

  @Column("decimal", { precision: 9, scale: 6 })
  longitude: number;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => Match, (match) => match.sender)
  sendMatches: Match[];

  @OneToMany(() => Match, (match) => match.receiver)
  receivedMatches: Match[];
}