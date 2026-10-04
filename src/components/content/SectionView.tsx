import type { Section } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { Blocks } from './Blocks'
import styles from './content.module.css'

export function SectionView({ section }: { section: Section }) {
  const t = useLocalized()

  return (
    <section id={section.id}>
      <div className={styles.secHead}>
        <span className={styles.secNum}>{t(section.sectionLabel)}</span>
        {section.timeEst && <span className={styles.timeEst}>⏱ {t(section.timeEst)}</span>}
      </div>
      <div dangerouslySetInnerHTML={{ __html: t(section.headingHtml) }} />
      <Blocks blocks={section.blocks} />
    </section>
  )
}
