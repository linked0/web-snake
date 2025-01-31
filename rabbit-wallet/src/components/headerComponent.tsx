import React from "react";

export const HeaderComponent = (props: any) => {
  interface INetwork {
    name: string;
    rpc: string;
  }
  const { setDefaultAccount, setRpc, connectwalletHandler, infuriaNetworks } =
    props;
  return (
    <header className="text-gray-600 body-font shadow shadow-cyan-900">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl text-color-white ArchivoExtraBold">
            Openedge
          </span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <button
            onClick={() => setDefaultAccount("")}
            className="flex mx-auto mt-6x text-white border-2 border-purplx-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded-3xl text-lg button-gradient ArchivoBlack"
          >
            Import New Wallet
          </button>
          <select
            onChange={async (e) => {
              setRpc(e.target.value);
              connectwalletHandler(e.target.value);
            }}
            className="flex mx-auto mt-6x ml-3 text-color-green border-2 border-purple-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded-3xl text-lg ArchivoBlack"
          >
            {infuriaNetworks.map((item: INetwork, index: number) => {
              return (
                <option key={index} value={item.rpc}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </nav>
      </div>
    </header>
  );
};
