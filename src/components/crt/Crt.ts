interface IprintOptions {
    printDelay: number
    cr: 		boolean
    reversed: 	boolean
    blinking: 	boolean
    nlBefore: 	number
    nlAfter: 	number
    waitBefore?: number
    waitAfter?: number
}

class CRT{
    crt: HTMLElement | null;
    screen: HTMLElement | null;
    txt: HTMLElement | null;
    fixed: HTMLElement | null;
    cursor: HTMLElement | null;
    mobileInput: HTMLInputElement | null;
    defaultCR: boolean
    width: number
    maxWidth: number
    spad: number
    currentCol: number
    capsLock: boolean
    acceptedKeyCodes: number[]
    waitText: string
    printOptions: IprintOptions
    constructor(){

        this.crt 				= document.getElementById("crt");
        this.screen 			= document.getElementById("screen");
        this.txt 				= document.getElementById("txt");
        this.fixed 				= document.getElementById("fixed");
        this.cursor 			= document.getElementById("cursor");
        this.mobileInput 		= document.getElementById("mobileInput") as HTMLInputElement;
        this.defaultCR 			= true;

        this.width 				= 80;
        this.maxWidth			= 80
        this.spad 				= 16;
        this.currentCol 		= 1;
        this.capsLock 			= false;
        this.acceptedKeyCodes 	= [188,190,13,32,222,8,219,49,173,59,220];
        this.waitText 			= "Premere invio per continuare...";

        this.printOptions		= {
            printDelay: 5,
            cr: 		true,
            reversed: 	false,
            blinking: 	false,
            nlBefore: 	0,
            nlAfter: 	0,
        }

        this.refreshScreen();
        document.body.onresize = () => {this.refreshScreen()}
    }

    refreshScreen(){
        let char = document.getElementById("char");
        let charWidth = char?.getBoundingClientRect().width;

        if(this.crt) {
            this.crt.style.margin = charWidth+"px";
        }

        if(this.cursor) {
            this.cursor.style.borderWidth = charWidth+"px";
        }
        if(charWidth && this.screen) {
            let maxScreenWidth = charWidth * this.maxWidth;
            this.screen.style.maxWidth = maxScreenWidth+"px";
            let screenWidth = this.screen.offsetWidth;
            this.width = Math.floor(screenWidth/charWidth);
        }

        window.scrollTo(0, document.body.scrollHeight);
    }

