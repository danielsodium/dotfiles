vim.g.mapleader = " "
vim.g.maplocalleader = " "

require("config.lazy")
require("config.terminal")

vim.g.have_nerd_font = true

local set = vim.opt
set.mouse = "a"
set.showmode = false
vim.o.tabstop = 4
vim.bo.tabstop = 4
vim.o.softtabstop = 4
vim.o.shiftround = true
vim.o.shiftwidth = 4
vim.bo.shiftwidth = 4
set.breakindent = true
set.undofile = true
set.ignorecase = true
set.smartcase = true
set.updatetime = 250
set.timeoutlen = 250
set.splitright = true
set.splitbelow = true
set.list = true
set.inccommand = "split"
set.cursorline = true
set.scrolloff = 10
set.confirm = true
set.number = true

if vim.g.neovide then
  vim.o.guifont = "JetbrainsMono Nerd Font:h20"
  vim.g.neovide_refresh_rate = 60
  vim.g.neovide_padding_top = 0
  vim.g.neovide_padding_bottom = 0
  vim.g.neovide_padding_right = 0
  vim.g.neovide_padding_left = 0
end

-- clear search highlights
vim.keymap.set("n", "<Esc>", "<cmd>nohlsearch<CR>")
-- terminal exit
vim.keymap.set("t", "<Esc>", "<C-\\><C-n>", { desc = "Exit terminal mode" })

-- navi
vim.keymap.set("n", "<space>=", "10<C-w>>", { desc = "Expand window size" })
vim.keymap.set("n", "<space>-", "10<C-w><", { desc = "Shrink window size " })
vim.keymap.set("n", "<C-h>", "<C-w><C-h>", { desc = "Move focus to the left window" })
vim.keymap.set("n", "<C-l>", "<C-w><C-l>", { desc = "Move focus to the right window" })
vim.keymap.set("n", "<C-j>", "<C-w><C-j>", { desc = "Move focus to the lower window" })
vim.keymap.set("n", "<C-k>", "<C-w><C-k>", { desc = "Move focus to the upper window" })
-- ??
set.signcolumn = "number"

vim.schedule(function()
	vim.o.clipboard = "unnamedplus"
end)

vim.keymap.set("n", "<space>x", "<cmd>source %<CR>")

vim.api.nvim_create_autocmd("TextYankPost", {
	desc = "Highlight when yanking text",
	group = vim.api.nvim_create_augroup("highlight-yank", { clear = true }),
	callback = function()
		vim.highlight.on_yank()
	end,
})

-- My custom commands!
-- playerctl
vim.keymap.set("n", "<space>sk", function()
  vim.fn.jobstart({"playerctl", "previous"})
end, { desc = "Playerctl back" })
vim.keymap.set("n", "<space>sj", function()
  vim.fn.jobstart({"playerctl", "next"})
end, { desc = "Playerctl skip" })
vim.keymap.set("n", "<space>s<space>", function()
  vim.fn.jobstart({"playerctl", "play-pause"})
end, { desc = "Playerctl toggle play/pause"})
