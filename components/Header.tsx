import { FileText } from 'lucide-react';
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <Image
              alt="Logo"
              src="/images/logo.jpg"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div className="text-sm text-primary-800">
              <div className="font-bold text-lg">NFS-e</div>
              <div className="text-xs text-primary-700">PREFEITURA DE TUPACIGUARA</div>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-primary-800 hover:text-primary-600 transition-colors font-medium">Verificar Autenticidade</a>
            <a href="#" className="text-primary-800 hover:text-primary-600 transition-colors font-medium">Nota Certa</a>
            <a href="#" className="text-primary-800 hover:text-primary-600 transition-colors font-medium">Legislação</a>
            <a href="#" className="text-primary-800 hover:text-primary-600 transition-colors font-medium">Dúvidas</a>
            <a href="#" className="text-primary-800 hover:text-primary-600 transition-colors font-medium">Fale conosco</a>
            <a href="#" className="text-primary-800 hover:text-primary-600 transition-colors font-medium">Sair</a>
          </nav>
        </div>
      </div>
    </header>
  );
}