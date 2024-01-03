<script lang="ts">
  const soc_links = [
    {
      href: "https://github.com/JohnCuba",
      label: "github",
    },
    {
      href: "https://t.me/johncuba",
      label: "telegram",
    },
    {
      href: "https://www.instagram.com/john_cubaaaaaa",
      label: "instagram",
    },
  ] as const;
</script>

<main class="root">
  <ul>
    {#each soc_links as { href, label }}
      <li>
        <a {href} class="link" target="_blank" rel="noopener noreferrer">
          {"> " + label}
        </a>
      </li>
    {/each}
  </ul>
  <a href="mailto:ekubetsky@gmail.com" class="link">ekubetsky@gmail.com</a>
</main>

<style scoped>
  .root {
    display: flex;
    flex-direction: column;
  }

  .link {
    text-decoration: none;
    color: currentColor;
    font-size: var(--step-1);
    font-family: var(--font-face-josefin-sans);
  }
</style>
