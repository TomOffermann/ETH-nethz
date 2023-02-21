<script lang="ts">
	import { GAUSS, Matrix, Vector, Solution } from "../../../LinAlgTools/LinAlgTools";
	import EditableMatrix from "./EditableMatrix.svelte";
	import Select from "./Select.svelte";

  let rows = 3;
  let cols = 3;
  
  let vData = new Array(cols).fill(0);
  let matrix = new Matrix(Array(rows).fill(0).map(e => new Array(cols).fill(0)));
  let stringRep:string[][] = new Array(matrix.n).fill(0).map(e => new Array(matrix.m).fill("0"))
  
  let vec = new Matrix([vData]).transpose();
  let stringRepV:string[][] = new Array(vec.n).fill(0).map(e => new Array(vec.m).fill("0"))

  let copy = (obj:number[][]) => JSON.parse(JSON.stringify(obj));

  const updateM = () => {
    let mData = new Array(rows).fill(0).map(e => new Array(cols).fill(0))
    let sData:string[][] = new Array(rows).fill(0).map(e => new Array(cols).fill("0"))
    let mNew = new Matrix(mData);
    matrix = mNew;
    stringRep = sData;
  }
  const updateV = () => {
    let vData = new Array(cols);
    let sData:string[][] = new Array(1).fill(0).map(e => new Array(cols).fill("0"))
    vec = new Matrix([vData]).transpose();
    stringRepV = sData;
  }
</script>

<div id="container"> 
  <Select updateMatrix={updateM} bind:value={rows} label="Rows:"></Select>
  <Select updateMatrix={() => {updateM(); updateV()}} bind:value={cols} label="Columns:"></Select>
</div>
<br>
<div id="container">
  <EditableMatrix bind:matrix={matrix} bind:stringRep={stringRep}></EditableMatrix>
  <div id="text">|</div>
  <EditableMatrix bind:matrix={vec} bind:stringRep={stringRepV}></EditableMatrix>
  &rArr;
  <div id="solution">
    {#each (GAUSS.solve(new Matrix(copy(matrix.getData())), new Vector(vec.transpose().getData()[0])) ?? new Solution([])).getData() as e, i}
      x{i}: {e} <br>
    {/each}
  </div>
</div>

<style>
  #text {
    font-size: 16px;
    color: #010d4a;
    font-family: "Cascadia Code";
    margin: 0px 3px;
  }
  #container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }
  #solution {
    margin-left: 15px;
    display: flex;
    font-size: 22px;
    font-family: Cascadia Code;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: #010d4a;
    border: 2px solid #010d4a;
    border-radius: 5px;
  }
</style>