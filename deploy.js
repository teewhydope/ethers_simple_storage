const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider({
        url: process.env.RPC_URL,
    })
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    // const encryptedJson = fs.readFileSync(
    //   (path = "./encryptedKey.js"),
    //   (encoding = "utf8")
    // );
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJson,
    //   process.env.PRIVATE_KEY_PASSWORD
    // );
    // wallet = await wallet.connect(provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        (path = "./SimpleStorage_sol_SimpleStorage.bin"),
        (encoding = "utf8")
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, Please wait")
    const contract = await contractFactory.deploy()
    //console.log(contract);
    // const deploymentTransaction = await contract.deployTransaction;
    // console.log("deployment transaction>>>");
    // console.log(deploymentTransaction);
    await contract.deployTransaction.wait()
    console.log(`Contract address ${contract.address}`)
    const currentFavNumber = await contract.retrieve()
    console.log(currentFavNumber)

    // const transactionReceipt = await contract.deployTransaction.wait();
    // //you only get a transaction receipt when you wait for a block confirmation
    // console.log("transaction receipt>>>");
    // console.log(transactionReceipt);
    // const nonce = await wallet.getTransactionCount();
    // const transaction = {
    //   nonce: nonce,
    //   gasPrice: 20000000000,
    //   gasLimit: 6721975,
    //   to: null,
    //   value: 0,
    //   data: "0x608060405234801561001057600080fd5b50610842806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063092a18201461005c5780632e64cec11461008d578063471f7cdf146100ab5780636057361d146100c9578063bc832d4e146100e5575b600080fd5b61007660048036038101906100719190610286565b610101565b604051610084929190610352565b60405180910390f35b6100956101bd565b6040516100a29190610382565b60405180910390f35b6100b36101c6565b6040516100c09190610382565b60405180910390f35b6100e360048036038101906100de9190610286565b6101cc565b005b6100ff60048036038101906100fa91906104d2565b6101d6565b005b6001818154811061011157600080fd5b906000526020600020906002020160009150905080600001549080600101805461013a9061055d565b80601f01602080910402602001604051908101604052809291908181526020018280546101669061055d565b80156101b35780601f10610188576101008083540402835291602001916101b3565b820191906000526020600020905b81548152906001019060200180831161019657829003601f168201915b5050505050905082565b60008054905090565b60005481565b8060008190555050565b60016040518060400160405280848152602001838152509080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001556020820151816001019081610235919061073a565b5050505050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61026381610250565b811461026e57600080fd5b50565b6000813590506102808161025a565b92915050565b60006020828403121561029c5761029b610246565b5b60006102aa84828501610271565b91505092915050565b6102bc81610250565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156102fc5780820151818401526020810190506102e1565b60008484015250505050565b6000601f19601f8301169050919050565b6000610324826102c2565b61032e81856102cd565b935061033e8185602086016102de565b61034781610308565b840191505092915050565b600060408201905061036760008301856102b3565b81810360208301526103798184610319565b90509392505050565b600060208201905061039760008301846102b3565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6103df82610308565b810181811067ffffffffffffffff821117156103fe576103fd6103a7565b5b80604052505050565b600061041161023c565b905061041d82826103d6565b919050565b600067ffffffffffffffff82111561043d5761043c6103a7565b5b61044682610308565b9050602081019050919050565b82818337600083830152505050565b600061047561047084610422565b610407565b905082815260208101848484011115610491576104906103a2565b5b61049c848285610453565b509392505050565b600082601f8301126104b9576104b861039d565b5b81356104c9848260208601610462565b91505092915050565b600080604083850312156104e9576104e8610246565b5b60006104f785828601610271565b925050602083013567ffffffffffffffff8111156105185761051761024b565b5b610524858286016104a4565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061057557607f821691505b6020821081036105885761058761052e565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026105f07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826105b3565b6105fa86836105b3565b95508019841693508086168417925050509392505050565b6000819050919050565b600061063761063261062d84610250565b610612565b610250565b9050919050565b6000819050919050565b6106518361061c565b61066561065d8261063e565b8484546105c0565b825550505050565b600090565b61067a61066d565b610685818484610648565b505050565b5b818110156106a95761069e600082610672565b60018101905061068b565b5050565b601f8211156106ee576106bf8161058e565b6106c8846105a3565b810160208510156106d7578190505b6106eb6106e3856105a3565b83018261068a565b50505b505050565b600082821c905092915050565b6000610711600019846008026106f3565b1980831691505092915050565b600061072a8383610700565b9150826002028217905092915050565b610743826102c2565b67ffffffffffffffff81111561075c5761075b6103a7565b5b610766825461055d565b6107718282856106ad565b600060209050601f8311600181146107a45760008415610792578287015190505b61079c858261071e565b865550610804565b601f1984166107b28661058e565b60005b828110156107da578489015182556001820191506020850194506020810190506107b5565b868310156107f757848901516107f3601f891682610700565b8355505b6001600288020188555050505b50505050505056fea26469706673582212203b8c89cd3ce221f9d125caa0501fdc2d5facf18b96694610e648f8acc29ef01e64736f6c63430008110033",
    //   chainId: 1337,
    // };

    // const signedTransaction = await wallet.signTransaction(transaction);
    // console.log(signedTransaction);

    // const sendTransaction = await wallet.sendTransaction(transaction);
    // sendTransaction.wait(1);
    // console.log(sendTransaction);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
