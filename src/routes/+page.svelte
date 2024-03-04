<script lang="ts">
import logo from '$lib/images/logo.svg';


const percentages = [5, 10, 15, 25, 50];

let bill = 0;
let selectedTip = 15;
$: tipPercent = selectedTip > -1 ? selectedTip : 0;

let numPeople = 2;

$: tipPerPerson = (bill * (tipPercent / 100) / numPeople).toFixed(2);
$: totalPerPerson = ((bill * (1 + tipPercent / 100)) / numPeople).toFixed(2);

function reset() {
  bill = 0;
  selectedTip = 15;
  numPeople = 2;
}

</script>


<main>
<h1>Splitter</h1>
<img src={logo} alt="Splitter">
<section>
  <form action="">
    <fieldset>

      <label>
        Bill

        <input
          min="0" step="0.01"
          inputmode="numeric" pattern="[0-9]*[.,]?[0-9]{2}"
          type="text" id="bill" bind:value={bill}
          
        >
      </label>

      <fieldset>
        <legend>Select Tip %</legend>

        {#each percentages as percentage}
        <div>
          <label>
            {percentage.toString() + '%'}
            <input
              bind:group={selectedTip}
              type="radio" name="tip-percent"
              value={percentage}
              id={"percent" + percentage.toString()}
            >
          </label>
        </div>

        {/each}
        <div>
          <label>
            Custom
            <input 
              type="radio" name="tip-percent"
              value="-1"
              id="percent-custom"
              bind:group={selectedTip}
            >
          </label>
        </div>
        
      </fieldset>
      <div>
        <label>
          Custom Tip %
          <input
          bind:value={tipPercent}
          type="text" inputmode="numeric" pattern="[0-9]"
          name="percentcustom" id="percentcustom"
          disabled={selectedTip != -1}
          min="0"
          >
        </label>
      </div>

      <label for="num-people">Number of People

        <input
          type="number" name="num-people" id="num-people"
          bind:value={numPeople}
          min="1"
        > 
      </label>

    </fieldset>
    <div>
      <div>
        <p>Tip Amount
          <span style="display: block;">per person</span>
        </p>
        <p>{tipPerPerson !== "NaN" ? `$${tipPerPerson}` : "error"}</p>
      </div>
      <div>
        <p>Total
          <span style="display: block;">per person</span>
        </p>
        <p>{totalPerPerson !== "NaN" ? `$${totalPerPerson}` : "error"}</p>
      </div>
      <button type="button" on:click={reset}>Reset</button>
    </div>
  </form>
</section>
</main>