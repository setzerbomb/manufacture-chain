pragma solidity ^0.8.15;

/*
Temporary definitions for problem domain structs and contracts
*/
contract MAMSupplyChain {
    struct PostProcessing {
        address company;
        string process;
        uint256 process_parameters;
        /* date can be defined by unix epoch time*/
        uint256 date;
    }

    struct QualityCheck {
        address company;
        string process;
        uint256 process_parameters;
        uint256 date;
    }

    struct Part {
        uint256 id;
        address ownership;
        address manufacturedBy;
        address designedBy;
        PostProcessing[] post_processing;
        QualityCheck[] quality_check;
        uint256 manufacturing_date;
    }

    mapping(uint256 => Part) public _parts;

    uint256 partIdCounter = 0;

    function modifyOwnership(uint256 partId, address newOwner) public {
        require(msg.sender == _parts[partId].ownership);

        _parts[partId].ownership = newOwner;
    }

    function createPart(
        address _ownership,
        address _manufacturedBy,
        address _designedBy,
        uint256 _manufacturing_date
    ) public {

        _parts[partIdCounter] = Part(
            partIdCounter,
            _ownership,
            _manufacturedBy,
            _designedBy,
            new PostProcessing[],
            new QualityCheck[],
            _manufacturing_date
        );

        partIdCounter++;
    }

    function addPostProcessing(
        uint256 partId,
        address _company,
        string memory _process,
        uint256 _process_parameters,
        uint256 _date
    ) public {
        this.modifyOwnership(partId, _company);
        PostProcessing memory postProcessing = PostProcessing(
            _company,
            _process,
            _process_parameters,
            _date
        );
        _parts[partIdCounter].post_processing.push(postProcessing);
    }

    function addQualityCheck(
        uint256 partId,
        address _company,
        string memory _process,
        uint256 _process_parameters,
        uint256 _date
    ) public {
        this.modifyOwnership(partId, _company);
        QualityCheck memory qualityCheck = QualityCheck(
            _company,
            _process,
            _process_parameters,
            _date
        );
        _parts[partIdCounter].quality_check.push(qualityCheck);
    }
}
