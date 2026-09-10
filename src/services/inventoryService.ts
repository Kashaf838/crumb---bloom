import { IngredientInventory, CustomCakeRequest, ContactMessage, Review } from '../types';
import { INITIAL_INGREDIENTS, INITIAL_CUSTOM_CAKES, INITIAL_MESSAGES, INITIAL_REVIEWS } from '../data/mockData';

const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const inventoryService = {
  async getIngredients(): Promise<IngredientInventory[]> {
    await delay();
    return [...INITIAL_INGREDIENTS];
  },

  async updateStock(id: string, currentStock: number): Promise<boolean> {
    await delay();
    return true;
  }
};

export const customCakeService = {
  async getRequests(): Promise<CustomCakeRequest[]> {
    await delay();
    return [...INITIAL_CUSTOM_CAKES];
  },

  async submitRequest(request: Omit<CustomCakeRequest, 'id' | 'createdAt' | 'status'>): Promise<CustomCakeRequest> {
    await delay();
    return {
      ...request,
      id: `REQ-${Math.floor(900 + Math.random() * 100)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
  },

  async updateStatus(id: string, status: CustomCakeRequest['status']): Promise<boolean> {
    await delay();
    return true;
  }
};

export const reviewService = {
  async getReviews(): Promise<Review[]> {
    await delay();
    return [...INITIAL_REVIEWS];
  },

  async submitReview(review: Omit<Review, 'id' | 'date' | 'status' | 'verified'>): Promise<Review> {
    await delay();
    return {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true,
      status: 'Approved'
    };
  }
};

export const contactService = {
  async submitMessage(msg: Omit<ContactMessage, 'id' | 'date' | 'status'>): Promise<ContactMessage> {
    await delay();
    return {
      ...msg,
      id: `msg-${Date.now()}`,
      date: 'Just now',
      status: 'Unread'
    };
  }
};
