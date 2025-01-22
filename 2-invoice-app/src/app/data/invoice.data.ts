import { Invoice } from "../models/invoice";

export const invoiceData:any ={
    id:1,
    name:'Componentes de PC',
    client:{
        name:'Miguel',
        lastname:'Bermejo',
        adress:{
            country:'España',
            city:'Sevilla',
            street:'Calle colonia',
            number:3
        }
    },
    company:{
        name:'MIKELS',
        fiscalNumber:123456789,

    },
    items:[
        {
            id:1,
            product:'CPU Intel i8',
            price:300,
            quantity:1,
           
        },
        {
            id:2,
            product:'CPU Intel i3',
            price:150,
            quantity:2,
           
        },
        {
            id:3,
            product:'Teclado inalámbrico',
            price:39,
            quantity:3,
           
        }
    ]
}