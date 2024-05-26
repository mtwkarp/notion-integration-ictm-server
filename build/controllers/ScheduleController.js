"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleService_1 = __importDefault(require("../services/ScheduleService"));
class ScheduleController {
    constructor() {
        this.service = new ScheduleService_1.default();
        this.handleRequest = this.handleRequest.bind(this);
    }
    handleRequest(req, res) {
        const requestData = req.body;
        const response = this.service.handleRequest(requestData);
        res.status(200).json(response);
    }
}
exports.default = ScheduleController;
//# sourceMappingURL=ScheduleController.js.map