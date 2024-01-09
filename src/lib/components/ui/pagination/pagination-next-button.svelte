<script lang="ts">
  import { Pagination as PaginationPrimitive } from "bits-ui";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { ChevronRight } from "radix-icons-svelte";

  type $$Props = PaginationPrimitive.NextButtonProps;
  type $$Events = PaginationPrimitive.NextButtonEvents;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<PaginationPrimitive.NextButton asChild let:builder>
  <Button
    variant="ghost"
    class={cn("gap-1 sm:w-fit sm:px-4 sm:py-2 sm:pr-2.5", className)}
    size={"icon"}
    builders={[builder]}
    on:click
    {...$$restProps}
  >
    <slot>
      <span class="hidden sm:block">Next</span>
      <ChevronRight class="h-4 w-4" />
    </slot>
  </Button>
</PaginationPrimitive.NextButton>
