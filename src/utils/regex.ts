export function isValidEthereumAddress(address: string) {
  const regex = /^0x[A-Fa-f0-9]{40}$/;
  return regex.test(address);
}
