import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './content.module.css'

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable — no-op, user can still select the text manually.
    }
  }

  return (
    <div className={styles.codeBlock}>
      <pre>
        <code>{code}</code>
      </pre>
      <button
        type="button"
        className={`${styles.codeCopyBtn} ${copied ? styles.copied : ''}`}
        onClick={copy}
      >
        {copied ? t('copied') : t('copy')}
      </button>
    </div>
  )
}
