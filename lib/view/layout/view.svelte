<script lang="ts">
  import {
    type ComponentType,
    type ComponentProps,
    type SvelteComponent,
    onMount,
  } from "svelte";
  import { Header } from "../header";
  import { Navigation } from "../navigation";
  import "../../style/global.css";
  import { initCountly } from "../../analytic";

  export let Page: ComponentType;
  export let pageProps: ComponentProps<SvelteComponent>;

  onMount(() => {
    initCountly();
  });
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>John Cuba</title>
  <meta name="description" content="John Cuba - web dev" />
</svelte:head>

<div class="root">
  <div class="control">
    <Header />
    <Navigation />
  </div>
  <div class="content">
    <svelte:component this={Page} {...pageProps} />
  </div>
</div>

<style>
  .root {
    padding-left: var(--space-xl);
    padding-top: calc(var(--space-3xl) * 3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: var(--space-xl);
  }

  .content {
    min-width: 40%;
  }

  @media screen and (min-width: 768px) {
    .root {
      flex-direction: row;
    }
  }
</style>
