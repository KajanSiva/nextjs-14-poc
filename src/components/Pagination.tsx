'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";

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
    <div className="flex justify-center items-center md:justify-end gap-4">
      <Button disabled={isFirstPage} onClick={() => updatePage('first')}>{'<<'}</Button>
      <Button disabled={isFirstPage} onClick={() => updatePage('previous')}>{'<'}</Button>
      <p>Page {currentPage} sur {totalPages}</p>
      <Button disabled={isLastPage} onClick={() => updatePage('next')}>{'>'}</Button>
      <Button disabled={isLastPage} onClick={() => updatePage('last')}>{'>>'}</Button>
    </div>
  )
}