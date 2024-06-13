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
  <div class="heading">
    <Header />
    <Navigation />
  </div>
  <div class="content">
    <svelte:component this={Page} {...pageProps} />
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100%;
    row-gap: var(--space-s);
  }

  .heading {
    display: flex;
    flex-direction: column;
    margin-top: var(--space-xl);
    row-gap: var(--space-2xs);
  }

  .content {
    min-width: 100%;
  }
</style>
