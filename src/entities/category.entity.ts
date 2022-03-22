import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { convertToSlug } from '@utils/common';
import { BranchEntity } from './branch.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartegories_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  convertToSlug() {
    this.slug = convertToSlug(this.name);
  }

  @OneToMany(() => BranchEntity, (branch) => branch.category)
  branches: BranchEntity[];

  // @OneToMany(() => CategoryEntity, (category) => category.category)
  // categories: CategoryEntity[];

  // @ManyToOne(() => CategoryEntity, (category) => category.categories)
  // category: CategoryEntity;
}
