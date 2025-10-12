export interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: {
    from: string;
    to: string;
  };
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  description: string;
  location: string;
  createdAt: Date;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  listingId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}
