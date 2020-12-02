 // 保留小数点后两位的数字
export function onlyNumOnePoint(number_only) {
  //先把非数字的都替换掉，除了数字和小数点
  number_only = number_only.replace(/[^\d.]/g, "");
  //必须保证第一个为数字而不是小数点
  number_only = number_only.replace(/^\./g, "");
  //保证只有出现一个小数点而没有多个小数点
  number_only = number_only.replace(/\.{2,}/g, ".");
  //保证小数点只出现一次，而不能出现两次以上
  number_only = number_only.replace(".","$#$").replace(/\./g, "").replace("$#$", ".");
    //保证只能输入两个小数
  number_only = number_only.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
  return number_only;
}
