'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('stations', 
    [
      {
         name: "bến xe đà nẵng",
         address: "Tôn Đức Thắng, Hoà Minh, Liên Chiểu, Đà Nẵng",
         province: "Thanh phố DN",
         createdAt: "2023-02-02 21:15:37",
        updatedAt: "2023-02-11 08:12:37"
       },
       {
        name: "bến xe HCM",
        address: "Tôn Đức Thắng, Hoà Minh, Liên Chiểu, Đà Nẵng",
        province: "Thanh phố DN",
        createdAt: "2023-02-02 21:15:37",
       updatedAt: "2023-02-11 08:12:37"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('stations', null, {});
  }
};
