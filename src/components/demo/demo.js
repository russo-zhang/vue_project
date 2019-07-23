// 需求： 模拟从用户验证 -> 密码验证
// async
async function vertify() {
  // 2.得到响应体
  var nameBody = await fetch("请求路径");

  // 3》格式化响应体
  var nameData = await nameBody.json();

  // 4.判断，通过验证密码
  if (nameData.msg !== '用户名验证成功') return

  var pwdBody = await fetch("请求路径");
  var pwdData = await pwdBody.json();
  console.log(pwdData);
}
vertify();