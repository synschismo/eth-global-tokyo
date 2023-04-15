// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import { ISuperfluid, ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

import "./IFakeDAI.sol";

contract SuperFluidTutorial {
  using CFAv1Library for CFAv1Library.InitData;
  CFAv1Library.InitData public cfaV1;               //initialize cfaV1 variable

  ISuperToken public daiX;

  constructor(ISuperfluid _host, ISuperToken _daiX) {
    cfaV1 = CFAv1Library.InitData(
      _host,
      IConstantFlowAgreementV1(
        address(_host.getAgreementClass(
          keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
        ))
      )
    );

    daiX = _daiX;
  }

  function gainDaiX() external {
    IFakeDAI fdai = IFakeDAI(daiX.getUnderlyingToken());

    fdai.mint(address(this), 10000e18);
    
    fdai.approve(address(daiX), 20000e18);

    daiX.upgrade(10000e18);
  }

  function createStream(int96 flowRate, address receiver) external {
    cfaV1.createFlow(receiver, daiX, flowRate);
  }
}
