// packages/ethereum-transaction-parser/src/index.ts
import { ethers } from "ethers";

export interface ParsedTransaction {
    from: string | null | undefined;
    to: string | null | undefined;
    value: string;
    gasLimit: string;
    data: string;
    hash: string | null | undefined;
    nonce: number;
}

export async function parseTransaction(transactionData: string): Promise<ParsedTransaction> {
    try {
      //Assuming transactionData is a raw transaction string
      const transaction = ethers.Transaction.from(transactionData);

        return {
            from: transaction.from,
            to: transaction.to,
            value: transaction.value.toString(),
            gasLimit: transaction.gasLimit.toString(),
            data: transaction.data,
            hash: transaction.hash,
            nonce: transaction.nonce,
        };
    } catch (error) {
        console.error("Error parsing transaction:", error);
        throw new Error("Failed to parse transaction");
    }
}