import { instanceAxios } from "../axios/axios"

export const getAllSupplier = async () => {
    try {
        const response = await instanceAxios.get("/supplier?select=true")
        return response.data
    } catch (error: any) {
        console.log(error)
    }
}