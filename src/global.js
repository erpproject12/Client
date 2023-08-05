import Axios from "axios"

export const Insert_Product = (val) =>{
    return url.post("/api/insert",val)
}

 
export const Single_Product = (id) => {
    return url.get(`/api/view/${id}`)
}
export const View_Product = () => {
    return url.get('/api/view')
}

export const Update_Product = (id,product) =>{
    return url.put(`/api/update/${id}`,product)
}

export const DeleteProduct =(id)=>{
    return url.delete(`/api/delete/${id}`)
}

//party
export const Insert_Party = (val) =>{
    return url.post('/api/party_insert',val)
}
export const View_Party = () =>{
    return url.get('/api/view_party')
}
export const Single_Party = (id) => {
    return url.get(`/api/view_party/${id}`)
}
export const Update_Party = (id,party) => {
    return url.put(`/api/party_update/${id}`,party)
}
export const Delete_Party = (id) => {
    return url.delete(`/api/party_delete/${id}`)
}

//purchse
export const Insert_Purchase = (val) =>{
    return url.post('/api/purchase_insert',val)
}




// Sales
export const Insert_Sales = (val) =>{
    return url.post('/api/sales_insert',val)
}
export const View_Sales = () =>{
    return url.get('/api/view_sales')
}
export const Delete_Sales = (id) =>{
    return url.delete(`/api/delete_sales/${id}`)
}
export const Single_Sales = (id) => {
    return url.get(`/api/view_sales/${id}`)
}
export const Update_Sales = (id) => {
    return url.put(`/api/update_sales/${id}`)
}

const url = Axios.create({
    baseURL:"http://127.0.0.1:4000"
})
