export const minTranscurridos = (n: Date) => {
  const ahora = new Date();
  return Math.floor((ahora.getTime() - n.getTime()) / 60000);
};

export const upperCaseWords = (n: string) => {
  return n
    .split(" ")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
};
