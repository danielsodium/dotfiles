return {
    "SirVer/ultisnips",
    init = function()
      -- require("core.utils").load_mappings "ultisnips"
      vim.g.UltiSnipsEditSplit = "horizontal"
      vim.g.UltiSnipsExpandTrigger = "<c-j>" -- expand snippets using this hotkey
      vim.g.UltiSnipsJumpForwardTrigger = "<c-j>"
      vim.g.UltiSnipsJumpBackwardTrigger = "<c-k>"  -- backwards jumps
      vim.g.UltiSnipsListSnippets = "<c-l>"  -- list available snippets for keyword
      -- set the path for your ultisnip snippets
      local ultisnips_snippets = vim.fn.expand('$HOME/.vim/UltiSnips')  -- location of your snippets
      vim.g.UltiSnipsSnippetDirectories = {'snips'}
    end,
  }
