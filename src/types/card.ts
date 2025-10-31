// src/types/card.ts
export interface Card {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  category: string;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  color?: string;
  featured?: boolean;
  showInSidebar?: boolean;
}

export interface CardFormData {
  title: string;
  description: string;
  icon: string;
  href: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  color: string;
  featured: boolean;
  showInSidebar: boolean;
}