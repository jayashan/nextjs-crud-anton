import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const products=await prisma.product.findMany({
            orderBy:{
                createdAt:'asc'
            }
        });
        return NextResponse.json(products);
    }catch{
        return NextResponse.json({message:'Error Occured....!'},{status:500});
    }
}

export async function POST(req:Request){
    const{code,name,category,price,stock}=await req.json();

    if(!code||!name){
        return NextResponse.json(
            {error:'Product Code and Product name are required'},
            {status:500}
        );
    }

    try{
        const product=await prisma.product.create({
            data:{
                code,
                name,
                category,
                price,
                stock,
            },
        });
        console.log('new product has been created');
        return NextResponse.json(product);
    }catch{
        return NextResponse.json({message:'could not create'})
    }
}