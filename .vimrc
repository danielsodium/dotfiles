set tabstop     =4
set softtabstop =4
set shiftwidth  =4
set expandtab
set autoindent
set cindent

set number
hi LineNr ctermfg=blue
hi TabLineFill term=bold cterm=bold ctermbg=0
syntax on

let mapleader =" "
nnoremap <Leader>f :Files <Return>
nnoremap <Leader>t :vert term <Return>
nnoremap <Leader>s :UltiSnipsEdit <Return>

call plug#begin()

Plug 'sirver/ultisnips'
let g:UltiSnipsExpandTrigger = '<tab>'
let g:UltiSnipsJumpForwardTrigger = '<tab>'
let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'
let g:UltiSnipsEditSplit = 'vertical'


Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
let g:fzf_action = { 'enter': 'tab split' }

call plug#end()
