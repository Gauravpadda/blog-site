import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
export const blogRouter = new Hono();
blogRouter.use("/*", async (c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    const token = await c.req.header("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
        c.status(401);
        return c.text("token missing or invalid");
    }
    try {
        const verified = await verify(token.split(" ")[1], c.env.JWT_SECRET);
        if (typeof verified.id !== 'string') {
            throw new Error('Invalid token payload');
        }
        c.set('userid', verified.id);
        await next();
    }
    catch (e) {
        c.status(403);
        return c.json({
            msg: "invalid token"
        });
    }
});
blogRouter.post("/add", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userid = c.get("userid");
    console.log(userid);
    //   const user=await prisma.user.findUnique({
    //     where:{
    //         id:userid
    //     }
    //   })
    try {
        await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                authorid: userid
            }
        });
        c.status(200);
        return c.json({
            msg: "the blog has been uploaded"
        });
    }
    catch (e) {
        c.status(411);
        return c.json({
            msg: "internal server error"
        });
    }
});
blogRouter.put("/update", async (c) => {
    console.log("in the post method");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userid = c.get("userid");
    try {
        await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        c.status(200);
        return c.json({
            msg: "blog has been updated"
        });
    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.json({
            msg: 'internal server error'
        });
    }
});
//add pagination that refresh to get new blogs 
//places above /:id because otherwise it will consider the bulk to be an param thus this route will not work
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany();
    return c.json({
        posts
    });
});
blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogid = c.req.param("id");
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: blogid
            }
        });
        return c.json({
            blog
        });
    }
    catch (e) {
        c.status(411);
        return c.json({
            msg: "internal server error"
        });
    }
});
