import {spawn} from "child_process";
import cwd from "cwd";
import ping from "ping"
const serverReady = async () => {

}
export async function setup() {
    // process.stdout.write("going to attempt to start server");
    let [path, _] = cwd().split("react-app");
    path += "app/"
    console.log(path, "path, no clue ")
    const command = "npm";
    const args = [
        "start"
    ];
    const options = {
        shell: true,
        cwd: path
    }

    const server = spawn(
        command, args, options);
    
   
}