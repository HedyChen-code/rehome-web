// 將數字轉換為千分位分隔符格式
export const formateNumber = (num) => {
  const n = Number(num) || 0;
  return n.toLocaleString();
}