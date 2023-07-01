import {
  BaseFilter,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v3.4.0/types.ts";

type Params = Record<never, never>;

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    sourceOptions: SourceOptions,
    completeStr: string,
    items: Item[],
  }): Promise<Item[]> {
    const prefix = args.completeStr.substring(0, 1);
    return Promise.resolve(args.items.filter(
      (item) => item.word.startsWith(prefix),
    ));
  }

  override params(): Params { return {}; }
}
