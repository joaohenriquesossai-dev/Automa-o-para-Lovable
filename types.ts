
// Import React to provide the namespace for React.ReactNode
import React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}