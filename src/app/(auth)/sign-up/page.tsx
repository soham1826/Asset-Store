"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import { link } from 'fs'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {useForm} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { TypeOf, z } from 'zod'
import { AuthCredentialsValidator,TAuthCredentialsValidator } from '@/lib/validators/account-credentials-validator'


const Page = () => {

const{register, handleSubmit, formState:{errors}} = useForm<TAuthCredentialsValidator>({
    resolver:zodResolver(AuthCredentialsValidator)
})

const onSubmit = ({email,password}:TAuthCredentialsValidator)=>{
    //send data to server
}
  return (
    <div className=' container-relative flex pt-20 flex-col items-center justify-center px-0'>
        <div className='mx-auto flex-w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col items-center space-y-1 text-center'>
                <Image src={'/logo2.png'} className='w-20 h-20' alt='logo' width={200} height={200} />

                <h1 className='text-2xl font-bold'>
                    Create an account
                </h1>
                <Link className={buttonVariants({
                    variant:'link',
                    className:'gap-1'
                })} href='/sign-in'>
                    Already have an account? Sign-in
                    <ArrowRight className='h-4 w-4'/>
                </Link>
            </div>

            <div className='grid gap-6 '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-2'>
                        <div className='grid gap-1 py-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                            {...register("email")}
                            className={cn({
                                'focus-visible:text-red-500':errors.email
                                
                            },'')}
                            placeholder='you@example.com'
                            />
                        </div>
                        <div className='grid gap-1 py-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Input className={cn({
                                'focus-visible:text-red-500':errors.password,
                            })}
                            {...register('password')}
                            placeholder='password'
                            />
                            

                        </div>

                        <Button>Sign up</Button>
                    </div>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Page