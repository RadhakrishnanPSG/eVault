pragma solidity ^0.8.0;

contract DocumentManager {
    struct Document {
        string hash;
        address owner;
        uint timestamp;
        uint version;
    }

    mapping(string => Document[]) private documents;

    event DocumentStored(string hash, address owner, uint timestamp, uint version);

    function uploadDocument(string memory _hash) public {
        uint version = documents[_hash].length + 1;
        documents[_hash].push(Document(_hash, msg.sender, block.timestamp, version));
        emit DocumentStored(_hash, msg.sender, block.timestamp, version);
    }

    function getDocumentVersions(string memory _hash) public view returns (Document[] memory) {
        return documents[_hash];
    }
}
