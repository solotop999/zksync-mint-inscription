import { Wallet, Provider } from "zksync-web3";

// Setting here
const PRIVATEKEY = "d3230222c226f70223a226d696824d567dxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx96"
const TOTAL_TX = 3
const GAS_LIMIT = 300000
////////

const BIGINT_ADDRESS = "0xc84567f12D0e890A9195086529964766ABcd4f5b"
const PROVIDER = new Provider("https://mainnet.era.zksync.io");
const MY_WALLET = new Wallet(PRIVATEKEY).connect(PROVIDER)

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function start() {
    console.log("\nMy wallet: ", MY_WALLET.address)
    for(let count=0; count<=TOTAL_TX; count++){
        const amount = '23000000000000';
        const data = '0x646174613a2c7b2270223a226572612d3230222c226f70223a226d696e74222c227469636b223a2262676e74222c22616d74223a2235227d';

        const transfer = await MY_WALLET.transfer({
            to: BIGINT_ADDRESS,
            amount: amount,
            overrides: {
                customData: data,
                gasLimit: GAS_LIMIT,
            } as Record<string, any>
        });

    console.log(` - ${count+1}. https://explorer.zksync.io/tx/${transfer.hash}`)
    await delay(1000)
    }

}

start();
