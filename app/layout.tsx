import './globals.css';
import type { Metadata } from 'next';
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: 'NFS-e | Prefeitura de Tupaciguara',
  description: 'Portal de Notas Fiscais da Prefeitura de Tupaciguara. Emita, consulte e gerencie suas notas fiscais de serviços.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className="font-sans bg-background">
        {children}
        <div 
          className="
            bg-accent text-accent
            bg-primary-100 text-primary-700 
            bg-blue-100 text-blue-700 
            bg-red-100 text-red-700 
            bg-amber-100 text-amber-700 
            bg-purple-100 text-purple-700 
            bg-orange-100 text-orange-700 
            bg-fuchsia-100 text-fuchsia-700
          "
        />
      </body>
    </html>
  );
}