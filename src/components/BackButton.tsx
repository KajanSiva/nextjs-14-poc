'use client'

import { usePathname, useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname();

  const isHomepage = pathname === '/'

  if (isHomepage) {
    return null
  }

  function goBack() {
    router.back()
  }

  return (
    <button onClick={goBack}>Retour à la liste</button>
  )
}