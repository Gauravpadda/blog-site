import {z} from "zod";

export const signupSchema=z.object({
    email:z.string().email(),
    name:z.string(),
    password:z.string().min(6,{message:"password must be of 6 characters"})
})

export type SignupSchema=z.infer<typeof signupSchema>

export const signinSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6,{message:"password should of min 6 characters"})
})

export type SigninSchema=z.infer<typeof signinSchema>


export const createBlogSchema=z.object({
    title:z.string(),
    content:z.string(),
    published:z.boolean(),
    authorid:z.string()
})

export type CreateBlogSchema=z.infer<typeof createBlogSchema>


export const updateBlogSchema=z.object({
    title:z.string().optional(),
    content:z.string().optional(),
    id:z.string()
})

export type UpdateBlogSchema=z.infer<typeof updateBlogSchema>