<script lang="ts">
  import { Pagination as PaginationPrimitive } from "bits-ui";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { ChevronLeft } from "radix-icons-svelte";

  type $$Props = PaginationPrimitive.PrevButtonProps;
  type $$Events = PaginationPrimitive.PrevButtonEvents;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<PaginationPrimitive.PrevButton asChild let:builder>
  <Button
    variant="ghost"
    class={cn("gap-1 sm:w-fit sm:px-4 sm:py-2 sm:pl-2.5", className)}
    size={"icon"}
    builders={[builder]}
    on:click
    {...$$restProps}
  >
    <slot>
      <ChevronLeft class="size-4" />
      <span class="hidden sm:block">Previous</span>
    </slot>
  </Button>
</PaginationPrimitive.PrevButton>
