<script lang="ts">
	import type { Matrix } from "../../../LinAlgTools/LinAlgTools";

  export let design = 'inner label'
  export let fontSize = 16;
  export let valueA = "on";
  export let valueB = "off";
  export let matrix:Matrix;

  export let checked = true;
  const slugify = (str = "") =>
  str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");

</script>

{#if design == 'inner'}
<div class="s s--inner">
  <button
      role="switch"
      aria-checked={checked}
      on:click={() => {checked = !checked; matrix = matrix}}>
          <span>{valueA}</span>
          <span>{valueB}</span>
  </button>
</div>
{:else if design == 'slider'}
<div class="s s--slider" style="font-size:{fontSize}px">
  <button
      role="switch"
      aria-checked={checked}
      on:click={() => {checked = !checked}}>
  </button>
</div>
{/if}

<style>
    :root {
  --accent-color: #011474;
  --gray: rgb(250, 248, 240);
}
  /* Inner Design Option */
  .s--inner button {
    border: none;
    outline: none;
      padding: 0.35em;
      background-color: rgb(250, 248, 240);
  }
  [role='switch'][aria-checked='true'] :first-child,
  [role='switch'][aria-checked='false'] :last-child {
      display: none;
      color: #fff;
  }

  .s--inner button span {
      font-family: "Cascadia Code";
      color: var(--accent-color);
      user-select: none;
      pointer-events:none;
      padding: 0.25em;
  }

  /* Slider Design Option */

  .s--slider {
      display: flex;
      align-items: center;
  }

  .s--slider button {
      width: 3em;
      height: 1.6em;
      position: relative;
      margin: 0 0 0 0.5em;
      background: var(--gray);
      border: none;
  }

  .s--slider button::before {
      content: '';
      position: absolute;
      width: 1.3em;
      height: 1.3em;
      background: rgb(250, 248, 240);
      top: 0.13em;
      right: 1.5em;
      transition: transform 0.3s;
  }

  .s--slider button[aria-checked='true']{
      background-color: var(--accent-color)
  }

  .s--slider button[aria-checked='true']::before{
      transform: translateX(1.3em);
      transition: transform 0.3s;
  }

  .s--slider button:focus {
      box-shadow: 0 0px 0px 1px var(--accent-color);
  }
  /* gravy */ 

  /* Inner Design Option */
  [role='switch'][aria-checked='true'] :first-child,
  [role='switch'][aria-checked='false'] :last-child {
      border-radius: 0.25em;
      background: var(--accent-color);
      display: inline-block;
  }

  /* Slider Design Option */
  .s--slider button {
      border-radius: 1.5em;
  } 
  
  .s--slider button::before {
      border-radius: 100%;
  }

  .s--slider button:focus {
      box-shadow: 0 0px 8px var(--accent-color);
      border-radius: 1.5em;
  }
</style>