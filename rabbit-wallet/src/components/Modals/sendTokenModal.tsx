import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
export const SendTokenModal = (props: any): JSX.Element | null => {
  const {
    setTransferTokenAddress,
    ethereumMainnetContractAddress,
    userBalance,
    customToken,
    defaultAccount,
    setReciepientAddress,
    setTransferAmount,
    setShowTokenSendModal,
    isSending,
    setIsSending,
    sendToken,
    transferTokenAddress,
    reciepientAddress,
    transferAmount,
  } = props;
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    width="16px"
                    height="16px"
                  >
                    <path
                      fill="#bae0bd"
                      d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"
                    />
                    <path
                      fill="#5e9c76"
                      d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"
                    />
                    <path
                      fill="none"
                      stroke="#fff"
                      stroke-miterlimit="10"
                      stroke-width="2"
                      d="M11 20L17 26 30 13"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900 DMSansBold"
                    id="modal-title"
                  >
                    Send Token
                  </h3>

                  <div className="mt-2">
                    <label className="leading-7 text-sm text-color-gray-tone DMSansBold">
                      Select Token
                    </label>
                    <select
                      id="transferToken"
                      name="transferToken"
                      className="w-full bg-gray-100 bg-opacity-50 rounded-3xl border border-gray-300 focus:border-indigo-500 focus:bg-opacity-100 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out DMSansBold"
                      onChange={(e) => setTransferTokenAddress(e.target.value)}
                    >
                      <option value={ethereumMainnetContractAddress}>
                        Ethereum (Balance: {userBalance})
                      </option>
                      {customToken
                        .filter(
                          (token: any) => token.ownerAddress === defaultAccount
                        )
                        .map((token: any, index: any) => (
                          <option value={token.address}>
                            {token.symbol} (Balance: {token.balance})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mt-2">
                    <label className="leading-7 text-sm text-color-gray-tone DMSansBold">
                      To Address: (enter ethereum address of the reciever)
                    </label>
                    <input
                      id="reciepientAddress"
                      name="reciepientAddress"
                      className="w-full bg-gray-100 bg-opacity-50 rounded-3xl border border-gray-300 focus:border-indigo-500 focus:bg-opacity-100 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setReciepientAddress(e.target.value)}
                    />
                  </div>

                  <div className="mt-2">
                    <label className="leading-7 text-sm text-color-gray-tone DMSansBold">
                      Amount:
                    </label>
                    <input
                      id="amount"
                      name="amount"
                      className="w-full bg-gray-100 bg-opacity-50 rounded-3xl border border-gray-300 focus:border-indigo-500 focus:bg-opacity-100 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => setTransferAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setShowTokenSendModal(false);
                }}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm button-gradient DMSansBold"
              >
                Cancel
              </button>
              {isSending ? (
                <ClipLoader
                  color={"#1D976C"}
                  loading={true}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsSending(true);
                    sendToken(
                      transferTokenAddress,
                      reciepientAddress,
                      transferAmount
                    );
                    setShowTokenSendModal(true);
                  }}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm button-gradient DMSansBold"
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
