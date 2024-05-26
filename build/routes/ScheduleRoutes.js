"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ScheduleController_1 = __importDefault(require("../controllers/ScheduleController"));
const router = (0, express_1.Router)();
const mainController = new ScheduleController_1.default();
router.post('/api/request', mainController.handleRequest);
exports.default = router;
//# sourceMappingURL=ScheduleRoutes.js.map