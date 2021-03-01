# Natural Advanced Search for GitHub
Make GitHub Search fields auto detect search that resembles "advanced search" and perform them. Advanced search is currently today accessible through the advanced search UI or with the syntax. This extension provides a natural language alternative.
![Demo search](/../master/snap.png?raw=true). 
You can install it directly from the [Chrome Store](https://chrome.google.com/webstore/detail/natural-advanced-search-f/mepaacibaogonhhhacklhngfkkhlclfj).

## How to build
Requires Node.js (Tested with v14.15.1), npm (Tested with 6.14.10)

`
npm install
` 

`
npm run build-release
`

This will create a folder named *build*.

With this folder in mind, go to chrome://extensions and press "Load unpacked" to use as a Chrome Extension, or press "Pack extension" to use it as a Firefox extension (this will generate a build.crx file)

## How to use
Now start type something in the search field on GitHub, for example: "date parser mit license stars > 1000"
You can toggle show all suggestions with (ctrl) + (space).


## How it works
It uses [query.quantleaf.com](https://query.quantleaf.com) under the hood to convert natural languages to the advanced search format. See the file *advanced-search-schema.ts* and *inject.ts* to learn about how it was implemented for this tool.

<br/>
<br/>

**Enjoy!**

// Marcus