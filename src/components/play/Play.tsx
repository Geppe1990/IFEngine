const Play = () => {
    return (
        <div id="crt">
            <div id="screen" style={{position: "relative"}}>
                <pre><span id="char" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    visibility: "hidden"
                }}>@</span><span id="fixed"></span><span id="txt"></span><span id="cursor"></span></pre>
                <input type="text" id="mobileInput"/>
            </div>
        </div>
    );
}

export default Play;