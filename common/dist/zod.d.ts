import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export type SignupSchema = z.infer<typeof signupSchema>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninSchema = z.infer<typeof signinSchema>;
export declare const createBlogSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    published: z.ZodBoolean;
    authorid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    published: boolean;
    authorid: string;
}, {
    title: string;
    content: string;
    published: boolean;
    authorid: string;
}>;
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export declare const updateBlogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;
