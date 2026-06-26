interface User {
  id: number;
  name: string;
  email: string;
}

function greet(user: User): string {
  return `Hello, ${user.name}! Your email is ${user.email}`;
}

const currentUser: User = {
  id: 1,
  name: "Developer",
  email: "dev@example.com"
};

console.log(greet(currentUser));

function sum(a: number, b: number): number {
  return a + b;
}

console.log(`Sum of 5 and 3 is: ${sum(5, 3)}`);
