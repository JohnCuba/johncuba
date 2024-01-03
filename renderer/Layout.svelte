<script lang="ts">
  import {
    type ComponentType,
    type ComponentProps,
    type SvelteComponent,
  } from "svelte";
  import { Header } from "../lib/view/header";
  import { Navigation } from "../lib/view/navigation";
  import "../lib/style/global.css";

  export let Page: ComponentType;
  export let pageProps: ComponentProps<SvelteComponent>;
</script>

<svelte:head>
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
