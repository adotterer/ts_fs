import {spawn} from "child_process";
import cwd from "cwd";
import ping from "ping";

const host = "http://127.0.0.1:5050/test";
const serverReady = async () => {

}
export async function setup() {
    return "meh"
//     // process.stdout.write("going to attempt to start server");
//     let [path, _] = cwd().split("react-app");
//     path += "app/"
//     console.log(path, "path, no clue ")
//     const command = "npm";
//     const args = [
//         "start"
//     ];
//     const options = {
//         shell: true,
//         cwd: path
//     }

    
    

 

//    return new Promise(function(resolve, reject) {
//     const server = spawn(
//         command, args, options);
//     server.on("close", async function() {
//         console.log("all done");
//         const res = await ping.promise.probe(host);
//         resolve(res)
//     });
//     server.on("error", function(err) {
//         reject(err)
//     })
//    })
}