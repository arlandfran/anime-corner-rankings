<script lang="ts">
  import { page } from "$app/stores";
  import { cn } from "$lib/utils";
  import { buttonVariants } from "../button";

  export let href: string;
  export let open: boolean;

  let variant: "default" | "ghost" = $page.url.pathname === href ? "default" : "ghost";
  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<a
  {href}
  on:click={() => (open = false)}
  class={cn(buttonVariants({ variant: variant, size: "icon" }), className)}
  {...$$restProps}
>
  <slot />
</a>
