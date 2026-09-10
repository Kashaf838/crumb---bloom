import { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const orderService = {
  async getOrders(): Promise<Order[]> {
    await delay();
    return [...INITIAL_ORDERS];
  },

  async getOrderById(id: string): Promise<Order | undefined> {
    await delay();
    return INITIAL_ORDERS.find(o => o.id.toLowerCase() === id.toLowerCase());
  },

  async trackOrder(query: string): Promise<Order | undefined> {
    await delay();
    const clean = query.trim().toLowerCase();
    return INITIAL_ORDERS.find(o => 
      o.id.toLowerCase() === clean || 
      o.customerPhone.replace(/\s+/g, '').includes(clean.replace(/\s+/g, ''))
    );
  },

  // Future PHP/MySQL backend endpoint: POST /api/orders
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    await delay();
    const newOrder: Order = {
      ...orderData,
      id: `CB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };
    return newOrder;
  },

  // Future PHP/MySQL backend endpoint: PATCH /api/orders/:id/status
  async updateOrderStatus(id: string, status: OrderStatus): Promise<boolean> {
    await delay();
    return true;
  }
};
