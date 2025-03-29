import AddProductForm from "@/components/dashboard/Product/AddProducts";
import ViewProducts from "@/components/dashboard/Product/ViewProducts";
import { Separator } from "@/components/ui/separator"

export default function page(){
  return(
    <>
      <AddProductForm/>
      <Separator className="my-4"/>
      <ViewProducts/>
    </>
  )
}