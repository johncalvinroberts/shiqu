<script lang="ts">
  import { formatDateInTimezone } from "./date";
  import "./app.css";
  const timeZones = [
    ["🇨🇳", "Asia/Shanghai"],
    ["🇯🇵", "Asia/Tokyo"],
    ["PDX", "America/Los_Angeles"],
    ["SLC", "America/Boise"],
    ["MSP", "America/Chicago"],
    ["NY", "America/New_York"],
    ["🍁", "America/St_Johns"],
    ["🇪🇺", "Europe/Copenhagen"],
    ["🇦🇷", "America/Buenos_Aires"],
  ];
  const clocks = [
    "⏱",
    "🕥",
    "🕙",
    "🕣",
    "🕠",
    "🕝",
    "🕢",
    "🕟",
    "🕜",
    "🕤",
    "🕡",
    "🕞",
    "🕘",
    "🕒",
    "🕗",
    "🕔",
    "🕑",
    "🕖",
    "🕓",
    "🕛",
    "🕖",
    "⏲",
    "🕕",
    "⏰",
    "⏱",
    "🕰",
  ];
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let offsetHrs = 0;
  let offsetMins = 0;
  const getNextNow = () => {
    const nextNow = new Date();
    nextNow.setHours(nextNow.getHours() + offsetHrs);
    nextNow.setMinutes(nextNow.getMinutes() + offsetMins);
    return nextNow.valueOf();
  };

  let now = getNextNow();
  let clockIndex = 0;

  const handleChange = () => {
    now = getNextNow();
  };

  setInterval(() => {
    now = getNextNow();
    clockIndex = clockIndex === clocks.length - 1 ? 0 : clockIndex + 1;
  }, 1000);
</script>

<main>
  <h1>
    {clocks[clockIndex]}
  </h1>
  <div class="tzs">
    {#each timeZones as tz}
      <div title={tz[1]} class="tz">
        <span>
          {#if tz[1] === currentTimeZone}
            <span class="pointer">➡️ </span>
          {/if}
          {tz[0]}:
        </span>
        <span>
          {formatDateInTimezone(now, tz[1])}
        </span>
      </div>
    {/each}
    <div class="tz">
      <input
        type="range"
        min="-24"
        max="24"
        bind:value={offsetHrs}
        class="slider"
        on:input={handleChange}
      />
      <input
        type="number"
        min="-24"
        max="24"
        bind:value={offsetHrs}
        on:change={handleChange}
      />
      hrs
    </div>
    <div class="tz">
      <input
        type="range"
        min="0"
        max="60"
        bind:value={offsetMins}
        class="slider"
        on:input={handleChange}
      />
      <input
        type="number"
        min="0"
        max="60"
        bind:value={offsetMins}
        on:change={handleChange}
      />
      mins
    </div>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100vh;
    flex-wrap: wrap;
  }
  h1 {
    flex: 0 0 100%;
    text-align: center;
  }
  .tzs {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 300px;
  }
  .tz {
    display: flex;
    flex: 0 0 100%;
    align-items: center;
    justify-content: space-between;
    max-width: 300px;
    position: relative;
  }
  .pointer {
    position: absolute;
    left: -20px;
  }
  main {
    background-color: lavenderblush;
  }
</style>
