import { BranchEntity } from '@entities/branch.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BranchEntity)
export class BranchRepository extends Repository<BranchEntity> {}
