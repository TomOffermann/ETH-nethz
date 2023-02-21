<script lang="ts">
	import { Matrix, QR } from "../../../LinAlgTools/LinAlgTools";
	import EditableMatrix from "./EditableMatrix.svelte";
	import ReadOnlyMatrix from "./ReadOnlyMatrix.svelte";
	import Select from "./Select.svelte";
  
  let dimension = 3;

  let mData = Array(dimension).fill(0).map(e => new Array(dimension).fill(0))

  let matrix = new Matrix(mData);
  let stringRep:string[][] = new Array(matrix.n).fill(0).map(e => new Array(matrix.m).fill("0"))

  const updateM = () => {
    let mData = new Array(dimension).fill(0).map(e => new Array(dimension).fill(0))
    let sData:string[][] = new Array(dimension).fill(0).map(e => new Array(dimension).fill("0"))
    let mNew = new Matrix(mData);
    matrix = mNew;
    stringRep = sData;
  }

  const QR_copy = (m:Matrix):[Matrix, Matrix] => QR.decompose(new Matrix(JSON.parse(JSON.stringify(m.getData()))));

</script>

<div id="container"> 
  <Select updateMatrix={updateM} bind:value={dimension} label="Dimension:"></Select>
</div>
<br>
<div id="container">
  <EditableMatrix bind:matrix={matrix} bind:stringRep={stringRep}></EditableMatrix>
  &rArr;
  <ReadOnlyMatrix matrix={QR_copy(matrix)[0]}></ReadOnlyMatrix>
  <ReadOnlyMatrix matrix={QR_copy(matrix)[1]}></ReadOnlyMatrix>
</div>
<br>
<div id="text">* Note that we only get a proper QR-decomposition (for this program) <br> if the given matrix has full rank.</div>

<style>
  #text {
    font-size: 18px;
    color: #010d4a;
    font-family: "Cascadia Code";
    margin-right: 15px;
  }
  #container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }
</style>