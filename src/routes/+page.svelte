<script lang="ts">
import logo from '$lib/images/logo.svg';


const percentages = [5, 10, 15, 25, 50];

let bill = 0;
let selectedTip = 15;
$: tipPercent = selectedTip > -1 ? selectedTip : 0;

let numPeople = 2;

$: tipPerPerson = (bill * (tipPercent / 100) / numPeople).toFixed(2);
$: totalPerPerson = ((bill + (bill * (tipPercent / 100))) / numPeople).toFixed(2);

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

      <label for="bill">Bill</label>
      <input type="number" name="bill" id="bill" bind:value={bill}>

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
        <input
          bind:value={tipPercent}
          type="number" name="percentcustom" id="percentcustom"
          disabled={selectedTip != -1}
        >
        <label for="percentcustom">Custom</label>
      </div>

      <label for="num-people">Number of People</label>
      <input type="number" name="num-people" id="num-people" bind:value={numPeople}> 

    </fieldset>
    <div>
      <div>
        <p>Tip Amount</p>
        <p>/ person</p>
        <p>{tipPerPerson}</p>
      </div>
      <div>
        <p>Total</p>
        <p>/ person</p>
        <p>{totalPerPerson}</p>
      </div>
      <button type="button" on:click={reset}>Reset</button>
    </div>
  </form>
</section>
</main>