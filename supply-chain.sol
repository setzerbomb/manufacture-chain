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
        mapping(uint256 => PostProcessing) post_processing;
        uint256 postProcessingIdCounter;
        mapping(uint256 => QualityCheck) quality_check;
        uint256 qualityCheckIdCounter;
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
        Part storage part = _parts[partIdCounter];

        part.id = partIdCounter;
        part.ownership = _ownership;
        part.manufacturedBy = _manufacturedBy;
        part.designedBy = _designedBy;
        part.manufacturing_date = _manufacturing_date;
        part.postProcessingIdCounter = 0;
        part.qualityCheckIdCounter = 0;

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
        _parts[partIdCounter].post_processing[
            _parts[partIdCounter].postProcessingIdCounter
        ] = postProcessing;
        _parts[partIdCounter].postProcessingIdCounter++;
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
        _parts[partIdCounter].quality_check[
            _parts[partIdCounter].qualityCheckIdCounter
        ] = qualityCheck;
        _parts[partIdCounter].qualityCheckIdCounter++;
    }
}
