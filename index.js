import * as redux from "https://cdn.skypack.dev/redux@4.0.5";

console.clear();

const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name,
      amount
    }
  };
};

const deletePolicy = name => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name
    }
  };
};

const createClaim = (name, claimAmount) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name,
      claimAmount
    }
  };
};

// Reducers

const policies = (oldListOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...oldListOfPolicies, action.payload.name];
  }
  
  if (action.type === 'DELETE_POLICY') {
    return oldListOfPolicies.filter(name => name !== action.payload.name);
  };
  
  return oldListOfPolicies;
};

// Default value for the oldListOfClaims when reducer is called for the first time.
const claims = (oldListOfClaims = [], action) => {
  // We care about the action that was passed in.
  if (action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload];
  }
  
  // We don't care about the action that was passed in.
  return oldListOfClaims;
};

const accounting = (previousBalance = 0, action) => {
  if (action.type === 'CREATE_POLICY') {
    return previousBalance + action.payload.amount;
  }
  
  if (action.type === 'CREATE_CLAIM') {
    return previousBalance - action.payload.claimAmount;
  }
  
  return previousBalance;
};

const { combineReducers, createStore } = redux;

const reducers = combineReducers({
  currentBalance: accounting,
  claims,
  policies
});

const store = createStore(reducers);

console.log(store.getState());
