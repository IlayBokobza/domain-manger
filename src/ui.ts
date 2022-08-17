import prompts from 'prompts'

export async function select(msg:string,choices:string[]){
    return await prompts({
        type:'select',
        name:'value',
        message:msg,
        choices:choices.map(v => ({title:v,value:v}))
    })
}

export async function ask(msg:string,type:prompts.PromptType = 'text'){
    return await prompts({
        type,
        name:'value',
        message:msg,
        validate: v => v ? true : "Don't input an empty string"
    })
}