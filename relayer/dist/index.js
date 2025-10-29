"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const googleapis_1 = require("googleapis");
const node_cron_1 = __importDefault(require("node-cron"));
const winston_1 = __importDefault(require("winston"));
// Load environment variables
dotenv_1.default.config();
const execp = util_1.default.promisify(child_process_1.exec);
// Configure logger
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: 'relayer.log' })
    ]
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// YouTube API setup
const youtube = googleapis_1.google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
});
// Store for tracking creators and their channels
const creatorChannels = new Map();
/**
 * YouTube Analytics Integration
 */
async function fetchChannelAnalytics(channelId) {
    try {
        const response = await youtube.channels.list({
            part: ['statistics', 'snippet'],
            id: [channelId],
        });
        const channel = response.data.items?.[0];
        if (!channel) {
            throw new Error('Channel not found');
        }
        const stats = channel.statistics;
        const snippet = channel.snippet;
        return {
            channelId,
            title: snippet?.title,
            subscriberCount: parseInt(stats?.subscriberCount || '0'),
            viewCount: parseInt(stats?.videoCount || '0'),
            videoCount: parseInt(stats?.videoCount || '0'),
            // Note: Revenue data requires YouTube Partner Program access
            // This would need OAuth integration for actual revenue data
            estimatedRevenue: Math.floor(Math.random() * 10000) + 1000, // Mock data
        };
    }
    catch (error) {
        logger.error('Error fetching channel analytics:', error);
        throw error;
    }
}
/**
 * Revenue Oracle - Updates creator revenue data
 */
async function updateCreatorRevenue(creatorAddress, channelId) {
    try {
        const analytics = await fetchChannelAnalytics(channelId);
        // Calculate estimated revenue (in production, this would be real data)
        const revenueReport = {
            creator: creatorAddress,
            channelId,
            period: new Date().toISOString().slice(0, 7), // YYYY-MM format
            amount: analytics.estimatedRevenue,
            subscriberCount: analytics.subscriberCount,
            viewCount: analytics.viewCount,
            timestamp: new Date().toISOString(),
        };
        // Get creator's bond tranches
        const creator = creatorChannels.get(creatorAddress);
        if (!creator) {
            logger.warn(`No bond tranches found for creator: ${creatorAddress}`);
            return;
        }
        // Update each bond tranche with revenue data
        for (const trancheId of creator.bondTranches) {
            await recordRevenueOnChain(trancheId, revenueReport);
        }
        creator.lastRevenueUpdate = new Date();
        logger.info(`Updated revenue for creator ${creatorAddress}: $${analytics.estimatedRevenue}`);
    }
    catch (error) {
        logger.error(`Error updating revenue for creator ${creatorAddress}:`, error);
    }
}
/**
 * Record revenue on Linera blockchain
 */
async function recordRevenueOnChain(trancheId, revenueReport) {
    try {
        const message = JSON.stringify(revenueReport);
        const reportHash = ethers_1.ethers.keccak256(ethers_1.ethers.toUtf8Bytes(message));
        const lineraCmd = `linera tx call --chain ${process.env.LINERA_CHAIN_ID || "creator-chain-id"} --contract bond_contract --method record_revenue --args '${JSON.stringify({
            tranche_id: trancheId,
            amount: revenueReport.amount.toString(),
            period: revenueReport.period,
            report_hash: reportHash,
        })}'`;
        const { stdout, stderr } = await execp(lineraCmd);
        logger.info(`Linera transaction result for tranche ${trancheId}:`, stdout);
        if (stderr) {
            logger.warn(`Linera stderr:`, stderr);
        }
    }
    catch (error) {
        logger.error(`Error recording revenue on chain for tranche ${trancheId}:`, error);
    }
}
/**
 * API Endpoints
 */
