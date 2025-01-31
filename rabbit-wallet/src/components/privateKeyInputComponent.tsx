import React from "react";

export const PrivateKeyInputComponent = (props: any) => {
  const { setPrivateKeyInputValue, connectwalletHandler, rpc } = props;
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-color-white ArchivoBold">
            Ethereum Wallet
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-color-gray-tone ArchivoRegular">
            Enter you private key below to connect to wallet
          </p>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-color-gray-tone ArchivoRegular">
              Private Key
            </label>
            <input
              type="privateKey"
              id="privateKey"
              name="privateKey"
              data-testid="test-privatekey-input"
              className="w-full bg-gray-100 bg-opacity-50 rounded-3xl border border-gray-300 focus:border-indigo-500 focus:bg-opacity-100 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => setPrivateKeyInputValue(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              connectwalletHandler(rpc);
            }}
            className="text-white bg-color-lime border-1 border-lime-300	 py-2 px-8 focus:outline-none hover:bg-white-500 rounded-3xl text-lg button-gradient ArchivoBlack"
          >
            Connect
          </button>
        </div>
      </div>
    </section>
  );
};
