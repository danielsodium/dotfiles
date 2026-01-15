local state = {
  buf = -1,
  win = -1,
  last_pane = -1;
}

local function create_window()
  vim.cmd("botright split")
  state.win = vim.api.nvim_get_current_win()

  -- Terminal-specific UI polish
  vim.api.nvim_win_set_height(state.win, 15)
  vim.wo[state.win].number = false
  vim.wo[state.win].relativenumber = false
  vim.wo[state.win].signcolumn = "no"
end

local function toggle_terminal()
  if vim.api.nvim_win_is_valid(state.win) then
    vim.api.nvim_win_hide(state.win)
    state.win = -1

	if vim.api.nvim_win_is_valid(state.last_editor_win) then
      vim.api.nvim_set_current_win(state.last_editor_win)
    end

    return true
  end

  state.last_editor_win = vim.api.nvim_get_current_win()

  return false
end

local function persistent_term()
  if toggle_terminal() then return end

  if not vim.api.nvim_buf_is_valid(state.buf) then
    state.buf = vim.api.nvim_create_buf(false, true)
  end

  create_window()
  vim.api.nvim_win_set_buf(state.win, state.buf)

  if vim.bo[state.buf].buftype ~= "terminal" then
    vim.cmd.term()
  end
  vim.cmd.startinsert()
end

local function build_term()
  if toggle_terminal() then return end

  if not vim.api.nvim_buf_is_valid(state.buf) then
    state.buf = vim.api.nvim_create_buf(false, true)
  end

  create_window()
  local state_buf = vim.api.nvim_create_buf(false, true)
  vim.api.nvim_win_set_buf(state.win, state_buf)

  vim.fn.termopen("make", {
    on_exit = function(_, exit_code)
      if exit_code == 0 then
        vim.api.nvim_win_close(state.win, true)
		if vim.api.nvim_win_is_valid(state.last_editor_win) then
		  vim.api.nvim_set_current_win(state.last_editor_win)
		end
      end
    end
  })
  vim.cmd.startinsert()
end

local stupid_window = -1

local function stupid_term()
  if vim.api.nvim_win_is_valid(stupid_window) then
    vim.api.nvim_win_hide(stupid_window)
    stupid_window = -1
	return
  end

  local buf = vim.api.nvim_create_buf(false, true)

  vim.cmd("botright vsplit")
  stupid_window = vim.api.nvim_get_current_win()

  local width = 20
  -- Terminal-specific UI polish
  vim.api.nvim_win_set_width(stupid_window, width)
  vim.wo[stupid_window].number = false
  vim.wo[stupid_window].relativenumber = false
  vim.wo[stupid_window].signcolumn = "no"
  vim.wo[stupid_window].winfixwidth = true

  vim.api.nvim_win_set_buf(stupid_window, buf)

  vim.cmd.term()
  vim.defer_fn(function()
	vim.fn.chansend(vim.bo.channel, { "~/.config/nvim/now_playing " .. width .. "\r\n" })
	vim.cmd('normal! 3j')
	vim.cmd('wincmd h')
  end, 100)
end

-- Keybinding
vim.keymap.set({'n', 't'}, '<space>tt', persistent_term, { desc = "Toggle persistent terminal" })
vim.keymap.set({'n', 't'}, '<space>r', build_term, { desc = "Toggle build terminal" })
vim.keymap.set({'n', 't'}, '<space>ts', stupid_term, { desc = "stupid" })
