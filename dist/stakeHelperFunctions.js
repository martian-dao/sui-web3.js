"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenStakeSuiForValidator = exports.getStakeSuiBySuiId = exports.getDelegationDataByStakeId = exports.getAllStakeSui = exports.calculateAPY = exports.calculateStakeShare = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const calculateStakeShare = (validatorStake, totalStake, decimalPlaces = 2) => {
    const bn = new bignumber_js_1.default(validatorStake.toString());
    const bd = new bignumber_js_1.default(totalStake.toString());
    const percentage = bn
        .div(bd)
        .multipliedBy(100)
        .decimalPlaces(decimalPlaces)
        .toNumber();
    return percentage;
};
exports.calculateStakeShare = calculateStakeShare;
function calculateAPY(apy, roundDecimals = 4) {
    return parseFloat((apy * 100).toFixed(roundDecimals));
}
exports.calculateAPY = calculateAPY;
// Get staked Sui
const getAllStakeSui = (allDelegation) => {
    return (allDelegation.reduce((acc, curr) => curr.stakes.reduce((total, { principal }) => total + BigInt(principal), acc), 0n) || 0n);
};
exports.getAllStakeSui = getAllStakeSui;
// Helper function to get the delegation by stakedSuiId
const getDelegationDataByStakeId = (delegationsStake, stakeSuiId) => {
    let stake = null;
    for (const { stakes } of delegationsStake) {
        stake =
            stakes.find(({ stakedSuiId }) => stakedSuiId === stakeSuiId) || null;
        if (stake)
            return stake;
    }
    return stake;
};
exports.getDelegationDataByStakeId = getDelegationDataByStakeId;
// Get Stake SUI by stakeSuiId
const getStakeSuiBySuiId = (allDelegation, stakeSuiId) => {
    return (allDelegation.reduce((acc, curr) => {
        const total = BigInt(curr.stakes.find(({ stakedSuiId }) => stakedSuiId === stakeSuiId)
            ?.principal || 0);
        return total + acc;
    }, 0n) || 0n);
};
exports.getStakeSuiBySuiId = getStakeSuiBySuiId;
// Get total Stake SUI for a specific validator address
const getTokenStakeSuiForValidator = (allDelegation, validatorAddress) => {
    return (allDelegation.reduce((acc, curr) => {
        if (validatorAddress === curr.validatorAddress) {
            return curr.stakes.reduce((total, { principal }) => total + BigInt(principal), acc);
        }
        return acc;
    }, 0n) || 0n);
};
exports.getTokenStakeSuiForValidator = getTokenStakeSuiForValidator;
//# sourceMappingURL=stakeHelperFunctions.js.map