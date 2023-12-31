<script>
  import { fade, fly } from "svelte/transition";
  import { faq, modalState } from "../stores";
  import Accordion from "./Accordion.svelte";

  const state = modalState(false);
  const { isOpen, open, close } = state;

  let showAll = false;
  let showDropdown = false;

  function expandAll() {
    showAll = true;
    showDropdown = true;
  }

  function collapseAll() {
    showAll = false;
    showDropdown = false;
  }

  function keydown(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      close();
    }
  }

  // traps focus within modal by listening for modal transition ref: https://css-tricks.com/a-css-approach-to-trap-focus-inside-of-an-element/
  function transitionend(e) {
    const node = e.target;
    node.focus();
  }

  // ref: https://dev.to/vibhanshu909/how-to-create-a-full-featured-modal-component-in-svelte-and-trap-focus-within-474i
  function modalAction(node) {
    const returnFn = [];
    // stops background scrolling if modal is open
    if (document.body.style.overflow !== "hidden") {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      returnFn.push(() => {
        document.body.style.overflow = original;
      });
    }
    node.addEventListener("keydown", keydown);
    node.addEventListener("transitionend", transitionend);
    node.focus();
    returnFn.push(() => {
      node.removeEventListener("keydown", keydown);
      node.removeEventListener("transitionend", transitionend);
    });
    return {
      destroy: () => returnFn.forEach((fn) => fn()),
    };
  }
</script>

<div>
  <button class="about" on:click={open} aria-label="Open About Modal">
    <svg
      id="svg-info"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      ><path
        d="M24 17.981h-13l-7 5.02v-5.02h-4v-16.981h24v16.981zm-11-9.98h-2v6h2v-6zm-1-1.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25z"
      /></svg
    >
  </button>
</div>

{#if $isOpen}
  <div
    class="modal"
    use:modalAction
    tabindex="0"
    transition:fade={{ duration: 200 }}
  >
    <div class="backdrop" />
    <div class="content-wrapper" transition:fly={{ y: 50, duration: 200 }}>
      <div class="close">
        <button on:click={close} aria-label="Open About">
          <svg
            id="svg-close"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#fff"
            preserveAspectRatio="xMidYMid meet"
            ><path
              d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
            /></svg
          >
        </button>
      </div>

      <div class="content">
        <div class="title">
          <h1>About</h1>
        </div>
        <h2>Navigation</h2>
        <p>
          Use the A D,
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="#fff"
            ><path
              d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
            /></svg
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="#fff"
            ><path
              d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
            /></svg
          > keys to navigate back and forth the weekly ranking.
        </p>
        <h2>Legend</h2>
        <ul>
          <li>
            <svg
              class="arrow-gain"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"><path d="M24 22h-24l12-20z" /></svg
            >
            <svg
              class="arrow-drop"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"><path d="M12 21l-12-18h24z" /></svg
            >
            <svg
              class="arrow-neutral"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"><path d="M0 9h24v6h-24z" /></svg
            >
            Rank Progression
          </li>
          <li>% Vote Percentage</li>
        </ul>
        <h2>FAQ</h2>
        <div class="expand-toggles">
          <button
            class:active={!showAll}
            class:disabled={showAll}
            id="expand"
            disabled={showAll}
            on:click={expandAll}>Expand All</button
          >
          |
          <button
            class:active={showAll}
            class:disabled={!showAll}
            id="collapse"
            disabled={!showAll}
            on:click={collapseAll}>Collapse All</button
          >
        </div>
        {#each $faq as content}
          <Accordion {...content} {showAll} {showDropdown} />
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .about {
    width: 48px;
  }

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }

  .modal:not(:focus-within) {
    transition: opacity 0.1ms;
    opacity: 0.99;
  }

  @media (prefers-reduced-motion) {
    .modal {
      transition: none;
    }

    .content-wrapper {
      transition: none;
    }
  }

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .content-wrapper {
    position: fixed;
    z-index: 1;
    width: 90%;
    max-height: 80%;
    max-width: 1024px;
    padding-bottom: 1rem;
    border-radius: 6px;
    background-color: black;
    border: 2px solid white;
    overflow: hidden;
  }

  @media (prefers-reduced-motion) {
    .content-wrapper {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      animation-delay: 0.01ms !important;
    }
  }

  @media screen and (min-width: 769px) {
    .content-wrapper {
      width: 75%;
    }
  }

  .close {
    z-index: 2;
    position: absolute;
    top: 1.15rem;
    right: 1.4rem;
  }

  #svg-close:hover {
    fill: var(--primary-color);
  }

  .title {
    text-align: center;
  }

  .content {
    max-height: 80vh;
    padding: 1rem;
    text-align: left;
    overflow: auto;
  }

  h1 {
    margin-block-start: 0;
    margin-block-end: 0;
    text-transform: uppercase;
  }

  h2 {
    text-decoration: underline;
    text-decoration-color: var(--primary-color);
  }

  .arrow-gain {
    fill: var(--gain-color);
  }

  .arrow-neutral {
    fill: var(--neutral-color);
  }

  .arrow-drop {
    fill: var(--drop-color);
  }

  .about {
    fill: white;
  }

  .about:focus {
    fill: var(--primary-color);
  }

  #svg-info {
    fill: inherit;
  }

  #svg-info:hover {
    fill: var(--primary-color);
  }

  .active {
    color: var(--primary-color);
  }

  .disabled {
    color: var(--surface);
    cursor: default;
  }
</style>
