import http from "@/lib/http";
import { CreateTableBodyType, TableListResType, TableResType, UpdateTableBodyType } from "@/schemaValidations/table.schema";

export const tableApiRequest = {
    list: ()=> http.get<TableListResType>('/tables'),
    getTable: (id: number)=> http.get<TableResType>(`/tables/${id}`),
    addTable: (body: CreateTableBodyType) => http.post('tables', body),
    updateTable: (id: number, body: UpdateTableBodyType) => http.put(`/tables/${id}`, body),
    deleteTable: (id: number) => http.delete(`/tables/${id}`)

}