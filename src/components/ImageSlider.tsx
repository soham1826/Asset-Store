"use client"
import Image from 'next/image'
import{Swiper , SwiperSlide,} from 'swiper/react'
import type SwiperType from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination} from 'swiper/modules'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
interface ImageSliderProps{
  urls:string[]|null|undefined
}

const activeStyles = ' dark:bg-black dark:border-zinc-800 active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'

const inactiveStyles = 'hidden text-gray-400'


const ImageSlider = ({urls}:ImageSliderProps) => {

  const[swiper , setSwiper] = useState<null|SwiperType>(null)
  const[activeIndex, setActiveIndex] =useState(0)

  const[slideConfig ,setSlideConfig] = useState({
    isBegining:true,
    isEnd:activeIndex === (urls?.length ?? 0) -1
  })

  useEffect(()=>{
    swiper?.on('slideChange',({activeIndex})=>{
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBegining:activeIndex === 0,
        isEnd:activeIndex === (urls?.length ?? 0) -1
      })
    })
  },[swiper,urls])
  // console.log(urls)
  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl ">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
        onClick={(e)=>{
          e.preventDefault()
          swiper?.slideNext()
        }}
        className={cn(activeStyles,"right-3 transition",{
          [inactiveStyles]:slideConfig.isEnd,
          "hover:bg-primary-300 text-primary-800 opacity-100":!slideConfig.isEnd,
        })} aria-label='next-image'><ChevronRight className='h-4 w-4 text-zinc-700 dark:text-white'/></button>
        <button
        onClick={(e)=>{
          e.preventDefault()
          swiper?.slidePrev()
        }}
        className={cn(activeStyles,"left-3 transition",{
          [inactiveStyles]:slideConfig.isBegining,
          "hover:bg-primary-300 text-primary-800 opacity-100":!slideConfig.isBegining,
        })} aria-label='prev-image'><ChevronLeft className='h-4 w-4 text-zinc-700 dark:text-white'/></button>
        
      </div>
      <Swiper
        pagination={{
          renderBullet:(_, className)=>{
            return `<span class="rounded-full transition ${className}"></span>`
          }
        }} 
        onSwiper={(swiper)=> setSwiper(swiper)} spaceBetween={50} slidesPerView={1} modules={[Pagination]} className='h-full w-full'>
        {urls?.map((url,i)=>(
          <SwiperSlide key={i}>
            <Image
            fill
            loading='eager'
            src={url}
            alt='product image'
            className='-z-10 h-full w-full object-cover object-center'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider