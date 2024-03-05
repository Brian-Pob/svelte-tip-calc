<script lang="ts">
  import logo from '$lib/images/logo.svg';

  const percentages = [5, 10, 15, 25, 50];

  let bill = 0;
  let selectedTip = 15;
  $: tipPercent = selectedTip > -1 ? selectedTip : 0;

  let numPeople = 2;

  $: tipPerPerson = ((bill * (tipPercent / 100)) / numPeople).toFixed(2);
  $: totalPerPerson = ((bill * (1 + tipPercent / 100)) / numPeople).toFixed(2);

  function reset() {
    bill = 0;
    selectedTip = 15;
    numPeople = 2;
  }

  function handleInputSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    target.select();
  }
</script>

<main>
  <h1>
    <span class="sr-only">Splitter</span>
    <img src={logo} alt=""/>
  </h1>

  <section>
    <form action="">
      <fieldset>
        <label>
          Bill

          <input
            min="0"
            step="0.01"
            type="number"
            name="bill"
            id="bill"
            bind:value={bill}
            pattern="[0-9]*"
            on:focus={(e) => {
              handleInputSelect(e);
            }}
          />
        </label>

        <fieldset class="tip-options">
          <legend>Select Tip %</legend>

          {#each percentages as percentage}
            <div>
              <label>
                {percentage.toString() + '%'}
                <input
                  class="sr-only"
                  bind:group={selectedTip}
                  type="radio"
                  name="tip-percent"
                  value={percentage}
                  id={'percent' + percentage.toString()}
                />
              </label>
            </div>
          {/each}

          <div>
            <label>
              Custom
              <input
                class="sr-only"
                type="radio"
                name="tip-percent"
                value="-1"
                id="percent-custom"
                bind:group={selectedTip}
              />
            </label>
          </div>
        </fieldset>
        <div>
          <label>
            Custom Tip %

            <input
              bind:value={tipPercent}
              on:focus={(e) => {
                handleInputSelect(e);
              }}
              type="number"
              name="percentcustom"
              id="percentcustom"
              disabled={selectedTip != -1}
              min="0"
            />
          </label>
        </div>

        <label for="num-people"
          >Number of People

          <input
            type="number"
            name="num-people"
            id="num-people"
            on:focus={(e) => {
              handleInputSelect(e);
            }}
            bind:value={numPeople}
            min="1"
          />
        </label>
      </fieldset>

      <div class="result">
        <div class="result-number">
          <p>
            Tip Amount
            <span style="display: block;">per person</span>
          </p>
          {#if tipPerPerson !== 'NaN'}
            <p>${tipPerPerson}</p>
          {:else}
            <p>error</p>
          {/if}
        </div>
        <div class="result-number">
          <p>
            Total
            <span style="display: block;">per person</span>
          </p>
          {#if totalPerPerson !== 'NaN'}
            <p>${totalPerPerson}</p>
          {:else}
            <p>error</p>
          {/if}
        </div>
        <button type="button" on:click={reset}>Reset</button>
      </div>
    </form>
  </section>
</main>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
  }

  :global(*) {
    box-sizing: border-box;
    margin: 0;
  }

  :global(body) {
    --cyan: 172 67% 45%;
    --cyan-darker: 183 100% 15%;
    --cyan-dark: 186 14% 43%;
    --cyan-gray: 186 14% 56%;
    --cyan-light: 185 41% 84%;
    --cyan-lighter: 189 41% 97%;

    --surface-1: hsl(var(--cyan-light));
    --surface-2: hsl(0 0% 100%);
    --surface-3: hsl(var(--cyan-dark));
    --surface-4: hsl(var(--cyan-darker));
    --surface-5: hsl(var(--cyan));

    --text-1: hsl(var(--cyan-light));
    --text-2: hsl(var(--cyan-dark));
    --text-3: hsl(var(--cyan));
    --text-4: hsl(0 0% 100%);
    --text-5: hsl(var(--cyan-darker));

    margin: 0;
    min-height: 100vh;
    font-family: 'Space Mono';
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    background: var(--surface-1);
  }

  :global(input) {
    font: inherit;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin-block: 2rem;
  }

  section {
    padding: 1.5rem;
    background: var(--surface-2);
    min-width: 100%;
    border-radius: 1rem 1rem 0 0;    
  }

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }

  legend {
    font-size: 1.25rem;
  }

  legend, label {
    font-weight: 700;
  }

  label:has(input[type='number']) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > input {
      text-align: right;
    }
  }

  label:has(input[type="radio"]), input[type='number'] {
    font-size: 1.5rem;
  }

  .tip-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;

    & > div {
      width: clamp(9rem, calc(50% - 0.5rem), 12rem);
    }
  }

  .tip-options > div > label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 0.25rem;
    padding-block: 0.25rem;
  }

  input[type='radio'] {
    position: absolute;
  }

  label:has(input[type='radio']:not(:checked)) {
    background: var(--surface-4);
    color: var(--text-4);
  }

  label:has(input[type='radio']:checked) {
    background: var(--surface-5);
    color: var(--text-5);
  }

  label:has(input[type='radio']:is(:focus-visible)) {
    outline: 2px solid Highlight;
    outline: 2px auto -webkit-focus-ring-color;
    outline-offset: 0.5rem;
  }
  .debug {
    border: 1px solid red;
  }

  /* Credit: Tailwind */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
