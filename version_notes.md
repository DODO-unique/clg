Welcome to version notes as listed in git_commit_notes.md

Here, we will vaguely discuss what happens next.

So, I was working on scroll features of gsap and bumped into how `scroll` event in JS is not "listened" until your site.. well, needs a scrollbar- so:  
TL;DR, both height and `overflow:hidden` affect `scroll` event in JS  

So, to get our clean navbar come down when we scroll, we need a element which makes the homepage, well, scrollable.
Thus, genius me thought 'fine, we will add a source, links and all that fluff in a footer which is hidden until you scroll down'
Good idea, Virgil approved, but then when I added a footer, I realized my main contents (header + body) weren't giving me the space of the entire page, which meant I would have to arrange them so that they occupy the view port entirely.

But, as I was doing that, I realized for future, if I run into more errors like these, I would have to debug a 200+ lines of css code linked to 80+ lines (would be more when I add footer, just you wait) of html- so I thought 'yeh, let's add a scss import thingy'

Good idea, again, Virgil approved.
Now, the core idea is to keep three files head, body, paw (not foot 🦝🐾) (I was thinking four for the 'hidden' elements for the hidden stuff like navbar and sidebar, but let's see how the structure makes sense)

And of course, none of the pages are actually even done yet, enjoy those Lorem Ipsums 🧍‍♂️

Another thing: ignore the script.js for now- I know it's chaotic and half-baked, but I'd rather not touch it since it gives good proves of why I couldn't fetch the `scroll` event