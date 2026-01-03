return {
  {
	'nvim-telescope/telescope.nvim',
	dependencies = {
	  'nvim-lua/plenary.nvim',
	  { 'nvim-telescope/telescope-fzf-native.nvim', build = 'make' },
	},
	config = function()
	  require('telescope').setup {
        -- You can put your default mappings / updates / etc. in here
        --  All the info you're looking for is in `:help telescope.setup()`
        --
        -- defaults = {
        --   mappings = {
        --     i = { ['<c-enter>'] = 'to_fuzzy_refine' },
        --   },
        -- },
        -- pickers = {}
        pickers = {
          find_files = {
            theme = 'dropdown',
          },
        },
        extensions = {
          ['ui-select'] = {
            require('telescope.themes').get_dropdown(),
          },
        },
      }
	  vim.keymap.set("n", "<space>e", require('telescope.builtin').find_files)
	  vim.keymap.set("n", "<space>c", function()
		require('telescope.builtin').find_files {
		  cwd = vim.fn.stdpath("config")
		}
	  end)
	end
  }
}
