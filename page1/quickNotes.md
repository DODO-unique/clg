You created a container with **three rows using `fr`**. The parent section has a `min-height`, so the browser tries to **distribute that height equally** among the rows because of the `fr` units. If one row (like the canvas) is taller than the others, the remaining rows **inflate to match**.  
**Fix:** give the rows **`auto` height** so each row sizes naturally based on its content.
