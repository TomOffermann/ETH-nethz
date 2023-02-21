<script lang="ts">
	export let label:string;
  export let value:number;
  export let updateMatrix:(() => void);
  
</script>

<div id="container">
  <p id="text">{label}</p>
  <input on:keydown|preventDefault={() => {}} bind:value={value} min="1" max="8" on:input={() => {updateMatrix()}} id="input" type="number" />
</div>
<style>
  #container {
    margin-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }
  #text {
    font-family: "Cascadia Code";
    font-size: 18px;
    color: #010d4a;
  }
  #input {
    font-family: "Cascadia Code";
    width: 38px;
    height: 25px;
    border: 1px solid #011474;
    border-radius: 1.5px;
    padding: 5px;
    text-align: start;
  }
</style>