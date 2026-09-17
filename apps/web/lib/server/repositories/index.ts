import 'server-only';

import { CmsProductRepository } from './cms-product-repository';
import { CmsCareerRepository } from './cms-career-repository';
import { CmsPageRepository } from './cms-page-repository';
import { StaticNavigationRepository } from './static-navigation-repository';
import type {
  ProductRepository,
  CareerRepository,
  PageRepository,
  NavigationRepository,
} from './interfaces';

export * from './interfaces';
export * from './cms-product-repository';
export * from './cms-career-repository';
export * from './cms-page-repository';
export * from './static-navigation-repository';

// Singleton instances for request processing
let productRepo: ProductRepository = new CmsProductRepository();
let careerRepo: CareerRepository = new CmsCareerRepository();
let pageRepo: PageRepository = new CmsPageRepository();
let navRepo: NavigationRepository = new StaticNavigationRepository();

export function getProductRepository(): ProductRepository {
  return productRepo;
}

export function setProductRepository(repo: ProductRepository): void {
  productRepo = repo;
}

export function getCareerRepository(): CareerRepository {
  return careerRepo;
}

export function setCareerRepository(repo: CareerRepository): void {
  careerRepo = repo;
}

export function getPageRepository(): PageRepository {
  return pageRepo;
}

export function setPageRepository(repo: PageRepository): void {
  pageRepo = repo;
}

export function getNavigationRepository(): NavigationRepository {
  return navRepo;
}

export function setNavigationRepository(repo: NavigationRepository): void {
  navRepo = repo;
}
