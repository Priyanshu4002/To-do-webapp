import { app } from "./app.js"
import {connectdb} from "./database/data.js"

connectdb();
console.log(process.env.PORT)
app.listen(process.env.PORT, ()=>{
    console.log(`server is working on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})