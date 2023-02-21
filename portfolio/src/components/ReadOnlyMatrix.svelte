<script lang="ts">
  import { Matrix, CustomMath } from "../../../LinAlgTools/LinAlgTools";
  export let matrix = new Matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  $: matrixRep = matrix.getData();
</script>

<style>
  #wrapper {
    display: inline-block;
    margin: 5px;
  }
  #readOnlyMatrix {
    padding: 10px;
    border: 1px solid #011474;
    border-radius: 5px;
    gap: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  #row {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: start;
    width: auto;
    height: auto;
  }
  #elem {
    font-family: "Cascadia Code";
    font-size: 16px;
    line-height: 25px;
    width: 45px;
    height: 25px;
    border: 1px solid #011474;
    border-radius: 1.5px;
    padding: 5px;
    text-align: center;
  }
</style>

<div id="wrapper">
  <div id="readOnlyMatrix">
    {#each matrixRep as row}
      <div id="row">
        {#each row as elem}
          <div id="elem">{CustomMath.round(elem, 2)}</div>
        {/each}
      </div>
    {/each}
  </div>
</div>
