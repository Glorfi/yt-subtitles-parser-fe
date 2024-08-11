import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from './lib/redux-provider';
import { ChakraProvider } from '@chakra-ui/react';
import { Header } from '@/widgets/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Videos To Text App',
  description: 'Transform youtube videos to text',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
