import chalk from "chalk";
import {select, isCancel} from "@clack/prompts";



export async function runCliMode(){
    while (true){
        const mode = await select({
            message: "Choose CLI sub-mode",
            options: [
                {value: "agent", label: "Agent Mode"},
                {value: "plan", label: "Plan Mode"},
                {value: "ask", label: "Ask Mode"},
                {value: "back", label: "⬅Back to main menu"},
            ]
        })
        if(isCancel(mode) || mode === "back") return;
        else if(mode === "agent"){
            console.log(chalk.dim("Starting Agent mode..."))
        }
        else if(mode === "plan"){
            console.log(chalk.dim("Starting Plan mode..."))
        }
        else if(mode === "ask"){
            console.log(chalk.dim("Starting Ask mode..."))
        }
        else if(mode !== "agent" && mode !== "plan" && mode !== "ask"){
            console.log(chalk.red("\nInvalid mode selected. Please try again.\n"));
        }
    }
}