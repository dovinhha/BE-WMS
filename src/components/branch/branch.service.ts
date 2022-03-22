import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchRepository } from '@repositories/branch.repository';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(BranchRepository)
    private readonly branchRepository: BranchRepository,
  ) {}
}
