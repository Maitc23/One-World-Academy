"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Courses", [
      {
        id: 1,
        title: "HTML Entry Level",
        category: "JS",
        courseImage:
          "https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/html-512.png",
        courseDescription: "This is a beginners course for HTML.",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },

      {
        id: 2,
        title: "CSS Entry Level",
        category: "CSS",
        courseImage:
          "https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/css-512.png",
        courseDescription: "This is a beginners course for CSS.",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        id: 3,
        title: "JavaScript Entry Level",
        category: "JS",
        courseImage:
          "https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/javascript-512.png",
        courseDescription: "This is a beginners course for JavsScript.",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },

      {
        id: 4,
        title: "Node JS Entry Level",
        category: "CSS",
        courseImage:
          "https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/nodejs-512.png",
        courseDescription: "This is a beginners course for Node jS.",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Courses", null, {});
  }
};
