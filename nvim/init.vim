call plug#begin()
Plug 'lervag/vimtex'
Plug 'sirver/ultisnips'
Plug 'catppuccin/nvim', { 'as': 'catppuccin' }
Plug 'nvim-tree/nvim-web-devicons'
Plug 'nvim-tree/nvim-tree.lua'
call plug#end()

let mapleader = " "
map <leader>t :NvimTreeToggle<Enter>
syntax enable
filetype plugin indent on
set number
set encoding=utf-8
let g:tex_flavor='latex'
let g:vimtex_view_method='zathura'
let g:vimtex_quickfix_mode=0
set conceallevel=1
let g:tex_conceal='abdmg'
let g:UltiSnipsSnippetDirectories = ['~/.vim/UltiSnips', 'UltiSnips']
let g:UltiSnipsExpandTrigger = '<tab>'
let g:UltiSnipsJumpForwardTrigger = '<tab>'
let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'

set tabstop=4
set shiftwidth=4
set expandtab

noremap j gj
noremap k gk

colorscheme catppuccin 

source ~/.config/nvim/myinit.lua

