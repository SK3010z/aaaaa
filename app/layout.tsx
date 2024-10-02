import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '4Filas',
  description: 'Gerencie suas filas de forma fácil',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
