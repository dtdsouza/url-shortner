import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'urls',
})
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 500 })
  originalUrl!: string;

  @Column({ length: 10 })
  shortUrl!: string;
}
