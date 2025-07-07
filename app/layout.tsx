import './globals.css';
import type { Metadata } from 'next';

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
      <body className="font-sans bg-gray-100">{children}</body>
    </html>
  );
}