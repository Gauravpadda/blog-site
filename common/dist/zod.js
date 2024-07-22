"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    password: zod_1.z.string().min(6, { message: "password must be of 6 characters" })
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, { message: "password should of min 6 characters" })
});
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    published: zod_1.z.boolean(),
    authorid: zod_1.z.string()
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    id: zod_1.z.string()
});
