interface Ioverride {
    [key: string]: {
        commands?: Icommands,
        verbs?: Iverbs
    }
}

interface Iverbs {
    [key: string]: {
        defaultMessage?: string,
        pattern?: string,
        inventario?: boolean,
        complex?: boolean,
    }
}

interface Icommands {
    [key: string]: {
        movimento?: boolean, pattern?: string, defaultMessage?: string, direzione?: string, singolo?: boolean
    }
}

class Parser{
    verbs: Iverbs
    commands: Icommands
    override: Ioverride
    constructor(verbs: Iverbs, commands: Icommands){
        this.verbs = verbs;
        this.commands = commands;
        this.override = {};
    }

    setOverride(override: Ioverride){
        this.override = override ? override : {};
    }

    parse(input: string){
        input = this._prepare(input);

        // O è un comando imperativo
        // O è un verbo

        let c = this._parse(input, this.commands, (this.override.commands === undefined ? {} : this.override.commands));
        return c === false ?
            this._parse(input, this.verbs, (this.override.verbs === undefined ? {} : this.override.verbs)) :
            c;
    }

    _parse(input: string, sorgente: Icommands | Iverbs, override: Ioverride){
        for (let chiave in sorgente){
            // TODO: FIXARE QUESTO any
            let obj: any = { ...sorgente[chiave]};

            let overrideObj = this._getSource(chiave, override);
            if (overrideObj){
                if (typeof overrideObj == 'function'){
                    obj.callback = overrideObj;
                }
                else
                    obj = { ...sorgente[chiave], ...overrideObj};
            }


            let pattern = obj.pattern === undefined ? "("+chiave+")" : obj.pattern;

            if(
                sorgente !== this.commands &&
                override !== this.override.commands &&
                input.indexOf(" ") === -1 &&
                (obj.singolo === undefined || !obj.singolo)
            ){
                let matches = input.match(new RegExp("^"+pattern+"$", 'i'));
                if( matches != null)
                    return input;
            }

            if(sorgente === this.verbs){
                if(
                    (obj.movimento === undefined || obj.movimento === false) &&
                    (obj.complex === undefined || obj.complex === false)
                ){
                    pattern += obj.singolo ?
                        "(?:\\s+(.+))?" :
                        "\\s+(.+)";
                }
            }

            const validPattern = new RegExp("^"+pattern+"$", 'i');
            let matches = input.match(validPattern);

            if(matches != null){

                let subjects = [];
                let i = 2;

                // Se è un movimento e lo posso usare singolarmente
                // mappo la direzione con l'attributo "direzione"

                if(obj?.direzione !== undefined)
                    subjects.push(obj.direzione);
                else {
                    // mappo i "soggetti" della mia azione
                    while(i < matches.length && matches[i] !== undefined){
                        subjects.push(matches[i].trim());
                        i++;
                    }

                }

                // Ritorno un oggetto contenente l'azione e i soggetti
                return {
                    verb: chiave,
                    actionObject: obj,
                    command: sorgente === this.commands, //patternEsatto == true,
                    subjects: subjects
                }

            }

        }

        return false;
    }

    _prepare(input: string){
        input = input.trim();
        input = input.replace(/[.,:;!"£$%&/()=°+*]*/gmi,"");
        input = input.replace(/à/gmi,"a");
        input = input.replace(/(è|é)/gmi,"e");
        input = input.replace(/ì/gmi,"i");
        input = input.replace(/ò/gmi,"o");
        input = input.replace(/ù/gmi,"u");
        input = input.replace(/'/gmi," ");
        input = input.replace(/\s+(un|uno|una|i|il|gli|le|lo|la|l)\s+/gmi," ");
        input = input.replace(/\s+(nel|nell|nello|nella|nelle|negli|nei|dentro)\s+/gmi," in ");
        input = input.replace(/\s+(sul|sull|sullo|sulla|sulle|sugli|sui)\s+/gmi," su ");
        input = input.replace(/\s+(al|all|allo|agli|alle|ai)\s+/gmi," a ");
        input = input.replace(/\s+/gmi," ");

        return input;
    }

    _getSource(key: string, source: Ioverride, separator?: string){
        if(separator === undefined)
            separator = "|";


        for (let k in source){
            let i = k.split(separator);
            let p = i.filter((e) => {return key === e;});
            if(p.length > 0)
                return source[k];
        }

        return null;
    }

}

export default Parser;