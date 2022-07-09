pragma solidity ^0.5.0;

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
        uint256 manufacturing_date;
    }

    Part[] part;

    function modifyOwnership(Part _part, address newOwner) public payable {
        require(msg.sender == _part.ownership);
        _part.ownership = newOwner;
    }

    function createPart(
        uint256 _id,
        address _ownership,
        address _manufacturedBy,
        address _designedBy,
        uint256 _manufacturing_date
    ) public (Part) {
        Part newpart = Part(
            _id,
            _ownership,
            _manufacturedBy,
            _designedBy,
            [],
            _manufacturing_date
        );
        this.part = part;
    }

    function addPostProcessing(
        Part _part,
        address _company,
        string _process,
        uint256 _process_parameters,
        uint256 _date
    ) {
        this.modifyOwnership(_part, _company);
        PostProcessing new_post_processing = PostProcessing(
            _company,
            _process,
            _process_parameters,
            _date
        );
        _part.postProcessing.push(new_post_processing);
    }

    function addQualityCheck(
        Part _part,
        address _company,
        string _process,
        uint256 _process_parameters,
        uint256 _date
    ) {
        this.modifyOwnership(_part, _company);
        QualityCheck new_qualityCheck = QualityCheck(
            _company,
            _process,
            _process_parameters,
            _date
        );
        _part.QualityCheck.push(new_qualityCheck);
    }
}
