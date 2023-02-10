<script lang="ts"
>
</script>
<div id="display">
<div id="app">
<div id="socials">
  <a target="_blank" rel="noreferrer" href="https://github.com/TomOffermann">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" width="18px">
  </a>
  <a target="_blank" rel="noreferrer" href="https://www.instagram.com/tom.offmn/">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png" width="16px">
  </a>
  <div id="plug">@Tom Offermann</div> 
</div>

<h1 id="title">LinALG Tools:</h1>
<div>• <a href="complex-numbers">Complex Numbers</a></div>
<div>• <a href="matrix-multiplication">Matrix Multiplication</a></div>
<div>• <a href="gauss">GAUSS, ref & rref</a></div>
<div>• <a href="sle">Solve SLE</a></div>
<div>• <a href="least-sqaures">Least-Squares</a></div>
<div>• <a href="gram-schmidt">Gram-Schmidt</a></div>
<div>• <a href="qr-decomposition">QR-Decomposition</a></div>

<br>

<h2 id="title">In Progress:</h2>
<div id="todo">• Eigenvalues of a matrix</div>
<div id="todo">• SVD-Calculator</div>

<br>
<br>
<br>

<a id="github" href="https://github.com/TomOffermann/ETH-nethz" target="_blank" rel="noreferrer">Source Code</a>
<a id="github" href="https://github.com/TomOffermann/ETH-nethz/issues" target="_blank" rel="noreferrer">Report Bug/ Pull Request</a>
</div>
</div>
<style>
  a {
    color: #011474;
    font-family: "Cascadia Code";
  }
  #socials {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: start;
  }
  #title {
    color: #010d4a;
    font-family: "Cascadia Code";
  }
  #plug {
    color: #011474;
    font-family: "Cascadia Code";
    font-size: 12px;
  }
  #todo {
    color: #011474;
    font-family: "Cascadia Code";
  }
  #app {
    display: inline-block;
    padding: 40px;
    border-radius: 5px;
    border: 2px solid #011474;
    background-color: rgb(250, 248, 240);
  }
  #display {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
	#github {
    border: 1px solid black;
    border-radius: 3px;
    padding: 4px;
    background-color:aliceblue;
		color: grey;
    color: #011474;
    font-family: "Cascadia Code";
		font-size: 14px;
	}
  #github:link {
    text-decoration: none;
  }
  #github:visited {
    text-decoration: none;
  }
  #github:hover {
    text-decoration: none;
  }
  #github:active {
    text-decoration: none;
  }
</style>