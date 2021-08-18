class Avventura extends IFEngine{
	constructor(){
		super();
		
		// DATI AVVENTURA
		this.datiAvventura = {
			// stanza iniziale
			stanzaIniziale: "stanza1",
			
			/* STANZE */
			stanze: {

				// 01.AEREO
				stanza1: {
					descrizione: "Sei nella stanza 1",
					direzioni: {
						//n: "stanza2"
					},
					interattori: {
						interruttore: {
							label: "un interruttore",
							pattern: "(?:l\\s*'\\s*)?interruttore",
							visibile: true,
							on: {
								"premi|spingi": async () => {
									await this.CRT.printTyping("BOOM!");
									await this.CRT.sleep(1500);
									await this.CRT.printTyping("La stanze è esplosa");
									return this.die();
								}
							}
						},
						porta: {
							label: "una porta",
							pattern: "(?:la\\s*)?porta",
							descrizione: "E' bianca e macchiata di sangue.",
							stati: ['chiusa', 'aperta'],
							stato: 0,
							visibile: true,
							on: {
								"apri|spingi": async () => {
									if(this.stanzaCorrente.interattori.porta.stato == 0){
										this.stanzaCorrente.interattori.porta.stato = 1;
										return this.Thesaurus.defaultMessages.FATTO;
									} 
									return "E' già aperta.";
								},
								chiudi: async () => {
									if(this.stanzaCorrente.interattori.porta.stato == 1){
										this.stanzaCorrente.interattori.porta.stato = 0;
										return this.Thesaurus.defaultMessages.FATTO;
									}
									return "E' già chiusa.";
								}
							}
					
						}
					}
				},
			},

			/* OGGETTI */
			oggetti: {
	
				chiave: {
					label: "una chiave",
					pattern: "(?:la\\s*)?chiave",
					descrizione: "E' una chiave di ottone.",
					posizione: "stanza1",
				},
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
		input = input.replace(/\s+(un|uno|una|i|il|gli|le|lo|la|di|dei|degli|delle|del|della|dell|a|al|alla|all|agli|alle|in|nel|nello|nella|dentro|negli|dal|dall|dalla|dagli|dalle|con|col|sul|sullo|sulla|sugli|sulle|sopra|sotto|dietro|tra|fra)[\s']+/," ");
		input = input.replace(/l'/," ");
		return input;
	}
}
