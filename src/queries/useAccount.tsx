import accountApiRequest from "@/apiRequest/account"
import { AccountResType } from "@/schemaValidations/account.schema"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAccountMe = () => {
    return useQuery({
        queryKey: ['account-me'],
        queryFn: () => accountApiRequest.me()
    })
}
export const useUpdateMeMutation = () => {
    return useMutation({
        mutationFn: accountApiRequest.updateMe
    })

}