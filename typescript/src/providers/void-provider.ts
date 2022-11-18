// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SignatureScheme } from '../cryptography/publickey';
import { HttpHeaders } from '../rpc/client';
import {
  CertifiedTransaction,
  CoinDenominationInfoResponse,
  TransactionDigest,
  GetTxnDigestsResponse,
  GatewayTxSeqNumber,
  SuiObjectInfo,
  GetObjectDataResponse,
  SuiObjectRef,
  SuiMoveFunctionArgTypes,
  SuiMoveNormalizedFunction,
  SuiMoveNormalizedStruct,
  SuiMoveNormalizedModule,
  SuiMoveNormalizedModules,
  SuiEventFilter,
  SuiEventEnvelope,
  SubscriptionId,
  ExecuteTransactionRequestType,
  SuiExecuteTransactionResponse,
  SuiAddress,
  ObjectId,
  TransactionQuery,
  PaginatedTransactionDigests,
  EventQuery,
  PaginatedEvents,
  EventId,
  RpcApiVersion,
  FaucetResponse,
  Order,
  TransactionEffects,
} from '../types';
import { Provider } from './provider';

export class VoidProvider extends Provider {
  // API Version
  async getRpcApiVersion(): Promise<RpcApiVersion | undefined> {
    throw this.newError('getRpcApiVersion');
  }

  // Faucet
  async requestSuiFromFaucet(
    _recipient: SuiAddress,
    _httpHeaders?: HttpHeaders
  ): Promise<FaucetResponse> {
    throw this.newError('requestSuiFromFaucet');
  }

  // Objects
  async getObjectsOwnedByAddress(_address: string): Promise<SuiObjectInfo[]> {
    throw this.newError('getObjectsOwnedByAddress');
  }

  async getGasObjectsOwnedByAddress(
    _address: string
  ): Promise<SuiObjectInfo[]> {
    throw this.newError('getGasObjectsOwnedByAddress');
  }

  getCoinDenominationInfo(_coin_type: string): CoinDenominationInfoResponse {
    throw this.newError('getCoinDenominationInfo');
  }

  async getCoinBalancesOwnedByAddress(
    _address: string,
    _typeArg?: string
  ): Promise<GetObjectDataResponse[]> {
    throw this.newError('getCoinBalancesOwnedByAddress');
  }

  async selectCoinsWithBalanceGreaterThanOrEqual(
    _address: string,
    _amount: bigint,
    _typeArg: string,
    _exclude: ObjectId[] = []
  ): Promise<GetObjectDataResponse[]> {
    throw this.newError('selectCoinsWithBalanceGreaterThanOrEqual');
  }

  async selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
    _address: string,
    _amount: bigint,
    _typeArg: string,
    _exclude: ObjectId[]
  ): Promise<GetObjectDataResponse[]> {
    throw this.newError('selectCoinSetWithCombinedBalanceGreaterThanOrEqual');
  }

  async getObject(_objectId: string): Promise<GetObjectDataResponse> {
    throw this.newError('getObject');
  }

  async getObjectRef(_objectId: string): Promise<SuiObjectRef | undefined> {
    throw this.newError('getObjectRef');
  }

  // Transactions
  async getTransaction(
    _digest: TransactionDigest
  ): Promise<CertifiedTransaction> {
    throw this.newError('getTransaction');
  }

  async executeTransaction(
    _txnBytes: string,
    _signatureScheme: SignatureScheme,
    _signature: string,
    _pubkey: string,
    _requestType: ExecuteTransactionRequestType
  ): Promise<SuiExecuteTransactionResponse> {
    throw this.newError('executeTransaction with request Type');
  }

  dryRunTransaction(_txBytes: string): Promise<TransactionEffects> {
    throw this.newError('dryRunTransaction');
  }

  async getTotalTransactionNumber(): Promise<number> {
    throw this.newError('getTotalTransactionNumber');
  }

  async getTransactionDigestsInRange(
    _start: GatewayTxSeqNumber,
    _end: GatewayTxSeqNumber
  ): Promise<GetTxnDigestsResponse> {
    throw this.newError('getTransactionDigestsInRange');
  }

  async getMoveFunctionArgTypes(
    _objectId: string,
    _moduleName: string,
    _functionName: string
  ): Promise<SuiMoveFunctionArgTypes> {
    throw this.newError('getMoveFunctionArgTypes');
  }

  async getNormalizedMoveModulesByPackage(
    _objectId: string
  ): Promise<SuiMoveNormalizedModules> {
    throw this.newError('getNormalizedMoveModulesByPackage');
  }

  async getNormalizedMoveModule(
    _objectId: string,
    _moduleName: string
  ): Promise<SuiMoveNormalizedModule> {
    throw this.newError('getNormalizedMoveModule');
  }

  async getNormalizedMoveFunction(
    _objectId: string,
    _moduleName: string,
    _functionName: string
  ): Promise<SuiMoveNormalizedFunction> {
    throw this.newError('getNormalizedMoveFunction');
  }

  async getNormalizedMoveStruct(
    _objectId: string,
    _oduleName: string,
    _structName: string
  ): Promise<SuiMoveNormalizedStruct> {
    throw this.newError('getNormalizedMoveStruct');
  }

  async syncAccountState(_address: string): Promise<any> {
    throw this.newError('syncAccountState');
  }



  async subscribeEvent(
    _filter: SuiEventFilter,
    _onMessage: (event: SuiEventEnvelope) => void
  ): Promise<SubscriptionId> {
    throw this.newError('subscribeEvent');
  }

  async unsubscribeEvent(_id: SubscriptionId): Promise<boolean> {
    throw this.newError('unsubscribeEvent');
  }

  private newError(operation: string): Error {
    return new Error(`Please use a valid provider for ${operation}`);
  }

  async getTransactions(
      _query: TransactionQuery,
      _cursor: TransactionDigest | null,
      _limit: number | null,
      _order: Order
  ): Promise<PaginatedTransactionDigests> {
    throw this.newError('getTransactions');
  }

  async getEvents(
      _query: EventQuery,
      _cursor: EventId | null,
      _limit: number | null,
      _order: Order
  ): Promise<PaginatedEvents> {
    throw this.newError('getEvents');
  }
}
