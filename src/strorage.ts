import fs from "fs"

export type domain = {
    domain:string,
    port:number
}

export class Storage{
    public path:string

    constructor(filepath:string){
        this.path = filepath
    }

    public add(domain:string,port:number){
        const data = this.get()
        data.push({
            domain,
            port,
        })
        this.save(data)
    }

    public delete(domain:string){
        const data = this.get()
        const index = data.findIndex(i => i.domain === domain)

        if(index === -1 ) {
            console.log('ERROR: no domain found')
            return;
        };

        data.splice(index,1)
        this.save(data)
    }

    public get():domain[]{
        const raw = fs.readFileSync(this.path).toString()
        return JSON.parse(raw)
    }

    public check(){
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path,'[]')
        }
    }

    private save(data:domain[]){
        fs.writeFileSync(this.path,JSON.stringify(data))
    }
}