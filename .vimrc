set tabstop     =4
set softtabstop =4
set shiftwidth  =4
set expandtab
set autoindent
set cindent
set splitright

set number
hi LineNr ctermfg=blue
hi TabLineFill term=bold cterm=bold ctermbg=0
highlight VertSplit cterm=NONE
syntax on
set background=dark

let mapleader =" "
nnoremap <Leader>f :Files <Return>
nnoremap <Leader>t :vert term <Return>
nnoremap <Leader>s :UltiSnipsEdit <Return>
nnoremap <Leader>l <C-w>l <Return>
nnoremap <Leader>h <C-w>h <Return>
nnoremap <Leader>d :Files vert <Return>

call plug#begin()

Plug 'sirver/ultisnips'
let g:UltiSnipsExpandTrigger = '<space>'
let g:UltiSnipsJumpForwardTrigger = '<tab>'
let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'
let g:UltiSnipsEditSplit = 'vertical'


Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
let g:fzf_action = { 'enter': 'vsplit' }

call plug#end()
