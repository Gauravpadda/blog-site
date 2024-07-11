import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string

    }
}>();


//signup request
userRouter.post('/signup', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=await c.req.json();
    try{
      //no need to add find function as we had set the email to be unique thus it will also return error for duplicate entry
      const newUser=await prisma.user.create({
        data:{
          email:body.email,
          name:body.name,
          password:body.password
        }
      })
      const token=await sign({id:newUser.id},c.env.JWT_SECRET)

      c.status(200);

      return c.json({
        msg:"new user created",
        token:token
      })
      

    }catch(e){
      c.status(400);
      return c.json({
        msg:"user already exist",
      })
    }
    
  })

userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl:c.env?.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: body.email,
        password: body.password
      }
    })

    const token =await sign({ id: user.id }, c.env.JWT_SECRET)
    c.status(200);
    return c.json({
      msg: "successful signin",
      token: token
    })

  } catch (e) {
    return c.json({
      msg: "no such user exist"
    })
  }
})