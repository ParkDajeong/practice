"use strict";

// Promise => async&await
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

  async getUserWithRoles(id, password) {
    const user = await this.loginUser(id, password);
    const userWithRole = await this.getRoles(user);

    return userWithRole;
  }
}

const userStorage = new UserStorage();
const id = prompt("Enter your ID.");
const password = prompt("Enter your Password.");

userStorage
  .getUserWithRoles(id, password) //
  .then((user) => alert(`Hello, ${user.name}. you have a ${user.role}.`))
  .catch(console.log);
