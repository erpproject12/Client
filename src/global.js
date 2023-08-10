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




export const Insert_Sales_Return = (val) =>{
    return url.post('/api/sale_insert_return',val)
}

export const View_Sales_Return = () =>{
    return url.get('/api/view_sale_return')
}

export const View_All_Return = (id) =>{
    return url.get(`/api/view_sales_return/${id}`)
}

export const Update_Sales_Return = (id,sales) =>{
    return url.put(`/api/update_sales_return/${id}`,sales)
}

export const Delete_Sales_Return = (id) =>{
    return url.delete(`/api/delete_sales_return/${id}`)
}


//Purchase Return
export const Insert_PurchaseReturn = (val) =>{
    return url.post('/api/purchasereturn_insert',val)
}

export const View_PurchaseReturn = () => {
    return url.get('/api/purchasereturn_view')
}
export const ViewAll_PurchaseReturn = (id) => {
    return url.get(`/api/purchasereturn_view/${id}`)
}
export const DeletePurchaseReturn = (id) => {
    return url.delete(`/api/purchasereturn_delete/${id}`);    
}
export const ViewUpdateParty = (id) => {
    return url.get(`/api/updateparty_view/${id}`)
}

//Opening Stock
export const UpdateOpeningStock1 = (id,stock) =>{
    return url.put(`/api/update_openingstock1/${id}`,stock)
}
export const UpdateOpeningStock2 = (id,item) =>{
    return url.put(`/api/update_openingstock2/${id}`,item)
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

//Admin Registration
export const Admin_Insert = (val)=>{
    return url.post('/api/admin_register',val)
}

export const Admin_login = (val)=>{
    return url.post('/api/admin_login',val)
}

const url = Axios.create({
    baseURL:"http://127.0.0.1:4000"
})
