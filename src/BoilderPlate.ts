import fs from 'fs'

export class BoilderPlate{
    private raw:string;
    public out:string;

    constructor(filepath:string){
        this.raw = fs.readFileSync(filepath).toString()
        this.out = this.raw
    }

    public replaceVariable(variable:string,value:string){
        const reg = new RegExp(`VAR-${variable}-VAR`,'gm')
        this.out = this.out.replace(reg,value)
    }

    public addTitle(title:string){
        const border = Array.from(title).map(_ => '#').join('')
        this.out = `\n${border}\n${title}\n${border}\n${this.out}`
    }
}