// Register creator channel
app.post("/register-creator", async (req, res) => {
    try {
        const { creatorAddress, channelId, bondTranches } = req.body;
        if (!creatorAddress || !channelId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        creatorChannels.set(creatorAddress, {
            channelId,
            lastRevenueUpdate: new Date(),
            bondTranches: bondTranches || [],
        });
        logger.info(`Registered creator ${creatorAddress} with channel ${channelId}`);
        res.json({ success: true, message: "Creator registered successfully" });
    }
    catch (error) {
        logger.error("Error registering creator:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Get creator analytics
app.get("/analytics/:creatorAddress", async (req, res) => {
    try {
        const { creatorAddress } = req.params;
        const creator = creatorChannels.get(creatorAddress);
        if (!creator) {
            // Return mock analytics for demo purposes
            const mockAnalytics = {
                channelId: "UC" + Math.random().toString(36).substr(2, 22),
                channelName: "Demo Creator",
                subscriberCount: Math.floor(Math.random() * 1000000) + 10000,
                viewCount: Math.floor(Math.random() * 10000000) + 100000,
                videoCount: Math.floor(Math.random() * 1000) + 50,
                estimatedMonthlyRevenue: Math.floor(Math.random() * 10000) + 1000,
                lastUpdated: new Date().toISOString(),
            };
            return res.json(mockAnalytics);
        }
        const analytics = await fetchChannelAnalytics(creator.channelId);
        res.json(analytics);
    }
    catch (error) {
        logger.error("Error fetching analytics:", error);
        // Return mock analytics on error for demo purposes
        const mockAnalytics = {
            channelId: "UC" + Math.random().toString(36).substr(2, 22),
            channelName: "Demo Creator",
            subscriberCount: Math.floor(Math.random() * 1000000) + 10000,
            viewCount: Math.floor(Math.random() * 10000000) + 100000,
            videoCount: Math.floor(Math.random() * 1000) + 50,
            estimatedMonthlyRevenue: Math.floor(Math.random() * 10000) + 1000,
            lastUpdated: new Date().toISOString(),
        };
        res.json(mockAnalytics);
    }
});
// Revenue attestation endpoint
app.post("/attestation", async (req, res) => {
    try {
        const { creatorAddress, revenueReport, signature } = req.body;
        if (!creatorAddress || !revenueReport || !signature) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const message = JSON.stringify(revenueReport);
        const recovered = ethers_1.ethers.verifyMessage(message, signature);
        if (recovered.toLowerCase() !== creatorAddress.toLowerCase()) {
            return res.status(401).json({ error: "Invalid signature" });
        }
        // Record revenue on chain
        const reportHash = ethers_1.ethers.keccak256(ethers_1.ethers.toUtf8Bytes(message));
        const lineraCmd = `linera tx call --chain ${process.env.LINERA_CHAIN_ID || "creator-chain-id"} --contract bond_contract --method record_revenue --args '${JSON.stringify({
            tranche_id: revenueReport.bondId,
            amount: revenueReport.amount,
            period: revenueReport.period,
            report_hash: reportHash,
        })}'`;
        const { stdout, stderr } = await execp(lineraCmd);
        logger.info("Revenue attestation processed:", stdout);
        res.json({ success: true, transaction: stdout });
    }
    catch (error) {
        logger.error("Error processing attestation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Buy bonds endpoint
app.post("/buy", async (req, res) => {
    try {
        const { buyerAddress, trancheId, amount } = req.body;
        if (!buyerAddress || !trancheId || !amount) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const lineraCmd = `linera tx call --chain ${process.env.LINERA_CHAIN_ID || "creator-chain-id"} --contract bond_contract --method buy_bonds --args '${JSON.stringify({
            tranche_id: trancheId,
            amount: amount,
            buyer: buyerAddress,
        })}'`;
        const { stdout, stderr } = await execp(lineraCmd);
        logger.info("Bond purchase processed:", stdout);
        res.json({ success: true, transaction: stdout });
    }
    catch (error) {
        logger.error("Error processing bond purchase:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Get bond tranches
app.get("/tranches", async (req, res) => {
    try {
        const lineraCmd = `linera query --chain ${process.env.LINERA_CHAIN_ID || "creator-chain-id"} --contract bond_contract --method get_tranches`;
        const { stdout } = await execp(lineraCmd);
        res.json({ success: true, data: JSON.parse(stdout) });
    }
    catch (error) {
        logger.error("Error fetching tranches:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Root route
app.get("/", (req, res) => {
    res.json({
        message: "HypeVest Relayer API",
        version: "0.1.0",
        status: "running",
        timestamp: new Date().toISOString(),
        endpoints: [
            "GET / - API information",
            "GET /health - Health check",
            "POST /register-creator - Register creator channel",
            "GET /analytics/:creatorAddress - Get creator analytics",
            "POST /attestation - Submit revenue attestation",
            "POST /buy - Buy creator bonds",
            "GET /tranches - Get available bond tranches"
        ]
    });
});
// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        registeredCreators: creatorChannels.size
    });
});
/**
 * Scheduled Tasks
 */
// Update revenue data every hour
node_cron_1.default.schedule('0 * * * *', async () => {
    logger.info("Running scheduled revenue update...");
    for (const [creatorAddress, creator] of creatorChannels) {
        try {
            await updateCreatorRevenue(creatorAddress, creator.channelId);
        }
        catch (error) {
            logger.error(`Scheduled update failed for creator ${creatorAddress}:`, error);
        }
    }
});
// Update analytics every 6 hours
node_cron_1.default.schedule('0 */6 * * *', async () => {
    logger.info("Running scheduled analytics update...");
    for (const [creatorAddress, creator] of creatorChannels) {
        try {
            const analytics = await fetchChannelAnalytics(creator.channelId);
            logger.info(`Analytics updated for ${creatorAddress}:`, {
                subscribers: analytics.subscriberCount,
                views: analytics.viewCount,
                estimatedRevenue: analytics.estimatedRevenue
            });
        }
        catch (error) {
            logger.error(`Analytics update failed for creator ${creatorAddress}:`, error);
        }
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    logger.info(`HypeVest Relayer listening on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
//# sourceMappingURL=index.js.map