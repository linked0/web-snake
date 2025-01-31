import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { BalanceSectionComponent } from "../../components";
import { etherAddressShortener } from "../../utils";
let getByTestId: any;
describe("BalanceSectionComponent Component Tests", () => {
  const setState = jest.fn();
  beforeEach(() => {
    ({ getByTestId } = render(
      <BalanceSectionComponent
        etherAddressShortener={etherAddressShortener}
        userBalance={"0.900002333"}
        defaultAccount={"0x7F2dD4Fd1ed5b0693C7132C9B8aaDdFfA6cC8573"}
        setShowTokenSendModal={true}
      />
    ));
  });

  it("displays wallet address in shortened form", () => {
    expect(getByTestId("test-user-wallet-address")).toHaveTextContent(
      "0x7F2...8573"
    );
  });

  it("displays balance correctly", () => {
    expect(getByTestId("test-user-wallet-balance")).toHaveTextContent(
      "0.900002333"
    );
  });
});
