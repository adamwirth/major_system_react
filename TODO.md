### todo
- [ ] Add interspersing of little words like "of" and "the". ~~It's a shame these words don't have a name or I'd sound wicked smaht by using it...~~ **Update**: This would be great with [corpora](https://github.com/dariusk/corpora/tree/master/data/words)!
- [ ] Make some basic weighting of viability of different options. Maybe I can identify what words are more "rare", and percolate those to the top of the sort order.
- [ ] Add words' properties, like "adjective" or "noun", for different scoring and weighting. Basic example, the last word would always be a noun, and words leading up to it could be adjectives. Maybe add verbs in once there are at least 2 nouns. **Update**: This would be great with [corpora](https://github.com/dariusk/corpora/tree/master/data/words)!
- [ ] Especially as the logic increases, I should add tests!
- [ ] Look into adding additional files in the generated types folder.
- [ ] Could consider adding a backend of some sort, particularly if the dictionaries add on word properties I want to utilize. Postgresql, NoSQL, or serverless w/ just docker, all options.
- [ ] Feature: add background about the major system on to the web page. ~~My instinct is to do this first, but it's not what's important, so I need to restrain myself from making some pretty-but-unfunctional app...~~
- [ ] Feature: save the last 10 outputs internally and display them on the side, in case the user types an extra character by mistake, or sees something they regret not sticking with
- [ ] Optimize the algorithm that checks for uniqueness, mainly for larger inputs
- [ ] Probably the last priority would be to prettify the CSS/page layout.

### completed
- [x] Get a textarea input to bind user input and pass it to React.
- [x] Create a parser for said user input. Initially logging to console.
- [x] Add a small dictionary of like 10 words and write a set of logic to convert parsed input to potential matches with interspersed vowels. Regexp might be good here.
- [x] The dictionary words I currently have are too inclusive! Most of these words I've never heard of, and I'm a native english speaker. I need to get a "most used" dictionary setup!
- [x] Get a real dictionary setup. I could import it from an API somewhere, maybe, or add a .txt file to the repository. Not sure.
- [x] Learn about Typescript and React tools, like linters.
- [x] Code splitting out of one big `App.tsx` file.
- [x] Feature: a button to generate new values for the same input
- [x] Feature: a toggle to have all output words be unique
