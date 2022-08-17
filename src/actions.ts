import { Storage } from "./strorage"
import { ask, select } from "./ui"
import exec from "./exec"
import fs from 'fs'

export class Actions{
    storage:Storage

    constructor(storage:Storage){
        this.storage = storage
    }

    async add(){
        const {value:domain} = await ask('What domain would you like to ask?')
        const {value:port} = await ask('What port would you like the domain to proxy to?','number')
        this.storage.add(domain,port)
        await exec(`${process.env.CREATE_CRT_COMMAND}${domain}${process.env.DEV == 'true' ? '-0001' : ''}`)
    }

    async delete(){
        const {value} = await select('Which domain would you like to delete?',this.storage.get().map(i => i.domain))
        this.storage.delete(value)
        fs.rmSync(`${process.env.CRT_FOLDER}${value}-0001`,{recursive:true,force:true})
    }
}