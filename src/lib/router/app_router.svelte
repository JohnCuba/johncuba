<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { base, routes } from "./routes";
</script>

<Router url={base}>
  <Route path={routes.home} component={() => import("../pages/home")} />
  <Route path={routes.contacts} component={() => import("../pages/contacts")} />
</Router>
