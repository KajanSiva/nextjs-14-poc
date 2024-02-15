'use client'

import { SortCriteria } from "@/types/ui"
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type SortDropdownProps = {
  sortCriteria: SortCriteria
}

export default function SortDropdown({ sortCriteria }: SortDropdownProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function updateSortCriteria(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('sortBy', event.target.value);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <label>Trier par : </label>
      <select name="sortBy" defaultValue={sortCriteria} onChange={updateSortCriteria}>
        <option value="popularity">Popularité</option>
        <option value="title">Titre</option>
      </select>
    </>
  )
}
