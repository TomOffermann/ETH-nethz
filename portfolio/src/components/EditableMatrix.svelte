<script lang="ts">
  import type { Matrix } from "../../../LinAlgTools/LinAlgTools";
  export let matrix:Matrix;

  export let stringRep:string[][];

  const changeValue = (e:string, r:number, c:number) => {
    stringRep[r][c] = e;
    matrix.getData()[r][c] = isNaN(parseFloat(e)) ? 0 : parseFloat(e);
    matrix = matrix;
  }

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
    width: 35px;
    height: 25px;
    border: 1px solid #011474;
    border-radius: 1.5px;
    padding: 5px;
    text-align: center;
  }
</style>

<div id="wrapper">
  <div id="readOnlyMatrix">
    {#each stringRep as row, rowIndex}
      <div id="row">
        {#each row as elem, colIndex}
          <input value={elem} on:input={(e) => changeValue(e.currentTarget.value, rowIndex, colIndex)} id="elem"/>
        {/each}
      </div>
    {/each}
  </div>
</div>
