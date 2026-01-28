<script lang="ts">
  export let show = false;
  export let x;
  export let y;
  export let data: (string | number | boolean)[][] = [];
  export let selected: string;
  export let copy: (e: any) => void;
  export let cut: (e: any) => void;
  export let paste: (e: any) => any[][];
  export let clear: (e: any) => any[][];
  // delete is a reserved word...
  export let delet: (e: any) => any[][];
  export let readOnly = false;
</script>

<div class="menu" class:hidden={!show} style={`top: ${y}px; left: ${x}px`}>
  <div
    class="item flex justify-between"
    class:disabled={readOnly}
    on:click={(e) => !readOnly && cut(e)}
  >
    <div>Cut</div>
    <div class="disabled">⌘X</div>
  </div>
  <div class="item flex justify-between" on:click={(e) => copy(e)}>
    <div>Copy</div>
    <div class="disabled">⌘C</div>
  </div>
  <div
    class="item flex justify-between"
    class:disabled={readOnly}
    on:click={(e) => !readOnly && paste(e)}
  >
    <div>Paste</div>
    <div class="disabled">⌘P</div>
  </div>
  <div class="divider" />
  <div class="item" class:disabled={readOnly}>Insert</div>
  <div
    class="item"
    class:disabled={readOnly}
    on:click={(e) => !readOnly && delet(e)}
  >
    Delete
  </div>
  <div
    class="item"
    class:disabled={readOnly}
    on:click={(e) => !readOnly && clear(e)}
  >
    Clear contents
  </div>
</div>

<style>
  .menu {
    padding: 0.5rem 0.25rem;
    position: fixed;
    z-index: 20;
    min-width: 10rem;
    background: var(--sheet-menu-bg);
    border-radius: 10px;
    color: var(--sheet-text);
  }
  .disabled {
    color: var(--sheet-muted);
  }
  .divider {
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #aaa;
  }
  .hidden {
    display: none;
  }
  .flex {
    display: flex;
  }
  .justify-between {
    justify-content: space-between;
  }
  .item {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
  .item:hover {
    background-color: var(--sheet-accent);
    color: var(--sheet-bg);
  }
  .item.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  .item.disabled:hover {
    background-color: transparent;
  }
</style>
