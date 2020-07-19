"use strict";

// Callback Hell => Promise
class UserStorage {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (id === "dajung" && password === "park") || //
          (id === "guest" && password === "hello")
        ) {
          resolve(id);
        } else {
          reject(new Error("not found!"));
        }
      }, 2000);
    });
  }

  getRoles(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId === "dajung") {
          resolve({ name: "dajung", role: "admin" });
        } else {
          reject(new Error("no access"));
        }
      }, 1000);
    });
  }
}

const userStorage = new UserStorage();
const id = prompt("Enter your ID.");
const password = prompt("Enter your Password.");

userStorage
  .loginUser(id, password) //
  // .then((userId) => userStorage.getRoles(userId)) 받아온 것을 그대로 사용할 경우, 생략 가능.
  .then(userStorage.getRoles)
  .then((user) => alert(`Hello, ${user.name}. you have a ${user.role}.`))
  .catch(console.log);
