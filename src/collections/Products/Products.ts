import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products:CollectionConfig = {
    slug:'products',
    admin:{
        useAsTitle:'name'
    },
    access:{},
    fields:[
        {
            name:'user',
            type:'relationship',
            relationTo:'users',
            required:true,
            hasMany:false,
            admin:{
                condition:()=>false
            }
        },
        {
            name:'name',
            label:"Name",
            type:'text',
            required:true
        },
        {
            name:'description',
            label:'Product details',
            type:'textarea',
        },
        {
            name:'price',
            label:'Price in USD',
            min:0,
            max:10000,
            type:'number',
            required:true
        },
        {
            name:'category',
            label:'Category',
            type:'select',
            options:PRODUCT_CATEGORIES.map(({label,value})=>({label,value})),
            required:true
        },
        {
            name:'product_files',
            label:'Product File(s)',
            type:'relationship',
            required:true,
            relationTo:'product_files',
            hasMany:true

        },
        {
            name:'priceId',
            access:{
                create:()=>false,
                read:()=>false,
                update:()=>false
            },
            type:'text',
            admin:{
                hidden:true
            }
        },
        {
            name:'stripeId',
            access:{
                create:()=>false,
                read:()=>false,
                update:()=>false
            },
            type:'text',
            admin:{
                hidden:true
            }
        },
        {
            name:'images',
            label:'Product Images',
            type:'array',
            minRows:1,
            maxRows:4,
            required:true,
            labels:{
                singular:"Images",
                plural:"Image"
            },
            fields:[
                {
                    name:'image',
                    type:'upload',
                    relationTo:'media',
                    required:true
                }
            ]
        }

    ]
}