<script lang="ts">
  import { cn } from "$lib/utils";
  import { Menubar as MenubarPrimitive } from "bits-ui";

  type $$Props = MenubarPrimitive.Props;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<MenubarPrimitive.Root class={cn("flex h-9 items-center space-x-1 bg-transparent p-1", className)}>
  <slot />
</MenubarPrimitive.Root>
