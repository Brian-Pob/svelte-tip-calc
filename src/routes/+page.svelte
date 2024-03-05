<script lang="ts">
  import {URL} from '../consts';
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

  <fieldset class="tip-inputs">

    <label data-unit="$">
      Bill
      <input
        min="0" step="0.01"
        type="number" name="bill" id="bill"
        pattern="[0-9]*"
        bind:value={bill} on:focus={(e) => { handleInputSelect(e);}}
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
          <input class="sr-only"
            type="radio" name="tip-percent" value="-1"
            id="custom-percent-radio"
            bind:group={selectedTip}
          />
        </label>
      </div>
    </fieldset>
    <!-- .tip-options -->

    <div>
      <label data-unit="%">
        Custom Tip %
        <input
          bind:value={tipPercent}
          on:focus={(e) => {
            handleInputSelect(e);
          }}
          type="number" name="custom-percent" id="custom-percent"
          disabled={selectedTip != -1} min="0"
        />
      </label>
    </div>

    <label data-unit="#">
      Number of People
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
  <!-- .tip-inputs -->

  <div class="result-container">
    <div class="result-number">
      <p class="result-type">
        Tip Amount
        <span style="display: block;">per person</span>
      </p>
      <p class="result-amount">
      {#if tipPerPerson !== 'NaN'}
        ${tipPerPerson}
      {:else}
        error
      {/if}
      </p>
    </div>

    <div class="result-number">
      <p class="result-type">
        Total
        <span style="display: block;">per person</span>
      </p>
      <p class="result-amount">
      {#if totalPerPerson !== 'NaN'}
        ${totalPerPerson}
      {:else}
        error
      {/if}
      </p>
    </div>
    <button class="reset-btn" type="button" on:click={reset}>Reset</button>
  </div>
  <!-- .result-container -->

</form>
</section>
</main>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

:global(*, *::before, *::after) {
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
  max-width: min(60ch, 100%);
  margin: auto;
}

h1 {
  margin-block: 2rem;
}

section {
  --inner-padding: 1.5rem;
  --input-padding: 1rem;
  --border-radius: 1rem;

  padding: var(--inner-padding);
  background: var(--surface-2);
  min-width: 100%;
  border-radius: calc(var(--border-radius) + var(--inner-padding)) calc(var(--border-radius) + var(--inner-padding)) 0 0;

  @media (min-width: 768px) {
    border-radius: var(--border-radius);
  }

  & > form {
    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: stretch;
      gap: 2rem;
    }
    & > * {
      flex-grow: 1;
    }
  }
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

legend {
  margin-bottom: 1rem;
}

legend, label {
  font-weight: 700;
}

label:has(input[type='number']) {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  & > input {
    text-align: right;
  }
}

label:has(input[type="radio"]), input[type='number'] {
  font-size: 1.5rem;
}

input[type='number'] {
  position: relative;
  border: none;
  padding: var(--input-padding);
  border-radius: 0.25rem;
  background: hsl(var(--cyan-lighter));
  color: var(--text-2);
  text-align: right;

  &:disabled {
    cursor: not-allowed;
    filter: brightness(0.9);
  }
}

label:has(input[type='number'])::before {
  --content: attr(data-unit);
  position: absolute;
  font-size: 1.5rem;
  z-index: 1;
  color: hsl(var(--cyan-gray) / 0.5);
  top: 50%;
  left: calc(0.5rem + var(--input-padding));
  content: var(--content);
}

.tip-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;

  @media (min-width: 768px) {
    max-width: calc(50% - 1rem);
  }
}

.tip-options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  & > div {
    width: calc(50% - 0.5rem);
  }
}

.tip-options > div > label {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 0.25rem;
  padding-block: 0.50rem;
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

.result-container {
  background: var(--surface-4);
  padding: var(--inner-padding);
  margin-top: calc(var(--inner-padding) * 1.5);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: calc(var(--inner-padding) * 2.5) calc(var(--inner-padding) * 1.5);
    margin-top: 0;
  }
}

.result-number {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-block: 0.5rem;
}

.result-type {
  color: white;

  & > span {
    color: var(--surface-3);
  }
}

.result-amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-3);
}

.reset-btn {
  text-transform: uppercase;
  margin-top: 1rem;
  padding: 1rem 0.5rem;
  border: none;
  border-radius: 0.25rem;

  background: var(--surface-5);
  color: var(--text-5);
  font-size: 1.25rem;
  font-weight: 700;
  width: 100%;

  transition: scale 0.1s ease-out,
    box-shadow 0.1s ease-out,;

  @media (min-width: 768px) {
    margin-top: auto;
    align-self: self-end;
  }

  &:is(:hover){
    scale: 1.02;
    box-shadow: 0 3px 5px 1px black;
  }

  &:is(:active){
    scale: 0.98;
    box-shadow: none;
  }
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
