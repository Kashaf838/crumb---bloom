import { Product, CategoryInfo } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/mockData';

// Simulated latency to mimic realistic API calls when needed
const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getProducts(): Promise<Product[]> {
    await delay();
    return [...INITIAL_PRODUCTS];
  },

  async getProductById(id: string): Promise<Product | undefined> {
    await delay();
    return INITIAL_PRODUCTS.find(p => p.id === id);
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    await delay();
    return INITIAL_PRODUCTS.find(p => p.slug === slug);
  },

  async getCategories(): Promise<CategoryInfo[]> {
    await delay();
    return [...INITIAL_CATEGORIES];
  },

  // Future PHP/MySQL backend endpoints ready:
  // POST /api/products
  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    await delay();
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    return newProduct;
  },

  // PUT /api/products/:id
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await delay();
    const existing = INITIAL_PRODUCTS.find(p => p.id === id);
    if (!existing) throw new Error('Product not found');
    return { ...existing, ...updates };
  },

  // DELETE /api/products/:id
  async deleteProduct(id: string): Promise<boolean> {
    await delay();
    return true;
  }
};
