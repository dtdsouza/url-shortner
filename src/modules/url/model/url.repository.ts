import { EntityRepository, Repository } from 'typeorm';
import { UrlEntity } from './url.entity';

@EntityRepository(UrlEntity)
export class UrlRepository extends Repository<UrlEntity> {}
