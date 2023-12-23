<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { Header } from "./lib/shared/view/header";
</script>

<Header />
<Router>
  <Route path="/" component={() => import("./lib/pages/home")} />
</Router>
