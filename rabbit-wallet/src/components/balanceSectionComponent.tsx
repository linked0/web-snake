import React from "react";

export const BalanceSectionComponent = (props: any): JSX.Element | null => {
  const {
    etherAddressShortener,
    userBalance,
    defaultAccount,
    setShowTokenSendModal,
    getTransactionHistory,
  } = props;
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 mx-auto">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center"></div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
              <img src="ethereum-icon.png" />
            </div>
            <div className="flex-grow">
              <h2
                className="text-gray-900 text-5xl title-font font-medium mb-3 text-color-green ArchivoExtraBold"
                data-testid="test-user-wallet-balance"
              >
                {userBalance}
              </h2>
              <p
                className="leading text-base text-color-white ArchivoExtraBold"
                data-testid="test-user-wallet-address"
              >
                {etherAddressShortener(defaultAccount)}
              </p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center"></div>
        </div>
        <div className="flex">
          <button
            onClick={() => setShowTokenSendModal(true)}
            className="flex mx-auto mt-6 text-white bg-color-lime border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded-3xl text-lg button-gradient DMSansBold"
            data-testid="action-button-transfer"
          >
            Transfer
          </button>
          <button
            onClick={() => getTransactionHistory(defaultAccount)}
            className="flex mx-auto mt-6 text-white bg-color-lime border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded-3xl text-lg button-gradient DMSansBold"
          >
            History
          </button>
        </div>
      </div>
    </section>
  );
};
