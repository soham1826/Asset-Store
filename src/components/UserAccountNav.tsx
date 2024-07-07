'use client'

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { User } from "@/payload-types"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

const UserAccountNav = ({user}:{user:User}) => {
    const{signOut} = useAuth()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="overflow-visible" asChild>
            <Button variant='ghost' size="sm" className="relative" >
                My account
            </Button>

        </DropdownMenuTrigger>

        <DropdownMenuContent>
            <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium text-sm">
                        {user.email}
                    </p>
                </div>
            </div>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="pl-2">
                <Link href='/sell'>
                    Seller Dashboard
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="pl-2 hover:ring-gray-400">
                Log out
            </DropdownMenuItem>
            
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav