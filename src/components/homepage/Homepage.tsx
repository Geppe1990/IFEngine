// TODO: DARE STILI ALLA MODAL: GUARDARE RIGA 70
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFortAwesome} from "@fortawesome/free-brands-svg-icons";
import Modal from "react-modal";
import React, {ReactNode, useState} from "react";

const ProjectContent = <article id="progetto" className="active">
        <h2 className="major">Il Progetto</h2>
        <p><strong>Avventura nel Castello in JavaScript</strong> è un porting in Javascript (con specifiche
            EcmaScript 6) del gioco "Avventura nel Castello" v4.1 per MS-DOS di Enrico Colombini e Chiara
            Tovena.</p>
        <p>La versione Javascript è a cura di Federico Volpini (<a
            href="mailto:volpini.federico79@gmail.com">volpini.federico79@gmail.com</a>)</p>
        <p>Il gioco è stato riprodotto col consenso degli autori. La riproduzione è fedele al 99% e le piccole
            differenze rispetto al gioco originale sono state comunque discusse e approvate dagli autori
            stessi.</p>
        <p>La licenza di distribuzione del porting è <a
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.it" target="_blank">CC BY-NC-ND
            4.0</a> (Attribution-NonCommercial-NoDerivatives 4.0 International)</p>
        <hr />
        <h3>Note</h3>
        <p>Il porting, come il gioco originale, prevede il salvataggio dello stato a cui si è giunti. Il
            salvataggio è reso possibile grazie al Window.localStorage. A tal proposito è bene ricordare
            che:</p>
        <ol>
            <li>se il localstorage è disabilitato non sarà possibile effettuare salvataggi;</li>
            <li>se, per impostazione del browser, il localstorage viene cancellato ad ogni chiusura del
                browser stesso, i salvataggi andranno persi.
            </li>
        </ol>

        <div className="close">Close</div>
    </article>

const AuthorContent = <article id="autore">
        <h2 className="major">L'autore</h2>
        <p>Mi chiamo Federico Volpini, sono del '79 e ho la passione dell'informatica da quando, all'età di 5 anni, mio padre mi regalò il mio primo computer: un VIC-20!</p>
        <p>Da grande mi sono appassionato allo sviluppo web, in particolare con PHP e Javascript.<br/>Non sono un guru, però grazie a queste nuove conoscenze acquisite mi sono cimentato prima nello sviluppo di un engine per poter scrivere avventure testuali in un linguaggio direttamente interpretato dal browser e, successivamente, ad adattarlo alla prima avventura testuale a cui ho giocato (e che mi appassionò tantissimo): "Avventura nel Castello".</p>
        <p>A gennaio del 2021 mi sono messo a scrivere il porting. Quando sono giunto ad una "demo" giocabile ho pensato di scrivere allo stesso Colombini per informarlo delle mie intenzioni e per avere un suo parere.</p><p>Enrico, dopo avermi ricordato che c'è ancora il copyright sul suo materiale, si è dimostrato subito interessato e mi ha spronato a continuare. Ne è nato un bello scambio elettronico-epistolare che tutt'ora continua.</p><p>Per facilitarmi il lavoro mi ha gentilmente concesso la lettura dei suoi sorgenti, grazie ai quali lo sviluppo ha subìto una forte accelerata.</p>
        <p>Se sono riuscito a portare a termine questo lavoro lo devo principalmente a lui.<br/>Non smetterò mai di ringraziarlo.</p>
        <p>Se vuoi segnalarmi un bug oppure semplicemente scrivermi, puoi farlo all'indirizzo <a href="mailto:volpini.federico79@gmail.com">volpini.federico79@gmail.com</a>. Sarò ben felice di risponderti non appena possibile!</p>
        <div className="close">Close</div>
    </article>

const LinkContent = <article id="link" className="active">
        <h2 className="major">Link Utili</h2>
        <p>Un breve elenco di link utili:</p>
        <ul>
            <li>
                <a href="https://www.erix.it/" target="_blank">Il sito di Enrico Colombini</a>
            </li>
            <li>
                <a href="https://www.erix.it/avventure.html#cast" target="_blank">La pagina di Avventura nel
                    Castello, sempre nel sito di Colombini</a>
            </li>
            <li>
                <a href="https://www.oldgamesitalia.net/if-italia-avventure-testuali" target="_blank">La
                    sezione dedicata alle avventure testuali di OldGamesItalia</a>
            </li>
            <li>
                <a href="https://www.avalast.it/giochi-online/avventure-testuali/" target="_blank">Sezione
                    avventure testuali del portale Avalast.it</a>
            </li>
        </ul>
        <div className="close">Close</div>
    </article>

const NavModal = ({ opened, content } : { opened: boolean, content: ReactNode })=> <Modal isOpen={opened}>{content}</Modal>

Modal.setAppElement('#root');

const Homepage = () => {
    useState()
    const [projectModal, setProjectModal] = useState(false);
    const [authorModal, setAuthorModal] = useState(false);
    const [linkModal, setLinkModal] = useState(false);

    const handleModal = (project: boolean, author: boolean, link: boolean) => {
        setProjectModal(false);
        setAuthorModal(false);
        setLinkModal(true);
    }

    return (
        <>
            <div id="wrapper">
                <header id="header">
                    <div className="logo">
                        <FontAwesomeIcon icon={faFortAwesome} />
                    </div>
                    <div className="content">
                        <div className="inner">
                            <h1>Avventura<br/>nel Castello<br/>in React</h1>
                            <p>Sei impaziente? <a href="play/" className="button primary" target="_blank">Gioca Subito!</a></p>
                        </div>
                    </div>
                    <nav>
                        <ul>
                            <li><button onClick={() => handleModal(true, false, false)}>Il Progetto</button></li>
                            <li><button onClick={() => handleModal(false, true, false)}>L'Autore</button></li>
                            <li><button onClick={() => handleModal(false, false, true)}>Link Utili</button></li>
                        </ul>
                    </nav>
                </header>
                <div id="main">
                    <NavModal opened={projectModal} content={ProjectContent} />
                    <NavModal opened={authorModal} content={AuthorContent} />
                    <NavModal opened={linkModal} content={LinkContent} />
                </div>
                <footer id="footer">
                    <p className="copyright">© 2023. Design: <a href="https://html5up.net" target="_blank">HTML5 UP</a>.</p>
                </footer>
            </div>
            <div id="bg"></div>
        </>
    );
}

export default Homepage;