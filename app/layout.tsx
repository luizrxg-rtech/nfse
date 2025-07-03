import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Udigital - Nota Fiscal de Serviços | Prefeitura de Tupaciguara',
  description: 'Portal de Notas Fiscais da Prefeitura de Tupaciguara. Emita, consulte e gerencie suas notas fiscais de serviços.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">{children}</body>
    </html>
  );
}