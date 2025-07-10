import { FileText } from 'lucide-react';
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-800/90 to-primary-900/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center pyh-20">
          <div className="flex items-center space-x-3">
            <Image
              alt="Logo"
              src="/images/logo.png"
              width={2196}
              height={803}
              className="w-auto h-16"
            />
          </div>
          <nav className="hidden md:flex items-center">
            <a href="#" className="text-xl text-white hover:text-gray-500 transition-colors font-medium p-4">Nota Certa</a>
            <a href="#" className="text-xl text-white hover:text-gray-500 transition-colors font-medium p-4">Legislação</a>
            <a href="#" className="text-xl text-white hover:text-gray-500 transition-colors font-medium p-4">Dúvidas</a>
            <a href="#" className="text-xl text-white hover:text-gray-500 transition-colors font-medium p-4">Fale conosco</a>
          </nav>
        </div>
      </div>
    </header>
  );
}