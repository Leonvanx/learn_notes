# http和https的区别

HTTP（Hypertext Transfer Protocol）和HTTPS（Hypertext Transfer Protocol Secure）是用于在网络上传输数据的协议，它们之间的主要区别在于安全性。

1. **HTTP**：HTTP 是一种应用层协议，用于在客户端和服务器之间传输超文本。它是不安全的，因为数据在传输过程中是明文的，容易被中间人窃听和篡改。因此，不建议在传输敏感信息时使用 HTTP。
2. **HTTPS**：HTTPS 是在 HTTP 的基础上加入了 SSL/TLS 加密层的安全版本。它使用 SSL/TLS 协议对数据进行加密，确保传输过程中的数据隐私和完整性。HTTPS 的安全性得到了提升，适用于传输敏感信息，如个人账户、密码等。

总的来说，HTTP和HTTPS的区别主要在于安全性。使用HTTPS能够提供更高级别的数据安全保障，尤其是对于涉及个人隐私和敏感信息的网站和应用来说，是必不可少的。

# https的传输过程

 客户端发起 HTTPS请求，服务端返回证书，客户端对证书进行验证，验证通过后本地生成用于改造对称加密算法的随机数，通过证书中的公钥对随机数进行加密传输到服务端，服务端接收后通过私钥解密得到随机数，之后的数据交互通过对称加密算法进行加解密

# 如何抓取https的数据？

抓取 HTTPS 加密后的数据通常是一种不被推荐的行为，因为 HTTPS 的整个目的就是为了保护数据的安全和隐私。然而，有时候在开发和测试过程中，我们可能需要分析 HTTPS 请求和响应，这时可以使用一些工具来进行抓取和分析。这些工具通常会利用中间人攻击（Man-in-the-middle attack）的原理来截获 HTTPS 数据。

一种常用的方法是使用代理工具，例如 Fiddler、Charles、Wireshark 等。这些工具可以拦截 HTTPS 请求和响应，解密加密的数据，并以可读的形式呈现出来。通常，它们会要求你安装根证书到你的设备或浏览器上，以便能够对 SSL/TLS 连接进行解密和分析。

# 什么是中间人攻击？

中间人攻击（Man-in-the-middle attack，缩写为MITM攻击）是一种网络安全攻击手段，攻击者在通信的两端之间插入自己，使得双方都认为他们在直接通信，但实际上所有的通信都被攻击者窃听和控制。这种攻击通常发生在加密通信中，例如HTTPS连接。

中间人攻击的工作原理如下：

1. 攻击者在受害者与目标之间插入自己，形成一个与受害者和目标各自建立的通信链路。
2. 攻击者可以拦截、窃听和修改通过这个链路传输的数据，而受害者和目标之间毫无察觉。
3. 攻击者可以利用这种位置来伪装受害者和目标之间的通信，甚至在其中注入恶意内容，比如修改网页内容、篡改传输数据等。