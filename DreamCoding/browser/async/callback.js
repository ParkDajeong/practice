"use strict";

class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "dajung" && password === "park") || //
        (id === "guest" && password === "hello")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found!"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "dajung") {
        onSuccess({ name: "dajung", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("Enter your ID.");
const password = prompt("Enter your Password.");
userStorage.loginUser(
  id, //
  password,
  (user) => {
    userStorage.getRoles(
      user, //
      (userWithRole) => {
        alert(`Hello, ${userWithRole.name}. you have a ${userWithRole.role}.`);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);
