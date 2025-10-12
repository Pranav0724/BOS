import { Category, Listing } from '@/types';
import { Colors } from './colors';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Vehicles',
    icon: 'car',
    gradient: Colors.categories.vehicles,
  },
  {
    id: '2',
    name: 'Furniture',
    icon: 'home',
    gradient: Colors.categories.furniture,
  },
  {
    id: '3',
    name: 'Laptops & Mobiles',
    icon: 'briefcase',
    gradient: Colors.categories.computers,
  },
  {
    id: '4',
    name: 'Electronics',
    icon: 'smartphone',
    gradient: Colors.categories.electronics,
  },
];

export const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Professional Camera',
    price: 1200,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    description: 'High-quality DSLR camera with 24MP sensor',
    location: 'New York, NY',
    createdAt: new Date(),
    userId: 'user1',
  },
  {
    id: '2',
    title: 'Classic Road Bike',
    price: 350,
    currency: 'USD',
    category: 'Vehicles',
    image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg',
    description: 'Vintage road bike in excellent condition',
    location: 'Los Angeles, CA',
    createdAt: new Date(),
    userId: 'user2',
  },
  {
    id: '3',
    title: 'Modern Apartment',
    price: 2500,
    currency: 'USD',
    category: 'Property',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    description: '2BR apartment with city view',
    location: 'Chicago, IL',
    createdAt: new Date(),
    userId: 'user3',
  },
  {
    id: '4',
    title: 'Laptop MacBook Pro',
    price: 1800,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    description: 'M2 chip, 16GB RAM, 512GB storage',
    location: 'San Francisco, CA',
    createdAt: new Date(),
    userId: 'user4',
  },
];
