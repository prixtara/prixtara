import 'server-only';

import { SanityProductRepository } from './sanity-product-repository';
import { SanityCareerRepository } from './sanity-career-repository';
import { SanityPageRepository } from './sanity-page-repository';
import { SanityNavigationRepository } from './sanity-navigation-repository';
import type {
  ProductRepository,
  CareerRepository,
  PageRepository,
  NavigationRepository,
} from './interfaces';

export * from './interfaces';
export * from './sanity-product-repository';
export * from './sanity-career-repository';
export * from './sanity-page-repository';
export * from './sanity-navigation-repository';
export * from './static-navigation-repository';

// Singleton instances for request processing
let productRepo: ProductRepository = new SanityProductRepository();
let careerRepo: CareerRepository = new SanityCareerRepository();
let pageRepo: PageRepository = new SanityPageRepository();
let navRepo: NavigationRepository = new SanityNavigationRepository();

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
