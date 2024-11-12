import { dishApiRequest } from "@/apiRequest/dish";
import { CreateDishBodyType, UpdateDishBodyType } from "@/schemaValidations/dish.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetDishList = () => {
  return useQuery({
    queryFn: dishApiRequest.list,
    queryKey: ["dishes"],
  });
};
export const useGetDishDetail = (id: number, enabled: boolean) => {
  return useQuery({
    queryFn: () => dishApiRequest.getDish(id),
    queryKey: ["dishes", id],
    enabled
  });
};

export const useCreateDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dishApiRequest.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishes"],
      });
    },
  });
};

export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, ...body}: UpdateDishBodyType & {id: number}) => dishApiRequest.updateDish(id, body),
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['dishes'],
            exact: true
        })
    }
  })
};

export const useDeleteDishMutation = () => {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: dishApiRequest.deleteDish,
        onSuccess: ()=> {
            queryClient.invalidateQueries({
                queryKey: ['dishes']
            })
        }
    })
}
