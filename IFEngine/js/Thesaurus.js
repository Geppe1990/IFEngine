class Thesaurus{
	constructor(){
		this.defaultMessages = {
			FATTO: 					"Fatto!",
			PREFERISCO_DI_NO: 		"Preferisco di no.",
			NON_TROVATO:	 		"Ricerca infruttuosa.",
			NON_HO_CAPITO:			"Non ho capito...",
			NULLA_DI_PARTICOLARE:	"Non noto nulla di particolare.",
			QUI_NON_NE_VEDO: 		"Qui non ne vedo.", 
			NON_NE_POSSIEDI: 		"Non ne possiedi.", 
			NON_SUCCEDE_NIENTE: 	"Non succede niente.",
			SII_PIU_SPECIFICO: 		"Sii più specifico.",
			NON_E_POSSIBILE: 		"Non è possibile",
			BUIO: 					"Qui è completamente buio..",
			AZIONE_AL_BUIO: 		"Con l'oscurità non voglio azzardarmi a fare nulla..."
		}

		this.loadCommands();
		this.loadVerbs();
		
	}

	loadCommands(){
		this.commands = {
			nord: {
				movimento: true,
				pattern: "(vai verso |vai a |vai )?(n(ord)?)",
				defaultMessage: "A nord non puoi andare.",
				direzione: "n"
			},
			sud: {
				movimento: true,
				pattern: "(vai verso |vai a |vai )?(s(ud|outh)?)",
				defaultMessage: "A sud non puoi andare.",
				direzione: "s"
			},
			est: {
				movimento: true,
				pattern: "(vai verso |vai a |vai )?(e(st)?)",
				defaultMessage: "A est non puoi andare.",
				direzione: "e"
			},
			ovest: {
				movimento: true,
				pattern: "(vai verso |vai a |vai )?(o(vest)?|w(est)?)",
				defaultMessage: "Ad ovest non puoi andare.",
				direzione: "o"
			},
			alto: {
				movimento: true,
				pattern: "(sali|(vai in |vai )?a(lto)?|u(p)?|su)",
				defaultMessage: "In alto non puoi andare.",
				direzione: "a"
			},
			basso: {
				movimento: true,
				pattern: "(scendi|(vai in |vai )?b(asso)?|d(own)?|giu)",
				defaultMessage: "In basso non puoi andare.",
				direzione: "b"
			}
		}
	}

	loadVerbs(){
		this.verbs = {
			apri: {
				defaultMessage: "Non si apre"
			},
			apriCon: {
				pattern: "apri (.+) (?:con|col|coi) (.+)",
				complex: true,
				defaultMessage: "Non si apre"
			},
			chiudi: {
				defaultMessage: "Non si chiude"
			},
			tira: {
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			premi: {
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			spingi: {
				pattern: "(spingi|sposta)",
				defaultMessage: "Non si muove."
			},
			prendi: {
				pattern: "(prendi|raccogli)",
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},		
			lascia: {
				pattern: "(lascia|posa|abbandona|metti (?:giu))",
				inventario: true,
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			metti: {
				pattern: "(metti|infila|inserisci) (.+) (?:in|su) (.+)",
				complex: true,
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			indossa: {
				pattern: "(indossa|metti|infila)(?:ti)?",
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			togli: {
				pattern: "(togli|leva|sfila)(?:ti)?",
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			dai: {
				pattern: "(dai) (.+) a (.+)",
				inventario: true,
				complex: true,
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			guarda: {
				pattern: "(guarda|esamina)",
				defaultMessage: this.defaultMessages.NULLA_DI_PARTICOLARE
			},
			leggi: {
				defaultMessage: this.defaultMessages.NULLA_DI_PARTICOLARE
			},
			cerca:{
				pattern: "(cerca|trova)",
				defaultMessage: this.defaultMessages.NON_TROVATO,
			},
			sali: {
				defaultMessage: this.defaultMessages.NON_HO_CAPITO,
			}, 
			scendi: {
				defaultMessage: this.defaultMessages.NON_HO_CAPITO,
			}
		};
	}
}
