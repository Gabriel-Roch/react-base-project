import { instanceAxios } from "../axios/axios"

export const getAllProducts = async () => {
    try {
        const response = await instanceAxios.get("/products")
        return response.data
    } catch (error: any) {
        console.log(error)
    }
}