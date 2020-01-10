import TopClient from 'node-taobao-topclient';
 
const client = new TopClient({
  appkey: 'appkey',
  appsecret: 'appsecret',
});
 
client.execute('alibaba.aliqin.fc.sms.num.send', {
  extend: '123456',
  sms_type: 'normal',
  sms_free_sign_name: '阿里大于',
  rec_num: '12345678912',
  sms_template_code: 'SMS_8985285',
  sms_param: {
    customer: 'Ray'
  }
})
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.error(err);
});