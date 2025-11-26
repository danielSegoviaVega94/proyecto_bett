import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'Plataforma APEX Rendimiento | High-Performance Coaching Platform',
  description: 'Plataforma profesional de coaching para Atletas, Entrenadores y Nutricionistas | Professional coaching platform for Athletes, Coaches, and Nutritionists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
