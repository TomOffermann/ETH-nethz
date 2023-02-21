<script lang="ts">
	import { GAUSS, Matrix } from "../../../LinAlgTools/LinAlgTools";
	import EditableMatrix from "./EditableMatrix.svelte";
	import ReadOnlyMatrix from "./ReadOnlyMatrix.svelte";
	import Select from "./Select.svelte"

  let rows1 = 3;
  let mid = 3;
  let cols2 = 3;

  let mData1 = Array(rows1).fill(0).map(e => new Array(mid).fill(0))
  let mData2 = Array(mid).fill(0).map(e => new Array(cols2).fill(0))


  let matrix1 = new Matrix(mData1);
  let matrix2 = new Matrix(mData2);
  let stringRep1:string[][] = new Array(matrix1.n).fill(0).map(e => new Array(matrix1.m).fill("0"))
  let stringRep2:string[][] = new Array(matrix2.n).fill(0).map(e => new Array(matrix2.m).fill("0"))

  const updateM1 = () => {
    let mData1 = new Array(rows1).fill(0).map(e => new Array(mid).fill(0))
    let sData:string[][] = new Array(rows1).fill(0).map(e => new Array(mid).fill("0"))
    let mNew = new Matrix(mData1);
    matrix1 = mNew;
    stringRep1 = sData;
  }

  const updateM2 = () => {
    let mData = new Array(mid).fill(0).map(e => new Array(cols2).fill(0))
    let sData:string[][] = new Array(mid).fill(0).map(e => new Array(cols2).fill("0"))
    let mNew = new Matrix(mData);
    matrix2 = mNew;
    stringRep2 = sData;
  }
</script>

<div id="container"> 
  <Select updateMatrix={updateM1} bind:value={rows1} label="Rows A:"></Select>
  <Select updateMatrix={() => {updateM1(); updateM2()}} bind:value={mid} label="Columns A/ Rows B:"></Select>
  <Select updateMatrix={updateM2} bind:value={cols2} label="Columns B:"></Select>
</div>
<br>
<div id="container">
  <EditableMatrix bind:matrix={matrix1} bind:stringRep={stringRep1}></EditableMatrix>
  &#215;
  <EditableMatrix bind:matrix={matrix2} bind:stringRep={stringRep2}></EditableMatrix>
  =
  <ReadOnlyMatrix matrix={Matrix.multiply(matrix1, matrix2)}></ReadOnlyMatrix>
</div>

<style>
  #container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }
</style>