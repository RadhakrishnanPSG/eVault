const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const app = express();
const port = 3001;

app.use(bodyParser.json());

const web3 = new Web3('http://localhost:7545');
const contractABI = require('./build/contracts/DocumentManager.json').abi;
const contractAddress = '*'; //contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.post('/uploadDocument', async (req, res) => {
    const { hash, account } = req.body;
    try {
        await contract.methods.uploadDocument(hash).send({ from: account });
        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

app.get('/getDocumentVersions/:hash', async (req, res) => {
    const { hash } = req.params;
    try {
        const versions = await contract.methods.getDocumentVersions(hash).call();
        res.send(versions);
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
