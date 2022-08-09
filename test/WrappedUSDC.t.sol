// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import "solmate/tokens/ERC20.sol";

import "src/WrappedUSDC.sol";

contract TestUSDC is ERC20 {
    constructor() ERC20("Test USD Coin", "TUSDC", 6) {
        _mint(msg.sender, 100e6);
    }
}

contract TestContract is Test {
    WrappedUSDC wrappedUSDC;
    TestUSDC usdc;

    function setUp() public {
        usdc = new TestUSDC();
        wrappedUSDC = new WrappedUSDC(address(usdc));
    }

    function testDepositTransferWithdraw() public {
        address sender = address(this);

        uint256 amount = usdc.balanceOf(sender);

        // deposit
        usdc.approve(address(wrappedUSDC), amount);
        wrappedUSDC.deposit(amount);

        assertEq(usdc.balanceOf(sender), 0);
        assertEq(wrappedUSDC.balanceOf(sender), amount);

        address recipient = address(2);

        // transfer
        wrappedUSDC.transfer(recipient, amount);

        assertEq(wrappedUSDC.balanceOf(sender), 0);
        assertEq(wrappedUSDC.balanceOf(recipient), amount);

        vm.prank(recipient);

        // withdraw
        wrappedUSDC.withdraw(amount);

        assertEq(wrappedUSDC.balanceOf(recipient), 0);
        assertEq(usdc.balanceOf(recipient), amount);

        vm.stopPrank();
    }
}
