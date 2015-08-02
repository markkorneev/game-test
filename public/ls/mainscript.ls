require! {
	\prelude-ls : {List, Obj, Str, Func, Num}
}

#document.getElementsByTagName \h1
#|> List.map (-> it)
#|> List.each (!-> it.innerHTML = 'Game here mdfka!')
