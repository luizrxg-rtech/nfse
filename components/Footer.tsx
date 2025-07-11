'use client';

import Image from "next/image";
import {Facebook, Globe, Instagram, MapPin} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-800 to-primary-900 text-white py-16">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-6">
            <Image
              alt="Logo"
              src="/images/logo.png"
              width={2196}
              height={803}
              className="w-auto h-20"
            />
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary-700"/>
              </div>
              <div className="text-sm">
                <div className="font-bold text-lg">Prefeitura Municipal de Tupaciguara</div>
                <div className="text-xs text-primary-200">Praça Antônio Alves Faria, s/nº</div>
                <div className="text-xs text-primary-200">Tiradentes, Tupaciguara - MG</div>
                <div className="text-xs text-primary-200">38480-000</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-primary-200">Copyright © 2025</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <a
                href="https://www.facebook.com/p/Prefeitura-de-Tupaciguara-100069105584147/"
                target="_blank"
                className="text-primary-700"
              >
                <Facebook />
              </a>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <a
                href="https://www.instagram.com/prefeituradetupaciguaramg/"
                target="_blank"
                className="text-primary-700"
              >
                <Instagram />
              </a>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <a
                href="https://www.tupaciguara.mg.gov.br/"
                target="_blank"
                className="text-primary-700"
              >
                <Globe />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}