'use client'
import { useQueueManager } from '@/contexts/queueManagerContext'
import { useQueueStore } from '@/stores/queueStore'
import { cva } from 'class-variance-authority'
import { Check, ListChecks, ListOrdered } from 'lucide-react'

const cardBaseStyle = cva(
  'flex items-center gap-8 border rounded px-6 py-8 [&>div]:flex [&>div]:flex-col [&>div]:gap-3',
  {
    variants: {
      variant: {
        default: 'bg-white',
        colored: 'bg-secondary text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
const iconContainerBaseStyle = cva(
  'size-12 rounded-full flex items-center justify-center [&>svg]:size-5',
  {
    variants: {
      variant: {
        colored: 'bg-primary',
        default: 'bg-neutral-200',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  },
)

const titleBaseStyle = cva('text-[2rem] leading-none font-medium')
const descriptionBaseStyle = cva('text-base leading-none font-medium')

export function HomeCards() {
  const { summaryPasswordData } = useQueueManager()
  const [passwords] = useQueueStore((state) => [state.passwords])
  return (
    <ul className="grid grid-cols-3 gap-5 py-6 px-8">
      <li
        className={cardBaseStyle({
          variant: 'colored',
        })}
      >
        <div
          className={iconContainerBaseStyle({
            variant: 'colored',
          })}
        >
          <Check />
        </div>
        <div>
          <h4 className={descriptionBaseStyle()}>Última senha chamada</h4>
          <h2 className={titleBaseStyle()}>
            {summaryPasswordData.lastPassword}
          </h2>
        </div>
      </li>

      <li className={cardBaseStyle()}>
        <div className={iconContainerBaseStyle()}>
          <ListChecks />
        </div>
        <div>
          <h4 className={descriptionBaseStyle()}>
            Quantidade de senhas chamadas
          </h4>
          <h2 className={titleBaseStyle()}>{summaryPasswordData.totalCalls}</h2>
        </div>
      </li>

      <li className={cardBaseStyle()}>
        <div className={iconContainerBaseStyle()}>
          <ListOrdered />
        </div>
        <div>
          <h4 className={descriptionBaseStyle()}>
            Total de senhas ainda na fila hoje
          </h4>
          <h2 className={titleBaseStyle()}>{passwords.length}</h2>
        </div>
      </li>
    </ul>
  )
}
