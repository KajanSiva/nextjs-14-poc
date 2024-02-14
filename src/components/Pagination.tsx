'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number,
  totalPages: number,
}

type DestinationPage = 'first' | 'previous' | 'next' | 'last'

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  function updatePage(destinationPage: DestinationPage) {
    const params = new URLSearchParams(searchParams);

    let newPageValue = currentPage

    switch (destinationPage) {
      case 'first':
        newPageValue = 1
        break
      case 'previous':
        newPageValue = currentPage - 1
        break
      case 'next':
        newPageValue = currentPage + 1
        break
      case 'last':
        newPageValue = totalPages
        break
    }

    params.set('page', newPageValue.toString());

    push(`${pathname}?${params.toString()}`);
  }
  
  return (
    <div className="flex justify-end gap-4">
      <button disabled={isFirstPage} onClick={() => updatePage('first')}>{'<<'}</button>
      <button disabled={isFirstPage} onClick={() => updatePage('previous')}>{'<'}</button>
      <p>Page {currentPage} sur {totalPages}</p>
      <button disabled={isLastPage} onClick={() => updatePage('next')}>{'>'}</button>
      <button disabled={isLastPage} onClick={() => updatePage('last')}>{'>>'}</button>
    </div>
  )
}