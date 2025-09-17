import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, University, Presentation, UserCog, Eye, EyeOff } from "lucide-react";
import { useAuth, type UserType } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import luminaLogo from "@assets/Lumina_logo_1758146247673.png";

export default function EnhancedLoginPage() {
  const [, setLocation] = useLocation();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  // Estados do formulário
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    userType: 'teacher' as UserType,
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'teacher' as UserType,
  });

  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginForm.email || !loginForm.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      const success = await login(loginForm.email, loginForm.password, loginForm.userType);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo à Lumina Assistant`,
        });
        setLocation(`/${loginForm.userType}`);
      } else {
        setError('Credenciais inválidas ou tipo de usuário incorreto');
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (registerForm.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      // Na versão simulada, criar conta = fazer login automaticamente
      const success = await login(registerForm.email, registerForm.password, registerForm.userType);
      
      if (success) {
        toast({
          title: "Conta criada com sucesso!",
          description: `Bem-vindo à Lumina Assistant, ${registerForm.name}!`,
        });
        setLocation(`/${registerForm.userType}`);
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    } catch (error) {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  const userTypeOptions = [
    { value: 'student', label: 'Sou Aluno', icon: University, description: 'Acesse suas atividades e relatórios' },
    { value: 'teacher', label: 'Sou Professor', icon: Presentation, description: 'Gerencie atividades e correções' },
    { value: 'manager', label: 'Sou Gestor', icon: UserCog, description: 'Administre a instituição' },
  ];

  // Função para preenchimento rápido com dados demo
  const fillDemoData = (type: UserType) => {
    const demoData = {
      student: { email: 'aluno@lumina.com', password: '123456' },
      teacher: { email: 'professor@lumina.com', password: '123456' },
      manager: { email: 'gestor@lumina.com', password: '123456' },
    };

    setLoginForm({
      email: demoData[type].email,
      password: demoData[type].password,
      userType: type,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={luminaLogo} alt="Lumina Assistant" className="h-8 w-8" />
            <span className="text-2xl font-bold text-foreground">Lumina Assistant</span>
          </div>
          <CardTitle>Acesse sua conta</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Criar Conta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    data-testid="input-email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      data-testid="input-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Tipo de usuário</Label>
                  <RadioGroup
                    value={loginForm.userType}
                    onValueChange={(value: UserType) => setLoginForm(prev => ({ ...prev, userType: value }))}
                    className="grid grid-cols-1 gap-2"
                  >
                    {userTypeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <div key={option.value} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <div className="flex items-center space-x-2 flex-1">
                            <Icon className="h-4 w-4 text-secondary" />
                            <Label htmlFor={option.value} className="cursor-pointer text-sm font-medium">
                              {option.label}
                            </Label>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  data-testid="button-login"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>

                {/* Botões de demo para facilitar testes */}
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2 text-center">Acesso rápido para demonstração:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {userTypeOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fillDemoData(option.value as UserType)}
                        className="text-xs"
                      >
                        {option.value === 'student' ? 'Aluno' : option.value === 'teacher' ? 'Prof.' : 'Gestor'}
                      </Button>
                    ))}
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Nome completo</Label>
                  <Input
                    id="reg-name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                    data-testid="input-register-name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                    data-testid="input-register-email"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Senha</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      data-testid="input-register-password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm">Confirmar</Label>
                    <Input
                      id="reg-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      data-testid="input-register-confirm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Tipo de usuário</Label>
                  <RadioGroup
                    value={registerForm.userType}
                    onValueChange={(value: UserType) => setRegisterForm(prev => ({ ...prev, userType: value }))}
                    className="grid grid-cols-1 gap-2"
                  >
                    {userTypeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <div key={option.value} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted">
                          <RadioGroupItem value={option.value} id={`reg-${option.value}`} />
                          <div className="flex items-center space-x-2 flex-1">
                            <Icon className="h-4 w-4 text-secondary" />
                            <Label htmlFor={`reg-${option.value}`} className="cursor-pointer text-sm font-medium">
                              {option.label}
                            </Label>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  data-testid="button-register"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    'Criar Conta'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="link-back-to-home">
                ← Voltar para página inicial
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}