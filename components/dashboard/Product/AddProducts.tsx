"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ProductFormSchema } from "@/lib/schemas"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useFormStatus } from "react-dom"


function SubmitButton(){
    const{pending}=useFormStatus();

    return(
        <Button type="submit" disabled={pending} className="hover:cursor-pointer">
            {pending? 'Sending.....': 'Submit Your Message'}
        </Button>
    )
}

export default function AddProductForm(){
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof ProductFormSchema>>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            code: "",
            name:"",
            category:"",
            price:"",
            stock:0,
        },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof ProductFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        try{
            const res=await fetch('/api/product',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(values),
            });
            //const results=await res.json();
            if(res.ok){
                toast("Product has been created.")
                form.reset();
                window.location.reload();
                //window.location.href = "/products";
            }else{
                toast.warning('Error Occured')
            }
        }catch(error){
            toast.warning('error')
            console.error(error);
        }
    }

    function handleClearForm(){
        form.reset();
    }





    return(
        <>  
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Add Products</h1>
                <p className="text-muted-foreground">Enter Product Details here </p>
                <div className="py-5">
                    <Card className="w-full max-w-3xl mx-auto py-5">
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                            <CardDescription>Fill in the details to add a new product to your inventory</CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <CardContent className="space-y-6 py-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="code"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product Code</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder="Your Name" {...field} 
                                                            className="bg-background"
                                                            
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        
                                        </div>

                                        <div className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Product Name</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                placeholder="Your Name" {...field} 
                                                                className="bg-background"
                                                                
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        
                                        </div>
                                        <div className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Category</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                placeholder="Your Name" {...field} 
                                                                className="bg-background"
                                                                
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        
                                        </div>
                                        <div className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name="price"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                placeholder="Your Name" {...field} 
                                                                className="bg-background"
                                                                
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name="stock"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Stock Level</FormLabel>
                                                        <FormControl>
                                                            <Input 
                                                                placeholder="Your Name" {...field} 
                                                                className="bg-background"
                                                                
                                                                
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        
                                        </div>
                                    </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between border-t p-6">
                                        <Button variant="outline" type="button" onClick={handleClearForm}>
                                            Cancel
                                        </Button>
                                        <SubmitButton/>
                                    </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </div>
        </>
    )
}