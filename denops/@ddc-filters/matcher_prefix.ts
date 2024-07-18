import {
  BaseFilter,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v5.0.1/types.ts";

type Params = Record<string, never>;

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    sourceOptions: SourceOptions,
    completeStr: string,
    items: Item[],
  }): Promise<Item[]> {
    const prefix = args.completeStr.substring(0, 1);
    // NOTE: source may return non word prefixed items
    return Promise.resolve(args.items.filter(
      (item) => /^\W/.test(item.word) || item.word.startsWith(prefix),
    ));
  }

  override params(): Params { return {}; }
}
