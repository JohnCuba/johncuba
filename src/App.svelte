<script lang="ts">
  import { Header } from "./lib/view/header";
  import { Navigation } from "./lib/view/navigation";
  import { AppRouter } from "./lib/router";
</script>

<div class="root">
  <div class="control">
    <Header />
    <Navigation />
  </div>
  <div class="content">
    <AppRouter />
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
