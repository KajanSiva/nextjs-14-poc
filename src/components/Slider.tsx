import Image from 'next/image'
import Link from "next/link";

type SliderProps = {
  data: SliderItem[];
  linkPath: string;
}

type SliderItem = {
  image: string | null;
  id: number;
  content: string;
}

export default function Slider({ data, linkPath }: SliderProps) {
  return (
    <div className='flex gap-4'>
      {data.map((dataItem) => {
        const profileImageUrl = dataItem.image ? `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${dataItem.image}` : null
        return (
          <Link key={dataItem.id} className='w-[160px] h-[220px] relative group' href={`${linkPath}${dataItem.id}`}>
            {profileImageUrl ? (
              <div className="">
                <Image
                  src={profileImageUrl}
                  alt={dataItem.content}
                  fill
                  unoptimized
                  />
              </div>
            ) : null}
            <div
              className={
                `transition w-full h-full absolute bg-black bg-opacity-70 group-hover:opacity-100 duration-500 flex justify-center items-center ${!profileImageUrl ? 'opacity-100' : 'opacity-0'}`
              }
            >
              <span className='text-white text-lg text-center'>{dataItem.content}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}