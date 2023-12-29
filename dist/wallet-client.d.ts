/// <reference types="node" />
import { Ed25519Keypair } from '.';
import { JsonRpcProvider } from '.';
import { DryRunTransactionBlockResponse, ObjectId, SuiAddress } from '.';
import { NftClient } from './nft-client';
export interface AccountMetaData {
    derivationPath: string;
    address: string;
    publicKey?: string;
}
export interface Wallet {
    code: string;
    accounts: AccountMetaData[];
}
export declare class WalletClient {
    provider: JsonRpcProvider;
    nftClient: NftClient;
    constructor(nodeUrl: string, faucetUrl: string);
    /**
     * Creates new account with bip44 path and mnemonics,
     * @param path. (e.g. m/44'/784'/0'/0'/0')
     * Detailed description: {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
     * @param mnemonics.
     * @returns Ed25519Keypair
     */
    static fromDerivePath(mnemonics: string, derivationPath?: string): Ed25519Keypair;
    /**
     * returns an Ed25519Keypair object given a private key and
     * address of the account
     *
     * @param privateKey Private key of an account as a Buffer
     * @returns Ed25519Keypair object
     */
    static getAccountFromPrivateKey(privateKey: Buffer): Ed25519Keypair;
    /**
     * Each mnemonic phrase corresponds to a single wallet
     * Wallet can contain multiple accounts
     * An account corresponds to a key pair + address
     *
     * Get all the accounts of a user from their mnemonic phrase
     *
     * @param code The mnemonic phrase (12 word)
     * @returns Wallet object containing all accounts of a user
     */
    importWallet(code: string): Promise<Wallet>;
    /**
     * Creates a new wallet which contains a single account,
     * which is registered on Sui
     *
     * @returns A wallet object
     */
    createWallet(code?: string): Promise<Wallet>;
    /**
     * Creates a new account in the provided wallet
     *
     * @param code mnemonic phrase of the wallet
     * @returns
     */
    createNewAccount(code: string, index: number): Promise<AccountMetaData>;
    transferSui(amount: number, suiAccount: Ed25519Keypair, receiverAddress: SuiAddress): Promise<import("./client").SuiTransactionBlockResponse>;
    getBalance(address: string, typeArg?: string): Promise<string>;
    airdrop(address: string): Promise<{
        transferredGasObjects: {
            amount: number;
            id: string;
            transferTxDigest: string;
        }[];
        error?: string;
    }>;
    getCoinsWithRequiredBalance(address: string, amount: number, cursor?: string, limit?: number): Promise<string[]>;
    getStake(address: string): Promise<{
        validatorAddress: string;
        stakingPool: string;
        stakes: {
            status: "Active" | "Pending" | "Unstaked";
            stakedSuiId: string;
            stakeRequestEpoch: string;
            stakeActiveEpoch: string;
            principal: string;
            estimatedReward: string;
        }[];
    }[]>;
    getGasObjectsOwnedByAddress(address: string): Promise<{
        data: {
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        };
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    }[]>;
    getGasObject(address: string): Promise<string>;
    getCustomCoins(address: string): Promise<{
        Id: string;
        symbol: any;
        name: any;
        balance: number;
        decimals: any;
        iconUrl: any;
        coinTypeArg: string;
    }[]>;
    /**
     *
     * @param coinType coin type path
     * @param address address to get the coins for
     * @returns coins array
     */
    getCoins(coinType: string, address?: SuiAddress | null): Promise<{
        version: string;
        digest: string;
        coinType: string;
        previousTransaction: string;
        balance: string;
        coinObjectId: string;
    }[]>;
    getCoinBalance(coinType: string, address?: SuiAddress | null): Promise<{
        coinType: string;
        coinObjectCount: number;
        totalBalance: string;
        lockedBalance: {
            number: number;
            epochId: number;
        };
    }>;
    getAllBalances(address?: SuiAddress | null): Promise<{
        coinType: string;
        coinObjectCount: number;
        totalBalance: string;
        lockedBalance: {
            number: number;
            epochId: number;
        };
    }[]>;
    getActiveValidators(): Promise<{
        name: string;
        description: string;
        pendingStake: string;
        pendingPoolTokenWithdraw: string;
        pendingTotalSuiWithdraw: string;
        poolTokenBalance: string;
        rewardsPool: string;
        suiAddress: string;
        protocolPubkeyBytes: string;
        networkPubkeyBytes: string;
        workerPubkeyBytes: string;
        proofOfPossessionBytes: string;
        operationCapId: string;
        imageUrl: string;
        projectUrl: string;
        p2pAddress: string;
        netAddress: string;
        primaryAddress: string;
        workerAddress: string;
        nextEpochProtocolPubkeyBytes: string;
        nextEpochProofOfPossession: string;
        nextEpochNetworkPubkeyBytes: string;
        nextEpochWorkerPubkeyBytes: string;
        nextEpochNetAddress: string;
        nextEpochP2pAddress: string;
        nextEpochPrimaryAddress: string;
        nextEpochWorkerAddress: string;
        votingPower: string;
        gasPrice: string;
        commissionRate: string;
        nextEpochStake: string;
        nextEpochGasPrice: string;
        nextEpochCommissionRate: string;
        stakingPoolId: string;
        stakingPoolActivationEpoch: string;
        stakingPoolDeactivationEpoch: string;
        stakingPoolSuiBalance: string;
        exchangeRatesId: string;
        exchangeRatesSize: string;
    }[]>;
    getCoinMetadata(coinType: string): Promise<{
        symbol: string;
        name: string;
        description: string;
        id: string;
        decimals: number;
        iconUrl: string;
    }>;
    /**
     * Dry run a transaction and return the result.
     * @param tx the transaction bytes in Uint8Array
     * @returns The transaction effects
     */
    dryRunTransaction(tx: Uint8Array): Promise<DryRunTransactionBlockResponse>;
    simulateTransaction(tx: Uint8Array): Promise<DryRunTransactionBlockResponse>;
    getTransactions(address: SuiAddress, limit?: number, cursor?: string | undefined): Promise<{
        timestampMs: string;
        digest: string;
        transaction: {
            data: {
                sender: string;
                messageVersion: "v1";
                transaction: {
                    epoch: string;
                    storage_charge: string;
                    computation_charge: string;
                    storage_rebate: string;
                    epoch_start_timestamp_ms: string;
                    kind: "ChangeEpoch";
                } | {
                    epoch: string;
                    round: string;
                    commit_timestamp_ms: string;
                    kind: "ConsensusCommitPrologue";
                } | {
                    objects: string[];
                    kind: "Genesis";
                } | {
                    transactions: ({
                        MoveCall: {
                            function: string;
                            arguments: ("GasCoin" | {
                                Input: number;
                            } | {
                                Result: number;
                            } | {
                                NestedResult: [number, number];
                            })[];
                            type_arguments: string[];
                            package: string;
                            module: string;
                        };
                    } | {
                        TransferObjects: [("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[], "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        SplitCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        MergeCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        Publish: string[] | [{
                            disassembled: Record<string, unknown>;
                        }, string[]];
                    } | {
                        Upgrade: [string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }] | [{
                            disassembled: Record<string, unknown>;
                        }, string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        MakeMoveVec: [string, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    })[];
                    inputs: ({
                        value: import(".").SuiJsonValue;
                        type: "pure";
                        valueType: string;
                    } | {
                        type: "object";
                        objectType: "immOrOwnedObject";
                        objectId: string;
                        version: string;
                        digest: string;
                    } | {
                        type: "object";
                        objectType: "sharedObject";
                        objectId: string;
                        initialSharedVersion: string;
                        mutable: boolean;
                    })[];
                    kind: "ProgrammableTransaction";
                };
                gasData: {
                    payment: {
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[];
                    owner: string;
                    price: string;
                    budget: string;
                };
            };
            txSignatures: string[];
        };
        effects: {
            messageVersion: "v1";
            status: {
                status: "success" | "failure";
                error: string;
            };
            executedEpoch: string;
            modifiedAtVersions: {
                objectId: string;
                sequenceNumber: string;
            }[];
            gasUsed: {
                computationCost: string;
                storageCost: string;
                storageRebate: string;
                nonRefundableStorageFee: string;
            };
            sharedObjects: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            transactionDigest: string;
            created: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            mutated: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            unwrapped: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[];
            deleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            unwrappedThenDeleted: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            wrapped: {
                objectId: string;
                version: string | number;
                digest: string;
            }[];
            gasObject: {
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            };
            eventsDigest: string;
            dependencies: string[];
        };
        events: {
            type: string;
            id: {
                txDigest: string;
                eventSeq: string;
            };
            packageId: string;
            transactionModule: string;
            sender: string;
            parsedJson: Record<string, any>;
            bcs: string;
            timestampMs: string;
        }[];
        checkpoint: string;
        confirmedLocalExecution: boolean;
        objectChanges: ({
            type: "published";
            packageId: string;
            version: string;
            digest: string;
            modules: string[];
        } | {
            type: "transferred";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            recipient: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        } | {
            type: "mutated";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            previousVersion: string;
        } | {
            type: "deleted";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "wrapped";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
        } | {
            type: "created";
            sender: string;
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
        })[];
        balanceChanges: {
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            coinType: string;
            amount: string;
        }[];
        errors: string[];
    }[]>;
    getObject(objectId: string): Promise<{
        data: {
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        };
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    }>;
    getNftMetadata(objectID: string): Promise<{
        name: string;
        collection: string;
        collection_image: string;
        description: string;
        imageUrl: string;
        link: string;
        projectUrl: string;
        creator: string;
        data: {
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        };
    }>;
    parseIpfsUrl(ipfsUrl: string): string;
    getKioskNfts(kioskId: ObjectId): Promise<{
        kioskId: string;
        nft: any;
    }[]>;
    /**
     * This function retrieves the contents of kiosks owned by a given address on the OriginByte
     * contract.
     * @param {SuiAddress} address - The `address` parameter is a `SuiAddress` type
     * @returns The function `getOriginByteKioskContents` returns the contents of the objects within the
     * kiosks owned by the provided address. The contents are fetched by first finding the kiosk IDs
     * owned by the address, then finding the object IDs within each kiosk, and finally fetching the
     * contents of the objects within each kiosk. The function returns the fetched kiosk content.
     */
    getOriginByteKioskContents(address: SuiAddress): Promise<any[] | {
        kioskContent: {
            data: {
                type: string;
                bcs: {
                    type: string;
                    version: string;
                    hasPublicTransfer: boolean;
                    dataType: "moveObject";
                    bcsBytes: string;
                } | {
                    id: string;
                    dataType: "package";
                    moduleMap: Record<string, string>;
                };
                objectId: string;
                version: string;
                digest: string;
                owner: {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: string;
                    };
                } | "Immutable";
                storageRebate: string;
                previousTransaction: string;
                content: {
                    type: string;
                    fields: Record<string, any>;
                    hasPublicTransfer: boolean;
                    dataType: "moveObject";
                } | {
                    disassembled: Record<string, unknown>;
                    dataType: "package";
                };
                display: Record<string, string> | {
                    data: Record<string, string>;
                    error: {
                        version: string;
                        digest: string;
                        error: string;
                        code: string;
                        object_id: string;
                        parent_object_id: string;
                    };
                };
            };
            error: {
                version: string;
                digest: string;
                error: string;
                code: string;
                object_id: string;
                parent_object_id: string;
            };
        }[];
        kioskInfo: {
            type: string;
            fields: Record<string, any>;
            hasPublicTransfer: boolean;
            dataType: "moveObject";
        } | {
            disassembled: Record<string, unknown>;
            dataType: "package";
        };
    }>;
    getSuiKioskContents(address: SuiAddress): Promise<({
        data: {
            type: string;
            bcs: {
                type: string;
                version: string;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
                bcsBytes: string;
            } | {
                id: string;
                dataType: "package";
                moduleMap: Record<string, string>;
            };
            objectId: string;
            version: string;
            digest: string;
            owner: {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: string;
                };
            } | "Immutable";
            storageRebate: string;
            previousTransaction: string;
            content: {
                type: string;
                fields: Record<string, any>;
                hasPublicTransfer: boolean;
                dataType: "moveObject";
            } | {
                disassembled: Record<string, unknown>;
                dataType: "package";
            };
            display: Record<string, string> | {
                data: Record<string, string>;
                error: {
                    version: string;
                    digest: string;
                    error: string;
                    code: string;
                    object_id: string;
                    parent_object_id: string;
                };
            };
        };
        error: {
            version: string;
            digest: string;
            error: string;
            code: string;
            object_id: string;
            parent_object_id: string;
        };
    } & {
        kioskInfo?: {
            kioskId: string;
            kioskOwnerCapId: string;
        };
    })[]>;
    /**
     * This function retrieves NFTs owned by a given address and their metadata, as well as kiosk NFTs
     * and their metadata if specified.
     * @param {SuiAddress} address - The address of the owner whose NFTs are being fetched.
     * @param {boolean} [shouldFetchKioskContents] - `shouldFetchKioskContents` is an optional boolean
     * @param {string} after - last fetched key
     * @param {number} limit - limit total count
     * parameter that determines whether or not to fetch kiosk contents for the given `address`. If
     * `shouldFetchKioskContents` is `true`, the function will call
     * `this.getOriginByteKioskContents(address)` to fetch kiosk contents
     * shouldFetchKioskContents will be true only for mainnet
     * @returns The function `getNfts` returns an array of objects containing metadata for NFTs owned by
     * a given address, as well as metadata for NFTs stored in a kiosk.
     * Each object in the array contains the following properties: `nftMeta` (an object
     * containing metadata for the NFT), `objectId` and `type`
     */
    getNfts(address: SuiAddress, shouldFetchKioskContents?: boolean, after?: string | undefined, limit?: number | undefined): Promise<{
        nftsWithMetadataArray: any;
        cursor: string;
        hasNextPage: boolean;
    }>;
    getSystemState(): Promise<{
        protocolVersion: string;
        epoch: string;
        systemStateVersion: string;
        storageFundTotalObjectStorageRebates: string;
        storageFundNonRefundableBalance: string;
        referenceGasPrice: string;
        safeMode: boolean;
        safeModeStorageRewards: string;
        safeModeComputationRewards: string;
        safeModeStorageRebates: string;
        safeModeNonRefundableStorageFee: string;
        epochStartTimestampMs: string;
        epochDurationMs: string;
        stakeSubsidyStartEpoch: string;
        maxValidatorCount: string;
        minValidatorJoiningStake: string;
        validatorLowStakeThreshold: string;
        validatorVeryLowStakeThreshold: string;
        validatorLowStakeGracePeriod: string;
        stakeSubsidyBalance: string;
        stakeSubsidyDistributionCounter: string;
        stakeSubsidyCurrentDistributionAmount: string;
        stakeSubsidyPeriodLength: string;
        stakeSubsidyDecreaseRate: number;
        totalStake: string;
        activeValidators: {
            name: string;
            description: string;
            pendingStake: string;
            pendingPoolTokenWithdraw: string;
            pendingTotalSuiWithdraw: string;
            poolTokenBalance: string;
            rewardsPool: string;
            suiAddress: string;
            protocolPubkeyBytes: string;
            networkPubkeyBytes: string;
            workerPubkeyBytes: string;
            proofOfPossessionBytes: string;
            operationCapId: string;
            imageUrl: string;
            projectUrl: string;
            p2pAddress: string;
            netAddress: string;
            primaryAddress: string;
            workerAddress: string;
            nextEpochProtocolPubkeyBytes: string;
            nextEpochProofOfPossession: string;
            nextEpochNetworkPubkeyBytes: string;
            nextEpochWorkerPubkeyBytes: string;
            nextEpochNetAddress: string;
            nextEpochP2pAddress: string;
            nextEpochPrimaryAddress: string;
            nextEpochWorkerAddress: string;
            votingPower: string;
            gasPrice: string;
            commissionRate: string;
            nextEpochStake: string;
            nextEpochGasPrice: string;
            nextEpochCommissionRate: string;
            stakingPoolId: string;
            stakingPoolActivationEpoch: string;
            stakingPoolDeactivationEpoch: string;
            stakingPoolSuiBalance: string;
            exchangeRatesId: string;
            exchangeRatesSize: string;
        }[];
        pendingActiveValidatorsId: string;
        pendingActiveValidatorsSize: string;
        pendingRemovals: string[];
        stakingPoolMappingsId: string;
        stakingPoolMappingsSize: string;
        inactivePoolsId: string;
        inactivePoolsSize: string;
        validatorCandidatesId: string;
        validatorCandidatesSize: string;
        atRiskValidators: [string, string][];
        validatorReportRecords: [string, string[]][];
    }>;
    getTotalStake(): Promise<any>;
    getValidatorsList(sortKey?: string, sortAscending?: boolean): Promise<{
        name: string;
        address: string;
        imageUrl: string;
        apy: number;
        stakeShare: number;
        totalStaked: string;
        epoch: string;
    }[]>;
    getDelegatedStake(address: string): Promise<{
        validatorAddress: string;
        stakingPool: string;
        stakes: {
            status: "Active" | "Pending" | "Unstaked";
            stakedSuiId: string;
            stakeRequestEpoch: string;
            stakeActiveEpoch: string;
            principal: string;
            estimatedReward: string;
        }[];
    }[]>;
    getTimeBeforeEpochNumber(epoch: number): Promise<{
        data: number;
        protocolVersion: string;
        epoch: string;
        systemStateVersion: string;
        storageFundTotalObjectStorageRebates: string;
        storageFundNonRefundableBalance: string;
        referenceGasPrice: string;
        safeMode: boolean;
        safeModeStorageRewards: string;
        safeModeComputationRewards: string;
        safeModeStorageRebates: string;
        safeModeNonRefundableStorageFee: string;
        epochStartTimestampMs: string;
        epochDurationMs: string;
        stakeSubsidyStartEpoch: string;
        maxValidatorCount: string;
        minValidatorJoiningStake: string;
        validatorLowStakeThreshold: string;
        validatorVeryLowStakeThreshold: string;
        validatorLowStakeGracePeriod: string;
        stakeSubsidyBalance: string;
        stakeSubsidyDistributionCounter: string;
        stakeSubsidyCurrentDistributionAmount: string;
        stakeSubsidyPeriodLength: string;
        stakeSubsidyDecreaseRate: number;
        totalStake: string;
        activeValidators: {
            name: string;
            description: string;
            pendingStake: string;
            pendingPoolTokenWithdraw: string;
            pendingTotalSuiWithdraw: string;
            poolTokenBalance: string;
            rewardsPool: string;
            suiAddress: string;
            protocolPubkeyBytes: string;
            networkPubkeyBytes: string;
            workerPubkeyBytes: string;
            proofOfPossessionBytes: string;
            operationCapId: string;
            imageUrl: string;
            projectUrl: string;
            p2pAddress: string;
            netAddress: string;
            primaryAddress: string;
            workerAddress: string;
            nextEpochProtocolPubkeyBytes: string;
            nextEpochProofOfPossession: string;
            nextEpochNetworkPubkeyBytes: string;
            nextEpochWorkerPubkeyBytes: string;
            nextEpochNetAddress: string;
            nextEpochP2pAddress: string;
            nextEpochPrimaryAddress: string;
            nextEpochWorkerAddress: string;
            votingPower: string;
            gasPrice: string;
            commissionRate: string;
            nextEpochStake: string;
            nextEpochGasPrice: string;
            nextEpochCommissionRate: string;
            stakingPoolId: string;
            stakingPoolActivationEpoch: string;
            stakingPoolDeactivationEpoch: string;
            stakingPoolSuiBalance: string;
            exchangeRatesId: string;
            exchangeRatesSize: string;
        }[];
        pendingActiveValidatorsId: string;
        pendingActiveValidatorsSize: string;
        pendingRemovals: string[];
        stakingPoolMappingsId: string;
        stakingPoolMappingsSize: string;
        inactivePoolsId: string;
        inactivePoolsSize: string;
        validatorCandidatesId: string;
        validatorCandidatesSize: string;
        atRiskValidators: [string, string][];
        validatorReportRecords: [string, string[]][];
    }>;
    static getAccountFromMetaData(mnemonic: string, metadata: AccountMetaData): any;
    /**
     * returns an Ed25519Keypair at position m/44'/784'/0'/0'/0'
     *
     * @param mnemonic mnemonic phrase of the wallet
     * @returns Ed25519Keypair
     */
    static getAccountFromMnemonic(mnemonic: string): Ed25519Keypair;
}
//# sourceMappingURL=wallet-client.d.ts.map