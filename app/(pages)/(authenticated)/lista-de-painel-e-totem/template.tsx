'use client'

import { PanelAndTotemProvider } from '@/stores/panelAndTotemStore'
import { PropsWithChildren } from 'react'

export default function ListaDePainelETotemPageTemplate({
  children,
}: PropsWithChildren) {
  return <PanelAndTotemProvider>{children}</PanelAndTotemProvider>
}
