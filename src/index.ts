import { select } from "./ui"
import { Storage } from './strorage'
import { Actions } from "./actions"
import { BoilderPlate } from "./BoilderPlate"
import dotenv from 'dotenv'
import fs from "fs"

async function main(){
    const storage = new Storage(`${process.env.DATA_FOLDER}/domains.json`!)
    const actions = new Actions(storage)
    storage.check()

    let {value}:{value:string} = await select('What action would you like to prefrom?',[
        "Add",
        "Delete",
        "Cancel"
    ])

    switch(value.toLowerCase()){
        case "add":
            await actions.add()
            break
        case "delete":
            await actions.delete()
            break;
        case "cancel":
            process.exit()
    };

    const domains = storage.get()
    let file = ''

    domains.forEach(d => {
        const boilder = new BoilderPlate(`${process.env.DATA_FOLDER}/proxy.txt`)
        boilder.addTitle(d.domain)
        boilder.replaceVariable('domain',d.domain)
        boilder.replaceVariable('port',d.port.toString())

        file += boilder.out
    })

    fs.writeFileSync(process.env.NGNIX_SITES!,file)
}

dotenv.config()
main()