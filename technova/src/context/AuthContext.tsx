import { createContext } from 'react';
import { User } from '@/interfaces/user';

export type AuthContextType = {
  user: User | null;
  login: (user: string, password: string)=> Promise<boolean>;
  logout: ()=>void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined)