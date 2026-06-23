import type { Item } from "@shougo/ddc-vim/types";
import { assertEquals } from "@std/assert";
import { BaseFilter } from "@shougo/ddc-vim/filter";

type Params = {
  prefixLength: number;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Item[] {
    const prefixLength = normalizePrefixLength(args.filterParams.prefixLength);
    const prefix = args.completeStr.substring(
      0,
      prefixLength,
    );
    // NOTE: source may return non word prefixed items
    return args.items.filter(
      (item) => /^\W/.test(item.word) || item.word.startsWith(prefix),
    );
  }

  override params(): Params {
    return {
      prefixLength: 1,
    };
  }
}

function normalizePrefixLength(prefixLength: number): number {
  if (!Number.isFinite(prefixLength)) {
    return 1;
  }

  return Math.max(0, Math.floor(prefixLength));
}

function item(word: string): Item {
  return { word } as Item;
}

Deno.test("matcher_prefix keeps non-word-prefixed items", () => {
  const filter = new Filter();
  const result = filter.filter({
    filterParams: { prefixLength: 1 },
    completeStr: "ab",
    items: [
      item("-option"),
      item("abc"),
      item("ax"),
    ],
  });

  assertEquals(result.map((item) => item.word), ["-option", "abc", "ax"]);
});

Deno.test("matcher_prefix handles zero prefixLength", () => {
  const filter = new Filter();
  const result = filter.filter({
    filterParams: { prefixLength: 0 },
    completeStr: "ab",
    items: [{ word: "abc" } as never],
  });

  assertEquals(result.map((item) => item.word), ["abc"]);
});

Deno.test("matcher_prefix normalizes invalid prefixLength", () => {
  const filter = new Filter();
  const result = filter.filter({
    filterParams: { prefixLength: Number.NaN },
    completeStr: "ab",
    items: [{ word: "abc" } as never],
  });

  assertEquals(result.map((item) => item.word), ["abc"]);
});
