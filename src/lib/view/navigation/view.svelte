<script lang="ts">
  import { links } from "svelte-routing";
  import { routes } from "../../router";
</script>

<nav>
  <ul class="list" use:links>
    <!-- <li><a href={routes.projects} class="link">/projects</a></li> -->
    <!-- <li><a href={routes.experience} class="link">/experience</a></li> -->
    <li><a href={routes.contacts} class="link">/contacts</a></li>
  </ul>
</nav>

<style scoped>
  .list {
    display: flex;
    column-gap: var(--space-s);
  }

  .link {
    font-family: var(--font-face-josefin-sans);
    text-decoration: none;
    color: currentColor;
  }
</style>
