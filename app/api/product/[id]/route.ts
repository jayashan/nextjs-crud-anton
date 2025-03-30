 import { NextResponse } from "next/server";
 import { prisma } from "@/lib/prisma";

 export async function GET(
    req:Request,
    {params}:{params:Promise<{id:string}>}
 ){
    try{
        const id=(await params).id;
        const product=await prisma.product.findUnique({
            where:{id}
        });

        return NextResponse.json(product);
    }catch(e){
        return NextResponse.json({message:'coudnt fetch data',e})
    }
 }

    
 export async function DELETE(
    req:Request,
    {params}:{params:Promise<{id:string}>}
 ){
    try{
        const product=await prisma.product.delete({
            where:{id:(await params).id}
        })
        return NextResponse.json(product);
    }catch(e){
        return NextResponse.json({message:'coudnt delete data',e})
    }
 }

 export async function PUT(
    req:Request,
    {params}:{params:Promise<{id:string}>}
 ){
    const {name,category,price,stock}=await req.json();

    try{
        const product=await prisma.product.update({
            where:{id:(await params).id},
            data:{
                name,
                category,
                price,
                stock,
            }
        });
        return NextResponse.json(product);
        console.log('product updated',product);
    }catch(e){
        return NextResponse.json({message:'error occured while updating',e},{status:500});
    }
    
 }


 