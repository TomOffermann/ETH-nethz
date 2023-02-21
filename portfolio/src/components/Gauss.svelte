<script lang="ts">
	import { GAUSS, Matrix } from "../../../LinAlgTools/LinAlgTools";
	import EditableMatrix from "./EditableMatrix.svelte";
	import ReadOnlyMatrix from "./ReadOnlyMatrix.svelte";
	import Select from "./Select.svelte";
	import Switch from "./Switch.svelte";

  let isRref = true;

  let rows = 3;
  let cols = 3;

  let mData = Array(rows).fill(0).map(e => new Array(cols).fill(0))

  let matrix = new Matrix(mData);
  let stringRep:string[][] = new Array(matrix.n).fill(0).map(e => new Array(matrix.m).fill("0"))
  const gauss = (m:Matrix):Matrix => {
    if(isRref) {
      return GAUSS.rref(new Matrix(JSON.parse(JSON.stringify(m.getData()))))
    } else {
      return GAUSS.ref(new Matrix(JSON.parse(JSON.stringify(m.getData()))))
    }
  }

  const updateM = () => {
    let mData = new Array(rows).fill(0).map(e => new Array(cols).fill(0))
    let sData:string[][] = new Array(rows).fill(0).map(e => new Array(cols).fill("0"))
    let mNew = new Matrix(mData);
    matrix = mNew;
    stringRep = sData;
  }
</script>

<div id="container"> 
  <div id="text">
    Select: 
  </div>
  <Switch bind:matrix={matrix} bind:checked={isRref} design="inner" valueA="rref" valueB="ref" ></Switch>
</div>
<div id="container"> 
  <Select updateMatrix={updateM} bind:value={rows} label="Rows:"></Select>
  <Select updateMatrix={updateM} bind:value={cols} label="Columns:"></Select>
</div>
<br>
<div id="container">
  <EditableMatrix bind:matrix={matrix} bind:stringRep={stringRep}></EditableMatrix>
  &rArr;
  <ReadOnlyMatrix matrix={gauss(matrix)}></ReadOnlyMatrix>
</div>

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