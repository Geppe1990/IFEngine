html,body{
	margin:0px;
}

body {
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #110900;
  color: #fc0;
}

#mobileInput{
  background-color: #110900;
  color: #fc0;
  border: 1px solid #fc0;
  width: 100%;
  margin-top: 1em;
  display: none;
}

body.green {
  background-color: #000900;
  color: #0f0;
}

#crt{
  margin:20px;
}

#crt:before {
    content: " ";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("bg.png");
    z-index: 2;
    pointer-events: none;
}

#cursor{
  border-right:none;
  /*box-shadow: 0 0 0.3em #fc0;*/
}

.green #cursor{
  box-shadow: 0 0 0.3em #0f0;
}

#cursor.blinking{
  border-right:12px solid #fc0;
  animation: blink-caret 0.40s step-end infinite;
}

.green #cursor.blinking{
  border-right:12px solid #0f0;
  animation: blink-caret-green 0.40s step-end infinite;
}

.blinkingText{
  font-style:normal;
  animation: blink-text 0.40s step-end infinite;
}

.reversed.blinkingText{
  font-style:normal;
  animation: blink-text-reversed 0.40s step-end infinite;
}

.green i, .green .blinkingText{
  font-style:normal;
  animation: blink-text-green 0.40s step-end infinite;
}

.reversed{
  font-weight: bold;
  background-color:#fc0;
  color:#430;
  /*
  box-shadow: 0px 0px 0.4em #fa0; 
  text-shadow: 0px 0px 0.05em #a20 !important;
  */
}

.green .reversed{
  background-color:#0f0;
  color:#030;
  /*
  box-shadow: 0px 0px 0.4em #0a0;
  text-shadow: 0px 0px 0.4em #0a0 !important;
  */
}

@keyframes blink-caret {
  from, to { border-color: transparent; box-shadow: none;}
  50% { border-color: #fc0; /*box-shadow: 0 0 0.6em #fc0;*/}
}

@keyframes blink-caret-green {
  from, to { border-color: transparent; box-shadow: none;}
  50% { border-color: #0f0; /*box-shadow: 0 0 0.6em #0f0;*/}
}

@keyframes blink-text {
  from, to { color: transparent;text-shadow: none; }
  50% { color: #fc0; /*text-shadow: 0 0 3px #fc0;*/}
}

@keyframes blink-text-reversed {
  from, to { visibility:visible; }
  50% { visibility:hidden;}
}

@keyframes blink-text-green {
  from, to { color: transparent }
  50% { color: #0f0; }
}



#screen{
  margin:0 auto;
  padding:0;
}

pre{
	margin:0;
  padding:0;
  white-space:pre-wrap;
  word-wrap: break-word;
  font-family: "Consolas","DejaVu Sans Mono", "Liberation Mono",monospace;
  font-size:24px;
  /* text-shadow: 0px 0px 3px #fa0; */
}

.green pre{
  text-shadow: 0px 0px 3px #0a0;
}

@media screen and (max-width: 1199px) and (min-width: 400px){
  pre{
    font-size:20px;
  }
}

@media screen and (max-width: 479px){
  pre{
    font-size:16px;
  }
}

#picOverlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  visibility: hidden;
  justify-content: center;
  align-items: center;
}

#picOverlay img {
  max-height: 100%;
}



