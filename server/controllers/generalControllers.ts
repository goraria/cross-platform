import User from "../models/userModel";
// import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/transactionModel";
import { NextFunction, Request, Response } from "express";

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getDashboardStats = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        // hardcoded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        /* Recent Transactions */
        const transactions = await Transaction.find()
            .limit(50)
            .sort({ createdOn: -1 });

        /* Overall Stats */
        // const overallStat = await OverallStat.find({ year: currentYear });

        // const {
        //     totalCustomers,
        //     yearlyTotalSoldUnits,
        //     yearlySalesTotal,
        //     monthlyData,
        //     salesByCategory,
        // } = overallStat[0];
        //
        // const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
        //     return month === currentMonth;
        // });
        //
        // const todayStats = overallStat[0].dailyData.find(({ date }) => {
        //     return date === currentDay;
        // });

        res.status(200).json({
            // totalCustomers,
            // yearlyTotalSoldUnits,
            // yearlySalesTotal,
            // monthlyData,
            // salesByCategory,
            // thisMonthStats,
            // todayStats,
            // transactions,
        });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
