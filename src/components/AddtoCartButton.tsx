'use client'
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/payload-types"



const AddtoCartButton = ({product}:{product:Product})=>{
    const {addItem} = useCart()
    const[isSuccess, setIsSuccess] = useState(false)

    useEffect(()=>{
      const timeout =  setTimeout(()=>{
            setIsSuccess(false);
        },2000)

        return () => clearTimeout(timeout)
    },[isSuccess])

    const handleClick = ()=>{
        addItem(product)
        setIsSuccess(true)
        toast.success("Item Added to cart")
    }



    return <Button size='lg' className="w-full" onClick={()=>handleClick()}>
        {isSuccess? 'Added to cart':'Add to cart'}
    </Button>
}

export default AddtoCartButton