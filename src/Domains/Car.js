"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vehicle_1 = require("./Vehicle");
class Car extends Vehicle_1.default {
    constructor(car) {
        super(car);
        const { doorsQty, seatsQty } = car;
        this.doorsQty = doorsQty;
        this.seatsQty = seatsQty;
    }
}
exports.default = Car;
