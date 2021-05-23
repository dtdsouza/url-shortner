import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity({
  name: 'urls',
})
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 500, unique: true })
  originalUrl!: string;

  @Column({ length: 10, unique: true })
  shortUrl!: string;

  @Column({ type: Date, nullable: true })
  expiresAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setExpiresAt() {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    this.expiresAt = expiresAt;
  }
}
