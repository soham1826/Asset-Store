"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {useForm} from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { AuthCredentialsValidator,TAuthCredentialsValidator } from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { error } from 'console'
import {toast} from 'sonner'
import { ZodError } from 'zod'
import {useRouter, useSearchParams} from 'next/navigation'


const Page = () => {

const searchParams = useSearchParams()

const router = useRouter();
const isSeller = searchParams.get('as') === "seller"
const origin = searchParams.get('origin')

const continueAsSeller = () =>{
    router.push('?as=seller')
}

const continueAsBuyer = () =>{
    router.replace('sign-in',undefined)
}

const{register, handleSubmit, formState:{errors}} = useForm<TAuthCredentialsValidator>({
    resolver:zodResolver(AuthCredentialsValidator)
})

 const {mutate:signIn,isPending} = trpc.auth.signIn.useMutation({
    onSuccess:()=>{
        toast.success("Signed in successfully")
        

        if(origin){
            router.push(`/${origin}`)
            return
        }

        if(isSeller){
            router.push('/sell')
            return
        }

        router.push('/')
        router.refresh()
    },

    onError:(error)=>{
        if(error.data?.code === "UNAUTHORIZED"){
            toast.error('Invalid email or password')
        }
    }
 })
// console.log(data)

const onSubmit = ({email,password}:TAuthCredentialsValidator)=>{
    //send data to server
    signIn({email,password})
}
  return (
    <div className=' container-relative flex pt-20 flex-col items-center justify-center px-0'>
        <div className='mx-auto flex-w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col items-center space-y-1 text-center'>
                <Image src={'/logo2.png'} className='w-20 h-20' alt='logo' width={200} height={200} />

                <h1 className='text-2xl font-bold'>
                    Sign in to your{isSeller ? ' seller account':' account'}
                </h1>
                <Link className={buttonVariants({
                    variant:'link',
                    className:'gap-1 text-gray-500'
                })} href='/sign-up'>
                    Don&apos;t have an account? Sign-up
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
                            {errors?.email &&(
                                <p className='text-sm text-red-500'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-1 py-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                            type='password'
                            className={cn({
                                'focus-visible:text-red-500':errors.password,
                            })}
                            {...register('password')}
                            placeholder='password'
                            />
                            {errors?.password &&(
                                <p className='text-sm text-red-500'>
                                    {errors.password.message}
                                </p>
                            )}
                            

                        </div>

                        <Button>Sign in</Button>
                    </div>
                </form>
                <div className='relative'>
                    <div aria-hidden="true" className='absolute inset-0 flex items-center'>
                        <span className='w-full border-t'/>
                    </div>
                    <div className='relative flex justify-center text-sx uppercase'>
                        <span className='bg-background px-2 text-muted-foreground'>
                            or
                        </span>

                    </div>
                </div>
                {isSeller ? (
                    <Button onClick={continueAsBuyer}
                    variant='secondary'
                    disabled={isPending}
                    >
                        Continue as customer
                    </Button>
                ):(
                    <Button onClick={continueAsSeller}
                    variant="secondary"
                    disabled={isPending}
                    >
                        Continue as seller
                    </Button>
                )}
            </div>

        </div>
    </div>
  )
}

export default Page