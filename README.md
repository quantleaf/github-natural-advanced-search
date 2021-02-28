# Natural Advanced Search for GitHub
Make GitHub Search fields auto detect search that resembles "advanced search" and perform them. Advanced search is currently today accessible through the advanced search UI or with the syntax. This extension provides a natural language alternative.
![Demo search](/../master/snap.png?raw=true)

## How to use
Install from the [Chrome store](https://chrome.google.com/webstore/detail/natural-advanced-search-f/mepaacibaogonhhhacklhngfkkhlclfj) or clone the repo and use this as a development extension.
Now start type something in the search field on GitHub, for example: "date parser mit license stars > 1000"
You can toggle show all suggestions with (ctrl) + (space).


## How it works
It uses [query.quantleaf.com](https://query.quantleaf.com) under the hood to convert natural languages to the advanced search format. See the file *advanced-search-schema.ts* and *inject.ts* to learn about how it was implemented for this tool.

<br/>
<br/>

**Enjoy!**

// Marcus