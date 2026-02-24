## Recursion Visualised 
Move over Towers of Hanoi. This example of recursion is **way** easier to understand.

## Tech Stack
1. Vite 
2. Typescript
3. React
4. TailwindCSS

To run this app locally, 
1. Clone the repo
```
git clone https://github.com/PostZed/recursion-visualised.git
```

2. Install dependencies
```
npm install
```

3. Run in development mode using Vite
```
npm run dev
```

4. Build the code into static HTML. 
```
npm run build
```



This demonstration works by calling a recursive function which handles both the organisation of the sequences
in the demonstration as well as the actual finding of combinations. 

The entry-point is **src/main.tsx**, where I call the home component which in turn calls the recursive function upon
the clicking of the Start button. 