    async sleep(ms: number){
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    clear(){
        if(this.txt) {
            this.txt.innerHTML = "";
        }

        if(this.fixed) {
            this.fixed.innerHTML = "";
        }
        this.currentCol = 1;
    }

    async wait(){
        if(this.fixed) {
            this.fixed.innerHTML += this.waitText;
            await this.input(false, true);
            let lines = this.fixed.innerHTML.split("\n")
            lines.pop();
            lines.pop();
            this.fixed.innerHTML = lines.join("\n")+"\n\n";
        }
    }

    async printTyping(text: string, options: IprintOptions){
        if (options === undefined)
            options = this.printOptions
        else
            options = { ...this.printOptions, ...options };

        if(options.cr) text += "\n";

        if(options.nlBefore > 0 && this.txt)
            this.txt.innerHTML += "\n".repeat(options.nlBefore);

        text = this._truncate(text);

        if(options.reversed && this.txt){
            this.txt.classList.add('reversed');
        }

        if(options.blinking && this.txt){
            this.txt.classList.add('blinkingText');
        }

        if(options.waitBefore){
            await this.sleep(options.waitBefore);
        }

        for(let i=0; i<text.length;i++){
            if(this.txt){
                this.txt.innerHTML += text[i]
            }

            this.currentCol++;

            // eslint-disable-next-line eqeqeq
            if(this.currentCol > this.width || text[i] == "\n"){

                // eslint-disable-next-line eqeqeq
                if(text[i] != "\n"){
                    // eslint-disable-next-line eqeqeq
                    if(text[i+1] !== undefined && (text[i+1] != "\n" && text[i+1] != " "))
                        if(this.txt) {
                            this.txt.innerHTML +="\n";
                        }
                }
                this.currentCol = 1;

            } else {
                window.scrollTo(0,document.body.scrollHeight);
            }
            // eslint-disable-next-line eqeqeq
            if(text[i] != " " && text[i] != "\n")
                await this.sleep(options.printDelay);
        }

        this._handleNode()

        if(options.nlAfter > 0 && this.fixed)
            this.fixed.innerHTML += "\n".repeat(options.nlAfter);

        if(this.txt) {
            this.txt.innerHTML = "";
        }

        if(options.waitAfter){
            await this.sleep(options.waitAfter);
        }

        if(options.reversed && this.txt){
            this.txt.classList.remove('reversed');
        }

        if(options.blinking && this.txt){
            this.txt.classList.remove('blinkingText');
        }

    }

    async print(text: string, options: IprintOptions){
        if (options === undefined)
            options = this.printOptions
        else
            options = { ...this.printOptions, ...options };

        if(options.reversed && this.txt){
            this.txt.classList.add('reversed');
        }

        if(options.blinking && this.txt){
            this.txt.classList.add('blinkingText');
        }

        if(options.waitBefore){
            await this.sleep(options.waitBefore);
        }

        if(this.txt) {
            this.txt.innerHTML = text;
        }

        if(options.nlBefore > 0 && this.fixed)
            this.fixed.innerHTML += "\n".repeat(options.nlBefore);

        this._handleNode()

        if(options.nlAfter > 0 && this.fixed)
            this.fixed.innerHTML += "\n".repeat(options.nlAfter);

        if(this.txt) {
            this.txt.innerHTML = "";
        }

        if(options.reversed && this.txt){
            this.txt.classList.remove('reversed');
        }

        if(options.blinking && this.txt){
            this.txt.classList.remove('blinkingText');
        }

        let lastLine = text.split("\n").pop();

        if(lastLine) {
            this.currentCol += lastLine.length;
        }

        await window.scrollTo(0,document.body.scrollHeight);
        await this.sleep(options.waitAfter ? options.waitAfter : 25);
    }

    async println(text: string, options: IprintOptions){
        await this.print(text+"\n",options);
    }

    async input(cr: boolean, noInput: boolean){
        // eslint-disable-next-line eqeqeq
        if(cr==undefined)
            cr = this.defaultCR;

        // eslint-disable-next-line eqeqeq
        if(noInput==undefined)
            noInput = false;

        // eslint-disable-next-line eqeqeq
        if(this._isMobile() && !noInput && this.mobileInput){
            this.mobileInput.style.display = "block";
        } else {
            if(this.cursor) {
                this.cursor.classList.add("blinking");
            }
        }

        window.scrollTo(0,document.body.scrollHeight);

        let inputTxt = "";
        let lastKeyEvent: KeyboardEvent | PointerEvent;
        let keyCode = null;

        do{
            lastKeyEvent = await this.keyPressed();
            if(noInput)
                break;
            if(lastKeyEvent && lastKeyEvent instanceof KeyboardEvent) {
                keyCode = lastKeyEvent.key;
            }

            if(keyCode){
                // eslint-disable-next-line eqeqeq
                if(this.acceptedKeys(Number(keyCode)) || Number(keyCode) == 13 || Number(keyCode) == 229){
                    switch(Number(keyCode)){
                        case 13:
                        case 229:
                            // eslint-disable-next-line eqeqeq
                            if(this.mobileInput && this.mobileInput.value != ""){
                                inputTxt = this.mobileInput.value;
                            }
                            if(inputTxt.trim().length > 0){
                                inputTxt = inputTxt.toLowerCase();

                            }
                            break;

                        case 8:
                            if(inputTxt.length > 0){
                                this.currentCol --;
                                if(this.currentCol < 1)
                                    this.currentCol = this.width;

                                inputTxt = inputTxt.substring(0, inputTxt.length-1);
                                if(this.txt) {
                                    // eslint-disable-next-line eqeqeq
                                    this.txt.innerHTML = this.txt.innerHTML.substring(0, this.txt.innerHTML.length-(this.currentCol == this.width ? 2 : 1));
                                }
                            }
                            break;

                        default:
                            if(lastKeyEvent instanceof KeyboardEvent){
                                inputTxt += lastKeyEvent.key;
                            }
                            this.currentCol++;

                            if(this.txt && lastKeyEvent instanceof KeyboardEvent) {
                                this.txt.innerHTML += this.capsLock ? lastKeyEvent.key.toUpperCase() : lastKeyEvent.key;
                            }

                            if(this.currentCol > this.width){
                                if(this.txt) {
                                    this.txt.innerHTML += "\n";
                                }
                                this.currentCol = 1;
                            }
                    }
                }
            }
            //console.log(inputTxt,this.currentCol);
            window.scrollTo(0,document.body.scrollHeight);

            // eslint-disable-next-line eqeqeq
        } while (keyCode == undefined || Number(keyCode) != 13 || (inputTxt.trim().length == 0 && cr));


        if(this._isMobile()){
            if(this.txt) {
                this.txt.innerHTML = inputTxt.trim();
            }

            if(this.mobileInput) {
                this.mobileInput.value = "";
                this.mobileInput.style.display = "none";
            }
        }


        //this.fixed.innerHTML += this.txt.innerHTML +"\n" + (cr ? "\n" : "");
        if(this.txt && this.fixed) {
            let span = this.txt.cloneNode(true) as HTMLElement;
            span.removeAttribute('id');

            this.fixed.append(span);
            this.fixed.innerHTML += "\n" + (cr ? "\n" : "");
            this.currentCol = 1;
            this.txt.innerHTML = "";

            if(this.cursor) {
                this.cursor.classList.remove("blinking");
            }
        }

        return inputTxt.trim();
    }

    acceptedKeys(code: number){
        //console.log(code);
        if (code >= 65 && code <= 90) return true;
        if (code >= 48 && code <= 57) return true;
        return this.acceptedKeyCodes.indexOf(code) >= 0;
    }

    keyPressed(): Promise<KeyboardEvent | PointerEvent>{
        return new Promise((resolve) => {
            document.addEventListener('keydown', onKeyHandler, true);
            document.addEventListener('pointerup', onPHandler, true);

            function onKeyHandler(e: KeyboardEvent) {
                e.preventDefault();
                document.removeEventListener('keydown', onKeyHandler, true);
                resolve(e);
            }

            function onPHandler(e: PointerEvent) {
                e.preventDefault();
                document.removeEventListener('pointerup', onPHandler, true);
                resolve(e);
            }
        });
    }

    _truncate(textLines: string){
        let updatedTextLines = textLines.split("\n");
        let lines = [];

        for(let i in updatedTextLines){
            let text = updatedTextLines[i];
            let chunks = text.split(" ");
            let line: string[] = [];
            for(let i in chunks){
                line.push(chunks[i]);
                let tmpLine = line.join(" ");
                // eslint-disable-next-line eqeqeq
                let widthToCheck = lines.length == 0 ? this.width-this.currentCol+1 : this.width;
                if(tmpLine.length > widthToCheck){
                    line.pop();
                    lines.push(line.join(" "));
                    line = [chunks[i]];
                }

            }

            lines.push(line.join(" "));

        }

        return lines.join("\n");
    }

    _isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    _handleNode() {
        if(this.txt) {
            let cn = this.txt.cloneNode(true) as HTMLElement;
            cn.removeAttribute('id');

            if(this.fixed) {
                this.fixed.appendChild(cn);
            }
        }
    }
}

export default CRT;
