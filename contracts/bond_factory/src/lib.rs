#![no_std]
extern crate alloc;

// Import `Box` for `async_trait` to work
use alloc::boxed::Box;
use alloc::{string::String, vec::Vec};
use async_trait::async_trait;
use linera_sdk::{
    base::{Amount, Timestamp},
    // Imports for the 0.15.x ABI system
    Contract, ContractRuntime, Service, ServiceRuntime,
    WithContractAbi, WithServiceAbi, ContractAbi, ServiceAbi,
    ApplicationId, Context, OperationContext, MessageContext,
};
use serde::{Serialize, Deserialize};
use linera_views::views;
use thiserror::Error;

// --- Your Data Types (unchanged) ---

#[derive(Serialize, Deserialize, Debug)]
pub enum Message {
    CreateBond {
        creator: String,
        total_supply: u128,
        revenue_share_percent: u8,
        maturity_date: Timestamp,
        initial_price: Amount,
        category: String,
    },
}

#[derive(Serialize, Deserialize, Debug)]
pub enum Query {
    GetBonds,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum QueryResponse {
    Bonds(Vec<BondInfo>),
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct BondInfo {
    pub id: u64,
    pub creator: String,
    pub total_supply: u128,
    pub maturity_date: Timestamp,
}

// --- ABI Definition ---
pub struct BondFactoryAbi;

impl ContractAbi for BondFactoryAbi {
    type Message = Message;
    type InstantiationArgument = ();
    type Parameters = ();
}

impl ServiceAbi for BondFactoryAbi {
    type Query = Query;
    type QueryResponse = QueryResponse;
    type Parameters = ();
}

/// -------------------- Contract --------------------
pub struct BondFactoryContract;

impl WithContractAbi for BondFactoryContract {
    type Abi = BondFactoryAbi;
}

#[derive(Debug, Error, Serialize, Deserialize)]
pub enum ContractError {
    #[error("An error occurred in the bond factory contract")]
    GenericError,
}

#[async_trait]
impl Contract for BondFactoryContract {
    type Error = ContractError;
    type Message = <Self::Abi as ContractAbi>::Message;
    type InstantiationArgument = <Self::Abi as ContractAbi>::InstantiationArgument;
    type Parameters = <Self::Abi as ContractAbi>::Parameters;

    async fn load(_runtime: ContractRuntime<Self>) -> Result<Self, Self::Error> {
        Ok(Self)
    }

    async fn instantiate(&mut self, _context: Context, _arg: Self::InstantiationArgument) -> Result<(), Self::Error> {
        Ok(())
    }

    async fn execute_operation(&mut self, _context: OperationContext, _op: Self::Message) -> Result<(), Self::Error> {
        Ok(())
    }

    async fn execute_message(&mut self, _context: MessageContext, _msg: Self::Message) -> Result<(), Self::Error> {
        Ok(())
    }

    async fn store(self) -> Result<(), Self::Error> {
        Ok(())
    }
}

/// -------------------- Service --------------------
pub struct BondFactoryService;

impl WithServiceAbi for BondFactoryService {
    type Abi = BondFactoryAbi;
}

#[derive(Debug, Error, Serialize, Deserialize)]
pub enum ServiceError {
    #[error("An error occurred in the bond factory service")]
    GenericError,
}

#[async_trait]
impl Service for BondFactoryService {
    type Error = ServiceError;
    type Parameters = <Self::Abi as ServiceAbi>::Parameters;

    async fn new(_runtime: ServiceRuntime<Self>) -> Result<Self, Self::Error> {
        Ok(Self)
    }

    async fn handle_query(&self, _query: <Self::Abi as ServiceAbi>::Query) -> Result<<Self::Abi as ServiceAbi>::QueryResponse, Self.Error> {
        Ok(QueryResponse::Bonds(Vec::new()))
    }
}

/// -------------------- Macros --------------------
linera_sdk::contract!(BondFactoryContract);
linera_sdk::service!(BondFactoryService);

