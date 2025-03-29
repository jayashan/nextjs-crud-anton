import { z } from "zod";

export const ProductFormSchema = z.object({
  code:z.string().min(2).max(5),
  name: z.string().min(2).max(20),
  category: z.string().min(2).max(20),
  price: z.string().min(2).max(100),
  stock:z.coerce.number(),

})