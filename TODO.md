1. [x] Get a textarea input to bind user input and pass it to React.
1. [x] Create a parser for said user input. Initially logging to console.
1. [x] Add a small dictionary of like 10 words and write a set of logic to convert parsed input to potential matches with interspersed vowels. Regexp might be good here.
  - [ ] Also try to add interspersing of little words like "of" and "the". ~It's a shame these words don't have a name or I'd sound wicked smaht by using it...~
  - [ ] I could write this in a TDD way. That could be fun
1. [ ] Make some basic weighting of viability of different options. Maybe I can identify what words are more "rare", and percolate those to the top of the sort order.
  - Expanding on this: the dictionary words I currently have are too inclusive! Most of these words I've never heard of, and I'm a native english speaker. I need to get a "most used" dictionary setup!
  - [ ] Add words' properties, like "adjective" or "noun", for different scoring and weighting. Basic example, the last word would always be a noun, and words leading up to it could be adjectives. Maybe add verbs in once there are at least 2 nouns.
1. [x] Get a real dictionary setup. I could import it from an API somewhere, maybe, or add a .txt file to the repository. Not sure.
1. [x] Learn about Typescript and React tools, like linters.
1. [ ] Add background about the major system on to the web page. ~My instinct is to do this first, but it's not what's important, so I need to restrain myself from making some pretty-but-unfunctional app...~
1. [ ] Probably the last priority would be to prettify the CSS/page layout.
1. [x] Code splitting out of one big `App.tsx`
1. [ ] Could consider adding a backend of some sort, particularly if the dictionaries add on word properties I want to utilize. Postgresql, NoSQL, or serverless w/ just docker, all options.
