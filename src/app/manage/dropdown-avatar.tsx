'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLogoutMutation } from '@/queries/useAuth'
import { toast } from '@/hooks/use-toast'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useAccountMe } from '@/queries/useAccount'


export default function DropdownAvatar() {
  const logoutMutation = useLogoutMutation()
  const {data} = useAccountMe()
  const account = data?.payload.data
  const router = useRouter()

  const logout =  async ()=> {
    if(logoutMutation.isPending) return 
    
    try {
      const result = await logoutMutation.mutateAsync()
      toast({
        description: 'Đăng xuất thành công'
      })
      router.replace('/')
    } catch (error) {
      handleErrorApi({error})
    }

  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
          <Avatar>
            <AvatarImage src={account?.avatar || undefined} alt={account?.name} />
            <AvatarFallback>{account?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{account?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/manage/setting'} className='cursor-pointer'>
            Cài đặt
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
