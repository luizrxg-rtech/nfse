'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Shield, Users, Search, Settings, AlertCircle, Download } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (method: 'certificate' | 'gov') => {
    setIsLoggingIn(true);
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient city-background relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-10">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  NFSE<br />
                  <span className="text-4xl md:text-5xl font-light">Nota Fiscal de Serviços</span>
                </h1>
                <p className="text-xl text-gray-800 leading-relaxed font-medium">
                  Bem vindo(a) ao Portal de Notas Fiscais da Prefeitura de Tupaciguara. 
                  Aqui você pode emitir Nota Fiscal, verificar autenticidade, 
                  consultar RPS e muito mais.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 rounded-full px-8 py-4 font-semibold"
                  onClick={() => router.push('/dashboard')}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Acesso aos sistemas
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="floating-animation">
                <img 
                  src="https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop" 
                  alt="Profissional usando laptop" 
                  className="rounded-3xl max-w-md w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Options */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Certificate Login */}
            <Card 
              className="glass-card transition-all duration-300 cursor-pointer border-0 rounded-3xl group card-glow-blue" 
              onClick={() => handleLogin('certificate')}
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto transition-transform duration-300">
                  <Shield className="w-10 h-10 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Certificado de CNPJ/CPF</h3>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Acesse com seu certificado digital</p>
                </div>
              </CardContent>
            </Card>

            {/* Gov.br Login */}
            <Card 
              className="glass-card transition-all duration-300 cursor-pointer border-0 rounded-3xl group card-glow-blue" 
              onClick={() => handleLogin('gov')}
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">gov.br</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">CPF entre com</h3>
                  <p className="text-sm text-gray-600 mt-2 font-medium">gov.br</p>
                </div>
              </CardContent>
            </Card>

            {/* Previous Version */}
            <Card className="glass-card transition-all duration-300 border-0 rounded-3xl group card-glow-yellow">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl flex items-center justify-center mx-auto transition-transform duration-300">
                  <Shield className="w-10 h-10 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Acesse a versão anterior</h3>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Sistema legado</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DES-IF */}
            <Card className="glass-card transition-all duration-300 border-0 rounded-3xl group card-glow-blue">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                  <FileText className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">DES-IF</h3>
              </CardContent>
            </Card>

            {/* Relatório de NFs Pagas */}
            <Card className="glass-card transition-all duration-300 border-0 rounded-3xl group card-glow-green">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                  <FileText className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Relatório de NFs Pagas</h3>
              </CardContent>
            </Card>

            {/* Documentação RPS */}
            <Card className="glass-card transition-all duration-300 border-0 rounded-3xl group card-glow-purple">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                  <Download className="w-8 h-8 text-purple-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Documentação RPS</h3>
              </CardContent>
            </Card>

            {/* Escrituração */}
            <Card className="glass-card transition-all duration-300 border-0 rounded-3xl group card-glow-orange">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                  <FileText className="w-8 h-8 text-orange-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Escrituração</h3>
              </CardContent>
            </Card>

            {/* NFS-e Avulsa */}
            <Card className="glass-card transition-all duration-300 border-0 rounded-3xl group card-glow-red">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                  <AlertCircle className="w-8 h-8 text-red-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">NFS-e Avulsa</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Loading Overlay */}
      {isLoggingIn && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-12 rounded-3xl text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-700 font-semibold text-lg">Autenticando...</p>
          </div>
        </div>
      )}
    </div>
  );
}