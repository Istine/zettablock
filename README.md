# ZettaBlock

This Repo is an API for parsing and returning usernames, emoticons and links embedded in a text string.

## Tech Stack
- Graphql
- Nodejs
- Express
- Typescript

## Setup

- cd into the root directory
- run **npm install**
- open two separate terminals and run **npm run watch** in one, then **npm run dev** in the other
- local server runs on port **4000**


## Request Format
```js
Query(message:String!) {
	records(message:$message) {
		mentions
		emoticons
		links {
		title
		url
		}
	}
}

variables:{
	message:"@chris where are you ?"
}
```

## Sample Response

```js
Sample message string: 
"@chris (umbrella) Olympics are starting soon; http://www.nbcolympics.com"
{
	data: {
		records:{
			mentions:["chris"]
			emoticons:["umbrella"]
			links:[{
				title:"2016 Rio Olympic Games | NBC Olympics", 
				url:"http://www.nbcolympics.com"
			}]	
		}
	}
}
```