'use client'

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel'
import Image from 'next/image'
import Link from "next/link";
import { useCallback, useEffect, useState } from 'react';
import Button from './Button';

type CarouselProps = {
  data: CarouselItem[];
  linkPath: string;
}

type CarouselItem = {
  image: string | null;
  id: number;
  content: string;
}

export default function Carousel({ data, linkPath }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true, slidesToScroll: 'auto' })

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className='flex items-center gap-6 -mx-6 md:mx-0'>
      <Button
        className="hidden md:block"
        disabled={prevBtnDisabled}
        onClick={scrollPrev}
      >
        {'<'}
      </Button>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-4 mx-4 md:mx-0'>
          {data.map((dataItem) => {
            return (
              <Link key={dataItem.id} className='w-[160px] h-[220px] relative group shrink-0' href={`${linkPath}${dataItem.id}`}>
                {dataItem.image ? (
                    <Image
                      src={dataItem.image}
                      alt={dataItem.content}
                      fill
                      style={{objectFit:"contain"}}
                      unoptimized
                      />
                ) : null}
                <div
                  className={
                    `transition w-full h-full absolute bg-black bg-opacity-70 group-hover:opacity-100 duration-500 flex justify-center items-center ${!dataItem.image ? 'opacity-100' : 'opacity-0'}`
                  }
                >
                  <span className='text-white text-lg text-center'>{dataItem.content}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <Button
        className="hidden md:block"
        disabled={nextBtnDisabled}
        onClick={scrollNext}
      >
        {'>'}
      </Button>
    </div>
  )
}