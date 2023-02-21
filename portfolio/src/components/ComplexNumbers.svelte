<script lang="ts">
  import { ComplexNumber, CustomMath } from "../../../LinAlgTools/LinAlgTools";
	import FloatSelect from "./FloatSelect.svelte";
  let aR = 0;
  let aI = 0;
  let bR = 0;
  let bI = 0;
  const displayComplex = (operation:string, A:ComplexNumber, B:ComplexNumber):string => {
    let res:ComplexNumber;
    if(operation === "add") {
      res = A.add(B);
    } else if(operation === "subtract") {
      res = A.subtract(B);
     } else if(operation === "multiply") {
      res = A.multiply(B);
    } else {
      res = A.divide(B);
    }
    return CustomMath.round(res.real, 3) + " + " + CustomMath.round(res.img, 3) + "i";
  }
  let currentOperation:string = "add";
</script>

<div id="container-row">
  <div id="text">Operation: </div>
  <select name="operation" id="operation" on:input={(e) => {currentOperation = (e.currentTarget.value).toLowerCase()}}>
    <option value="add">Add</option>
    <option value="subtract">Subtract</option>
    <option value="multiply">Multiply</option>
    <option value="divide">Divide</option>
  </select>
</div>
<br>
<div id="container-row">
  <div id="text">Number A: </div>
  <FloatSelect label="Real Part: " bind:value={aR}></FloatSelect>
  <FloatSelect label="Imaginary Part: " bind:value={aI}></FloatSelect>
</div>
<div id="container-row">
  <div id="text">Number B: </div>
  <FloatSelect label="Real Part: " bind:value={bR}></FloatSelect>
  <FloatSelect label="Imaginary Part: " bind:value={bI}></FloatSelect>
</div>
<br>
<div id="result">
  <div id="text">Result: {displayComplex(currentOperation, new ComplexNumber(aR,aI), new ComplexNumber(bR,bI))}</div>  
</div>

<style>
  #operation {
    font-family: "Cascadia Code";
    border: 1px solid #011474;
    border-radius: 1.5px;
    padding: 5px;
    text-align: center;
    font-size: 16px;
  }
  #text {
    font-size: 18px;
    color: #010d4a;
    font-family: "Cascadia Code";
    margin-right: 15px;
  }
  #container-row {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
  }
  #result {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #010d4a;
    border-radius: 12px;
  }
</style>