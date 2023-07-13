
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFortAwesome} from "@fortawesome/free-brands-svg-icons";


const Homepage = () => {
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
                            <li><a href="#progetto">Il Progetto</a></li>
                            <li><a href="#autore">L'Autore</a></li>
                            <li><a href="#link">Link Utili</a></li>
                        </ul>
                    </nav>
                </header>
                <footer id="footer">
                    <p className="copyright">© 2023. Design: <a href="https://html5up.net" target="_blank">HTML5 UP</a>.</p>
                </footer>
            </div>
            <div id="bg"></div>
        </>
    );
}

export default Homepage;