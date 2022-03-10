import { Fuse } from "./deps.ts";

const data = [
  {
    "title": "The Book of Samson",
    "author": {
      "firstName": "David",
      "lastName": "Maine",
    },
  },
  {
    "title": "Monster 1959",
    "author": {
      "firstName": "David",
      "lastName": "Maine",
    },
  },
];

const options = {
  keys: [
    "title",
    "author.firstName",
  ],
};

const fuse = new Fuse.default(data, options);

// Change the pattern
const pattern = "david";

console.log(fuse.search(pattern));
