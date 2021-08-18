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
			NON_E_POSSIBILE: 		"Non è possibile"
		}

		this.loadCommands();
		this.loadVerbs();
		
	}

	loadCommands(){
		this.commands = {
			nord: {
				movimento: true,
				pattern: "(vai\\s+verso\\s+|vai\\s+a\\s+|vai\\s+)?(n(ord)?)",
				defaultMessage: "A nord non puoi andare.",
				direzione: "n"
			},
			sud: {
				movimento: true,
				pattern: "(vai\\s+verso\\s+|vai\\s+a\\s+|vai\\s+)?(s(ud|outh)?)",
				defaultMessage: "A sud non puoi andare.",
				direzione: "s"
			},
			est: {
				movimento: true,
				pattern: "(vai\\s+verso\\s+|vai\\s+a\\s+|vai\\s+)?(e(st)?)",
				defaultMessage: "A est non puoi andare.",
				direzione: "e"
			},
			ovest: {
				movimento: true,
				pattern: "(vai\\s+verso\\s+|vai\\s+a\\s+|vai\\s+)?(o(vest)?|w(est)?)",
				defaultMessage: "Ad ovest non puoi andare.",
				direzione: "o"
			},
			alto: {
				movimento: true,
				pattern: "(sali|(vai\\s+in\\s+|vai\\s+)?a(lto)?|u(p)?|su)",
				defaultMessage: "In alto non puoi andare.",
				direzione: "a"
			},
			basso: {
				movimento: true,
				pattern: "(scendi|(vai\\s+in\\s+|vai\\s+)?b(asso)?|d(own)?|giu)",
				defaultMessage: "In basso non puoi andare.",
				direzione: "b"
			}
		}
	}

	loadVerbs(){
		this.verbs = {
			apri: {
				singolo: true,
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
				defaultMessage: "Non si muove."
			},
			prendi: {
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},		
			lascia: {
				inventario: true,
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			dai: {
				inventario: true,
				pattern: "(dai)\\s+(.+)\\s+(?:a)\\s+(.+)",
				complex: true,
				defaultMessage: this.defaultMessages.PREFERISCO_DI_NO
			},
			guarda: {
				pattern: "(guarda|esamina)",
				defaultMessage: this.defaultMessages.NULLA_DI_PARTICOLARE
			},
			usaCon: {
				pattern: "(usa\\s+)(.+)(?:\\s+con\\s+)(.+)",
				complex: true,
				defaultMessage: "Non posso usarli insieme.",
			},
			usa:{
				defaultMessage: this.defaultMessages.SII_PIU_SPECIFICO
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
