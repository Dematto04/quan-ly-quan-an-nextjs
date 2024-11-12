import { tableApiRequest } from "@/apiRequest/table";
import { UpdateTableBodyType } from "@/schemaValidations/table.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTableList = () => {
  return useQuery({
    queryFn: tableApiRequest.list,
    queryKey: ["tables"],
  });
};
export const useGetTableDetail = (id: number) => {
  return useQuery({
    queryFn: () => tableApiRequest.getTable(id),
    queryKey: ["tables", id],
  });
};
export const useCreateTableMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tableApiRequest.addTable,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      }),
  });
};
export const useUpdateTableMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateTableBodyType & { id: number }) =>
      tableApiRequest.updateTable(id, body),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      }),
  });
};

export const useDeleteTableMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tableApiRequest.deleteTable,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      }),
  });
};
