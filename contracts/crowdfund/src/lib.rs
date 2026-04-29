#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Target,
    Deadline,
    AmountRaised,
    Deposits(Address),
    State,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum CrowdfundState {
    Active,
    Success,
    Failed,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct StateInfo {
    pub target: u64,
    pub deadline: u64,
    pub amount_raised: u64,
    pub state: CrowdfundState,
}

#[contract]
pub struct CrowdfundContract;

#[contractimpl]
impl CrowdfundContract {
    pub fn initialize(env: Env, target: u64, deadline: u64) {
        if env.storage().instance().has(&DataKey::Target) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Target, &target);
        env.storage().instance().set(&DataKey::Deadline, &deadline);
        env.storage().instance().set(&DataKey::AmountRaised, &0u64);
        env.storage().instance().set(&DataKey::State, &CrowdfundState::Active);
    }

    pub fn deposit(env: Env, user: Address, amount: u64) {
        user.require_auth();

        let state: CrowdfundState = env.storage().instance().get(&DataKey::State).unwrap();
        if state != CrowdfundState::Active {
            panic!("Goal Already Reached or Failed"); // Handles Goal Already Reached
        }

        let deadline: u64 = env.storage().instance().get(&DataKey::Deadline).unwrap();
        if env.ledger().timestamp() > deadline {
            panic!("Deadline Passed"); // Handles Deadline Passed
        }

        let mut amount_raised: u64 = env.storage().instance().get(&DataKey::AmountRaised).unwrap_or(0);
        amount_raised += amount;
        env.storage().instance().set(&DataKey::AmountRaised, &amount_raised);

        let target: u64 = env.storage().instance().get(&DataKey::Target).unwrap();
        if amount_raised >= target {
            env.storage().instance().set(&DataKey::State, &CrowdfundState::Success);
        }

        let mut user_deposit: u64 = env.storage().persistent().get(&DataKey::Deposits(user.clone())).unwrap_or(0);
        user_deposit += amount;
        env.storage().persistent().set(&DataKey::Deposits(user), &user_deposit);
        
        // Note: In a real app, we would transfer tokens here using token client.
    }

    pub fn get_state(env: Env) -> StateInfo {
        let target: u64 = env.storage().instance().get(&DataKey::Target).unwrap_or(0);
        let deadline: u64 = env.storage().instance().get(&DataKey::Deadline).unwrap_or(0);
        let amount_raised: u64 = env.storage().instance().get(&DataKey::AmountRaised).unwrap_or(0);
        let state: CrowdfundState = env.storage().instance().get(&DataKey::State).unwrap_or(CrowdfundState::Active);

        StateInfo {
            target,
            deadline,
            amount_raised,
            state,
        }
    }
}
