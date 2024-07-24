import { BaseFilter, Item } from "https://deno.land/x/ddc_vim@v5.0.1/types.ts";

type Params = {
  prefixLength: number;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    const prefix = args.completeStr.substring(
      0,
      args.filterParams.prefixLength,
    );
    // NOTE: source may return non word prefixed items
    return Promise.resolve(args.items.filter(
      (item) => /^\W/.test(item.word) || item.word.startsWith(prefix),
    ));
  }

  override params(): Params {
    return {
      prefixLength: 1,
    };
  }
}
