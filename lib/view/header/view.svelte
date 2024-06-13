<header>
  <h1 class="header__text heading">
    John Cuba
  </h1>
</header>

<style scoped>
  .header__text {
    display: inline-block;
    justify-content: center;
    font-family: var(--font-face-josefin-sans);
    margin: 0;
    word-spacing: calc(var(--space-3xs) * -1);
  }

  .heading {
    position: relative;
    font-size: var(--step-5);
  }

  .heading::after {
    content: "/dev";
    position: absolute;
    bottom: 0;
    right: -100%;
    width: 100%;
    opacity: 0.5;
  }
</style>
