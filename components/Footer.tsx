import Image from "next/image";
import {MapPin} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-800 to-primary-900 text-white py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                alt="Logo"
                src="/logo.jpg"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="text-sm">
                <div className="font-bold text-lg">PREFEITURA DE TUPACIGUARA</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-green-700"/>
              </div>
              <div className="text-sm">
                <div className="font-bold text-lg">Prefeitura Municipal de Tupaciguara</div>
                <div className="text-xs text-green-200">Praça Antônio Alves Faria, s/nº</div>
                <div className="text-xs text-green-200">Tiradentes, Tupaciguara - MG</div>
                <div className="text-xs text-green-200">38480-000</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-green-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-green-200">Copyright © 2024</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-primary-700 font-bold text-lg">f</span>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-primary-700 font-bold text-lg">t</span>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="text-primary-700 font-bold text-lg">@</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}