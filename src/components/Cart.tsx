'use client'
import {  ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import {Sheet,SheetContent,SheetFooter,SheetHeader,SheetTitle,SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator';
import { formatPrice } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { CartItemType, useCart } from '@/hooks/use-cart';
import { CartItem } from './CartItem';
import { Product } from '@/payload-types';
import { ScrollArea } from './ui/scroll-area';

const Cart = () => {
    const{items} = useCart()
    const itemCount = items.length;
    const fee = 1;
    const cartTotal = items.reduce((total,{product})=> total + product.price, 0)
  return (
    <Sheet>
        <SheetTrigger className='group -m-2 flex items-center p-2'>
            <ShoppingCartIcon
            aria-hidden='true'
            className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-white dark:group-hover:text-slate-200 '/>
            <span className='ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-500 dark:text-white dark:group-hover:text-slate-200'>{itemCount}</span>

        </SheetTrigger>
        <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
            <SheetHeader className='space-y-2.5 pr-6'>
                <SheetTitle>

                    Cart ({itemCount}) 
                </SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (<>
               <div className='flex w-full flex-col pr-6'>
                    <ScrollArea>
                    {items.map((product:CartItemType)=>(
                        <CartItem product={product.product} key={product.product.id}/>
                    ))}

                    </ScrollArea>
                </div> 
                <div className='space-y-4 pr-6'>
                    <Separator/>
                    <div className='space-y-1.5 pr-6'>
                        <div className='flex'>
                            <span className='flex-1'>
                                Shipping
                            </span>
                            <span>Free</span>
                        </div>
                        <div className='flex'>
                            <span className='flex-1'>
                                Transaction Fee
                            </span>
                            <span>{formatPrice(1)}</span>
                        </div>
                        <div className='flex'>
                            <span className='flex-1'>
                                Total
                            </span>
                            <span>{formatPrice(cartTotal + fee)}</span>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetTrigger asChild>
                            <Link className={buttonVariants({
                                className:'w-full'
                            })} href="./cart">
                                Chekout 
                            </Link>
                        </SheetTrigger>
                    </SheetFooter>
                </div>
            
            </>): (<div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div className='relative mb-4 w-80 h-60  text-muted-foreground'>
                    <Image alt='Empty cart image' src='/empty-cart.png' fill/>
                </div>
                <div className='text-xl font-semibold mr-4 '>Your cart is empty !</div>
                <SheetTrigger asChild>
                    <Link href='/products'
                    className={buttonVariants({
                        variant:'link',
                        size:'sm',
                        className:
                        'text-sm text-muted-foreground mr-5'
                    })}
                    >
                        Add items to your cart for checkout
                    </Link>

                </SheetTrigger>


            </div>)}
        </SheetContent>
    </Sheet>

  )
}

  


export default Cart