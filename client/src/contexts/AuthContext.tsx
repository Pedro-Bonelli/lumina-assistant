import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserType = 'student' | 'teacher' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: UserType) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados simulados de usuários para demonstração
const simulatedUsers: Record<string, User> = {
  'professor@lumina.com': {
    id: 'teacher-1',
    name: 'Prof. Maria Silva',
    email: 'professor@lumina.com',
    type: 'teacher',
  },
  'aluno@lumina.com': {
    id: 'student-1', 
    name: 'João Santos',
    email: 'aluno@lumina.com',
    type: 'student',
  },
  'gestor@lumina.com': {
    id: 'manager-1',
    name: 'Ana Costa',
    email: 'gestor@lumina.com', 
    type: 'manager',
  },
  // Usuários genéricos que funcionam com qualquer email
  'demo': {
    id: 'demo-user',
    name: 'Usuário Demo',
    email: 'demo@lumina.com',
    type: 'teacher',
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('lumina_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('lumina_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: UserType): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar credenciais simuladas
    let foundUser = simulatedUsers[email];
    
    // Se não encontrar o email específico, criar usuário demo
    if (!foundUser && email && password) {
      foundUser = {
        id: `${type}-${Date.now()}`,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
        type,
      };
    }
    
    if (foundUser && (foundUser.type === type || type === foundUser.type)) {
      // Atualizar o tipo se necessário
      const authenticatedUser = { ...foundUser, type };
      setUser(authenticatedUser);
      localStorage.setItem('lumina_user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}