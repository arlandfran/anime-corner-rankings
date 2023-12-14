<script lang="ts">
  import { InfoCircled } from "radix-icons-svelte";
  import * as Dialog from "$lib/components/ui/dialog";
  import { buttonVariants } from "$lib/components/ui/button";
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "ghost", size: "icon" })}>
    <InfoCircled />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>What is Anime Corner Rankings?</Dialog.Title>
      <Dialog.Description>
        This website is a web representation of the weekly ranking graphic released by
        <a
          href="https://animecorner.me/"
          target="_blank"
          class="font-medium text-white hover:underline"
        >
          Anime Corner</a
        >, an online community that provides news, highlights and articles on the anime industry.
      </Dialog.Description>
    </Dialog.Header>
    <div class="space-y-2">
      <h3 class="font-semibold leading-none tracking-tight">How often are the rankings updated?</h3>
      <p class="text-sm text-muted-foreground">
        The rankings are updated every Friday at approximately 13:00pm UTC.
      </p>
      <h3 class="font-semibold leading-none tracking-tight">Acknowledgements</h3>
      <p class="text-sm text-muted-foreground">
        The data and favicon presented on this website are sourced from Anime Corner - huge thanks
        to them for providing the valuable data that contributes to the content presented on this
        site.
      </p>
      <p class="text-sm text-muted-foreground">
        Additionally, this project was also inspired by some of sites below:
      </p>
      <ul class="ml-6 list-disc">
        <li>
          <a href="https://animekarmalist.com" target="_blank" class="text-sm hover:underline"
            >Anime Karma List</a
          >
        </li>
        <li>
          <a href="https://animekarmawatch.com" target="_blank" class="text-sm hover:underline"
            >Anime Karma Watch</a
          >
        </li>
        <li>
          <a href="https://anitrendz.net" target="_blank" class="text-sm hover:underline"
            >Anitrendz</a
          >
        </li>
      </ul>
    </div>
  </Dialog.Content>
</Dialog.Root>
