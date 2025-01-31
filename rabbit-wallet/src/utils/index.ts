export const etherAddressShortener = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
