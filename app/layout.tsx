import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NFSE | Prefeitura de Tupaciguara',
  description: 'Portal de Notas Fiscais da Prefeitura de Tupaciguara. Emita, consulte e gerencie suas notas fiscais de serviços.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans bg-gray-100">{children}</body>
    </html>
  );
}