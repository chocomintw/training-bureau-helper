// src/hooks/useCards.ts
import { useState, useEffect } from 'react';
import cardsData from '@/data/cards.json';

export interface Card {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  href: string;
  category: string;
  tags: string[];
  featured: boolean;
  showInSidebar: boolean;
  color?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  isSenior?: boolean;
  metadata: {
    rating: number;
    users: number;
    version: string;
    lastUpdated: string;
    features: string[];
  };
}

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cards from JSON data and localStorage
    const userCards = localStorage.getItem('user-cards');
    const allCards = userCards 
      ? [...cardsData.cards, ...JSON.parse(userCards)]
      : cardsData.cards;
    
    setCards(allCards as Card[]);
    setLoading(false);
  }, []);

  // Save cards to localStorage (for user-created cards)
  const saveCards = (updatedCards: Card[]) => {
    const userCards = updatedCards.filter(card => card.createdBy !== 'system');
    localStorage.setItem('user-cards', JSON.stringify(userCards));
    setCards(updatedCards);
  };

  // Add a new card
  const addCard = (cardData: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedCards = [...cards, newCard];
    saveCards(updatedCards);
    return newCard;
  };

  // Update a card
  const updateCard = (id: string, cardData: Partial<Card>) => {
    const updatedCards = cards.map(card =>
      card.id === id
        ? { ...card, ...cardData, updatedAt: new Date().toISOString() }
        : card
    );
    saveCards(updatedCards);
  };

  // Delete a card
  const deleteCard = (id: string) => {
    const updatedCards = cards.filter(card => card.id !== id);
    saveCards(updatedCards);
  };

  // Get featured cards
  const getFeaturedCards = () => cards.filter(card => card.featured);

  // Get categories
  const getCategories = () => Array.from(new Set(cards.map(card => card.category)));

  // Get sidebar tools
  const getSidebarTools = () => cards.filter(card => card.showInSidebar);

  // Get cards by category
  const getCardsByCategory = (category: string) => 
    cards.filter(card => card.category === category);

  // Search cards
  const searchCards = (query: string) => 
    cards.filter(card =>
      card.title.toLowerCase().includes(query.toLowerCase()) ||
      card.description.toLowerCase().includes(query.toLowerCase()) ||
      card.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      card.category.toLowerCase().includes(query.toLowerCase())
    );

  // Get card by ID or href
  const getCardById = (id: string) => 
    cards.find(card => card.id === id || card.href === id || card.href === `/tool/${id}`);

  return {
    cards,
    loading,
    addCard,
    updateCard,
    deleteCard,
    getFeaturedCards,
    getCategories,
    getSidebarTools,
    getCardsByCategory,
    searchCards,
    getCardById,
  };
};