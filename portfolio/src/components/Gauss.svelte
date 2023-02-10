<script lang="ts">
	import { GAUSS, Matrix } from "../../../LinAlgTools/LinAlgTools";
	import EditableMatrix from "./EditableMatrix.svelte";
	import ReadOnlyMatrix from "./ReadOnlyMatrix.svelte";
	import Switch from "./Switch.svelte";

  let isRref = true;

  let matrix = new Matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const gauss = (m:Matrix):Matrix => {
    if(isRref) {
      return GAUSS.rref(new Matrix(JSON.parse(JSON.stringify(m.getData()))))
    } else {
      return GAUSS.ref(new Matrix(JSON.parse(JSON.stringify(m.getData()))))
    }
  }
</script>

<div id="container"> 
  <div id="text">
    Select: 
  </div>
  <Switch bind:matrix={matrix} bind:checked={isRref} design="inner" valueA="rref" valueB="ref" ></Switch>
</div>
<br>
<div id="container">
  <EditableMatrix bind:matrix={matrix}></EditableMatrix>
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