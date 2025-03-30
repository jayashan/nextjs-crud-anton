"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2, Check, X, MoreHorizontal ,Loader2} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { TProduct } from "@/app/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// interface Product{
//   id:number,
//   name:string,
//   category:string,
//   price:number,
//   stock:number
// }



export default function ViewProducts() {
  // const[products,setProducts]=useState<Product[]>([
  //   { id: 1, name: "Wireless Headphones", category: "Electronics", price: 89.99, stock: 23 },
  //   { id: 2, name: "Organic Cotton T-Shirt", category: "Clothing", price: 24.99, stock: 45 },
  //   { id: 3, name: "Stainless Steel Water Bottle", category: "Accessories", price: 19.99, stock: 56 },
  //   { id: 4, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 12 },
  //   { id: 5, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 34 },
  // ])

  const[products,setProducts]=useState<TProduct[]>([]);

  const[editingId,setEditingId]=useState<number|null>(null);
  const[editValues,setEditValues]=useState<TProduct|null>(null);
  const[deleteDialogOpen,setDeleteDialogOpen]=useState(false);
  const[productToDelete,setProductToDelete]=useState<number|null>(null);
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState<string|null>(null)

  useEffect(()=>{
    fetchRecords();
  },[])
  
 


  const fetchRecords=async()=>{
    setLoading(true)
    try{
      const response=await fetch('/api/product');

      if(!response.ok){
        throw new Error('Failed to fetch records......')
      }

      const data=await response.json();

      const trasnsformData=data.map((product:TProduct)=>({
        id:product.id,
        code:product.code,
        name:product.name,
        category:product.category,
        price:product.price,
        stock:product.stock
      }))

      setProducts(trasnsformData)


    }catch(err){
      setError(err instanceof Error ?err.message:'An Unknown Error Occured..!')
      toast.warning('Failed to fetch records. Please try again later.')
    }finally{
      setLoading(false)
    }
  }



  //Edit Function
  const handleEdit=(product:TProduct)=>{
    setEditingId(product.id)
    setEditValues({...product})
    
  }
  //save values
  const handleSave=async ()=>{
    if(editValues){
      // setProducts(products.map((p)=>(p.id===editingId?editValues:p)))
      // setEditingId(null)
      // setEditValues(null)

      try{
        const response=await fetch(`/api/product/${editingId}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            name:editValues.name,
            category:editValues.category,
            price:(editValues.price).toString(),
            stock:Number(editValues.stock)
          }),
        });
        if(!response.ok){
          throw new Error('Failed to update the record');
        }
        setProducts(products.map((p)=>(p.id===editingId?editValues:p)))
        setEditingId(null);
        setEditValues(null);
        toast.success('Record updated successfully');

      }catch{
        toast.error('Failed to update the record. Please try again later');
      }
    }
  }
  //handleCancel
  const handleCancel=()=>{
    setEditingId(null)
    setEditValues(null)
  }
  const handleChange=(field:keyof TProduct,value:string)=>{
    if(editValues){
      if(field==='price'||field==='stock'){
        setEditValues({...editValues,[field]:Number.parseFloat(value)||0})
      }else{
        setEditValues({...editValues,[field]:value})
      }
    }
  }
  const confirmDelete=(id:number)=>{
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  }

  const handleDelete=async()=>{
    if(productToDelete !==null){
      // setProducts(products.filter((p)=>p.id !==productToDelete))
      // setDeleteDialogOpen(false)
      // setProductToDelete(null)

      try{
        const response=await fetch(`/api/product/${productToDelete}`,{
          method:'DELETE',
        })
        if(!response.ok){
          throw new Error('Failed to delete the record');
        }
        setProducts(products.filter((p)=>p.id!==productToDelete))
        setDeleteDialogOpen(false);
        setProductToDelete(null);
        toast.success('Record deleted successfully');

      }catch{
        toast.error('Failed to delete the record, please try again later');
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading records...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-destructive">
        <p>Error: {error}</p>
        <Button variant="outline" className="mt-2" onClick={fetchRecords}>
          Try Again
        </Button>
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
        <p className="text-muted-foreground">View all the product details</p>
      </div>
      <div className="rounded-md border w-full max-w-3xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product)=>(
              <TableRow key={product.id}>
                <TableCell>{product.code}</TableCell>
                <TableCell>
                  {editingId===product.id?(
                    <Input
                      value={editValues?.name}
                      onChange={(e)=>handleChange('name',e.target.value)}
                      className="w-full"
                    />
                  ):(
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId===product.id?(
                    <Input
                      value={editValues?.category}
                      onChange={(e)=>handleChange('category',e.target.value)}
                      className="w-full"
                    
                    />
                  ):(
                    product.category
                  )}
                </TableCell>
                <TableCell>
                  {editingId===product.id?(
                    <Input
                      type="number"
                      value={editValues?.price}
                      onChange={(e)=>handleChange('price',e.target.value)}
                      className="w-full text-right"
                    />
                  ):(
                   ` LKR ${product.price}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId===product.id?(
                    <Input
                      type="number"
                      value={editValues?.stock}
                      onChange={(e)=>handleChange('stock',e.target.value)}
                      className="w-full text-right"
                    />
                  ):(
                    product.stock
                  )}
                </TableCell>
                <TableCell>
                  {editingId===product.id?(
                    <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={handleSave}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  ):(
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=>handleEdit(product)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>confirmDelete(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

