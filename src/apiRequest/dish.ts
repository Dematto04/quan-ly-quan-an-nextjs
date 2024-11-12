import http from "@/lib/http"
import { CreateDishBodyType, DishListResType, DishResType, UpdateDishBodyType } from "@/schemaValidations/dish.schema"

export const dishApiRequest = {
    list: ()=> {
        return http.get<DishListResType>('/dishes')
    },
    add: (body: CreateDishBodyType)=> {
        return http.post<DishResType>('/dishes', body)
    },
    getDish: (id: number)=> http.get<DishResType>(`/dishes/${id}`),
    updateDish: (id: number, body: UpdateDishBodyType) => http.put<DishResType>(`/dishes/${id}`, body),
    deleteDish: (id: number) => http.delete<DishResType>(`/dishes/${id}`)

}