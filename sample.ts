// A simple TypeScript example

// 1. Type annotation
let username: string = "Rahin";
let age: number = 22;

// 2. Function with types
function greet(name: string, age: number): string {
    return `Hello ${name}, you are ${age} years old!`;
}

// 3. Interface example
interface User {
    id: number;
    name: string;
    isAdmin: boolean;
}

// 4. Object with interface
const user: User = {
    id: 1,
    name: "Rahin",
    isAdmin: false
};

// 5. Calling the function
console.log(greet(username, age));
console.log("User Info:", user);
