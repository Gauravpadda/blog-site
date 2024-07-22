import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';


  export interface Env{
    DATABASE_URL: string;
  }



  const app = new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    }
    
  }>().basePath("/api/v1/");

  app.route("/user",userRouter);
  app.route("/blog",blogRouter);

  export default app
