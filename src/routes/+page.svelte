<script lang="ts">
  import { Sheet } from "$lib";

  let readOnly = false;
  let disableHover = false;
  let darkTheme = false;
  let accent = "#ff7a59";

  const columns = [
    { width: "140px" },
    { width: "120px" },
    { width: "100px" },
    { width: "160px" },
    { width: "100px" },
    { width: "80px" },
    { width: "120px" },
    { width: "100px" },
    { width: "180px" },
  ];

  const headers = ["Project", "Owner", "Status", "Milestone", "Priority", "Complete", "Budget", "Progress", "Notes"];
  const projects = ["Falcon", "Nimbus", "Orion", "Atlas", "Zenith", "Nova", "Apex", "Vertex", "Pulse", "Echo"];
  const owners = ["Ava", "Kai", "Maya", "Noah", "Liam", "Emma", "Zoe", "Ethan", "Mia", "Leo"];
  const statuses = ["In progress", "Paused", "In review", "Shipped", "Planning", "On hold", "Complete"];
  const milestones = ["Tooling", "Specs", "Pilot run", "Retro", "MVP", "Beta", "Launch", "Review", "Testing"];
  const priorities = ["High", "Medium", "Low", "Critical"];
  const notes = ["Vendor review", "Waiting on design", "QA checklist", "Follow-up pending", "Needs approval", "On track", "Blocked", "Ahead of schedule"];

  function generateRows(count: number) {
    const rows = [headers];
    for (let i = 0; i < count - 1; i++) {
      rows.push([
        projects[i % projects.length] + "-" + (i + 1),
        owners[i % owners.length],
        statuses[i % statuses.length],
        milestones[i % milestones.length],
        priorities[i % priorities.length],
        Math.random() > 0.5,  // Boolean for "Complete" column
        "$" + ((i + 1) * 5000).toLocaleString(),
        Math.floor(Math.random() * 100) + "%",
        notes[i % notes.length],
      ]);
    }
    return rows;
  }

  let tableData = generateRows(100);

  $: options = {
    tableHeight: "70vh",
    defaultColWidth: "140px",
    readOnly,
    disableHover,
    editable: !readOnly,
    selectionCopy: !readOnly,
    columnResize: !readOnly,
    rowResize: !readOnly,
    columnDrag: false,
    rowDrag: false,
    wordWrap: false,
    booleanColumns: [5],  // Column 5 ("Complete") is a boolean column
  } as any;

  const columnLetter = (index: number) => {
    let n = index + 1;
    let result = "";
    while (n > 0) {
      const rem = (n - 1) % 26;
      result = String.fromCharCode(65 + rem) + result;
      n = Math.floor((n - 1) / 26);
    }
    return result;
  };

  $: headerStyle = columns.reduce((acc, _col, idx) => {
    acc[`${columnLetter(idx)}1`] = `background-color: ${accent}; color: #0f172a; font-weight: 700;`;
    return acc;
  }, {} as Record<string, string>);

  const accentPresets = ["#ff7a59", "#7cdb9a", "#ffd166", "#9bb7ff", "#f59bd6"];
</script>

<section class="demo-shell" data-theme={darkTheme ? "dark" : "light"}>
  <header class="demo-header">
    <div>
      <h1>Sheet Demo</h1>
      <p>Lightweight example with theme + read-only toggles.</p>
    </div>
    <div class="controls">
      <label class="toggle">
        <input type="checkbox" bind:checked={readOnly} />
        <span>Read-only</span>
      </label>
      <label class="toggle">
        <input type="checkbox" bind:checked={disableHover} />
        <span>Disable hover</span>
      </label>
      <label class="toggle">
        <input type="checkbox" bind:checked={darkTheme} />
        <span>Dark theme</span>
      </label>
      <div class="accent">
        <span>Accent</span>
        <div class="swatches">
          {#each accentPresets as color}
            <button
              type="button"
              class="swatch"
              style={`background:${color}`}
              aria-label={`Accent ${color}`}
              on:click={() => (accent = color)}
            />
          {/each}
        </div>
      </div>
    </div>
  </header>

  <div class="sheet-frame">
    <Sheet
      columns={columns}
      data={tableData}
      style={headerStyle}
      {options}
      clipboard={null}
      theme={darkTheme ? "dark" : "light"}
    />
  </div>
</section>

<style>
  :global(body) {
    margin: 0;
    font-family: "Space Grotesk", "IBM Plex Mono", ui-sans-serif, system-ui;
    background: #f6f5f1;
  }
  .demo-shell {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px 40px;
  }
  .demo-shell[data-theme="dark"] {
    background: #0f1115;
    color: #e6edf3;
    border-radius: 24px;
  }
  .demo-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 28px;
    margin: 0 0 6px;
  }
  p {
    margin: 0;
    color: rgba(20, 20, 20, 0.7);
  }
  .demo-shell[data-theme="dark"] p {
    color: rgba(230, 237, 243, 0.7);
  }
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 18px;
    align-items: center;
  }
  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  .accent {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }
  .swatches {
    display: flex;
    gap: 6px;
  }
  .swatch {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .sheet-frame {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 18px;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  }
  .demo-shell[data-theme="dark"] .sheet-frame {
    background: rgba(17, 20, 26, 0.9);
    border-color: rgba(255, 255, 255, 0.06);
  }
</style>
