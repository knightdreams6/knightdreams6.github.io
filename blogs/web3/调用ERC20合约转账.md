---
title: 调用ERC20合约转账
date: 2025-02-08
tags:
  - web3
---



```java
import lombok.extern.slf4j.Slf4j;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.utils.Numeric;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;

@Slf4j
public class Main {

    public static void main(String[] args) throws Exception {
        // 节点地址
        String nodeUrl = "https://bsc-testnet-dataseed.bnbchain.org";

        // 账户私钥
        String accountPrivateKey = "";

        // 目标账户地址
        String toAddress = "";

        // 合约地址
        String contractAddress = "";

        // 初始化web3J
        Web3j web3j = Web3j.build(new HttpService(nodeUrl));

        // 转账数量
        BigDecimal transferAmount = new BigDecimal("100");

        // 代币小数位
        int tokenDecimals = 18;

        // 创建身份凭证
        Credentials credentials = Credentials.create(accountPrivateKey);

        // 代币数量单位转换
        BigInteger amountInTokenUnits = transferAmount.multiply(BigDecimal.TEN.pow(tokenDecimals)).toBigInteger();

        // 构造转账交易
        Function function = new Function(
                "transfer",
                Arrays.asList(new Address(toAddress), new Uint256(amountInTokenUnits)),
                Collections.emptyList()
        );

        String encodedFunction = FunctionEncoder.encode(function);

        //  Gas设置
        final BigInteger GAS_PRICE_MULTIPLIER = BigInteger.valueOf(101); // 是一个 1% 的缓冲，用于增加 Gas 价格以确保交易能够更快地被矿工处理。

        EthGasPrice ethGasPrice = web3j.ethGasPrice().send();
        BigInteger gasPrice = ethGasPrice.getGasPrice()
                .multiply(GAS_PRICE_MULTIPLIER)
                .divide(BigInteger.valueOf(100));

        //  获取Nonce（交易计数器）
        EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(
                credentials.getAddress(), DefaultBlockParameterName.PENDING).send();
        BigInteger nonce = ethGetTransactionCount.getTransactionCount();

        // 创建并签名交易
        final BigInteger GAS_LIMIT_TRANSFER = BigInteger.valueOf(80000);

        RawTransaction rawTransaction = RawTransaction.createTransaction(
                nonce,
                gasPrice,
                GAS_LIMIT_TRANSFER,
                contractAddress,
                encodedFunction
        );

        byte[] signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials);
        String hexValue = Numeric.toHexString(signedMessage);

        // 发送交易
        EthSendTransaction transactionResponse = web3j.ethSendRawTransaction(hexValue).send();

        if (transactionResponse.hasError()) {
            log.error("交易失败. 原因: {}", transactionResponse.getError().getMessage());
            return;
        }

        log.info("交易成功. Hash: {}", transactionResponse.getTransactionHash());
    }

}

```



