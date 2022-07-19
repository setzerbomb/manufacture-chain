//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/*
Temporary definitions for problem domain structs and contracts
*/
contract SupplyChain {
    struct PostProcessing {
        address company;
        string process; //process name
        string process_parameters; /*hash to original data. This protects industrial secrets.*/
        uint256 date; /*unix epoch time*/
    }

    struct QualityCheck {
        address company;
        string process; //process name
        string process_parameters; /*hash to original data. This protects industrial secrets.*/
        uint256 date; /*unix epoch time*/
    }

    struct Part {
        uint256 id;
        address ownership;
        address manufacturedBy;
        address designedBy;
        string process; //process name
        string process_parameters; /*hash to original data. This protects industrial secrets.*/
        //Post_processing array
        PostProcessing[] post_processing;
        QualityCheck[] quality_check;
        //Quality check array
        uint256 manufacturing_date; /*unix epoch time*/
    }

    //Parts array
    mapping(uint256 => Part) public _parts;
    uint256 partIdCounter = 0;

    function modifyOwnership(uint256 partId, address newOwner) public {
        //Blocks any senders that are not the actual owner of the part or the contract itself
        require(
            msg.sender == _parts[partId].ownership ||
                msg.sender == address(this),
            "You aren't the owner"
        );

        _parts[partId].ownership = newOwner;
    }

    function createPart(
        address _ownership,
        address _manufacturedBy,
        address _designedBy,
        string memory _process,
        string memory _process_parameters,
        uint256 _manufacturing_date
    ) public {
        Part storage part = _parts[partIdCounter];

        part.id = partIdCounter;
        part.ownership = _ownership;
        part.manufacturedBy = _manufacturedBy;
        part.designedBy = _designedBy;
        part.process = _process;
        part.process_parameters = _process_parameters;
        part.manufacturing_date = _manufacturing_date;
        // part.postProcessingIdCounter = 0;
        // part.qualityCheckIdCounter = 0;

        //Improves counter for next time
        partIdCounter++;
    }

    function addPostProcessing(
        uint256 partId,
        address _company,
        string memory _process,
        string memory _process_parameters,
        uint256 _date
    ) public {
        //Changes ownership to the responsible company
        this.modifyOwnership(partId, _company);

        //Creates a temporary instance for post processing
        PostProcessing memory postProcessing = PostProcessing(
            _company,
            _process,
            _process_parameters,
            _date
        );

        //Adds post_processing with counter Id into part
        _parts[partId].post_processing.push(postProcessing);
    }

    function getPartPostProcessing(uint256 part_id)
        public
        view
        returns (PostProcessing[] memory)
    {
        return _parts[part_id].post_processing;
    }

    function addQualityCheck(
        uint256 partId,
        address _company,
        string memory _process,
        string memory _process_parameters,
        uint256 _date
    ) public {
        //Changes ownership to the responsible company
        this.modifyOwnership(partId, _company);

        //Creates a temporary instance for quality check
        QualityCheck memory qualityCheck = QualityCheck(
            _company,
            _process,
            _process_parameters,
            _date
        );

        //Adds quality_check with counter Id into part
        _parts[partId].quality_check.push(qualityCheck);
    }

    function getPartQualityCheck(uint256 part_id)
        public
        view
        returns (QualityCheck[] memory)
    {
        return _parts[part_id].quality_check;
    }

    function getPart(uint256 part_id) public view returns (Part memory) {
        Part memory part = _parts[part_id];
        return part;
    }
}
