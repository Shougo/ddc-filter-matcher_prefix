# ddc-filter-matcher_prefix

Prefix matcher for ddc.vim

It removes items does not match input prefix.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddc.vim

https://github.com/Shougo/ddc.vim

## Configuration

```vim
" Use both matcher_head and matcher_prefix.
call ddc#custom#patch_global('sourceOptions', #{
      \   _: #{
      \     matchers: ['matcher_head', 'matcher_prefix'],
      \ })
```
