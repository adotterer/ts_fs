import {spawn} from "child_process";
import cwd from "cwd";

export async function setup() {
    // process.stdout.write("going to attempt to start server");
    let path = cwd().split("react-app");
    path + "app/"
    console.log(path, "path, no clue ")
    const command = "npm";
    const args = [
        "start"
    ];
    const options = {
        shell: true,
        cwd: cwd()
    }
    
}