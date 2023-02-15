import app from "./server";
import "./database";

app.listen(app.get('port'), () =>{
    console.log('Server on port '+ app.get('port'));
    console.log("Url http://127.0.0.1:4000");
})