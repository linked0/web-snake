import React from "react";

export const CustomTokenComponent = (props: any): JSX.Element | null => {
  const {
    customToken,
    removeCustomToken,
    setShowAddTokenModal,
    defaultAccount,
  } = props;
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-0 mb-20 mx-auto">
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Token
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Balance
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {customToken
                .filter((token: any) => token.ownerAddress === defaultAccount)
                .map((token: any, index: any) => (
                  <tr key={index}>
                    <td className="border-t-2 border-green-100 px-4 py-3 text-color-white DMSansBold">
                      {token.symbol}
                    </td>
                    <td className="border-t-2 border-green-100 px-4 py-3 text-color-white DMSansBold">
                      {token.balance}
                    </td>
                    <td className="border-t-2 border-green-100 px-4 py-3 text-color-white DMSansBold">
                      <button onClick={removeCustomToken}>remove</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex pl-4 mt-20 lg:w-2/3 w-full mx-auto">
          <button
            onClick={() => {
              setShowAddTokenModal(true);
            }}
            className="flex ml-auto text-white bg-color-lime border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded-3xl button-gradient DMSansBold"
          >
            Add ECR20 Token
          </button>
        </div>
      </div>
    </section>
  );
};
