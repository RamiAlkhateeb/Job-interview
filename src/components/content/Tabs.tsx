import { useState } from 'react'
import type { Block, Localized } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { Blocks } from './Blocks'
import styles from './content.module.css'

export function Tabs({ tabs }: { tabs: { label: Localized; blocks: Block[] }[] }) {
  const t = useLocalized()
  const [active, setActive] = useState(0)

  return (
    <div className={styles.tabs}>
      <div className={styles.tabHeads}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            className={i === active ? styles.tabActive : undefined}
            onClick={() => setActive(i)}
          >
            {t(tab.label)}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={`${styles.tabPanel} ${i === active ? '' : styles.tabPanelHidden}`}
          data-print-label={t(tab.label)}
        >
          <Blocks blocks={tab.blocks} />
        </div>
      ))}
    </div>
  )
}
