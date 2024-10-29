import authApiRequest from "@/apiRequest/auth";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: authApiRequest.login
    })
};
