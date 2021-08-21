class Avventura extends IFEngine{
	constructor(){
		super();
		
		// DATI AVVENTURA
		this.datiAvventura = {
			// stanza iniziale
			stanzaIniziale: "ufficio",
			
			/* STANZE */
			stanze: {

				// 01.AEREO
				ufficio: {
					label: "Ufficio",
					descrizione: "Sei nel tuo ufficio. Davanti a te si estende la scrivania, piena di appunti. Sotto di essa c'è una cassettiera di ferro. Sulla parete si staglia un moderno mobile a vetri. La luce entra dalle finestre a ovest, mentre a est si trova l'unico ingresso della stanza.",
					direzioni: {
						//e: "corridoio"
					},
					interattori: {
						scrivania: {
							label: "la scrivania",
							descrizione: "E' una classica scrivania da ufficio in legno."
						},
						soggetto: {
							label: "il soggetto",
							descrizione: "Che tipo",
							vivo: true,
							initial: () => "Un soggetto di tipo "+(this.stanzaCorrente.interattori.soggetto.vivo ? "A" : "B")
						}
						
					},
					onEnter: async () => {
						if(this.datiAvventura.prologo){
							this.datiAvventura.prologo = false;
							//await this.runSequence("prologo");
						} 
					},
				},

			},

			/* OGGETTI */
			oggetti: {
	
				chiave: {
					label: "una chiave",
					pattern: "(?:la\\s*)?chiave",
					descrizione: "E' una chiave di ottone.",
					posizione: "ufficio",
					initial: "C'è una chiave di ottone appoggiata sul tavolo"
				},
				occhiali: {
					label: "un paio di occhiali",
					pattern: "(?:gli\\s*)?occhiali",
					descrizione: "Sono occhiali per astigmatici e ipermetropi.",
					posizione: "ufficio",
					visibile:true
				}
			},

			/* SEQUENZE */
			sequenze:{
				titolo: async () => {
					this.CRT.clear();
					await this.CRT.sleep(1000);
					await this.CRT.println(" _ ___   ___         _         ");
					await this.CRT.println("| | __> | __._ _ ___<_._ _ ___ ");
					await this.CRT.println("| | _>  | _>| ' / . | | ' / ._>");
					await this.CRT.println("|_|_|   |___|_|_\\_. |_|_|_\\___.");
					await this.CRT.println("                <___'      ");
					await this.CRT.println("       ___                v.1.0");
					await this.CRT.println("      | . \\___._ _ _ ___        ");
					await this.CRT.println("      | | / ._| ' ' / . \\       ");
					await this.CRT.println("      |___\\___|_|_|_\\___/\n\n");
					
					await this.CRT.println("            |_                             ");
 					await this.CRT.println("            |_) \\/");                    
 					await this.CRT.println("                /");

					await this.CRT.println("    \\  / _  | ._  o ._  o     ");
					await this.CRT.println("     \\/ (_) | |_) | | | |     ");
					await this.CRT.println("  ___         |                ");
 					await this.CRT.println("  |_ _   _|  _  ._ o  _  _  ");
					await this.CRT.println("  | (/_ (_| (/_ |  | (_ (_) \n");
					await this.CRT.println("volpini.federico79@gmail.com\n");
					await this.CRT.println("licenza MIT\n");
					await this.CRT.wait();
					this.CRT.clear();

				},
				prologo: async () => {
					await this.CRT.sleep(1000);
					await this.CRT.printTyping("Accidenti....",{cr:false})
					await this.CRT.sleep(1500);
					await this.CRT.printTyping("Come ho fatto ad addormentarmi in ufficio?")
					await this.CRT.sleep(1000);
					await this.CRT.printTyping("Quanto tempo è passato?")
					await this.CRT.sleep(1500);
					await this.CRT.printTyping("Uhm... ",{cr:false})
					await this.CRT.sleep(2000);
					await this.CRT.printTyping("E' tutto troppo silenzioso qui. Sarà meglio tornare a casa.",{nlAfter:2})
					await this.CRT.sleep(1500);
				}
			}
		}
	}
	
	// Override di IFEngine.run
	async run(){
		await this.runSequence("titolo");
		this.displayMenu(this.menu.principale);
	}

	// @Override _prepare
	_prepare(input){
		input = super._prepare(input);
		input = input.replace(/\s+(un|un|uno|una|i|il|gli|le|lo|la|l)/," ");
		input = input.replace(/'/,"");
		return input;
	}
}
